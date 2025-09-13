import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import reusable components and constants
import Button from '../../components/Button';
import COLORS from '../../constants/colors';

// Placeholder for the logo image
const Logo = () => (
    // In a real app, you would use: <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
    // For now, we use a styled View as a placeholder.
    <View style={styles.logoPlaceholder}>
        <Text style={styles.logoText}>Asha AI</Text>
    </View>
);

const LoginScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    // Basic validation
    if (!phone || !password) {
      setError('Please fill in both fields.');
      return;
    }
    setError('');
    setIsLoading(true);

    // --- API Call Simulation ---
    // In a real app, you would call your authService here
    // const response = await authService.login({ phone, password });
    setTimeout(() => {
      // Simulate a successful login for demonstration
      if (phone === '1234567890' && password === 'password') {
        console.log('Login Successful');
        setIsLoading(false);
        // Navigate to the main part of the app
        navigation.replace('Home'); // Use replace to prevent going back to login
      } else {
        // Simulate a failed login
        setError('Invalid phone number or password.');
        setIsLoading(false);
      }
    }, 2000); // Simulate network delay
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.innerContainer}>
          <Logo />
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Log in to your Asha AI account.</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="10-digit Phone Number"
            placeholderTextColor={COLORS.textSecondary}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            maxLength={10}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={COLORS.textSecondary}
            secureTextEntry={true} // Hides the password
            value={password}
            onChangeText={setPassword}
          />

          <Button
            title="Login"
            onPress={handleLogin}
            isLoading={isLoading}
            variant="primary"
            style={{ marginTop: 20 }}
          />

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoPlaceholder: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: COLORS.primary,
      alignSelf: 'center',
      marginBottom: 30,
      justifyContent: 'center',
      alignItems: 'center',
  },
  logoText: {
      color: COLORS.white,
      fontSize: 24,
      fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 15,
  },
  errorText: {
    color: COLORS.danger,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: COLORS.textSecondary,
    fontSize: 16,
  },
  registerLink: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
