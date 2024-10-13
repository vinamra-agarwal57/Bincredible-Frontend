import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const HomeScreen = () => {
  const navigation = useNavigation(); // Initialize navigation

  // Array of facts to be displayed
  const facts = [
    'The average person creates almost five pounds of trash per day',
    'Every ton of recycled paper saves 17 trees',
    'Cardboard boxes can be recycled at least seven times',
    'Every year, 2.4 million tons of recycled glass are used to make new bottles and jars',
    'More than 52 million tons of paper products were recycled in 2018',
    'It only takes 60 days for a used aluminum drink can to be recycled into a new one'
  ];

  // State to hold the current fact index
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  // useEffect to change the fact every 5 seconds (5000 ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
    }, 2500); // Change every 5 seconds

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>bincredible.</Text>

      {/* Display the current fact */}
      <Text style={styles.message}>{facts[currentFactIndex]}</Text>

      {/* Capture Button navigates to CaptureImageScreen */}
      <TouchableOpacity
        style={styles.captureButton}
        onPress={() => navigation.navigate('CaptureImageScreen')}
      >
        <Image
          source={require('../../assets/camera-icon.png')}  // Path to camera icon
          style={styles.cameraIcon}
        />
        <Text style={styles.captureText}>start capturing!</Text>
      </TouchableOpacity>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('HomeScreen')}>
          <Image source={require('../../assets/home-icon.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('CaptureImageScreen')}  // Navigate to CaptureImageScreen
        >
          <Image source={require('../../assets/camera-nav-icon.png')} style={styles.navIcon} />
        </TouchableOpacity>
        {/* Navigate to StatsScreen */}
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('StatsScreen')}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#12142A',
    marginBottom: 20,
  },
  message: {
    fontSize: 20,
    color: '#5A5E6B',
    backgroundColor: '#D8DDE6',
    padding: 10,
    textAlign: 'center',
    marginBottom: 40,
  },
  captureButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00D977',  // Bright green background for the button
    borderRadius: 50,
    padding: 20,
    marginBottom: 60,
  },
  cameraIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  captureText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#12142A',
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
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    width: 45,
    height: 45,
  },
});

export default HomeScreen;