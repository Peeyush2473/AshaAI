import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import reusable components and constants
import Header from '../../components/Header';
import Card from '../../components/Card';
import ResultPill from '../../components/ResultPill';
import COLORS from '../../constants/colors';

// MOCK DATA: In a real application, this would come from the on-device
// database via `dbService.js`.
const MOCK_CITIZENS = [
  { id: '1', name: 'Priya Sharma', age: 28, gender: 'Female', lastScreening: { type: 'Anemia', level: 'High' } },
  { id: '2', name: 'Rohan Verma', age: 5, gender: 'Male', lastScreening: { type: 'Malnutrition', level: 'Medium' } },
  { id: '3', name: 'Anjali Singh', age: 32, gender: 'Female', lastScreening: { type: 'Anemia', level: 'Low' } },
  { id: '4', name: 'Vikram Patel', age: 45, gender: 'Male', lastScreening: { type: 'Vitals', level: 'Low' } },
  { id: '5', name: 'Sita Kumari', age: 22, gender: 'Female', lastScreening: { type: 'Anemia', level: 'Medium' } },
  { id: '6', name: 'Arjun Reddy', age: 7, gender: 'Male', lastScreening: { type: 'Jaundice', level: 'Low' } },
  { id: '7', name: 'Meena Gupta', age: 60, gender: 'Female', lastScreening: { type: 'Vitals', level: 'High' } },
];

const CitizenListScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [citizens] = useState(MOCK_CITIZENS); // In a real app, this would be fetched from a DB

  // Memoize the filtered citizens list to prevent recalculation on every render
  const filteredCitizens = useMemo(() => {
    if (!searchQuery) {
      return citizens;
    }
    return citizens.filter(citizen =>
      citizen.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, citizens]);

  // Renders each item in the FlatList
  const renderCitizenItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('CitizenHistory', { citizenId: item.id, citizenName: item.name })}>
      <Card style={styles.citizenCard}>
        <View style={styles.citizenInfo}>
          <Text style={styles.citizenName}>{item.name}</Text>
          <Text style={styles.citizenDetails}>{item.age} years old • {item.gender}</Text>
        </View>
        <View style={styles.citizenStatus}>
            <Text style={styles.lastScreeningText}>Last Screening</Text>
            <ResultPill level={item.lastScreening.level} />
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <Header title="Registered Citizens" canGoBack={true} />

        {/* Search Bar */}
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by name..."
                placeholderTextColor={COLORS.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
        </View>

        <FlatList
            data={filteredCitizens}
            renderItem={renderCitizenItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No citizens found.</Text>
                </View>
            )}
        />

        {/* Floating Action Button to Add Citizen */}
        <TouchableOpacity
            style={styles.fab}
            onPress={() => navigation.navigate('AddCitizen')}
        >
            <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchInput: {
    backgroundColor: COLORS.background,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    fontSize: 16,
  },
  listContainer: {
    paddingVertical: 10,
  },
  citizenCard: {
    marginVertical: 8,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  citizenInfo: {
    flex: 1,
  },
  citizenName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  citizenDetails: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  citizenStatus: {
      alignItems: 'flex-end',
  },
  lastScreeningText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabIcon: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: '300',
    lineHeight: 34, // Adjust for vertical centering
  },
});

export default CitizenListScreen;

