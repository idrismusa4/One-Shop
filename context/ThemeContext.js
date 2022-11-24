import { createContext } from "react";
import { StatusBar } from "react-native";

export const ThemeContext = createContext({
    theme: 'light',
});


export const styles = {
    lightStyles: {
        container: {
            flex: 1,
            backgroundColor: 'cyan',
            padding: 20,
            marginTop: StatusBar.currentHeight
        },
        title: {
            fontSize: 30,
            color: 'black'
        },
        logo: {
            width: 100,
            height: 100,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    darkStyles: {
        container: {
            flex: 1,
            backgroundColor: 'black',
            padding: 20,
            marginTop: StatusBar.currentHeight
        },
        title: {
            fontSize: 30,
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