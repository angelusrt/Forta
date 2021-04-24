import React from 'react'
import Routes from './src/Routes'
import AppLoading from 'expo-app-loading'
import { useFonts } from "expo-font"
import {
    Poppins_700Bold, 
    Poppins_600SemiBold
} from "@expo-google-fonts/poppins"
import {
    Roboto_700Bold, 
    Roboto_500Medium, 
    Roboto_400Regular
} from "@expo-google-fonts/roboto"

export default () => {
    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Poppins_600SemiBold, 
        Roboto_700Bold,
        Roboto_500Medium,
        Roboto_400Regular
    })
    return !fontsLoaded ? <AppLoading/> : <Routes/>
}