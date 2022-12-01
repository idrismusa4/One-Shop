import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext, styles } from './context/ThemeContext';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  function toggleTheme(){
    setCurrentTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light');
  }
  async function saveUser(userData){
    await AsyncStorage.setItem('@user', JSON.stringify({...userData}));
  }
  async function getUser(){
    let user = await AsyncStorage.getItem('@user');
    setUser(JSON.parse(user));
    // console.log(JSON.parse(user));
  }
  getUser();
  useEffect(() => {
    // saveUser({ name: "Harrison" });
    // getUser();
  }, []);
  
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  
  if(!user){
    return(
      <ThemeContext.Provider value={{ 
        theme: currentTheme, 
        toggleTheme: toggleTheme,
        themeStyles: currentTheme === 'light' ? styles.lightStyles : styles.darkStyles
      }}>
        <NavigationContainer>
          <Stack.Navigator 
          initialRouteName='Welcome'
            screenOptions={{
              // headerShown: false
            }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ 
      theme: currentTheme, 
      toggleTheme: toggleTheme,
      themeStyles: currentTheme === 'light' ? styles.lightStyles : styles.darkStyles,
      user: user
    }}>
      <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'black',
          headerShown: false,
          tabBarLabelStyle: {
            display: 'none'
          },
        })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}