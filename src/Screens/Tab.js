import React, {useState, useCallback, useEffect} from 'react';
import _reactNative, { View, ScrollView, Text, TouchableOpacity, Platform} from "react-native"

import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var _reactNativeTabView = require("react-native-tab-view");

import { lightTheme, styles } from "./../Styles.js";
import PostCard from "./../components/PostCard.js";
import ContactCard from "./../components/ContactCard.js";
import InteligentButton from "../components/InteligentButton.js";
import ObjectByString from "../components/ObjectByString";


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
    } = props;
    useEffect(
        () => props.handleRoute(state.routeNames[state.index])   
    )
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
            });
    
            if (event.defaultPrevented) {
                preventDefault();
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
                return null;
            }
    
            const {
                options
            } = descriptors[route.key];
    
            if (options.tabBarIcon !== undefined) {
                const icon = options.tabBarIcon({
                    focused,
                    color
                });
            return React.createElement(_reactNative.View, {
                style: [styles.icon, iconStyle]
            }, icon);
            }
            return null;
        },
        renderLabel: ({
            route,
            focused,
            color
        }) => {
            if (showLabel === false) {
                return null;
            }
    
            const {
                options
            } = descriptors[route.key];
            const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
    
            if (typeof label === 'string') {
                return /*#__PURE__*/React.createElement(_reactNative.Text, {
                    style: [styles.label, {
                    color
                    }, labelStyle],
                    allowFontScaling: allowFontScaling
                }, label);
            }
    
            return label({
                focused,
                color
            });
        }
    
    }));
}  

function Home(props){
    const[forums, setForums] = useState([])
    const[posts, setPosts] = useState([])
    const[resolved, setResolved] = useState(false)

    const httpEnvelope = {
        method: "GET",
        headers: {
            'accept-encoding': 'gzip, deflate, br',
            accept: '*/*',
            connection: 'keep-alive',
            host: 'localhost:3000',
            'auth-token': props.token
        }
    }

    const onTryToGetMyForums = async () => {
        return await fetch("http://192.168.0.106:3000/api/user/myForums", httpEnvelope)
        .then(res => res.json())
        .then(data => {
            setForums(data)
        })
        .catch(err => err)
    }
    
    const onTryToGetForum = async forum => { 
        return await fetch(`http://192.168.0.106:3000/api/forums/${forum}`, httpEnvelope)
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err))
    }
    
    useEffect(() => {
        onTryToGetMyForums()
    }, [])

    useEffect(() => {
        const loadData = async () => {
            
            Promise.all(forums.map(async (forum, idF) => {
                let forumInfo = await onTryToGetForum(forum)
                
                //console.log(forumInfo)
                //console.log(forumInfo.groupName)
                
                return forumInfo.posts.map( (post, idP) => (
                    <PostCard 
                        key={idF + "_" + idP}
                        // imagePlaceholder={
                        //     <View style={{
                        //         width: wp("95%"),
                        //         height: wp("95%"),
                        //         marginHorizontal: wp("2.5%"),
                        //         //marginTop: wp("5%"),
                        //         //marginLeft: wp("5%"),
                        //         marginTop: wp("-20%"),
                        //         top: wp("20%"),
                        //         borderColor: lightTheme.ligthGrey,
                        //         borderTopWidth: wp("0.5%"),
                        //         backgroundColor: lightTheme.notSoDarkGrey,
                        //         borderRadius: 20
                        //     }}/>
                        // } 
                        title={post.title}
                        bodyText={post.bodyText}
                        name={post.author}
                        forum={forumInfo.groupName}
                        rating={post.upvotes}
                        post={post._id}
                        handlePostList={props.handlePostList}
                        handleScreenList={props.handleScreenList}
                    />
                ))
                
            })).then(data => {
                setResolved(true)
                setPosts(data)
            })
        }
        loadData()
    },[forums])
    
    return (
        <ScrollView contentContainerStyle={{paddingBottom: 200}}>
            { resolved ? posts : <Text style={{textAlign: "center"}}>Loading...</Text> }
        </ScrollView>
    );
}

