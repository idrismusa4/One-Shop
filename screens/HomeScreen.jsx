import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import CarouselComp from '../components/CarouselComp';

function HomeScreen() {
  const { themeStyles, user } = useContext(ThemeContext);
  return (
    <View style={themeStyles.container}>
      <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
        <Text style={themeStyles.welcome}>Welcome, {user.username}</Text>

        <Text style={themeStyles.title}>Top Picks</Text>
        <CarouselComp />
      </ScrollView>
    </View>
  )
}

export default HomeScreen;
