import React, {useState} from 'react'
import {StatusBar, View} from 'react-native'
import {NavigationContainer} from "@react-navigation/native"

import Auth from "./Screens/Auth"
import Tab from './Screens/Tab'
import Settings from "./Screens/Settings"
import Post from "./Screens/Post"
import Forum from "./Screens/Forum"
import Chat from "./Screens/Chat"

function Routes() {
    const[route, setRoute] = useState("Home")
    const[screenList, setScreenList] = useState(["Auth"])
    const[postList, setPostList] = useState([])
    const[forum, setForum] = useState("")
    const[chat, setChat] = useState("")
    const[token, setToken] = useState("")
    const[myInfos, setMyInfos] = useState("")
    const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
    
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
                    myInfos={myInfos}
                    handleDecrementScreen={() => handleDecrementScreen()}
                />
            break
        case "Post":
            scrn = 
                <Post 
                    token={token}
                    forum={forum} 
                    post={postList[postList.length - 1]}
                    handleDecrementPost={() => handleDecrementPost()} 
                    handlePostList={props => setPostList(result => [...result, props])} 
                    handleScreenList={props => setScreenList(result => [...result, props])}
                    handleDecrementScreen={() => handleDecrementScreen()}
                />
            break
        case "Forum": 
            scrn = 
                <Forum
                    token={token}
                    forum={forum} 
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
                    chat={chat}
                    handleDecrementScreen={() => handleDecrementScreen()} 
                />
            break
        default:
            scrn = 
                <Tab
                    token={token}
                    myInfos={myInfos}
                    handlePostList={props => setPostList(result => [...result, props])} 
                    handleForum={forum => setForum(forum)}
                    handleChat={chat => setChat(chat)}
                    route={route} 
                    setRoute={route => setRoute(route)}
                    handleRoute={route => setRoute(route)} 
                    handleScreenList={props => setScreenList(result => [...result, props])}
                /> 
            break
    }

    return (
        <View style={{flex: 1}}>
            <View style={{height: STATUSBAR_HEIGHT, backgroundColor:"#F9F9F9"}}>
                <StatusBar translucent backgroundColor="#F9F9F9" barStyle="dark-content"/>
            </View>
            <NavigationContainer>{scrn}</NavigationContainer>
        </View>
    )
}

export default Routes