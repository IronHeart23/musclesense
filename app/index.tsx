import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

// User data interface
interface UserData {
  userId: string;
  email: string;
}

// Profile data interface
interface ProfileData {
  age: string;
  gender: string;
  weight: string;
  weightUnit: string;
  dietaryPreferences: string;
  fitnessGoals: string;
}

// Theme colors
const COLORS = {
  primary: '#e60000', // Red
  secondary: '#000000', // Black
  background: '#f5f5f5',
  cardBackground: '#ffffff',
  text: '#000000',
  inputBackground: '#f0f0f0',
  inputBorder: '#cccccc',
}

const UserProfileScreen = () => {
  const [userAuth, setUserAuth] = useState<UserData | null>(null);
  const [profile, setProfile] = useState<ProfileData>({
    age: '',
    gender: 'Male',
    weight: '',
    weightUnit: 'kg',
    dietaryPreferences: '',
    fitnessGoals: '',
  });

  useEffect(() => {
    checkAuthAndLoadProfile();
  }, []);

  const checkAuthAndLoadProfile = async (): Promise<void> => {
    try {
      // Check authentication status
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        // Redirect to sign in if not authenticated
        router.replace('/signin');
        return;
      }
      
      setUserAuth(JSON.parse(userData));
      
      // Load profile data
      const savedProfile = await AsyncStorage.getItem('userProfile');
      if (savedProfile !== null) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error('Load error:', error);
    }
  };

  const saveProfile = async (): Promise<void> => {
    try {
      if (!profile.age || !profile.weight || !profile.fitnessGoals) {
        Alert.alert('Missing Information', 'Please fill in all required fields');
        return;
      }

      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      await AsyncStorage.setItem('isProfileComplete', 'true');
      
      // Navigate to home screen after successful save
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', 'Failed to save your profile');
      console.error('Save error:', error);
    }
  };
  const handleSignOut = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('userData');
      router.replace('/signin');
    } catch (error) {
      console.error('Sign out error:', error);
      Alert.alert('Error', 'Failed to sign out');
    }
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
              <Text style={styles.subHeaderText}>Your Personal Fitness Profile</Text>
              {userAuth && (
                <Text style={styles.emailText}>Logged in as: {userAuth.email}</Text>
              )}
            </View>
            
            <View style={styles.card}>
              {/* Age Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Age (years) *</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={profile.age}
                  onChangeText={(text) => setProfile({ ...profile, age: text.replace(/[^0-9]/g, '') })}
                  placeholder="Enter your age"
                  maxLength={3}
                  placeholderTextColor="#777"
                />
              </View>
              
              {/* Gender Selection */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Gender</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={profile.gender}
                    style={styles.picker}
                    onValueChange={(itemValue) => setProfile({ ...profile, gender: itemValue })}
                  >
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                    <Picker.Item label="Non-binary" value="Non-binary" />
                    <Picker.Item label="Prefer not to say" value="Not specified" />
                  </Picker>
                </View>
              </View>
              
              {/* Weight Input with Unit Selection */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Weight *</Text>
                <View style={styles.weightContainer}>
                  <TextInput
                    style={[styles.input, styles.weightInput]}
                    keyboardType="numeric"
                    value={profile.weight}
                    onChangeText={(text) => setProfile({ ...profile, weight: text.replace(/[^0-9.]/g, '') })}
                    placeholder="Enter your weight"
                    placeholderTextColor="#777"
                  />
                  <TouchableOpacity
                    style={styles.weightUnitButton}
                    onPress={() => setProfile({
                      ...profile,
                      weightUnit: profile.weightUnit === 'kg' ? 'lb' : 'kg'
                    })}
                  >
                    <Text style={styles.weightUnitText}>{profile.weightUnit}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              {/* Dietary Preferences */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Dietary Preferences</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  multiline
                  numberOfLines={3}
                  value={profile.dietaryPreferences}
                  onChangeText={(text) => setProfile({ ...profile, dietaryPreferences: text })}
                  placeholder="E.g., Vegetarian, Keto, Gluten-free, etc."
                  placeholderTextColor="#777"
                />
              </View>
              
              {/* Fitness Goals */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Fitness Goals *</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  multiline
                  numberOfLines={4}
                  value={profile.fitnessGoals}
                  onChangeText={(text) => setProfile({ ...profile, fitnessGoals: text })}
                  placeholder="Describe your fitness goals (e.g., Build muscle, lose weight, improve endurance)"
                  placeholderTextColor="#777"
                />
              </View>
              
              {/* Save Button */}
              <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
                <Text style={styles.saveButtonText}>Save Profile</Text>
              </TouchableOpacity>
              
              {/* Sign Out Button */}
              <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <Text style={styles.signOutButtonText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default UserProfileScreen;

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
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  subHeaderText: {
    fontSize: 16,
    color: COLORS.secondary,
    marginTop: 5,
  },
  emailText: {
    fontSize: 14,
    color: COLORS.secondary,
    marginTop: 5,
    fontStyle: 'italic',
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 8,
    backgroundColor: COLORS.inputBackground,
  },
  picker: {
    height: 50,
    color: COLORS.secondary,
  },
  weightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weightInput: {
    flex: 3,
  },
  weightUnitButton: {
    flex: 1,
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  weightUnitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signOutButton: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  signOutButtonText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: '500',
  },
});