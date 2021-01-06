import React, {useState} from 'react';
import { View, ScrollView, KeyboardAvoidingView, Text, TextInput,TouchableOpacity, Platform, StatusBar} from "react-native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { styles } from "./../Styles.js";
import Icons from "./../components/Icons";

function Home() {
    return (
        <ScrollView contentContainerStyle={styles.view}>
            <Text>Home</Text>
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
        <View style={{flex: 1}}>
            <tab.Navigator initialRouteName="Home" tabBarOptions={{
                renderIndicator: () => null,
                activeTintColor: "#505050",
                inactiveTintColor: "#C4C4C4",
                tabStyle: {
                    padding: 0,
                    width: 'auto',
                },
                style: {
                    backgroundColor: "#F9F9F9",
                    shadowColor: 'transparent',
                    elevation: 0,
                },
                labelStyle: {
                    fontFamily: 'Poppins',
                    fontSize: 17,
                    textTransform: 'none',

                    margin: 0,
                    padding: 10,
                },
                contentContainerStyle: {
                    justifyContent: 'center'
                }
            }}>
                <tab.Screen name="Home" component={Home}/>
                <tab.Screen name="Forums" component={Forums}/>
                <tab.Screen name="Chats" component={Chats}/>
                <tab.Screen name="Invites" component={Invites}/>
            </tab.Navigator>
        </View>
    );
}

export default Tab;