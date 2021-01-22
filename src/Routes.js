import React, { useState , useEffect} from 'react'
import { StatusBar, View } from 'react-native'
import { NavigationContainer } from "@react-navigation/native"

import Tab from './Screens/Tab'
import Settings from "./Screens/Settings"
import Post from "./Screens/Post"
import db from "./components/database.json";

function Routes() {
    const [ currentScreen, setCurrentScreen ] = useState("HomeTab")
    const[currentRoute, setCurrentRoute] = useState("Home")
    const[post, setPost] = useState("")
    const[postList, setPostList] = useState([])
    const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

    const handleRoute = (props) => {
        setCurrentRoute(props)
    }

    const handleScreen = (props) => {
        setCurrentScreen(props)
    }
    
    const handlePost = (props) => {
        setPostList(result => [...result, props])
    }

    const handleDecrementPost = () => {
        setPostList(prev => {
            const next = [...prev]
            next.pop()
            return next
        })
    }

    let scrn;
    switch (currentScreen) {
        case "HomeTab": 
            scrn = <Tab db={db} handlePost={post => handlePost(post)} currentRoute={currentRoute} handleRoute={route => handleRoute(route)} currentScreen={props => handleScreen(props)}/> 
            break;
        case "Settings":
            scrn = <Settings db={db} currentScreen={props => handleScreen(props)}/>
            break;
        case "PostHome":
            scrn = <Post db={db} post={postList[postList.length - 1]} postLength={postList.length} handleDecrementPost={() => handleDecrementPost()} handlePost={post => handlePost(post)} currentScreen={props => handleScreen(props)}/>
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