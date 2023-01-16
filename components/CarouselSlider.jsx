import React, { Fragment, useContext } from "react";
import { Image, Dimensions, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";
import Swiper from "react-native-swiper";

const CarouselSlider = ({ item }) => {
  const { API_SERVER_URL } = useContext(ThemeContext);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  // console.log(item);

  return (
    <Swiper
      loop={true}
      autoplay={true}
      showsPagination={true}
      style={{ height: height / 2.5 }}
      dot={
        <View
          style={{
            backgroundColor: "rgba(255,255,255,.3)",
            width: 13,
            height: 13,
            borderRadius: 7,
            marginLeft: 7,
            marginRight: 7,
          }}
        />
      }
      activeDot={
        <View
          style={{
            backgroundColor: "#fff",
            width: 13,
            height: 13,
            borderRadius: 7,
            marginLeft: 7,
            marginRight: 7,
          }}
        />
      }
    >
      {Object.keys(item).length > 0 &&
        item.thumbnails.map((image, index) => (
          <Image
            key={index}
            source={{ uri: `${API_SERVER_URL}/api/static/images/${image}` }}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="cover"
            alt="missing image"
          />
        ))}
    </Swiper>
  );
};

export default CarouselSlider;
