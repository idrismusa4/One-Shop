import React from 'react';
import { Text, ScrollView, Button } from 'react-native';
import { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import ImageUploader from '../components/ImageUploader';
import axios from 'axios';

function AddItemScreen() {
  const [images, setImages] = useState(null);
    const { themeStyles, user, API_SERVER_URL } = useContext(ThemeContext);

    async function handleUploadItem(){
      let formData = new FormData();
      images.forEach(({ uri }) => {
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
        
        formData.append('file', {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      });
      
      formData.append('itemData', JSON.stringify({
        name: 'Canvas',
        category_name: 'Sports',
        category_id: '63a81c7b7b5c6320ca63070b',
        price: 7,
        owner_id: '63c02bccb740a6cc3e7967cf',
        max_days: 7,
        condition: 'som',
      }));

  // return console.log(formData);
  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  let res = await fetch(`${API_SERVER_URL}/api/item/new`, options);
  // res = await res.json();
  return console.log(res);

      // const res = await axios.post(`${API_SERVER_URL}/api/item/new`, formData);
      const {  message } = res.data;
      console.log(message);

    }

  return (
    <ScrollView contentContainerStyle={themeStyles.container}>
        <Text style={themeStyles.title}>Add new item</Text>
        <ImageUploader images={images} setImages={setImages} />
        <Button title="Upload" onPress={handleUploadItem} />
    </ScrollView>
  )
}

export default AddItemScreen;
