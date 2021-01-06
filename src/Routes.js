import React from 'react';
import { NavigationContainer } from "@react-navigation/native"

import Tab from './Screens/Tab'
import { StatusBar, View } from 'react-native';

function Routes() {
    return (
        <View style={{ flex: 1}}>
            <StatusBar backgroundColor="#F9F9F9" barStyle="dark-content"/>
            <NavigationContainer>
                <Tab/> 
            </NavigationContainer>
        </View>
    );
}

export default Routes;