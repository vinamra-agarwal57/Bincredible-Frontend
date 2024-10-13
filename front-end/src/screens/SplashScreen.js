import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  useEffect(() => {
    // Start fade-out animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      delay: 2000,
      useNativeDriver: true,
    }).start(() => {
      navigation.replace('HomeScreen');
    });
  }, [fadeAnim, navigation]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.tagline}>dispose right.</Text>
      <Image
        source={require('../../assets/bincredible-logo.png')} // Path to your logo
        style={styles.logo}
      />
      <Text style={styles.taglineBottom}>be bincredible.</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12142A',  // Dark background
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagline: {
    fontSize: 30,
    color: '#FFFFFF',
    marginBottom: 10,  // Space between tagline and logo
  },
  logo: {
    width: 200,
    height: 200,  // Adjust size based on the logo
  },
  taglineBottom: {
    fontSize: 30,
    color: '#FFFFFF',
    marginTop: 10,  // Space between logo and taglineBottom
  },
});

export default SplashScreen;