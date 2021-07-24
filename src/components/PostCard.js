import React, {useState} from 'react'
import {View, Text, TouchableOpacity, Pressable} from "react-native"
import Modal from 'react-native-modal'
import {widthPercentageToDP as wp} from "react-native-responsive-screen"
import {Shadow} from "react-native-shadow-2"

import Icons from "./../components/Icons"
import {lightTheme, styles, iconStyles} from "./../Styles"

function Options(props) {
    //Deletes Post
    const onDeletePost = async() => {
        await fetch(`${props.site}/api/forums/${props.forum}/posts/${props.post}`, 
        props.deleteEnvelope)
        .then(res => res.json())
        .then(data => {
            props.setModalVisible(false)
            props.onFunction()
        })
        .catch(err => console.log(err))
    }

    //Deletes comments
    const onDeleteComments = async() => {
        await fetch(`${props.site}/api/forums/${props.forum}/posts/${props.post}/comentaries/${props.comments}`, 
        props.deleteEnvelope)
        .then(res => res.json())
        .then(data => {
            props.setModalVisible(false)
            props.onFunction()
        })
        .catch(err => console.log(err))
    }

    //Deletes flag
    const onDeleteFlag = async () => {
        props.isItPost ? 
        await fetch(`${props.site}/api/forums/${props.forum}/flags/${props.isItPost}/${props.post}/0/0`, 
        props.deleteEnvelope)
        .then(res => res.json())
        .then(data => props.setPrevScreen())
        .catch(err => console.log(err)) :
        await fetch(`${props.site}/api/forums/${props.forum}/flags/${props.isItPost}/${props.post}/${props.comments}/0`, 
        props.deleteEnvelope)
        .then(res => res.json())
        .then(data => props.setPrevScreen())
        .catch(err => console.log(err))
    }

    //Components used when modal is active
    let flagPressable, excludePressable

    if (props.mode === "FlagsFlag") {
        //If params matches, it lets you update your flag
        if(props.name === props.myInfos.id) {
            flagPressable = (
                <Pressable 
                    android_ripple={{color: lightTheme.ligthGrey}}
                    style={styles.optionButtons}
                    onPress={() => {
                        props.setScreen("FlagsFlagUpdate")
                        props.setMessage(props.bodyText)
                        props.setModalVisible(false)
                    }}
                >
                    <Icons 
                        name="Remove" 
                        width={wp("10%")} 
                        height={wp("10%")} 
                        viewBox="0 0 300 300"
                        fill="none" 
                        style={iconStyles.icon1}
                    />
                    <Text style={styles.headerText}>Editar</Text>
                </Pressable>
            )
        }

        //Verifies if mods is'nt null 
        if (props.mods.length > 0) {
            if (
                props.name === props.myInfos.id || 
                props.owner === props.myInfos.id || 
                props.mods.map(mod => mod) === props.myInfos.id
            ) {
                //If params matches, it lets you delete the flag
                excludePressable = (
                    <Pressable 
                        android_ripple={{color: lightTheme.ligthGrey}}
                        onPress={onDeleteFlag}
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
                )
            }
        } else if (
            props.name === props.myInfos.id || 
            props.owner === props.myInfos.id
        ) {
            //If params matches, it lets you delete the flag
            excludePressable = (
                <Pressable 
                    android_ripple={{color: lightTheme.ligthGrey}}
                    onPress={onDeleteFlag}
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
            )
        }
    } else { 
        //lets you see the flags
        flagPressable = (
            <Pressable 
                android_ripple={{color: lightTheme.ligthGrey}}
                style={styles.optionButtons}
                onPress={() => {
                    props.setScreen("FlagsFlag")
                    props.setForum(props.forum) 
                    props.setFlagObj({
                        isItPost: props.isItPost,
                        post: props.post,
                        comentaries: props.isItPost ? " " : props.comments,
                        owner: props.owner,
                        mods: props.mods
                    })
                }}
            >
                <Icons 
                    name="Remove" 
                    width={wp("10%")} 
                    height={wp("10%")} 
                    viewBox="0 0 300 300"
                    fill="none" 
                    style={iconStyles.icon1}
                />
                <Text style={styles.headerText}>Denuncias</Text>
            </Pressable>
        )

        //Verifies if mods is'nt null 
        if (props.mods.length > 0) {
            //If params matches, it lets you delete the flag
            if (
                props.name === props.myInfos.id || 
                props.owner === props.myInfos.id || 
                props.mods.map(mod => mod) === props.myInfos.id
            ) {
                //If params matches, it lets you delete the post/comment
                excludePressable = (
                    <Pressable 
                        android_ripple={{color: lightTheme.ligthGrey}}
                        onPress={() => (
                            props.isItPost ? 
                            onDeletePost() : 
                            onDeleteComments()                                        
                        )}
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
                )
            }
        } else if (
            props.name === props.myInfos.id || 
            props.owner === props.myInfos.id
        ) {
            //If params matches, it lets you delete the post/comment
            excludePressable = (
                <Pressable 
                    android_ripple={{color: lightTheme.ligthGrey}}
                    onPress={() => (
                        props.isItPost ? 
                        onDeletePost() : 
                        onDeleteComments()
                    )}
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
            )
        }
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
                        {flagPressable}
                        {excludePressable}
                    </View>
                </View>
            </Modal>
        </View>
    )
}

