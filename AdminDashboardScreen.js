import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const AdminDashboardScreen = () => {
  const navigation = useNavigation();
  
  const handleViewPatientScreen = () => {
    navigation.navigate('ViewDoctorScreen');
  };

  const handleViewDoctorScreen = () => {
    navigation.navigate('ViewPatientScreen');
  };
  const handleAddDoctorScreen = () => {
    navigation.navigate('AddDoctorScreen');
  };
  const handleAddPatientScreen = () => {
    navigation.navigate('AddPatientScreen');
  };


  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.button1Text}>Admin Dashboard Screen</Text>
        <TouchableOpacity style={styles.arrowButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={Dimensions.get('window').width * 0.08} color="#333333" />
        </TouchableOpacity>
      </View>
      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleViewPatientScreen}
          >
            <Image source={require('./assets/medical.png')} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAddDoctorScreen}>
          <FontAwesomeIcon icon={faUserPlus} size={Dimensions.get('window').width * 0.055} color="black" style={styles.icon1Button} />
          </TouchableOpacity>
          <Text style={styles.loginText}>View Doctor</Text>

        </View>
        <View style={styles.box1}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleViewDoctorScreen}
          >
            <Image source={require('./assets/crowd.png')} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAddPatientScreen}>
          <FontAwesomeIcon icon={faUserPlus} size={Dimensions.get('window').width * 0.055} color="black" style={styles.icon1Button} />
          </TouchableOpacity>
          <Text style={styles.loginText}>View Patient</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#rgba(252, 253, 255, 1)',
  },
  topContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2DC2D7',
    zIndex: 1,
    paddingTop: Dimensions.get('window').height * 0.09,
    paddingHorizontal: Dimensions.get('window').height * 0.03,
  },
  arrowButton: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.06,
    left: Dimensions.get('window').width * 0.05,
    
  },
  button1Text: {
  fontSize: Dimensions.get('window').height * 0.025,
  top: Dimensions.get('window').height * -0.025,
  fontWeight: 'bold',
  color: '#000000',
  right: Dimensions.get('window').width *- 0.13,
},
  boxContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: Dimensions.get('window').width * 0.25,
    marginTop: Dimensions.get('window').height * 0.30,
    flex: 1,
  },
  box: {
    width: Dimensions.get('window').width * 0.50,
    height: Dimensions.get('window').width * 0.50,
    backgroundColor: 'white',
    borderRadius:Dimensions.get('window').height * 0.05,
    bottom: Dimensions.get('window').height * 0.023,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 10,
    position: 'relative', // Added for positioning the icon
  },
  box1: {
    width: Dimensions.get('window').width * 0.50,
    height: Dimensions.get('window').width * 0.50,
    backgroundColor: 'white',
    borderRadius:Dimensions.get('window').height * 0.05,
    bottom: Dimensions.get('window').height * 0.23,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 10,
    position: 'relative', // Added for positioning the icon
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width * 0.40,
    height: Dimensions.get('window').width * 0.40,
    top: Dimensions.get('window').height * 0.02,
    bottom: Dimensions.get('window').height * -0.01,
  },
  loginText: {
    fontSize:Dimensions.get('window').width * 0.06,
    color: '#333',
    top:Dimensions.get('window').height * 0.060,
    left: Dimensions.get('window').width * 0.10,
  },
  icon1Button: {
    position: 'absolute', 
    top:Dimensions.get('window').height * 0.064,
    left: Dimensions.get('window').width * 0.03,
    elevation: 12,
    
  },

});

export default AdminDashboardScreen;

