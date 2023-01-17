import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import CarouselComp from '../components/CarouselComp';
import { items } from '../utils/home_data';
import Item from '../components/Item';
import axios from 'axios';

function HomeScreen({ navigation }) {
  const { themeStyles, user, oneshopData, API_SERVER_URL } = useContext(ThemeContext);
  // console.log(oneshopData)
  const [suggestions, setSuggestions] = useState([]);
  const [flashSales, setFlashSales] = useState([]);
  const [focusedItem, setFocusedItem] = useState({});
  async function fetchItems(){
    try{
      let res = await axios.get(`${API_SERVER_URL}/api/item/all?limit=${3}`);
      // console.log(res.data);
      let { allItems } = res.data;  
      setFlashSales(allItems);
    }catch(error){
      console.log(error);
    }
  }
  async function fetchSuggestions(){
    
    try{
      if(!(oneshopData.recentSearches)) return;
      if(!(oneshopData.recentSearches.length > 0)) return;
      setFocusedItem(oneshopData.recentSearches[0]);

      const { category_id } = oneshopData.recentSearches[0];
      let res = await axios.get(`${API_SERVER_URL}/api/item/all?limit=${5}&categoryId=${category_id}`);
      // console.log(res.data);
      let { allItems } = res.data;  
      setSuggestions(allItems);
    }catch(error){
      console.log(error);
    }
  }


  useEffect(() => {
    fetchItems();
    fetchSuggestions();
  }, []);
  return (
    <ScrollView style={themeStyles.container}>
        <Text style={themeStyles.welcome}>Welcome, {user.username}</Text>

        <Text style={{ fontSize: 20, marginTop: 20 }}>Top Picks</Text>
        <CarouselComp data={items} navigation={navigation} />

        {
          suggestions.length > 0 &&
          <Fragment>
            <Text style={{ fontSize: 20, marginTop: 20 }}>Because you viewed {focusedItem.name}</Text>
            {
              suggestions.map((item, index) => (
                <Item item={item} navigation={navigation} />
              ))
            }
          </Fragment>
        }

        <View style={{ marginBottom: 60 }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 8, elevation: 10, marginVertical: 20, paddingHorizontal: 5, backgroundColor: 'red' }}>
            <Text style={{ fontSize: 20, color: '#ffffff', paddingHorizontal: 20, }}>Flash Sales 
            </Text>
            <Text style={{ color: '#ffffff' }}>
              -30%
            </Text>
          </View>
          {
            flashSales.map((item, index) => (
              <Item key={index} item={item} navigation={navigation} />
            ))
          }
        </View>
    </ScrollView>
  )
}

export default HomeScreen;
