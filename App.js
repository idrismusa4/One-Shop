import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { ThemeContext, styles } from "./context/ThemeContext";
import { NavigationContainer } from "@react-navigation/native";
// import StackNavigator from "./components/StackNavigator";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabNavigator from "./components/BottomTabNavigator";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const currentTheme = 'light'
  return (
    <SafeAreaProvider>
    <ThemeContext.Provider
      value={{
        theme: 'currentTheme',
        // toggleTheme,
        themeStyles: currentTheme === 'light' ? styles.lightStyles : styles.darkStyles,
        // themeStyles: styles.lightStyles,
        user:{username: "mk"},
        // setUser,
        // oneshopData,
        // updateOneshopData,
        // clearOneshopData,
        // updateRecentSearches,
        // handleDeleteRecentSearch,
        API_SERVER_URL: "http://192.168.43.240:5000",
        // API_SERVER_URL: "http://10.4.24.176:5000"
        // API_SERVER_URL: "https://oneshop-backend.up.railway.app"
      }}
      >
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
      {/* <HomeScreen /> */}
    </ThemeContext.Provider>
      </SafeAreaProvider>
  );
}

