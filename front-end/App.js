import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import CaptureImageScreen from './src/screens/CaptureImageScreen';
import ImageLandingScreen from './src/screens/ImageLandingScreen';
import StatsScreen from './src/screens/StatsScreen'; // Import the new statistics screen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CaptureImageScreen" component={CaptureImageScreen} />
        <Stack.Screen name="ImageLandingScreen" component={ImageLandingScreen} />
        <Stack.Screen name="StatsScreen" component={StatsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}