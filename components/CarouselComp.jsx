import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-anchor-carousel";

function CarouselComp() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { width: windowWidth } = Dimensions.get("window");

  const data = [
    { label: "Item 1" },
    { label: "Item 2" },
    { label: "Item 3" },
    { label: "Item 4" },
    { label: "Item 5" },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ backgroundColor: "#ddd", padding: 30, height: "100%", borderRadius: 20 }}>
        <Text>{item.label}</Text>
      </View>
    );
  };

  return (
    <View>
      {/* <Carousel
        data={data}
        renderItem={renderItem}
        onSnapToItem={index => setActiveIndex(index)}
      /> */}
      <Carousel
        style={styles.carousel}
        //  ref={c => {
        //   this.numberCarousel = c;
        //  }}
        data={data}
        renderItem={renderItem}
        itemWidth={windowWidth * 0.7}
        separatorWidth={10}
        containerWidth={windowWidth}
        initialIndex={Math.round(data.length/2) - 1}
        inActiveOpacity={0.3}
      />
      {/* <Pagination
          activeDotIndex={activeIndex}
          dotsLength={data.length}
          containerStyle={{ paddingVertical: 8 }}
          dotColor="#fff"
          dotStyle={{ width: 10, height: 10, borderRadius: 5 }}
          inactiveDotColor="#000"
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={null}
          tappableDots={false}
        /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  carousel: {
    flexGrow: 0,
    height: 250,
  }, 
});

export default CarouselComp;
