import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const StarRating = ({ defaultRating: rating, setRating }) => {
  // const [rating, setRating] = useState(defaultRating);

  const handlePress = (newRating) => {
    if(!setRating) return;
    setRating(newRating);
  }

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((value) => {
        return (
          <TouchableOpacity key={value} onPress={ () => { handlePress(value) } }>
            <Text style={styles.star}>
              <AntDesign name="star" color={value <= rating ? "#dbd40b" : "lightgray"} size={20} />
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 15,
    margin: 2,
  },
};

export default StarRating;
