import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, TouchableOpacity, TextInput } from 'react-native';

const MedicalHistoryScreen = ({ route }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4); // Number of questions per page
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);

  const { patientId } = route.params; // Get patientId from route params

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://192.168.8.82/demo/qns.php', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const data = await response.json();
      console.log('Fetched data:', data);
      setQuestions(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error.message);
      setLoading(false);
      Alert.alert('Error', 'Failed to fetch questions. Please try again later.');
    }
  };

  const handleAnswer = (questionId, answer, additionalInfo = '') => {
    setAnswers(prevState => ({
      ...prevState,
      [questionId]: { answer, additionalInfo }, // Store both the answer and additional information
    }));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://192.168.8.82/demo/submit_ans.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientId: patientId, // Include patientId in the request body
          answers: Object.values(answers).map(answer => ({
            option: answer.answer,
            inp_data: answer.additionalInfo || '', // Include additional information if available
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit answers');
      }

      setCompleted(true);
      Alert.alert('Success', 'Questionnaire submitted successfully.');
    } catch (error) {
      console.error('Error submitting answers:', error.message);
      Alert.alert('Error', 'Failed to submit answers. Please try again later.');
    }
  };

  const visibleQuestions = questions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {loading ? (
          <ActivityIndicator size="large" color="#2DC2D7" />
        ) : completed ? (
          <Text style={styles.completedText}>You have already completed the questionnaire.</Text>
        ) : (
          <View style={styles.questionsContainer}>
            {visibleQuestions.map(question => (
              <View key={question.id} style={styles.question}>
                <Text style={styles.questionText}>{question.questions}</Text>
                <View style={styles.optionsContainer}>
                  <TouchableOpacity
                    style={[styles.optionButton, answers[question.id]?.answer === 'yes' && styles.selectedOption]}
                    onPress={() => handleAnswer(question.id, 'yes')}
                  >
                    <Text style={styles.optionText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.optionButton, answers[question.id]?.answer === 'no' && styles.selectedOption]}
                    onPress={() => handleAnswer(question.id, 'no')}
                  >
                    <Text style={styles.optionText}>No</Text>
                  </TouchableOpacity>
                </View>
                {answers[question.id]?.answer === 'yes' && (
                  <TextInput
                    style={styles.additionalInput}
                    placeholder="Additional Information"
                    onChangeText={text => handleAnswer(question.id, 'yes', text)} // Pass additional information
                  />
                )}
              </View>
            ))}
            <View style={styles.paginationButtonsContainer}>
              <TouchableOpacity
                style={[styles.paginationButton, currentPage === 1 && styles.disabled]}
                onPress={handlePrevPage}
                disabled={currentPage === 1}
              >
                <Text style={styles.paginationButtonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.paginationButton, currentPage === Math.ceil(questions.length / pageSize) && styles.disabled]}
                onPress={handleNextPage}
                disabled={currentPage === Math.ceil(questions.length / pageSize)}
              >
                <Text style={styles.paginationButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  questionsContainer: {
    marginTop: 20,
    paddingBottom: 50, // Adjust if necessary to prevent content from being cut off
  },
  question: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18, // Increased font size for better readability
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center', // Center align the question text
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center align the options
    marginBottom: 10,
  },
  optionButton: {
    padding: 10,
    marginRight: 10,
    backgroundColor: '#2DC2D7',
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: '#1E90FF',
  },
  optionText: {
    color: '#FFFFFF',
  },
  additionalInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    alignSelf: 'stretch', // Stretch the input field horizontally
  },
  paginationButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  paginationButton: {
    backgroundColor: '#2DC2D7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  paginationButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  disabled: {
    backgroundColor: '#CCCCCC', // Change the background color for disabled buttons
  },
  submitButton: {
    backgroundColor: '#2DC2D7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  completedText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MedicalHistoryScreen;


HERE PATIENT DASHBOARD SCREEN .JS

import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, TouchableOpacity, View, Text, Animated, Dimensions, FlatList,  } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Importing Feather icons
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; // Importing FontAwesomeIcon
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'; // Importing the calendar plus icon
const { width, height } = Dimensions.get('window');

