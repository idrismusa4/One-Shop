import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { createStackNavigator } from '@react-navigation/stack';

export default function StackNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator 
        initialRouteName='Welcome'
        backBehavior="history"
        screenOptions={{
            headerShown: false,
            presentation: 'modal'
        }}
    >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  )
}
