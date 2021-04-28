import React, {useState} from 'react'
import {View, Text, TouchableOpacity, Pressable} from "react-native"
import Modal from 'react-native-modal'
import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import Icons from "./../components/Icons"
import {lightTheme, styles, iconStyles} from "./../Styles"

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
                                name="Star" 
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
                                Salvar
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

function PostCard(props) {
    const[like, setLike] = useState(false)
    const[comment, setComment] = useState(false)
    const[share, setShare] = useState(false)
    const[isModalVisible, setModalVisible] = useState(false)

    return (
        <View>
            <Pressable 
                onLongPress={() => setModalVisible(true)}
                android_ripple={{color: lightTheme.ligthGrey}}
                onPress={() => { if (props.title !== null) {
                    props.handleScreenList("Post")
                    props.handlePostList(props.post)
                    props.handleForum(props.forum)
                }}}
                style={{borderRadius: 20, ...styles.postCard}}
            >
                {props.title !== null ?
                    <Text style={{
                        marginBottom: wp("1.25%"), 
                        ...styles.headerText
                    }}>
                        {props.title}
                    </Text>: null
                }
                <Text style={{marginBottom: wp("2.5%"), ...styles.bodyText}}>
                    {props.bodyText}
                </Text>

                <View style={{
                    marginBottom: wp("5%"), 
                    overflow: 'hidden',
                    ...styles.bottomWrapper
                }}>
                    <Text style={{marginRight: wp("1.25%"),...styles.headerText2}} numberOfLines={1}>{props.name}</Text>
                    <Text style={styles.bodyText2} numberOfLines={1}>{`at ${props.forumName || props.forum}`}</Text>
                </View>

                <View style={styles.bottomWrapper}>
                    <TouchableOpacity 
                        onPress={() => setLike(!like)}
                        style={{
                            paddingRight: wp("5%"), 
                            marginLeft: -wp("1.5%"), 
                            ...styles.bottomWrapper
                        }}
                    >
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={{
                                stroke: like ? lightTheme.green : lightTheme.notSoDarkGrey,
                                strokeLinejoin: "round",
                                strokeWidth:"15.9px",
                                transform: [{ rotate: "90deg" }]
                            }}
                        />
                        <Text style={{
                            color: lightTheme.notSoDarkGrey, 
                            marginBottom: wp("0.625%"), 
                            ...styles.rateText
                        }}>
                            {props.rating + (like && 1)}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => setComment(!comment)}
                        style={{paddingRight: wp("5%"), ...styles.bottomWrapper}}
                    >
                        <Icons 
                            name="Comentaries" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 625 625" 
                            fill="none" 
                            style={{
                                stroke: comment ? lightTheme.red : lightTheme.notSoDarkGrey,
                                strokeWidth:"33.1px",
                                strokeLinejoin: "round",
                                strokeMiterlimit:"1.5"
                            }}
                        />
                        <Text style={{
                            color: lightTheme.notSoDarkGrey, 
                            marginBottom: wp("0.625%"), 
                            ...styles.rateText
                        }}>
                            {props.rating + (comment && 1)}
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        onPress={() => setShare(!share)}
                        style={styles.bottomWrapper}
                    >
                        <Icons 
                            name="Share" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 625 625" 
                            fill="none" 
                            style={{
                                stroke: share ? lightTheme.yellow : lightTheme.notSoDarkGrey,
                                strokeWidth:"33.1px",
                                strokeLinejoin: "round",
                                strokeMiterlimit:"1.5"
                            }}
                        />
                        <Text style={{
                            color: lightTheme.notSoDarkGrey, 
                            marginBottom: wp("0.625%"), 
                            ...styles.rateText
                        }}>
                            {props.rating + (share && 1)}
                        </Text>
                    </TouchableOpacity>
                </View> 
            </Pressable>
            <Options 
                isModalVisible={isModalVisible}
                setModalVisible={prop => setModalVisible(prop)}
            />
        </View>
    )
}

export default PostCard