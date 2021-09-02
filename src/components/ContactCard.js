import React, {useState, useRef} from 'react'
import {View, Text, TouchableOpacity, Pressable} from "react-native"
import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import Icons from "./../components/Icons"
import {lightTheme, styles} from "./../Styles"

function ForumAndChatButtons(props) {
    return(
        <React.Fragment>
            <TouchableOpacity onPress={props.setFavorite}>
                <Icons 
                    name="Star" 
                    width={wp("10%")} 
                    height={wp("10%")} 
                    viewBox="0 0 625 625" 
                    fill="none" 
                    style={{
                        stroke: props.favorite ? 
                        lightTheme.yellow : 
                        lightTheme.darkGrey,
                        strokeWidth:"33.1px",
                        strokeLinejoin: "round",
                        strokeMiterlimit:"1.5"
                    }}
                />
            </TouchableOpacity>
        </React.Fragment>
    )
}

function ModButtons(props) {
    //Deny setter
    const[deny, setDeny] = useState(false)

    //Envelope used to delete mod
    const deleteEnvelope = {
        method: "DELETE",
        headers: {
            'accept-encoding': 'gzip, deflate, br',
            connection: 'keep-alive',
            host: "forta-forum.herokuapp.com",
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': props.token
        },
        body: JSON.stringify({mods: [{mod: props.user}]})
    }

    //Removes mod
    const onRemove = async () => {
        setDeny(true)

        await fetch(`${props.site}/api/forums/${props.forum}/mods`, 
        deleteEnvelope)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    return(
        <React.Fragment>
            {
                props.myInfos.id === props.owner && props.stats ? 
                <TouchableOpacity onPress={() => !deny ? onRemove() : null}>
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
                null
            } 
        </React.Fragment>
    )
}

function InviteUserButtons(props) {
    //Accept setter
    const[accept, setAccept] = useState(false)
    
    //Sends invite
    const onPost = async () => {
        setAccept(true)

        if(props.description === "chat"){
            const postEnvelope = {
                method: "POST",
                headers: {
                    'accept-encoding': 'gzip, deflate, br',
                    connection: 'keep-alive',
                    host: "forta-forum.herokuapp.com",
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': props.token
                },
                body: JSON.stringify({user: props.user})
            }

            await fetch(`${props.site}/api/chats/`, postEnvelope)
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

        } else if(props.description === "mod"){
            const patchEnvelope = {
                method: "PATCH",
                headers: {
                    'accept-encoding': 'gzip, deflate, br',
                    connection: 'keep-alive',
                    host: "forta-forum.herokuapp.com",
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': props.token
                },
                body: JSON.stringify({mods: [{mod: props.user}]})
            }
            
            await fetch(`${props.site}/api/forums/${props.forum}/mods`, patchEnvelope)
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
        } 
    }

    return(
        <React.Fragment>
            <TouchableOpacity onPress={() => !accept ? onPost() : null}>
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
    //Accept and deny setters
    const[accept, setAccept] = useState(false)
    const[deny, setDeny] = useState(false)

    //Deletes invite
    const onRemoveInvite = async () => {
        await fetch(`${props.site}/api/invites/${props.invite}`, 
        props.deleteEnvelope)
        .then(res => res.json())
        .then(data => props.onFunction())
        .catch(err => console.log(err))
    }

    //Accepts invite
    const onUpdate = async () => {
        setAccept(true)
        
        if (props.description === "chat") {
            await fetch(`${props.site}/api/chats/${props.path}`, 
            props.patchEnvelope)
            .then(res => res.json())
            .then(data => data === "Updated" ? onRemoveInvite() : null)
            .catch(err => console.log(err))
        } else if (props.description === "mod") {
            await fetch(`${props.site}/api/forums/${props.path}/mods`, 
            props.patchEnvelope)
            .then(res => res.json())
            .then(data => data === "Updated" ? onRemoveInvite() : null)
            .catch(err => console.log(err))
        } else {
            await fetch(`${props.site}/api/groups/${props.path}/pendent`, 
            props.patchEnvelope)
            .then(res => res.json())
            .then(data => data === "Updated" ? onRemoveInvite() : null)
            .catch(err => console.log(err))
        }
    }

    //Denies invite
    const onRemove = async () => {
        setDeny(true)

        if(props.description === "chat"){
            await fetch(`${props.site}/api/chats/${props.path}`, 
            props.deleteEnvelope)
            .then(res => res.json())
            .then(data => data === "Removed" ? onRemoveInvite() : null)
            .catch(err => console.log(err))
        
        } else if(props.description === "mod"){
            const deleteEnvelope = {
                method: "DELETE",
                headers: {
                    'accept-encoding': 'gzip, deflate, br',
                    connection: 'keep-alive',
                    host: "forta-forum.herokuapp.com",
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': props.token
                },
                body: JSON.stringify({mods: [{mod: props.receiver}]})
            }
            
            await fetch(`${props.site}/api/forums/${props.path}/mods`, 
            deleteEnvelope)
            .then(res => res.json())
            .then(data => data === "Removed" ? onRemoveInvite() : null)
            .catch(err => console.log(err))
        
        } else {
            await fetch(`${props.site}/api/groups/${props.path}/pendent`, 
            props.deleteEnvelope)
            .then(res => res.json())
            .then(data => data === "Removed" ? onRemoveInvite() : null)
            .catch(err => console.log(err))
        }
    }

    return(
        <React.Fragment>
            {
                props.isSender ? 
                <TouchableOpacity onPress={() => !deny ? onRemove() : null}>
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
                    <TouchableOpacity onPress={() => !accept && !deny ? onUpdate() : null}>
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
                    <TouchableOpacity onPress={() => !accept && !deny ? onRemove() : null}>
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
    const pressableRef = useRef(null)
    
    const[favorite, setFavorite] = useState(props.favorite || false)

    const pressCondition = () => {
        if (props.mode === "Chat") {
            props.setScreen(props.mode)    
            props.setChat(props.chat)
        } else if (props.mode === "Forum") {
            props.setScreen(props.mode)    
            props.setForum(props.forum)
        }
    }

    const longPressBehaviour = () => {
        !props.isOnModal ?
        props.mode === "Forum" ? 
        pressableRef.current.measure((x, y, w, h, pX, pY) => {
            props.setModalInfos({
                subtitle: props.subtitle,
                mode: props.mode,
                owner: props.owner,
                mods: props.mods,
                forum: props.forum,
                title: props.title,
                
                favorite,
                pressInfos: {x, y, w, h, pX, pY},
                pressCondition,

                onFunction: props.onFunction,

                setFavorite: () => setFavorite(prev => !prev),
            })
            props.setIsModalActive(true)
        }) :
        props.mode === "Chat" ?
        pressableRef.current.measure((x, y, w, h, pX, pY) => {
            props.setModalInfos({
                title: props.title,
                subtitle: props.subtitle,
                mode: props.mode,
                chat: props.chat,
                
                favorite,
                pressInfos: {x, y, w, h, pX, pY},
                pressCondition,

                onFunction: props.onFunction,

                setFavorite: () => setFavorite(prev => !prev),
            })
            props.setIsModalActive(true)
        }) :
        null :
        null
    }
    //Jumps to the aproppriate InviteButtons if matches case
    let buttons
    switch (props.mode) {
        case "Invite":
            buttons = (
                <InviteButtons 
                    site={props.site}
                    token={props.token}
                    invite={props.invite}
                    path={props.path}
                    isSender={props.isSender}
                    receiver={props.receiver}
                    description={props.description}
                    patchEnvelope={props.patchEnvelope}
                    deleteEnvelope={props.deleteEnvelope}

                    onFunction={props.onFunction}
                />
            )        
            break
        case "Mod":
            buttons = (
                <ModButtons
                    site={props.site}
                    token={props.token}
                    myInfos={props.myInfos}
                    user={props.user}
                    owner={props.owner}
                    stats={props.stats}
                />
            )
            break
        case "User":
            buttons = (
                <InviteUserButtons
                    site={props.site}
                    token={props.token}
                    user={props.user}
                    forum={props.forum}
                    description={props.description}
                /> 
            )
            break
        default: 
            buttons = (
                <ForumAndChatButtons 
                    favorite={favorite}

                    setFavorite={() => {
                        if(props.isOnModal) {
                            props.setFavorite()
                            setFavorite(prev => !prev)
                        } else {
                            setFavorite(prev => !prev)
                        }
                        
                    }}
                />
            )
            break
    }

    return (
        <React.Fragment>
            <Pressable 
                ref={pressableRef}
                onLongPress={longPressBehaviour} 
                android_ripple={{color: lightTheme.ligthGrey}}
                onPress={pressCondition}
                style={[
                    {marginBottom: wp(2.5)},
                    styles.authCard,
                    styles.bottomWrapper
                ]}
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
                            props.description === 'mod' ? "Convidaste para ser mod" :
                            props.description === 'chat' ? "Convidaste para conversar" :
                            props.description === 'group' ? "Convidaste para um grupo" :
                            "Erro" 
                        }
                    </Text>
                </View>
                
                <View style={styles.rightButtonsWrapper}>
                    {buttons}
                </View>
            </Pressable>
        </React.Fragment>
    )
}

export default ContactCard