import React, {useState} from 'react'
import {StatusBar, View, Platform} from 'react-native'
import {NavigationContainer} from "@react-navigation/native"

import {lightTheme} from "./Styles"

import Auth from "./screens/Auth"
import Tab from './screens/Tab'
import Settings from "./screens/Settings"
import Post from "./screens/Post"
import Forum from "./screens/Forum"
import Chat from "./screens/Chat"
import Mods from "./screens/Mods"
import Rules from './screens/Rules'
import Flags from "./screens/Flags"
import FlagsFlag from "./screens/FlagsFlag"

function Routes() {
    //http site location
    //const site = 'http://192.168.0.102:3000'
    const site = 'https://forta-forum.herokuapp.com'

    //The token of the user section
    const[token, setToken] = useState("")

    //They are objects, who contains user data
    const[myInfos, setMyInfos] = useState({})
    const[flagObj, setFlagObj] = useState({})

    //These controls the menu/screen you are in
    const[route, setRoute] = useState("Home")
    const[screen, setScreen] = useState(["Auth"])
    let scrn

    //They carry the ids, mostly used in fetch api
    const[forum, setForum] = useState("")
    const[post, setPost] = useState([])
    const[chat, setChat] = useState("")
    
    //These are the envelopes used in the fetch api, already containing user section token 
    const getEnvelope = {
        method: "GET",
        headers: {
            'accept-encoding': 'gzip, deflate, br',
            accept: '*/*',
            connection: 'keep-alive',
            host: "forta-forum.herokuapp.com",
            'auth-token': token
        }
    }
    const patchEnvelope = {
        method: "PATCH",
        headers: {
            'accept-encoding': 'gzip, deflate, br',
            accept: '*/*',
            connection: 'keep-alive',
            host: "forta-forum.herokuapp.com",
            'auth-token': token
        }
    }
    const deleteEnvelope = {
        method: "DELETE",
        headers: {
            'accept-encoding': 'gzip, deflate, br',
            accept: '*/*',
            connection: 'keep-alive',
            host: "forta-forum.herokuapp.com",
            'auth-token': token
        }
    }

    //This gets the heigth of your topbar 
    const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight

    //Functions that gets to the anterior screen/post
    const setPrevScreen = () => setScreen(prev => {
        const next = [...prev]
        next.pop()
        return next
    })
    const setPrevPost = () => setPost(prev => {
        const next = [...prev]
        next.pop()
        return next
    })

    //Current screen
    switch (screen[screen.length - 1]) {
        case "Auth": 
            scrn = 
                <Auth
                    site={site}
                    token={token}
                    myInfos={myInfos}

                    setToken={token => setToken(token)}
                    setMyInfos={myInfos => setMyInfos(myInfos)}
                    setScreen={() => setScreen(["Tab"])}
                /> 
            break
        case "Settings":
            scrn = 
                <Settings
                    site={site}
                    token={token}
                    myInfos={myInfos}
                    getEnvelope={getEnvelope}
                    deleteEnvelope={deleteEnvelope}

                    setMyInfos={myInfos => setMyInfos(myInfos)}
                    setScreen={props => setScreen([props])}
                    setPrevScreen={setPrevScreen}
                />
            break
        case "Post":
            scrn = 
                <Post 
                    site={site}
                    token={token}
                    myInfos={myInfos}
                    forum={forum}
                    post={post[post.length - 1]}
                    getEnvelope={getEnvelope}
                    deleteEnvelope={deleteEnvelope}

                    setScreen={props => setScreen(result => [...result, props])}
                    setPrevScreen={() => setPrevScreen()}
                    setForum={forum => setForum(forum)}
                    setPost={props => setPost(result => [...result, props])}
                    setPrevPost={() => setPrevPost()}
                    setFlagObj={flagObj => setFlagObj(flagObj)}
                />
            break
        case "Forum": 
            scrn = 
                <Forum
                    site={site}
                    token={token}
                    myInfos={myInfos}
                    forum={forum}
                    getEnvelope={getEnvelope}
                    patchEnvelope={patchEnvelope}
                    deleteEnvelope={deleteEnvelope}
                     
                    setScreen={props => setScreen(result => [...result, props])}
                    setPrevScreen={setPrevScreen}
                    setForum={forum => setForum(forum)}
                    setPost={props => setPost(result => [...result, props])} 
                    setFlagObj={flagObj => setFlagObj(flagObj)}
                />
            break
        case "Chat":
            scrn = 
                <Chat
                    site={site}
                    token={token}
                    myInfos={myInfos}
                    chat={chat}
                    getEnvelope={getEnvelope}
                    
                    setPrevScreen={() => setPrevScreen()} 
                />
            break
        case "Mods":
            scrn = 
                <Mods
                    site={site}
                    token={token}
                    myInfos={myInfos}
                    forum={forum}
                    getEnvelope={getEnvelope}
                    patchEnvelope={patchEnvelope}
                    
                    setPrevScreen={() => setPrevScreen()} 
                />
            break
        case "Rules":
            scrn = 
                <Rules
                    site={site}
                    token={token}
                    myInfos={myInfos}
                    forum={forum}
                    getEnvelope={getEnvelope}
                    
                    setPrevScreen={() => setPrevScreen()} 
                />
            break
        case "Flags":
            scrn = 
                <Flags
                    site={site}
                    token={token}
                    myInfos={myInfos}
                    forum={forum}
                    getEnvelope={getEnvelope}
                    deleteEnvelope={deleteEnvelope}

                    setScreen={props => setScreen(result => [...result, props])}
                    setPrevScreen={() => setPrevScreen()}
                    setForum={forum => setForum(forum)}
                    setFlagObj={flagObj => setFlagObj(flagObj)} 
                />
            break
        case "FlagsFlag":
            scrn = 
                <FlagsFlag
                    site={site}
                    token={token}
                    myInfos={myInfos}
                    flagObj={flagObj}
                    forum={forum}
                    getEnvelope={getEnvelope}
                    deleteEnvelope={deleteEnvelope}

                    setPrevScreen={() => setPrevScreen()} 
                />
            break
        default:
            scrn = 
                <Tab
                    site={site}
                    token={token}
                    myInfos={myInfos}
                    route={route}
                    getEnvelope={getEnvelope}
                    patchEnvelope={patchEnvelope}
                    deleteEnvelope={deleteEnvelope}

                    setScreen={props => setScreen(result => [...result, props])}
                    setForum={forum => setForum(forum)}
                    setChat={chat => setChat(chat)}
                    setPost={props => setPost(result => [...result, props])} 
                    setRoute={route => setRoute(route)}
                    setFlagObj={flagObj => setFlagObj(flagObj)}
                /> 
            break
    }

    return (
        <View style={{flex: 1}}>
            <View style={{height: STATUSBAR_HEIGHT, backgroundColor: lightTheme.ligthGrey}}>
                <StatusBar translucent backgroundColor={lightTheme.ligthGrey} barStyle="dark-content"/>
            </View>
            <NavigationContainer>
                {scrn}
            </NavigationContainer>
        </View>
    )
}

export default Routes