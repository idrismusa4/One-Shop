import React from 'react';
import { Text, ScrollView, View, TextInput } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';

function DiscoverScreen() {
    const { themeStyles, user } = useContext(ThemeContext);
    const categories = ['Appliances', 'Cars', 'Bikes', 'Boats', 'Clothing', 'Homes', 'Gadgets', 'Musical Instruments', 'Sports', 'Friendship'];
  return (
    <ScrollView contentContainerStyle={themeStyles.container}>
        <Text style={themeStyles.title}>Discover</Text>
        <View style={{ width: '100%', height: 35, backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

        <View style={{ width: '87%', height: '100%', backgroundColor: 'grey', borderRadius: 35, paddingHorizontal: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <EvilIcons name='search' color='black' size={20} />

          <TextInput
            style={{ width: '80%', height: '100%' }}
            placeholder='Tesla'
          />

          <MaterialCommunityIcons name='microphone' color='blue' size={20} />

        </View>

          <Text style={{ width: 35, height: 35, borderRadius: 35, backgroundColor: '#C0DD4D' }}></Text>
        </View>
        <ScrollView
          contentContainerStyle={themeStyles.discoverCategories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {
            categories.map((category, index) => (
              <Text key={index} style={themeStyles.discoverCategory}>{category}</Text>
            ))
          }
        </ScrollView>

        <View>
          <Text>Categories</Text>
        </View>
        
        <View>
          <Text>Searching...</Text>
        </View>
    </ScrollView>
  )
}

export default DiscoverScreen;
