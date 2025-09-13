import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const COLORS = {
  white: '#FFFFFF',
  success: '#2E7D32',
  warning: '#FFB300',
  danger: '#C62828',
};

const ResultPill = ({ level, style }) => {
  const getLevelStyles = () => {
    switch (level?.toLowerCase()) {
      case 'high':
        return { backgroundColor: COLORS.danger, text: 'High Risk' };
      case 'medium':
        return { backgroundColor: COLORS.warning, text: 'Medium Risk' };
      case 'low':
        return { backgroundColor: COLORS.success, text: 'Normal' };
      default:
        return { backgroundColor: '#BDBDBD', text: 'Unknown' };
    }
  };

  const { backgroundColor, text } = getLevelStyles();

  return (
    <View style={[styles.pillContainer, { backgroundColor }, style]}>
      <Text style={styles.pillText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'NotoSansDevanagari-Bold',
  },
});

export default ResultPill;

