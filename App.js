import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext, styles } from './context/ThemeContext';
import LoginScreen from './screens/LoginScreen';
import { useState } from 'react';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState('light');
  function toggleTheme(){
    setCurrentTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light');
  }
  return (
    <ThemeContext.Provider value={{ 
      theme: currentTheme, 
      toggleTheme: toggleTheme,
      themeStyles: currentTheme === 'light' ? styles.lightStyles : styles.darkStyles
      }}>
      <LoginScreen />
    </ThemeContext.Provider>
  );
}