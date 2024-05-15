import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Alert, Image, TextInput, ScrollView } from 'react-native'; // Import Image component
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

export default function App() {
  const navigation = useNavigation(); // Access navigation object
  const [patientData, setPatientData] = useState({
    patientId: '',
    name: '',
    contactNo: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    patientCase: '',
    painDuration: '',
    admittedOn: '',
    rbs: '',
    password: '',
    confirmPassword: '',
    doctorId: '',
  });
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log('Image picker result:', result);

      if (!result.cancelled && result.assets.length > 0 && result.assets[0].uri) {
        setImage(result.assets[0].uri);
      } else {
        console.log('Image selection canceled or failed.');
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleInputChange = (key, value) => {
    setPatientData({ ...patientData, [key]: value });
  };

  const uploadData = async () => {
    try {
      const formData = new FormData();
      Object.entries(patientData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('image', { uri: image, name: 'image.jpg', type: 'image/jpg' });

      let response = await fetch('http://192.168.140.82/demo/patientprofile2.php', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      let data = await response.json();
      if (data.success) {
        Alert.alert('Success', data.message);
        navigation.navigate('DoctorDashboard'); // Navigate to Doctor Dashboard screen
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.imagePickerContainer} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Ionicons name="image" size={Dimensions.get('window').width * 0.5} color="#CCCCCC" />
        )}
      </TouchableOpacity>
      <Text style={styles.uploadText}>Upload image</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Patient ID"
          onChangeText={(text) => handleInputChange('patientId', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => handleInputChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact No"
          onChangeText={(text) => handleInputChange('contactNo', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          onChangeText={(text) => handleInputChange('age', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Gender"
          onChangeText={(text) => handleInputChange('gender', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Height"
          onChangeText={(text) => handleInputChange('height', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Weight"
          onChangeText={(text) => handleInputChange('weight', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Patient Case"
          onChangeText={(text) => handleInputChange('patientCase', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Pain Duration"
          onChangeText={(text) => handleInputChange('painDuration', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Admitted On"
          onChangeText={(text) => handleInputChange('admittedOn', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="RBS"
          onChangeText={(text) => handleInputChange('rbs', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => handleInputChange('password', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          onChangeText={(text) => handleInputChange('confirmPassword', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Doctor ID"
          onChangeText={(text) => handleInputChange('doctorId', text)}
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={uploadData}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#CDF5FD',
    alignItems: 'center',
  },
  imagePickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    borderRadius: (Dimensions.get('window').width * 0.5) / 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#2DC2D7',
    overflow: 'hidden',
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadText: {
    fontSize: Dimensions.get('window').width * 0.05,
    fontWeight: '700',
    color: '#000000',
    marginTop: 10,
    fontFamily: 'Manjari',
  },
  formContainer: {
    width: '80%',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: '#2DC2D7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
