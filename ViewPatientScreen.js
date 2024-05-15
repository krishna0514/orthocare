import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Dimensions, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PatientsDetailsScreen = () => {
  const navigation = useNavigation();

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://192.168.211.82/demo/viewpatientlist.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data && !data.status) {
          setPatients(data);
          setLoading(false);
        } else {
          setError(data.message || 'No data found');
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching patient details:', error);
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEllipsePress = () => {
    navigation.navigate('AddPatientScreen');
  };

  const handleSetPassword = (patientId, imageUri) => {
    navigation.navigate('patientsetpassword', { patientId, imageUri });
  };

  // Function to navigate to PatientDetailsScreen
  const handleViewPatient = (patientId, imageUri) => {
    navigation.navigate('PatientDetailsScreen', { patientId, imageUri });
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={Dimensions.get('window').height * 0.035} color="#4A3C3C" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.profileText}>List of Patients</Text>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={Dimensions.get('window').height * 0.025} color="#8e8e93" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBox}
          placeholder="Search"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : filteredPatients.length > 0 ? (
        <ScrollView style={styles.scrollView}>
          {filteredPatients.map(patient => (
            <View key={patient.id}>
              <TouchableOpacity style={styles.whiteContainer}>
                <Image
                  source={{ uri: patient.image }}
                  style={styles.patientPhoto}
                  resizeMode="cover"
                  onError={() => console.log("Error loading image for patient ID:", patient.patientId)}
                />
                <View style={styles.detailsContainer}>
                  <Text style={styles.detail}>Patient ID: {patient.patientId}</Text>
                  <Text style={styles.detail}>Name: {patient.name}</Text>
                  <Text style={styles.detail}>Case: {patient.patientCase}</Text>
                  {/* View Patient button */}
                  <TouchableOpacity
                    style={styles.viewPatientButton}
                    onPress={() => handleViewPatient(patient.patientId, patient.image)}
                  >
                    <Text style={styles.viewPatientText}>View Patient</Text>
                  </TouchableOpacity>
                  {/* Set Password button */}
                  <TouchableOpacity
                    style={styles.setPasswordButton}
                    onPress={() => handleSetPassword(patient.patientId, patient.image)}
                  >
                    <Text style={styles.setPasswordText}>Set Password</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.errorText}>No patients found</Text>
      )}
      <TouchableOpacity style={styles.ellipse} onPress={handleEllipsePress}>
        <Ionicons name="add" size={Dimensions.get('window').height * 0.035} color="#4A3C3C" style={styles.plusIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6EEFF',
    position: 'relative',
  },
  topContainer: {
    backgroundColor: '#2DC2D7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    paddingTop: Dimensions.get('window').height * 0.05,
    height: Dimensions.get('window').height * 0.11,
  },
  backIcon: {
    marginRight: Dimensions.get('window').width * 0.05,
  },
  profileText: {
    fontSize: Dimensions.get('window').height * 0.025,
    fontWeight: 'bold',
    color: '#000000',
    right: Dimensions.get('window').width * 0.45,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Dimensions.get('window').width * 0.05,
    marginBottom: Dimensions.get('window').height * 0.02,
    marginTop: Dimensions.get('window').height * 0.02,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: Dimensions.get('window').width * 0.03,
  },
  searchIcon: {
    marginRight: Dimensions.get('window').width * 0.02,
  },
  searchBox: {
    flex: 1,
    paddingVertical: Dimensions.get('window').height * 0.01,
    marginTop: Dimensions.get('window').height * 0.01,
    borderRadius: 20,
  },
  scrollView: {
    flex: 1,
  },
  whiteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: Dimensions.get('window').height * 0.05,
    paddingVertical: Dimensions.get('window').height * 0.02, // Added padding
    borderRadius: 10,
    elevation: 3,
    marginHorizontal: Dimensions.get('window').width * 0.05,
  },
  detailsContainer: {
    flex: 1,
    paddingVertical: Dimensions.get('window').height * 0.03,
    paddingHorizontal: Dimensions.get('window').width * 0.05,
  },
  detail: {
    fontSize: Dimensions.get('window').height * 0.020,
    color: '#2A2E3B',
    marginBottom: Dimensions.get('window').height * 0.01,
  },
  patientPhoto: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
    borderRadius: Dimensions.get('window').width * 0.15,
    marginTop: Dimensions.get('window').height * 0.02 - 2, // Adjusted to accommodate border
    marginLeft: Dimensions.get('window').width * 0.05,
    borderWidth: 2, // Adjust the border width as needed
    borderColor: 'black', // Set the border color
  },
  errorText: {
    fontSize: Dimensions.get('window').height * 0.022,
    color: 'red',
    textAlign: 'center',
  },
  ellipse: {
    position: 'absolute',
    bottom: Dimensions.get('window').width * 0.25,
    right: Dimensions.get('window').width * 0.05,
    width: Dimensions.get('window').width * 0.13,
    height: Dimensions.get('window').width * 0.13,
    backgroundColor: '#2DC2D7',
    borderRadius: Dimensions.get('window').width * 0.25,
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    fontSize: Dimensions.get('window').width * 0.1,
    left: Dimensions.get('window').width * 0.001,
    height: Dimensions.get('window').width * 0.15,
    top: Dimensions.get('window').height * 0.0099,
    color: '#000000',
  },
  setPasswordButton: {
    backgroundColor: '#2DC2D7',
    borderRadius: 10,
    paddingVertical: Dimensions.get('window').height * 0.01,
    paddingHorizontal: Dimensions.get('window').width * 0.03,
    marginTop: Dimensions.get('window').height * 0.02,
    alignItems: 'center',
  },
  setPasswordText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').height * 0.018,
  },
  viewPatientButton: {
    backgroundColor: '#2DC2D7',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  viewPatientText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default PatientsDetailsScreen;
