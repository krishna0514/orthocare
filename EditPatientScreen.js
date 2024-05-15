import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';

const EditPatientScreen = ({ route, navigation }) => {
  const { patientId, imageUri: initialImageUri } = route.params;
  const [name, setName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [patientCase, setPatientCase] = useState('');
  const [painDuration, setPainDuration] = useState('');
  const [admittedOn, setAdmittedOn] = useState('');
  const [rbs, setRbs] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [imageUri, setImageUri] = useState(initialImageUri || '');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchPatientDetails();
  }, []);

  const fetchPatientDetails = async () => {
    try {
      const response = await fetch(`http://192.168.198.82/demo/profile.php?patientId=${patientId}`);
      const data = await response.json();
      setName(data.name || '');
      setContactNo(data.contactNo || '');
      setAge(data.age || '');
      setGender(data.gender || '');
      setHeight(data.height || '');
      setWeight(data.weight || '');
      setPatientCase(data.patientCase || '');
      setPainDuration(data.painDuration || '');
      setAdmittedOn(data.admittedOn || '');
      setRbs(data.rbs || '');
      setPassword(data.password || '');
      setConfirmPassword(data.confirmPassword || '');
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (password !== confirmPassword) {
        setErrorMessage('Error: Passwords do not match');
        return;
      }
  
      setErrorMessage('');
      const formData = new FormData();
      formData.append('patientId', patientId);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword); // corrected field name
      formData.append('name', name);
      formData.append('contactNo', contactNo);
      formData.append('age', age);
      formData.append('gender', gender);
      formData.append('height', height);
      formData.append('weight', weight);
      formData.append('patientCase', patientCase);
      formData.append('painDuration', painDuration);
      formData.append('admittedOn', admittedOn);
      formData.append('rbs', rbs);
      if (imageUri) {
        const uriParts = imageUri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        formData.append('image', {
          uri: imageUri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }
  
      const response = await fetch('http://192.168.198.82/demo/updateprofile.php', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const responseData = await response.text();
      console.log('Response from server:', responseData);
  
      if (response.ok) {
        navigation.navigate('PatientDetailsScreen', { patientId });
      } else {
        console.error('Error updating patient details:', responseData);
        setErrorMessage('Error: An unexpected error occurred');
      }
    } catch (error) {
      console.error('Error updating patient details:', error);
      setErrorMessage('Error: An unexpected error occurred');
    }
  };
  

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled && result.assets.length > 0 && result.assets[0].uri) {
        setImageUri(result.assets[0].uri);
      } else {
        console.log('Image selection canceled or failed.');
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

 
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={Dimensions.get('window').width * 0.05} color="black" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.patientId}>Patient ID: {patientId}</Text>
      </View>

      {/* Panel */}
      <View style={styles.panel}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              onError={(error) => console.log('Error loading image:', error)}
            />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            value={contactNo}
            onChangeText={setContactNo}
            placeholder="Contact Number"
          />
          <TextInput
            style={styles.input}
            value={gender}
            onChangeText={setGender}
            placeholder="Gender"
          />
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder="Age"
          />
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            placeholder="Height"
          />
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            placeholder="Weight"
          />
          <TextInput
            style={styles.input}
            value={patientCase}
            onChangeText={setPatientCase}
            placeholder="Patient Case"
          />
          <TextInput
            style={styles.input}
            value={painDuration}
            onChangeText={setPainDuration}
            placeholder="Pain Duration"
          />
          <TextInput
            style={styles.input}
            value={admittedOn}
            onChangeText={setAdmittedOn}
            placeholder="Admitted On"
          />
          <TextInput
            style={styles.input}
            value={rbs}
            onChangeText={setRbs}
            placeholder="RBS"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholder="Password"
          />
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            placeholder="Confirm Password"
          />
          
          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
        </ScrollView>
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDF5FD',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2DC2D7',
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    paddingVertical: Dimensions.get('window').width * 0.09,
  },
  backIcon: {
    color:'#4A3C3C',
    top: Dimensions.get('window').width * 0.025,
  },
  patientId: {
    fontSize: Dimensions.get('window').width * 0.05,
    top: Dimensions.get('window').width * 0.025,
    fontWeight: 'bold',
    color: '#000',
    left: -Dimensions.get('window').width * 0.55,
  },
  panel: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.16,
    left: Dimensions.get('window').width * 0.05,
    height: Dimensions.get('window').height * 0.822,
    right: Dimensions.get('window').width * 0.05,
    padding: Dimensions.get('window').width * 0.05,
    borderRadius: Dimensions.get('window').width * 0.066,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollContainer: {
    paddingBottom: Dimensions.get('window').height * 0.1,
  },
  heading: {
    fontSize: Dimensions.get('window').width * 0.025,
    fontWeight: 'bold',
    marginBottom: Dimensions.get('window').width * 0.05,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: Dimensions.get('window').height * 0.01,
  },
  image: {
    width: Dimensions.get('window').width * 0.45,
    height: Dimensions.get('window').width * 0.45,
    left: Dimensions.get('window').width * 0.01,
    marginBottom: Dimensions.get('window').height * 0.01,
    borderRadius: Dimensions.get('window').width * 0.3,
    borderWidth: Dimensions.get('window').width * 0.01,
    borderColor: '#2DC2D7',
  },
  input: {
    width: '100%',
    height: Dimensions.get('window').width * 0.1,
    borderWidth: 1,
    borderColor: '#2DC2D7',
    borderRadius: Dimensions.get('window').width * 0.016,
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    marginBottom: Dimensions.get('window').width * 0.025,
  },
  saveButton: {
    backgroundColor: '#2DC2D7',
    position: 'absolute',
    bottom: Dimensions.get('window').width * 0.08,
    left: Dimensions.get('window').width * 0.15,
    width:Dimensions.get('window').width * 0.5,
    paddingVertical: Dimensions.get('window').width * 0.04,
    borderRadius: Dimensions.get('window').width * 0.066,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: Dimensions.get('window').width * 0.040,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: Dimensions.get('window').width * 0.025,
  },
});

export default EditPatientScreen;
