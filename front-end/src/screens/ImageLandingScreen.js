import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ImageLandingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { imageUri, classification } = route.params;

  console.log('Received classification:', classification);  // Log to verify

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>the right bin is...</Text>

      {/* Display the captured image */}
      <Image source={{ uri: imageUri }} style={styles.capturedImage} />

      {/* Display ONLY the LLaMA classification result */}
      {classification ? (
        <Text style={styles.resultText}>{classification}</Text>
      ) : (
        <Text style={styles.resultText}>No classification found</Text>
      )}

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        {/* Home Button */}
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Image source={require('../../assets/home-icon2.png')} style={styles.navIcon} />
        </TouchableOpacity>

        {/* Camera Button */}
        <TouchableOpacity onPress={() => navigation.replace('CaptureImageScreen')}>
          <Image source={require('../../assets/camera-nav-icon2.png')} style={styles.navIcon} />
        </TouchableOpacity>

        {/* Stats Button */}
        <TouchableOpacity onPress={() => navigation.navigate('StatsScreen')}>
          <Image source={require('../../assets/analytics-icon.png')} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#3D9BE9',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 70,
    paddingVertical: 20,
    color: '#12142A',
  },
  capturedImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  resultText: {
    fontSize: 60,  // Large font for classification result
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    color: '#00D977',  // Adjust the color as needed
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#12142A',
    width: '100%',
    paddingVertical: 20,
  },
  navIcon: {
    width: 45,
    height: 45,
  },
});

export default ImageLandingScreen;