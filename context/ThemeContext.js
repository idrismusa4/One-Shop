import { createContext } from "react";
import { StatusBar } from "react-native";

export const ThemeContext = createContext({
    theme: 'light',
});


export const styles = {
    lightStyles: {
        container: {
            flex: 1,
            backgroundColor: 'white',
            padding: 20,
            marginTop: StatusBar.currentHeight
        },
        title: {
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black'
        },
        logo: {
            width: 300,
            height: 300,
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: 300
        },
        regularText: { 
            fontSize: 20
        }
    },
    darkStyles: {
        container: {
            flex: 1,
            backgroundColor: '#05010d', //dark navy blue for dark bg
            padding: 10,
            marginTop: StatusBar.currentHeight
        },
        title: {
            fontSize: 30,
            fontWeight: 'bold',
            color: 'white'
        },
        logo: {
            width: 100,
            height: 100,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    }
};