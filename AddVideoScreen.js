import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Alert, TextInput } from 'react-native'; // Import TextInput component
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av'; // Import Video component from expo-av

export default function App() {
  const [video, setVideo] = useState(null);
  const [introduction, setIntroduction] = useState('');
  const [customFileName, setCustomFileName] = useState('');

  const pickVideo = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log('Video picker result:', result);

      if (!result.cancelled && result.assets.length > 0 && result.assets[0].uri) {
        setVideo(result.assets[0].uri);
      } else {
        console.log('Video selection canceled or failed.');
      }
    } catch (error) {
      console.error('Error picking video:', error);
    }
  };

  const uploadVideo = async () => {
    if (!video) {
      Alert.alert('No video selected', 'Please select a video to upload.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('video_file', {
        uri: video,
        type: 'video/mp4', // Adjust the type according to the file type
        name: 'video.mp4', // You can set a custom name here
      });
      formData.append('introduction', introduction);
      formData.append('custom_file_name', customFileName);

      // Send video file to server
      const response = await fetch('http://192.168.140.82/demo/doctorvideo.php', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        // Video uploaded successfully
        Alert.alert('Success', 'Video uploaded successfully.');
        setVideo(null); // Reset selected video
        setIntroduction(''); // Reset introduction field
        setCustomFileName(''); // Reset custom file name field
      } else {
        Alert.alert('Error', 'Failed to upload video.');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      Alert.alert('Error', 'Failed to upload video.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.videoPickerContainer} onPress={pickVideo}>
        {video ? (
          <Video
            source={{ uri: video }}
            style={styles.video}
            useNativeControls // Use native controls for the video player
            resizeMode="contain" // Control how the video is resized inside the Video component
          />
        ) : (
          <Ionicons name="videocam" size={Dimensions.get('window').width * 0.5} color="#CCCCCC" />
        )}
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Text>Introduction:</Text>
        <TextInput
          style={styles.input}
          value={introduction}
          onChangeText={text => setIntroduction(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Custom File Name:</Text>
        <TextInput
          style={styles.input}
          value={customFileName}
          onChangeText={text => setCustomFileName(text)}
        />
      </View>
      <TouchableOpacity style={styles.uploadButton} onPress={uploadVideo}>
        <Text style={styles.uploadButtonText}>Upload Video</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDF5FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    borderRadius: (Dimensions.get('window').width * 0.5) / 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#2DC2D7',
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  uploadButton: {
    marginTop: 20,
    backgroundColor: '#2DC2D7',
    padding: 10,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
