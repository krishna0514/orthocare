import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, TouchableOpacity, Text, Dimensions, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function App() {
  const navigation = useNavigation(); 
  const handleGoBack = () => {
    navigation.goBack();
  };

  const [patient, setPatient] = useState({
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
    image: null,
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [section, setSection] = useState(1);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setPatient({ ...patient, admittedOn: formattedDate });
    hideDatePicker();
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log('Image picker result:', result);
  
      if (result) {
        if (!result.cancelled && result.assets && result.assets.length > 0 && result.assets[0].uri) {
          setPatient({ ...patient, image: result.assets[0].uri });
        } else {
          console.log('Image selection canceled or failed.');
        }
      } else {
        console.log('Image selection canceled or failed.');
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };
  
  
  const handleSubmit = async () => {
    try {

      if (!patient.patientId.trim() || !patient.name.trim() || !patient.contactNo.trim() || !patient.age.trim() || !patient.gender.trim() || !patient.height.trim() || !patient.weight.trim() || !patient.patientCase.trim() || !patient.painDuration.trim() || !patient.admittedOn.trim() || !patient.rbs.trim() || !patient.password.trim() || !patient.confirmPassword.trim()) {
        Alert.alert('Error', 'Please fill in all required fields.');
        return;
      }
  

      // Check if passwords match
      if (patient.password !== patient.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match.');
        return;
      }
  
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(patient.contactNo)) {
        Alert.alert('Error', 'Please enter a valid phone number.');
        return;
      }
  
      // Create form data
      const formData = new FormData();
      formData.append('patientId', patient.patientId);
      formData.append('name', patient.name);
      formData.append('contactNo', patient.contactNo);
      formData.append('age', patient.age);
      formData.append('gender', patient.gender);
      formData.append('height', patient.height);
      formData.append('weight', patient.weight);
      formData.append('patientCase', patient.patientCase);
      formData.append('painDuration', patient.painDuration);
      formData.append('admittedOn', patient.admittedOn);
      formData.append('rbs', patient.rbs);
      formData.append('password', patient.password);
      formData.append('confirmPassword', patient.confirmPassword);
  
      // Append image if it exists
      if (patient.image) {
        const fileName = patient.image.split('/').pop();
        formData.append('image', { uri: patient.image, name: fileName, type: 'image/jpeg' });
      }
  
      console.log('Sending data to server:', formData);
  
      const response = await fetch('http://192.168.140.82/demo/patientprofile.php', {
        method: 'POST',
        body: formData,
      });
  
      const responseText = await response.text();
      console.log('Server response:', responseText);
  
      if (response.ok) {
        setPatient({
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
  
  const renderInputsForSection = () => {
    switch (section) {
      case 1:
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Patient ID"
              onChangeText={(text) => setPatient({ ...patient, patientId: text })}
              value={patient.patientId}
            />
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={(text) => setPatient({ ...patient, name: text })}
              value={patient.name}
            />
            <TextInput
              style={styles.input}
              placeholder="Contact Number"
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9]/g, '');
                setPatient({ ...patient, contactNo: numericText });
              }}
              value={patient.contactNo}
            />
            <TextInput
              style={styles.input}
              placeholder="Age"
              onChangeText={(text) => setPatient({ ...patient, age: text })}
              value={patient.age}
            />
            <TextInput
              style={styles.input}
              placeholder="Gender"
              onChangeText={(text) => setPatient({ ...patient, gender: text })}
              value={patient.gender}
            />
            <TextInput
              style={styles.input}
              placeholder="Height"
              onChangeText={(text) => setPatient({ ...patient, height: text })}
              value={patient.height}
            />
            <TextInput
              style={styles.input}
              placeholder="Weight"
              onChangeText={(text) => setPatient({ ...patient, weight: text })}
              value={patient.weight}
            />
             <TouchableOpacity style={styles.nextButton} onPress={() => setSection(3)}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </>
        );
      
      case 3:
        return (
          <>
          <TextInput
        style={styles.input}
        placeholder="Patient Case"
        onChangeText={(text) => setPatient({ ...patient, patientCase: text })}
        value={patient.patientCase}
      />
           <TextInput
              style={styles.input}
              placeholder="Pain Duration"
              onChangeText={(text) => setPatient({ ...patient, painDuration: text })}
              value={patient.painDuration}
            />
            <TextInput
              style={styles.input}
              placeholder="Admitted On"
              onFocus={showDatePicker}
              value={patient.admittedOn}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <TextInput
              style={styles.input}
              placeholder="RBS"
              onChangeText={(text) => setPatient({ ...patient, rbs: text })}
              value={patient.rbs}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={(text) => setPatient({ ...patient, password: text })}
              secureTextEntry={true}
              value={patient.password}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              onChangeText={(text) => setPatient({ ...patient, confirmPassword: text })}
              secureTextEntry={true}
              value={patient.confirmPassword}
            />
             <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.backArrowContainer} onPress={() => handleGoBack()}>
          <Ionicons name="arrow-back" size={Dimensions.get('window').width * 0.08} color="#4A3C3C" />
        </TouchableOpacity>
        <Text style={styles.doctorText}>Patient Details</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.profileImageContainer} onPress={pickImage}>
          {patient.image ? (
            <Image source={{ uri: patient.image }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person-circle-outline" size={Dimensions.get('window').width * 0.5} color="#CCCCCC" />
          )}
        </TouchableOpacity>
        <Text style={styles.uploadText}>Upload image</Text>
        {renderInputsForSection()}
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
    top: Dimensions.get('window').height * -0.05,
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
    marginBottom: Dimensions.get('window').height * 0.013,
    bottom: Dimensions.get('window').height * -0.02,
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
  nextButton: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').height * 0.06,
    backgroundColor: '#2DC2D7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Dimensions.get('window').height * 0.03,
    alignSelf: 'center',
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
