import React, {useState, useEffect} from 'react';
import _reactNative, { View, ScrollView, Text, TouchableOpacity, Platform} from "react-native"

import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import Icons from "./../components/Icons";

import { lightTheme, styles } from "./../Styles.js";
import PostCard from "./../components/PostCard";
import InteligentButton from "../components/InteligentButton.js";
import ObjectByString from "../components/ObjectByString";

function Chat(props) {
    const[chat, setChat] = useState({})
    const[messages, setMessages] = useState([])
    const[resolved, setResolved] = useState(false)
    const metric = wp("5%")

    let profileImage = 
        <View style={{
            width: metric * 2,
            height: metric * 2,
            backgroundColor: lightTheme.yellow,
            borderRadius: 10, 
        }}/>
    
    const httpEnvelope = {
        method: "GET",
        headers: {
            'accept-encoding': 'gzip, deflate, br',
            accept: '*/*',
            connection: 'keep-alive',
            host: 'localhost:3000',
            'auth-token': props.token
        }
    }

    const getChat = async () => {
        await fetch(`http://192.168.0.106:3000/api/chats/${props.chat}`, httpEnvelope)
        .then(res => res.json())
        .then(data => {
            setChat(data)
            console.log(data)
            setMessages( data.messages.map((chat, index) => (
                <View 
                    key={index}
                    style={{
                        borderRadius: 20, 
                        padding: metric,
                        paddingBottom: metric/3*2,
                        marginBottom: metric/4,
                        //marginVertical: metric/4,
                        //borderWidth: 
                        borderBottomLeftRadius: chat.author !== props.myInfos.id ? 0 : 20,
                        borderBottomRightRadius: chat.author !== props.myInfos.id ? 20 : 0, 
                        marginLeft: chat.author !== props.myInfos.id ? metric/2 : metric * 3,  
                        marginRight: chat.author !== props.myInfos.id ? metric * 3 : metric/2,
                        ...styles.card,
                        //...styles.card2
                    }}
                >
                    <Text 
                        style={{ 
                            marginBottom: metric/2, 
                            color: chat.author !== props.myInfos.id ? 
                            lightTheme.notSoDarkGrey : 
                            lightTheme.red , 
                            ...styles.cardText 
                        }}
                    >
                        {chat.message}
                    </Text>
                </View>
            )))
            setResolved(true)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getChat()
    },[])
    
    return (
        <View style={{flex: 1, backgroundColor: lightTheme.ligthGrey}}>
            { resolved ?
                <React.Fragment>
                    <View style={{
                        margin: metric, 
                        marginHorizontal: metric + (metric/2), 
                        ...styles.bottomWrapper
                    }}>
                        <View style={{flex: 1.5, marginRight: metric, ...styles.bottomWrapper}}>
                            {profileImage}
                            <View style={{marginLeft: metric/2}}>
                                <Text numberOfLines={1} style={{bottom: "-7.5%", ...styles.headerText}}>
                                    { chat.members.filter(mem => mem.member !== props.myInfos.id)[0].member }
                                </Text>
                                <Text numberOfLines={1} style={{ top: "-10%", ...styles.bodyText }}>
                                    { chat.members.filter(mem => mem.member !== props.myInfos.id)[0].member }
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
                            {messages}
                        </View>
                    </ScrollView>
                </React.Fragment> :
                <Text>Carregando...</Text>
            }

            <InteligentButton 
                handleDecrementScreen={props.handleDecrementScreen} 
                screen="Chat"
            />
        </View>
    );
}

export default Chat;