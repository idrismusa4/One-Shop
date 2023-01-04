import { StyleSheet, Text, View, Image } from 'react-native';
import { ThemeContext, styles } from './context/ThemeContext';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import StackNavigator from './components/StackNavigator';
import BottomTabNavigator from './components/BottomTabNavigator';
import DiscoverScreen from './screens/DiscoverScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [oneshopData, setOneshopData] = useState({});
  const [user, setUser] = useState();
  // const [user, setUser] = useState();
  // const [loading, setLoading] = useState(false);
  function toggleTheme(){
    setCurrentTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light');
  }
  
  // async function saveUser(userData){
  //   await AsyncStorage.setItem('@user', JSON.stringify({...userData}));
  // }
  // async function getUser(){
  //   let user = await AsyncStorage.getItem('@user');
  //   setUser(JSON.parse(user));
  // }
  // getUser();
  // console.log(oneshopData)
  async function clearOneshopData(){
    await AsyncStorage.removeItem('@oneshopData');
  }
  async function updateOneshopData(oneshopData){
    // return console.log(oneshopData)
    await AsyncStorage.setItem('@oneshopData', oneshopData);
    loadOneshopData();
  }
  async function loadOneshopData(){
    let oneshopData = await AsyncStorage.getItem('@oneshopData');
    // setUser(JSON.parse(user));
    if(typeof oneshopData !== 'object') {
      setOneshopData(JSON.parse(oneshopData));
      setUser(JSON.parse(oneshopData).user);
      // console.log(oneshopData);
      return;
    }
    updateOneshopData(JSON.stringify({
      user: {name: 'Harrison'},
      recentSearches: [],
      currentTheme: 'light',
      mode: 'rentee'
    }));
    // oneshopData = await AsyncStorage.getItem('@oneshopData');
    // .then((res) => console.log(res))
    // console.log(typeof oneshopData === 'object');

  }
  useEffect(() => {
    loadOneshopData();
    // clearOneshopData();
    // saveUser({ name: "Harrison" });
    // getUser();
  }, []);
  
  
    return(
      <ThemeContext.Provider value={{ 
        theme: currentTheme, 
        toggleTheme: toggleTheme,
        themeStyles: currentTheme === 'light' ? styles.lightStyles : styles.darkStyles,
        user: user,
        setUser: setUser,
        oneshopData: oneshopData,
        updateOneshopData: updateOneshopData,
        API_SERVER_URL: "http://192.168.43.240:5000"
        // API_SERVER_URL: "http://192.168.82.165:5000"
      }}>
        {/* <NavigationContainer>
          {
            !user ? 
            <StackNavigator /> 
            : 
           <BottomTabNavigator />
          } 
        </NavigationContainer> */}
      {/* <DiscoverScreen /> */}
      <ProfileScreen />
      </ThemeContext.Provider>
    );
}