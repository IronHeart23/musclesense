import React, { useEffect, useState } from 'react';
import { Stack } from "expo-router";
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkInitialRoute();
  }, []);

  const checkInitialRoute = async (): Promise<void> => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const isProfileComplete = await AsyncStorage.getItem('isProfileComplete');

      if (!userData) {
        router.replace('/signin');
      } else if (!isProfileComplete) {
        router.replace('/');  // Go to profile setup
      } else {
        router.replace('/home');  // Go to home if everything is set up
      }
    } catch (error) {
      console.error('Navigation check error:', error);
      router.replace('/signin');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#e60000" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#e60000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="signin" 
        options={{ 
          title: "Sign In",
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Complete Your Profile",
          headerShown: true
        }} 
      />
      <Stack.Screen 
        name="home" 
        options={{ 
          headerShown: false,
          gestureEnabled: false 
        }} 
      />
      <Stack.Screen 
        name="trackers" 
        options={{ 
          headerShown: false,
          presentation: 'modal'
        }} 
      />
    </Stack>
  );
}