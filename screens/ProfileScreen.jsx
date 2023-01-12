import React, { useContext, useState } from 'react';
import { Text, View, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import ProfileAction from '../components/ProfileAction';
import axios from 'axios';
import { CircleFade } from 'react-native-animated-spinkit';
import Modal from "react-native-modal";

function ProfileScreen({ navigation }) {
  const [profileImages, setProfileImages] = useState([]);
  const [prompt, setPrompt] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProfileDescBox, setShowProfileDescBox] = useState(false);
  const { themeStyles, user, theme, API_SERVER_URL, oneshopData, clearOneshopData, updateOneshopData } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);

  function logout(){
    clearOneshopData();
  }

  async function generateImage(){
    setLoading(true);
    try{
      const res = await axios.post(`${API_SERVER_URL}/api/user/new/image`, {
        prompt,
        size: '512x512',
        n: 2
      });
      // console.log(res.data.images);
      setProfileImages(res.data.images);
      setLoading(false);
    }catch(error){
      setLoading(false);
      alert("Something went wrong");
    }
  }
  async function updateProfileImage(imageUrl){
    setLoading(true);
    try{
      const res = await axios.post(`${API_SERVER_URL}/api/user/update/image`, {
        userId: user._id,
        imageUrl
      });
      if(res.data.success) alert(res.data.message);
      updateOneshopData({
        ...oneshopData,
        user: {
          ...oneshopData.user,
          profileImage: imageUrl
        }
      });
      setShowProfileDescBox(false);
      setLoading(false);
    }catch(error){
      setLoading(false);
      alert("Something went wrong");
    }
  }

  function switchMode(){
    updateOneshopData({
      ...oneshopData,
      mode: oneshopData.mode === 'rentee' ? 'renter' : 'rentee'
    });
  }

  function toggleTheme(){
    updateOneshopData({
      ...oneshopData,
      currentTheme: oneshopData.currentTheme === 'light' ? 'dark' : 'light'
    });
  }

  return (
    <ScrollView contentContainerStyle={themeStyles.container}>
      {
        showProfileDescBox &&
      // <View style={{ backgroundColor: 'red', position: 'absolute', height: '100%', zIndex: 2, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{  position: 'absolute', zIndex: 20,  height: '100%', width: '100%', backgroundColor: '#ffffff', elevation: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: 20
        // opacity: profileChangerOpacity 
      }}>
          <MaterialIcons name="cancel" size={30} color='red' style={{ marginLeft: 'auto' }} onPress={ () => { setShowProfileDescBox(false) } } />
          <Text>Describe a picture and we'll do the rest</Text>
          <TextInput
            multiline={true}
            numberOfLines={3}
            autoFocus={true}
            // onBlur={() => { togglePrompt() }}
            value={prompt}
            onChangeText={ (text) => { setPrompt(text) } }
            style={{
              height: 'auto',
              width: '100%',
              backgroundColor: 'cyan',
              textAlignVertical: 'top',
              padding: 20,
            }}
          />

            {
              !loading ? 
              profileImages.map((image, index) => (
                <TouchableOpacity
                key={index}
                style={{
                  height: 200,
                  width: "100%",
                  marginTop: 10,
                  elevation: 10,
                  borderWidth: 2
                }}
                onPress={ () => { updateProfileImage(image.url) } }
                >
                  <Image
                    style={{
                      height: 200,
                      width: "100%",
                    }}
                    source={{ uri: image.url }}
                    alt="image"
                    />
                  </TouchableOpacity>
              ))
              :
              <CircleFade size={20} />
            }

          <TouchableOpacity style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 100, height: 50, width: 200, elevation: 10, backgroundColor: '#C0DD4D', marginTop: 10 }} onPress={() => { generateImage() }}>
            <Text>Surprise me</Text>
          </TouchableOpacity>
        </View>
      // </View>
      }

      <View style={themeStyles.profileScreenHeader}>
      <MaterialIcons name="keyboard-backspace" size={25} color="#000000" onPress={ () => { navigation.goBack() } } />

        {
          oneshopData.currentTheme === 'light' ?
          <Ionicons name="md-moon-sharp" size={24} color="#000000" onPress={ () => { toggleTheme() } } />
          :
          <Ionicons name="sunny-outline" size={24} color="#000000" onPress={ () => { toggleTheme() } } />
        }
      </View>
        {
          user &&
          <View style={themeStyles.profileBox}>
            <TouchableOpacity onPress={() => { setShowProfileDescBox(true) }} >
              <Image style={themeStyles.profileImage} source={{ uri: user.profileImage === 'none' ? `https://robohash.org/${user.name}?set=set2` : user.profileImage }} alt='avatar' resizeMode='contain'/>
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bolder', fontSize: 20, marginBottom: 5 }}>{user.username}</Text>
            <Text style={{  fontSize: 15, marginBottom: 5 }}>{user.email}</Text>
            <TouchableOpacity style={themeStyles.switchButton} onPress={ () => { switchMode() } }>
            {
              oneshopData.mode === 'renter' ?
              <Text style={{ fontSize: 20 }}>Switch to Rentee</Text>
              :
              <Text style={{ fontSize: 20 }}>Switch to Renter</Text>
            }
            </TouchableOpacity>
          </View>
      }

      <View style={themeStyles.profileActions}>
        <ProfileAction
          action="Privacy"
          action_icon={<MaterialIcons name="privacy-tip" size={24} color="black" />} 
        />

        <ProfileAction 
          action="Purchase History"
          action_icon={<MaterialIcons name="history" size={24} color="black" />} 
        />

        <ProfileAction 
          action="Help & Support"
          action_icon={<MaterialIcons name="help-outline" size={24} color="black" />} 
        />

        <ProfileAction 
          action="Settings"
          action_icon={<Ionicons name="md-settings-outline" size={24} color="black" />} 
        />

        <ProfileAction 
          action="Invite a Friend"
          action_icon={<Ionicons name="person-add-outline" size={24} color="black" />} 
        />

        <ProfileAction 
          action="Logout"
          action_icon={<AntDesign name="logout" size={24} color="black" />} 
          onPress={ () => { setModalVisible(true) } }
        />

        <Modal isVisible={modalVisible}>
          <View style={{ height: 150, width: '90%', backgroundColor: '#ffffff', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 20 }}>
            <Text style={{ ...themeStyles.regularText }}>All data will be cleared</Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ ...themeStyles.regularText, width: '50%', height: 40, textAlignVertical: 'center', textAlign: 'center' }} onPress={ () => { logout() } }>Proceed</Text>
              <Text style={{ ...themeStyles.regularText, width: '50%', height: 40, textAlignVertical: 'center', textAlign: 'center' }} onPress={ () => { setModalVisible(false) } }>Cancel</Text>
            </View>
          </View>
        </Modal>
        

      </View>

    </ScrollView>
  )
}

export default ProfileScreen;
