import React, {useState, useEffect} from 'react';
import _reactNative, { View, ScrollView, Text, TouchableOpacity, Platform} from "react-native"

import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import Icons from "./../components/Icons";

import { lightTheme, styles } from "./../Styles.js";
import PostCard from "./../components/PostCard";
import InteligentButton from "../components/InteligentButton.js";
import ObjectByString from "../components/ObjectByString";

function Chat(props) {
    const[follow, setFollow] = useState(true)

    const metric = wp("5%")

    //console.log(ObjectByString( props.db, `${ObjectByString(props.db, `${props.chat}.members`).filter(prop => prop !== "persons[2]")}.name` ))
    console.log(ObjectByString(props.db, `${props.chat}.info`).filter(prop => prop.name != "Angelus").map(prop => prop.name))
    //console.log(ObjectByString(props.db, `${props.chat}.info`).filter(prop => prop !== "persons[2]").name)
    
    let profileImage = 
    ObjectByString(props.db, `${props.chat}.info`)
    .filter(prop => prop.name != "Angelus")
    .map(prop => prop.profileImage) != null ?
        <View style={{
            width: metric * 2,
            height: metric * 2,
            backgroundColor: lightTheme.yellow,
            borderRadius: 10, 
        }}/> : 
        <View style={{
            width: metric * 2,
            height: metric * 2,
            backgroundColor: lightTheme.red,
            borderRadius: 10, 
        }}/>

    let chat = []
    chat = ObjectByString(props.db, `${props.chat}.messages`).map(
        (chat, index) => (
            <View 
                style={{
                    borderRadius: 20, 
                    padding: metric,
                    paddingBottom: metric/3*2,
                    marginBottom: metric/4,
                    //marginVertical: metric/4,
                    //borderWidth: 
                    borderBottomLeftRadius: chat.sender !== "persons[2]" ? 0 : 20,
                    borderBottomRightRadius: chat.sender !== "persons[2]" ? 20 : 0, 
                    marginLeft: chat.sender !== "persons[2]" ? metric/2 : metric * 3,  
                    marginRight: chat.sender !== "persons[2]" ? metric * 3 : metric/2,
                    ...styles.card,
                    //...styles.card2
                }}
            >
                {
                    ObjectByString(props.db, `${props.chat}.members`).length >= 3 &&
                    chat.sender !== "persons[2]" ? 
                    <Text 
                        style={{ 
                            marginBottom: metric/4, 
                            color: chat.sender !== "persons[2]" ? 
                            lightTheme.notSoDarkGrey : 
                            lightTheme.red , 
                            ...styles.headerCardText 
                        }}
                    >
                        {ObjectByString( props.db, `${chat.sender}.name`)}
                    </Text> :
                    null
                }
                <Text 
                    style={{ 
                        marginBottom: metric/2, 
                        color: chat.sender !== "persons[2]" ? 
                        lightTheme.notSoDarkGrey : 
                        lightTheme.red , 
                        ...styles.cardText 
                    }}
                >
                    {chat.message}
                </Text>
            </View>
        )
    )
    
    return (
        <View style={{flex: 1, backgroundColor: lightTheme.ligthGrey}}>
            <View style={{
                margin: metric, 
                marginHorizontal: metric + (metric/2), 
                ...styles.bottomWrapper
            }}>
                <View style={{flex: 1.5, marginRight: metric, ...styles.bottomWrapper}}>
                    {profileImage}
                    <View style={{marginLeft: metric/2}}>
                        <Text numberOfLines={1} style={{bottom: "-7.5%", ...styles.headerText}}>
                            {
                                ObjectByString(props.db, `${props.chat}.info`)
                                .filter(prop => prop.name != "Angelus")
                                .map(prop => prop.name)
                            }
                        </Text>
                        <Text numberOfLines={1} style={{ top: "-10%", ...styles.bodyText }}>
                            {
                                ObjectByString(props.db, `${props.chat}.info`)
                                .filter(prop => prop.name != "Angelus")
                                .map(prop => prop.bios)
                            }
                        </Text>
                    </View>
                </View>
                <View style={{alignItems: 'flex-end', ...styles.rightButtonsWrapper}}>
                    <TouchableOpacity style={{ marginLeft: wp("2.5%")}}>
                        <Icons name="Options" width={wp("3.3%")} height={wp("10%")} viewBox="208 0 208 625" fill="none" style={{
                            stroke: lightTheme.red,
                            strokeWidth:"33.1px",
                            strokeLinejoin: "round",
                            strokeMiterlimit:"1.5"
                        }}/>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={{width: "100%"}}>
                <View 
                    style={{
                        backgroundColor: lightTheme.ligthGrey
                    }}
                >
                    {chat}
                </View>
            </ScrollView>

            <InteligentButton 
                handleDecrementScreen={props.handleDecrementScreen} 
                screen="Chat"
            />
        </View>
    );
}

export default Chat;