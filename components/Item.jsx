import { useContext } from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import CustomRating from './CustomRating';
import axios from 'axios';


function Item({ item, navigation }) {
    const { themeStyles, API_SERVER_URL, updateRecentSearches } = useContext(ThemeContext);
    

    return (
    <View style={themeStyles.itemOuterContainer}>
        <Pressable style={themeStyles.itemInnerContainer} 
            onPress={ () => { 
                updateRecentSearches(item);
                navigation.navigate('Item', { itemId: item._id });
            }}
        >
        <Image source={{ uri: `${API_SERVER_URL}/api/static/images/${item.thumbnails[0]}` }} style={{ height: 80, width: 150, borderRadius: 10 }} alt={item.name} resizeMode="contain" />
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
