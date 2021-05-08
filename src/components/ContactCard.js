import React, {useState} from 'react'
import {View, Text, TouchableOpacity, Pressable} from "react-native"
import Modal from 'react-native-modal'
import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import Icons from "./../components/Icons"
import {iconStyles, lightTheme, styles} from "./../Styles"

function Options(props) {
    const deleteForum = async() => {
        await fetch(`http://192.168.0.106:3000/api/forums/${props.forum}`, props.deleteEnvelope)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Modal 
                animationType="fade"
                backdropOpacity={0.25}
                isVisible={props.isModalVisible}
                testID={'modal'}
                animationIn="zoomInDown"
                animationOut="zoomOut"
                animationInTiming={300}
                animationOutTiming={300}
                backdropTransitionInTiming={300}
                backdropTransitionOutTiming={300}
                statusBarTranslucent={true}
                onBackdropPress={() => props.setModalVisible(false)}
            >
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <View style={{
                        zIndex: 3,
                        ...styles.options
                    }}>
                        <Pressable 
                            android_ripple={{color: lightTheme.ligthGrey}}
                            style={styles.optionButtons}
                        >
                            <Icons 
                                name="Bios" 
                                width={wp("10%")} 
                                height={wp("10%")} 
                                viewBox="0 0 625 625" 
                                fill="none" 
                                style={iconStyles.icon2}
                            />
                            <Text style={{
                                marginLeft: wp("1.25%"),
                                ...styles.headerText
                            }}>
                                Regras
                            </Text>
                        </Pressable>
                        <Pressable 
                            android_ripple={{color: lightTheme.ligthGrey}}
                            style={styles.optionButtons}
                        >
                            <Icons 
                                name="Comentaries" 
                                width={wp("10%")} 
                                height={wp("10%")} 
                                viewBox="0 0 625 625" 
                                fill="none" 
                                style={iconStyles.icon2}
                            />
                            <Text style={{
                                marginLeft: wp("1.25%"),
                                ...styles.headerText
                            }}>
                                Mods
                            </Text>
                        </Pressable>
                        <Pressable 
                            android_ripple={{color: lightTheme.ligthGrey}}
                            style={styles.optionButtons}
                        >
                            <Icons 
                                name="Remove" 
                                width={wp("10%")} 
                                height={wp("10%")} 
                                viewBox="0 0 300 300"
                                fill="none" 
                                style={iconStyles.icon1}
                            />
                            <Text style={styles.headerText}>Denunciar</Text>
                        </Pressable>
                        {
                            props.owner === props.myInfos.id ? 
                            <Pressable 
                                android_ripple={{color: lightTheme.ligthGrey}}
                                onPress={() => deleteForum()}
                                style={styles.optionButtons}
                            >
                                <Icons 
                                    name="Remove" 
                                    width={wp("10%")} 
                                    height={wp("10%")} 
                                    viewBox="0 0 300 300" 
                                    fill="none" 
                                    style={iconStyles.icon1}
                                />
                                <Text style={styles.headerText}>Excluir</Text>
                            </Pressable> : null
                        }
                    </View>
                </View>
            </Modal>
        </View>
    )
}

