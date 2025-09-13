import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, AppState } from 'react-native';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

import LoadingModal from 'components/LoadingModal';
import COLORS from 'constants/colors';

const TEST_CONFIG = {
  anemia: {
    instruction: 'कृपया नाखून को अंडाकार गाइड के अंदर रखें', // Please place the fingernail inside the oval guide
    overlay: 'oval',
  },
  jaundice: {
    instruction: 'कृपया नवजात की आंखों को गाइड के अंदर रखें', // Please place the newborn's eyes inside the guide
    overlay: 'eye',
  },
  vitals: {
    instruction: 'कृपया चेहरे को गाइड के अंदर सीधा रखें', // Please keep the face straight inside the guide
    overlay: 'face',
  },
  default: {
    instruction: 'कृपया वस्तु को गाइड के अंदर रखें', // Please place the object inside the guide
    overlay: 'rectangle',
  }
};

const CameraOverlay = ({ type }) => {
  if (type === 'oval') {
    return <View style={[styles.overlay, styles.ovalOverlay]} />;
  }
  if (type === 'face') {
    return <View style={[styles.overlay, styles.faceOverlay]} />;
  }
  return <View style={[styles.overlay, styles.rectOverlay]} />;
};

const CameraScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const { testType } = route.params;
  const config = TEST_CONFIG[testType] || TEST_CONFIG.default;

  const device = useCameraDevice('back');
  const camera = useRef(null);

  const [hasPermission, setHasPermission] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const onCapture = async () => {
    if (camera.current == null) return;
    try {
      const photo = await camera.current.takePhoto({
        qualityPrioritization: 'speed',
        flash: 'off',
        enableShutterSound: false
      });
      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
        const mockResult = {
          anemia: { level: 'High', value: 'Hb: 9.1 g/dL' },
          jaundice: { level: 'Medium', value: 'Bilirubin: 12 mg/dL' },
          vitals: { level: 'Low', value: 'HR: 72 bpm' },
        };
        navigation.replace('Result', { result: mockResult[testType] || { level: 'Low', value: 'N/A' } });
      }, 3000);

    } catch (e) {
      console.error(e);
      setIsProcessing(false);
    }
  };

  if (device == null) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Camera not available.</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Camera permission has been denied.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <LoadingModal visible={isProcessing} text="AI विश्लेषण कर रहा है..." />
      
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isFocused}
        photo={true}
      />

      <View style={styles.topContainer}>
        <Text style={styles.instructionText}>{config.instruction}</Text>
      </View>

      <View style={styles.overlayContainer}>
        <CameraOverlay type={config.overlay} />
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.captureButton} onPress={onCapture} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.white,
    fontSize: 18,
    textAlign: 'center',
  },
  topContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
  },
  instructionText: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    backgroundColor: 'transparent',
  },
  ovalOverlay: {
    width: 150,
    height: 250,
    borderRadius: 125,
    transform: [{ scaleY: 1.5 }],
  },
  faceOverlay: {
    width: 280,
    height: 380,
    borderRadius: 140,
  },
  rectOverlay: {
    width: '80%',
    height: '50%',
    borderRadius: 20,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderWidth: 5,
    borderColor: COLORS.white,
  },
});

export default CameraScreen;

