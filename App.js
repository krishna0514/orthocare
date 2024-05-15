import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import LoginOptionsScreen from './LoginOptionsScreen';
import PatientScreen from './PatientScreen';
import AdminLoginScreen from './AdminLoginScreen';
import AdminDashboardScreen from './AdminDashboardScreen';
import ViewDoctorScreen from './ViewDoctorScreen';
import ViewPatientScreen from './ViewPatientScreen';
import AddDoctorScreen from './AddDoctorScreen';
import SetPasswordScreen from './SetPasswordScreen';
import patientsetpassword from './patientsetpassword';
import DoctorScreen from './DoctorScreen';
import SignupScreen from './SignupScreen';
import DoctorDashboardScreen from './DoctorDashboardScreen';
import PatientDashboardScreen from './PatientDashboardScreen';
import AddPatientScreen from './AddPatientScreen';
import AddPatientScreen1 from './AddPatientScreen1';
import PatientDetailsScreen from './PatientDetailsScreen';
import Questionnaires from './Questionnaires';
import AddVideoScreen from './AddVideoScreen'; 
import ListOfAppointmentsScreen from './ListOfAppointmentsScreen';
import ProfileScreen from './ProfileScreen';
import DoctorNotificationScreen from './DoctorNotificationScreen'; 
import DailyActivityScreen from './DailyActivityScreen';
import DailyProgressScreen from './DailyProgressScreen';
import QuestionnairesScreen from './QuestionnairesScreen';
import PatientAppointmentScreen from './PatientAppointmentScreen';
import PatientListOfAppointmentsScreen from './PatientListOfAppointmentsScreen';
import ViewVideosScreen from './ViewVideosScreen';
import PatientProfileScreen from './PatientProfileScreen';
import PatientNotificationScreen from './PatientNotificationScreen';
import MedicalHistoryScreen from './MedicalHistoryScreen';
import doctor1Screen from './doctor1Screen';
import  editdoctorScreen from './editdoctorScreen';
import EditPatientScreen1 from './EditPatientScreen1';
import EditPatientScreen from './EditPatientScreen'; 
import  editdoctorScreen1 from './editdoctorScreen1';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginOptions"
          component={LoginOptionsScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="SetPasswordScreen"
          component={SetPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="patientsetpassword"
          component={patientsetpassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PatientScreen"
          component={PatientScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Questionnaires"
          component={Questionnaires}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="AdminLoginScreen"
          component={AdminLoginScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="AdminDashboardScreen"
          component={AdminDashboardScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="ViewDoctorScreen"
          component={ViewDoctorScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="ViewPatientScreen"
          component={ViewPatientScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="AddDoctorScreen"
          component={AddDoctorScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DoctorScreen"
          component={DoctorScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DoctorDashboardScreen"
          component={DoctorDashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PatientDashboardScreen"
          component={PatientDashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddPatientScreen"
          component={AddPatientScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="AddPatientScreen1"
          component={AddPatientScreen1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PatientDetailsScreen"
          component={PatientDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddVideoScreen"
          component={AddVideoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListOfAppointmentsScreen"
          component={ListOfAppointmentsScreen}
          options={{ headerShown: false }}
        />
        {/* Add ProfileScreen and DoctorNotificationScreen */}
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DoctorNotificationScreen"
          component={DoctorNotificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DailyActivityScreen"
          component={DailyActivityScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewVideosScreen"
          component={ViewVideosScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="DailyProgressScreen"
          component={DailyProgressScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="QuestionnairesScreen"
          component={QuestionnairesScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="PatientListOfAppointmentsScreen"
          component={PatientListOfAppointmentsScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="PatientAppointmentScreen"
          component={PatientAppointmentScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="PatientProfileScreen"
          component={PatientProfileScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="PatientNotificationScreen"
          component={PatientNotificationScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
  name="MedicalHistoryScreen"
  component={MedicalHistoryScreen}
  options={{ headerShown: false }}
/>

        <Stack.Screen
          name="doctor1Screen"
          component={doctor1Screen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="editdoctorScreen"
          component={editdoctorScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="editdoctorScreen1"
          component={editdoctorScreen1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditPatientScreen1"
          component={EditPatientScreen1}
          options={{ headerShown: false }}
        />
     <Stack.Screen 
     name="EditPatientScreen"
      component={EditPatientScreen}
      options={{ headerShown: false }}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
