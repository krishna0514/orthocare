import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const ContainerWithArrow = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    console.log('Go back action triggered');
  };

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.text}>Questionnaires</Text>
        <TouchableOpacity style={styles.arrowButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={30} color="#333333" /> 
        </TouchableOpacity>
      </View>
      <View style={styles.panel}>
        <TouchableOpacity style={styles.button} onPress={() => navigateToScreen('MedicalHistory')}>
          <Text style={styles.buttonText}>Medical History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigateToScreen('FrozenShoulderSymptoms')}>
          <Text style={styles.buttonText}>Frozen Shoulder Symptoms</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigateToScreen('LifestyleandActivities')}>
          <Text style={styles.buttonText}>Lifestyle and Activities</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigateToScreen('TreatmentandManagement')}>
          <Text style={styles.buttonText}>Treatment and Management</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={() => navigateToScreen('PatientDashboardScreen')}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDF5FD',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    top:width * -0.36,
    width: width * 1,
    height: height * 0.13,
    backgroundColor: '#2DC2D7',
  },
  arrowButton: {
    position: 'absolute',
    left: width * 0.05,
    top:width * 0.15,
  },
  text: {
    fontFamily: 'Manjari',
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#333333',
    top:width * 0.040,
    left: width * 0.15,
  },
  panel: {
    backgroundColor: '#FFFFFF',
    borderRadius: width * 0.1,
    width: width * 0.9,
    height: height * 0.6,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: width * 0.15,
    top:width * -0.055,
  },
  button: {
    backgroundColor: '#A0E9FF',
    borderRadius: width * 0.05,
    width: width * 0.7,
    height: height * 0.08,
    marginBottom: width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Manjari',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333333',
  },
  nextButton: {
    backgroundColor: '#2DC2D7',
    borderRadius: height * 0.02,
    width: width * 0.3,
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontFamily: 'Manjari',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default ContainerWithArrow;
