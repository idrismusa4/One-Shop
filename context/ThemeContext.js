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
            paddingLeft: 10,
            paddingRight: 10,
            marginTop: StatusBar.currentHeight
        },
        title: {
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black'
        },
        logo: {
            width: 350,
            height: 350,
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: 300,
            // backgroundColor: 'red'
        },
        regularText: { 
            fontSize: 15
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
            borderRadius: 100
        },
        welcome: {
            fontWeight: 'bold',
            fontSize: 25,
            lineHeight: 24,
            letterSpacing: 0.01,
            color: '#000000',
            mixBlendMode: 'normal',
            textShadowColor: 'rgba(0, 0, 0, 0.3)',
            textShadowOffset: {
                width: 3,
                height: 3
            },
            textShadowRadius: 10,
        },
        discoverCategories: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            // marginTop: 5,
            // backgroundColor: 'red',
            // height: 50
            // paddingVertical: 10
            // marginTop: 15,
            // marginBottom: 15
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
            marginRight: 5,
            transition: '.3s ease',
        },
        itemOuterContainer: {
            height: 100, 
            marginBottom: 20, 
            backgroundColor: '#656060', 
            borderRadius: 20, 
            paddingRight: 20,
            elevation: 7
        },
        itemInnerContainer: {
            height: 100, 
            marginBottom: 2, 
            // backgroundColor: '#b3c3c4', 
            backgroundColor: '#ffffff', 
            borderTopLeftRadius: 20, 
            borderBottomLeftRadius: 20, 
            paddingVertical: 10,
            paddingHorizontal: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        itemProps: {
            height: '100%', 
            width: '75%', 
            // backgroundColor: 'blue', 
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: 20
        },
        customRatingBarStyle: {
            width: 50,
            // height: 100,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        speechBoxOuter: {
            position: "absolute",
            height: '100%',
            width: '100%',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
        speechBoxInner: {
            height: 300,
            width: 300,
            backgroundColor: 'cyan',
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        profileScreenHeader: { 
            width: '100%', 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center',  
            justifyContent: 'space-between',
            paddingHorizontal: 20
        },
        profileScreenArrowBack: { 
            height: 30, 
            width: 30, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            backgroundColor: "#000000", 
            borderRadius: 100 
        },
        profileBox: {
            width: '100%',
            // height: 200,
            marginTop: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        profileImage: {
            width: 100,
            height: 100,
            borderRadius: 100,
            marginBottom: 5
        },
        switchButton: {
            height: 40,
            width: 200,
            backgroundColor: '#C0DD4D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
            marginTop: 5,
            elevation: 5
        },
        profileActions: {
            width: '100%',
            // backgroundColor: 'red',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
        },
        profileAction: {
            height: 50,
            width: '80%',
            backgroundColor: 'cyan',
            borderRadius: 100,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginBottom: 15,
            elevation: 5
            // justifyContent: 'space-between',
            
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