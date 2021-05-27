import React, {useState, useEffect} from 'react'
import * as _reactNative from "react-native"
import {View, ScrollView, Animated, Easing} from "react-native"
import {widthPercentageToDP as wp} from "react-native-responsive-screen"
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var _reactNativeTabView = require("react-native-tab-view")

import Icons from "./../components/Icons"
import PostCard from "./../components/PostCard.js"
import ContactCard from "./../components/ContactCard.js"
import InteligentButton from "../components/InteligentButton.js"
import {lightTheme, styles, iconStyles} from "./../Styles.js"

function TabBarTop(props) {
    const {
        state,
        navigation,
        descriptors,
        activeTintColor = lightTheme.darkGrey,
        inactiveTintColor = lightTheme.notSoLightGrey,
        allowFontScaling = true,
        showIcon = false,
        showLabel = true,
        pressColor = "rgba(28, 28, 30, 0.08)",
        iconStyle,
        labelStyle,
        indicatorStyle,
        style,
        ...rest
    } = props
    
    useEffect(() => props.handleRoute(state.routeNames[state.index]))

    return React.createElement(_reactNativeTabView.TabBar, _extends({}, rest, {
        navigationState: state,
        activeColor: activeTintColor,
        inactiveColor: inactiveTintColor,
        indicatorStyle: [{
            backgroundColor: lightTheme.ligthGrey
        }, indicatorStyle],
        style: [{
            backgroundColor: lightTheme.ligthGrey
        }, style],
        pressColor: pressColor,
        getAccessibilityLabel: ({
            route
        }) => descriptors[route.key].options.tabBarAccessibilityLabel,
        getTestID: ({
            route
        }) => descriptors[route.key].options.tabBarTestID,
        onTabPress: ({
            route,
            preventDefault
        }) => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true
            })
    
            if (event.defaultPrevented) {
                preventDefault()
            }
        },
        onTabLongPress: ({
            route
        }) => navigation.emit({
            type: 'tabLongPress',
            target: route.key
        }),
        renderIcon: ({
            route,
            focused,
            color
        }) => {
            if (showIcon === false) {
                return null
            }
    
            const {
                options
            } = descriptors[route.key]
    
            if (options.tabBarIcon !== undefined) {
                const icon = options.tabBarIcon({
                    focused,
                    color
                })
            return React.createElement(_reactNative.View, {
                style: [styles.icon, iconStyle]
            }, icon)
            }
            return null
        },
        renderLabel: ({
            route,
            focused,
            color
        }) => {
            if (showLabel === false) {
                return null
            }
    
            const {
                options
            } = descriptors[route.key]
            const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name
    
            if (typeof label === 'string') {
                return /*#__PURE__*/React.createElement(_reactNative.Text, {
                    style: [styles.label, {
                    color
                    }, labelStyle],
                    allowFontScaling: allowFontScaling
                }, label)
            }
    
            return label({
                focused,
                color
            })
        }
    
    }))
}  

function Refresh(){
    const[animRot, setAnimRot] = useState(new Animated.Value(0))

    const spin = animRot.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    useEffect(() => {
        Animated.loop(Animated.timing(animRot,{
            toValue: 1,
            duration: 450,
            easing: Easing.linear,
            useNativeDriver: true
        })).start()
    },[animRot])

    return(
        <Animated.View style={{transform: [{ rotate: spin }], flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Icons 
                name="Refresh" 
                width={wp("20%")} 
                height={wp("20%")} 
                viewBox="0 0 625 625" 
                fill="none" 
                style={iconStyles.icon10}
            />
        </Animated.View>
    )
}

function Home(props){
    const[forums, setForums] = useState([])
    const[posts, setPosts] = useState([])
    const[resolved, setResolved] = useState(false)

    const onTryToGetMyForums = async () => {
        return await fetch("http://192.168.0.111:3000/api/user/myForums", props.getEnvelope)
        .then(res => res.json())
        .then(data => setForums(data))
        .catch(err => console.log(err))
    }
    
    const onTryToGetForum = async forum => { 
        return await fetch(`http://192.168.0.111:3000/api/forums/${forum}`, props.getEnvelope)
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err))
    }
    
    useEffect(() => {onTryToGetMyForums()}, [])

    useEffect(() => {
        const loadData = async () => { Promise.all( forums.map(async (forum, idF) => {
            let forumInfo = await onTryToGetForum(forum)
            
            return forumInfo.posts.map( (post, idP) => 
                <PostCard 
                    key={idF + "_" + idP}
                    token={props.token}
                    myInfos={props.myInfos}

                    title={post.title}
                    bodyText={post.bodyText}
                    name={post.author}
                    forumName={forumInfo.groupName}
                    rating={post.upvotes}

                    mode="Normal"

                    isItPost={true}
                    post={post._id}
                    forum={forumInfo._id}
                    
                    owner={forumInfo.owner}
                    mods={forumInfo.mods.length === 0 ? null : forumInfo.mods}
                    
                    handlePostList={props.handlePostList}
                    handleForum={props.handleForum}
                    handleScreenList={props.handleScreenList}
                    handleFlagObj={props.handleFlagObj}

                    deleteEnvelope={props.deleteEnvelope}
                />
            )
        })).then(data => {
            setResolved(true)
            setPosts(data)
        })}
        loadData()
    },[forums])
    
    return (
        <ScrollView contentContainerStyle={{paddingBottom: 200, justifyContent: "center"}}>
            {resolved ? posts : <Refresh/>}
        </ScrollView> 
    )
}

