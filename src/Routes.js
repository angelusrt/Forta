import React from 'react';
import { NavigationContainer } from "@react-navigation/native"

import Tab from './Screens/Tab'

function Routes() {
    return (
        <NavigationContainer>
            <Tab/>
        </NavigationContainer>
    );
}

export default Routes;