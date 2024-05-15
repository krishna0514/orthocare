import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [patientID, setPatientID] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleBack = () => {
    console.log("Navigating back...");
    navigation.goBack();
  };

  const handleSignup = () => {
    if (!patientID || !name || !phoneNumber || !gender || !age || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Here you can add your signup logic
    // For example, you can make an API call to register the user

    // After successful signup, you can navigate to another screen
    navigation.navigate('PatientScreen'); // Replace 'Home' with the desired screen name
  };

  return (
    <View style={styles.container}>
      {/* Blue container */}
      <View style={styles.topContainer}>
        {/* Back arrow icon */}
        <TouchableOpacity style={styles.backArrowContainer} onPress={handleBack}>
          <Icon name="arrow-back" size={30} color="#4A3C3C" />
        </TouchableOpacity>
        {/* Signup text */}
        <Text style={styles.signupText}>Signup</Text>
      </View>
      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Patient ID */}
        <TextInput
          style={styles.input}
          value={patientID}
          onChangeText={text => setPatientID(text)}
          placeholder="Patient ID"
        />
        {/* Name */}
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={text => setName(text)}
          placeholder="Name"
        />
        {/* Phone Number */}
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          placeholder="Phone Number"
          keyboardType="phone-pad"
        />
        {/* Gender */}
        <TextInput
          style={styles.input}
          value={gender}
          onChangeText={text => setGender(text)}
          placeholder="Gender"
        />
        {/* Age */}
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={text => setAge(text)}
          placeholder="Age"
          keyboardType="numeric"
        />
        {/* Password */}
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Password"
          secureTextEntry
        />
        {/* Confirm Password */}
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          placeholder="Confirm Password"
          secureTextEntry
        />
        {/* Signup button */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupButtonText}>Save</Text>
        </TouchableOpacity>
        {/* Welcome text */}
        <Text style={styles.welcomeText}>Welcome!</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDF5FD',
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: 110, // Adjusted paddingTop to accommodate the blue container
    paddingBottom: 20, // Added paddingBottom to accommodate the signup button and welcome text
  },
  topContainer: {
    width: 470,
    height: 142,
    backgroundColor: '#2DC2D7',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  signupText: {
    fontSize: 26, // Updated font size
    fontWeight: '700',
    color: '#000000', // Updated color
    marginBottom: 28,
    fontFamily: 'Manjari', // Added font family
    right: 130,
  },
  backArrowContainer: {
    position: 'absolute',
    top: 86,
    left: 22,
    zIndex: 1, // Ensure the back arrow is above the blue container
  },
  input: {
    width: 328,
    height: 50,
    top: 6,
    left: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BABACC',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  signupButton: {
    width: 140,
    height: 36,
    borderRadius: 30,
    backgroundColor: '#2DC2D7',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, // Adjusted marginTop
    elevation: 4,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  welcomeText: {
    marginTop: 80,
    fontFamily: 'Manjari',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    top: -700,
    left: -90, // Adjust color as needed
  },
});

export default SignupScreen;
