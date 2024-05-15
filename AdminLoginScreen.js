import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'; 

const AdminScreen = () => {
  const navigation = useNavigation();
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAdminLogin = async () => {
    try {
      if (!adminId || !password) {
        Alert.alert('Missing Information', 'Please enter both Admin ID and Password.');
        return;
      }

      const response = await fetch('http://192.168.211.82/demo/adminlogin.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminId: adminId,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

      if (responseData.status === 'success') {
        // Login successful, navigate to AdminDashboardScreen
        navigation.navigate('AdminDashboardScreen');
      } else {
        // Login failed, show error message
        Alert.alert('Login Failed', responseData.message || 'Invalid admin ID or password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while attempting to log in. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.arrowButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={width * 0.08} color="#333333" />
      </TouchableOpacity>
      <View style={styles.adminPanel}>
        <Text style={styles.welcomeText}>Admin Login</Text>
        <View style={styles.additionalBox}>
          <TextInput
            style={styles.input}
            placeholder="Enter Admin ID"
            value={adminId}
            onChangeText={(text) => setAdminId(text)}
          />
        </View>
        <View style={[styles.additionalBox, styles.passwordBox]}>
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleAdminLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

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
  adminPanel: {
    width: width * 0.9,
    height: height * 0.6,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.75)', // 74% opacity white
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontFamily: 'Manjari',
    fontSize: 38,
    fontWeight: '700',
    color: '#333', // Replace with desired color
    marginBottom: 20,
  },
  additionalBox: {
    width: width * 0.8,
    height: height * 0.07,
    borderRadius: 8,
    backgroundColor: '#7D95D461', // Change color as needed
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  passwordBox: {
    marginBottom: 30, // Increase margin bottom for spacing
  },
  input: {
    fontFamily: 'Manjari',
    fontSize: 17,
    fontWeight: '500',
    color: '#000', // Change color as needed
    width: '100%',
    height: '100%',
  },
  loginButton: {
    width: width * 0.8,
    height: height * 0.08,
    backgroundColor: '#2DC2D7', // Change color as needed
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4, // Add elevation for drop shadow
  },
  loginButtonText: {
    fontFamily: 'Manjari',
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF', // Change color as needed
  },
});

export default AdminScreen;
