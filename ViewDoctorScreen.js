import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Dimensions, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ListOfDoctorsScreen = () => {
  const navigation = useNavigation();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://192.168.198.82/demo/viewdoctorlist.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data && !data.status) {
          setDoctors(data);
          setLoading(false);
        } else {
          setError(data.message || 'No data found');
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching doctor details:', error);
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEllipsePress = () => {
    navigation.navigate('AddDoctorScreen');
  };

  const handleSetPassword = (doctorId, imageUri) => {
    navigation.navigate('SetPasswordScreen', { doctorId, imageUri });
  };

  const handleViewDoctor = (doctorId, imageUri) => {
    console.log('Navigating to View Doctor screen with doctorId:', doctorId, 'and imageUri:', imageUri);
    navigation.navigate('doctor1Screen', { doctorId, imageUri });
  };
  

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={Dimensions.get('window').height * 0.035} color="#4A3C3C" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.profileText}>List of Doctors</Text>
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
      ) : filteredDoctors.length > 0 ? (
        <ScrollView style={styles.scrollView}>
          {filteredDoctors.map(doctor => (
            <View key={doctor.id}>
              <TouchableOpacity style={styles.whiteContainer}>
                <Image
                  source={{ uri: doctor.image }}
                  style={styles.doctorPhoto}
                  resizeMode="cover"
                  onError={() => console.log("Error loading image for doctor ID:", doctor.doctorId)}
                />
                <View style={styles.detailsContainer}>
                  <Text style={styles.detail}>Doctor ID: {doctor.doctorId}</Text>
                  <Text style={styles.detail}>Name: {doctor.name}</Text>
                  <Text style={styles.detail}>Experience: {doctor.experience} years</Text>
                  <TouchableOpacity
                    style={styles.viewDoctorButton}
                    onPress={() => handleViewDoctor(doctor.doctorId, doctor.image)}
                  >
                    <Text style={styles.viewDoctorText}>View Doctor</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.setPasswordButton}
                    onPress={() => handleSetPassword(doctor.doctorId, doctor.image)}
                  >
                    <Text style={styles.setPasswordText}>Set Password</Text>
                  </TouchableOpacity>
                  {/* View Doctor Button */}
                 
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.errorText}>No doctors found</Text>
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
    paddingVertical: Dimensions.get('window').height * 0.02,
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
  doctorPhoto: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
    borderRadius: Dimensions.get('window').width * 0.15,
    marginTop: Dimensions.get('window').height * 0.02 - 2,
    marginLeft: Dimensions.get('window').width * 0.05,
    borderWidth: 2,
    borderColor: 'black',
  },
  errorText: {
    fontSize: Dimensions.get('window').height * 0.022,
    color: 'red',
    textAlign: 'center',
  },
  ellipse: {
    position: 'absolute',
    bottom: Dimensions.get('window').width * 0.20,
    right: Dimensions.get('window').width * 0.05,
    width: Dimensions.get('window').width * 0.13,
    height: Dimensions.get('window').width * 0.13,
    backgroundColor: '#2DC2D7',
    borderRadius: Dimensions.get('window').width * 0.25,
    zIndex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusicon: {
    fontSize: Dimensions.get('window').width * 0.15,
    height: Dimensions.get('window').width * 0.15,
    top: Dimensions.get('window').height * -0.05,
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
  viewDoctorButton: {
    backgroundColor: '#2DC2D7',
    borderRadius: 10,
    paddingVertical: Dimensions.get('window').height * 0.01,
    paddingHorizontal: Dimensions.get('window').width * 0.03,
    marginTop: Dimensions.get('window').height * 0.02,
    alignItems: 'center',
  },
  viewDoctorText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').height * 0.018,
  },
});

export default ListOfDoctorsScreen;
