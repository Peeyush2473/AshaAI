import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

// Import reusable components and constants
import Card from 'components/Card';
import Button from 'components/Button';
import COLORS from 'constants/colors';

// Helper function to get styles based on the result level
const getResultStyles = (level) => {
  switch (level?.toLowerCase()) {
    case 'high':
      return {
        backgroundColor: COLORS.danger,
        icon: '⚠️',
        title: 'High Risk Detected',
        advice: 'Immediate medical attention is recommended. Please guide the individual to the nearest Primary Health Center (PHC).',
      };
    case 'medium':
      return {
        backgroundColor: COLORS.warning,
        icon: '🔔',
        title: 'Medium Risk Detected',
        advice: 'A follow-up is advised. Please recommend dietary changes and schedule another screening in 2-4 weeks.',
      };
    case 'low':
      return {
        backgroundColor: COLORS.success,
        icon: '✅',
        title: 'Normal / Low Risk',
        advice: 'No immediate action required. Continue with regular health monitoring and a balanced diet.',
      };
    default:
      return {
        backgroundColor: COLORS.disabled,
        icon: '❓',
        title: 'Result Unknown',
        advice: 'Could not determine the result. Please try the screening again in better lighting conditions.',
      };
  }
};

const ResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Get the result object passed from the CameraScreen
  const { result } = route.params;
  const { backgroundColor, icon, title, advice } = getResultStyles(result.level);

  const handleDone = () => {
    // Navigate back to the main home screen, clearing the screening flow history
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
      
      <Animatable.View 
        animation="bounceIn" 
        duration={1000}
        style={styles.resultContent}
      >
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.valueText}>{result.value}</Text>
      </Animatable.View>
      
      <Animatable.View 
        animation="slideInUp" 
        duration={800}
        style={styles.bottomCardContainer}
      >
        <Card style={styles.adviceCard}>
          <Text style={styles.adviceTitle}>Next Steps & Advice</Text>
          <Text style={styles.adviceText}>{advice}</Text>
          <Button
            title="Done"
            onPress={handleDone}
            variant="primary"
            style={{ marginTop: 20 }}
          />
        </Card>
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
  valueText: {
    fontSize: 20,
    color: COLORS.white,
    opacity: 0.9,
    marginTop: 10,
  },
  bottomCardContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  adviceCard: {
    margin: 20,
    marginBottom: 40, // Extra margin for safe area
  },
  adviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 15,
  },
  adviceText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default ResultScreen;
