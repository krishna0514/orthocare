import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';

const EditDoctorScreen = ({ route, navigation }) => {
  const { doctorId, doctorImage: initialdoctorImage } = route.params;
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [experience, setExperience] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [doctorImage, setDoctorImage] = useState(initialdoctorImage || 'default_image_uri_here');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchDoctorDetails();
  }, []);

  const fetchDoctorDetails = async () => {
    try {
      const response = await fetch(`http://192.168.9.82/demo/doctorsprofilescrren.php?doctorId=${doctorId}`);
      const data = await response.json();
      setName(data.name || '');
      setPhoneNumber(data.phoneno || '');
      setGender(data.gender || '');
      setAge(data.age || '');
      setExperience(data.experience || '');
      setSpecialization(data.specialization || '');
      setPassword(data.password || '');
      setConfirmPassword(data.confirmPassword || '');
    } catch (error) {
      console.error('Error fetching doctor details:', error);
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
      formData.append('doctorId', doctorId);
      formData.append('password', password);
      formData.append('confirmpassword', confirmPassword);
      formData.append('name', name);
      formData.append('phoneno', phoneNumber);
      formData.append('gender', gender);
      formData.append('age', age);
      formData.append('experience', experience);
      formData.append('specialization', specialization);
      if (doctorImage) {
        const uriParts = doctorImage.split('.');
        const fileType = uriParts[uriParts.length - 1];
        formData.append('image', {
          uri: doctorImage,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }
  
      const response = await fetch('http://192.168.9.82/demo/doctoredit.php', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const responseData = await response.text();
      console.log('Response from server:', responseData);
  
      if (response.ok) {
        navigation.navigate('ProfileScreen', { doctorId });
      } else {
        console.error('Error updating doctor details:', responseData);
        setErrorMessage('Error: An unexpected error occurred');
      }
    } catch (error) {
      console.error('Error updating doctor details:', error);
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
        setDoctorImage(result.assets[0].uri);
      } else {
        console.log('Image selection canceled or failed.');
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={Dimensions.get('window').width * 0.06} color="black" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.patientId}>Patient ID: {doctorId}</Text>
      </View>

      <View style={styles.panel}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: doctorImage }}
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
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone Number"
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
          value={experience}
          onChangeText={setExperience}
          placeholder="Experience"
        />
        <TextInput
          style={styles.input}
          value={specialization}
          onChangeText={setSpecialization}
          placeholder="Specialization"
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
    backgroundColor: '#2DC2D7',
    padding: Dimensions.get('window').width * 0.087,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backIcon: {
    right: Dimensions.get('window').width * 0.03,
    top:Dimensions.get('window').width * 0.03,

  },
  patientId: {
    fontSize: Dimensions.get('window').width * 0.045,
    fontWeight: 'bold',
    top:Dimensions.get('window').width * 0.03,

    color: '#000',
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
  imageContainer: {
    alignItems: 'center',
    marginBottom: Dimensions.get('window').height * 0.01,
  },
  image: {
    width: Dimensions.get('window').width * 0.45,
    height: Dimensions.get('window').width * 0.45,
    left: Dimensions.get('window').width * 0.18,
    marginBottom: Dimensions.get('window').height * 0.01,
    borderRadius: Dimensions.get('window').width * 0.3,
    borderWidth: Dimensions.get('window').width * 0.01,
    borderColor: '#2DC2D7',
  },
  input: {
    width: '100%',
    height: Dimensions.get('window').width * 0.12,
    borderWidth: 1,
    borderColor: '#2DC2D7',
    borderRadius:Dimensions.get('window').width * 0.02 ,
    paddingHorizontal: Dimensions.get('window').width * 0.04,
    marginBottom: Dimensions.get('window').width * 0.014,
  },
  saveButton: {
    backgroundColor: '#2DC2D7',
    width:Dimensions.get('window').width * 0.25,
    top:Dimensions.get('window').width * 0.018,
    height:Dimensions.get('window').width * 0.1,
    borderRadius: Dimensions.get('window').width * 0.033,
    left:Dimensions.get('window').width * 0.25,
  },
  saveButtonText: {
    color: '#fff',
    left:Dimensions.get('window').width * 0.07,
    top:Dimensions.get('window').width * 0.018,
    fontSize: Dimensions.get('window').width * 0.045,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: Dimensions.get('window').width * 0.015,
  },
});

export default EditDoctorScreen;
