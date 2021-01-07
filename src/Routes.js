import React from 'react';
import { NavigationContainer } from "@react-navigation/native"

import Tab from './Screens/Tab'
import { StatusBar, View, SafeAreaView } from 'react-native';

function Routes() {
    const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

    return (
        <View style={{ flex: 1}}>
            <View style={{ height: STATUSBAR_HEIGHT, backgroundColor:"#F9F9F9" }}>
                <StatusBar translucent backgroundColor="#F9F9F9" barStyle="dark-content"/>
            </View>
            <NavigationContainer>
                <Tab/> 
            </NavigationContainer>
        </View>
    );
}

export default Routes;