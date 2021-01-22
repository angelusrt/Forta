import React, {useState, useEffect} from 'react';
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
    let posts = []
    posts = props.db.users.Angelus.myHome.map(
        (posts, index) => (
            <PostCard 
                key={index}
                imagePlaceholder={(ObjectByString(props.db, `${posts}.postImage`) != null)?
                    <View style={{
                        width: "100%",
                        height: wp("90%"),
                        backgroundColor: lightTheme.darkGrey,
                        borderRadius: 20, 
                    }}/> : null
                } 
                title={ObjectByString(props.db, `${posts}.title`)}
                bodyText={ObjectByString(props.db, `${posts}.body`)}
                name={ObjectByString(props.db, ObjectByString(props.db, `${posts}.name`))}
                forum="Pewdie"
                rating={ObjectByString(props.db, `${posts}.upvotes`)}
                post={posts}
                handlePostList={props.handlePostList}
                handleScreenList={props.handleScreenList}
            />
        )
    )
    return (
        <ScrollView>
            { posts }
        </ScrollView>
    );
}

function Forums(props) {
    let forum = []
    forum = props.db.users.Angelus.myForums.map(
        (forum, index) => (
            <ContactCard
                key={index}
                imagePlaceholder={(ObjectByString(props.db, `${forum.forum}.profileImage`) != null)?
                    <View style={{
                        width: wp("10%"),
                        height: wp("10%"),
                        backgroundColor: lightTheme.notSoDarkGrey,
                        borderRadius: 10, 
                    }}/> : null
                }
                title={ObjectByString(props.db, `${forum.forum}.name`)}
                subtitle={`${ObjectByString(props.db, `${forum.forum}.followers`)} seguidores`}
                mode="Forum"
                favorite={forum.favorite}
                forum={forum.forum}
                handleForum={props.handleForum}
                handleScreenList={props.handleScreenList}
            />
        )
    )
    return (
        <ScrollView>
            { forum }
        </ScrollView>
    );
}

function Chats(props) {
    let chats = []
    chats = props.db.users.Angelus.myChats.map(
        (chats, index) => (
            <ContactCard
                key={index}
                imagePlaceholder={(ObjectByString(props.db, chats.profileImage) != null)?
                    <View style={{
                        width: wp("10%"),
                        height: wp("10%"),
                        backgroundColor: lightTheme.notSoDarkGrey,
                        borderRadius: 10, 
                    }}/> : null
                }
                title={ObjectByString(props.db, chats.name)}
                subtitle={ObjectByString(props.db, chats.bios)}
                mode="Chat"
                favorite={chats.favorite}
                lastSaw={ObjectByString(props.db, chats.lastTime)}
            />
        )
    )
    return (
        <ScrollView>
            { chats }
        </ScrollView>
    );
}

function Invites(props) {
    let invites = []
    invites = props.db.users.Angelus.myInvites.map(
        (invites, index) => (
            <ContactCard 
                key={index}
                imagePlaceholder={ObjectByString(props.db, `${ObjectByString(props.db, `${invites}.sender`)}.profileImage`) != null?
                    <View style={{
                        width: wp("10%"),
                        height: wp("10%"),
                        backgroundColor: lightTheme.notSoDarkGrey,
                        borderRadius: 10, 
                    }}/> : null
                }
                title={ObjectByString(props.db, `${ObjectByString(props.db, `${invites}.sender`)}.name`)}
                subtitle={
                    ObjectByString(props.db, `${invites}.sender`).indexOf("persons") !== -1 ?
                    "Quer conversar com você!": 
                    ObjectByString(props.db, `${invites}.sender`).indexOf("forums") !== -1 ?
                    "Quer te convidar como mod!": 
                    ObjectByString(props.db, `${invites}.sender`).indexOf("group") !== -1 ?
                    "Quer te convidar para um grupo!": 
                    "Erro"
                }
                mode="Invite"
            />
        )
    )

    return (
        <ScrollView>
            { invites }
        </ScrollView>
    );
}

function Tab(props) {
    const tab = createMaterialTopTabNavigator();
    
    let handleRoute = prop => {
        props.handleRoute(prop)
    }
    
    return (
        <View style={{flex: 1, backgroundColor: lightTheme.ligthGrey}}>
            <tab.Navigator  
                initialRouteName={props.route}
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
                        fontFamily: 'Poppins',
                        fontSize: wp("4.5%"),
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
                <tab.Screen name="Home" children={() => <Home db={props.db} handlePostList={props.handlePostList} handleScreenList={props.handleScreenList}/>}/>
                <tab.Screen name="Forums" children={() => <Forums db={props.db} handleForum={props.handleForum} handleScreenList={props.handleScreenList}/>}/>
                <tab.Screen name="Chats" children={() => <Chats db={props.db} handleScreenList={props.handleScreenList}/>}/>
                <tab.Screen name="Invites" children={() => <Invites db={props.db} />}/>
            </tab.Navigator>
            <InteligentButton handleScreenList={props.handleScreenList} screen={props.route}/>
        </View>
    );
}

export default Tab;