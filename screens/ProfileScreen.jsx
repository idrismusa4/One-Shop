import React from 'react';
import { Text, ScrollView, Pressable } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';


function ProfileScreen({ navigation }) {
    const { themeStyles, user } = useContext(ThemeContext);
  return (
    <ScrollView contentContainerStyle={themeStyles.container}>
      <Pressable onPress={() => { navigation.navigate('Discover') }}>
        <Text style={themeStyles.title}>Profile</Text>
      </Pressable>
    </ScrollView>
  )
}

export default ProfileScreen;
