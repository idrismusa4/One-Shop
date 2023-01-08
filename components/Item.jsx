import { useContext } from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import CustomRating from './CustomRating';
import axios from 'axios';

function Item({ item, navigation }) {
    const { themeStyles, API_SERVER_URL } = useContext(ThemeContext);
    async function getItem(itemId){
        // return console.log(item)
        const res = await axios.get(`${API_SERVER_URL}/api/item/${itemId}`);

        if(res.data.success) return navigation.navigate('Item', { item: res.data.item[0] });

        alert(res.data.message);
    }

    return (
    <View style={themeStyles.itemOuterContainer}>
        <Pressable style={themeStyles.itemInnerContainer} 
            onPress={ () => { 
                getItem(item._id)
            }}
        >
        <Image source={{ uri: `${API_SERVER_URL}/api/static/images/${item.thumbnail}` }} style={{ height: 80, width: 150, borderRadius: 10 }} alt={item.name} resizeMode="contain" />
        <View style={themeStyles.itemProps}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
            <CustomRating defaultRating={item.rating} />
            <Text>{`$${item.price} / day`}</Text>
            <Text>{`$${item.price*7} / week`}</Text>
        </View>
        </Pressable>
    </View>
    );
}

export default Item;
