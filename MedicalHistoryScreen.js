import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const MedicalHistoryScreen = ({ route }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);
  const [screenData, setScreenData] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);
  const { name } = route.params;
  const { patientId } = route.params;

  useEffect(() => {
    fetchQuestions(currentPage);
  }, [currentPage]);

  const fetchQuestions = async (screenNumber) => {
    try {
      let topBarText = '';
      let numQuestions = 0;
      let fetchedQuestions = [];

      switch (screenNumber) {
        case 1:
          topBarText = 'Medical History';
          numQuestions = 4;
          break;
        case 2:
          topBarText = 'Frozen Shoulder Symptoms';
          numQuestions = 5;
          break;
        case 3:
          topBarText = 'Lifestyle and Activities';
          numQuestions = 4;
          break;
        case 4:
          topBarText = 'Treatment and Management';
          numQuestions = 4;
          break;
        default:
          break;
      }

      setPageSize(numQuestions);

      const response = await fetch(`http://192.168.198.82/demo/qns.php?screen=${screenNumber}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const data = await response.json();
      fetchedQuestions = data.map(question => ({ ...question, screen: screenNumber }));
      setAllQuestions(prevQuestions => [...prevQuestions, ...fetchedQuestions]);
      setScreenData({ topBarText, questions: fetchedQuestions });
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
      [questionId]: { answer, additionalInfo },
    }));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };
  const handleSubmit = async () => {
    // Check if all questions have been answered
    const allQuestionsAnswered = allQuestions.every(question => {
      const answer = answers[question.id]?.answer;
      return answer === 'yes' || answer === 'no';
    });
  
    // If not all questions have been answered, display an alert and return
    if (!allQuestionsAnswered) {
      Alert.alert('Incomplete Questionnaire', 'Please select Yes or No for all questions before submitting.');
      return;
    }
  
    try {
      const response = await fetch('http://192.168.198.82/demo/submit_ans.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientId: patientId,
          answers: Object.values(answers).map(answer => ({
            option: answer.answer,
            inp_data: answer.additionalInfo || '',
          })),
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit answers');
      }
  
      const responseData = await response.json(); // Parse response data
  
      console.log('Response data after submitting answers:', responseData); // Debugging
  
      // Check if responseData contains the patient name
      if (name) {
        navigation.navigate('PatientDashboardScreen', { name: name, patientId: patientId });
      } else {
        Alert.alert('Error', 'Patient name not found in response data');
      }
    } catch (error) {
      console.error('Error submitting answers:', error.message);
      Alert.alert('Error', 'Failed to submit answers. Please try again later.');
    }
  };
  
  

  const visibleQuestions = screenData?.questions || [];

  let questionsToShow;
  switch (currentPage) {
    case 1:
      questionsToShow = visibleQuestions.slice(0, 4);
      break;
    case 2:
      questionsToShow = visibleQuestions.slice(4, 9);
      break;
    case 3:
      questionsToShow = visibleQuestions.slice(9, 13);
      break;
    case 4:
      questionsToShow = visibleQuestions.slice(13, 17);
      break;
    default:
      questionsToShow = [];
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.arrowButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={width * 0.06} color="black" />
        </TouchableOpacity>
        <Text style={styles.topBarText}>{screenData?.topBarText}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {loading ? (
          <ActivityIndicator size="large" color="#2DC2D7" />
        ) : (
          <View style={styles.questionsContainer}>
            {questionsToShow.map((question, index) => (
              <View key={question.id} style={styles.question}>
                <Text style={styles.questionText}>{`${index + 1}. ${question.questions}`}</Text>
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
                    placeholder="Input Text"
                    onChangeText={text => handleAnswer(question.id, 'yes', text)} // Pass additional information
                  />
                )}
              </View>
            ))}
            <View style={styles.buttonContainer}>
              {currentPage > 1 && (
                <TouchableOpacity style={styles.prevButton} onPress={handlePrevPage}>
                  <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>
              )}
              {currentPage < 4 && (
                <TouchableOpacity style={styles.nextButton} onPress={handleNextPage}>
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              )}
              {currentPage === 4 && (
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              )}
            </View>
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.040,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    backgroundColor: '#2DC2D7',
  },
  arrowButton: {
    marginRight: width * 0.06,
    top: width * 0.04,
    left: width * 0.02,
  },
  topBarText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    top: width * 0.035,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
  },
  questionsContainer: {
    marginTop: height * 0.03,
    paddingBottom: height * 0.1,
  },
  question: {
    marginBottom: height * 0.03,
  },
  questionText: {
    fontSize: width * 0.045,
    color: '#333333',
    marginBottom: height * 0.01,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.01,
  },
  optionButton: {
    padding: width * 0.03,
    marginRight: width * 0.02,
    backgroundColor: '#2DC2D7',
    borderRadius: width * 0.015,
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
    borderRadius: width * 0.015,
    padding: width * 0.05,
    marginBottom: height * 0.01,
    alignSelf: 'stretch',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
  },
  prevButton: {
    backgroundColor: '#2DC2D7',
    paddingVertical: height * 0.02,
    width: width * 0.3,
    borderRadius: width * 0.015,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#2DC2D7',
    paddingVertical: height * 0.02,
    width: width * 0.3,
    borderRadius: width * 0.015,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#2DC2D7',
    paddingVertical: height * 0.02,
    width: width * 0.3,
    borderRadius: width * 0.015,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
  },
});

export default MedicalHistoryScreen;
