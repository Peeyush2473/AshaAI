 
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

// First, let's define our colors to be used in the component.
// In a real app, these would come from 'src/constants/colors.js'.
const COLORS = {
  primary: '#0D47A1', // Deep Blue
  accent: '#FB8C00',  // Saffron Orange
  white: '#FFFFFF',
  lightGrey: '#F5F5F5',
  mediumGrey: '#757575',
  disabled: '#BDBDBD',
};

/**
 * A highly reusable custom button component.
 * @param {object} props - The component props.
 * @param {string} props.title - The text to display on the button.
 * @param {function} props.onPress - The function to execute when the button is pressed.
 * @param {string} [props.variant='primary'] - The button style ('primary' or 'secondary').
 * @param {boolean} [props.isLoading=false] - If true, shows a loading spinner instead of text.
 * @param {boolean} [props.disabled=false] - If true, the button is non-interactive.
 * @param {object} [props.style] - Custom styles to override the default.
 */
const Button = ({ title, onPress, variant = 'primary', isLoading = false, disabled = false, style }) => {
  const isPrimary = variant === 'primary';

  // Determine the container style based on variant and disabled state
  const containerStyle = [
    styles.buttonContainer,
    isPrimary ? styles.primaryContainer : styles.secondaryContainer,
    disabled || isLoading ? styles.disabledContainer : {},
    style, // Apply custom styles last
  ];

  // Determine the text style based on the variant
  const textStyle = [
    styles.buttonText,
    isPrimary ? styles.primaryText : styles.secondaryText,
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator color={isPrimary ? COLORS.white : COLORS.primary} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30, // Fully rounded corners
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    minHeight: 58,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  primaryContainer: {
    backgroundColor: COLORS.accent, // Using Saffron for the main call to action
  },
  secondaryContainer: {
    backgroundColor: COLORS.lightGrey,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  disabledContainer: {
    backgroundColor: COLORS.disabled,
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'NotoSansDevanagari-Bold', // Assuming you'll add custom fonts
  },
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.primary,
  },
});

export default Button;

