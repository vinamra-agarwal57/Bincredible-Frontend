from flask import Flask, request, jsonify
from ultralytics import YOLO
from PIL import Image
from flask_cors import CORS
import subprocess

# Initialize the Flask application
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS)

# Load the YOLO classification model
model = YOLO('yolo11n-cls.pt')  # Ensure you are using a valid YOLO classification model

@app.route('/')
def index():
    return "Welcome to the YOLO + LLaMA Classification API"

# Route for image classification
@app.route('/classify', methods=['POST'])
def classify_image():
    if 'image' not in request.files:
        print("No image uploaded")
        return jsonify({'error': 'No image uploaded'}), 400

    try:
        # Load the image from the request
        image_file = request.files['image']
        print(f"Received image: {image_file.filename}")

        # Open the image using PIL to verify its format
        image = Image.open(image_file.stream)
        print(f"Image format: {image.format}, Size: {image.size}")

        # Ensure the image is in RGB format to avoid issues with YOLO
        if image.mode != 'RGB':
            print("Converting image to RGB")
            image = image.convert('RGB')

        # Run YOLO classification
        results = model(image)
        result = results[0]  # Assuming single image processing

        # Extract classification probabilities and highest confidence class
        probs = result.probs
        highest_conf_class_index = probs.top1
        highest_conf_class = model.names[highest_conf_class_index]
        highest_conf_score = probs.top1conf.item()

        # Prepare prompt for LLaMA based on YOLO classification result
        prompt = f"in one word where does {highest_conf_class} go? compost, recycle, or trash"

        # Run the LLaMA conversation
        llama_response = run_llama_conversation(prompt)

        # Check if we got a valid response from LLaMA
        if llama_response:
            # Split the LLaMA response to ensure it's only one word
            
            print(f"LLaMA response: {llama_response}")

            # Send only the one-word response to the front end
            return jsonify({
                'class': llama_response,  # Only the one-word LLaMA response
            })
        else:
            return jsonify({'error': 'LLaMA did not respond'}), 500

    except Exception as e:
        print(f"Error during classification: {e}")
        return jsonify({'error': 'Failed to classify image', 'details': str(e)}), 500

# Function to run LLaMA conversation (via subprocess)
def run_llama_conversation(prompt):
    try:
        # Define the command to run LLaMA
        command = ["ollama", "run", "llama3.2"]

        # Use subprocess to run the command and communicate with it
        process = subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

        # Send the prompt to the chatbot
        output, error = process.communicate(prompt)

        # Check for errors
        if process.returncode != 0:
            print(f"Error: {error}")
            return None

        # Return the chatbot's response (cleaned to one word)
        return output

    except Exception as e:
        print(f"An error occurred while running LLaMA: {e}")
        return None

if __name__ == '__main__':
    # Run the app on 0.0.0.0 to make it accessible from other devices
    app.run(debug=True, host='0.0.0.0', port=5001)