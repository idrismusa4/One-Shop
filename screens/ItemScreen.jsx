import { Fragment, useContext, useEffect, useState } from 'react';
import { Dimensions, Image, Text, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ThemeContext } from '../context/ThemeContext';
import axios from 'axios';
import { CircleFade } from 'react-native-animated-spinkit';
import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons';
import CustomRating from '../components/CustomRating';
import Item from '../components/Item';
import ProductReview from '../components/ProductReview';
import AddReview from '../components/AddReview';
import Modal from "react-native-modal";

function ItemScreen({ route, navigation }) {
    const { itemId } = route.params;
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const [item, setItem] = useState({});
    const [owner, setOwner] = useState({});
    const [itemLoading, setItemLoading] = useState(false);
    const [reviewLoading, setReviewLoading] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [itemReviewsCount, setItemReviewsCount] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [showRentSuccess, setShowRentSuccess] = useState(false);
    const [wishlistUpdating, setWishlistUpdating] = useState(false);
    
    const limit = 5;
    const { API_SERVER_URL, themeStyles, oneshopData, user, updateOneshopData } = useContext(ThemeContext);
    async function getRelatedProducts(category_id){
        try{
            const res = await axios.get(`${API_SERVER_URL}/api/item/all?limit=${limit}&categoryId=${category_id}`);
            const { allItems, success } = res.data;
            // console.log(item);
            
            if(success) return setRelatedProducts(allItems.filter((item) => item._id !== itemId));
            
            alert(message);
        }catch(error){
            console.log(error);
        }
    }
    async function getItem(){
        setItemLoading(true);
        try{
            const res = await axios.get(`${API_SERVER_URL}/api/item/${itemId}`);
            const { item, success, message, owner: itemOwner } = res.data;
            // console.log(itemOwner);
            setItemLoading(false);
            getRelatedProducts(item.category_id);
            if(success) {
                setItem(item);
                setOwner(itemOwner);
                return;
            }
            
            alert(message);
        }catch(error){
            if(error.response.data.statusCode === 404){
                alert('Item not found');
                navigation.navigate("Discover");
            }
            
            console.log(error);
        }
    }
    async function getReviews(){
        // setItemLoading(true);
        try{
            const res = await axios.get(`${API_SERVER_URL}/api/review/item?itemId=${itemId}&limit=${3}`);
            const { itemReviews, itemReviewsCount, success, message } = res.data;
            // return console.log(itemReviews);
            // setItemLoading(false);
            
            if(success) {
                setReviews(itemReviews);
                setItemReviewsCount(itemReviewsCount);
                return;
            }
            
            alert(message);
        }catch(error){
            console.log(error);
        }
    }
    async function handleSubmitReview(review, rating){
        if(!review) return alert('Fields cannot be empty');
        setReviewLoading(true);
        try{
            let body = {
                rating,
                text: review,
                sender_id: user._id,
                sender_name: user.username,
                item_id: itemId
            };
            // return console.log(body);
            const res = await axios.post(`${API_SERVER_URL}/api/review/new`, body);
            const { updatedItem, success, message } = res.data;
            // return console.log(itemReviews);
            setReviewLoading(false);
            
            if(success) {
                getReviews();
                // console.log(updatedItem)
                setItem(updatedItem);
                return 
            }
            
            alert(message);
        }catch(error){
            console.log(error);
        }
    }
    async function handleUpdateWishlist(item){
        setWishlistUpdating(true);
        try{
            let body = {
                user_id: user._id,
                item
            };
            // return console.log(body);
            const res = await axios.post(`${API_SERVER_URL}/api/user/update/wishlist`, body);
            const { updatedUser: { wishlist }, success, message } = res.data;
            // return console.log(wishlist);
            if(success) {
                updateOneshopData({
                    ...oneshopData,
                    user: {
                        ...oneshopData.user,
                        wishlist
                    }
                });
                // alert(message);
                setWishlistUpdating(false);
            }
            
            
            
        }catch(error){
            setWishlistUpdating(false);
            console.log(error);
        }
    }
    useEffect(() => {
        getItem();
        getReviews();
    }, [itemId]);

    return (
        !itemLoading ? 
        <Fragment>

        <TouchableOpacity style={{ height: 30, width: 30, backgroundColor: '#000000', borderRadius: 100, marginTop: StatusBar.currentHeight, marginLeft: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: 2 }}>
            <MaterialIcons name="keyboard-backspace" size={25} color="#ffffff" onPress={ () => { navigation.goBack() } } />
        </TouchableOpacity>

        <ScrollView style={{ flex: 1 }}>
            <Modal isVisible={showRentSuccess}>
                <View style={{ height: '80%', width: '90%', backgroundColor: '#ffffff', borderRadius: 20, paddingTop: 50, paddingBottom: 150, display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginLeft: 'auto', marginRight: 'auto' }}>
                    <AntDesign name='checkcircleo' size={100} color='#C0DD4D' />

                    <Text style={{ fontSize: 20 }}>Item rented successfully</Text>
                    
                    <TouchableOpacity style={{ borderRadius: 20, borderColor: '#C0DD4D', borderWidth: 1, elevation: 5, backgroundColor: '#ffffff', height: 30, width: '70%' }} onPress={ () => { setShowRentSuccess(false); navigation.navigate('Discover'); } }>
                        <Text style={{ fontSize: 15, textAlign: 'center', textAlignVertical: 'center' }}>Keep Browsing</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ borderRadius: 20, borderColor: '#C0DD4D', borderWidth: 1, elevation: 5, backgroundColor: '#ffffff', height: 30, width: '70%' }} onPress={ () => { setShowRentSuccess(false); navigation.navigate('Home'); } }>
                        <Text style={{ fontSize: 15, textAlign: 'center', textAlignVertical: 'center' }}>Go Back Home</Text>
                    </TouchableOpacity>
                    
                </View>
            </Modal>

            <Carousel
                loop
                width={width}
                height={height / 2.5}
                autoPlay={true}
                data={item.thumbnails}
                scrollAnimationDuration={1000}
                pagingEnabled={true}
                renderItem={({ item: image }) => (
                    <Fragment>
                        <Image 
                        source={{ uri: `${API_SERVER_URL}/api/static/images/${image}` }}
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                        resizeMode='cover'
                        alt='missing image'
                        />  
                    </Fragment>
                )}
                />
            <View style={{ padding: 20 }}>
                <Text style={themeStyles.title}>{item.name}</Text>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', width: '100%', height: 40, backgroundColor: ''  }}>
                    <CustomRating defaultRating={item.rating} />
                    <Text style={{ fontSize: 10 }}>({itemReviewsCount} ratings)</Text>
                    <Entypo name='share' size={20} color='#dbd40b' style={{ marginLeft: 'auto', marginRight: 15 }} />
                    {
                        !wishlistUpdating ? 
                        <TouchableOpacity onPress={ () => { handleUpdateWishlist(item) } }>
                            {
                                user.wishlist.find((wishlistItem) => ( wishlistItem._id === item._id )) ? 
                                <AntDesign name='heart' size={20} color='#dbd40b' />
                                :
                                <AntDesign name='hearto' size={20} color='#dbd40b' />
                            }
                        </TouchableOpacity>
                        :
                        <CircleFade size={20} color='#C0DD4D' />
                    }
                </View>

                <Text>{item.description}</Text>

                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', width: '100%', height: 60, marginTop: 10 }}>

                    <View style={{ display: 'flex', justifyContent:'space-between', width: '45%', height: '100%', }}>
                        <Text style={{ fontWeight: 'bold' }}>Check-in</Text>
                        <Text style={{ borderRadius: 100, paddingVertical: 5, paddingHorizontal: 20, borderWidth: 1, borderColor: '#000000' }}>February 22, 2022</Text>
                    </View>

                    <View style={{ display: 'flex', justifyContent:'space-between', width: '45%', height: '100%' }}>
                        <Text style={{ fontWeight: 'bold' }}>Check-out</Text>
                        <Text style={{ borderRadius: 100, paddingVertical: 5, paddingHorizontal: 20, borderWidth: 1, borderColor: '#000000' }}>February 28, 2022</Text>
                    </View>

                </View>

                <View style={{ marginTop: 20, borderBottomWidth: 1, borderBottomColor: '#000000' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 40, borderTopWidth: 1, borderTopColor: '#000000' }}>
                        <Text style={{ fontWeight: 'bold', width: '40%' }}>Category</Text>
                        <Text style={{width: "50%" }}>{item.category_name}</Text>
                    </View>
                    
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 40, borderTopWidth: 1, borderTopColor: '#000000' }}>
                        <Text style={{ fontWeight: 'bold', width: '40%' }}>Price</Text>
                        <Text style={{width: "50%" }}>${item.price}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 40, borderTopWidth: 1, borderTopColor: '#000000' }}>
                        <Text style={{ fontWeight: 'bold', width: '40%' }}>Owner Name</Text>
                        <Text style={{width: "50%" }}>{owner && owner.username}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 40, borderTopWidth: 1, borderTopColor: '#000000' }}>
                        <Text style={{ fontWeight: 'bold', width: '40%' }}>Payment</Text>
                        <Text style={{width: "50%" }}>MasterCard</Text>
                    </View>

                </View>

                <Text style={{ fontSize: 15, marginVertical: 20}}>VERIFIED CUSTOMER FEEDBACK</Text>
                {
                    reviews.length > 0 ?
                    reviews.map((review) => (
                        <ProductReview key={review._id} review={review} />
                        ))
                        :
                        <Text style={{ color: 'gray' }}>No reviews yet</Text>
                    }
                <AddReview handleSubmitReview={handleSubmitReview} reviewLoading={reviewLoading} />

                <Text style={{ fontSize: 15, marginVertical: 20}}>RELATED PRODUCTS</Text>
                {
                    relatedProducts.length > 0 ?
                    relatedProducts.map((item) => (
                        <Item key={item._id} item={item} navigation={navigation} />
                        ))
                        :
                        <Text  style={{ color: 'gray' }}>No related products</Text>
                    }
                {
                    oneshopData.recentSearches.length > 0 && 
                    <Fragment>
                        <Text style={{ fontSize: 15, marginVertical: 20}}>RECENTLY VIEWED PRODUCTS</Text>
                        {
                            oneshopData.recentSearches.slice(0, 3).map((item) => (
                                <Item key={item._id} item={item} navigation={navigation} />
                                ))
                            }
                    </Fragment>
                }
            </View>
        </ScrollView>
        </Fragment>
        :
        <View style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
        }}>
            <CircleFade size={50} color='#C0DD4D' />
        </View>
    );
}

export default ItemScreen;