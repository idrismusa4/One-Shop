import { useState, useContext, useEffect, Fragment } from 'react';
import { Text, ScrollView, View, TextInput, Animated, TouchableOpacity, Keyboard, Pressable } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { EvilIcons, MaterialCommunityIcons, MaterialIcons, Entypo, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Grid, Bounce } from 'react-native-animated-spinkit';
import Item from '../components/Item';
import Voice from '@react-native-voice/voice';

function DiscoverScreen({ navigation }) {
  const [searchFocused, setSearchFocused] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState([]);
  const { themeStyles, oneshopData, updateOneshopData, API_SERVER_URL, updateRecentSearches, handleDeleteRecentSearch } = useContext(ThemeContext);
  const [currentCategoryId, setCurrentCategoryId] = useState('all');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const categoryHeight = new Animated.Value(50);
  const [speechStarted, setSpeechStarted] = useState(false);
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  // console.log(oneshopData)

  
  let limit = 15;

  useEffect(() => {
    fetchCategories();
    fetchItems();

    Voice.onSpeechResults = speechResults;
    Voice.onSpeechError = speechError;
    Voice.onSpeechEnd = speechEnd;
    Voice.onSpeechPartialResults = speechPartial;

    return function() {
      Voice.destroy()
      .then( Voice.removeAllListeners() )
    }

  }, []);
  function speechPartial(result){
    setPartialResults(result.value[0]);
  }
  function speechError (error) {
    console.log(error);
  }

  function speechResults(result) {
    setResults(result.value);
    setSearchInput(result.value[0]);
    filterItems('all', result.value[0]);
  }

  function speechEnd() {
    setSpeechStarted(false);
  }

  async function speechToTextStarted() {
    try{
      await Voice.start('en-US');
      setSpeechStarted(true);
      setResults([]);
      setPartialResults('');
    }catch(error){
      if(error.code === "7") setPartialResults("Nothing recorded");
    }
    
  }
  async function speechToTextCancelled() {
    try{
      await Voice.stop();
      setSpeechStarted(false);
    }catch(error){
      if(error.code === "7") setPartialResults("Nothing recorded");
    }
  }
  
  function toggleCategories() {
    Animated.timing(categoryHeight, {
      toValue: categoryHeight._value === 0 ? 50 : 0,
      duration: 500,
      useNativeDriver: false
    }).start();
  }
  
  async function handleSearchSuggestions(searchInput){
    setSearchInput(searchInput);
    let searchQuery = searchInput.trim();
    let res = await axios.get(`${API_SERVER_URL}/api/item/all?limit=${limit}&search=${searchQuery}&categoryId=all`);
    let { allItems } = res.data;

    setItems(allItems);
  }

  async function filterItems(categoryId, query) {
    let searchQuery = query || searchInput;
    // return console.log(searchQuery)
    setLoading(true);
    let res = await axios.get(`${API_SERVER_URL}/api/item/all?limit=${limit}&search=${searchQuery}&categoryId=${categoryId}`);
    let { allItems } = res.data;  
    setItems(allItems);
    setLoading(false);
  }
  
  async function fetchCategories(){
    try{
      const res = await axios.get(`${API_SERVER_URL}/api/category/all`);
      const { categories } = res.data;
      setCategories(categories);
    }catch(error){
      console.log(error);
    }
  }
  
  async function fetchItems(){
    setLoading(true);
    try{
      let res = await axios.get(`${API_SERVER_URL}/api/item/all?limit=${limit}&categoryId=${currentCategoryId}`);
      let { allItems } = res.data;  
      setItems(allItems);
    }catch(error){
      console.log(error);
    }
    setLoading(false);
  }
  // console.log(oneshopData);
  
  
  function handleInputFocused() {
    if(currentCategoryId !== 'all') setCurrentCategoryId('all');
    setSearchFocused(true);
  }
  
  function handleInputBlurred() {
    setSearchFocused(false);
    filterItems('all', searchInput);
  }
  
  function handleSubmit(suggestion) {
    // return console.log(suggestion)
    setSearchInput(suggestion.name);
    handleSearchSuggestions(suggestion.name);
    updateRecentSearches(suggestion);
    filterItems('all', suggestion.name);
    Keyboard.dismiss();
  }

  function handleClearInput(){
    setSearchInput('');
    // filterItems('', 'all');
  }
  
  // return(<Text>{console.log(theme)}</Text>)
  return (
    <Fragment>
      
      { speechStarted ?
      <View style={themeStyles.speechBoxOuter}>
        <View style={themeStyles.speechBoxInner}>
          <Text>Listening...</Text>
          <Bounce size={100} color='blue' />
          <Text>{partialResults}</Text>
          <Text onPress={ speechToTextCancelled }>cancel</Text>
        </View>
      </View>
      :
      
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
                value={searchInput}
                onChangeText={(text) => { handleSearchSuggestions(text) }}
                autoFocus={true}
                onSubmitEditing={() => { handleSubmit(searchInput) }}
              />

              {
                (searchInput && searchFocused) ?
                <Entypo name='circle-with-cross' color='black' size={20} onPress={() => { handleClearInput() }} />
                :
                <MaterialCommunityIcons name='microphone' color='black' size={20} onPress={ speechToTextStarted } />
              }

            </View>

            {
              !searchFocused &&
              <TouchableOpacity style={{ width: 35, height: 35, borderRadius: 35, backgroundColor: currentCategoryId !== 'all' ? '#C0DD4D' : '#D9D9D9', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onPress={() => { toggleCategories() }}>
                <MaterialCommunityIcons name='tune-variant' color='white' size={20} />
              </TouchableOpacity>
            }
          </View>

          {searchFocused &&
            <View>
              {
                searchInput.length > 0 ?
                <Fragment>
                  {
                    items.length === 0 ?
                    <View style={{ width: '100%', marginTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <MaterialIcons name='search-off' color='black' size={50} />
                      <Text style={{ fontWeight: 'bold', fontSize: 12, marginLeft: 10 }}>{`No items match your search`}</Text>
                    </View>
                    :
                    items.map((search, index) => (
                      <View key={index} style={{ height: 30, display: 'flex', flexDirection: 'row', alignItems: 'center', paddingVertical: 2, fontSize: 15, marginBottom: 10 }}>
                        <EvilIcons name='search' color='black' size={20} />
                        <TouchableOpacity style={{ width: '100%' }} onPress={() => { handleSubmit(search) }}>
                          <Text style={{ fontSize: 15, marginLeft: 5 }}>{search.name}</Text>
                        </TouchableOpacity>
                        <Feather name='arrow-up-left' color='black' size={20} style={{ marginLeft: 'auto' }} onPress={() => {
                          setSearchInput(search.name)
                        }} />
                      </View>
                    ))
                  }
                </Fragment>
                  :
                  <Fragment>
                    {
                      oneshopData.recentSearches &&
                      <Fragment>
                    <Text style={{ ...themeStyles.title, fontSize: 20 }}>
                      {oneshopData.recentSearches.length > 0 && "Recent searches"}
                    </Text>
                    {
                      oneshopData.recentSearches.map((search, index) => (
                        <View key={index} style={{ height: 30, display: 'flex', flexDirection: 'row', alignItems: 'center', paddingVertical: 2, fontSize: 15, marginBottom: 10 }}>
                          <EvilIcons name='clock' color='black' size={20} />
                          <TouchableOpacity style={{ width: '100%' }} onPress={() => { handleSubmit(search) }}>
                            <Text style={{ fontSize: 15, marginLeft: 5 }}>{search.name}</Text>
                          </TouchableOpacity>
                          <Entypo name='cross' color='black' size={20} style={{ marginLeft: 'auto' }} onPress={() => {
                            handleDeleteRecentSearch(search.name)
                          }} />
                        </View>
                      ))
                    }
              
                      </Fragment>
                    }
                  </Fragment>
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
                  currentCategoryId === 'all' ?
                    { ...themeStyles.discoverCategory, borderWidth: 2, borderColor: "rgba(0, 0, 255, 0.2)" } :
                    themeStyles.discoverCategory
                }
                onPress={() => {
                  setCurrentCategoryId('all'), filterItems('all')
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
                          { ...themeStyles.discoverCategory, borderWidth: 2, borderColor: "rgba(0, 0, 255, 0.2)" } :
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

              {
                loading ? 
                <View style={{backgroundColor: 'transparent', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Grid size={50} color='#C0DD4D' />
                </View>
                :
                <ScrollView>
                  
                  <Fragment>
                    {
                      items.length === 0 ?
                      <View style={{ width: '100%', marginTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {
                          searchInput.trim() ? 
                          <Fragment>
                            <MaterialIcons name='search-off' color='black' size={50} />
                            <Text style={{ fontWeight: 'bold', fontSize: 12, marginLeft: 10 }}>{`"${searchInput.trim()}" was not found in this category. Please consider clearing your filters.`}</Text>
                          </Fragment>
                          :
                          <Text>This category is empty!</Text>
                        }
                      </View>
                      :
                      <View style={{ marginBottom: 60 }}>
                        { items.map((item) => (
                          <Item key={item._id} item={item} navigation={navigation} />
                        )) }
                        <Text onPress={()=>{ limit += 10, filterItems(currentCategoryId) }}>More</Text>
                      </View>
                    }
                </Fragment>
              {/* } */}
              </ScrollView>
            }
          </View>
        }
      </ScrollView>
        </View>}
      </Fragment>
  )
}


export default DiscoverScreen;
