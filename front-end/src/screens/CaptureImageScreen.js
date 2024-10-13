import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const CaptureImageScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    openCamera();
  }, []);

  const openCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera is required!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);

      try {
        // Prepare the image data in FormData format
        const data = new FormData();
        data.append('image', {
          uri: uri,  // Direct file URI instead of Base64
          type: 'image/jpeg',
          name: 'image.jpg',
        });

        const response = await fetch('http://172.20.10.13:5001/classify', {
          method: 'POST',
          body: data,
        });

        const result = await response.json();
        console.log('Backend Response:', result);  // Log the response

        if (response.ok && result.class) {
          // Navigate to ImageLandingScreen with the classification result
          navigation.navigate('ImageLandingScreen', {
            imageUri: uri,
            classification: result.class,  // Ensure you're passing the correct field
          });
        } else {
          Alert.alert('Error', 'Failed to classify the image. Please try again.');
        }
      } catch (error) {
        console.error('Error during image processing or classification:', error);
        Alert.alert('Error', 'Failed to classify the image. Please try again.');
      }
    } else {
      // Auto exit to HomeScreen if the camera is exited without capturing an image
      navigation.navigate('HomeScreen');
    }
  };

  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default CaptureImageScreen;