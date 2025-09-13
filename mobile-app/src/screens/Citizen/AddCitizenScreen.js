import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import reusable components and constants
import Button from '../../components/Button';
import Header from '../../components/Header';
import COLORS from '../../constants/colors';

const AddCitizenScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(''); // Could be 'Male', 'Female', 'Other'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSaveCitizen = () => {
    // Basic Form Validation
    if (!fullName || !age || !gender) {
      setError('Please fill in all fields.');
      return;
    }
    if (isNaN(age) || parseInt(age) <= 0) {
      setError('Please enter a valid age.');
      return;
    }

    setError('');
    setIsLoading(true);

    // --- Database Save Simulation ---
    // In a real app, you would call your dbService here to save the citizen
    // to the on-device SQLite database.
    setTimeout(() => {
      console.log('Citizen Saved:', { fullName, age, gender });
      setIsLoading(false);
      
      // Show a success alert
      Alert.alert(
        'Success',
        `${fullName} has been registered successfully.`,
        [{ text: 'OK', onPress: () => navigation.goBack() }] // Go back after user presses OK
      );
    }, 1500); // Simulate save delay
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Register New Citizen" canGoBack={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <Text style={styles.title}>Citizen Information</Text>
          <Text style={styles.subtitle}>Enter the details of the new person.</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Priya Sharma"
            placeholderTextColor={COLORS.textSecondary}
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.label}>Age (in years)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 28"
            placeholderTextColor={COLORS.textSecondary}
            keyboardType="number-pad"
            value={age}
            onChangeText={setAge}
          />
          
          <Text style={styles.label}>Gender</Text>
          {/* A simple text input for gender. Could be replaced with a picker/dropdown. */}
          <TextInput
            style={styles.input}
            placeholder="e.g., Female, Male, Other"
            placeholderTextColor={COLORS.textSecondary}
            value={gender}
            onChangeText={setGender}
          />

          <Button
            title="Save Citizen"
            onPress={handleSaveCitizen}
            isLoading={isLoading}
            variant="primary"
            style={{ marginTop: 30 }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  innerContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 30,
  },
  label: {
      fontSize: 16,
      color: COLORS.textSecondary,
      marginBottom: 8,
      fontWeight: '500',
  },
  input: {
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  errorText: {
    color: COLORS.danger,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
  },
});

export default AddCitizenScreen;
