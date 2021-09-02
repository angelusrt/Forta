import React, {useEffect} from 'react'
import {View, Text, Pressable} from "react-native"
import Animated, { 
    useAnimatedStyle, 
    useSharedValue, 
    withTiming, 
    Easing
} from 'react-native-reanimated'

import {lightTheme, styles} from "../../Styles"
import PostCard from '../PostCard'

function PostCardModal(props) {
    //Animation variables
    const posAnim = useSharedValue(props.pressInfos.pY)
    const opacAnim = useSharedValue(0)

    //Animation Styles
    const posStyle = useAnimatedStyle(() => {
        return {top: posAnim.value}
    })
    const opacStyle = useAnimatedStyle(() => {
        return {opacity: opacAnim.value}
    })

    //Transits to register page
    const transIn = () => {
        posAnim.value = withTiming(150, {
            easing: Easing.elastic(1)
        })
        opacAnim.value = withTiming(1, {
            easing: Easing.elastic(1)
        })
    }

    //Deletes Post
    const onDeletePost = async() => {
        await fetch(`${props.site}/api/forums/${props.forum}/posts/${props.post}`, 
        props.deleteEnvelope)
        .then(res => res.json())
        .then(data => {
            props.setIsModalActive()
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
            props.setIsModalActive()
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
                        props.setIsModalActive()
                    }}
                >
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
                        <Text style={styles.deleteText}>Excluir</Text>
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
                    <Text style={styles.deleteText}>Excluir</Text>
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
                <Text style={styles.deleteText}>Denuncias</Text>
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
                        <Text style={styles.deleteText}>Excluir</Text>
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
                    <Text style={styles.deleteText}>Excluir</Text>
                </Pressable>
            )
        }
    }

    //Initiates transition
    useEffect(() => {transIn()},[])

    return (
        <View 
            style={{
                position: 'absolute',
                height: "100%",
                backgroundColor: "transparent",
                width: "100%",
                margin: 0,
                zIndex: 2
            }}
        >
            <View
                style={{
                    position: 'absolute',
                    height: "100%",
                    backgroundColor: lightTheme.darkGrey,
                    opacity: 0.2,
                    width: "100%"
                }}
                onTouchStart={() => props.setIsModalActive()}
            />

            <Animated.View style={posStyle}>
                <PostCard 
                    site={props.site}
                    token={props.token}
                    myInfos={props.myInfos}
                    deleteEnvelope={props.deleteEnvelope}
                    key={props.key}
                    title={props.title}
                    bodyText={props.bodyText}
                    name={props.author}
                    forumName={props.groupName}
                    rating={props.rating}
                    forum={props.forum}
                    post={props.post}
                    isItPost={props.isItPost}
                    mode={props.mode}
                    owner={props.owner}
                    mods={props.mods}
                    like={props.like}

                    isOnModal={true}

                    setScreen={props.setScreen}
                    setForum={props.setForum}
                    setPost={props.setPost}
                    setFlagObj={props.setFlagObj}
                    setModal={props.setModal}
                    setIsModalActive={props.setIsModalActive}
                    setLike={props.setLike}
                />

                <Animated.View style={[
                    styles.authCard,
                    opacStyle
                ]}>
                    {flagPressable}
                    {excludePressable}
                </Animated.View>
            </Animated.View>
        </View>
    )
}

export default PostCardModal