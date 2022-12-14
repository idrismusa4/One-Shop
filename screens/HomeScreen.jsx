import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function HomeScreen() {
  const { themeStyles, user } = useContext(ThemeContext);
  return (
    <View style={themeStyles.container}>
      <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
        <Text style={themeStyles.welcome}>Welcome, {user.name}</Text>

        
      </ScrollView>
    </View>
  )
}

export default HomeScreen;
