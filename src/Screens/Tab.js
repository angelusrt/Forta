import React, {useState} from 'react';
import { View, ScrollView, Text, Platform} from "react-native"
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { lightTheme, styles } from "./../Styles.js";
import PostCard from "./../components/PostCard.js";
import InteligentButton from "../components/InteligentButton.js";

function Home() {
    return (
        <ScrollView contentContainerStyle={styles.view} >
            <PostCard 
                imagePlaceholder={
                    <View style={{
                        width: "100%",
                        height: wp("90%"),
                        backgroundColor: lightTheme.darkGrey,
                        borderRadius: 30, 
                    }}/>
                }
                title="He is one with the furnace"
                bodyText="Isso é um corpo de texto, onde irás desenvolver seu tema"
                name="CheesePrince"
                forum="/pewdiepieSubs"
                rating="100k"
            />
            <PostCard 
                title="He is one with the furnace"
                bodyText="Isso é um corpo de texto, onde irás desenvolver seu tema"
                name="CheesePrincePrincePrince"
                forum="/pewdiepieSubs"
                rating="100k"
            />
            <PostCard 
                title="He is one with the furnace"
                bodyText="Isso é um corpo de texto, onde irás desenvolver seu tema"
                name="CheesePrince"
                forum="/pewdiepieSubs"
                rating="100k"
            />
            <PostCard 
                title="He is one with the furnace"
                bodyText="Isso é um corpo de texto, onde irás desenvolver seu tema"
                name="CheesePrince"
                forum="/pewdiepieSubs"
                rating="100k"
            />
        </ScrollView>
    );
}

function Forums() {
    return (
        <View style={styles.view}>
            <Text>Forums</Text>
        </View>
    );
}

function Chats() {
    return (
        <View style={styles.view}>
            <Text>Chats</Text>
        </View>
    );
}

function Invites() {
    return (
        <View style={styles.view}>
            <Text>Invites</Text>
        </View>
    );
}

function Tab() {
    const tab = createMaterialTopTabNavigator();

    return (
        <View style={{flex: 1, backgroundColor: lightTheme.ligthGrey}}>
            <tab.Navigator initialRouteName="Home" tabBarOptions={{
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
                <tab.Screen name="Home" component={Home}/>
                <tab.Screen name="Forums" component={Forums}/>
                <tab.Screen name="Chats" component={Chats}/>
                <tab.Screen name="Invites" component={Invites}/>
            </tab.Navigator>
            <InteligentButton/>
        </View>
    );
}

export default Tab;