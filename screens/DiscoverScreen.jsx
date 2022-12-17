import React, { useState, useContext } from 'react';
import { Text, ScrollView, View, TextInput, Animated, TouchableOpacity, Pressable, Keyboard } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { EvilIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function DiscoverScreen() {
    const [searchFocused, setSearchFocused] = useState(true);
    const [searchInput, setSearchInput] = useState(true);
    const { themeStyles, oneshopData, updateOneshopData } = useContext(ThemeContext);
    const categories = ['Appliances', 'Cars', 'Bikes', 'Boats', 'Clothing', 'Homes', 'Gadgets', 'Musical Instruments', 'Sports', 'Friendship'];

    const categoryHeight = new Animated.Value(50);
    function toggleCategories(){
      Animated.timing(categoryHeight, {
        toValue: categoryHeight._value === 0 ? 50 : 0,
        duration: 500,
        useNativeDriver: false
      }).start();
    }

    async function updateRecentSearches(searchInput){
      if(searchInput.trim().length === 0) return;

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

    function handleInputFocused(event){
      setSearchFocused(true);
    }

    function handleInputBlurred(event){
      // event.preventDefault = true;
      setSearchFocused(false);
    }

    function handleSuggestionClicked(suggestion){
      Keyboard.dismiss();
      console.log(suggestion)
    }
  return (
    <View style={themeStyles.container}>
    <ScrollView contentContainerStyle={{ flex: 1 }} 
    keyboardDismissMode="on-drag" keyboardShouldPersistTaps="always">
        {/* <Text style={themeStyles.title}>Discover</Text> */}
        <View style={{ width: '100%', height: 100, backgroundColor: 'transparent', flex: 1, position: 'absolute' }}>
          <View style={{ width: '100%', height: 35, backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

          <View style={{ width: '87%', height: '100%', backgroundColor: '#D9D9D9', borderRadius: 35, paddingHorizontal: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <EvilIcons name='search' color='black' size={20} />

            <TextInput
              style={{ width: '80%', height: '100%' }}
              placeholder='Tesla'
              onFocus={handleInputFocused}
              onBlur={handleInputBlurred}
              // onBlur={(e) => { e.preventDefault() }}
              value={searchInput}
              onChangeText={ (text) => { setSearchInput(text) } }
              autoFocus={true}
              onSubmitEditing={ () => { updateRecentSearches(searchInput) } }
            />

            <MaterialCommunityIcons name='microphone' color='black' size={20} />

          </View>

            <TouchableOpacity style={{ width: 35, height: 35, borderRadius: 35, backgroundColor: searchFocused ? 'transparent' : '#C0DD4D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {
                searchFocused ? 
                <Entypo name='circle-with-cross' color='black' size={20} onPress={()=>{ Keyboard.dismiss() }} />
                :
                <MaterialCommunityIcons name='tune-variant' color='white' size={20} onPress={() => { toggleCategories() }} />
              }
            </TouchableOpacity>
          </View>

          {searchFocused && 
          <View>
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
                    <TouchableOpacity key={index} onPress={ () => { handleSuggestionClicked(search) } }>
                      <Text>{search}</Text>
                    </TouchableOpacity>
                  ))
                }
                </React.Fragment>
              }
                </View>
}

          
        </View>
            <View style={{ marginTop: 40 }}></View>
        {
          !searchFocused && 
            <View style={{ flex: 1, backgroundColor: 'white' }}>
              <Animated.ScrollView
                contentContainerStyle={themeStyles.discoverCategories}
                style={{height: categoryHeight, }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                >
                {
                  categories.map((category, index) => (
                    <Text key={index} style={themeStyles.discoverCategory}>{category}</Text>
                  ))
                }
              </Animated.ScrollView>
              <ScrollView>
              <Text>{'Categories\n'.repeat(300)}</Text>
              </ScrollView>
            </View>
        }
    </ScrollView>
    </View>
  )
}


export default DiscoverScreen;
