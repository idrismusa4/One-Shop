import React, { Fragment, useContext } from 'react';
import { Image, Dimensions } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import Carousel from 'react-native-snap-carousel';
// import { ViewPropTypes } from 'deprecated-react-native-prop-types';


const CarouselSlider = ({ item }) => {
    const { API_SERVER_URL } = useContext(ThemeContext);
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    return (
        <Carousel
            loop={true}
            data={item.thumbnails}
            renderItem={({ item: image }) => (
                <Fragment>
                    <Image 
                    source={{ uri: `${API_SERVER_URL}/api/static/images/${image}` }}
                    style={{
                        width: width,
                        height: height / 2.5
                    }}
                    resizeMode='cover'
                    alt='missing image'
                    />  
                </Fragment>
            )}
        />
    );
};

export default CarouselSlider;
