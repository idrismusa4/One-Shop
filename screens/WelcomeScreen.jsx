import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Pressable } from 'react-native';
import { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';


export default function WelcomeScreen({ navigation }) {
  const { theme, toggleTheme, themeStyles } = useContext(ThemeContext);

  return (
    <ScrollView contentContainerStyle={themeStyles.container}>
        <View style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent', paddingTop: 50 }}>
            <Image source={require('../assets/logo.png')} style={themeStyles.logo} alt='logo' />
                <Text style={themeStyles.title}>Welcome to OneShop</Text>
                <Text style={{ ...themeStyles.regularText, marginTop: 5 }}>Your No. 1 One-Stop Rental</Text>

                <Pressable style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#C0DD4D', height: 50, paddingLeft: 20, paddingRight: 20, marginTop: 'auto', marginBottom: 20, borderRadius: 30 }} 
                onPress={() => { navigation.replace('Register') }}
                >
                    <Text style={{ ...themeStyles.regularText, color: 'white'}}>Get Started</Text>
                </Pressable>
        </View>
    </ScrollView>
  );
}

