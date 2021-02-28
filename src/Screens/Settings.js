import React, {useState, useEffect} from 'react'
import _reactNative, { View, ScrollView, Text, Switch, TouchableOpacity, Platform} from "react-native"

import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen"
import Icons from "./../components/Icons"

import { lightTheme, styles } from "./../Styles.js"
import InteligentButton from "../components/InteligentButton.js"
import ObjectByString from "../components/ObjectByString";

function Settings(props) {
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
    const [isDownloadImagesEnabled, setIsDownloadImagesEnabled] = useState(false);
    const [isNSFWEnabled, setIsNSFWEnabled] = useState(false);

    const toggleDarkModeSwitch = () => setIsDarkModeEnabled(!isDarkModeEnabled);
    const toggleNotificationSwitch = () => setIsNotificationEnabled(!isNotificationEnabled);
    const toggleDownloadImagesSwitch = () => setIsDownloadImagesEnabled(!isDownloadImagesEnabled);
    const toggleNSFWSwitch = () => setIsNSFWEnabled(!isNSFWEnabled);

    const metric = wp("5%")

    let profileImage = 
        ObjectByString(props.db, `${props.db.users.Angelus.me}.profileImage`) != null ?
        <View style={{
            width: metric * 4,
            height: metric * 4,
            backgroundColor: lightTheme.yellow,
            borderRadius: 10
        }}/> : 
        <View style={{
            width: metric * 4,
            height: metric * 4,
            backgroundColor: lightTheme.red,
            borderRadius: 10
        }}/>

    let bannerImage = 
        ObjectByString(props.db, `${props.db.users.Angelus.me}.bannerImage`) != null ?
        <View style={{
            width: "100%",
            height: wp("35%"),
            backgroundColor: lightTheme.red,
            borderRadius: 10, 
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
        }}/>:
        <View style={{
            width: "100%",
            height: wp("35%"),
            backgroundColor: lightTheme.yellow,
            borderRadius: 10, 
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
        }}/>

    return (
        <View style={{flex: 1, backgroundColor: lightTheme.ligthGrey}}>
            <ScrollView contentContainerStyle={{width: "100%"}}>
                { bannerImage }
                <View>
                    <View style={{
                        marginHorizontal: wp("5%"),
                        top: wp("-10%")
                    }}>
                        <View style={{
                            flex: 1, 
                            //justifyContent: 'space-between', 
                            paddingHorizontal: metric,
                            paddingVertical: metric,
                            marginBottom: metric,
                            borderRadius: metric,
                            backgroundColor: lightTheme.ligthGrey,
                            ...styles.bottomWrapper
                        }}>
                            { profileImage }

                            <View style={{
                                marginLeft: metric 
                            }}>
                                <Text style={{
                                    fontFamily: 'Poppins_700Bold',
                                    color: lightTheme.darkGrey,
                                    fontSize: wp("7%"),
                                    marginBottom: -wp("2.5%")    
                                }}>
                                    {ObjectByString(props.db, `${props.db.users.Angelus.me}.name`)}
                                </Text>
                                <Text style={ styles.authSubheader }>
                                    {ObjectByString(props.db, `${props.db.users.Angelus.me}.bios`)}
                                </Text>
                            </View>

                            <TouchableOpacity style={{
                                position: 'absolute',
                                right: metric
                            }}>
                                <Icons 
                                    name="Arrow" 
                                    width={wp("10%")} 
                                    height={wp("10%")} 
                                    viewBox="0 0 300 300" 
                                    fill="none" 
                                    style={{
                                        stroke: lightTheme.darkGrey,
                                        strokeLinejoin: "round",
                                        strokeWidth:"15.9px",
                                        transform: [{ rotate: "180deg" }]
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        
                        <View 
                            style={{
                                flex: 1, 
                                height: metric * 2.5,
                                justifyContent: 'space-between', 
                                paddingHorizontal: metric,
                                ...styles.bottomWrapper
                            }}
                        >
                            <Text style={ styles.headerText }>Mudar Email</Text>
                            <Icons 
                                name="Arrow" 
                                width={wp("10%")} 
                                height={wp("10%")} 
                                viewBox="0 0 300 300" 
                                fill="none" 
                                style={{
                                    stroke: lightTheme.darkGrey ,
                                    strokeLinejoin: "round",
                                    strokeWidth:"15.9px",
                                    transform: [{ rotate: "180deg" }]
                                }}
                            />
                        </View>

                        <View 
                            style={{
                                flex: 1, 
                                height: metric * 2.5,
                                justifyContent: 'space-between', 
                                paddingHorizontal: metric,
                                ...styles.bottomWrapper
                            }}
                        >
                            <Text style={ styles.headerText }>Mudar Senha</Text>
                            <Icons 
                                name="Arrow" 
                                width={wp("10%")} 
                                height={wp("10%")} 
                                viewBox="0 0 300 300" 
                                fill="none"
                                style={{
                                    stroke: lightTheme.darkGrey ,
                                    strokeLinejoin: "round",
                                    strokeWidth:"15.9px",
                                    transform: [{ rotate: "180deg" }]
                                }}
                            />
                        </View>

                        <View 
                            style={{
                                flex: 1, 
                                height: metric * 2.5,
                                justifyContent: 'space-between', 
                                paddingHorizontal: metric,
                                marginBottom: metric,
                                ...styles.bottomWrapper
                            }}
                        >
                            <Text style={ styles.headerText }>Deletar Conta</Text>
                            <Icons 
                                name="Arrow" 
                                width={wp("10%")} 
                                height={wp("10%")} 
                                viewBox="0 0 300 300" 
                                fill="none"
                                style={{
                                    stroke: lightTheme.darkGrey ,
                                    strokeLinejoin: "round",
                                    strokeWidth:"15.9px",
                                    transform: [{ rotate: "180deg" }]
                                }}
                            />
                        </View>

                        <View 
                            style={{
                                flex: 1, 
                                height: metric * 2.5,
                                justifyContent: 'space-between', 
                                paddingHorizontal: metric,
                                ...styles.bottomWrapper
                            }}
                        >
                            <Text style={ styles.headerText }>Modo escuro</Text>
                            <Switch
                                trackColor={{ false: lightTheme.darkGrey, true: lightTheme.green }}
                                thumbColor={lightTheme.kindOfLightGrey}
                                ios_backgroundColor={lightTheme.darkGrey}
                                onValueChange={toggleDarkModeSwitch}
                                value={isDarkModeEnabled}
                            />
                        </View>

                        <View 
                            style={{
                                flex: 1, 
                                height: metric * 2.5,
                                justifyContent: 'space-between', 
                                paddingHorizontal: metric,
                                ...styles.bottomWrapper
                            }}
                        >
                            <Text style={ styles.headerText }>Notificações</Text>
                            <Switch
                                trackColor={{ false: lightTheme.darkGrey, true: lightTheme.green }}
                                thumbColor={lightTheme.kindOfLightGrey}
                                ios_backgroundColor={lightTheme.darkGrey}
                                onValueChange={toggleNotificationSwitch}
                                value={isNotificationEnabled}
                            />
                        </View>

                        <View 
                            style={{
                                flex: 1, 
                                height: metric * 2.5,
                                justifyContent: 'space-between', 
                                paddingHorizontal: metric,
                                ...styles.bottomWrapper
                            }}
                        >
                            <Text style={ styles.headerText }>Download Imagens</Text>
                            <Switch
                                trackColor={{ false: lightTheme.darkGrey, true: lightTheme.green }}
                                thumbColor={lightTheme.kindOfLightGrey}
                                ios_backgroundColor={lightTheme.darkGrey}
                                onValueChange={toggleDownloadImagesSwitch}
                                value={isDownloadImagesEnabled}
                            />
                        </View>

                        <View 
                            style={{
                                flex: 1, 
                                height: metric * 2.5,
                                justifyContent: 'space-between', 
                                paddingHorizontal: metric,
                                marginBottom: metric,
                                ...styles.bottomWrapper
                            }}
                        >
                            <Text style={ styles.headerText }>Borrar NSFW</Text>
                            <Switch
                                trackColor={{ false: lightTheme.darkGrey, true: lightTheme.green }}
                                thumbColor={lightTheme.kindOfLightGrey}
                                ios_backgroundColor={lightTheme.darkGrey}
                                onValueChange={toggleNSFWSwitch}
                                value={isNSFWEnabled}
                            />
                        </View>

                        <View 
                            style={{
                                flex: 1, 
                                height: metric * 2.5,
                                justifyContent: 'space-between', 
                                paddingHorizontal: metric,
                                ...styles.bottomWrapper
                            }}
                        >
                            <Text style={ styles.headerText }>Ver favoritos</Text>
                            <Icons 
                                name="Arrow" 
                                width={wp("10%")} 
                                height={wp("10%")} 
                                viewBox="0 0 300 300" 
                                fill="none" 
                                style={{
                                    stroke: lightTheme.darkGrey ,
                                    strokeLinejoin: "round",
                                    strokeWidth:"15.9px",
                                    transform: [{ rotate: "180deg" }]
                                }}
                            />
                        </View>

                        <View 
                            style={{
                                flex: 1, 
                                height: metric * 2.5,
                                justifyContent: 'space-between', 
                                paddingHorizontal: metric,
                                marginBottom: metric,
                                ...styles.bottomWrapper
                            }}
                        >
                            <Text style={ styles.headerText }>Sobre e termos</Text>
                            <Icons 
                                name="Arrow" 
                                width={wp("10%")} 
                                height={wp("10%")} 
                                viewBox="0 0 300 300" 
                                fill="none" 
                                style={{
                                    stroke: lightTheme.darkGrey ,
                                    strokeLinejoin: "round",
                                    strokeWidth:"15.9px",
                                    transform: [{ rotate: "180deg" }]
                                }}
                            />
                        </View>
                                
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