import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';

// Theme colors (matching your existing theme)
const COLORS = {
  primary: '#e60000', // Red
  secondary: '#000000', // Black
  background: '#f5f5f5',
  cardBackground: '#ffffff',
  text: '#000000',
  inputBackground: '#f0f0f0',
  inputBorder: '#cccccc',
  facebook: '#1877F2',
  google: '#4285F4',
};

// User data interface
interface UserData {
  userId: string;
  email: string;
}

// Mock authentication functions (replace with real auth later)
const mockSignIn = async (email: string, password: string): Promise<UserData> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  
  // In production, this would be a real authentication call
  return { userId: 'user123', email };
};

const mockSignUp = async (email: string, password: string, confirmPassword: string): Promise<UserData> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (!email || !password || !confirmPassword) {
    throw new Error('All fields are required');
  }
  
  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }
  
  // In production, this would create a real user account
  return { userId: 'newUser456', email };
};

// Mock OAuth handlers (replace with real OAuth implementation)
const handleGoogleSignIn = async (): Promise<UserData> => {
  try {
    // This is just a placeholder - in a real app, use expo-auth-session or similar
    await WebBrowser.openAuthSessionAsync(
      'https://accounts.google.com/',
      Constants.manifest?.scheme ? `${Constants.manifest.scheme}:/` : null
    );
    // Handle return from OAuth provider
    return { userId: 'google123', email: 'google@example.com' };
  } catch (error) {
    console.error('Google sign in error:', error);
    throw error;
  }
};

const handleFacebookSignIn = async (): Promise<UserData> => {
  try {
    // This is just a placeholder - in a real app, use expo-auth-session or similar
    await WebBrowser.openAuthSessionAsync(
      'https://www.facebook.com/login',
      Constants.manifest?.scheme ? `${Constants.manifest.scheme}:/` : null
    );
    // Handle return from OAuth provider
    return { userId: 'facebook456', email: 'facebook@example.com' };
  } catch (error) {
    console.error('Facebook sign in error:', error);
    throw error;
  }
};

const SignInScreen = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if user is already signed in
    checkAuthStatus();
  }, []);
  
  const checkAuthStatus = async (): Promise<void> => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        // User is already authenticated, navigate to profile
        router.replace('/');
      }
    } catch (error) {
      console.error('Auth check error:', error);
    }
  };
  
  const handleAuthentication = async (): Promise<void> => {
    setLoading(true);
    try {
      let userData: UserData;
      
      if (isSignUp) {
        userData = await mockSignUp(email, password, confirmPassword);
      } else {
        userData = await mockSignIn(email, password);
      }
      
      // Save user data
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      
      // Navigate to profile screen
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Authentication Error', error.message || 'Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSocialAuth = async (provider: 'google' | 'facebook'): Promise<void> => {
    setLoading(true);
    try {
      let userData: UserData;
      
      if (provider === 'google') {
        userData = await handleGoogleSignIn();
      } else {
        userData = await handleFacebookSignIn();
      }
      
      // Save user data
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      
      // Navigate to profile screen
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Social Sign-In Error', error.message || 'Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };
  
  const toggleAuthMode = (): void => {
    setIsSignUp(!isSignUp);
    // Clear fields when switching modes
    setPassword('');
    setConfirmPassword('');
  };
  
  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>MuscleSense</Text>
              <Text style={styles.subHeaderText}>
                {isSignUp ? 'Create Your Account' : 'Welcome Back'}
              </Text>
            </View>
            
            <View style={styles.card}>
              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#777"
                />
              </View>
              
              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#777"
                />
              </View>
              
              {/* Confirm Password (Sign Up only) */}
              {isSignUp && (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm your password"
                    placeholderTextColor="#777"
                  />
                </View>
              )}
              
              {/* Authentication Button */}
              <TouchableOpacity
                style={styles.authButton}
                onPress={handleAuthentication}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.authButtonText}>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                  </Text>
                )}
              </TouchableOpacity>
              
              {/* Toggle between Sign In and Sign Up */}
              <TouchableOpacity
                style={styles.toggleContainer}
                onPress={toggleAuthMode}
              >
                <Text style={styles.toggleText}>
                  {isSignUp
                    ? 'Already have an account? Sign In'
                    : 'Need an account? Sign Up'}
                </Text>
              </TouchableOpacity>
              
              {/* OR Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.divider} />
              </View>
              
              {/* Social Sign In Buttons */}
              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity
                  style={[styles.socialButton, { backgroundColor: COLORS.google }]}
                  onPress={() => handleSocialAuth('google')}
                  disabled={loading}
                >
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.socialButton, { backgroundColor: COLORS.facebook }]}
                  onPress={() => handleSocialAuth('facebook')}
                  disabled={loading}
                >
                  <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  subHeaderText: {
    fontSize: 18,
    color: COLORS.secondary,
    marginTop: 5,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
    color: COLORS.secondary,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: COLORS.inputBackground,
    color: COLORS.secondary,
  },
  authButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  authButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  toggleText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.inputBorder,
  },
  dividerText: {
    marginHorizontal: 10,
    color: COLORS.secondary,
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  socialButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SignInScreen;