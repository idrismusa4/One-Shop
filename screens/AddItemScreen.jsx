import React from "react";
import {
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import ImageUploader from "../components/ImageUploader";
import axios from "axios";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";

function AddItemScreen() {
  const [images, setImages] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const { themeStyles, API_SERVER_URL, user } = useContext(ThemeContext);
  const [item, setItem] = useState({});

  async function fetchCategories() {
    try {
      const res = await axios.get(`${API_SERVER_URL}/api/category/all`);
      const { categories } = res.data;
      setCategories(categories);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUploadItem() {
    if (!images) return alert("please select item images");
    if (images.length < 3) return alert("please select at least 3 images");
    let formData = new FormData();
    images.forEach(({ uri }) => {
      let uriParts = uri.split(".");
      let fileType = uriParts[uriParts.length - 1];

      formData.append("file", {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    });

    const { name, category_id, category_name, price, max_days, description } =
      item;
    if (
      !(
        name &&
        category_id &&
        category_name &&
        price &&
        max_days &&
        description
      )
    )
      return alert("Fields cannot be empty");

    // return console.log(item);

    formData.append(
      "itemData",
      JSON.stringify({ ...item, owner_id: user._id })
    );

    // return console.log(formData);
    let options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      let res = await fetch(`${API_SERVER_URL}/api/item/new`, options);
      res = await res.json();
      // return console.log(res);

      // const res = await axios.post(`${API_SERVER_URL}/api/item/new`, formData);
      const { success, message } = res;
      if (success) {
        setItem({});
        setImages(null);
        return setShowSuccess(true);
      }
      alert(message);
    } catch (error) {
      alert("something went wrong");
    }
  }

  function updateItem(value, name) {
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
    // console.log(userData);
  }
  function updateItemCategory({ _id: category_id, name: category_name }) {
    setItem((prevItem) => ({
      ...prevItem,
      category_id,
      category_name,
    }));
    // console.log(userData);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ScrollView style={themeStyles.container}>
      <Modal
        backdropOpacity={0.6}
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={showSuccess}
      >
        <View
          style={{
            height: "80%",
            width: "90%",
            backgroundColor: "#ffffff",
            borderRadius: 20,
            paddingTop: 50,
            paddingBottom: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            marginLeft: "auto",
            marginRight: "auto",
            shadowColor: "#000",
            shadowOffset: {
              width: 100,
              height: 100,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <AntDesign name="checkcircleo" size={100} color="#C0DD4D" />
          <Text style={{ fontSize: 20 }}>Item successfully uploaded</Text>

          <TouchableOpacity
            style={{
              borderRadius: 20,
              borderColor: "#C0DD4D",
              borderWidth: 1,
              elevation: 5,
              backgroundColor: "#ffffff",
              height: 30,
              width: "70%",
            }}
            onPress={() => {
              setShowSuccess(false);
            }}
          >
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                textAlignVertical: "center",
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <ImageUploader images={images} setImages={setImages} />

      <View style={themeStyles.inputContainer}>
        <Text style={themeStyles.inputLabel}>Product Name</Text>
        <TextInput
          style={themeStyles.input}
          type="text"
          value={item.name}
          onChangeText={(text) => {
            updateItem(text, "name");
          }}
        />
      </View>

      <Text style={themeStyles.inputLabel}>Product Category</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {categories.map((category) => {
          return (
            <Text
              key={category._id}
              style={
                item.category_id === category._id
                  ? {
                      ...themeStyles.discoverCategory,
                      borderWidth: 2,
                      borderColor: "rgba(0, 0, 255, 0.2)",
                    }
                  : themeStyles.discoverCategory
              }
              onPress={() => {
                updateItemCategory(category);
              }}
            >
              {category.name}
            </Text>
          );
        })}
      </ScrollView>

      <View style={themeStyles.inputContainer}>
        <Text style={themeStyles.inputLabel}>Price /day</Text>
        <TextInput
          style={themeStyles.input}
          type="text"
          value={item.price}
          onChangeText={(text) => {
            updateItem(text, "price");
          }}
        />
      </View>

      <View style={themeStyles.inputContainer}>
        <Text style={themeStyles.inputLabel}>Duration (max days)</Text>
        <TextInput
          style={themeStyles.input}
          type="text"
          value={item.max_days}
          onChangeText={(text) => {
            updateItem(text, "max_days");
          }}
        />
      </View>

      <View style={themeStyles.inputContainer}>
        <Text style={themeStyles.inputLabel}>Description</Text>
        <TextInput
          style={{
            borderColor: "gray",
            borderWidth: 1,
            textAlignVertical: "top",
            padding: 10,
            marginVertical: 10,
            width: "100%",
            height: 50,
          }}
          onChangeText={(text) => {
            updateItem(text, "description");
          }}
          value={item.description}
          multiline={true}
          numberOfLines={10}
        />
      </View>

      <TouchableOpacity
            style={{
              backgroundColor: "#C0DD4D",
              elevation: 3,
              borderRadius: 5,
              height: 30,
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
            }}
            onPress={handleUploadItem}
          >
            <Text>Upload</Text>
          </TouchableOpacity>
    </ScrollView>
  );
}

export default AddItemScreen;
