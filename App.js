import { TouchableOpacity, Dimensions } from "react-native";
import { ThemeContext, styles } from "./context/ThemeContext";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-gesture-handler";
import StackNavigator from "./components/StackNavigator";
import BottomTabNavigator from "./components/BottomTabNavigator";
import DiscoverScreen from "./screens/DiscoverScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import AddItemScreen from "./screens/AddItemScreen";
import Toast from "react-native-root-toast";

export default function App() {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [oneshopData, setOneshopData] = useState({});
  const [user, setUser] = useState({});

  function toggleTheme() {
    setCurrentTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  }

  async function clearOneshopData() {
    await AsyncStorage.removeItem("@oneshopData");
    Toast.show("You have successfully logged out", {
      duration: 5000,
      backgroundColor: "#ffffff",
      textStyle: {
        color: "#000000",
      },
    });
    loadOneshopData();
  }
  async function updateOneshopData(oneshopData) {
    await AsyncStorage.setItem("@oneshopData", JSON.stringify(oneshopData));
    loadOneshopData();
  }
  async function loadOneshopData() {
    let oneshopData = await AsyncStorage.getItem("@oneshopData");
    if (typeof oneshopData !== "object") {
      setOneshopData(JSON.parse(oneshopData));
      setUser(JSON.parse(oneshopData).user);
      return;
    }
    updateOneshopData({
      user: null,
      recentSearches: [],
      currentTheme: "light",
      mode: "rentee",
    });
  }

  async function updateRecentSearches(item) {
    let { name: searchInput } = item;
    if (searchInput.trim().length === 0) return;

    let { recentSearches } = oneshopData;

    let searchInputExists = recentSearches.find(
      (search) => search.name === searchInput
    );
    if (searchInputExists) {
      recentSearches = recentSearches.filter(
        (oldSearch) => oldSearch.name !== searchInput
      );
    }
    recentSearches.unshift(item);
    updateOneshopData({
      ...oneshopData,
      recentSearches: recentSearches,
    });
  }

  async function handleDeleteRecentSearch(search) {
    let { recentSearches } = oneshopData;
    recentSearches = recentSearches.filter(
      (oldSearch) => oldSearch.name !== search
    );
    updateOneshopData({
      ...oneshopData,
      recentSearches: recentSearches,
    });
  }

  useEffect(() => {
    loadOneshopData();
  }, []);

  // console.log(user)
  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        toggleTheme,
        // themeStyles: currentTheme === 'light' ? styles.lightStyles : styles.darkStyles,
        themeStyles: styles.lightStyles,
        user,
        setUser,
        oneshopData,
        updateOneshopData,
        clearOneshopData,
        updateRecentSearches,
        handleDeleteRecentSearch,
        API_SERVER_URL: "http://192.168.43.240:5000",
        // API_SERVER_URL: "http://10.1.107.145:5000"
      }}
    >
      <NavigationContainer>
        {!user ? <StackNavigator /> : <BottomTabNavigator />}
      </NavigationContainer>

      {/* <DiscoverScreen /> */}
      {/* <ProfileScreen /> */}
      {/* <RegisterScreen /> */}
      {/* <LoginScreen /> */}
      {/* <HomeScreen /> */}
      {/* <AddItemScreen /> */}
    </ThemeContext.Provider>
  );
}
