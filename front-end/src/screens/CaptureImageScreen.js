import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import expo-image-picker
import { useNavigation } from '@react-navigation/native';

const CaptureImageScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Automatically open the camera when this screen is loaded
    openCamera();
  }, []);

  // Function to capture image
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
      setImageUri(result.assets[0].uri); // Store the captured image URI
      // Navigate to the landing page after capturing the image
      navigation.navigate('ImageLandingScreen', { imageUri: result.assets[0].uri });
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