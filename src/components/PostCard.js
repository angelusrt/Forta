import React, {useState, useRef} from 'react'
import {View, Text, TouchableOpacity, Pressable} from "react-native"
import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import Icons from "./../components/Icons"
import {lightTheme, styles} from "./../Styles"

function PostCard(props) {
    const pressableRef = useRef(null)
    
    //Set bottom icons active or not
    const[like, setLike] = useState(props.isOnModal ? props.like : false)

    const longPressBehaviour = () => {
        props.mode !== "FlagsFlag" ?
        !props.isOnModal ?
        pressableRef.current.measure((x, y, w, h, pX, pY) => {
            props.setModalInfos({
                bodyText: props.bodyText,
                mode: props.mode,
                name: props.name,
                owner: props.owner,
                mods: props.mods,
                forum: props.forum,
                forumName: props.forumName,
                title: props.title,
                rating: props.rating,
                post: props.post,
                comments: props.comments,
                isItPost: props.isItPost,
    
                like,
                pressInfos: {x, y, w, h, pX, pY},
                pressCondition,
                
                onFunction: props.onFunction,
                
                setLike: () => setLike(prev => !prev),
            })
            props.setIsModalActive(true)
        }) :
        null : 
        null
    }

    //Set different screens if different params matches
    const pressCondition = () => {
        if (props.isItPost && props.mode === "Normal") {
            props.setScreen("Post")
            props.setForum(props.forum)
            props.setPost(props.post)
        } else if (props.mode === "Flags") {
            props.setScreen("FlagsFlag")
            props.setFlagObj({
                isItPost: props.isItPost,
                post: props.post,
                comentaries: props.isItPost ? "" : props.comments,
                owner: props.owner,
                mods: props.mods
            })
        }
    }

    return (
        <Pressable 
            ref={pressableRef}
            onLongPress={longPressBehaviour}
            android_ripple={{color: lightTheme.ligthGrey}}
            onPress={pressCondition}
            style={[
                {marginBottom: wp(2.5)},
                styles.authCard
            ]}
        >
            <View style={{
                marginBottom: props.mode !== "FlagsFlag" ? wp("1.25%") : 0, 
                overflow: 'hidden',
                ...styles.bottomWrapper
            }}>
                {
                    props.mode !== "FlagsFlag" ?
                    <Text 
                        style={styles.headerText2} 
                        numberOfLines={1}
                    >
                        {`${props.name} at ${props.forumName || props.forum}`}
                    </Text> :
                    <Text 
                        style={styles.headerText2} 
                        numberOfLines={1}
                    >
                        {props.name}
                    </Text>
                }
            </View>

            {   
                props.title !== undefined &&
                <Text style={styles.headerText}>
                    {props.title}
                </Text>
            }

            <Text style={[
                {
                    marginBottom: wp("2.5%"), 
                    marginTop: wp("-0.625%")
                },
                styles.bodyText
            ]}>
                {props.bodyText}
            </Text>
            
            {
                props.mode !== "FlagsFlag" &&
                <View style={styles.bottomWrapper}>
                    <TouchableOpacity 
                        onPress={() => {
                            if(props.isOnModal) {
                                props.setLike()
                                setLike(prev => !prev)
                            } else {
                                setLike(prev => !prev)
                            }
                            
                        }}
                        style={{
                            paddingRight: wp("2.5%"), 
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
                                stroke: like ? lightTheme.green : 
                                lightTheme.notSoDarkGrey,
                                strokeLinejoin: "round",
                                strokeWidth:"15.9px",
                                transform: [{ rotate: "90deg" }]
                            }}
                        />
                        <Text style={[
                            {
                                color: like ? lightTheme.green : 
                                lightTheme.notSoDarkGrey, 
                                marginBottom: wp("0.625%")
                            },
                            styles.rateText
                        ]}>
                            {props.rating + (like && 1)}
                        </Text>
                    </TouchableOpacity>
                </View> 
            }
        </Pressable>
    )
}

export default PostCard