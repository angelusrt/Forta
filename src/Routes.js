import React, {useState} from 'react'
import {StatusBar, View, Platform} from 'react-native'
import {NavigationContainer} from "@react-navigation/native"
import {lightTheme} from "./Styles";

import Auth from "./Screens/Auth"
import Tab from './Screens/Tab'
import Settings from "./Screens/Settings"
import Post from "./Screens/Post"
import Forum from "./Screens/Forum"
import Chat from "./Screens/Chat"
import Mods from "./Screens/Mods"

function Routes() {
    const[route, setRoute] = useState("Home")
    const[screenList, setScreenList] = useState(["Auth"])
    const[postList, setPostList] = useState([])
    const[forum, setForum] = useState("")
    const[chat, setChat] = useState("")
    const[token, setToken] = useState("")
    const[myInfos, setMyInfos] = useState("")
    const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
    const getEnvelope = {
        method: "GET",
        headers: {
            'accept-encoding': 'gzip, deflate, br',
            accept: '*/*',
            connection: 'keep-alive',
            host: 'localhost:3000',
            'auth-token': token
        }
    }
    const patchEnvelope = {
        method: "PATCH",
        headers: {
            'accept-encoding': 'gzip, deflate, br',
            accept: '*/*',
            connection: 'keep-alive',
            host: 'localhost:3000',
            'auth-token': token
        }
    }
    const deleteEnvelope = {
        method: "DELETE",
        headers: {
            'accept-encoding': 'gzip, deflate, br',
            accept: '*/*',
            connection: 'keep-alive',
            host: 'localhost:3000',
            'auth-token': token
        }
    }

    const handleDecrementScreen = () => setScreenList(prev => {
        const next = [...prev]
        next.pop()
        return next
    })

    const handleDecrementPost = () => setPostList(prev => {
        const next = [...prev]
        next.pop()
        return next
    })

    let scrn
    switch (screenList[screenList.length - 1]) {
        case "Auth": 
            scrn = 
                <Auth
                    token={token}
                    setToken={token => setToken(token)}
                    myInfos={myInfos}
                    setMyInfos={myInfos => setMyInfos(myInfos)}
                    handleToken={() => setScreenList(["Tab"])}
                /> 
            break
        case "Settings":
            scrn = 
                <Settings
                    token={token}
                    myInfos={myInfos}
                    setMyInfos={myInfos => setMyInfos(myInfos)}
                    handleScreenList={props => setScreenList([props])}
                    handleDecrementScreen={() => handleDecrementScreen()}
                    getEnvelope={getEnvelope}
                    deleteEnvelope={deleteEnvelope}
                />
            break
        case "Post":
            scrn = 
                <Post 
                    token={token}
                    myInfos={myInfos}
                    getEnvelope={getEnvelope}
                    deleteEnvelope={deleteEnvelope}
                    post={postList[postList.length - 1]}
                    handleDecrementPost={() => handleDecrementPost()}
                    handlePostList={props => setPostList(result => [...result, props])}  
                    forum={forum} 
                    handleForum={forum => setForum(forum)}
                    handleScreenList={props => setScreenList(result => [...result, props])}
                    handleDecrementScreen={() => handleDecrementScreen()}
                />
            break
        case "Forum": 
            scrn = 
                <Forum
                    token={token}
                    myInfos={myInfos}
                    getEnvelope={getEnvelope}
                    patchEnvelope={patchEnvelope}
                    deleteEnvelope={deleteEnvelope}
                    forum={forum} 
                    handleForum={forum => setForum(forum)}
                    handlePostList={props => setPostList(result => [...result, props])}
                    handleScreenList={props => setScreenList(result => [...result, props])}
                    handleDecrementScreen={() => handleDecrementScreen()} 
                />
            break
        case "Chat":
            scrn = 
                <Chat
                    token={token}
                    myInfos={myInfos}
                    getEnvelope={getEnvelope}
                    chat={chat}
                    handleDecrementScreen={() => handleDecrementScreen()} 
                />
            break
        case "Mods":
            scrn = 
                <Mods
                    token={token}
                    myInfos={myInfos}
                    getEnvelope={getEnvelope}
                    patchEnvelope={patchEnvelope}
                    forum={forum}
                    handleDecrementScreen={() => handleDecrementScreen()} 
                />
            break
        default:
            scrn = 
                <Tab
                    token={token}
                    myInfos={myInfos}
                    getEnvelope={getEnvelope}
                    patchEnvelope={patchEnvelope}
                    deleteEnvelope={deleteEnvelope}
                    handleForum={forum => setForum(forum)}
                    handleChat={chat => setChat(chat)}
                    route={route} 
                    setRoute={route => setRoute(route)}
                    handleRoute={route => setRoute(route)} 
                    handlePostList={props => setPostList(result => [...result, props])} 
                    handleScreenList={props => setScreenList(result => [...result, props])}
                /> 
            break
    }

    return (
        <View style={{flex: 1}}>
            <View style={{height: STATUSBAR_HEIGHT, backgroundColor: lightTheme.ligthGrey}}>
                <StatusBar translucent backgroundColor={lightTheme.ligthGrey} barStyle="dark-content"/>
            </View>
            <NavigationContainer>{scrn}</NavigationContainer>
        </View>
    )
}

export default Routes