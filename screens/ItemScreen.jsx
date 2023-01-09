import { Fragment, useContext, useEffect, useState } from 'react';
import { Dimensions, Image, Text, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ThemeContext } from '../context/ThemeContext';
import axios from 'axios';
import { CircleFade } from 'react-native-animated-spinkit';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import CustomRating from '../components/CustomRating';

function ItemScreen({ route, navigation }) {
    const { itemId } = route.params;
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(false);


    const { API_SERVER_URL, themeStyles } = useContext(ThemeContext);
    async function getItem(){
        setLoading(true);
        try{
            const res = await axios.get(`${API_SERVER_URL}/api/item/${itemId}`);
            const { item, success, message } = res.data;
            // console.log(item);
            setLoading(false);
            if(success) return setItem(item);
            
            alert(message);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        getItem();
    }, [itemId]);

    return (
        !loading ? 
        <ScrollView style={{ flex: 1 }}>
            <TouchableOpacity style={{ height: 30, width: 30, backgroundColor: '#000000', borderRadius: 100, marginTop: StatusBar.currentHeight, marginLeft: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: 2 }}>
                <MaterialIcons name="keyboard-backspace" size={25} color="#ffffff" onPress={ () => { navigation.goBack() } } />
            </TouchableOpacity>
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
                        alt='image not found'
                        />  
                    </Fragment>
                )}
            />
            <View style={{ padding: 20 }}>
                <Text style={themeStyles.title}>{item.name}</Text>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', width: '100%', height: 40, backgroundColor: ''  }}>
                    <CustomRating defaultRating={item.rating} />
                    <AntDesign name='heart' size={30} color='red' />
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
                        <Text style={{ fontWeight: 'bold', width: '40%' }}>Name</Text>
                        <Text style={{width: "50%" }}>Nicolas Addams</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 40, borderTopWidth: 1, borderTopColor: '#000000' }}>
                        <Text style={{ fontWeight: 'bold', width: '40%' }}>Payment</Text>
                        <Text style={{width: "50%" }}>MasterCard</Text>
                    </View>

                </View>
            </View>
        </ScrollView>
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