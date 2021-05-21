import React, {useState} from 'react'
import _reactNative, {View, ScrollView, Text, Switch, TouchableOpacity, Pressable} from "react-native"
import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import Icons from "./../components/Icons"
import InteligentButton from "../components/InteligentButton.js"
import {iconStyles, lightTheme, styles} from "./../Styles.js"

function Settings(props) {
    const[screen, setScreen] = useState("Settings")
    const[options, setOptions] = useState("")
    const metric = wp("5%")

    return (
        <View style={{flex: 1, backgroundColor: lightTheme.ligthGrey}}>
            <ScrollView contentContainerStyle={{width: "100%"}}>
                <View style={{
                    width: "100%",
                    height: wp("35%"),
                    backgroundColor: lightTheme.notSoLightGrey,
                    borderRadius: 5, 
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0
                }}/>

                <View style={{
                    marginHorizontal: wp("2.5%"),
                    top: wp("-10%"),
                }}>
                    <View 
                        style={{
                            flex: 1, 
                            paddingHorizontal: metric,
                            paddingVertical: metric,
                            borderRadius: metric,
                            borderColor: lightTheme.ligthGrey,
                            borderWidth: wp("0.5%"),
                            backgroundColor: lightTheme.ligthGrey,
                            ...styles.bottomWrapper
                        }}
                    >
                        <View style={{
                            width: metric * 4,
                            height: metric * 4,
                            backgroundColor: lightTheme.yellow,
                            borderRadius: 10
                        }}/>

                        <View style={{
                            marginLeft: metric,
                            width: metric * 9
                        }}>
                            <Text numberOfLines={1} style={{
                                fontFamily: 'Poppins_700Bold',
                                color: lightTheme.darkGrey,
                                fontSize: wp("7%"),
                                marginTop: -metric/2,
                                marginBottom: -metric/4    
                            }}>
                                {props.myInfos.username}
                            </Text>
                            <Text numberOfLines={1} style={styles.bodyText2}>
                                {props.myInfos.bios}
                            </Text>
                        </View>
                    </View>
                    
                    <View style={{
                        backgroundColor: lightTheme.ligthGrey,
                        paddingVertical: metric/2,
                        marginBottom: metric/2,
                        borderRadius: 10,
                    }}>
                        <Pressable 
                            android_ripple={{color: lightTheme.kindOfLightGrey}}
                            style={{
                                flex: 1, 
                                paddingVertical: metric/2,
                                justifyContent: 'space-between', 
                                paddingHorizontal: metric,
                                ...styles.bottomWrapper
                            }}
                            onPress={() => {
                                setOptions("Name")
                                setScreen("SettingsOptions")
                            }}
                        >
                            <Text style={styles.headerText}>Mudar Nome</Text>
                        </Pressable>

                        <Pressable 
                            android_ripple={{color: lightTheme.kindOfLightGrey}}
                            style={{
                                flex: 1, 
                                paddingVertical: metric/2,
                                justifyContent: 'space-between', 
                                paddingHorizontal: metric,
                                ...styles.bottomWrapper
                            }}
                            onPress={() => {
                                setOptions("Bios")
                                setScreen("SettingsOptions")
                            }}
                        >
                            <Text style={styles.headerText}>Mudar Bios</Text>
                        </Pressable>

                        <Pressable 
                            android_ripple={{color: lightTheme.kindOfLightGrey}}
                            style={{
                                flex: 1, 
                                paddingVertical: metric/2,
                                justifyContent: 'space-between', 
                                paddingHorizontal: metric,
                                ...styles.bottomWrapper
                            }}
                            onPress={() => {
                                setOptions("Email")
                                setScreen("SettingsOptions")
                            }}
                        >
                            <Text style={styles.headerText}>Mudar Email</Text>
                        </Pressable>

                        <Pressable 
                            android_ripple={{color: lightTheme.kindOfLightGrey}}
                            style={{
                                flex: 1, 
                                paddingVertical: metric/2,
                                justifyContent: 'space-between', 
                                paddingHorizontal: metric,
                                ...styles.bottomWrapper
                            }}
                            onPress={() => {
                                setOptions("Password")
                                setScreen("SettingsOptions")
                            }}
                        >
                            <Text style={styles.headerText}>Mudar Senha</Text>
                        </Pressable>
                    </View>

                    <View style={{
                        backgroundColor: lightTheme.ligthGrey,
                        paddingVertical: metric/2,
                        marginBottom: metric/2,
                        borderRadius: 10,
                    }}>
                        <Pressable 
                            android_ripple={{color: lightTheme.kindOfLightGrey}}
                            style={{
                                flex: 1, 
                                paddingVertical: metric/2,
                                justifyContent: 'space-between', 
                                paddingHorizontal: metric,
                                ...styles.bottomWrapper
                            }}
                            onPress={() => {
                                setOptions("Delete")
                                setScreen("SettingsOptions")
                            }}
                        >
                            <Text style={{color: lightTheme.red, ...styles.headerCardText}}>Deletar Conta</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
            <InteligentButton 
                token={props.token}
                options={options}
                setMyInfos={props.setMyInfos}
                screen={screen}
                setScreen={screen => setScreen(screen)}
                handleScreenList={props.handleScreenList}
                handleDecrementScreen={props.handleDecrementScreen} 
                getEnvelope={props.getEnvelope}
                deleteEnvelope={props.deleteEnvelope}
            />
        </View>
    );
}

export default Settings;