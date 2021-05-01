import React, {useState} from 'react'
import {View, Text, TouchableOpacity, Pressable} from "react-native"
import Modal from 'react-native-modal'
import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import Icons from "./../components/Icons"
import {iconStyles, lightTheme, styles} from "./../Styles"

function Options(props) {
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
                                name="Add" 
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
                                Selecionar
                            </Text>
                        </Pressable>
                        <Pressable 
                            android_ripple={{color: lightTheme.ligthGrey}} 
                            style={styles.optionButtons}
                        >
                            <Icons 
                                name="Share" 
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
                                Compartilhar
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

function InviteButtons(props) {
    const[accept, setAccept] = useState(false)
    const[deny, setDeny] = useState(false)

    return(
        <React.Fragment>
            <Text style={styles.bodyText2}>{props.lastSaw}</Text>
            <TouchableOpacity onPress={() => setAccept(!accept)}>
                <Icons 
                    name="Accept" 
                    width={wp("10%")} 
                    height={wp("10%")} 
                    viewBox="0 0 300 300" 
                    fill="none" 
                    style={{
                        stroke: accept?lightTheme.green:lightTheme.darkGrey,
                        strokeWidth: "15.9px",
                        strokeLinejoin: "round",
                        strokeMiterlimit:"1.5"
                    }
                }/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDeny(!deny)}>
                <Icons 
                    name="Remove" 
                    width={wp("10%")} 
                    height={wp("10%")} 
                    viewBox="0 0 300 300" 
                    fill="none" 
                    style={{
                        stroke: deny?lightTheme.red:lightTheme.darkGrey,
                        strokeWidth:"15.9px",
                        strokeLinejoin: "round",
                        strokeMiterlimit:"1.5"
                    }
                }/>
            </TouchableOpacity>
        </React.Fragment>
    )
}

function ContactCard(props) {
    const[isModalVisible, setModalVisible] = useState(false)

    return (
        <View>
            <Pressable 
                onLongPress={() => props.mode === "Forum" ? setModalVisible(true) : null} 
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

                    <Text style={styles.bodyText4} numberOfLines={1}>{props.subtitle}</Text>
                </View>
                
                <View style={styles.rightButtonsWrapper}>
                    {   
                        props.mode === "Invite" ?
                        <InviteButtons/> :
                        props.mode !== "User" ?
                        <ForumAndChatButtons 
                            favorite={props.favorite}
                        />: null
                    }
                </View>
            </Pressable>
            <Options
                isModalVisible={isModalVisible}
                setModalVisible={prop => setModalVisible(prop)}
            />
        </View>
    )
}

export default ContactCard