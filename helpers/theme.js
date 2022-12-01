import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function theme(){
    const theme = await AsyncStorage.getItem('theme');
    return theme === 'light' ? 'lightStyles' : 'darkStyles';
}

export async function setInitialTheme(){
    const initialTheme = await AsyncStorage.setItem('theme', 'light');
}

export async function setTheme(){
    const setTheme_ = await AsyncStorage.setItem('theme', 'dark'); 
    console.log(setTheme_)
    return;
}

export const lightStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'cyan',
      alignItems: 'center',
      justifyContent: 'center',
    }
});
export const darkStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    }
});