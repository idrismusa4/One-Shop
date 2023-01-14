import { TouchableOpacity, Dimensions } from 'react-native';
import { ThemeContext, styles } from './context/ThemeContext';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import StackNavigator from './components/StackNavigator';
import BottomTabNavigator from './components/BottomTabNavigator';
import DiscoverScreen from './screens/DiscoverScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Toast from 'react-native-root-toast';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [oneshopData, setOneshopData] = useState({});
  const [user, setUser] = useState({});
  // const [user, setUser] = useState();
  // const [loading, setLoading] = useState(false);
  function toggleTheme(){
    setCurrentTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light');
  }
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  
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
    Toast.show('You have successfully logged out', { 
      duration: 5000,
      backgroundColor: '#ffffff',
      textStyle: {
        color: '#000000'
      }
    });
    loadOneshopData();
  }
  async function updateOneshopData(oneshopData){
    // console.log(JSON.stringify(oneshopData))
    await AsyncStorage.setItem('@oneshopData', JSON.stringify(oneshopData));
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
    // return console.log(JSON.stringify({
    //   user: {},
    //   recentSearches: [],
    //   currentTheme: 'light',
    //   mode: 'rentee'
    // }));
    updateOneshopData({
      user: {},
      recentSearches: [],
      currentTheme: 'light',
      mode: 'rentee'
    });
    // oneshopData = await AsyncStorage.getItem('@oneshopData');
    // .then((res) => console.log(res))
    // console.log(typeof oneshopData === 'object');

  }


  async function updateRecentSearches(item) {
    let { name: searchInput } = item;
    if (searchInput.trim().length === 0) return;
    
    // let oneshopData = await AsyncStorage.getItem('@oneshopData');
    // oneshopData = JSON.parse(oneshopData);
    // return console.log(oneshopData);
    let { recentSearches } = oneshopData;
    
    let searchInputExists = recentSearches.find((search) => search.name === searchInput);
    if (searchInputExists) {
      recentSearches = recentSearches.filter((oldSearch) => oldSearch.name !== searchInput);
    }
    recentSearches.unshift(item);
    // oneshopData = JSON.stringify(oneshopData);
    updateOneshopData({
      ...oneshopData, 
      recentSearches: recentSearches
    });
  }
  
  async function handleDeleteRecentSearch(search) {
    // let oneshopData = await AsyncStorage.getItem('@oneshopData');
    // oneshopData = JSON.parse(oneshopData);
    let { recentSearches } = oneshopData;
    recentSearches = recentSearches.filter((oldSearch) => oldSearch.name !== search);
    // return console.log(recentSearches);
    
    // oneshopData = { ...oneshopData, recentSearches: recentSearches }
    // oneshopData = JSON.stringify(oneshopData);
    // return console.log({ 
    //   ...oneshopData, 
    //   recentSearches: recentSearches 
    // });
    updateOneshopData({ 
      ...oneshopData, 
      recentSearches: recentSearches 
    });
  }



  useEffect(() => {
    loadOneshopData();
    // clearOneshopData();
    // saveUser({ name: "Harrison" });
    // getUser();
    // console.log(process.env.NODE_ENV);
  }, []);
  
  // console.log(user)
    return(
      <ThemeContext.Provider value={{ 
        theme: currentTheme, 
        toggleTheme,
        // themeStyles: currentTheme === 'light' ? styles.lightStyles : styles.darkStyles,
        themeStyles: styles.lightStyles,
        user,
        setUser,
        oneshopData,
        updateOneshopData,
        clearOneshopData,
        updateRecentSearches,
        handleDeleteRecentSearch,
        API_SERVER_URL: "http://192.168.43.240:5000"
        // API_SERVER_URL: "http://10.4.24.176:5000"
      }}>
        
        <NavigationContainer>
          {
            Object.keys(user).length === 0 ? 
            <StackNavigator /> 
            : 
           <BottomTabNavigator />
          } 
        </NavigationContainer>
        
      {/* <DiscoverScreen /> */}
      {/* <ProfileScreen /> */}
      {/* <RegisterScreen /> */}
      {/* <LoginScreen /> */}
      {/* <HomeScreen /> */}
      </ThemeContext.Provider>
    );
}