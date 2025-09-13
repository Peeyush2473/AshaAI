import React from 'react';
import { View, StyleSheet } from 'react-native';

// In a real app, these would come from 'src/constants/colors.js'.
const COLORS = {
  white: '#FFFFFF',
  border: '#E0E0E0', // A light grey for the border
};

/**
 * A simple, reusable card component to wrap and style content sections.
 * It provides a consistent look with padding, rounded corners, and a subtle shadow.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be displayed inside the card.
 * @param {object} [props.style] - Custom styles to override the default container style.
 */
const Card = ({ children, style }) => {
  return (
    // The View component uses an array for its style.
    // This allows us to apply the default styles first, and then merge
    // any custom styles passed in via props.
    <View style={[styles.cardContainer, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16, // Softer, more modern rounded corners
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20, // Add horizontal margin for spacing from screen edges
    
    // Shadow properties for iOS
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Elevation for Android's shadow
    elevation: 3,

    // A subtle border can add a crisp, professional finish
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});

export default Card;

