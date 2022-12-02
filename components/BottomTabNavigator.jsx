// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome, Feather } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import AddItemScreen from '../screens/AddItemScreen';
import ActivityScreen from '../screens/ActivityScreen';
import ProfileScreen from '../screens/ProfileScreen';

export default function BottomTabNavigator(){
  // const Tab = createMaterialTopTabNavigator();
  const Tab = createBottomTabNavigator();

    return(
        <Tab.Navigator 
        tabBarPosition='bottom'
        // navigationOptions={({navigation}) => {{
        //   tabBarOnPress:  (scene, jumpToIndex) => {
        //     console.log(scene.route);
        //   } 
        // }}}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
              ? 'home'
              : 'home-outline';
              return <Ionicons name={iconName} size={20} color={color} />;
            }
            if (route.name === 'Discover') {
              iconName = focused
              ? 'search-sharp'
              : 'search-outline';
              return <Ionicons name={iconName} size={20} color={color} />;
            }
            if (route.name === 'AddItem') {
              iconName = focused
              ? 'add-circle'
              : 'add-circle-outline';
              return <Image source={require('../assets/new.png')} style={{ width: 70, height: 40 }} />;
            }
            if (route.name === 'Activity') {
              iconName = focused
              ? 'message-circle'
              : 'message-circle';
              return <Feather name={iconName} size={20} color={color} />;
            }
            if (route.name === 'Profile') {
              iconName = focused
                ? 'user'
                : 'user-o';
              return <FontAwesome name={iconName} size={20} color={color} />;
            }
          },
          tabBarIndicatorStyle: {
            height: 0
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'black',
          tabBarLabelStyle: {
            fontSize: 12,
            textTransform: 'none'
          },
          tabBarStyle: {
            height: 80,
            borderTopWidth: 2,
          },
        })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Discover" component={DiscoverScreen} />
            {true ? <Tab.Screen name="AddItem" component={AddItemScreen} options={{
              tabBarShowLabel: false,
              tabBarLabelStyle: {
                display: 'none'
              },
              tabBarIconStyle: {
                width: 70,
                height: 40
              }
            }}/> : <></>}
            <Tab.Screen name="Activity" component={ActivityScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}