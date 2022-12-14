import { StyleSheet, Text, View, Image } from 'react-native';
import { ThemeContext, styles } from './context/ThemeContext';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import StackNavigator from './components/StackNavigator';
import BottomTabNavigator from './components/BottomTabNavigator';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [user, setUser] = useState({ name: "Harrison" });
  // const [user, setUser] = useState();
  // const [loading, setLoading] = useState(false);
  function toggleTheme(){
    setCurrentTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light');
  }
  async function saveUser(userData){
    await AsyncStorage.setItem('@user', JSON.stringify({...userData}));
  }
  async function getUser(){
    let user = await AsyncStorage.getItem('@user');
    setUser(JSON.parse(user));
  }
  // getUser();
  useEffect(() => {
    // saveUser({ name: "Harrison" });
    // getUser();
  }, []);
  
  
    return(
      <ThemeContext.Provider value={{ 
        theme: currentTheme, 
        toggleTheme: toggleTheme,
        themeStyles: currentTheme === 'light' ? styles.lightStyles : styles.darkStyles,
        user: user,
        setUser: setUser
      }}>
        <NavigationContainer>
          {
            !user ? <StackNavigator /> : <BottomTabNavigator />
          }
        </NavigationContainer>
      </ThemeContext.Provider>
    );
}