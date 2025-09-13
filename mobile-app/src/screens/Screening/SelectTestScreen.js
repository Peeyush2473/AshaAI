import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// Import reusable components and constants
import Header from '../../components/Header';
import Card from '../../components/Card';
import COLORS from '../../constants/colors';

// Define the available tests with their details
const AVAILABLE_TESTS = [
  { key: 'anemia', title: 'Anemia Screening', description: 'Analyzes fingernail photos for pallor to estimate hemoglobin.', icon: '🩸' },
  { key: 'jaundice', title: 'Neonatal Jaundice', description: 'Checks for yellowing in a newborn\'s eyes to assess jaundice risk.', icon: '👶' },
  { key: 'vitals', title: 'Vital Signs Scan', description: 'Estimates heart & respiratory rate from a short facial video.', icon: '❤️' },
  { key: 'malnutrition', title: 'Malnutrition Risk', description: 'Assesses stunting/wasting risks in children under 5.', icon: '⚖️' },
];

const SelectTestScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Get the citizenId passed from the previous screen
  const { citizenId } = route.params;

  const handleTestSelection = (testKey) => {
    // Navigate to the Camera screen, passing both the citizenId and the selected test type
    navigation.navigate('Camera', { citizenId, testType: testKey });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <Header title="Select a Screening" canGoBack={true} />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Choose a Test</Text>
          <Text style={styles.subtitle}>Select the health screening you want to perform.</Text>
        </View>

        {AVAILABLE_TESTS.map((test) => (
          <TouchableOpacity 
            key={test.key}
            onPress={() => handleTestSelection(test.key)}
            activeOpacity={0.7}
          >
            <Card style={styles.testCard}>
              <Text style={styles.icon}>{test.icon}</Text>
              <View style={styles.textContainer}>
                <Text style={styles.testTitle}>{test.title}</Text>
                <Text style={styles.testDescription}>{test.description}</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  headerContainer: {
      paddingHorizontal: 20,
      marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  testCard: {
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    fontSize: 32,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  testTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  testDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  arrow: {
      fontSize: 24,
      color: COLORS.textSecondary,
  }
});

export default SelectTestScreen;
