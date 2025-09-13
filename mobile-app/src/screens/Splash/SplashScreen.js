import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import COLORS from 'constants/colors';

// This would be a real function checking AsyncStorage
const checkAuthToken = async () => {
  // For the hackathon, we'll simulate this.
  // We'll randomly decide if the user is "logged in" or not.
  return new Promise(resolve => {
    setTimeout(() => {
      const isLoggedIn = Math.random() < 0.5; // 50% chance of being logged in
      resolve(isLoggedIn);
    }, 2000); // Simulate a 2-second check
  });
};

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const initialize = async () => {
      const isLoggedIn = await checkAuthToken();
      
      // After checking, navigate the user to the correct screen.
      // We use `reset` to clear the navigation history, so the user
      // can't press the back button to return to the splash screen.
      if (isLoggedIn) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    };

    initialize();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <Animatable.View
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
      >
        <Text style={styles.logoText}>Asha AI</Text>
      </Animatable.View>
      <Text style={styles.tagline}>Health & Hope, Powered by Technology</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  tagline: {
      position: 'absolute',
      bottom: 50,
      fontSize: 16,
      color: COLORS.white,
      opacity: 0.8,
  }
});

export default SplashScreen;
