import React, {useState, useEffect} from 'react';
import _reactNative, { View, ScrollView, Text, TouchableOpacity, Platform} from "react-native"

import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { createMaterialTopTabNavigator, MaterialTopTabBar } from "@react-navigation/material-top-tabs";
import { useNavigationState, useRoute, useNavigation } from "@react-navigation/native";


function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var _reactNativeTabView = require("react-native-tab-view");

import { lightTheme, styles } from "./../Styles.js";
import PostCard from "./../components/PostCard.js";
import ContactCard from "./../components/ContactCard.js";
import InteligentButton from "../components/InteligentButton.js";


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
        () => {props.currentRoute(state.routeNames[state.index])}   
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
    // const routeName = useRoute().name;
    // () => props.currentRoute(routeName)
    return (
        <ScrollView>
            <PostCard 
                imagePlaceholder={
                    <View style={{
                        width: "100%",
                        height: wp("90%"),
                        backgroundColor: lightTheme.darkGrey,
                        borderRadius: 20, 
                    }}/>
                }
                title="He is one with the furnace"
                bodyText="Isso é um corpo de texto, onde irás desenvolver seu tema"
                name="CheesePrince"
                forum="PewdiepieSubs"
                rating="100K"
            />
            <PostCard 
                title="He is one with the furnace"
                bodyText="Isso é um corpo de texto, onde irás desenvolver seu tema"
                name="CheesePrincePrincePrince"
                forum="PewdiepieSubs"
                rating="100K"
            />
            <PostCard 
                title="He is one with the furnace"
                bodyText="Isso é um corpo de texto, onde irás desenvolver seu tema"
                name="CheesePrince"
                forum="PewdiepieSubs"
                rating="100K"
            />
            <PostCard 
                title="He is one with the furnace"
                bodyText="Isso é um corpo de texto, onde irás desenvolver seu tema"
                name="CheesePrince"
                forum="PewdiepieSubs"
                rating="100K"
            />
        </ScrollView>
    );
}

function Forums(props) {
    // const routeName = useRoute().name;
    // () => props.currentRoute(routeName)
    return (
        <ScrollView>
            <ContactCard 
                imagePlaceholder={
                    <View style={{
                        width: wp("10%"),
                        height: wp("10%"),
                        backgroundColor: lightTheme.notSoDarkGrey,
                        borderRadius: 10, 
                    }}/>
                }
                title="PewdiepieSubs"
                subtitle="8,4K following"
                mode="Forum"
            />
        </ScrollView>
    );
}

function Chats() {
    return (
        <ScrollView>
            <ContactCard 
                imagePlaceholder={
                    <View style={{
                        width: wp("10%"),
                        height: wp("10%"),
                        backgroundColor: lightTheme.notSoDarkGrey,
                        borderRadius: 10, 
                    }}/>
                }
                title="Pewdiepie"
                subtitle=">Helloo"
                mode="Chat"
                lastSaw="Ontem"
            />
        </ScrollView>
    );
}

function Invites() {
    return (
        <ScrollView>
            <ContactCard 
                imagePlaceholder={
                    <View style={{
                        width: wp("10%"),
                        height: wp("10%"),
                        backgroundColor: lightTheme.notSoDarkGrey,
                        borderRadius: 10, 
                    }}/>
                }
                title="Pewdiepie"
                subtitle="Quer conversar com você!"
                mode="Invite"
            />
        </ScrollView>
    );
}

function Tab() {
    const tab = createMaterialTopTabNavigator();
    const[currentRoute, setCurrentRoute] = useState("Home");

    const handleRoute = (props) => {
        setCurrentRoute(props)
    }
    return (
        <View style={{flex: 1, backgroundColor: lightTheme.ligthGrey}}>
            <tab.Navigator  
                initialRouteName="Home" 
                tabBar={props => <TabBarTop currentRoute={routeName => handleRoute(routeName)} {...props} />}
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
                <tab.Screen name="Home" children={() => <Home currentRoute={prop => {setCurrentRoute(prop); console.log(currentRoute)}}/>}/>
                <tab.Screen name="Forums" children={() => <Forums currentRoute={prop => {setCurrentRoute(prop); console.log(currentRoute)}}/>}/>
                <tab.Screen name="Chats" children={() => <Chats/>}/>
                <tab.Screen name="Invites" children={() => <Invites/>}/>
            </tab.Navigator>
            <InteligentButton currentScreen={currentRoute}/>
        </View>
    );
}

export default Tab;