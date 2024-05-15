import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MedicalForm = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    patientId: '', // Initialize with empty string, replace with actual patientId
    medical_history1: {
      a: { answer: '', input_value: '' },
      b: { answer: '', input_value: '' },
      c: { answer: '', input_value: '' },
      d: { answer: '', input_value: '' }
    }
  });

  useEffect(() => {
    // Check if the patient is new or not
    const isNew = checkIfNewPatient(formData.patientId); // You need to define this function
    console.log("Is New Patient:", isNew);
  }, []);

  const checkIfNewPatient = (patientId) => {
    // List of existing patient IDs (example)
    const existingPatientIds = ['patient1', 'patient2', 'patient3']; // This should come from your data source
  
    // Check if the provided patientId exists in the list of existingPatientIds
    const isNew = !existingPatientIds.includes(patientId);
  
    return isNew;
  };

  const handleInputChange = (section, answer, input_value) => {
    setFormData(prevState => ({
      ...prevState,
      medical_history1: {
        ...prevState.medical_history1,
        [section]: { answer, input_value }
      }
    }));
  };

  const handleSave = () => {
    // Define the server URL
    const serverURL = 'http://192.168.193.82/demo/answers.php';

    // Convert formData to JSON string
    const formDataJSON = JSON.stringify(formData);

    // Define the fetch options
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formDataJSON,
    };

    // Send the data to the server
    fetch(serverURL, options)
      .then(response => {
        if (response.ok) {
          console.log('Data saved successfully');
          // Optionally, you can navigate to another screen upon successful save
          navigation.navigate('PatientDashboardScreen');
        } else {
          console.error('Failed to save data');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.panel}>
          <Text style={styles.text}>Medical History</Text>
          <View style={styles.question}>
            <Text style={styles.questionText}>Have you ever been diagnosed with a frozen shoulder (adhesive capsulitis) before? If yes, please provide details.</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your answer..."
              value={formData.medical_history1.a.answer}
              onChangeText={value => handleInputChange('a', value, '')} // Empty input_value for "No"
            />
          </View>
          {/* Other questions and input fields */}
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDF5FD',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  panel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '90%',
    paddingVertical: 40,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  question: {
    marginBottom: 30,
  },
  questionText: {
    fontSize: 18,
    color: '#333333',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: '#2DC2D7',
    borderRadius: 10,
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default MedicalForm;
