import { Text, Image, View, Pressable, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Entypo, Ionicons } from "@expo/vector-icons";

export default function ImagePickerComponent({ images, setImages }) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result.assets);

    if (!result.canceled) {
      setImages(result.assets);
    }
  };

  return (
    <View style={{ width: "100%", height: 200, marginVertical: 20 }}>
      {images && (
        <Entypo
          name="edit"
          size={20}
          color="#ffffff"
          style={{
            marginTop: 150,
            marginLeft: 280,
            zIndex: 2,
            position: "absolute",
            marginRight: 10,
            marginBottom: 10,
            backgroundColor: "#C0DD4D",
            borderRadius: 20,
            padding: 10,
          }}
          onPress={pickImage}
        />
      )}
      {!images ? (
        <Pressable
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "gray",
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={pickImage}
        >
          <Ionicons name="cloud-upload-outline" size={50} />
          <Text>Upload 3 or more photos of your product</Text>
        </Pressable>
      ) : (
        <ScrollView style={{ width: "100%", height: "100%" }} horizontal={true}>
          {images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image.uri }}
              style={{
                height: "100%",
                width: 340,
                marginRight: 10,
                borderRadius: 20,
              }}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
