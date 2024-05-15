import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const AddVideoScreen = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const handlePendingAppointments = () => {
    // Navigate to screen with pending appointments
  };

  const handleAcceptedAppointments = () => {
    // Navigate to screen with accepted appointments
  };

  const handleRejectedAppointments = () => {
    // Navigate to screen with rejected appointments
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
      <Text style={styles.button1Text}>List Of Appointments</Text>
        <TouchableOpacity style={styles.arrowButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={windowWidth * 0.08} color="#333333" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePendingAppointments}>
          <Text style={styles.buttonText}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAcceptedAppointments}>
          <Text style={styles.buttonText}>Accepted </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRejectedAppointments}>
          <Text style={styles.buttonText}>Rejected </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2DC2D7',
    paddingTop: Dimensions.get('window').height * 0.12,
    paddingHorizontal: Dimensions.get('window').width * 0.06,
    zIndex: 1,
  },
  arrowButton: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.06, // Adjust top position for arrow
    left: Dimensions.get('window').width * 0.06,
  },
  buttonContainer: {
    flexDirection: 'row', // Align buttons horizontally
    justifyContent: 'space-evenly', // Distribute space evenly between buttons
    alignItems: 'center', // Align items vertically
    marginTop: Dimensions.get('window').height * 0.12, // Adjust margin as needed
  },
  button: {
    backgroundColor: '#2DC2D7',
    borderRadius: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
    marginHorizontal: -1,
    borderWidth: 2, // Border width
    borderColor: '#000000', // Border color
    shadowColor: '#000000', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.4, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 8, // Elevation for Android
  },
  button1Text: {
    color: '#000000',
    fontSize: 24,
    marginTop: Dimensions.get('window').height * -0.06,
    left: Dimensions.get('window').width * 0.12,
    
  },
  
});

export default AddVideoScreen;
