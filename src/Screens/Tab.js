import React, {useState, useEffect} from 'react'
import * as _reactNative from "react-native"
import {View, ScrollView} from "react-native"
import {widthPercentageToDP as wp} from "react-native-responsive-screen"
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var _reactNativeTabView = require("react-native-tab-view")

import Refresh from "../components/Refresh"
import PostCard from "./../components/PostCard.js"
import ContactCard from "./../components/ContactCard.js"
import InteligentButton from "../components/InteligentButton.js"
import {lightTheme, styles} from "./../Styles.js"

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
    
    useEffect(() => props.setRoute(state.routeNames[state.index]))

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

function Home(props){
    //Shows react element only resolved is true
    const[resolved, setResolved] = useState(false)
    
    //A list of forum ids
    const[forums, setForums] = useState([])
    
    //Stores all posts components
    const[posts, setPosts] = useState([])

    //Updates onGet
    const[update, setUpdate] = useState(false)
    
    //Gets the forums that you follow
    const onGetMyForums = async () => {
        return await fetch("http://192.168.0.111:3000/api/user/myForums", props.getEnvelope)
        .then(res => res.json())
        .then(data => setForums(data))
        .catch(err => console.log(err))
    }

    //Gets posts 
    const onGet = async forum => { 
        return await fetch(`http://192.168.0.111:3000/api/forums/${forum}`, props.getEnvelope)
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err))
    }
    
    //Gets Forums ids
    useEffect(() => {onGetMyForums()}, [update])

    //Creates post ui
    useEffect(() => {
        //Function that maps through ids 
        const loadData = async () => { Promise.all( forums.map(async (forum, idF) => {
            //Gets infos
            let forumInfo = await onGet(forum)
            
            //Returns all post cards
            return forumInfo.posts.map((post, idP) => 
                <PostCard 
                    token={props.token}
                    myInfos={props.myInfos}
                    deleteEnvelope={props.deleteEnvelope}

                    key={idF + idP}
                    title={post.title}
                    bodyText={post.bodyText}
                    name={post.author}
                    forumName={forumInfo.groupName}
                    rating={post.upvotes}
                    forum={forumInfo._id}
                    post={post._id}
                    isItPost={true}
                    mode="Normal"
                    owner={forumInfo.owner}
                    mods={forumInfo.mods}
                    
                    setScreen={props.setScreen}
                    setForum={props.setForum}
                    setPost={props.setPost}
                    setFlagObj={props.setFlagObj}
                    onFunction={() => setUpdate(!update)}
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
    //Shows react element only resolved is true
    const[resolved, setResolved] = useState(false)
    
    //A list of forum ids
    const[forums, setForums] = useState([])
    
    //Stores all forums components
    const[forum, setForum] = useState()
    
    //Updates onGet
    const[update, setUpdate] = useState(false)
    
    //Function that gets all my forums ids
    const onGetMyForums = async () => {
        return await fetch("http://192.168.0.111:3000/api/user/myForums", props.getEnvelope)
        .then(res => res.json())
        .then(data => setForums(data))
        .catch(err => console.log(err))
    }
    
    //Function that gets forum infos
    const onGet = async (forum) => { 
        return await fetch(`http://192.168.0.111:3000/api/forums/${forum}`, props.getEnvelope)
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err))
    }
    
    //Updates my forums ids
    useEffect(() => {onGetMyForums()}, [update])

    //Updates forums components
    useEffect(() => {
        const loadData = async () => {Promise.all(forums.map(async (forum, index) => {
            let forumInfo = await onGet(forum)
            
            return (
                <ContactCard
                    myInfos={props.myInfos}
                    deleteEnvelope={props.deleteEnvelope}

                    key={index}
                    title={forumInfo.groupName}
                    subtitle={`${forumInfo.followers.length} seguidores`}
                    owner={forumInfo.owner}
                    mods={forumInfo.mods}
                    favorite={false}
                    forum={forumInfo._id}
                    mode="Forum"

                    setScreen={props.setScreen}
                    setForum={props.setForum}
                    onFunction={() => setUpdate(!update)}
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
    //Shows react element only resolved is true
    const[resolved, setResolved] = useState(false)

    //A list of chats ids
    const[chats, setChats] = useState([])

    //Stores all chats components
    const[chat, setChat] = useState()

    //Function that gets all my chats ids
    const onGetMyChats = async () => {
        return await fetch( "http://192.168.0.111:3000/api/user/myChat", props.getEnvelope)
        .then(res => res.json())
        .then(data => setChats(data))
        .catch(err => err)
    }
    
    //Function that gets chat infos
    const onGet = async (chat) => { 
        return await fetch( `http://192.168.0.111:3000/api/chats/${chat}`, props.getEnvelope)
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err))
    }
    
    //Updates my chats ids
    useEffect(() => {onGetMyChats()}, [])

    //Updates chats components
    useEffect(() => {
        const loadData = async () => { Promise.all(chats.map(async (chat, index) => {
            let chatInfo = await onGet(chat)
    
            return (
                <ContactCard
                    deleteEnvelope={props.deleteEnvelope}
                    
                    key={index}
                    mode="Chat"
                    title={
                        chatInfo.members.filter(mem => 
                            mem.member !== props.myInfos.id
                        )[0].member
                    }
                    subtitle={
                        chatInfo.messages.length !== 0 ? 
                        chatInfo.messages[chatInfo.messages.length - 1].message : 
                        "<nada ainda!>"
                    }
                    favorite={false}
                    chat={chatInfo._id}
                    
                    setChat={props.setChat}
                    setScreen={props.setScreen}
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
    //Shows react element only resolved is true
    const[resolved, setResolved] = useState(false)

    //A list of invites ids
    const[invites, setInvites] = useState([])
    
    //Stores all invite components
    const[invite, setInvite] = useState()

    //Updates onGetMyInvites
    const[update, setUpdate] = useState(false)

    //Function that gets all my invites ids
    const onGetMyInvites = async () => {
        return await fetch("http://192.168.0.111:3000/api/user/myInvites", props.getEnvelope)
        .then(res => res.json())
        .then(data => setInvites(data))
        .catch(err => err)
    }
    
    //Function that gets invite infos
    const onGet = async (invite) => { 
        return await fetch(`http://192.168.0.111:3000/api/invites/${invite}`, props.getEnvelope)
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err))
    }
    
    //Updates my invites ids
    useEffect(() => {onGetMyInvites()}, [update, props.update])

    //Updates invites components
    useEffect(() => {
        const loadData = async () => {Promise.all(invites.map(async (invite, index) => {
            let inviteInfo = await onGet(invite)
            
            return (
                <ContactCard
                    token={props.token}
                    patchEnvelope={props.patchEnvelope}
                    deleteEnvelope={props.deleteEnvelope}
                    
                    key={index}
                    mode="Invite"
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
                    description={inviteInfo.description}
                    isSender={
                        inviteInfo.sender === props.myInfos.id ? true : false
                    }
                    receiver={inviteInfo.receiver}
                    path={inviteInfo.path}
                    invite={inviteInfo._id}
                    
                    onFunction={() => setUpdate(!update)}
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
    //Creates a component that navigates beetween tabs
    const tab = createMaterialTopTabNavigator()

    //Sets further screens 
    const[scrn, setScrn] = useState(null)
    
    //Updates 
    const[update, setUpdate] = useState(false)

    //Function that sets what tab is in
    const setRoute = prop => props.setRoute(prop)
    
    return (
        <React.Fragment>
            <View style={{flex: 1, backgroundColor: lightTheme.ligthGrey}}>
                <tab.Navigator  
                    initialRouteName={props.route}
                    tabBar={props => <TabBarTop setRoute={route => setRoute(route)} {...props} />}
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
                            
                            setScreen={props.setScreen}
                            setForum={props.setForum}
                            setPost={props.setPost} 
                            setFlagObj={props.setFlagObj}
                        />
                    }/>
                    <tab.Screen name="Forums" children={() => 
                        <Forums 
                            token={props.token}  
                            myInfos={props.myInfos}
                            getEnvelope={props.getEnvelope}
                            deleteEnvelope={props.deleteEnvelope}

                            setScreen={props.setScreen}
                            setForum={props.setForum} 
                        />
                    }/>
                    <tab.Screen name="Chats" children={() => 
                        <Chats 
                            token={props.token}  
                            myInfos={props.myInfos}
                            getEnvelope={props.getEnvelope}
                            deleteEnvelope={props.deleteEnvelope}

                            setScreen={props.setScreen}
                            setChat={props.setChat} 
                        />
                    }/>
                    <tab.Screen name="Invites" children={() => 
                        <Invites  
                            token={props.token}
                            myInfos={props.myInfos}
                            update={update}
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
                    scrn === "ForumAdd" || scrn === "ForumSearch" || 
                    scrn === "UserSearch" ? scrn : props.route
                }
                
                setScreen={props.setScreen} 
                setForum={props.setForum}

                setScrn={screen => setScrn(screen)}
                onFunction={() => setUpdate(!update)}
            />
        </React.Fragment>
    )
}

export default Tab