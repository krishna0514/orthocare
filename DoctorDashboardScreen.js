import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Animated, Dimensions, FlatList, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'; // Import the user-plus icon from FontAwesome
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const { width, height } = Dimensions.get('window');

const DoctorDashboardScreen = ({ route }) => {
  const navigation = useNavigation();
  const { doctorId, doctorName, doctorImage } = route.params;
  const [showSidebar, setShowSidebar] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const [patients, setPatients] = useState([]);
  const [showAllPatients, setShowAllPatients] = useState(false);


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
  navigation.navigate('ProfileScreen', { doctorId, doctorImage });
};

  const navigateToDoctorNotificationScreen = () => {
    navigation.navigate('DoctorNotificationScreen');
  };

  const navigateToAddPatient = () => {
    console.log("Add Patient button pressed, Doctor ID:", doctorId); // Log message with doctorId
    navigation.navigate('AddPatientScreen1', { doctorId }); // Pass doctorId as a parameter
  };
  

  const navigateToPatientDetails = () => {
    navigation.navigate('PatientDetailsScreen');
  };

  const navigateToAddVideos = () => {
    navigation.navigate('AddVideoScreen', { doctorId });
  };
  

  const navigateToListOfAppointments = () => {
    navigation.navigate('ListOfAppointmentsScreen');
  };


  const navigateToDoctorScreen = () => {
    navigation.navigate("DoctorScreen");
  };
  const handleView = () => {
    navigation.navigate('PatientListScreen', { patients });
  };
  const formatDoctorName = (name) => {
    if (name.length <= 6) {
      return name;
    } else {
      return `${name.substring(0, 6)}...`;
    }
  };

  useEffect(() => {
    fetch('http://192.168.140.82/demo/viewpatientlist.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Log the data to inspect its structure
        if (data && !data.status) {
          setPatients(data);
        } else {
          console.error('Error fetching patient details:', data.message || 'No data found');
        }
      })
      .catch(error => {
        console.error('Error fetching patient details:', error);
      });
  }, []);

  useEffect(() => {
    const scrollTimer = setInterval(() => {
      if (scrollRef.current) {
        const nextIndex = (currentIndex + 1) % images.length;
        if (nextIndex === 0) {
          // If nextIndex is the first image, scroll to the first image instantly without animation
          scrollRef.current.scrollTo({
            x: 0,
            animated: false,
          });
        } else {
          // Otherwise, scroll to the next image normally
          scrollRef.current.scrollTo({
            x: width * nextIndex,
            animated: true,
          });
        }
        setCurrentIndex(nextIndex);
      }
    }, 3000); // Change the duration as needed

    return () => clearInterval(scrollTimer);
  }, [currentIndex]);

  const images = [
    require('./assets/1.jpeg'),
    require('./assets/2.jpeg'),
    require('./assets/3.jpeg'),
    // Add more images as needed
  ];

  const renderDots = () => {
    return images.map((image, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          // Handle dot press
          if (scrollRef.current) {
            scrollRef.current.scrollTo({
              x: width * index,
              animated: true,
            });
            setCurrentIndex(index);
          }
        }}
      >
        <View style={[styles.dot, currentIndex === index && styles.activeDot]} />
      </TouchableOpacity>
    ));
  };
  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        {/* Menu icon */}
        <TouchableOpacity onPress={toggleSidebar}>
          <Icon name={showSidebar ? 'menu' : 'menu'} size={width * 0.08} color="white" style={styles.menuIcon} />
        </TouchableOpacity>
        {/* User info */}
        <View style={styles.userInfo}>
          <TouchableOpacity onPress={navigateToProfileScreen}>
            <View style={styles.profileCircle}>
              <Image source={{ uri: doctorImage }} style={styles.profileImage} />
            </View>
          </TouchableOpacity>
          <Text style={styles.greetingText}>Hello, {formatDoctorName(doctorName)}</Text>
        </View>
        {/* Notification icon */}
        <TouchableOpacity onPress={navigateToDoctorNotificationScreen} style={styles.notificationIcon}>
          <Icon name="bell" size={width * 0.08} color="white" style={styles.menuIcon} />
        </TouchableOpacity>
      </View>

      {/* Sidebar */}
      {showSidebar && (
        <TouchableOpacity style={styles.sidebarContainer} onPress={closeSidebar}>
          <View style={styles.sidebar}>
            <View style={styles.closeButtonContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={closeSidebar}></TouchableOpacity>
            </View>
            <Text style={styles.sidebarTitle}>Menu</Text>
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
                    <Icon name={item.icon} size={20} color="#333" style={styles.menuIcon1} />
                    <Text style={styles.menuText}>{item.title}</Text>
                  </Animated.View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      )}

      {/* Image gallery */}
      <View style={styles.contentContainer}>
      <View style={styles.bottoms2Panel}>
          <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEventThrottle={3000}
            snapToInterval={width}
          >
            {images.map((image, index) => (
              <TouchableOpacity key={index} onPress={() => {/* Handle image press */}}>
                <Image source={image} style={styles.image} />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.dotContainer}>
            {renderDots()}
          </View>
        </View>
      </View>
      <View style={styles.bottoms1Panel}>
  <View style={styles.topSection}>
    <Text style={styles.topText}>List Of Appointments</Text>
    <View style={styles.imageCircle}>
      <Text style={styles.idText}>ID: 12345</Text>
    </View>
  </View>
  <View style={styles.middleSection}>
    {/* Content of the middle section */}
  </View>
  <TouchableOpacity style={styles.viewAllButton} onPress={() => {/* Handle view all press */}}>
    <Text style={styles.viewAllText}>View All</Text>
  </TouchableOpacity>
</View>
<View style={styles.bottomsPanel}>
<TouchableOpacity onPress={navigateToAddPatient}>
  <View style={[styles.rectangleBox1, { top: height * -0.045, left: width * -0.1, width: width * 0.19, height: height * 0.09 }]}>
    <FontAwesomeIcon icon={faUserPlus} size={width * 0.11} color="black" style={{ position: 'absolute', top: height * 0.02, left: width * 0.04 }} />
  </View>
</TouchableOpacity>
        <TouchableOpacity onPress={navigateToAddVideos}>
          <View style={[styles.rectangleBox1, { top: height * -0.045, left: width * -0.088, width: width * 0.19, height: height * 0.09 }]}>
            <Icon name="play" size={width * 0.11} color="black" style={{ position: 'absolute', top: height * 0.02, left: width * 0.05 }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToDoctorScreen}>
          <View style={[styles.rectangleBox1, { top: height * -0.045, left: width * -0.085, width: width * 0.19, height: height * 0.09 }]}>
            <Icon name="log-out" size={width * 0.11} color="black" style={{ position: 'absolute', top: height * 0.02, left: width * 0.05 }} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomPanel}>
        {/* Display only three patients vertically */}
        {patients.slice(0, showAllPatients ? patients.length : 3).map((patient, index) => (
          <View style={styles.patientContainer} key={index}>
            <Image source={{ uri: patient.image }} style={styles.patientImage} />
            <Text style={styles.patientId}>Patient ID: {patient.patientId}</Text>
          </View>
        ))}
        {/* View All button */}
        {!showAllPatients && (
          <TouchableOpacity style={styles.viewButton} onPress={handleView}>
            <Text style={styles.viewText}>View All</Text>
          </TouchableOpacity>
        )}
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
    height: height * 0.14,
  },
  menuIcon: {
    marginRight: width * 0.02,
    top: width * -0.04,
  },
  menuText: {
    fontSize: 15,
    marginLeft: width * 0.03,
    top: width * 0.01,
  },
  profileCircle: {
    width: width * 0.092,
    height: width * 0.092,
    borderRadius: width * 0.06,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    top: width * -0.04,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.06,
  },
  notificationIcon: {
    marginRight: width * 0.02,
  },
  greetingText: {
    fontSize: width * 0.068,
    fontWeight: 'bold',
    paddingHorizontal: width * 0.03,
    textAlign: 'center',
    top: width * -0.035,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  sidebarContainer: {
    position: 'absolute',
    top: height * 0.17,
    left: width * 0.055,
    zIndex: 10,
    width: width * 0.9,
  },
  sidebar: {
    backgroundColor: '#A0E9FF',
    height: height * 0.46,
    borderRadius: width * 0.05,
    paddingHorizontal: width * 0.1,
    elevation: 4,
    shadowColor: '#FFF',
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
    marginBottom: height * 0.02,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.018,
    borderTopWidth: 1,
    borderColor: '#B0C4DE',
  },
  menuIcon1: {
    marginRight: width * 0.03,

  },
  menuIcon: {
    marginRight: width * 0.03,
    top: width * -0.035,

  },
  menuText: {
    fontSize: width * 0.04,
    top: width * 0.01,
  },
  bottoms2Panel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#CDF5FD',
    height: height * 0.18,
    width: height * 0.4,
    left: width * 0.075,
    top: width * 0.01,
    borderRadius: 20,
    
  },
  image: {
    width: width * 0.85,
    height: height * 0.18,
    borderRadius: 30,
    marginRight: width * 0.01,
  },
  dotContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: height * -0.025,
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#2DC2D7',
  },
  bottoms1Panel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
    height: height * 0.11,
    width: height * 0.4,
    left: width * 0.075,
    top: width * 0.85,
    borderRadius: 20,
    elevation: 3,

  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  topText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    top: width * -0.095,
    left: width * 0.06,

  },
  imageCircle: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#2DC2D7',
    alignItems: 'center',
    left: width * -0.62,
    top:width*-0.001
    
  },
  idText: {
    color: '#000',
    fontSize: 12,
    top:width*0.145

  },
  middleSection: {
    // Style the middle section as needed
    marginVertical: 10,
  },
  viewAllButton: {
    backgroundColor: '#2DC2D7',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    left:width*-0.05,
  },
  viewAllText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomsPanel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#2DC2D7',
    height: height * 0.11,
    width: height * 0.4,
    left: width * 0.075,
    top: width * 1.951,
    borderRadius: 20,
    elevation: 4,

  },
  rectangleBox1: {
    position: 'absolute',
    borderRadius: width * 0.07,
    backgroundColor: '#A0E9FF',
    borderColor: 'black', // Border color
    borderWidth: 1, // Border width
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: width * 0.32,
    height: height * 0.23,
  },
  bottomPanel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    height: height * 0.35,
    width: height * 0.4,
    left: width * 0.075,
    top: width * 1.13,
    borderRadius: 20,
    elevation: 3,
  },
  
  patientContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  patientImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  patientId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#2DC2D7',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  viewText:{
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },

});

export default DoctorDashboardScreen;
