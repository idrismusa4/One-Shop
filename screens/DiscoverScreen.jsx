import React, { useState, useContext } from 'react';
import { Text, ScrollView, View, TextInput, Animated, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function DiscoverScreen() {
    const [searchFocused, setSearchFocused] = useState(true);
    const [searchInput, setSearchInput] = useState(true);
    const { themeStyles, oneshopData, updateOneshopData } = useContext(ThemeContext);
    const categories = ['Appliances', 'Cars', 'Bikes', 'Boats', 'Clothing', 'Homes', 'Gadgets', 'Musical Instruments', 'Sports', 'Friendship'];

    const categoryMarginTop = new Animated.Value(40);
    function toggleCategories(){
      getRecentSearches()
      Animated.timing(categoryMarginTop, {
        toValue: categoryMarginTop._value === 40 ? 100 : 40,
        duration: 400,
        useNativeDriver: false
      }).start();
    }

    async function updateRecentSearches(searchInput){
      let oneshopData = await AsyncStorage.getItem('@oneshopData');
      oneshopData = JSON.parse(oneshopData);
      oneshopData = { ...oneshopData, recentSearches: [
        ...oneshopData.recentSearches,
        searchInput
      ] }
      oneshopData = JSON.stringify(oneshopData);
      // return console.log(oneshopData)
      updateOneshopData(oneshopData);
      // console.log(recentSearches)
      // console.log(typeof recentSearches)
    }

  return (
    <View style={themeStyles.container}>
    <ScrollView contentContainerStyle={{ flex: 1 }}>
        {/* <Text style={themeStyles.title}>Discover</Text> */}
        <View style={{ width: '100%', height: 100, backgroundColor: 'transparent', flex: 1, position: 'absolute' }}>
          <View style={{ width: '100%', height: 35, backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

          <View style={{ width: '87%', height: '100%', backgroundColor: '#D9D9D9', borderRadius: 35, paddingHorizontal: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <EvilIcons name='search' color='black' size={20} />

            <TextInput
              style={{ width: '80%', height: '100%' }}
              placeholder='Tesla'
              onFocus={() => { setSearchFocused(true) }}
              onBlur={() => { setSearchFocused(false) }}
              value={searchInput}
              onChangeText={ (text) => { setSearchInput(text) } }
              autoFocus={true}
              onSubmitEditing={ () => { updateRecentSearches(searchInput) } }
              />

            <MaterialCommunityIcons name='microphone' color='black' size={20} />

          </View>

            <TouchableOpacity style={{ width: 35, height: 35, borderRadius: 35, backgroundColor: '#C0DD4D', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onPress={ () => { toggleCategories() } }>
              <MaterialCommunityIcons name='tune-variant' color='white' size={20} />
            </TouchableOpacity>
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
        </View>
            <Animated.View style={{ marginTop: categoryMarginTop }}></Animated.View>
        {
          searchFocused ? 
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
              {
                searchInput.length > 0 ?
                <Text>{`${searchInput} \n`.repeat(300)}</Text>
                :
                <React.Fragment>
                  <Text style={themeStyles.title}>
                    { oneshopData.recentSearches.length > 0 ? "Recent searches" : "" }
                  </Text>
                {
                  oneshopData.recentSearches.map((search, index) => (
                    <Text key={index}>{search}</Text>
                  ))
                }
                </React.Fragment>
              }
            </ScrollView>
            :
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
              <Text>{'Categories\n'.repeat(300)}</Text>
            </ScrollView>
        }
    </ScrollView>
    </View>
  )
}


export default DiscoverScreen;
