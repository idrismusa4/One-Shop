import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import axios from "axios";
import { CircleFade } from "react-native-animated-spinkit";
import Toast from "react-native-root-toast";
import Modal from "react-native-modal";

export default function RegisterScreen({ navigation }) {
  const { themeStyles, user, setUser, API_SERVER_URL } =
    useContext(ThemeContext);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  function updateUserData(value, name) {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
    // console.log(userData);
  }

  async function registerUser() {
    let { username, email, password, reenterPassword } = userData;
    if (!(username && email && password && reenterPassword))
      return Toast.show("Fields cannot be empty!", {
        duration: 5000,
        backgroundColor: "red",
      });
    if (password !== reenterPassword)
      return Toast.show("passwords dont match!", {
        duration: 5000,
        backgroundColor: "red",
      });

    let readyUserData = {
      ...userData,
      username: userData.username.trim(),
      email: userData.email.trim(),
      password: userData.password.trim(),
      reenterPassword: userData.reenterPassword.trim(),
    };
    delete readyUserData["reenterPassword"];
    setUserData(readyUserData);

    try {
      setLoading(true);

      let res = await axios.post(
        `${API_SERVER_URL}/api/user/register`,
        readyUserData
      );
      Toast.show(res.data.message, {
        duration: 5000,
        backgroundColor: "#ffffff",
        textStyle: {
          color: "#000000",
        },
      });
      if (res.data.success) {
        navigation.navigate("Login");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Toast.show(error.response.data.message, {
        duration: 5000,
        backgroundColor: "red",
      });
    }
  }

  return (
    <View style={themeStyles.container}>
      <Modal isVisible={loading}>
        <CircleFade
          size={100}
          color="#C0DD4D"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require("../assets/logo.png")}
          style={{ ...themeStyles.logo, width: 150, height: 150 }}
          alt="logo"
        />
        <View style={themeStyles.form}>
          <Text style={themeStyles.title}>Sign Up</Text>

          <View style={themeStyles.inputContainer}>
            <Text style={themeStyles.inputLabel}>Name</Text>
            <TextInput
              style={themeStyles.input}
              type="text"
              value={userData.username}
              onChangeText={(text) => {
                updateUserData(text, "username");
              }}
            />
          </View>

          <View style={themeStyles.inputContainer}>
            <Text style={themeStyles.inputLabel}>Email</Text>
            <TextInput
              style={themeStyles.input}
              type="text"
              value={userData.email}
              onChangeText={(text) => {
                updateUserData(text, "email");
              }}
            />
          </View>

          <View style={themeStyles.inputContainer}>
            <Text style={themeStyles.inputLabel}>Password</Text>
            <TextInput
              style={themeStyles.input}
              type="text"
              value={userData.password}
              onChangeText={(text) => {
                updateUserData(text, "password");
              }}
              secureTextEntry
            />
          </View>

          <View style={themeStyles.inputContainer}>
            <Text style={themeStyles.inputLabel}>RE-Enter Password</Text>
            <TextInput
              style={themeStyles.input}
              type="text"
              value={userData.reenterPassword}
              onChangeText={(text) => {
                updateUserData(text, "reenterPassword");
              }}
              secureTextEntry
            />
          </View>

          <Pressable
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#C0DD4D",
              width: 150,
              height: 50,
              paddingLeft: 20,
              paddingRight: 10,
              marginTop: 10,
              marginBottom: 20,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 30,
            }}
            onPress={() => {
              registerUser();
            }}
          >
            <Text style={{ ...themeStyles.regularText, color: "white" }}>
              Submit
            </Text>
          </Pressable>
        </View>

        <View
          style={{
            width: "85%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <View
            style={{ width: "40%", height: 1.5, backgroundColor: "black" }}
          />
          <Text style={{ fontSize: 15 }}>Or</Text>
          <View
            style={{ width: "40%", height: 1.5, backgroundColor: "black" }}
          />
        </View>

        <Pressable
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: "black",
            width: "85%",
            height: 35,
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 10,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 30,
          }}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Image
            source={require("../assets/apple.png")}
            style={{ width: 30, height: 30 }}
            alt="apple-logo"
          />
          <Text style={{ ...themeStyles.regularText, color: "white" }}>
            Sign up with Apple
          </Text>
        </Pressable>

        <Pressable
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: "#4050A6",
            width: "85%",
            height: 35,
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 10,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 30,
          }}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Image
            source={require("../assets/google.png")}
            style={{ width: 30, height: 30 }}
            alt="apple-logo"
          />
          <Text style={{ ...themeStyles.regularText, color: "white" }}>
            Sign up with Google
          </Text>
        </Pressable>

        <TouchableOpacity
          style={{
            width: "80%",
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 10,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18 }}>
            Already have an account?
            <Text
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              {" "}
              Sign In
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
