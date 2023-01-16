import React from "react";
import { Text, View, Button, Image, TouchableOpacity } from "react-native";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import ImageUploader from "../components/ImageUploader";
import axios from "axios";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";

function AddItemScreen() {
  const [images, setImages] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const { themeStyles, API_SERVER_URL } = useContext(ThemeContext);

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

    formData.append(
      "itemData",
      JSON.stringify({
        name: "Canvas",
        category_name: "Sports",
        category_id: "63a81c7b7b5c6320ca63070b",
        price: 7,
        owner_id: "63c02bccb740a6cc3e7967cf",
        max_days: 7,
        condition: "som",
      })
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
      if (success) return setShowSuccess(true);
      alert(message);
    } catch (error) {
      alert("something went wrong");
    }
  }

  return (
    <View style={themeStyles.container}>
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
      <Button title="Upload" onPress={handleUploadItem} />
    </View>
  );
}

export default AddItemScreen;
