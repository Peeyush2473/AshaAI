import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from 'src/navigation/AppNavigator';
import useUserStore from 'src/store/userStore';
import COLORS from 'src/constants/colors';

/**
 * The main entry point component for the entire application.
 *
 * This component's primary responsibilities are:
 * 1. Setting the global status bar style for the app.
 * 2. Triggering the initial authentication state hydration from local storage.
 * This checks if a user was already logged in from a previous session.
 * 3. Rendering the main AppNavigator, which controls all screen routing.
 */
const App = () => {
  // Get the hydrateAuth function from our Zustand store.
  const hydrateAuth = useUserStore((state) => state.hydrateAuth);

  // The useEffect hook runs once when the component is first mounted.
  // This is the perfect place to initialize the app.
  useEffect(() => {
    // Call the function to load token and user data from AsyncStorage
    // into the global state.
    hydrateAuth();
  }, [hydrateAuth]); // Dependency array ensures this runs only once.

  return (
    <>
      {/* Set a consistent status bar style for the entire app */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background}
      />
      {/* The AppNavigator handles all the screens and navigation logic */}
      <AppNavigator />
    </>
  );
};

export default App;

