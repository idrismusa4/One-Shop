import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Pressable, Animated, Dimensions } from 'react-native';
import { useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';


export default function WelcomeScreen({ navigation }) {
  const { themeStyles } = useContext(ThemeContext);
  const windowHeight = Dimensions.get('window').height;
  const marginTop = new Animated.Value((windowHeight / 2) - 250);
  const opacity = new Animated.Value(0);
  function fadeMessage() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false
    }).start();
  }

  useEffect(() => {
    Animated.timing(marginTop, {
      toValue: 20,
      duration: 1000,
      useNativeDriver: false
    }).start();

    setTimeout(() => {
      fadeMessage();
    }, 1000);
  }, []);

  return (
    <ScrollView contentContainerStyle={themeStyles.container}>
      <View style={{ width: '100%', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', paddingTop: 50 }}>
        <Animated.Image source={require('../assets/logo.png')} style={{ ...themeStyles.logo, marginTop: marginTop }} alt='logo' />
        <Animated.Text style={{ ...themeStyles.title, opacity: opacity }}>Welcome to OneShop</Animated.Text>
        <Animated.Text style={{ ...themeStyles.regularText, marginTop: 5, opacity: opacity }}>Your No. 1 One-Stop Rental</Animated.Text>

        <Pressable style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#C0DD4D', height: 50, paddingLeft: 20, paddingRight: 20, marginTop: 'auto', marginBottom: 20, borderRadius: 30 }}
          onPress={() => { navigation.replace('Register') }}
        >
          <Text style={{ ...themeStyles.regularText, color: 'white' }}>Get Started</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

