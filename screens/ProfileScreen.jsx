import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import ProfileAction from '../components/ProfileAction';

function ProfileScreen({ navigation }) {
  const { themeStyles, user, theme, API_SERVER_URL, oneshopData, clearOneshopData, updateOneshopData } = useContext(ThemeContext);

  function logout(){
    clearOneshopData();
  }

  // function toggleTheme(){
  //   updateOneshopData({
  //     ...oneshopData,
  //     currentTheme: oneshopData.currentTheme === 'light' ? 'dark' : 'light'
  //   });
  // }
  

  return (
    <ScrollView contentContainerStyle={themeStyles.container}>

      <View style={themeStyles.profileScreenHeader}>
      <MaterialIcons name="keyboard-backspace" size={25} color="#000000" onPress={ () => { navigation.goBack() } } />

        {
          oneshopData.currentTheme === 'light' ?
          <Ionicons name="md-moon-sharp" size={24} color="#000000" />
          :
          <Ionicons name="sunny-outline" size={24} color="#ffffff" />
        }
      </View>
        {
          user &&
          <View style={themeStyles.profileBox}>
            <Image style={themeStyles.profileImage} source={{ uri: `${API_SERVER_URL}/api/static/images/model_s.png` }} alt='avatar' resizeMode='contain' />
            <Text style={{ fontWeight: 'bolder', fontSize: 20, marginBottom: 5 }}>{user.username}</Text>
            <Text style={{  fontSize: 15, marginBottom: 5 }}>{user.email}</Text>
            <View style={themeStyles.switchButton}>
            {
              oneshopData.mode === 'renter' ?
              <Text style={{ fontSize: 20 }}>Switch to Rentee</Text>
              :
              <Text style={{ fontSize: 20 }}>Switch to Renter</Text>
            }
            </View>
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
          onPress={logout}
        />

        

      </View>

    </ScrollView>
  )
}

export default ProfileScreen;
