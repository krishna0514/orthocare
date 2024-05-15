import React, { useState } from 'react';
import { View, Button, Image, TextInput, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [doctor, setDoctor] = useState({
    name: '',
    phoneno: '',
    gender: '',
    age: '',
    experience: '',
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
      const formData = new FormData();
      formData.append('name', doctor.name);
      formData.append('phoneno', doctor.phoneno);
      formData.append('gender', doctor.gender);
      formData.append('age', doctor.age);
      formData.append('experience', doctor.experience);
      formData.append('password', doctor.password);
      formData.append('confirmpassword', doctor.confirmpassword);
      formData.append('image', {
        uri: doctor.image,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
  
      const response = await fetch('http://192.168.55.1/image_upload.php', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const text = await response.text();
      console.log('Server Response:', text);
    } catch (error) {
      console.error('Submission Error:', error);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setDoctor({ ...doctor, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={(text) => setDoctor({ ...doctor, phoneno: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        onChangeText={(text) => setDoctor({ ...doctor, gender: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        onChangeText={(text) => setDoctor({ ...doctor, age: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Experience"
        onChangeText={(text) => setDoctor({ ...doctor, experience: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setDoctor({ ...doctor, password: text })}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={(text) => setDoctor({ ...doctor, confirmpassword: text })}
        secureTextEntry={true}
      />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {doctor.image && <Image source={{ uri: doctor.image }} style={styles.image} />}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});


