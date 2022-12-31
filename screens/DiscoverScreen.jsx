import React, { useState, useContext, useEffect } from 'react';
import { Text, ScrollView, View, TextInput, Animated, TouchableOpacity, Pressable, Keyboard } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { EvilIcons, MaterialCommunityIcons, MaterialIcons, Entypo, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import categories from '../utils/category.json';
// import rentedItems from '../utils/items.json';
import axios from 'axios';

function DiscoverScreen() {
  const [searchFocused, setSearchFocused] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState([]);
  const { themeStyles, oneshopData, updateOneshopData, API_SERVER_URL } = useContext(ThemeContext);
  const [currentCategoryId, setCurrentCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  function handleSearchSuggestions(searchInput, items){
    // let items = main_array ? main_array : items;
    // return console.log(items.length);
    // console.log(items)
    setSearchInput(searchInput);
    let searchQuery = searchInput.trim();
    
    if(!searchQuery) return setSearchSuggestions([]);
    let splitQuery = searchQuery.split(" ");
    // return console.log(splitQuery);
    
    let newSearchSuggestions = [];
    
    items.forEach((item) => {
      // let currentItem = { name: item.name, description: item.description };
      let currentItem = { name: item.name };
      let itemValues = Object.values(currentItem);
      // return console.log(itemValues)
      let itemQualifies = false;
      let matchRate = 0;

      splitQuery.forEach((query) => {
        if(JSON.stringify(itemValues).toLowerCase().includes(query.toLowerCase())){
          itemQualifies = true;
          matchRate += 1;
        }
      });

      if(itemQualifies){
        let suggestedItem = { ...item, matchRate };
        newSearchSuggestions.push(suggestedItem);
      }

    });
    // console.log(newSearchSuggestions);
    setSearchSuggestions(newSearchSuggestions);
    // setFilteredItems((prevItems) => (
    //   prevItems.filter()
    // ));
  }
  async function filterItems(categoryId) {
    // const all = categories.find((category) => (category.name.toLowerCase() === "all"));
    if(categoryId === ''){
      let res = await axios.get(`${API_SERVER_URL}/api/item/all`);
      let { allItems } = res.data;  
      setItems(allItems);
      handleSearchSuggestions(searchInput, allItems);
      return;
    }
    let res = await axios.get(`${API_SERVER_URL}/api/item/category?categoryId=${categoryId}`)
    const { categoryItems } = res.data;
    // console.log(categoryItems);
    setItems(categoryItems);
    handleSearchSuggestions(searchInput, categoryItems);
    // let filteredItems = searchSuggestions.length === 0 ? items : searchSuggestions;
    // console.log(filteredItems)
    // console.log(typeof categoryId)
    // if (categoryId === "") {
    //   setFilteredItems(filteredItems);
    //   return;
    // }
    // filteredItems = filteredItems.filter((item) => (
    //   item.category_id.includes(categoryId)
    // ))
    // console.log(filteredItems)

    // setFilteredItems(filteredItems);
  }
  async function fetchCategories(){
    try{
      // console.log(API_SERVER_URL);
      const res = await axios.get(`${API_SERVER_URL}/api/category/all`);
      const { categories } = res.data;
      setCategories(categories);
    }catch(error){
      console.log(error);
    }
  }
  async function fetchItems(){
    try{
      let res = await axios.get(`${API_SERVER_URL}/api/item/all`);
      let { allItems } = res.data;  
      setItems(allItems);
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => {

    setLoading(true);
    // setFilteredItems(rentedItems);
    setLoading(false);
    
    fetchCategories();
    fetchItems();

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
    filterItems(currentCategoryId);
    let oneshopData = await AsyncStorage.getItem('@oneshopData');
    oneshopData = JSON.parse(oneshopData);
    let { recentSearches } = oneshopData;

    let searchInputExists = recentSearches.find((search) => search === searchInput);
    if (searchInputExists) {
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
    console.log(searchSuggestions)
  }

  function handleInputBlurred(event) {
    // event.preventDefault = true;
    setSearchFocused(false);
  }

  function handleSubmit(suggestion) {
    
    setSearchInput(suggestion);
    handleSearchSuggestions(suggestion, items);
    updateRecentSearches(suggestion);
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
                placeholder={items.length === 0 ? "" : items[Math.floor(Math.random() * items.length)].name}
                onFocus={handleInputFocused}
                onBlur={handleInputBlurred}
                // onBlur={(e) => { e.preventDefault() }}
                value={searchInput}
                onChangeText={(text) => { handleSearchSuggestions(text, items) }}
                autoFocus={true}
                onSubmitEditing={() => { handleSubmit(searchInput) }}
              />

              {
                searchFocused ?
                  <Entypo name='circle-with-cross' color='black' size={20} onPress={() => { setSearchInput("") }} />
                  :
                  <MaterialCommunityIcons name='microphone' color='black' size={20} onPress={() => { alert("speak now...") }} />
              }

            </View>

            {
              !searchFocused &&
              <TouchableOpacity style={{ width: 35, height: 35, borderRadius: 35, backgroundColor: currentCategoryId ? '#C0DD4D' : '#D9D9D9', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onPress={() => { toggleCategories() }}>
                <MaterialCommunityIcons name='tune-variant' color='white' size={20} />
              </TouchableOpacity>
            }
          </View>

          {searchFocused &&
            <View>
              {
                searchInput.length > 0 ?
                <React.Fragment>
                  {
                    searchSuggestions.length === 0 ?
                    <View style={{ width: '100%', marginTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <MaterialIcons name='search-off' color='black' size={50} />
                      <Text style={{ fontWeight: 'bold', fontSize: 12, marginLeft: 10 }}>no matches available, please consider clearing your filters</Text>
                    </View>
                    :
                    searchSuggestions.map((search, index) => (
                      <View key={index} style={{ height: 30, display: 'flex', flexDirection: 'row', alignItems: 'center', paddingVertical: 2, fontSize: 15, marginBottom: 10 }}>
                        <EvilIcons name='search' color='black' size={20} />
                        <TouchableOpacity style={{ width: '100%' }} onPress={() => { handleSubmit(search.name) }}>
                          <Text style={{ fontSize: 15, marginLeft: 5 }}>{search.name}</Text>
                        </TouchableOpacity>
                        <Feather name='arrow-up-left' color='black' size={20} style={{ marginLeft: 'auto' }} onPress={() => {
                          setSearchInput(search.name)
                        }} />
                      </View>
                    ))
                  }
                </React.Fragment>
                  :
                  <React.Fragment>
                    <Text style={{ ...themeStyles.title, fontSize: 20 }}>
                      {oneshopData.recentSearches.length > 0 ? "Recent searches" : ""}
                    </Text>
                    {
                      oneshopData.recentSearches.map((search, index) => (
                        <View key={index} style={{ height: 30, display: 'flex', flexDirection: 'row', alignItems: 'center', paddingVertical: 2, fontSize: 15, marginBottom: 10 }}>
                          <EvilIcons name='clock' color='black' size={20} />
                          <TouchableOpacity style={{ width: '100%' }} onPress={() => { handleSubmit(search) }}>
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
          <View style={{ backgroundColor: '' }}>


            <Animated.ScrollView
              contentContainerStyle={themeStyles.discoverCategories}
              style={{ height: categoryHeight, backgroundColor: '' }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Text
                style={
                  currentCategoryId === '' ?
                    { ...themeStyles.discoverCategory, backgroundColor: '#C0DD4D' } :
                    themeStyles.discoverCategory
                }
                onPress={() => {
                  setCurrentCategoryId(''), filterItems('')
                }}>
                {"All"}
              </Text>
              {
                categories.map((category) => {
                  return (
                    <Text
                      key={category._id}
                      style={
                        currentCategoryId === category._id ?
                          { ...themeStyles.discoverCategory, backgroundColor: '#C0DD4D' } :
                          themeStyles.discoverCategory
                      }
                      onPress={() => {
                        setCurrentCategoryId(category._id), filterItems(category._id)
                      }}>
                      {category.name}
                    </Text>
                  );
                })
              }
            </Animated.ScrollView>


            <ScrollView>
              {
                searchInput ?
                <React.Fragment>
                  {
                    searchSuggestions.length === 0 ?
                    <View style={{ width: '100%', marginTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <MaterialIcons name='search-off' color='black' size={50} />
                      <Text style={{ fontWeight: 'bold', fontSize: 12, marginLeft: 10 }}>no matches available, please consider clearing your filters</Text>
                    </View>
                    :
                    searchSuggestions.map((item) => (
                      <View key={item._id} style={{ marginBottom: 2 }}>
                        <Text>{item.name}</Text>
                      </View>
                    ))
                  }
                </React.Fragment>
                :
                items.map((item) => (
                  <View key={item._id} style={{ marginBottom: 2 }}>
                    <Text>{item.name}</Text>
                  </View>
                ))
                // :
                // items.map((item) => (
                //   <View key={item._id} style={{ marginBottom: 2 }}>
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
