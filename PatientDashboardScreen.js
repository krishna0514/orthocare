import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Animated, Dimensions, FlatList, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const { width, height } = Dimensions.get('window');

const PatientDashboardScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [showSidebar, setShowSidebar] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { name, patientId } = route.params;
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    // Function to fetch the image URI from the server using the patient ID
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(`http://192.168.9.82/demo/imagepatient.php?patientId=${patientId}`);
        const data = await response.json();
        if (response.ok) {
          setProfileImage(data.image); // Assuming the image URI is returned in the 'image' field
        } else {
          console.error('Failed to fetch profile image:', data.error);
        }
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };
    
        fetchProfileImage(); // Call the function to fetch the image URI
  }, [patientId]);


  useEffect(() => {
    let animation = null;
    if (showSidebar) {
      animation = Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 1000,
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

  const navigateToPatientProfileScreen = (patientId, name,) => {
    navigation.navigate('PatientProfileScreen', { patientId: patientId, name: name,  });
  };
  
    

  const navigateToPatientNotificationScreen = () => {
    navigation.navigate('PatientNotificationScreen');
  };

  const navigateToDailyActivityScreen = () => {
    navigation.navigate('DailyActivityScreen');
  };

  const navigateToViewVideosScreen = () => {
    navigation.navigate('ViewVideosScreen');
  };

  const navigateToDailyProgressScreen = () => {
    navigation.navigate('DailyProgressScreen');
  };

  const navigateToQuestionnairesScreen = () => {
    navigation.navigate('QuestionnairesScreen');
  };

  const navigateToPatientAppointmentScreen = () => {
    navigation.navigate('PatientAppointmentScreen');
  };

  const navigateToPatientListOfAppointmentsScreen = () => {
    navigation.navigate('PatientListOfAppointmentsScreen');
  };

  const navigateToPatientHelpScreen = () => {
    navigation.navigate('PatientHelpScreen');
  };

  const navigateToPatientScreen = () => {
    navigation.navigate('PatientScreen');
  };
  const formatPatientName = (name) => {
    if (name.length <= 6) {
      return name;
    } else {
      return `${name.substring(0, 6)}...`;
    }
  };

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
    <View style={styles.topBar}>
  <TouchableOpacity onPress={toggleSidebar}>
    <Icon name={showSidebar ? 'menu' : 'menu'} size={width * 0.08} color="white" />
  </TouchableOpacity>
  <View style={styles.box2}>
    <TouchableOpacity onPress={navigateToPatientNotificationScreen}>
      <Icon name="bell" size={width * 0.08} color="white" />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigateToPatientProfileScreen(patientId, name)}>
      <View style={styles.profileCircle}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={{ width: 40, height: 40, borderRadius: 20, }} />
        ) : (
          <Icon name="user" size={width * 0.08} color="black" />
        )}
      </View>
    </TouchableOpacity>
  </View>

