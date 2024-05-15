import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const DoctorDetailsScreen = ({ route, navigation }) => {
  const { doctorId, imageUri } = route.params;
  const [doctorDetails, setDoctorDetails] = useState(null);

  useEffect(() => {
    fetchDoctorDetails();
  }, [doctorId]);

  const fetchDoctorDetails = async () => {
    try {
      const response = await fetch(`http://192.168.198.82/demo/doctorsprofilescrren.php?doctorId=${doctorId}`);
      const data = await response.json();
      setDoctorDetails(data);
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    }
  };

  if (!doctorDetails) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleEdit = () => {
    navigation.navigate('editdoctorScreen', { doctorId, imageUri });
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={Dimensions.get('window').width * 0.05} color="#4A3C3C" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.topBarText}>Doctor Details</Text>
      </View>

      {/* Panel */}
      <View style={[styles.panel, { width: Dimensions.get('window').width * 0.9 }]}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <View style={styles.textBox}>
          <Text style={styles.label}>Doctor ID:</Text>
          <Text style={styles.value}>{doctorId}</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{doctorDetails.name}</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.value}>{doctorDetails.phoneno || 'N/A'}</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{doctorDetails.gender}</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.value}>{doctorDetails.age}</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.label}>Experience:</Text>
          <Text style={styles.value}>{doctorDetails.experience}</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.label}>Specialization:</Text>
          <Text style={styles.value}>{doctorDetails.specialization}</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.label}>Password:</Text>
          <Text style={styles.value}>{doctorDetails.password}</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.label}>Confirm Password:</Text>
          <Text style={styles.value}>{doctorDetails.confirmpassword}</Text>
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
    paddingVertical: Dimensions.get('window').width * 0.09,
  },
  backIcon: {
    right: Dimensions.get('window').width * -0.04,
    top: Dimensions.get('window').height * 0.01,

  },
  topBarText: {
    right: Dimensions.get('window').width * -0.08,
    top: Dimensions.get('window').height * 0.01,
    fontSize: Dimensions.get('window').width * 0.05,
    fontWeight: 'bold',
  },
  panel: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.16,
    left: Dimensions.get('window').width * 0.05,
    height: Dimensions.get('window').height * 0.822,
    right: Dimensions.get('window').width * 0.05,
    padding: Dimensions.get('window').width * 0.05,
    borderRadius: Dimensions.get('window').width * 0.066,
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
    width: Dimensions.get('window').width * 0.45,
    height: Dimensions.get('window').width * 0.45,
    left: Dimensions.get('window').width * 0.18,
    marginBottom: Dimensions.get('window').height * 0.01,
    borderRadius: Dimensions.get('window').width * 0.3,
    borderWidth: Dimensions.get('window').width * 0.01,
    borderColor: '#2DC2D7',
  },
  textBox: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: Dimensions.get('window').width * 0.01,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: Dimensions.get('window').width * 0.016,
    padding: Dimensions.get('window').width * 0.025
  },
  label: {
    flex: 1,
    fontSize: Dimensions.get('window').width * 0.04,
    fontWeight: 'bold',
    marginRight: Dimensions.get('window').width * 0.015,
    color: '#000',
  },
  value: {
    flex: 2,
    fontSize: Dimensions.get('window').width * 0.04,
    color: '#000',
  },
  editButton: {
    backgroundColor: '#2DC2D7',
    paddingVertical: Dimensions.get('window').width * 0.04,
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.12,
    left: Dimensions.get('window').width * 0.25,
    top: Dimensions.get('window').width * 0.04,
    borderRadius: Dimensions.get('window').width * 0.05,
  },
  editButtonText: {
    color: '#fff',
    top: Dimensions.get('window').width * -0.01,
    left: Dimensions.get('window').width * 0.11,
    fontSize: Dimensions.get('window').height * 0.02,
    fontWeight: 'bold',
  },
});

export default DoctorDetailsScreen;
