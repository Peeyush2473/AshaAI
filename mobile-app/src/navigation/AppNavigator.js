import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/Splash/SplashScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import CitizenListScreen from '../screens/Home/CitizenListScreen';
import AddCitizenScreen from '../screens/Citizen/AddCitizenScreen';
import CitizenHistoryScreen from '../screens/Citizen/CitizenHistoryScreen';
import SelectTestScreen from '../screens/Screening/SelectTestScreen';
import CameraScreen from '../screens/Screening/CameraScreen';
import ResultScreen from '../screens/Screening/ResultScreen';
import NutritionistScreen from '../screens/Tools/NutritionistScreen';
import HealthLocatorScreen from '../screens/Tools/HealthLocatorScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CitizenList" component={CitizenListScreen} />
        <Stack.Screen name="AddCitizen" component={AddCitizenScreen} />
        <Stack.Screen name="CitizenHistory" component={CitizenHistoryScreen} />
        <Stack.Screen name="SelectTest" component={SelectTestScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} options={{ animation: 'fade_from_bottom' }} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Nutritionist" component={NutritionistScreen} />
        <Stack.Screen name="HealthLocator" component={HealthLocatorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