function ChatOptions(props) {
    const deleteChat = async() => {
        await fetch(`http://192.168.0.106:3000/api/chats/${props.chat}`, props.deleteEnvelope)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Modal 
                animationType="fade"
                backdropOpacity={0.25}
                isVisible={props.isModalVisible}
                testID={'modal'}
                animationIn="zoomInDown"
                animationOut="zoomOut"
                animationInTiming={300}
                animationOutTiming={300}
                backdropTransitionInTiming={300}
                backdropTransitionOutTiming={300}
                statusBarTranslucent={true}
                onBackdropPress={() => props.setModalVisible(false)}
            >
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <View style={{
                        zIndex: 3,
                        ...styles.options
                    }}>
                        <Pressable 
                            android_ripple={{color: lightTheme.ligthGrey}}
                            onPress={() => deleteChat()}
                            style={styles.optionButtons}
                        >
                            <Icons 
                                name="Remove" 
                                width={wp("10%")} 
                                height={wp("10%")} 
                                viewBox="0 0 300 300" 
                                fill="none" 
                                style={iconStyles.icon1}
                            />
                            <Text style={styles.headerText}>Excluir</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

function ForumAndChatButtons(props) {
    const[favoriteActive, setFavoriteActive] = useState(props.favorite === 0 ? false: true)

    return(
        <React.Fragment>
            <TouchableOpacity onPress={() => setFavoriteActive(!favoriteActive)}>
                <Icons 
                    name="Star" 
                    width={wp("10%")} 
                    height={wp("10%")} 
                    viewBox="0 0 625 625" 
                    fill="none" 
                    style={{
                        stroke: favoriteActive?lightTheme.yellow:lightTheme.darkGrey,
                        strokeWidth:"33.1px",
                        strokeLinejoin: "round",
                        strokeMiterlimit:"1.5"
                    }}
                />
            </TouchableOpacity>
        </React.Fragment>
    )
}

function InviteUserButtons(props) {
    const[accept, setAccept] = useState(false)
    const httpEnvelopePost = {
        method: "POST",
        headers: {
            'accept-encoding': 'gzip, deflate, br',
            connection: 'keep-alive',
            host: 'localhost:3000',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': props.token
        },
        body: JSON.stringify({user: props.user})
    }
    console.log(props.user)
    const invite = async () => {
        setAccept(true)
        await fetch(`http://192.168.0.106:3000/api/chats/`, httpEnvelopePost)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    return(
        <React.Fragment>
            <TouchableOpacity onPress={() => !accept ? invite() : null}>
                <Icons 
                    name="Invite" 
                    width={wp("10%")} 
                    height={wp("10%")} 
                    viewBox="0 0 625 625" 
                    fill="none" 
                    style={{
                        stroke: accept ? lightTheme.green : lightTheme.darkGrey,
                        strokeWidth: "33.1px",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeMiterlimit: "1.5"
                    }}
                />
            </TouchableOpacity> 
        </React.Fragment>
    )
}

function InviteButtons(props) {
    const[accept, setAccept] = useState(false)
    const[deny, setDeny] = useState(false)
    
    const clearInvite = async () => {
        await fetch(`http://192.168.0.106:3000/api/invites/${props.invite}`, props.deleteEnvelope)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    const update = async () => {
        setAccept(true)
        
        if(props.description === "chat"){
            await fetch(`http://192.168.0.106:3000/api/chats/${props.path}`, props.patchEnvelope)
            .then(res => res.json())
            .then(data => data === "Updated" ? clearInvite() : null)
            .catch(err => console.log(err))
        } else if(props.description === "forum"){
            await fetch(`http://192.168.0.106:3000/api/forums/${props.path}/mods`, props.patchEnvelope)
            .then(res => res.json())
            .then(data => data === "Updated" ? clearInvite() : null)
            .catch(err => console.log(err))
        } else {
            await fetch(`http://192.168.0.106:3000/api/groups/${props.path}/pendent`, props.patchEnvelope)
            .then(res => res.json())
            .then(data => data === "Updated" ? clearInvite() : null)
            .catch(err => console.log(err))
        }
    }

    const clear = async () => {
        setDeny(true)

        if(props.description === "chat"){
            await fetch(`http://192.168.0.106:3000/api/chats/${props.path}`, props.deleteEnvelope)
            .then(res => res.json())
            .then(data => data === "Removed" ? clearInvite() : null)
            .catch(err => console.log(err))
        } else if(props.description === "forum"){
            await fetch(`http://192.168.0.106:3000/api/forums/${props.path}/mods`, props.deleteEnvelope)
            .then(res => res.json())
            .then(data => data === "Removed" ? clearInvite() : null)
            .catch(err => console.log(err))
        } else {
            await fetch(`http://192.168.0.106:3000/api/groups/${props.path}/pendent`, props.deleteEnvelope)
            .then(res => res.json())
            .then(data => data === "Removed" ? clearInvite() : null)
            .catch(err => console.log(err))
        }
    }

    return(
        <React.Fragment>
            {
                props.isSender ? 
                <TouchableOpacity onPress={() => !deny ? clear() : null}>
                    <Icons 
                        name="Remove" 
                        width={wp("10%")} 
                        height={wp("10%")} 
                        viewBox="0 0 300 300" 
                        fill="none" 
                        style={{
                            stroke: deny ? lightTheme.red : lightTheme.darkGrey,
                            strokeWidth:"15.9px",
                            strokeLinejoin: "round",
                            strokeMiterlimit:"1.5"
                        }}
                    />
                </TouchableOpacity> :
                <React.Fragment>
                    <TouchableOpacity onPress={() => !accept && !deny ? update() : null}>
                        <Icons 
                            name="Accept" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={{
                                stroke: accept ? lightTheme.green : lightTheme.darkGrey,
                                strokeWidth: "15.9px",
                                strokeLinejoin: "round",
                                strokeMiterlimit:"1.5"
                            }
                        }/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => !accept && !deny ? clear() : null}>
                        <Icons 
                            name="Remove" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={{
                                stroke: deny ? lightTheme.red : lightTheme.darkGrey,
                                strokeWidth:"15.9px",
                                strokeLinejoin: "round",
                                strokeMiterlimit:"1.5"
                            }
                        }/>
                    </TouchableOpacity>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

function ContactCard(props) {
    const[isModalVisible, setModalVisible] = useState(false)
    
    return (
        <View>
            <Pressable 
                onLongPress={() => {
                    props.mode === "Forum" || props.mode === "Chat" ? 
                    setModalVisible(true) : null
                }} 
                android_ripple={{color: lightTheme.ligthGrey}}
                onPress={() => {
                    props.mode === "Chat" || props.mode === "Forum" ? 
                    props.handleScreenList(props.mode) : null
                    props.mode === "Forum" ? props.handleForum(props.forum) :
                    props.mode === "Chat" ? props.handleChat(props.chat) :
                    null 
                }}
                style={{
                    borderRadius: 20, 
                    overflow: 'visible', 
                    padding: wp("5%"), 
                    marginHorizontal: wp("2.5%"),
                    marginBottom: wp("1.25%"),
                    zIndex: 0,
                    elevation: 0,
                    ...styles.card, 
                    ...styles.bottomWrapper
                }}
            >
                <View style={{
                    width: wp("10%"),
                    height: wp("10%"),
                    backgroundColor: lightTheme.notSoLightGrey,
                    borderRadius: 10, 
                }}/>

                <View style={{flex: 2, marginRight: wp("5%"), marginLeft: wp("2.5%")}}>
                    <Text style={styles.headerText4} numberOfLines={1}>{props.title}</Text>

                    <Text style={styles.bodyText4} numberOfLines={1}>
                        {
                            !props.isSender ? props.subtitle : 
                            props.description === 'mod' ? "Você convidou como mod!" :
                            props.description === 'chat' ? "Você convidou para conversar!" :
                            props.description === 'group' ? "Você convidou para um grupo!" :
                            "Erro" 
                        }
                    </Text>
                </View>
                
                <View style={styles.rightButtonsWrapper}>
                    {   
                        props.mode === "Invite" ?
                        <InviteButtons 
                            patchEnvelope={props.patchEnvelope}
                            deleteEnvelope={props.deleteEnvelope}
                            isSender={props.isSender}
                            invite={props.invite} 
                            description={props.description}
                            path={props.path}
                        /> :
                        props.mode !== "User" ?
                        <ForumAndChatButtons 
                            favorite={props.favorite}
                        /> :
                        <InviteUserButtons
                            user={props.user}
                            token={props.token}
                        /> 
                    }
                </View>
            </Pressable>
            {
                props.mode === "Forum" ?
                <Options
                    isModalVisible={isModalVisible}
                    setModalVisible={prop => setModalVisible(prop)}
                    deleteEnvelope={props.deleteEnvelope}
                    myInfos={props.myInfos}
                    owner={props.owner}
                    forum={props.forum}
                /> :
                <ChatOptions
                    isModalVisible={isModalVisible}
                    setModalVisible={prop => setModalVisible(prop)}
                    deleteEnvelope={props.deleteEnvelope}
                    chat={props.chat}
                /> 
            }
        </View>
    )
}

export default ContactCard