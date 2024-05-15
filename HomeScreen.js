import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useFonts, Manjari_400Regular } from '@expo-google-fonts/manjari';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Manjari: Manjari_400Regular,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('LoginOptions'); // Replace 'Login' with the name of your login screen
    }, 2000); // 3 seconds

    return () => clearTimeout(timeout);
  }, [navigation]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeIn" style={[styles.ellipse, styles.ellipse1]} />
      <Animatable.View animation="fadeIn" style={[styles.ellipse, styles.ellipse2]} />
      <Animatable.View animation="fadeInDown" style={styles.context}>
        <Text style={styles.contextText}>Hello,</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInDown" style={styles.context2}>
        <Text style={styles.contextText2}>Ortho Care</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" style={styles.context3}>
        <Text style={styles.contextText3}>We care for</Text>
        <Text style={styles.contextText3}>you</Text>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2DC2D7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ellipse: {
    position: 'absolute',
    borderRadius: Math.min(width, height) * 0.5,
  },
  ellipse1: {
    width: width * 0.9,
    height: width * 0.9,
    backgroundColor: '#BFD8E6',
    top: -height * 0.1,
    left: -width * 0.15,
  },
  ellipse2: {
    width: width * 0.9,
    height: width * 0.9,
    backgroundColor: '#BFD8E6',
    bottom: -height * 0.2,
    right: -width * 0.15,
  },
 
  context: {
    position: 'absolute',
    top: height * 0.15,
    left: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contextText: {
    fontFamily: 'Manjari',
    fontSize: Math.min(width, height) * 0.098,
    fontWeight: '600',
    lineHeight: Math.min(width, height) * 0.098,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#000000',
  },
  context2: {
    position: 'absolute',
    top: height * 0.2,
    left: width * 0.09,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contextText2: {
    fontFamily: 'Manjari',
    fontSize: Math.min(width, height) * 0.098,
    fontWeight: '700',
    lineHeight: Math.min(width, height) * 0.1,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#000000',
  },
  context3: {
    position: 'absolute',
    top: height * 0.50,
    left: width * 0.4,
    justifyContent: 'center',
  },

  contextText3: {
    fontFamily: 'Manjari',
    fontSize: Math.min(width, height) * 0.10,
    fontWeight: '700',
    lineHeight: Math.min(width, height) * 0.15,
    letterSpacing: 0,
    color: '#000000',
  },
  context4: {
    position: 'absolute',
    top: height * 0.50,
    left: width * 0.55,
    alignItems: 'center',
  },

  contextText4: {
    fontFamily: 'Manjari',
    fontSize: Math.min(width, height) * 0.09,
    fontWeight: '700',
    lineHeight: Math.min(width, height) * 0.10,
    letterSpacing: 0,
    color: '#000000',
  },

});
