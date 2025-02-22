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

// Theme colors (matching existing theme)
const COLORS = {
  primary: '#e60000',
  secondary: '#000000',
  background: '#f5f5f5',
  cardBackground: '#ffffff',
  text: '#000000',
  inputBackground: '#f0f0f0',
  inputBorder: '#cccccc',
  teal: '#2D8B7F',
};

const HomeScreen = () => {
  const navigateToTrackersList = () => {
    router.push('/trackers');
  };

  const navigateToProfile = () => {
    router.push('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MuscleSense</Text>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={navigateToTrackersList}
        >
          <Ionicons name="list" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.tabContainer}>
          <Text style={styles.activeTab}>Progress</Text>
          <Text style={styles.tab}>Snap</Text>
          <Text style={styles.tab}>Plans</Text>
          <Text style={styles.tab}>Streaks</Text>
        </View>

        <Text style={styles.sectionTitle}>Today's Goals</Text>

        {/* Food Tracker Card */}
        <View style={styles.card}>
          <View style={styles.trackerHeader}>
            <View style={styles.trackerInfo}>
              <Ionicons name="restaurant-outline" size={24} color={COLORS.secondary} />
              <View style={styles.trackerTextContainer}>
                <Text style={styles.trackerTitle}>Track Food</Text>
                <Text style={styles.trackerSubtitle}>Target: 1,700 cal</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Ionicons name="add-circle-outline" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.nutritionGrid}>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>Protein:</Text>
              <Text style={styles.nutritionValue}>0%</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>Carb:</Text>
              <Text style={styles.nutritionValue}>0%</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>Fat:</Text>
              <Text style={styles.nutritionValue}>0%</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>Fibre:</Text>
              <Text style={styles.nutritionValue}>0%</Text>
            </View>
          </View>
        </View>

        {/* Weight Tracker Card */}
        <View style={styles.card}>
          <View style={styles.trackerHeader}>
            <View style={styles.trackerInfo}>
              <Ionicons name="scale-outline" size={24} color={COLORS.secondary} />
              <View style={styles.trackerTextContainer}>
                <Text style={styles.trackerTitle}>Weight</Text>
                <Text style={styles.trackerSubtitle}>0 kg of 20.8 kg Lost</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Ionicons name="add-circle-outline" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Workout Tracker Card */}
        <View style={styles.card}>
          <View style={styles.trackerHeader}>
            <View style={styles.trackerInfo}>
              <Ionicons name="fitness-outline" size={24} color={COLORS.secondary} />
              <View style={styles.trackerTextContainer}>
                <Text style={styles.trackerTitle}>Workout</Text>
                <Text style={styles.trackerSubtitle}>Goal: 338 cal</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Ionicons name="add-circle-outline" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Steps Tracker Card */}
        <View style={styles.card}>
          <View style={styles.trackerHeader}>
            <View style={styles.trackerInfo}>
              <Ionicons name="footsteps-outline" size={24} color={COLORS.secondary} />
              <View style={styles.trackerTextContainer}>
                <Text style={styles.trackerTitle}>Steps</Text>
                <Text style={styles.trackerSubtitle}>Goal: 10,000 steps</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Ionicons name="add-circle-outline" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.cardBackground,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  iconButton: {
    padding: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: COLORS.cardBackground,
    marginBottom: 16,
  },
  tab: {
    marginRight: 24,
    color: '#999999',
    fontSize: 16,
  },
  activeTab: {
    marginRight: 24,
    color: COLORS.teal,
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  trackerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackerTextContainer: {
    marginLeft: 12,
  },
  trackerTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  trackerSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  nutritionGrid: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  nutritionItem: {
    width: '50%',
    marginBottom: 8,
  },
  nutritionLabel: {
    fontSize: 14,
    color: '#666666',
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default HomeScreen;