</View>
      {showSidebar && (
        <TouchableOpacity style={styles.sidebarContainer} onPress={closeSidebar}>
          <View style={styles.sidebar}>
            <View style={styles.closeButtonContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={closeSidebar}>  
              </TouchableOpacity>
            </View>
            <Text style={styles.sidebarTitle}>Menu</Text>
            <FlatList
              data={[
                { title: 'Patient Profile', icon: 'user', onPress: navigateToPatientProfileScreen },
                { title: 'Daily Activity', icon: 'activity', onPress: navigateToDailyActivityScreen },
                { title: 'View videos', icon: 'video', onPress: navigateToViewVideosScreen },
                { title: 'Daily Progress', icon: 'trending-up', onPress: navigateToDailyProgressScreen },
                { title: 'Questionnaires', icon: 'edit', onPress: navigateToQuestionnairesScreen },
                { title: 'Appointment', icon: 'calendar', onPress: navigateToPatientAppointmentScreen },
                { title: ' List of Appointments', icon: 'calendar', onPress: navigateToPatientListOfAppointmentsScreen },
                { title: 'help', icon: 'calendar', onPress: navigateToPatientHelpScreen },
                { title: 'Logout', icon: 'log-out', onPress: navigateToPatientScreen },
              ]}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={item.onPress}>
                  <View style={styles.menuItem}>
                    <Icon name={item.icon} size={20} color="#333" style={styles.menuIcon} />
                    <Text style={styles.menuText}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      )}

      <View style={styles.contentContainer}>
      <Text style={styles.greetingText}>Hello, {formatPatientName(name)}</Text>
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
        <TouchableOpacity onPress={navigateToViewVideosScreen}>
          <View style={[styles.rectangleBox1, { top: height * -0.045, left: width * -0.1, width: width * 0.19, height: height * 0.09 }]}>
            <FontAwesomeIcon icon={faWhatsapp} size={width * 0.11} color="black" style={{ position: 'absolute', top: height * 0.02, left: width * 0.04 }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToViewVideosScreen}>
          <View style={[styles.rectangleBox1, { top: height * -0.045, left: width * -0.088, width: width * 0.19, height: height * 0.09 }]}>
            <Icon name="play" size={width * 0.11} color="black" style={{ position: 'absolute', top: height * 0.02, left: width * 0.05 }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToViewVideosScreen}>
          <View style={[styles.rectangleBox1, { top: height * -0.045, left: width * -0.085, width: width * 0.19, height: height * 0.09 }]}>
            <Icon name="log-out" size={width * 0.11} color="black" style={{ position: 'absolute', top: height * 0.02, left: width * 0.05 }} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomPanel}>
        <TouchableOpacity onPress={navigateToDailyActivityScreen}>
          <View style={[styles.rectangleBox, { top: height * -0.15, right: width * -0.26, width: width * 0.3, height: height * 0.12 }]}>
            <Icon name="activity" size={width * 0.13} color="black" style={{ position: 'absolute', top: height * 0.03, left: width * 0.09 }} />
            <Text style={styles.rectangleText}>Daily Activity</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToQuestionnairesScreen}>
          <View style={[styles.rectangleBox, { top: height * 0.02, left: width * -0.26, width: width * 0.3, height: height * 0.12 }]}>
            <Icon name="edit" size={width * 0.13} color="black" style={{ position: 'absolute', top: height * 0.03, left: width * 0.09 }} />
            <Text style={styles.rectangleText}>Questionnaires</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToDailyProgressScreen}>
          <View style={[styles.rectangleBox, { top: height * -0.15, right: width * -0.26, width: width * 0.3, height: height * 0.12 }]}>
            <Icon name="trending-up" size={width * 0.13} color="black" style={{ position: 'absolute', top: height * 0.03, left: width * 0.09 }} />
            <Text style={styles.rectangleText}>Daily Progress</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToPatientAppointmentScreen}>
          <View style={[styles.rectangleBox, { top: height * 0.02, left: width * -0.26, width: width * 0.3, height: height * 0.12 }]}>
            <FontAwesomeIcon icon={faCalendarPlus} size={50} color="black" style={{ fontWeight: 'bold', top: height * 0.01, left: width * 0.0, width: width * 0.1, height: width * 0.1 }} />
            <Text style={[styles.rectangleText, { fontSize: width * 0.04, top: height * 0.05 }]}>Appointment</Text>
          </View>
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2DC2D7',
    padding: 20,
    paddingTop: height * 0.08,
    height: height * 0.14,
  },
  box2: {
    alignItems: 'center',
    flexDirection: 'row',
    right: height * -0.05
  },
 
  profileCircle: {
    width: width * 0.092,
    height: width * 0.092,
    borderRadius: width * 0.06,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    left: width * -0.83
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  sidebarContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidebar: {
    backgroundColor: 'white',
    width: width * 0.6,
    height: height * 0.8,
    borderRadius: 20,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: width * 0.02,
  },
  sidebarTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.015,
  },
  menuIcon: {
    marginRight: width * 0.03,
  },
  menuText: {
    fontSize: width * 0.04,
  },
  rectangleBox: {
    position: 'absolute',
    borderRadius: width * 0.07,
    backgroundColor: '#2DC2D7',
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

  greetingText: {
    fontSize: width * 0.068,
    fontWeight: 'bold',
    textAlign: 'center',
    top: height * -0.058,
    right: width * 0.06,

  },
  rectangleText: {
    color: 'black',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    textAlign: 'center',
    top: height * 0.08,
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
  bottoms2Panel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#CDF5FD',
    height: height * 0.18,
    width: height * 0.4,
    left: width * 0.075,
    top: width * 0.04,
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
    bottom: height * -0.02,
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
});

export default PatientDashboardScreen;
