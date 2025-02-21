import React, { useEffect, useState } from 'react';
import { Stack } from "expo-router";
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async (): Promise<void> => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      setIsAuthenticated(!!userData);
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
    }
  };

  // Show a loading screen while checking authentication
  if (isAuthenticated === null) {
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
      {/* Common screens */}
      <Stack.Screen name="index" options={{ title: "MuscleSense Profile" }} />
      
      {/* Auth-specific screens */}
      <Stack.Screen name="signin" options={{ 
        title: "Sign In", 
        headerShown: false,
        presentation: 'modal' 
      }} />
    </Stack>
  );
}