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
            paddingLeft: 20,
            paddingRight: 20,
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
        },
        form: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingLeft: 20, 
            paddingRight: 20 
        },
        inputContainer: {
            width: '100%',
            height: 78,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-around',
        },
        inputLabel: {
            fontSize: 15,
            fontWeight: 'regular'
        },
        input: {
            width: '100%',
            height: 50,
            fontSize: 20,
            paddingLeft: 30,
            paddingRight: 30,
            color: '#110101',
            backgroundColor: '#D9D9D9',
            borderRadius: 26
        },
        welcome: {
            fontWeight: 'bold',
            fontSize: 25,
            lineHeight: 24,
            letterSpacing: 0.01,
            color: '#000000',
            mixBlendMode: 'normal',
            textShadowColor: 'rgba(0, 0, 0, 0.7)',
            textShadowOffset: {
                width: 3,
                height: 3
            },
            textShadowRadius: 10
        },
        discoverCategories: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
            // backgroundColor: 'red',
            height: 50
        },
        discoverCategory: {
            display: 'flex',
            justifyContent: 'center',
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: '#C0DD4D',
            borderRadius: 50,
            color: 'white',
            fontWeight: 'bold',
            fontSize: 15,
            marginRight: 5
        }
    },
    darkStyles: {
        container: {
            flex: 1,
            backgroundColor: '#05010d',
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