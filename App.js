import React from 'react';
import Routes from './src/Routes'
import AppLoading from 'expo-app-loading';
import { useFonts } from "@use-expo/font";

export default () => {
    let [fontsLoaded] = useFonts({
        'Poppins': require('./assets/fonts/Poppins-Bold.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf')
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (<Routes />)
    }
}