import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

// Import reusable components and constants
import Header from 'components/Header';
import COLORS from 'constants/colors';

// MOCK DATA: Realistic coordinates for health centers near Kothri Kalan, MP
const MOCK_CENTERS = [
  { id: '1', type: 'PHC', name: 'Primary Health Center, Mendua', latitude: 23.1195, longitude: 77.2358, services: 'Basic check-ups, Vaccinations' },
  { id: '2', type: 'CHC', name: 'Community Health Center, Sehore', latitude: 23.2045, longitude: 77.0850, services: 'Maternity care, Lab tests, OPD' },
  { id: '3', type: 'PHC', name: 'Primary Health Center, Billquisganj', latitude: 23.1580, longitude: 77.1650, services: 'First aid, Consultations' },
  { id: '4', type: 'Hospital', name: 'District Hospital, Sehore', latitude: 23.2001, longitude: 77.0805, services: 'Emergency, Surgery, Specialized care' }
];

const HealthLocatorScreen = () => {
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      return auth === 'granted';
    }
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Asha AI needs access to your location to find nearby health centers.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return false;
  };

  const locateCurrentUser = async () => {
    const hasPermission = await requestLocationPermission();
    if (hasPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          Alert.alert('Location Error', 'Could not fetch your location. Please ensure GPS is enabled.');
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    } else {
      Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
      setLoading(false);
    }
  };

  React.useEffect(() => {
    locateCurrentUser();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />;
    }
    if (!currentLocation) {
      return <Text style={styles.errorText}>Could not determine your location. Please enable location services and grant permission.</Text>;
    }

    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.2, // Zoom level
          longitudeDelta: 0.2, // Zoom level
        }}
        showsUserLocation={true}
      >
        {MOCK_CENTERS.map(center => (
          <Marker
            key={center.id}
            coordinate={{ latitude: center.latitude, longitude: center.longitude }}
            title={center.name}
            description={center.services}
          >
            <View style={[styles.marker, center.type === 'CHC' || center.type === 'Hospital' ? styles.chcMarker : styles.phcMarker]}>
              <Text style={styles.markerText}>{center.type}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <Header title="Nearby Health Centers" canGoBack={true} />
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  marker: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  phcMarker: {
    backgroundColor: COLORS.primary,
  },
  chcMarker: {
    backgroundColor: COLORS.success,
  },
  markerText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default HealthLocatorScreen;

