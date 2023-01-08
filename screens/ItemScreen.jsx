import { useContext } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { ThemeContext } from '../context/ThemeContext';
function ItemScreen({ route }) {
    const { item } = route.params;
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const { API_SERVER_URL } = useContext(ThemeContext);

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={height / 2.5}
                autoPlay={true}
                data={item.thumbnails}
                scrollAnimationDuration={1000}
                pagingEnabled={true}
                renderItem={({ item: image }) => (
                    <Image source={{ uri: `${API_SERVER_URL}/api/static/images/${image}` }}
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'red'
                    }}
                    />
                )}
            />
        </View>
    );
}

export default ItemScreen;