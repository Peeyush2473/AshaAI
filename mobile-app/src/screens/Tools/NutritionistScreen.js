import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import Header from 'components/Header';
import Card from 'components/Card';
import Button from 'components/Button';
import LoadingModal from 'components/LoadingModal';
import COLORS from 'constants/colors';

const generateMockPlan = (goal, preference) => {
  const vegBreakfast = ['Poha with Peanuts', 'Sprouts Salad', 'Besan Cheela', 'Oats Upma'];
  const vegLunchDinner = ['Dal, Roti, Sabzi (Spinach)', 'Rajma Chawal with Salad', 'Mixed Vegetable Curry with Roti', 'Chole Bhature (Homemade)', 'Paneer Butter Masala with Naan'];
  
  let plan = {
    goal,
    preference,
    days: [],
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  for (let i = 0; i < 7; i++) {
    plan.days.push({
      day: daysOfWeek[i],
      breakfast: vegBreakfast[i % vegBreakfast.length],
      lunch: vegLunchDinner[i % vegLunchDinner.length],
      dinner: vegLunchDinner[(i + 1) % vegLunchDinner.length],
    });
  }
  return plan;
};

const NutritionistScreen = () => {
  const navigation = useNavigation();
  const [goal, setGoal] = useState('iron');
  const [preference, setPreference] = useState('veg');
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState(null);

  const handleGeneratePlan = () => {
    setIsLoading(true);
    setPlan(null);
    setTimeout(() => {
      const newPlan = generateMockPlan(goal, preference);
      setPlan(newPlan);
      setIsLoading(false);
    }, 2500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <Header title="AI Nutritionist" canGoBack={true} />
      <LoadingModal visible={isLoading} text="Creating personalized plan..." />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card>
          <Text style={styles.title}>Create a Weekly Meal Plan</Text>
          <Text style={styles.subtitle}>Fill in the details to generate a budget-friendly and healthy meal plan.</Text>

          <Text style={styles.label}>Primary Health Goal</Text>
          <View style={styles.segmentedControl}>
            <TouchableOpacity
              style={[styles.segment, goal === 'iron' && styles.segmentActive]}
              onPress={() => setGoal('iron')}>
              <Text style={[styles.segmentText, goal === 'iron' && styles.segmentTextActive]}>Increase Iron</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.segment, goal === 'wellness' && styles.segmentActive]}
              onPress={() => setGoal('wellness')}>
              <Text style={[styles.segmentText, goal === 'wellness' && styles.segmentTextActive]}>Wellness</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Dietary Preference</Text>
          <View style={styles.segmentedControl}>
            <TouchableOpacity
              style={[styles.segment, preference === 'veg' && styles.segmentActive]}
              onPress={() => setPreference('veg')}>
              <Text style={[styles.segmentText, preference === 'veg' && styles.segmentTextActive]}>Vegetarian</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.segment, preference === 'non-veg' && styles.segmentActive]}
              onPress={() => setPreference('non-veg')}>
              <Text style={[styles.segmentText, preference === 'non-veg' && styles.segmentTextActive]}>Non-Veg</Text>
            </TouchableOpacity>
          </View>

          <Button title="Generate Plan" onPress={handleGeneratePlan} style={{ marginTop: 20 }} />
        </Card>

        {plan && (
          <Animatable.View animation="fadeInUp">
            <Card style={styles.planCard}>
              <Text style={styles.planTitle}>Your 7-Day Meal Plan</Text>
              {plan.days.map((dayPlan) => (
                <View key={dayPlan.day} style={styles.dayContainer}>
                  <Text style={styles.dayTitle}>{dayPlan.day}</Text>
                  <Text style={styles.mealText}><Text style={styles.mealType}>Breakfast:</Text> {dayPlan.breakfast}</Text>
                  <Text style={styles.mealText}><Text style={styles.mealType}>Lunch:</Text> {dayPlan.lunch}</Text>
                  <Text style={styles.mealText}><Text style={styles.mealType}>Dinner:</Text> {dayPlan.dinner}</Text>
                </View>
              ))}
            </Card>
          </Animatable.View>
        )}
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
    paddingVertical: 10,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 20,
    marginBottom: 10,
  },
  segmentedControl: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  segmentText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  segmentTextActive: {
    color: COLORS.white,
  },
  planCard: {
    marginTop: 20,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  dayContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 15,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  mealText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  mealType: {
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});

export default NutritionistScreen;

