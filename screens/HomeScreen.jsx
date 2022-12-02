import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function HomeScreen() {
  const { themeStyles, user } = useContext(ThemeContext);
  const categories = ['Appliances', 'Cars', 'Bikes', 'Boats', 'Clothing', 'Homes', 'Gadgets', 'Musical Instruments', 'Sports', 'Friendship'];
  return (
    <View style={themeStyles.container}>
      <ScrollView contentContainerStyle={{ paddingTop: 20 }}>
        <Text style={themeStyles.welcome}>Welcome, {user.name}</Text>

        <ScrollView
          contentContainerStyle={themeStyles.homeCategories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {
            categories.map((category, index) => (
              <Text key={index} style={themeStyles.homeCategory}>{category}</Text>
            ))
          }
        </ScrollView>
      </ScrollView>
    </View>
  )
}

export default HomeScreen;