function Forums(props) {
    const[forums, setForums] = useState([])
    const[forum, setForum] = useState()
    const[resolved, setResolved] = useState(false)

    const httpEnvelope = {
        method: "GET",
        headers: {
            'accept-encoding': 'gzip, deflate, br',
            accept: '*/*',
            connection: 'keep-alive',
            host: 'localhost:3000',
            'auth-token': props.token
        }
    }

    const onTryToGetMyForums = async () => {
        return await fetch("http://192.168.0.106:3000/api/user/myForums", httpEnvelope )
            .then( res => res.json())
            .then( data => {
                setForums(data)
                //console.log(data)
            })
            .catch(err => err)
    }
    
    const onTryToGetForum = async (forum) => { 
        return await fetch(`http://192.168.0.106:3000/api/forums/${forum}`, httpEnvelope )
                    .then( res => res.json() )
                    .then( data => data )
                    .catch( err => console.log(err) )
    }
    
    useEffect(() => {
        onTryToGetMyForums()
    }, [])

    useEffect(() => {
        const loadData = async () => {
            
            Promise.all(forums.map(async (forum, index) => {
                let forumInfo = await onTryToGetForum(forum)
                
                //console.log(forumInfo)
                //console.log(forumInfo.groupName)
            
                return (
                    <ContactCard
                        key={index}
                        imagePlaceholder={
                            <View style={{
                                width: wp("10%"),
                                height: wp("10%"),
                                backgroundColor: lightTheme.notSoDarkGrey,
                                borderRadius: 10, 
                            }}/>
                        }
                        title={forumInfo.groupName}
                        subtitle={`${forumInfo.followers.length} seguidores`}
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
            })
        }
        loadData()
    },[forums])
    
    return (
        <ScrollView contentContainerStyle={{paddingBottom: 200}}>
            { 
                resolved ? forum : <Text style={{textAlign: "center"}}>Loading...</Text>
            }
        </ScrollView>
    )
}

function Chats(props) {
    const[chats, setChats] = useState([])
    const[chat, setChat] = useState()
    const[resolved, setResolved] = useState(false)

    const httpEnvelope = {
        method: "GET",
        headers: {
            'accept-encoding': 'gzip, deflate, br',
            accept: '*/*',
            connection: 'keep-alive',
            host: 'localhost:3000',
            'auth-token': props.token
        }
    }

    const onTryToGetMyChats = async () => {
        return await fetch( "http://192.168.0.106:3000/api/user/myChat", httpEnvelope )
        .then( res => res.json() )
        .then( data => {
            setChats(data)
            //console.log("1 " + data)
        })
        .catch(err => err)
    }
    
    const onTryToGetChat = async (chat) => { 
        return await fetch( `http://192.168.0.106:3000/api/chats/${chat}`, httpEnvelope )
        .then( res => res.json() )
        .then( data => {
        
            //console.log(data)
            return data
        })
        .catch( err => console.log(err) )
    }
    
    useEffect(() => {
        onTryToGetMyChats()
    }, [])

    //console.log("2 " + chats)

    useEffect(() => {
        const loadData = async () => {
            
            Promise.all(chats.map(async (chat, index) => {
                let chatInfo = await onTryToGetChat(chat)
                
                //console.log("1 " + chatInfo)
                //console.log(chatInfo.groupName)
            
                return (
                    <ContactCard
                        key={index}
                        imagePlaceholder={
                            <View style={{
                                width: wp("10%"),
                                height: wp("10%"),
                                backgroundColor: lightTheme.notSoDarkGrey,
                                borderRadius: 10, 
                            }}/>
                        }
                        title={chatInfo.members.filter(mem => mem.member !== props.myInfos.id)[0].member}
                        subtitle={chatInfo.messages.length !== 0 ? chatInfo.messages[chatInfo.messages.length - 1].message : "<nada ainda!>"}
                        mode="Chat"
                        favorite={false}
                        // lastSaw={chatInfo.messages[chatInfo.messages.length - 1].date}
                        lastSaw="Just now"
                        chat={chatInfo._id}
                        handleChat={props.handleChat}
                        handleScreenList={props.handleScreenList}
                    />
                )
            })).then(data => {
                setResolved(true)
                setChat(data)
            })
        }
        loadData()
    },[chats])
    
    return (
        <ScrollView>
            { resolved ? chat : <Text style={{textAlign: "center"}}>Loading...</Text> }
        </ScrollView>
    );
}

function Invites(props) {
    const[invites, setInvites] = useState([])
    const[invite, setInvite] = useState()
    const[resolved, setResolved] = useState(false)

    const httpEnvelope = {
        method: "GET",
        headers: {
            'accept-encoding': 'gzip, deflate, br',
            accept: '*/*',
            connection: 'keep-alive',
            host: 'localhost:3000',
            'auth-token': props.token
        }
    }

    const onTryToGetMyInvites = async () => {
        return await fetch( "http://192.168.0.106:3000/api/user/myInvites", httpEnvelope )
        .then( res => res.json() )
        .then( data => {
            setInvites(data)
            //console.log("1 " + data)
        })
        .catch(err => err)
    }
    
    const onTryToGetInvite = async (invite) => { 
        return await fetch( `http://192.168.0.106:3000/api/invites/${invite}`, httpEnvelope )
        .then( res => res.json() )
        .then( data => {
            //console.log(data)
            return data
        })
        .catch( err => console.log(err) )
    }
    
    useEffect(() => {
        onTryToGetMyInvites()
    }, [])

    //console.log("2 " + invites)

    useEffect(() => {
        const loadData = async () => {
            
            Promise.all(invites.map(async (invite, index) => {
                let inviteInfo = await onTryToGetInvite(invite)
                
                //console.log("1 " + inviteInfo)
                //console.log(inviteInfo.groupName)
            
                return (
                    <ContactCard
                        key={index}
                        imagePlaceholder={
                            <View style={{
                                width: wp("10%"),
                                height: wp("10%"),
                                backgroundColor: lightTheme.notSoDarkGrey,
                                borderRadius: 10, 
                            }}/>
                        }
                        title={inviteInfo.sender === props.myInfos.id ? inviteInfo.receiver : inviteInfo.sender}
                        subtitle={
                            inviteInfo.description === 'mod' ? "Quer te convidar como mod!" :
                            inviteInfo.description === 'chat' ? "Quer conversar com você!" :
                            inviteInfo.description === 'group' ? "Quer te convidar para um grupo!" :
                            "Erro"
                        }
                        mode="Invite"
                        invite={inviteInfo._id}
                    />
                )
            })).then(data => {
                setResolved(true)
                setInvite(data)
            })
        }
        loadData()
    },[invites])

    return (
        <ScrollView>
            { resolved ? invite : <Text style={{textAlign: "center"}}>Loading...</Text> }
        </ScrollView>
    );
}

function Tab(props) {
    const[screen, setScreen] = useState(null)
    const tab = createMaterialTopTabNavigator();
    
    let handleRoute = prop => {
        props.handleRoute(prop)
    }
    
    return (
        <View style={{flex: 1, backgroundColor: lightTheme.ligthGrey}}>
            <tab.Navigator  
                initialRouteName={props.route}
                lazy={true}
                tabBar={props => <TabBarTop handleRoute={route => handleRoute(route)} {...props} />}
                tabBarOptions={
                    {
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
                sceneContainerStyle={{
                    backgroundColor: lightTheme.ligthGrey
                }}
            >
                <tab.Screen name="Home" children={() => 
                    <Home 
                        db={props.db} 
                        token={props.token} 
                        handlePostList={props.handlePostList} 
                        handleScreenList={props.handleScreenList}
                    />
                }/>
                <tab.Screen name="Forums" children={() => 
                    <Forums 
                        token={props.token} 
                        db={props.db} 
                        handleForum={props.handleForum} 
                        handleScreenList={props.handleScreenList}
                    />
                }/>
                <tab.Screen name="Chats" children={() => 
                    <Chats 
                        token={props.token} 
                        db={props.db} 
                        myInfos={props.myInfos}
                        handleChat={props.handleChat} 
                        handleScreenList={props.handleScreenList}
                    />
                }/>
                <tab.Screen name="Invites" children={() => 
                    <Invites 
                        db={props.db} 
                        token={props.token}
                        myInfos={props.myInfos}
                    />
                }/>
            </tab.Navigator>
            <InteligentButton 
                token={props.token}
                myInfos={props.myInfos}
                screen={screen === "ForumAdd"? screen : props.route}
                handleForum={forum => props.handleForum(forum)}
                setScreen={screen => setScreen(screen)}
                handleScreenList={props.handleScreenList} 
            />
        </View>
    );
}

export default Tab;