import React, {useState, useEffect} from 'react'
import _reactNative, {View, ScrollView, Text} from "react-native"
import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import Refresh from "../components/Refresh"
import InteligentButton from "../components/InteligentButton.js"
import {lightTheme, styles} from "./../Styles.js"

function Chat(props) {
    //Shows react element only resolved is true
    const[resolved, setResolved] = useState(false)

    //Stores chat infos
    const[chat, setChat] = useState({})

    //Stores messages components
    const[messages, setMessages] = useState([])
    
    //Stores message that'll be sent
    const[message, setMessage] = useState("")
    
    //Global width metric
    const metric = wp("5%")

    //Gets messages
    const getChat = async () => {
        await fetch(`http://192.168.0.111:3000/api/chats/${props.chat}`, props.getEnvelope)
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

    //Posts message
    const onPost = async () => {
        const httpEnvelopePost = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'auth-token': props.token
            },
            body: JSON.stringify({message})
        }

        await fetch(`http://192.168.0.111:3000/api/chats/${props.chat}/messages`, httpEnvelopePost)
        .then(res => res.json())
        .then(() => getChat())
        .catch(err => err)
    
        setMessage("")
    }

    //If param matches, fulfills post
    const verify = async () => message.length > 0 ? onPost() : setMessage("")

    //Updates get chat
    useEffect(() => {getChat()},[])

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
                    </View>

                    <ScrollView contentContainerStyle={{width: "100%"}}>
                        <View style={{backgroundColor: lightTheme.ligthGrey, paddingBottom: wp("25%")}}>
                            {messages}
                        </View>
                    </ScrollView>
                    <InteligentButton 
                        token={props.token}
                        
                        message={message}
                        screen="Chat"
                        
                        setPrevScreen={props.setPrevScreen}
                        
                        setMessage={message => setMessage(message)}
                        verify={verify}
                    />
                </React.Fragment> :
                <Refresh/>
            }
        </View>
    )
}

export default Chat