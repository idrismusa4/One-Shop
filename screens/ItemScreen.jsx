import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

function ItemScreen({ route }) {
    const { itemId } = route.params;
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={height / 3}
                autoPlay={true}
                data={[...new Array(6).keys()]}
                scrollAnimationDuration={1000}
                pagingEnabled={true}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center', 
                            backgroundColor: 'red'
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {`${index} ${itemId}`}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}

export default ItemScreen;