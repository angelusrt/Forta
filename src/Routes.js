import React, { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native"

import Tab from './Screens/Tab'
import Settings from "./Screens/Settings";
import { StatusBar, View, SafeAreaView } from 'react-native';

function Routes() {
    const [ currentScreen, setCurrentScreen ] = useState("HomeTab")
    const[currentRoute, setCurrentRoute] = useState("Home")
    const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

    const handleRoute = (props) => {
        setCurrentRoute(props)
    }

    const handleScreen = (props) => {
        setCurrentScreen(props)
    }

    let scrn;

    switch (currentScreen) {
        case "HomeTab":
            scrn = <Tab currentRoute={currentRoute} handleRoute={route => handleRoute(route)} currentScreen={props => handleScreen(props)}/> 
            break;
        case "Settings":
            scrn = <Settings currentScreen={props => handleScreen(props)}/>
            break;
        default:
            scrn = <Tab currentRoute={currentRoute} handleRoute={route => handleRoute(route)} currentScreen={props => handleScreen(props)}/>
            break;
    }

    return (
        <View style={{ flex: 1}}>
            <View style={{ height: STATUSBAR_HEIGHT, backgroundColor:"#F9F9F9" }}>
                <StatusBar translucent backgroundColor="#F9F9F9" barStyle="dark-content"/>
            </View>
            <NavigationContainer>
                {scrn}
            </NavigationContainer>
        </View>
    );
}

export default Routes;