const PatientDashboardScreen = () => {
  const navigation = useNavigation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

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
  const navigateToPatientProfileScreen = () => {
    navigation.navigate('PatientProfileScreen'); 
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
  const navigateToPatientHelpScreen    = () => {
    navigation.navigate('PatientHelpScreen ');
  };

  const navigateToPatientScreen  = () => {
    navigation.navigate('PatientScreen');
  };

  return (
   
    <View style={styles.container}>
      <View style={styles.box1}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Icon name={showSidebar ? 'x' : 'menu'} size={width * 0.08} color="white"  />
        </TouchableOpacity>
        <View  style={styles.box2} >
        <TouchableOpacity onPress={navigateToPatientNotificationScreen} >
          <Icon name="bell" size={width * 0.08} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToPatientProfileScreen}>
          <View style={styles.profileCircle}>
            <Icon name="user" size={width * 0.08} color="black" />
          </View>
        </TouchableOpacity>
        </View>
        
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
                { title: 'Daily Activity', icon: 'activity' ,onPress: navigateToDailyActivityScreen},
                { title: 'View videos', icon: 'video', onPress:navigateToViewVideosScreen },
                { title: 'Daily Progress', icon: 'trending-up', onPress:navigateToDailyProgressScreen },
                { title: 'Questionnaires', icon: 'edit', onPress:navigateToQuestionnairesScreen },
                { title: 'Appointment', icon: 'calendar' , onPress:navigateToPatientAppointmentScreen},
                { title: ' List of Appointments', icon: 'calendar', onPress:navigateToPatientListOfAppointmentsScreen },
                { title: 'help', icon: 'calendar',onPress:navigateToPatientHelpScreen },
                { title: 'Logout', icon: 'log-out',onPress:navigateToPatientScreen},
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
        <Text style={styles.greetingText}>Hello, Patient</Text>
        <TouchableOpacity onPress={navigateToViewVideosScreen}>
          <View style={[styles.rectangleBox, { top: height * 0.06, left: width * 0.05, width: width * 0.33, height: height * 0.13 }]}>
            <Icon name="play" size={width * 0.13} color="white" style={{ position: 'absolute', top: height * 0.03, left: width * 0.09}} />
            <Text style={styles.rectangleText}>View Videos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToDailyActivityScreen}>
          <View style={[styles.rectangleBox, { top: height * 0.06, left: -width * 0.37, width: width * 0.33, height: height * 0.13 }]}>
            <Icon name="activity" size={width * 0.13} color="white" style={{ position: 'absolute', top: height * 0.03, left: width * 0.09}} />
            <Text style={styles.rectangleText}>Daily Activity</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToQuestionnairesScreen}>
          <View style={[styles.rectangleBox, { top: height * 0.25, left: width * 0.05, width: width * 0.33, height: height * 0.13 }]}>
            <Icon name="edit" size={width * 0.13} color="white" style={{ position: 'absolute', top: height * 0.03, left: width * 0.09}} />
            <Text style={styles.rectangleText}>Questionnaires</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToDailyProgressScreen}>
          <View style={[styles.rectangleBox, { top: height * 0.25, left: -width * 0.37, width: width * 0.33, height: height * 0.13 }]}>
            <Icon name="trending-up" size={width * 0.13} color="white" style={{ position: 'absolute', top: height * 0.03, left: width * 0.09}} />
            <Text style={styles.rectangleText}>Daily Progress</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToPatientAppointmentScreen}>
           <View style={[styles.rectangleBox, { top: height * 0.45, left: width * 0.05, width: width * 0.33, height: height * 0.13 }]}>
           <FontAwesomeIcon icon={faCalendarPlus} size={50} color="white" style={{ fontWeight: 'bold', top: height * 0.01, left: width * 0.0, width: width * 0.1, height: width * 0.1 }} />
            <Text style={[styles.rectangleText, { fontSize: width * 0.04,top: height * 0.06 }]}>Appointment</Text>
           </View>
           </TouchableOpacity>

        <TouchableOpacity onPress={navigateToPatientListOfAppointmentsScreen}>
          <View style={[styles.rectangleBox, { top: height * 0.45, left: -width * 0.37, width: width * 0.33, height: height * 0.13 }]}>
            <Icon name="calendar" size={width * 0.13} color="white" style={{ position: 'absolute', top: height * 0.03, left: width * 0.09}} />
            <Text style={styles.rectangleText}>List of appointments</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.ellipseContainer}>
        <TouchableOpacity onPress={navigateToPatientScreen } style={styles.logoutButton}>
          <Icon name="log-out" size={width * 0.09} color="white" />
        </TouchableOpacity>
        </View>
        <View style={styles.ellipse1Container}>
        <TouchableOpacity onPress={navigateToPatientHelpScreen  } style={styles.logoutButton}>
          <Icon name="help-circle" size={width * 0.09} color="white" />
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
  box1:{
 justifyContent:'space-between'
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2DC2D7',
    padding:20,
    paddingTop: height * 0.08,
    height: height * 0.16,
  },
  box2: {
     alignItems:'center',
     flexDirection:'row',
     columnGap:9
  },
  menuText: {
    fontSize: 15,
    marginLeft: width * 0.03,
    top: width * 0.01,
  },
  profileCircle: {
    width: width * 0.0933,
    height: width * 0.0933,
    borderRadius: width * 0.06,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    left: width * 0.01,
  },
  notificationIcon: {
    position: 'absolute',
    right: width * 0.1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
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
    paddingTop: height * 0.03,
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
  rectangleBox: {
    position: 'absolute',
    borderRadius: width * 0.08,
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
  greetingText: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    textAlign: 'center',
    top: height * 0.03,
  },
  rectangleText: {
    color: 'black',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    textAlign: 'center',
    top: height * 0.09,
  },
  ellipseContainer: {
    position: 'absolute',
    top: height * 0.88,
    left:width * 0.12,
    alignItems: 'center',
  },
  ellipse: {
    width: width * 0.04,
    height:height * 0.04,
    borderRadius:  width * 0.06,
    backgroundColor: '#2DC2D7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1.50,
    shadowRadius: 4,
  },
  ellipse1Container: {
    position: 'absolute',
    top: height * 0.88,
    right:width * 0.125,
    alignItems: 'center',
  },
  ellipse1: {
    width: width * 0.04,
    height:height * 0.04,
    borderRadius:  width * 0.06,
    backgroundColor: '#2DC2D7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1.50,
    shadowRadius: 4,
  },
  
  logoutButton: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: '#2DC2D7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1.50,
    shadowRadius: 4,
  },
  container2:{
    flex:1
  }
});

