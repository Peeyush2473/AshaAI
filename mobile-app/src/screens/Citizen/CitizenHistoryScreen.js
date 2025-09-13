import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// Import reusable components and helpers
import Header from '../../components/Header';
import Card from '../../components/Card';
import ResultPill from '../../components/ResultPill';
import Button from '../../components/Button';
import COLORS from '../../constants/colors';
import formatDate from '../../helpers/dateFormatter';

// MOCK DATA: In a real application, this detailed history would be fetched
// from the on-device database using the citizenId.
const MOCK_HISTORY = {
  '1': [ // Corresponds to Priya Sharma
    { id: 'h1', type: 'Anemia Screening', date: '2025-09-13T10:00:00Z', value: 'Hb: 9.1 g/dL', level: 'High' },
    { id: 'h2', type: 'Vitals Check', date: '2025-08-20T11:30:00Z', value: 'BP: 125/85 mmHg', level: 'Low' },
    { id: 'h3', type: 'Anemia Screening', date: '2025-07-15T09:00:00Z', value: 'Hb: 10.2 g/dL', level: 'Medium' },
  ],
  '2': [ // Corresponds to Rohan Verma
    { id: 'h4', type: 'Malnutrition Check', date: '2025-09-10T14:00:00Z', value: 'Weight-for-age: -2 Z', level: 'Medium' },
  ],
  // Other citizens would have their own history arrays
};


const CitizenHistoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Get the citizen's ID and name passed from the previous screen
  const { citizenId, citizenName } = route.params;

  // Fetch the specific history for this citizen
  const screeningHistory = MOCK_HISTORY[citizenId] || [];

  // This component will be rendered at the top of the list
  const ListHeader = () => (
    <Card style={styles.summaryCard}>
      <Text style={styles.summaryText}>Viewing complete health record for {citizenName}.</Text>
      <Button 
        title="Start New Screening"
        onPress={() => navigation.navigate('SelectTest', { citizenId })}
        variant="primary"
      />
    </Card>
  );

  // Renders each item in the FlatList
  const renderHistoryItem = ({ item }) => (
    <Card style={styles.historyCard}>
      <View style={styles.historyHeader}>
        <Text style={styles.screeningType}>{item.type}</Text>
        <Text style={styles.screeningDate}>{formatDate(item.date)}</Text>
      </View>
      <View style={styles.historyBody}>
        <Text style={styles.screeningValue}>{item.value}</Text>
        <ResultPill level={item.level} />
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <Header title={citizenName} canGoBack={true} />

      <FlatList
        data={screeningHistory}
        renderItem={renderHistoryItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No screening history found for {citizenName}.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContainer: {
    paddingVertical: 10,
  },
  summaryCard: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  historyCard: {
    marginVertical: 8,
    marginHorizontal: 20,
    padding: 20,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 10,
  },
  screeningType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  screeningDate: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  historyBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  screeningValue: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default CitizenHistoryScreen;