function PostCard(props) {
    //Set bottom icons active or not
    const[like, setLike] = useState(false)
    const[comment, setComment] = useState(false)
    const[share, setShare] = useState(false)

    //Sets if popup is visible or not
    const[isModalVisible, setModalVisible] = useState(false)

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
        <Shadow
            distance={4}
            startColor={'#00000004'}
            radius={20}
            offset={[0,4]}
            viewStyle={{
                width:"95%",
                borderRadius: 20, 
                backgroundColor: lightTheme.white,
                marginBottom: wp("2.5%")
            }}
            containerViewStyle={{
                width: "100%",
                marginHorizontal: wp("2.5%")
            }}
            paintInside
        >
            <Pressable 
                onLongPress={() => setModalVisible(true)}
                android_ripple={{color: lightTheme.ligthGrey}}
                onPress={pressCondition}
                style={{padding: wp("5%")}}
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

                <Text style={{
                    marginBottom: wp("2.5%"), 
                    marginTop: wp("-0.625%"),
                    ...styles.bodyText
                }}>
                    {props.bodyText}
                </Text>
                
                {
                    props.mode !== "FlagsFlag" &&
                    <View style={styles.bottomWrapper}>
                        <TouchableOpacity 
                            onPress={() => setLike(!like)}
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
                            <Text style={{
                                color: like ? lightTheme.green : 
                                lightTheme.notSoDarkGrey, 
                                marginBottom: wp("0.625%"), 
                                ...styles.rateText
                            }}>
                                {props.rating + (like && 1)}
                            </Text>
                        </TouchableOpacity>
                        
                        {   
                            props.isItPost &&
                            <TouchableOpacity 
                                onPress={() => setComment(!comment)}
                                style={styles.bottomWrapper}
                            >
                                <Icons 
                                    name="Comentaries" 
                                    width={wp("10%")} 
                                    height={wp("10%")} 
                                    viewBox="0 0 625 625" 
                                    fill="none" 
                                    style={{
                                        stroke: comment ? lightTheme.red : 
                                        lightTheme.notSoDarkGrey,
                                        strokeWidth:"33.1px",
                                        strokeLinejoin: "round",
                                        strokeMiterlimit:"1.5"
                                    }}
                                />
                                {/* <Text style={{
                                    color: lightTheme.notSoDarkGrey, 
                                    marginBottom: wp("0.625%"), 
                                    ...styles.rateText
                                }}>
                                    {props.rating + (comment && 1)}
                                </Text> */}
                            </TouchableOpacity>
                        }
                    
                        {/* <TouchableOpacity 
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
                                    stroke: share ? lightTheme.yellow : 
                                    lightTheme.notSoDarkGrey,
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
                        </TouchableOpacity> */}
                    </View> 
                }
                </Pressable>

            <Options 
                site={props.site}
                token={props.token}
                myInfos={props.myInfos}
                bodyText={props.bodyText}
                mode={props.mode}
                name={props.name}
                owner={props.owner}
                mods={props.mods}
                forum={props.forum}
                post={props.post}
                comments={props.comments}
                isItPost={props.isItPost}
                deleteEnvelope={props.deleteEnvelope}

                isModalVisible={isModalVisible}

                setScreen={props.setScreen}
                setPrevScreen={props.setPrevScreen}
                setForum={props.setForum}
                setMessage={props.setMessage}
                setFlagObj={props.setFlagObj}
                onFunction={props.onFunction}
                
                setModalVisible={prop => setModalVisible(prop)}
            />
        </Shadow>
    )
}

export default PostCard