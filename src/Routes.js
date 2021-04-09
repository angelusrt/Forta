import React, { useState , useEffect} from 'react'
import { StatusBar, View } from 'react-native'
import { NavigationContainer } from "@react-navigation/native"

import Auth from "./Screens/Auth";
import Tab from './Screens/Tab'
import Settings from "./Screens/Settings"
import Post from "./Screens/Post"
import Forum from "./Screens/Forum";
import Chat from "./Screens/Chat";

import db from "./components/database.json";

function Routes() {
    const[route, setRoute] = useState("Home")
    const[screenList, setScreenList] = useState(["Auth"])
    const[postList, setPostList] = useState([])
    const[forum,setForum] = useState("")
    const[chat,setChat] = useState("")
    const[token,setToken] = useState("")
    const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

    const handleToken = () => {
        setScreenList(["Tab"])
    }
    
    const handleRoute = props => {
        setRoute(props)
    }

    const handleScreenList = props => {
        setScreenList(result => [...result, props])
    }

    const handleDecrementScreen = () => {
        setScreenList(prev => {
            const next = [...prev]
            next.pop()
            return next
        })
    }
    
    const handlePostList = props => {
        setPostList(result => [...result, props])
    }

    const handleDecrementPost = () => {
        setPostList(prev => {
            const next = [...prev]
            next.pop()
            return next
        })
    }

    const handleForum = props => {
        setForum(props)
    }

    const handleChat = props => {
        setChat(props)
    }

    let scrn;
    switch (screenList[screenList.length - 1]) {
        case "Auth": 
            scrn = 
                <Auth 
                    db={db} 
                    token={token}
                    setToken={token => setToken(token)}

                    handleToken={() => handleToken()}
                /> 
            break;
        case "Tab": 
            scrn = 
                <Tab 
                    db={db} 
                    token={token}

                    handlePostList={post => handlePostList(post)} 

                    handleForum={forum => handleForum(forum)}
                    
                    handleChat={chat => handleChat(chat)}

                    route={route} 
                    handleRoute={route => handleRoute(route)} 

                    handleScreenList={props => handleScreenList(props)}
                /> 
            break;
        case "Settings":
            scrn = 
                <Settings 
                    db={db} 
                    token={token}

                    handleScreenList={props => handleScreenList(props)}
                    handleDecrementScreen={() => handleDecrementScreen()}
                />
            break;
        case "Post":
            scrn = 
                <Post 
                    db={db} 

                    forum={forum} 
                    post={postList[postList.length - 1]} 
                    postLength={postList.length} 
                    handleDecrementPost={() => handleDecrementPost()} 
                    handlePostList={post => handlePostList(post)} 

                    handleScreenList={props => handleScreenList(props)}
                    handleDecrementScreen={() => handleDecrementScreen()}
                />
            break;
        case "Forum": 
            scrn = 
                <Forum 
                    db={db} 
                    
                    forum={forum} 
                    handleForum={forum => handleForum(forum)}

                    handlePostList={post => handlePostList(post)}

                    handleScreenList={props => handleScreenList(props)}
                    handleDecrementScreen={() => handleDecrementScreen()} 
                />
            break;
        case "Chat":
            scrn = 
                <Chat 
                    db={db} 
                    
                    chat={chat} 
                    handleChat={forum => handleForum(forum)}

                    handleDecrementScreen={() => handleDecrementScreen()} 
                />
            break;
        default:
            scrn = 
                <Tab 
                    route={route} 
                    handleRoute={route => handleRoute(route)} 
                    handleScreenList={props => handleScreenList(props)}
                />
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