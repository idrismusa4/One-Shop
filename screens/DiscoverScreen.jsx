import React, { useState, useContext, useEffect } from 'react';
import { Text, ScrollView, View, TextInput, Animated, TouchableOpacity, Pressable, Keyboard } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { EvilIcons, MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import categories from '../utils/category.json';
import rentedItems from '../utils/items.json';

function DiscoverScreen() {
  const [searchFocused, setSearchFocused] = useState(true);
  const [searchInput, setSearchInput] = useState(true);
  const { themeStyles, oneshopData, updateOneshopData } = useContext(ThemeContext);
  // const categories = ['Appliances', 'Cars', 'Bikes', 'Boats', 'Clothing', 'Homes', 'Gadgets', 'Musical Instruments', 'Sports', 'Friendship'];
  const [currentCategoryId, setCurrentCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  // function handleSearch(){
    
  // }
  function filterItems(categoryId){
    let filteredItems = items;
    if (categoryId === "") {
      setFilteredItems(filteredItems);
      return;
    }
    filteredItems = items.filter((item) => (
      item.category_id === categoryId
    ));
    setFilteredItems(filteredItems);
  }
  useEffect(() => {
    setLoading(true);
    setItems(rentedItems);
    setLoading(false);
  }, []);
  

  const categoryHeight = new Animated.Value(50);
  function toggleCategories() {
    Animated.timing(categoryHeight, {
      toValue: categoryHeight._value === 0 ? 50 : 0,
      duration: 500,
      useNativeDriver: false
    }).start();
  }

  async function updateRecentSearches(searchInput) {
    if (searchInput.trim().length === 0) return;

    let oneshopData = await AsyncStorage.getItem('@oneshopData');
    oneshopData = JSON.parse(oneshopData);
    let { recentSearches } = oneshopData;

    let searchInputExists = recentSearches.find((search) => search === searchInput);
    if(searchInputExists) {
      recentSearches = recentSearches.filter((oldSearch) => oldSearch !== searchInput);
    }
    recentSearches.unshift(searchInput);
    oneshopData = {
      ...oneshopData, recentSearches: recentSearches
    }
    oneshopData = JSON.stringify(oneshopData);
    updateOneshopData(oneshopData);
  }
  async function handleDeleteRecentSearch(search) {
    // return console.log([1, 2, 3, 4, 5].remove(4));
    let oneshopData = await AsyncStorage.getItem('@oneshopData');
    oneshopData = JSON.parse(oneshopData);
    let { recentSearches } = oneshopData;
    recentSearches = recentSearches.filter((oldSearch) => oldSearch !== search);
    // return console.log(recentSearches);
    oneshopData = { ...oneshopData, recentSearches: recentSearches }
    oneshopData = JSON.stringify(oneshopData);
    updateOneshopData(oneshopData);
  }

  function handleInputFocused(event) {
    setSearchFocused(true);
  }

  function handleInputBlurred(event) {
    // event.preventDefault = true;
    setSearchFocused(false);
  }

  function handleSuggestionClicked(suggestion) {
    setSearchInput(suggestion);
    Keyboard.dismiss();
  }

  return (
    <View style={themeStyles.container}>
      <ScrollView contentContainerStyle={{ flex: 1 }}
        keyboardDismissMode="on-drag" keyboardShouldPersistTaps="always">
        {/* <Text style={themeStyles.title}>Discover</Text> */}
        <View style={{ width: '100%', height: 1000, backgroundColor: 'transparent', flex: 1, position: 'absolute' }}>
          <View style={{ width: '100%', height: 35, backgroundColor: 'transparent', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

            {
              searchFocused &&
              <MaterialIcons name='arrow-back' color='black' size={30} onPress={() => { Keyboard.dismiss() }} />
            }

            <View style={{ width: '87%', height: '100%', backgroundColor: '#D9D9D9', borderRadius: 35, paddingHorizontal: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <EvilIcons name='search' color='black' size={20} />

              <TextInput
                style={{ width: '80%', height: '100%' }}
                placeholder='Tesla'
                onFocus={handleInputFocused}
                onBlur={handleInputBlurred}
                // onBlur={(e) => { e.preventDefault() }}
                value={searchInput}
                onChangeText={(text) => { setSearchInput(text) }}
                autoFocus={true}
                onSubmitEditing={() => { updateRecentSearches(searchInput) }}
              />

              {
                searchFocused ?
                  <Entypo name='circle-with-cross' color='black' size={20} onPress={() => { setSearchInput("") }} />
                  :
                  <MaterialCommunityIcons name='microphone' color='black' size={20} />
              }

            </View>

            {
              !searchFocused &&
              <TouchableOpacity style={{ width: 35, height: 35, borderRadius: 35, backgroundColor: searchFocused ? 'transparent' : '#C0DD4D', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onPress={() => { toggleCategories() }}>
                <MaterialCommunityIcons name='tune-variant' color='white' size={20} />
              </TouchableOpacity>
            }
          </View>

          {searchFocused &&
            <View>
              {
                searchInput.length > 0 ?
                  <Text>{`${searchInput} \n`.repeat(300)}</Text>
                  :
                  <React.Fragment>
                    <Text style={{ ...themeStyles.title, fontSize: 20 }}>
                      {oneshopData.recentSearches.length > 0 ? "Recent searches" : ""}
                    </Text>
                    {
                      oneshopData.recentSearches.map((search, index) => (
                        <View key={index} style={{ height: 30, display: 'flex', flexDirection: 'row', alignItems: 'center', paddingVertical: 2, fontSize: 15, marginBottom: 10 }}>
                          <EvilIcons name='clock' color='black' size={20} />
                          <TouchableOpacity style={{ width: '100%' }} onPress={() => { handleSuggestionClicked(search) }}>
                            <Text style={{ fontSize: 15, marginLeft: 5 }}>{search}</Text>
                          </TouchableOpacity>
                          <Entypo name='cross' color='black' size={20} style={{ marginLeft: 'auto' }} onPress={() => {
                            handleDeleteRecentSearch(search)
                          }} />
                        </View>
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
              style={{ height: categoryHeight, backgroundColor: 'yellow' }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {
                categories.map((category) => {
                  return (
                    <Text key={category._id} style={currentCategoryId === category._id ? { ...themeStyles.discoverCategory, backgroundColor: 'black' } : themeStyles.discoverCategory} onPress={() => { setCurrentCategoryId(category._id), filterItems(category._id) }}>{category.name}</Text>
                  );
                })
              }
            </Animated.ScrollView>
            <ScrollView contentContainerStyle={{
              backgroundColor: 'blue'
            }}>
              <Text>g</Text>
              {
                // filteredItems.length > 0 ?
                // filteredItems.map((item) => (
                //   <Text key={item._id}>{item.name}</Text>
                // ))
                // :
                // items.map((item) => (
                //   <View key={item._id} style={{ backgroundColor: 'red', marginBottom: 2 }}>
                //     <Text>{item.name}</Text>
                //   </View>
                // ))
              }
            </ScrollView>
          </View>
        }
      </ScrollView>
    </View>
  )
}


export default DiscoverScreen;
