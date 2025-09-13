import React from 'react';
import { View, Modal, StyleSheet, ActivityIndicator, Text } from 'react-native';

// In a real app, these would come from 'src/constants/colors.js'.
const COLORS = {
  white: '#FFFFFF',
  primary: '#0D47A1', // Deep Blue for the spinner
  textPrimary: '#212121',
};

/**
 * A modal overlay that shows a loading spinner and a message.
 * It's used to inform the user that a process is running in the background,
 * like AI analysis or data syncing.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.visible - Controls whether the modal is visible or not.
 * @param {string} [props.text='Processing...'] - The text to display below the spinner.
 */
const LoadingModal = ({ visible, text = 'Processing...' }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      // This is required for Android, but we don't want the user
      // to be able to close the loading modal with the back button, so it's empty.
      onRequestClose={() => {}}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator size="large" color={COLORS.primary} animating={visible} />
          <Text style={styles.loadingText}>{text}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  activityIndicatorWrapper: {
    backgroundColor: COLORS.white,
    height: 150,
    width: 220,
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // Android Shadow
    elevation: 5,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 10,
    fontFamily: 'NotoSansDevanagari-Regular', // Assuming custom fonts
  },
});

export default LoadingModal;