function Forums(props) {
    const[forums, setForums] = useState([])
    const[forum, setForum] = useState()
    const[resolved, setResolved] = useState(false)

    const onTryToGetMyForums = async () => {
        return await fetch("http://192.168.0.111:3000/api/user/myForums", props.getEnvelope)
        .then(res => res.json())
        .then(data => setForums(data))
        .catch(err => console.log(err))
    }
    
    const onTryToGetForum = async (forum) => { 
        return await fetch(`http://192.168.0.111:3000/api/forums/${forum}`, props.getEnvelope)
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err))
    }
    
    useEffect(() => {onTryToGetMyForums()}, [])

    useEffect(() => {
        const loadData = async () => {Promise.all(forums.map(async (forum, index) => {
            let forumInfo = await onTryToGetForum(forum)

            return (
                <ContactCard
                    key={index}
                    myInfos={props.myInfos}
                    deleteEnvelope={props.deleteEnvelope}
                    title={forumInfo.groupName}
                    subtitle={`${forumInfo.followers.length} seguidores`}
                    owner={forumInfo.owner}
                    mods={forumInfo.mods}
                    mode="Forum"
                    favorite={false}
                    forum={forumInfo._id}
                    handleForum={props.handleForum}
                    handleScreenList={props.handleScreenList}
                />
            )
        })).then(data => {
            setResolved(true)
            setForum(data)
        })}
        loadData()
    },[forums])
    
    return (
        <ScrollView contentContainerStyle={{paddingBottom: 200, justifyContent: "center"}}>
            {resolved ? forum : <Refresh/>}
        </ScrollView>
    )
}

function Chats(props) {
    const[chats, setChats] = useState([])
    const[chat, setChat] = useState()
    const[resolved, setResolved] = useState(false)

    const onTryToGetMyChats = async () => {
        return await fetch( "http://192.168.0.111:3000/api/user/myChat", props.getEnvelope)
        .then(res => res.json())
        .then(data => setChats(data))
        .catch(err => err)
    }
    
    const onTryToGetChat = async (chat) => { 
        return await fetch( `http://192.168.0.111:3000/api/chats/${chat}`, props.getEnvelope)
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err))
    }
    
    useEffect(() => {onTryToGetMyChats()}, [])

    useEffect(() => {
        const loadData = async () => { Promise.all(chats.map(async (chat, index) => {
            let chatInfo = await onTryToGetChat(chat)
    
            return (
                <ContactCard
                    key={index}
                    deleteEnvelope={props.deleteEnvelope}
                    title={chatInfo.members.filter(mem => mem.member !== props.myInfos.id)[0].member}
                    subtitle={chatInfo.messages.length !== 0 ? chatInfo.messages[chatInfo.messages.length - 1].message : "<nada ainda!>"}
                    mode="Chat"
                    favorite={false}
                    chat={chatInfo._id}
                    handleChat={props.handleChat}
                    handleScreenList={props.handleScreenList}
                />
            )
        })).then(data => {
            setResolved(true)
            setChat(data)
        })}
        loadData()
    },[chats])
    
    return (
        <ScrollView contentContainerStyle={{paddingBottom: 200, justifyContent: "center"}}>
            {resolved ? chat : <Refresh/>}
        </ScrollView>
    )
}

