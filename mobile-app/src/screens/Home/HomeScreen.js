import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';
import Card from '../../components/Card';
import COLORS from '../../constants/colors';

// A simple component for the status indicator
const StatusIndicator = ({ isOnline = true }) => (
  <View style={styles.statusContainer}>
    <View style={[styles.statusDot, { backgroundColor: isOnline ? COLORS.success : COLORS.danger }]} />
    <Text style={styles.statusText}>{isOnline ? 'Online' : 'Offline'}</Text>
  </View>
);

// A reusable component for the dashboard menu items
const MenuItem = ({ title, subtitle, icon, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <Card style={styles.menuItemCard}>
            <View style={styles.menuItemIcon}>{icon}</View>
            <View style={styles.menuItemTextContainer}>
                <Text style={styles.menuItemTitle}>{title}</Text>
                <Text style={styles.menuItemSubtitle}>{subtitle}</Text>
            </View>
        </Card>
    </TouchableOpacity>
);


const HomeScreen = () => {
  const navigation = useNavigation();
  // In a real app, this would come from a global state or a hook
  const workerName = "Sunita Sharma"; 

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <Header title={`Namaste, ${workerName.split(' ')[0]}`} />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
            <Text style={styles.dashboardTitle}>Dashboard</Text>
            <StatusIndicator isOnline={true} />
        </View>

        {/* Primary Action Card */}
        <TouchableOpacity onPress={() => navigation.navigate('SelectTest')}>
            <View style={styles.primaryActionCard}>
                <Text style={styles.primaryActionText}>Start New Screening</Text>
                <Text style={styles.primaryActionIcon}>+</Text>
            </View>
        </TouchableOpacity>

        {/* Menu Items */}
        <MenuItem 
            title="View Citizens"
            subtitle="Manage and view screening history"
            icon={<Text style={styles.iconStyle}>👥</Text>}
            onPress={() => navigation.navigate('CitizenList')}
        />
        <MenuItem 
            title="AI Nutritionist"
            subtitle="Get AI-powered diet recommendations"
            icon={<Text style={styles.iconStyle}>🍎</Text>}
            onPress={() => navigation.navigate('Nutritionist')}
        />
         <MenuItem 
            title="Find Health Centers"
            subtitle="Locate nearest PHCs and CHCs"
            icon={<Text style={styles.iconStyle}>🏥</Text>}
            onPress={() => navigation.navigate('HealthLocator')}
        />

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
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dashboardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  primaryActionCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 8,
  },
  primaryActionText: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  primaryActionIcon: {
      color: COLORS.white,
      fontSize: 36,
      fontWeight: '300',
  },
  menuItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 0,
    padding: 15,
  },
  menuItemIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: COLORS.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
  },
  iconStyle: {
      fontSize: 24,
  },
  menuItemTextContainer: {
      flex: 1,
  },
  menuItemTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.textPrimary,
  },
  menuItemSubtitle: {
      fontSize: 14,
      color: COLORS.textSecondary,
      marginTop: 2,
  },
});

export default HomeScreen;
