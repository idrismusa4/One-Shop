import React, { useState, useEffect } from 'react';
import { Text, Button, Image, View, Pressable, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Entypo, Ionicons } from '@expo/vector-icons';
import CarouselSlider from '../components/CarouselSlider';

export default function ImagePickerComponent({ images, setImages }) {

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets);

    if (!result.canceled) {
      setImages(result.assets);
    }
  };

  return (
    <View style={{ width: '100%', height: 200 }}>
      {
        !images ? 
        <Pressable style={{ height: '100%', width: '100%', backgroundColor: 'gray', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onPress={pickImage}>
        <Ionicons name='cloud-upload-outline' size={50} />
        <Text>Upload 3 or more photos of your product</Text>
      </Pressable>
      :
      <ScrollView contentContainerStyle={{ width: '100%', height: '100%', borderRadius: 20, backgroundColor: 'red', display: 'flex', }} horizontal={true}
      showsHorizontalScrollIndicator={false}>
        {
          images.map((image, index) => (
            <Image key={index} source={{ uri: image.uri }} style={{ height: '100%', width: 300, borderRadius: 20 }} />
          ))
        }
        <Entypo name='edit' size={20} color='#ffffff' style={{ marginTop: 400, marginLeft: 300, marginRight: 10, marginBottom: 10, backgroundColor: '#C0DD4D', borderRadius: 20, padding: 10, alignSelf: 'flex-end' }} onPress={pickImage} />
      </ScrollView>
      }
    </View>
  );
}