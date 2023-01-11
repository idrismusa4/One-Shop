import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, Pressable } from 'react-native';
import { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import axios from 'axios';
import { CircleFade } from 'react-native-animated-spinkit';
import Toast from 'react-native-root-toast';

export default function LoginScreen({ navigation }) {
  const { themeStyles, setUser, API_SERVER_URL, oneshopData, updateOneshopData } = useContext(ThemeContext);

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  function updateUserData(value, name){
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
    // console.log(userData);
  }

  async function loginUser(){
    let { username, password } = userData;
    if(!(username && password)) 
      return Toast.show('Fields cannot be empty!', { 
        duration: 5000, 
        backgroundColor: 'red',
      });    
    // let readyUserData = { ...userData };
    // delete readyUserData['reenterPassword'];
    // setUserData(readyUserData);
    
    try{
      // setLoading(true);
      let res = await axios.post(`${API_SERVER_URL}/api/user/login`, userData);
      // return console.log(res.data.user)
      if(res.data.success) {
        // setUser(res.data.user);
        // console.log(typeof oneshopData);
        // return console.log({
        //   ...oneshopData,
        //   user: { ...res.data.user }
        // });
        updateOneshopData({
          ...oneshopData,
          user: { ...res.data.user }
        });
      }

      Toast.show(res.data.message, { 
        duration: 5000,
        backgroundColor: '#ffffff',
        textStyle: {
          color: '#000000'
        }
      });
      setLoading(false);
    }catch(error){
      setLoading(false);
      Toast.show(error.response.data.message, { 
        duration: 5000, 
        backgroundColor: 'red',
      });  
    }
  }
  
  return (
    !loading ?
    <View style={themeStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Image source={require('../assets/logo.png')} style={{ ...themeStyles.logo, width: 150, height: 150 }} alt='logo' />
      <View style={themeStyles.form}>
        <Text style={themeStyles.title}>Sign In</Text>

        <View style={themeStyles.inputContainer}>
          <TextInput style={themeStyles.input}
           type='text'
           value={userData.username}
           placeholder='Username'
            onChangeText={(text) => { updateUserData(text, 'username') }}
            />
        </View>
        
        <View style={themeStyles.inputContainer}>
          <TextInput style={themeStyles.input}
           type='text'
           value={userData.password}
           placeholder='Password'
           onChangeText={(text) => { updateUserData(text, 'password') }}
           secureTextEntry
           />
        </View>
        

        <Pressable 
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#C0DD4D', width: 150, height: 50, paddingLeft: 20, paddingRight: 10, marginTop: 10, marginBottom: 20, marginLeft: 'auto', marginRight: 'auto', borderRadius: 30 }} 
          onPress={() => { loginUser() }}
          >
          <Text style={{ ...themeStyles.regularText, color: 'white'}}>Log In</Text>
        </Pressable>
        
      </View>

      <View style={{ width: '85%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto' }}>
        <View style={{ width: '40%', height: 1.5, backgroundColor: 'black' }} />
        <Text style={{ fontSize: 15 }}>Or</Text>
        <View style={{ width: '40%', height: 1.5, backgroundColor: 'black' }} />
      </View>
      
      <Pressable 
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'black', width: '85%', height: 35, paddingLeft: 20, paddingRight: 20, marginTop: 20, marginLeft: 'auto', marginRight: 'auto', borderRadius: 30 }} 
        onPress={() => { navigation.navigate('Register') }}
        >
        <Image source={require('../assets/apple.png')} style={{ width: 30, height: 30 }} alt='apple-logo' />
        <Text style={{ ...themeStyles.regularText, color: 'white'}}>Sign in with Apple</Text>
      </Pressable>

      <Pressable 
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#4050A6', width: '85%', height: 35, paddingLeft: 20, paddingRight: 20, marginTop: 20, marginLeft: 'auto', marginRight: 'auto', borderRadius: 30 }} 
        onPress={() => { navigation.navigate('Register') }}
        >
        <Image source={require('../assets/google.png')} style={{ width: 30, height: 30 }} alt='apple-logo' />
        <Text style={{ ...themeStyles.regularText, color: 'white'}}>Sign in with Google</Text>
      </Pressable>

      <TouchableOpacity 
        style={{ width: '80%', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 50, display: 'flex', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>
          {"Dont' have an account? "}
          <Text onPress={() => { navigation.navigate('Register') }}> Sign Up</Text>
        </Text>
      </TouchableOpacity>
      
        </ScrollView>
    </View>
    :
    <View style={themeStyles.speechBoxOuter}>
      <CircleFade size={100} color='#C0DD4D' />
    </View>
  );
}

