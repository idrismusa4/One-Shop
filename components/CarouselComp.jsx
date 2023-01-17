import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import Carousel, { Pagination } from "react-native-anchor-carousel";

function CarouselComp({ data, navigation }) {
  // const [activeIndex, setActiveIndex] = useState(0);
  const { width: windowWidth } = Dimensions.get("window");

  // const data = [
  //   { label: "Item 1" },
  //   { label: "Item 2" },
  //   { label: "Item 3" },
  //   { label: "Item 4" },
  //   { label: "Item 5" },
  // ];

  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        style={{
          padding: 30,
          height: "100%",
          borderRadius: 20,
          display: "flex",
          backgroundColor: "#4A657E",
          borderRadius: 20,
        }}
        onPress={() => {
          navigation.navigate("Discover");
        }}
      >
        <Image
          source={item.image_url}
          style={{ height: "50%", width: "50%" }}
        />
        <Text style={{ fontSize: 15, color: "#ffffff" }}>
          {item.category_name}
        </Text>
        <Text style={{ fontSize: 15, color: "#ffffff" }}>
          {item.description}
        </Text>
      </Pressable>
    );
  };

  return (
    <View>
      <Carousel
        style={styles.carousel}
        data={data}
        renderItem={renderItem}
        itemWidth={windowWidth * 0.7}
        separatorWidth={10}
        containerWidth={windowWidth}
        initialIndex={Math.round((data.length - 1) / 2)}
        inActiveOpacity={0.6}
      />
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
