import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome for the user outline icon

const { width, height } = Dimensions.get('window');

const PatientDetailsScreen = ({ route, navigation }) => {
  const { patientId } = route.params;
  const [patientDetails, setPatientDetails] = useState(null);
  
  useEffect(() => {
    // Fetch patient details based on patientId
    fetchPatientDetails();
  }, [patientId]);

  const fetchPatientDetails = async () => {
    try {
      // Make a request to your backend API to fetch patient details
      const response = await fetch(`http://192.168.122.82/demo/patientprofile1.php?patientId=${patientId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch patient details');
      }
      const data = await response.json();
      console.log('Fetched patient details:', data); // Add this line to log the fetched data
      setPatientDetails(data);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  if (!patientDetails) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleEdit = () => {
    // Navigate to EditPatientScreen passing patientId and imageUri
    navigation.navigate('EditPatientScreen1', { patientId, imageUri: patientDetails.imageUri });
  };
  

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={width * 0.05} color="#333333" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.topBarText}>Patient Details</Text>
      </View>

      {/* Panel */}
      <View style={styles.panel}>
        <Image source={{ uri: patientDetails.imageUri }} style={styles.image} />
        <View style={styles.textBox}>
          <Text style={styles.label}>Patient ID:</Text>
          <Text style={styles.value}>{patientId}</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{patientDetails.name}</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.label}>Contact Number:</Text>
          <Text style={styles.value}>{patientDetails.contactNo || 'N/A'}</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{patientDetails.gender}</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.value}>{patientDetails.age}</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.label}>Height:</Text>
          <Text style={styles.value}>{patientDetails.height}</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.label}>Weight:</Text>
          <Text style={styles.value}>{patientDetails.weight}</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.label}>Patient Case:</Text>
          <Text style={styles.value}>{patientDetails.patientCase}</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.label}>Admitted On:</Text>
          <Text style={styles.value}>{patientDetails.admittedOn}</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.label}>RBS:</Text>
          <Text style={styles.value}>{patientDetails.rbs}</Text>
        </View>
        {/* Password and Confirm Password */}
        <View style={styles.textBox}>
          <Text style={styles.label}>Password:</Text>
          <Text style={styles.value}>{patientDetails.password}</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.label}>Confirm Password:</Text>
          <Text style={styles.value}>{patientDetails.confirmPassword}</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editButtonText}>Edit</Text>
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2DC2D7',
    paddingVertical: height * 0.041,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backIcon: {
    right: width * -0.05,
    top: height * 0.02,
  },
  topBarText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    left: width * 0.08,
    top: height * 0.02,
  },
  panel: {
    position: 'absolute',
    top: height * 0.16,
    left: width * 0.05,
    height: height * 0.822,
    right: width * 0.05,
    padding: width * 0.05,
    borderRadius: width * 0.066,
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
  image: {
    width: width * 0.45,
    height: width * 0.45,
    marginBottom: height * 0.01,
    borderRadius: width * 0.3,
    borderWidth: width * 0.01, // Add borderWidth to create the border
    borderColor: '#2DC2D7',
    left:width * 0.18,
  },
  textBox: {
    flexDirection: 'row',
    width: '100%', // Changed width to 100%
    marginBottom: height * 0.005, // Increased marginBottom for better spacing
    borderWidth: width * 0.004,
    borderColor: '#ddd',
    borderRadius: width * 0.01,
    padding: width * 0.003,
  },
  label: {
    flex: 1,
    fontSize: width * 0.048,
    fontWeight: 'bold',
    color: '#000',
    marginRight: width * 0.04, // Increased marginRight for better spacing
  },
  value: {
    flex: 2,
    fontSize: width * 0.048,
    color: '#000',
  },
  editButton: {
    backgroundColor: '#2DC2D7',
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.1,
    width: width * 0.3,
    borderRadius: width * 0.05,
    marginTop: height * 0.005,
    left:width * 0.25,
  },
  editButtonText: {
    color: '#fff',
    fontSize: width * 0.048,
    fontWeight: 'bold',
  },
});
export default PatientDetailsScreen;
