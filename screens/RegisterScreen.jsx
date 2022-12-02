import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, Pressable } from 'react-native';
import { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';


export default function RegisterScreen({ navigation }) {
  const { themeStyles } = useContext(ThemeContext);
  const [userData, setUserData] = useState({});
  function updateUserData(value, name){
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
    // console.log(userData);
  }

  function registerUser(){
    console.log(userData);
  }

  return (
    <View style={themeStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Image source={require('../assets/logo.png')} style={{ ...themeStyles.logo, width: 150, height: 150 }} alt='logo' />
      <View style={themeStyles.form}>
        <Text style={themeStyles.title}>Sign Up</Text>

        <View style={themeStyles.inputContainer}>
          <Text style={themeStyles.inputLabel}>Name</Text>
          <TextInput style={themeStyles.input}
           type='text'
           value={userData.fullname}
           onChangeText={(text) => { updateUserData(text, 'fullname') }}
           />
        </View>
        
        <View style={themeStyles.inputContainer}>
          <Text style={themeStyles.inputLabel}>Email</Text>
          <TextInput style={themeStyles.input}
           type='text'
           value={userData.email}
            onChangeText={(text) => { updateUserData(text, 'email') }}
            />
        </View>
        
        <View style={themeStyles.inputContainer}>
          <Text style={themeStyles.inputLabel}>Password</Text>
          <TextInput style={themeStyles.input}
           type='text'
           value={userData.password}
           onChangeText={(text) => { updateUserData(text, 'password') }}
           secureTextEntry
           />
        </View>
        
        <View style={themeStyles.inputContainer}>
          <Text style={themeStyles.inputLabel}>RE-Enter Password</Text>
          <TextInput style={themeStyles.input}
           type='text'
           value={userData.reenterPassword}
           onChangeText={(text) => { updateUserData(text, 'reenterPassword') }}
           secureTextEntry
           />
        </View>

        <Pressable 
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#C0DD4D', width: 150, height: 50, paddingLeft: 20, paddingRight: 10, marginTop: 10, marginBottom: 20, marginLeft: 'auto', marginRight: 'auto', borderRadius: 30 }} 
          onPress={() => { registerUser() }}
          >
          <Text style={{ ...themeStyles.regularText, color: 'white'}}>Submit</Text>
        </Pressable>
        
      </View>

      <View style={{ width: '85%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto' }}>
        <View style={{ width: '40%', height: 1.5, backgroundColor: 'black' }} />
        <Text style={{ fontSize: 15 }}>Or</Text>
        <View style={{ width: '40%', height: 1.5, backgroundColor: 'black' }} />
      </View>
      
      <Pressable 
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'black', width: '85%', height: 50, paddingLeft: 20, paddingRight: 20, marginTop: 10, marginLeft: 'auto', marginRight: 'auto', borderRadius: 30 }} 
        onPress={() => { navigation.navigate('Register') }}
        >
        <Image source={require('../assets/apple.png')} style={{ width: 30, height: 30 }} alt='apple-logo' />
        <Text style={{ ...themeStyles.regularText, color: 'white'}}>Sign up with Apple</Text>
      </Pressable>

      <Pressable 
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#4050A6', width: '85%', height: 50, paddingLeft: 20, paddingRight: 20, marginTop: 10, marginLeft: 'auto', marginRight: 'auto', borderRadius: 30 }} 
        onPress={() => { navigation.navigate('Register') }}
        >
        <Image source={require('../assets/google.png')} style={{ width: 30, height: 30 }} alt='apple-logo' />
        <Text style={{ ...themeStyles.regularText, color: 'white'}}>Sign up with Google</Text>
      </Pressable>

      <TouchableOpacity style={{ width: '80%', fontSize: 15, textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 10, display: 'flex', alignItems: 'center' }}>
        <Text>
          Already have an account? 
          <Text onPress={() => { navigation.navigate('Login') }}> Sign In</Text>
        </Text>
      </TouchableOpacity>
      
        </ScrollView>
    </View>
  );
}

