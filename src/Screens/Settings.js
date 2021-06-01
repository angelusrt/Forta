import React, {useState} from 'react'
import _reactNative, {View, ScrollView, Text, Pressable} from "react-native"
import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import InteligentButton from "../components/InteligentButton.js"
import {lightTheme, styles} from "./../Styles.js"

function Settings(props) {
    //Controls witch screen will be desplayed
    const[scrn, setScrn] = useState("Settings")
    const[options, setOptions] = useState("")

    //Global width metric
    const metric = wp("5%")

    return (
        <View style={{flex: 1, backgroundColor: lightTheme.ligthGrey}}>
            <ScrollView contentContainerStyle={{width: "100%"}}>
                <View style={{
                    width: "100%",
                    height: metric * 7,
                    backgroundColor: lightTheme.notSoLightGrey,
                    borderRadius: 5, 
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0
                }}/>

                <View style={{
                    marginHorizontal: metric/2,
                    top: -(metric * 2),
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
                                fontSize: metric/5 * 7,
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
                                setScrn("SettingsOptions")
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
                                setScrn("SettingsOptions")
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
                                setScrn("SettingsOptions")
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
                                setScrn("SettingsOptions")
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
                                setScrn("SettingsOptions")
                            }}
                        >
                            <Text style={{
                                color: lightTheme.red, 
                                ...styles.headerCardText
                            }}>
                                Deletar Conta
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
            <InteligentButton 
                token={props.token}
                getEnvelope={props.getEnvelope}
                deleteEnvelope={props.deleteEnvelope}

                screen={scrn}
                options={options}

                setMyInfos={props.setMyInfos}
                setScreen={props.setScreen}
                setPrevScreen={props.setPrevScreen}

                setScrn={screen => setScrn(screen)}
            />
        </View>
    )
}

export default Settings