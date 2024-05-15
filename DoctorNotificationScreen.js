import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Animated, Dimensions, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Importing Feather icons
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const DoctorNotificationScreen = () => {
  const navigation = useNavigation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [pressedAddPatient, setPressedAddPatient] = useState(false); // State to track if Add Patient is pressed

  useEffect(() => {
    let animation = null;
    if (showSidebar) {
      animation = Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }
      ).start();
    } else {
      animation = Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }
      ).start();
    }
    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [showSidebar, fadeAnim]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };
  
  const navigateToProfileScreen = () => {
    navigation.navigate('ProfileScreen'); // Replace 'ProfileScreen' with the actual screen name
  };
  
  const navigateToDoctorNotificationScreen = () => {
    navigation.navigate('DoctorNotificationScreen'); // Replace 'DoctorNotificationScreen' with the actual screen name
  };

  const navigateToAddPatient = () => {
    navigation.navigate('AddPatientScreen');
    setPressedAddPatient(true); // Set pressed state to true when Add Patient is clicked
    setTimeout(() => setPressedAddPatient(false), 1000); // Reset pressed state after 1 second
  };

  const navigateToPatientDetails = () => {
    navigation.navigate('PatientDetailsScreen'); // Replace 'PatientDetailsScreen' with the actual screen name
  };

  const navigateToAddVideos = () => {
    navigation.navigate('AddVideoScreen'); // Navigate to AddVideoScreen
  };

  const navigateToListOfAppointments = () => {
    navigation.navigate('ListOfAppointmentsScreen'); // Replace 'ListOfAppointmentsScreen' with the actual screen name
  };

  const navigateToDoctorScreen = () => {
    navigation.navigate("DoctorScreen");
  };
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Icon name={showSidebar ? 'x' : 'menu'} size={width * 0.08} color="white" style={styles.menuIcon} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={navigateToProfileScreen}>
          <View style={styles.profileCircle}>
            <Icon name="user" size={width * 0.08} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      {showSidebar && (
        <TouchableOpacity style={styles.sidebarContainer} onPress={closeSidebar}>
          <View style={styles.sidebar}>
            <FlatList
              data={[
                { title: 'Doctor Profile', icon: 'user', onPress: navigateToProfileScreen },
                { title: 'Add Patient', icon: 'user-plus', onPress: navigateToAddPatient },
                { title: 'List of Patients', icon: 'users', onPress: navigateToPatientDetails },
                { title: 'Add Videos', icon: 'video', onPress: navigateToAddVideos },
                { title: 'List of Appointments', icon: 'calendar', onPress: navigateToListOfAppointments },
                { title: 'Notification', icon: 'bell', onPress: navigateToDoctorNotificationScreen },
                { title: 'Logout', icon: 'log-out', onPress: navigateToDoctorScreen },
              ]}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={item.onPress}>
                  <Animated.View style={[styles.menuItem, { opacity: fadeAnim }]}>
                    <Icon name={item.icon} size={20} color="#333" style={styles.menuIcon} />
                    <Text style={styles.menuText}>{item.title}</Text>
                  </Animated.View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.contentContainer}>
      <View style={styles.doctorPanel}>
      <Text style={styles.button1Text}>Notification Message</Text>
      <TouchableOpacity style={styles.arrowButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={width * 0.08} color="#333333" />
      </TouchableOpacity> 
      </View>
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
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.09,
    paddingBottom: height * 0.03,
    height: height * 0.16,
  },
  menuIcon: {
    marginRight: width * 0.02,
    top: width * 0.01,
  },
  menuText: {
    fontSize: 15,
    marginLeft: 1,
    top: width * 0.01,
  },
  profileCircle: {
    width: width * 0.0933,
    height: width * 0.0933,
    borderRadius: width * 0.06,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    left: width * 0.02,
    bottom: -height * 0.0009,
  },
  doctorPanel: { 
    width: width * 0.9,
    height: height * 0.6,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.75)', // 74% opacity white
    alignItems: 'center',
    justifyContent: 'center',
  },  
 
  contentContainer: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  sidebarContainer: {
    position: 'absolute',
    top: height * 0.06,
    left: 0,
    bottom: 0,
    zIndex: 10,
    width: width * 0.999, // Adjust the width of the sidebar based on screen width
    marginTop: height * 0.1, // Adjust the marginTop based on screen height
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    backgroundColor: '#E6EEFF',
    height: height,
    paddingTop: height * 0.09,
    paddingHorizontal: width * 0.10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 10,
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
    marginBottom: height * 0.03,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.02,
    borderTopWidth: 1,
    borderColor: '#B0C4DE',
  },
  menuIconSidebar: {
    marginRight: width * 0.02,
    top: height * 0.02,
  },
  arrowButton: {
    position: 'absolute',
    top: height * 0.03,
    left: width * 0.08,
  },
  button1Text: {
    color: '#000000',
    fontSize: width * 0.05,
    marginTop:height * -0.50,
    left: width * -0.03,
  },
});

export default DoctorNotificationScreen;
