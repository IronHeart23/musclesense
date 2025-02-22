import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  primary: '#e60000',
  secondary: '#000000',
  background: '#f5f5f5',
  cardBackground: '#ffffff',
  calorie: '#FF6B3D',
  water: '#3DA9FC',
  steps: '#2D8B7F',
  workout: '#4361EE',
  weight: '#9B5DE5',
};

interface TrackerItem {
    id: string;
    name: string;
    icon: IconName; // Use the specific type here
    color: string;
  }

// Define the IconName type
type IconName = 
  | 'restaurant'
  | 'water'
  | 'footsteps'
  | 'fitness'
  | 'scale'
  | 'restaurant-outline'
  | 'water-outline'
  | 'footsteps-outline'
  | 'fitness-outline'
  | 'scale-outline';

const trackers: TrackerItem[] = [
  {
    id: 'calorie',
    name: 'Calorie Tracker',
    icon: 'restaurant',
    color: COLORS.calorie,
  },
  {
    id: 'water',
    name: 'Water Tracker',
    icon: 'water',
    color: COLORS.water,
  },
  {
    id: 'steps',
    name: 'Steps Tracker',
    icon: 'footsteps',
    color: COLORS.steps,
  },
  {
    id: 'workout',
    name: 'Workout Tracker',
    icon: 'fitness',
    color: COLORS.workout,
  },
  {
    id: 'weight',
    name: 'Weight Tracker',
    icon: 'scale',
    color: COLORS.weight,
  },
];

const TrackersListScreen = () => {
    const handleBack = () => {
      router.back();
    };
  
    const handleTrackerSelect = (trackerId: string) => {
      console.log(`Selected tracker: ${trackerId}`);
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Your Trackers</Text>
          <View style={styles.placeholder} />
        </View>
  
        <ScrollView style={styles.scrollContainer}>
          {trackers.map((tracker) => (
            <TouchableOpacity
              key={tracker.id}
              style={styles.trackerItem}
              onPress={() => handleTrackerSelect(tracker.id)}
            >
              <View style={[styles.iconContainer, { backgroundColor: tracker.color }]}>
                <Ionicons name={`${tracker.icon}-outline` as IconName} size={24} color="white" />
              </View>
              <Text style={styles.trackerName}>{tracker.name}</Text>
              <Ionicons name="chevron-forward" size={24} color="#666666" />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    padding: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  placeholder: {
    width: 40, // To balance the back button
  },
  scrollContainer: {
    flex: 1,
  },
  trackerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  trackerName: {
    flex: 1,
    fontSize: 16,
    color: COLORS.secondary,
  },
});

export default TrackersListScreen;