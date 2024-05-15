import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Dimensions, TextInput, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const SetPasswordWithImageScreen = ({ route }) => {
  const navigation = useNavigation();
  const { patientId, imageUri } = route.params; // Receive imageUri here
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(imageUri);


  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    try {
      if (!password || !confirmPassword) {
        Alert.alert('Error', 'Please fill in both password fields.');
        return;
      }
  
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match.');
        return;
      }
  
      const formData = new FormData();
      formData.append('patientId', patientId);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);
  
      if (image) {
        const localUri = image;
        const filename = localUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;
  
        formData.append('image', { uri: localUri, name: filename, type });
      }
  
      const response = await fetch('http://192.168.5.82/demo/patientsetpassword.php', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.ok) {
        const result = await response.text();
        console.log(result);
        navigation.goBack();
      } else {
        console.error('Error updating password');
        Alert.alert('Error', 'Failed to update password. Please try again.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
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

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.backArrowContainer} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={Dimensions.get('window').width * 0.08} color="#4A3C3C" />
        </TouchableOpacity>
       
        <Text style={styles.doctorIdText}>Patient ID: {patientId}</Text>
      </View>

      <View style={styles.setPasswordPanel}>
        <Text style={styles.doctorText}>Set Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity style={styles.imagePickerContainer} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Ionicons name="image" size={Dimensions.get('window').width * 0.5} color="#CCCCCC" />
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDF5FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    width: '100%',
    height: Dimensions.get('window').height * 0.12,
    position: 'absolute',
    top: Dimensions.get('window').height * 0.0,
    backgroundColor: '#2DC2D7',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  backArrowContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.065,
    left: Dimensions.get('window').width * 0.04,
  },
  doctorText: {
    fontSize: Dimensions.get('window').width * 0.06,
    fontWeight: '700',
    color: '#000000',
    marginBottom: Dimensions.get('window').width * 0.042,
    left: Dimensions.get('window').width * -0.15,
    fontFamily: 'Manjari',
  },
  doctorIdText: {
    fontSize: Dimensions.get('window').width * 0.05,
    fontWeight: '700',
    color: '#000000',
    marginBottom: Dimensions.get('window').width * 0.042,
    left: Dimensions.get('window').width * -0.15,
    fontFamily: 'Manjari',
  },
  setPasswordPanel: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.3,
    borderRadius: Dimensions.get('window').height * 0.05,
    backgroundColor: '#AEE8F9',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: Dimensions.get('window').height * -0.2,
  },
  input: {
    width: '80%',
    height: Dimensions.get('window').height * 0.07,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#CCCCCC',
    borderRadius: Dimensions.get('window').height * 0.02,
    paddingHorizontal: Dimensions.get('window').height * 0.02,
    marginBottom: Dimensions.get('window').height * 0.02,
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
    bottom: Dimensions.get('window').height * 0.35,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  submitButton: {
    backgroundColor: '#2DC2D7',
    width: Dimensions.get('window').height * 0.35,
    height: Dimensions.get('window').height * 0.065,
    borderRadius: Dimensions.get('window').height * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: Dimensions.get('window').width * 0.07,
  },
});

export default SetPasswordWithImageScreen;