function Invites(props) {
    const[invites, setInvites] = useState([])
    const[invite, setInvite] = useState()
    const[resolved, setResolved] = useState(false)

    const onTryToGetMyInvites = async () => {
        return await fetch("http://192.168.0.111:3000/api/user/myInvites", props.getEnvelope)
        .then(res => res.json())
        .then(data => setInvites(data))
        .catch(err => err)
    }
    
    const onTryToGetInvite = async (invite) => { 
        return await fetch(`http://192.168.0.111:3000/api/invites/${invite}`, props.getEnvelope)
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err))
    }
    
    useEffect(() => {onTryToGetMyInvites()}, [])

    useEffect(() => {
        const loadData = async () => {Promise.all(invites.map(async (invite, index) => {
            let inviteInfo = await onTryToGetInvite(invite)
            
            return (
                <ContactCard
                    key={index}
                    patchEnvelope={props.patchEnvelope}
                    deleteEnvelope={props.deleteEnvelope}
                    imagePlaceholder={
                        <View style={{
                            width: wp("10%"),
                            height: wp("10%"),
                            backgroundColor: lightTheme.notSoDarkGrey,
                            borderRadius: 10, 
                        }}/>
                    }
                    title={
                        inviteInfo.sender === props.myInfos.id ? inviteInfo.receiver : 
                        inviteInfo.sender
                    }
                    subtitle={
                        inviteInfo.description === 'mod' ? "Convidou-lhe para ser mod" :
                        inviteInfo.description === 'chat' ? "Convidou-lhe a conversar" :
                        inviteInfo.description === 'group' ? "Convidou-lhe a um grupo" :
                        "Erro"
                    }
                    mode="Invite"
                    description={inviteInfo.description}
                    isSender={
                        inviteInfo.sender === props.myInfos.id ? true : false
                    }
                    receiver={inviteInfo.receiver}
                    path={inviteInfo.path}
                    invite={inviteInfo._id}
                    token={props.token}
                />
            )
        })).then(data => {
            setResolved(true)
            setInvite(data)
        })}
        loadData()
    },[invites])

    return (
        <ScrollView contentContainerStyle={{paddingBottom: 200, justifyContent: "center"}}>
            {resolved ? invite : <Refresh/>}
        </ScrollView>
    )
}

function Tab(props) {
    const[screen, setScreen] = useState(null)
    const tab = createMaterialTopTabNavigator()
    let handleRoute = prop => props.handleRoute(prop)
    
    return (
        <React.Fragment>
            <View style={{flex: 1, backgroundColor: lightTheme.ligthGrey}}>
                <tab.Navigator  
                    initialRouteName={props.route}
                    tabBar={props => <TabBarTop handleRoute={route => handleRoute(route)} {...props} />}
                    tabBarOptions={{
                        renderIndicator: () => null,
                        activeTintColor: lightTheme.darkGrey,
                        inactiveTintColor: lightTheme.notSoLightGrey,
                        tabStyle: {
                            padding: 0,
                            width: 'auto',
                        },
                        style: {
                            backgroundColor: lightTheme.ligthGrey,
                            shadowColor: 'transparent',
                            elevation: 0,
                        },
                        labelStyle: {
                            fontFamily: 'Poppins_700Bold',
                            fontSize: wp("5%"),
                            textTransform: 'none',

                            margin: 0,
                            padding: wp("2.5%"),
                        },
                        contentContainerStyle: {
                            justifyContent: 'center'
                        }
                    }}
                    sceneContainerStyle={{backgroundColor: lightTheme.ligthGrey}}
                >
                    <tab.Screen name="Home" children={() => 
                        <Home  
                            token={props.token} 
                            myInfos={props.myInfos}
                            getEnvelope={props.getEnvelope}
                            deleteEnvelope={props.deleteEnvelope}
                            handlePostList={props.handlePostList} 
                            handleScreenList={props.handleScreenList}
                            handleForum={props.handleForum}
                            handleFlagObj={props.handleFlagObj}
                        />
                    }/>
                    <tab.Screen name="Forums" children={() => 
                        <Forums 
                            token={props.token}  
                            myInfos={props.myInfos}
                            getEnvelope={props.getEnvelope}
                            deleteEnvelope={props.deleteEnvelope}
                            handleForum={props.handleForum} 
                            handleScreenList={props.handleScreenList}
                        />
                    }/>
                    <tab.Screen name="Chats" children={() => 
                        <Chats 
                            token={props.token}  
                            myInfos={props.myInfos}
                            getEnvelope={props.getEnvelope}
                            deleteEnvelope={props.deleteEnvelope}
                            handleChat={props.handleChat} 
                            handleScreenList={props.handleScreenList}
                        />
                    }/>
                    <tab.Screen name="Invites" children={() => 
                        <Invites  
                            token={props.token}
                            myInfos={props.myInfos}
                            getEnvelope={props.getEnvelope}
                            patchEnvelope={props.patchEnvelope}
                            deleteEnvelope={props.deleteEnvelope}
                        />
                    }/>
                </tab.Navigator>
            </View>
            <InteligentButton 
                token={props.token}
                myInfos={props.myInfos}
                getEnvelope={props.getEnvelope}
                deleteEnvelope={props.deleteEnvelope}
                screen={
                    screen === "ForumAdd" || screen === "ForumSearch" || 
                    screen === "UserSearch" ? screen : props.route
                }
                setScreen={screen => setScreen(screen)}
                handleForum={props.handleForum}
                handleScreenList={props.handleScreenList} 
            />
        </React.Fragment>
    )
}

export default Tab