import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, Dimensions } from 'react-native';// Import Ionicons from Expo
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const { width, height } = Dimensions.get('window');

const LoginOptionsScreen = () => {
  const navigation = useNavigation(); // Get the navigation object

  const handleAdminLoginScreen = () => {
    // Navigate to the doctor interface
    navigation.navigate('AdminLoginScreen');
  };
  const handleDoctorLogin = () => {
    // Navigate to the doctor interface
    navigation.navigate('DoctorScreen');
  };

  const handlePatientLogin = () => {
    // Navigate to the patient interface
    navigation.navigate('PatientScreen');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.ellipse, styles.ellipse1]} />
      <View style={[styles.ellipse, styles.ellipse2]} />
      <View style={[styles.ellipse, styles.ellipse3]} />
      <TouchableOpacity
        style={[styles.loginButton, styles.doctorLoginButton]}
        onPress={handleAdminLoginScreen}
      >
        <Image source={require('./assets/admin2.png')} style={styles.image} />
        <Text style={styles.loginText}>Admin Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.loginButton, styles.doctorLoginButton]}
        onPress={handleDoctorLogin}
      >
        <Image source={require('./assets/doctor.png')} style={styles.image} />
        <Text style={styles.loginText}>Doctor Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.loginButton, styles.patientLoginButton]}
        onPress={handlePatientLogin}
      >
        <Image source={require('./assets/patient.png')} style={styles.image} />
        <Text style={styles.loginText}>Patient Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2DC2D7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ellipse: {
    position: 'absolute',
    borderRadius: width * 0.5,
  },
  ellipse1: {
    width: width * 0.9,
    height: width * 0.9,
    backgroundColor: '#BFD8E6',
    top: -height * 0.1,
    left: -width * 0.15,
  },
  ellipse2: {
    width: width * 0.9,
    height: width * 0.9,
    backgroundColor: '#BFD8E6',
    bottom: -height * 0.2,
    right: -width * 0.15,
  },
  loginButton: {
    width: width * 0.8,
    height: height * 0.15,
    borderRadius: width * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: height * 0.03,
    elevation: 4,
    top: 40,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,
      },
    }),
  },
  doctorLoginButton: {
    backgroundColor: '#89CFF3',
    width: 300, // Adjust the width as needed
    height: 80,// Adjust the height as needed
  },
  patientLoginButton: {
    backgroundColor: '#89CFF3',
    width: 300, // Adjust the width as needed
    height: 80, // Adjust the height as needed
  },  
  loginText: {
    fontSize: width * 0.05,
    fontWeight: '600',
    lineHeight: width * 0.058,
    letterSpacing: 0,
    textAlign: 'left',
    color: 'black',
    marginBottom: height * 0.02,
    left: width * 0.05,
    left:width *- 0.18,
  },
  image: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius:width * 0.5,
    marginBottom: -height * 0.045,
    left: 110,
  },
});

export default LoginOptionsScreen;