export default PatientDashboardScreen;





import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Animated, Dimensions, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'; // Import WhatsApp icon

const { width, height } = Dimensions.get('window');

const PatientDashboardScreen = () => {
  const navigation = useNavigation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

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

  const navigateToPatientProfileScreen = () => {
    navigation.navigate('PatientProfileScreen');
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

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Icon name={showSidebar ? 'x' : 'menu'} size={width * 0.08} color="white" />
        </TouchableOpacity>
        <View style={styles.box2}>
          <TouchableOpacity onPress={navigateToPatientNotificationScreen}>
            <Icon name="bell" size={width * 0.08} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToPatientProfileScreen}>
            <View style={styles.profileCircle}>
              <Icon name="user" size={width * 0.08} color="black" />
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
        <Text style={styles.greetingText}>Hello, Patient</Text>
      </View>
      <View style={styles.bottomsPanel}>
        <TouchableOpacity onPress={navigateToViewVideosScreen}>
          <View style={[styles.rectangleBox, { top: height * -0.045, left: width * -0.1, width: width * 0.19, height: height * 0.09 }]}>
            <FontAwesomeIcon icon={faWhatsapp} size={width * 0.11} color="black" style={{ position: 'absolute', top: height * 0.02, left: width * 0.04 }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToViewVideosScreen}>
          <View style={[styles.rectangleBox, { top: height * -0.045, left: width * -0.088, width: width * 0.19, height: height * 0.09 }]}>
            <Icon name="play" size={width * 0.11} color="black" style={{ position: 'absolute', top: height * 0.02, left: width * 0.05 }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToViewVideosScreen}>
          <View style={[styles.rectangleBox, { top: height * -0.045, left: width * -0.085, width: width * 0.19, height: height * 0.09 }]}>
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
    height: height * 0.16,
  },
  box2: {
    alignItems: 'center',
    flexDirection: 'row',
    right: height * -0.05
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
    left: width * -0.83
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  sidebarContainer: {
    position: 'absolute',
    top: height * 0.06,
    left: 0,
    bottom: 0,
    zIndex: 10,
    width: width * 0.999, 
    marginTop: height * 0.1, 
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    backgroundColor: '#E6EEFF',
    height: height,
    paddingTop: height * 0.03,
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
  rectangleBox: {
    position: 'absolute',
    borderRadius: width * 0.07,
    backgroundColor: '#A0E9FF',
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
    top: height * -0.067,
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
    width:height * 0.4,
    left:width * 0.075,
    top:width * 1.13,
    borderRadius: 30,
  },
  bottomsPanel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
    height: height * 0.11,
    width:height * 0.4,
    left:width * 0.075,
    top:width * 1.951,
    borderRadius: 30,
  },
  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default PatientDashboardScreen;



// Import necessary modules
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';

// Define the component
const PatientProfileScreen = ({ route, navigation }) => {
  // Define state variables
  const { patientId } = route.params;
  const [patientData, setPatientData] = useState(null);
  const [imageError, setImageError] = useState(false); 
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [newImage, setNewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Define effect to fetch patient profile on component mount
  useEffect(() => {
    fetchPatientProfile();
  }, []);

  // Function to fetch patient profile
  const fetchPatientProfile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://192.168.172.82/demo/profile.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patientId: patientId }),
      });

      const responseData = await response.json();

      if (responseData.status === 'success') {
        // Check if the profile image exists before updating the URI
        if (responseData.profile.image) {
          // Check if the image URI already contains the base URL
          const imageUrl = responseData.profile.image.startsWith('http://192.168.172.82/demo/') ?
            responseData.profile.image :
            'http://192.168.172.82/demo/' + responseData.profile.image;

          setPatientData({
            ...responseData.profile,
            image: imageUrl,
          });
        } else {
          setPatientData(responseData.profile);
        }

        // Update additional fields
        setUpdatedData(responseData.profile);
      } else {
        console.error('Error fetching patient profile:', responseData.message);
      }
    } catch (error) {
      console.error('Error fetching patient profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle image upload
  const handleImageUpload = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled && result.assets.length > 0 && result.assets[0].uri) {
        setNewImage(result.assets[0]);
      } else {
        console.log('Image selection canceled or failed.');
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  // Function to handle editing
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Function to handle saving
  const handleSave = async () => {
    // Implement logic to save the updated profile data to the server
  };

  // Function to handle logging out
  const handleLogout = () => {
    navigation.navigate('PatientScreen');
  };

  // Return the JSX for the component
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View style={styles.profileHeader}>
            {patientData && patientData.image ? (
              <Image source={{ uri: patientData.image }} style={styles.profileImage} />
            ) : (
              <View style={styles.noImageContainer}>
                <FontAwesome5 name="user" size={64} color="#808080" />
              </View>
            )}
            <TouchableOpacity style={styles.editButton} onPress={handleImageUpload}>
              <FontAwesome5 name="camera" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <TextInput
              style={styles.input}
              value={updatedData.name}
              onChangeText={(text) => setUpdatedData({ ...updatedData, name: text })}
              editable={isEditing}
            />
            {/* Add more TextInput components for other fields */}
            {isEditing ? (
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
};

// Define styles
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  noImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  editButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  profileInfo: {
    width: width * 0.8,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

// Export the component
export default PatientProfileScreen;






<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require "dbh.php"; // Connect to the database

// Get the raw POST data as a string
$json_data = file_get_contents("php://input");

$request_data = json_decode($json_data, true); 

// Log the decoded request data
file_put_contents('decoded_request_data.txt', print_r($request_data, true));

// Check if 'patientId' key exists in $request_data
if (isset($request_data['patientId'])) {
    // Get the patientId from the decoded JSON data
    $patientId = $request_data['patientId'];

    // Check if 'profile' key exists in $request_data
    if (isset($request_data['profile'])) {
        // Get the profile data from the decoded JSON data
        $profile = $request_data['profile'];

        // Extract data from the profile
        $name = $profile['name'];
        $contactNo = $profile['contactNo'];
        $age = $profile['age'];
        $gender = $profile['gender'];
        $height = $profile['height'];
        $weight = $profile['weight'];
        $patientCase = $profile['patientCase'];
        $admittedOn = $profile['admittedOn'];
        $image = $profile['image'];

        // Check if an image is included in the profile
        if (!empty($image)) {
            // Upload the image and get its URL
            $imageURL = uploadImage($image);
            if ($imageURL) {
                // Include the image URL in the profile data
                $profile['image'] = $imageURL;
            } else {
                // Handle image upload failure
                $response['status'] = "error";
                $response['message'] = "Failed to upload image";
                echo json_encode($response);
                exit;
            }
        }

        // Query to update patient profile using prepared statements
        $sql_update = "UPDATE `patients3` SET `name` = :name, `contactNo` = :contactNo, `age` = :age, `gender` = :gender, `height` = :height, `weight` = :weight, `patientCase` = :patientCase, `admittedOn` = :admittedOn";
        if (!empty($imageURL)) {
            $sql_update .= ", `image` = :image";
        }
        $sql_update .= " WHERE `patientId` = :patientId";
        $stmt_update = $conn->prepare($sql_update); 
        $stmt_update->bindParam(':patientId', $patientId, PDO::PARAM_STR);
        $stmt_update->bindParam(':name', $name, PDO::PARAM_STR);
        $stmt_update->bindParam(':contactNo', $contactNo, PDO::PARAM_STR);
        $stmt_update->bindParam(':age', $age, PDO::PARAM_INT);
        $stmt_update->bindParam(':gender', $gender, PDO::PARAM_STR);
        $stmt_update->bindParam(':height', $height, PDO::PARAM_INT);
        $stmt_update->bindParam(':weight', $weight, PDO::PARAM_INT);
        $stmt_update->bindParam(':patientCase', $patientCase, PDO::PARAM_STR);
        $stmt_update->bindParam(':admittedOn', $admittedOn, PDO::PARAM_STR);
        if (!empty($imageURL)) {
            $stmt_update->bindParam(':image', $imageURL, PDO::PARAM_STR);
        }
        $stmt_update->execute();

        // Check if the update was successful
        if ($stmt_update->rowCount() > 0) {
            $response['status'] = "success";
            $response['message'] = "Patient profile updated successfully";
        } else {
            $response['status'] = "error";
            $response['message'] = "Failed to update patient profile";
        }

        // Close the prepared statement
        $stmt_update->closeCursor();
    } else {
        // Query to fetch patient profile using prepared statements
        $sql_select = "SELECT `id`, `patientId`, `name`, `contactNo`, `age`, `gender`, `height`, `weight`, `patientCase`, `admittedOn`, `image` FROM `patients3` WHERE patientId = :patientId";
        $stmt_select = $conn->prepare($sql_select); 
        $stmt_select->bindParam(':patientId', $patientId, PDO::PARAM_STR);
        $stmt_select->execute();

        // Check if patient profile is found
        if ($stmt_select->rowCount() > 0) {
            // Fetch the patient profile
            $patient_profile = $stmt_select->fetch(PDO::FETCH_ASSOC);

            // Prepare the response with the patient profile
            $response['status'] = "success";
            $response['message'] = "Patient profile found";
            $response['profile'] = $patient_profile;
        } else {
            // Prepare the response for patient profile not found
            $response['status'] = "error";
            $response['message'] = "Patient profile not found";
        }

        // Close the prepared statement
        $stmt_select->closeCursor();
    }
} else {
    // Handle the case where 'patientId' is missing
    $response['status'] = "error";
    $response['message'] = "Invalid request data";
}

// Close the database connection
$conn = null;

// Respond with JSON
echo json_encode($response);

// Function to upload the image to the server
function uploadImage($imageData) {
    // Set the upload directory
    $uploadDirectory = "uploads/";

    // Generate a unique filename for the image
    $imageFileName = uniqid() . '.jpeg';

    // Set the image path
    $imagePath = $uploadDirectory . $imageFileName;

    // Decode the base64 image data
    $decodedImageData = base64_decode($imageData);

    // Upload the image to the server
    if (file_put_contents($imagePath, $decodedImageData)) {
        return $imagePath; // Return the URL of the uploaded image
    } else {
        return false; // Return false if the image upload fails
    }
}
?>


<?php
// MySQL database connection parameters
$servername = "localhost";
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$database = "sample"; // Your MySQL database name

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if POST variables are set
if(isset($_POST['doctorId'])) {
    // Extract values from POST
    $doctorId = $_POST['doctorId'];
    
    // Check if image file is uploaded
    if(isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        // Specify the directory for storing the uploaded images
        $uploadDir = "uploads/";

        // Get the temporary filename of the uploaded file
        $tempFilename = $_FILES['image']['tmp_name'];

        // Generate a unique filename for the uploaded image
        $newFilename = uniqid() . '_' . basename($_FILES['image']['name']);
        
        // Move the uploaded file to the specified directory with the new filename
        if(move_uploaded_file($tempFilename, $uploadDir . $newFilename)) {
            // Get the existing image filename for the doctor
            $getImageSql = "SELECT `image` FROM `doctors` WHERE `doctorId` = '$doctorId'";
            $result = $conn->query($getImageSql);
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $existingImage = $row["image"];
                // Delete the existing image file
                if (file_exists($existingImage)) {
                    unlink($existingImage);
                }
            }
            // Update the image field in the database with the new filename
            $image = $uploadDir . $newFilename;
            $sql = "UPDATE `doctors` SET `image` = '$image' WHERE `doctorId` = '$doctorId'";
        } else {
            // Error moving uploaded file
            echo "Error: Failed to move uploaded file.";
            exit();
        }
    } else {
        // If image file is not uploaded or an error occurred, echo an error message
        echo "Error: No image uploaded or an error occurred.";
        exit();
    }

    // Execute the query
    if ($conn->query($sql) === TRUE) {
        // Image updated successfully
        echo "Image updated successfully";
    } else {
        // Error updating image
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    // If POST variables are not set, echo an error message
    echo "Error: Required POST variables are not set";
}

// Close connection
$conn->close();
?>
doctorid???????????????
