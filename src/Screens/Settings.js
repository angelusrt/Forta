import React, {useState} from 'react'
import _reactNative, {View, ScrollView, Text, Switch, TouchableOpacity, Pressable} from "react-native"
import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import Icons from "./../components/Icons"
import InteligentButton from "../components/InteligentButton.js"
import {iconStyles, lightTheme, styles} from "./../Styles.js"

function Settings(props) {
    const[isDarkModeEnabled, setIsDarkModeEnabled] = useState(false)
    const[isNotificationEnabled, setIsNotificationEnabled] = useState(false)
    const[isDownloadImagesEnabled, setIsDownloadImagesEnabled] = useState(false)
    const[isNSFWEnabled, setIsNSFWEnabled] = useState(false)

    const toggleDarkModeSwitch = () => setIsDarkModeEnabled(!isDarkModeEnabled)
    const toggleNotificationSwitch = () => setIsNotificationEnabled(!isNotificationEnabled)
    const toggleDownloadImagesSwitch = () => setIsDownloadImagesEnabled(!isDownloadImagesEnabled)
    const toggleNSFWSwitch = () => setIsNSFWEnabled(!isNSFWEnabled)

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
                    <Pressable 
                        android_ripple={{color: lightTheme.kindOfLightGrey}}
                        style={{
                            flex: 1, 
                            paddingHorizontal: metric,
                            paddingVertical: metric,
                            marginBottom: metric,
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
                                marginBottom: -wp("2.5%")    
                            }}>
                                {props.myInfos.username}
                            </Text>
                            <Text numberOfLines={1} style={styles.authSubheader}>
                                {props.myInfos.bios}
                            </Text>
                        </View>

                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none"
                            style={{position: "absolute", right: metric, ...iconStyles.icon8}}
                        />
                    </Pressable>
                    
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
                        >
                            <Text style={styles.headerText}>Mudar Senha</Text>
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
                        >
                            <Text style={styles.headerText}>Deletar Conta</Text>
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
                        >
                            <Text style={styles.headerText}>Modo escuro</Text>
                            <Switch
                                trackColor={{false: lightTheme.notSoDarkGrey, true: lightTheme.green}}
                                thumbColor={lightTheme.kindOfLightGrey}
                                ios_backgroundColor={lightTheme.notSoDarkGrey}
                                onValueChange={toggleDarkModeSwitch}
                                value={isDarkModeEnabled}
                            />
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
                        >
                            <Text style={styles.headerText}>Notificações</Text>
                            <Switch
                                trackColor={{false: lightTheme.notSoDarkGrey, true: lightTheme.green}}
                                thumbColor={lightTheme.kindOfLightGrey}
                                ios_backgroundColor={lightTheme.notSoDarkGrey}
                                onValueChange={toggleNotificationSwitch}
                                value={isNotificationEnabled}
                            />
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
                        >
                            <Text style={styles.headerText}>Download Imagens</Text>
                            <Switch
                                trackColor={{ false: lightTheme.notSoDarkGrey, true: lightTheme.green }}
                                thumbColor={lightTheme.kindOfLightGrey}
                                ios_backgroundColor={lightTheme.notSoDarkGrey}
                                onValueChange={toggleDownloadImagesSwitch}
                                value={isDownloadImagesEnabled}
                            />
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
                        >
                            <Text style={styles.headerText}>Borrar NSFW</Text>
                            <Switch
                                trackColor={{ false: lightTheme.notSoDarkGrey, true: lightTheme.green }}
                                thumbColor={lightTheme.kindOfLightGrey}
                                ios_backgroundColor={lightTheme.notSoDarkGrey}
                                onValueChange={toggleNSFWSwitch}
                                value={isNSFWEnabled}
                            />
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
                        >
                            <Text style={styles.headerText}>Ver favoritos</Text>
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
                        >
                            <Text style={styles.headerText}>Sobre e termos</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
            <InteligentButton 
                handleDecrementScreen={props.handleDecrementScreen} 
                screen="Settings"
            />
        </View>
    );
}

export default Settings;