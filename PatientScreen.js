import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';


const { width, height } = Dimensions.get('window');

const PatientScreen = () => {
  const navigation = useNavigation();
  const [patientId, setPatientId] = useState('');
  const [password, setPassword] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const login = async () => {
    try {
      if (!patientId || !password) {
        Alert.alert('Missing Information', 'Please enter your Patient ID and Password.');
        return;
      }
  
      const response = await fetch('http://192.168.9.82/demo/patientlogin.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientId: patientId,
          password: password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      console.log(responseData); // Log the response data
  
      if (responseData.status === 'success') {
        const { name, imageUri } = responseData;
        Alert.alert(
          'Already Attended Questions',
          'Have you already attended the questions?',
          [
            {
              text: 'Yes',
              onPress: () => {
                navigation.navigate('PatientDashboardScreen', { name, patientId, imageUri });
              },
            },
            {
              text: 'No',
              onPress: () => {
                navigation.navigate('MedicalHistoryScreen', { name, patientId });
              },
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.arrowButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={width * 0.08} color="#333333" />
      </TouchableOpacity> 
      <View style={styles.patientPanel}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <View style={styles.additionalBox}>
          <TextInput
            style={styles.input}
            placeholder="Enter Patient ID"
            value={patientId}
            onChangeText={text => setPatientId(text)}
          />
        </View>
        <View style={[styles.additionalBox, styles.passwordBox]}>
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={login}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
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
  arrowButton: {
    position: 'absolute',
    top: height * 0.09,
    left: width * 0.06,
  },
  patientPanel: { 
    width: width * 0.9,
    height: height * 0.6,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },  
  welcomeText: {
    fontFamily: 'Manjari',
    fontSize: 38,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  additionalBox: {
    width: width * 0.8,
    height: height * 0.07,
    borderRadius: 8,
    backgroundColor: '#7D95D461',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  passwordBox: {
    marginBottom: 30,
  },
  input: {
    fontFamily: 'Manjari',
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
    width: '100%',
    height: '100%',
  },
  loginButton: {
    width: width * 0.8,
    height: height * 0.08,
    backgroundColor: '#2DC2D7',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  loginButtonText: {
    fontFamily: 'Manjari',
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default PatientScreen;
