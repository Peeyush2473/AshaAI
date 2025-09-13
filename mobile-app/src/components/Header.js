import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Hook for navigation

// In a real app, these would come from 'src/constants/colors.js'.
const COLORS = {
  primary: '#0D47A1', // Deep Blue
  white: '#FFFFFF',
  textPrimary: '#212121',
  border: '#E0E0E0',
};

// A simple SVG-like text component for the back arrow icon for better visuals
// Using a simple text character is lightweight and avoids image dependencies.
const BackArrowIcon = () => (
    <Text style={styles.backArrow}>←</Text>
);

/**
 * A reusable header component for all screens in the app.
 *
 * @param {object} props - The component props.
 * @param {string} props.title - The title to display in the header.
 * @param {boolean} [props.canGoBack=false] - If true, shows a back button that navigates to the previous screen.
 * @param {React.ReactNode} [props.rightAction] - An optional component to render on the right side (e.g., a settings icon).
 */
const Header = ({ title, canGoBack = false, rightAction = null }) => {
  // The useNavigation hook gives us access to the navigation object,
  // which is essential for triggering navigation actions like goBack().
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {/* Conditionally render the back button */}
      {canGoBack ? (
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <BackArrowIcon />
        </TouchableOpacity>
      ) : (
        // Render an empty view to keep the title centered correctly
        <View style={styles.placeholder} />
      )}
      
      <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>

      {/* Conditionally render the right action component */}
      {rightAction ? (
        <View style={styles.rightActionContainer}>{rightAction}</View>
      ) : (
        // Render an empty view to keep the title centered
        <View style={styles.placeholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: Platform.OS === 'ios' ? 90 : 60, // Taller header for iOS to account for notch
    paddingTop: Platform.OS === 'ios' ? 30 : 0, // Padding for the status bar area on iOS
    width: '100%',
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Use space-between for a flexible layout
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    // Android Shadow
    elevation: 4,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: 8, // Makes the touch area larger
  },
  backArrow: {
    color: COLORS.textPrimary, 
    fontSize: 28, 
    fontWeight: '300'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    fontFamily: 'NotoSansDevanagari-Bold', // Assuming you'll add custom fonts
  },
  rightActionContainer: {
    padding: 8,
  },
  placeholder: {
    width: 40, // Match the approximate width of the button areas
  }
});

export default Header;
