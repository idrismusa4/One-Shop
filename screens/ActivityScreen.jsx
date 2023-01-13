import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import Item from '../components/Item';
import Modal from "react-native-modal";
import { CircleFade } from 'react-native-animated-spinkit';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import ProductReview from '../components/ProductReview';

function ActivityScreen({ navigation }) {
    const { API_SERVER_URL, themeStyles, user } = useContext(ThemeContext);
    const [showModal, setShowModal] = useState(false);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [currentItem, setCurrentItem] = useState(false);
    const [currentItemReviews, setCurrentItemReviews] = useState([]);
    
    async function handleGetReviews(wishlistItem){
      setCurrentItem(wishlistItem);
      setShowModal(true);
      setReviewsLoading(true);
      
      try{
        const res = await axios.get(`${API_SERVER_URL}/api/review/item?itemId=${wishlistItem._id}`);
        const { itemReviews, itemReviewsCount, success, message } = res.data;
        // return console.log(itemReviews);
        // setItemLoading(false);
        
        if(success) {
          setReviewsLoading(false);
          setCurrentItemReviews(itemReviews);
          // setItemReviewsCount(itemReviewsCount);
          return;
        }
        
        alert(message);
      }catch(error){
          setReviewsLoading(false);
          console.log(error);
        }
        
        
      } 

    useEffect(() => {
      if(user){
        if(user.wishlist.length > 0) setCurrentItem(user.wishlist[0]);
      }
    });
  return (
    <View style={themeStyles.container}>
      <Modal isVisible={showModal}>
        {
          reviewsLoading ? 
          <CircleFade size={50} color='#C0DD4D' style={{ marginLeft: 'auto', marginRight: 'auto' }} />
          :
          <View style={{ height: '80%', width: '100%', backgroundColor: '#ffffff', borderRadius: 20, padding: 20, display: 'flex', alignItems: 'center',  marginLeft: 'auto', marginRight: 'auto' }}>
              <MaterialIcons name="cancel" size={40} color='rgba(0, 0, 0, 0.6)' onPress={ () => { setShowModal(false) } } />
              <ScrollView style={{ width: '100%' }}>
                {
                  currentItemReviews.map((review) => (
                    <ProductReview key={review._id} review={review} />
                  ))
                }
              </ScrollView>
              
          </View>
        }
      </Modal>
      <ScrollView>
        <Text style={themeStyles.title}>Wishlist</Text>
        {
          user &&
          <Fragment>
            {
              user.wishlist.length > 0 ?
              user.wishlist.map((wishlistItem) => (
                <Fragment key={wishlistItem._id}>
                  <Item item={wishlistItem} navigation={navigation} />
                  <Text onPress={ () => { handleGetReviews(wishlistItem) } }  style={{ textAlign: 'right', marginBottom: 10 }}>See Ratings</Text>
                </Fragment>
              ))
              :
              <Text style={{ color: 'gray' }}>No items in your wishlist</Text>
            }
          </Fragment>
        }
      </ScrollView>
          
      
    </View>
    )
  }
            
export default ActivityScreen;
