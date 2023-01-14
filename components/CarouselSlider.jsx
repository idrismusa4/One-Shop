import React, { Fragment, useContext } from 'react';
import { Image, Dimensions } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import Swiper from 'react-native-swiper';

const CarouselSlider = ({ item }) => {
    const { API_SERVER_URL } = useContext(ThemeContext);
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    // console.log(item);

    return (
        <Swiper
            loop={true}
            autoplay={true}
            showsPagination={false}
            style={{height: height / 2.5}}
        >
            { Object.keys(item).length > 0 && item.thumbnails.map((image, index) => (
                <Fragment key={index}>
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
            ))}
        </Swiper>
    );
};

export default CarouselSlider;
