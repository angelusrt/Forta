import React, {useState, useEffect} from 'react'
import _reactNative, {View, ScrollView, Text, TouchableOpacity} from "react-native"
import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import Icons from "./../components/Icons"
import InteligentButton from "../components/InteligentButton.js"
import {iconStyles, lightTheme, styles} from "./../Styles.js"

function Chat(props) {
    const[chat, setChat] = useState({})
    const[messages, setMessages] = useState([])
    const[message, setMessage] = useState("")
    const[resolved, setResolved] = useState(false)
    const metric = wp("5%")
    
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
            setMessages(data.messages.map((chat, index) => 
                <View key={index} style={{
                    borderRadius: 20, 
                    padding: metric,
                    paddingBottom: metric/3*2,
                    marginBottom: metric/4, 
                    borderBottomLeftRadius: chat.author !== props.myInfos.id ? 0 : 20,
                    borderBottomRightRadius: chat.author !== props.myInfos.id ? 20 : 0, 
                    marginLeft: chat.author !== props.myInfos.id ? metric/2 : metric * 3,  
                    marginRight: chat.author !== props.myInfos.id ? metric * 3 : metric/2,
                    ...styles.card,
                }}>
                    <Text style={{ 
                        marginBottom: metric/2, 
                        color: chat.author !== props.myInfos.id ? 
                        lightTheme.notSoDarkGrey : 
                        lightTheme.red , 
                        ...styles.cardText 
                    }}>
                        {chat.message}
                    </Text>
                </View>
            ))
            setResolved(true)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {getChat()},[])
    
    const onTryToPost = async () => {
        const httpEnvelopePost = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'auth-token': props.token
            },
            body: JSON.stringify({message})
        }

        await fetch(`http://192.168.0.106:3000/api/chats/${props.chat}/messages`, httpEnvelopePost)
        .then(res => res.json())
        .then(() => getChat())
        .catch(err => err)
    
        setMessage("")
    }   

    const verify = async () => message.length > 0 ? onTryToPost() : setMessage("")

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
                            <View style={{
                                width: metric * 2,
                                height: metric * 2,
                                backgroundColor: lightTheme.yellow,
                                borderRadius: 10, 
                            }}/>
                            <View style={{marginLeft: metric/2}}>
                                <Text numberOfLines={1} style={{bottom: "-7.5%", ...styles.headerText}}>
                                    {chat.members.filter(mem => mem.member !== props.myInfos.id)[0].member}
                                </Text>
                                <Text numberOfLines={1} style={{ top: "-10%", ...styles.bodyText }}>
                                    {chat.members.filter(mem => mem.member !== props.myInfos.id)[0].member}
                                </Text>
                            </View>
                        </View>
                        <View style={{alignItems: 'flex-end', ...styles.rightButtonsWrapper}}>
                            <TouchableOpacity style={{ marginLeft: wp("2.5%")}}>
                                <Icons 
                                    name="Options" 
                                    width={wp("3.3%")} 
                                    height={wp("10%")} 
                                    viewBox="208 0 208 625" 
                                    fill="none" 
                                    style={iconStyles.icon5}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ScrollView contentContainerStyle={{width: "100%"}}>
                        <View style={{backgroundColor: lightTheme.ligthGrey, paddingBottom: wp("25%")}}>
                            {messages}
                        </View>
                    </ScrollView>
                    <InteligentButton 
                        token={props.token}
                        message={message}
                        setMessage={message => setMessage(message)}
                        verify={() => verify()}
                        handleDecrementScreen={props.handleDecrementScreen}
                        screen="Chat"
                    />
                </React.Fragment> :
                <Text>Carregando...</Text>
            }
        </View>
    )
}

export default Chat