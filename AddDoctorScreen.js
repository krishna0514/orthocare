import React, { useState } from 'react';
import { View, Button, Image, TextInput, StyleSheet, TouchableOpacity, Text, Dimensions, ScrollView, Alert } from 'react-native'; // Import ScrollView from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

export default function App() {
  const navigation = useNavigation(); 
  const handleGoBack = () => {
    navigation.goBack();
  };

  const [doctor, setDoctor] = useState({
    doctorId: '',
    name: '',
    phoneno: '',
    gender: '',
    age: '',
    experience: '',
    specialization: '',
    password: '',
    confirmpassword: '',
    image: null,
  });

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
        setDoctor({ ...doctor, image: result.assets[0].uri });
      } else {
        console.log('Image selection canceled or failed.');
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate form inputs
      if (!doctor.doctorId || !doctor.name || !doctor.phoneno || !doctor.gender || !doctor.age || !doctor.experience || !doctor.specialization || !doctor.password || !doctor.confirmpassword) {
        Alert.alert('Error', 'Please fill in all required fields.');
        return;
      }
  
      // Check if passwords match
      if (doctor.password !== doctor.confirmpassword) {
        Alert.alert('Error', 'Passwords do not match.');
        return;
      }
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(doctor.phoneno)) {
        Alert.alert('Error', 'Please enter a valid phone number.');
        return;
      }
      const formData = new FormData();
      formData.append('doctorId', doctor.doctorId);
      formData.append('name', doctor.name);
      formData.append('phoneno', doctor.phoneno);
      formData.append('gender', doctor.gender);
      formData.append('age', doctor.age);
      formData.append('experience', doctor.experience);
      formData.append('specialization', doctor.specialization);
      formData.append('password', doctor.password);
      formData.append('confirmpassword', doctor.confirmpassword);
      // Append image if it exists
      if (doctor.image) {
        const fileName = doctor.image.split('/').pop();
        formData.append('image', { uri: doctor.image, name: fileName, type: 'image/jpeg' });
      }
  
      console.log('Sending data to server:', formData);
  
      const response = await fetch('http://192.168.5.82/demo/doctorprofile.php', {
        method: 'POST',
        body: formData,
      });
  
      const responseText = await response.text();
      console.log('Server response:', responseText);
  
      if (response.ok) {
        setDoctor({
          doctorId: '',
          name: '',
          phoneno: '',
          gender: '',
          age: '',
          experience: '',
          specialization: '',
          password: '',
          confirmpassword: '',
          image: null,
        });
  
        navigation.navigate('AdminDashboardScreen');
  
        console.log('Form submitted successfully.');
      } else {
        console.error('Form submission failed.');
      }
    } catch (error) {
      console.error('Submission Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.backArrowContainer} onPress={() => handleGoBack()}>
          <Ionicons name="arrow-back" size={Dimensions.get('window').width * 0.08} color="#4A3C3C" />
        </TouchableOpacity>
        <Text style={styles.doctorText}>Doctor Details </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
          {doctor.image ? (
            <Image source={{ uri: doctor.image }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person-circle-outline" size={Dimensions.get('window').width * 0.5} color="#CCCCCC" />
          )}
        </TouchableOpacity>
        <Text style={styles.welcomeText}>Welcome! </Text>
        <Text style={styles.uploadText}>upload image </Text>
        <TextInput
          style={styles.input}
          placeholder="Doctor ID"
          onChangeText={(text) => setDoctor({ ...doctor, doctorId: text })}
          value={doctor.doctorId}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => setDoctor({ ...doctor, name: text })}
          value={doctor.name}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={(text) => {
            const numericText = text.replace(/[^0-9]/g, '');
            setDoctor({ ...doctor, phoneno: numericText });
          }}
          value={doctor.phoneno}
        />
        
        {/* Gender as normal text input */}
        <TextInput
          style={styles.input}
          placeholder="Gender"
          onChangeText={(text) => setDoctor({ ...doctor, gender: text })}
          value={doctor.gender}
        />

        <TextInput
          style={styles.input}
          placeholder="Age"
          onChangeText={(text) => setDoctor({ ...doctor, age: text })}
          value={doctor.age}
        />
        <TextInput
          style={styles.input}
          placeholder="Experience"
          onChangeText={(text) => setDoctor({ ...doctor, experience: text })}
          value={doctor.experience}
        />
        <TextInput
          style={styles.input}
          placeholder="Specialization"
          onChangeText={(text) => setDoctor({ ...doctor, specialization: text })}
          value={doctor.specialization}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setDoctor({ ...doctor, password: text })}
          secureTextEntry={true}
          value={doctor.password}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          onChangeText={(text) => setDoctor({ ...doctor, confirmpassword: text })}
          secureTextEntry={true}
          value={doctor.confirmpassword}
        />
       
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDF5FD',
  },
  topContainer: {
    width: '100%',
    height: Dimensions.get('window').height * 0.12,
    backgroundColor: '#2DC2D7',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  doctorText: {
    fontSize: Dimensions.get('window').width * 0.06,
    fontWeight: '700',
    color: '#000000',
    bottom: Dimensions.get('window').height * 0.03,
    left: Dimensions.get('window').height * -0.07,
    fontFamily: 'Manjari',
  },
  welcomeText: {
    fontSize: Dimensions.get('window').width * 0.09,
    fontWeight: '900',
    color: '#000000',
    bottom: Dimensions.get('window').height * 0.32,
    left: Dimensions.get('window').height * 0.005,
    fontFamily: 'Manjari',
  },
  uploadText: {
    fontSize: Dimensions.get('window').width * 0.05,
    fontWeight: '700',
    color: '#000000',
    bottom: Dimensions.get('window').height * 0.038,
    left: Dimensions.get('window').height * 0.0,
    fontFamily: 'Manjari',
  },
  backArrowContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.055,
    left: Dimensions.get('window').width * 0.04,
    zIndex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: Dimensions.get('window').height * 0.1,
    paddingBottom: 20,
  },

  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    borderRadius: (Dimensions.get('window').width * 0.5) / 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#2DC2D7',
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: Dimensions.get('window').height * 0.05,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  input: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.05,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BABACC',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Dimensions.get('window').width * 0.04,
    marginBottom: Dimensions.get('window').height * 0.012,
    bottom: Dimensions.get('window').height * -0.01,
    alignSelf: 'center',
    justifyContent: 'center', // Center text vertically
  },
  submitButton: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').height * 0.06,
    backgroundColor: '#2DC2D7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Dimensions.get('window').height * 0.03,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
