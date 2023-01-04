import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

function ProfileScreen({ navigation }) {
    const { themeStyles, user, theme, API_SERVER_URL, oneshopData } = useContext(ThemeContext);
  return (
    <ScrollView contentContainerStyly={themeStyles.container}>

      <View style={themeStyles.profileScreenHeader}>
      <MaterialIcons name="keyboard-backspace" size={25} color="#000000" />

        {
          theme === 'light' ?
          <Ionicons name="md-moon-sharp" size={24} color="#000000" />
          :
          <Ionicons name="sunny-outline" size={24} color="#000000" />
        }
      </View>

      <View style={themeStyles.profileBox}>
        <Image style={themeStyles.profileImage} source={{ uri: `${API_SERVER_URL}/api/static/images/model_s.png` }} alt='avatar' resizeMode='contain' />
        <Text style={{ fontWeight: 'bolder', fontSize: 20, marginBottom: 5 }}>Nicolas Adams</Text>
        <Text style={{  fontSize: 15, marginBottom: 5 }}>nicolasadams@gmail.com</Text>
        <View style={themeStyles.switchButton}>
        {
          oneshopData.mode === 'renter' ?
          <Text style={{ fontSize: 20 }}>Switch to Rentee</Text>
          :
          <Text style={{ fontSize: 20 }}>Switch to Renter</Text>
        }
        </View>
      </View>

      <View style={themeStyles.profileActions}>
        <View style={themeStyles.profileAction}>
        <MaterialIcons name="privacy-tip" size={24} color="black" />
          <Text style={{ marginLeft: 20, fontSize: 15 }}>Privacy</Text>
          <MaterialIcons name="arrow-forward-ios" size={24} color="black" style={{ marginLeft: 'auto' }} />
        </View>

        <View style={themeStyles.profileAction}>
        <MaterialIcons name="history" size={24} color="black" />
          <Text style={{ marginLeft: 20, fontSize: 15 }}>Purchase History</Text>
          <MaterialIcons name="arrow-forward-ios" size={24} color="black" style={{ marginLeft: 'auto' }} />
        </View>

        <View style={themeStyles.profileAction}>
        <MaterialIcons name="help-outline" size={24} color="black" />
          <Text style={{ marginLeft: 20, fontSize: 15 }}>Help & Support</Text>
          <MaterialIcons name="arrow-forward-ios" size={24} color="black" style={{ marginLeft: 'auto' }} />
        </View>

        <View style={themeStyles.profileAction}>
        <Ionicons name="md-settings-outline" size={24} color="black" />
          <Text style={{ marginLeft: 20, fontSize: 15 }}>Settings</Text>
          <MaterialIcons name="arrow-forward-ios" size={24} color="black" style={{ marginLeft: 'auto' }} />
        </View>

        <View style={themeStyles.profileAction}>
        <Ionicons name="person-add-outline" size={24} color="black" />
          <Text style={{ marginLeft: 20, fontSize: 15 }}>Invite a Friend</Text>
          <MaterialIcons name="arrow-forward-ios" size={24} color="black" style={{ marginLeft: 'auto' }} />
        </View>

        <View style={themeStyles.profileAction}>
        <AntDesign name="logout" size={24} color="black" />
          <Text style={{ marginLeft: 20, fontSize: 15 }}>Logout</Text>
        </View>

      </View>

    </ScrollView>
  )
}

export default ProfileScreen;
