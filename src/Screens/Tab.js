import React from 'react';
import { View, KeyboardAvoidingView, Text, TextInput,TouchableOpacity, Platform, LogBox} from "react-native"

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

function Home() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home</Text>
        </View>
    );
}

function Forums() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Forums</Text>
        </View>
    );
}

function Chats() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Chats</Text>
        </View>
    );
}

function Invites() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Invites</Text>
        </View>
    );
}

function Tab() {
    const tab = createMaterialTopTabNavigator();
    return (
        <tab.Navigator initialRouteName="Home">
            <tab.Screen name="Home" component={Home}/>
            <tab.Screen name="Forums" component={Forums}/>
            <tab.Screen name="Chats" component={Chats}/>
            <tab.Screen name="Invites" component={Invites}/>
        </tab.Navigator>
    );
}

export default Tab;