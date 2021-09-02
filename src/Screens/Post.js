import React, {useState, useEffect, useRef} from 'react'
import _reactNative, {View, ScrollView, Text, TouchableOpacity, Pressable} from "react-native"
import Animated, { 
    useAnimatedStyle, 
    useSharedValue, 
    withTiming, 
    Easing
} from 'react-native-reanimated'
import {useBackHandler} from '@react-native-community/hooks'

import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import Refresh from "../components/Refresh"
import Icons from "./../components/Icons"
import PostCard from "./../components/PostCard"
import PostCardModal from '../components/modals/PostCardModal'
import InteligentButton from "../components/InteligentButton.js"
import {lightTheme, styles} from "./../Styles.js"

function PostModal(props) {
    //Animation variables
    const posAnim = useSharedValue(props.pressInfos.pY)
    const opacAnim = useSharedValue(0)

    //Animation Styles
    const posStyle = useAnimatedStyle(() => {
        // console.log(posAnim.value)
        return {top: posAnim.value}
    })
    const opacStyle = useAnimatedStyle(() => {
        // console.log(posAnim.value)
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

    //Deletes post
    const deletePost = async() => {
        await fetch(`${props.site}/api/forums/${props.forum}/posts/${props.post}`, 
        props.deleteEnvelope)
        .then(res => res.json())
        .then(data => props.setPrevScreen())
        .catch(err => console.log(err))
    }

    useEffect(() => {transIn()},[])

    return (
        <View 
            style={{
                position: 'absolute',
                height: "100%",
                backgroundColor: "transparent",
                width: "100%",
                margin: 0,
                zIndex: 8
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
                onTouchStart={props.setIsPostModalActive}
            />

            <Animated.View style={[
                {
                    position: 'absolute', 
                    width: "100%",
                    opacity: 1,
                    zIndex: 9
                },
                posStyle
            ]}>
                <Pressable 
                    android_ripple={{
                        color: lightTheme.kindOfLightGrey, 
                        borderless: false
                    }}
                    style={[
                        {marginBottom: wp(2.5)},
                        styles.authCard
                    ]}
                >
                    <Text style={styles.headerText}>{props.post.title}</Text>
                    <Text style={{marginBottom: wp("5%"), ...styles.bodyText}}>
                        {props.post.bodyText}
                    </Text>

                    <View style={{
                        marginBottom: wp("5%"), 
                        overflow: 'hidden',
                        ...styles.bottomWrapper
                    }}>
                        <Text 
                            style={{
                                marginRight: wp("1.25%"),
                            ...styles.headerText2
                            }} 
                            numberOfLines={1}
                        > 
                            {props.post.author}
                        </Text>
                        <Text style={styles.bodyText2} numberOfLines={1}>
                            {`at ${props.forum}`}
                        </Text>
                    </View>

                    <View style={styles.bottomWrapper}>
                        <TouchableOpacity 
                            onPress={props.setLike}
                            style={{marginLeft: -wp("1.5%"),...styles.bottomWrapper}}
                        >
                            <Icons 
                                name="Arrow" 
                                width={wp("10%")} 
                                height={wp("10%")} 
                                viewBox="0 0 300 300" 
                                fill="none" 
                                style={{
                                    stroke: props.like?
                                    lightTheme.green:lightTheme.darkGrey ,
                                    strokeLinejoin: "round",
                                    strokeWidth:"15.9px",
                                    transform: [{ rotate: "90deg" }]
                                }}
                            />
                            <Text style={{
                                color: props.like ? lightTheme.green :
                                lightTheme.darkGrey, 
                                marginBottom: wp("0.625%"),
                                ...styles.rateText
                            }}>
                                {props.post.upvotes + (props.like && 1)}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>

                <Animated.View style={[
                    styles.authCard,
                    opacStyle
                ]}>
                    <Pressable 
                        android_ripple={{color: lightTheme.ligthGrey}}
                        style={styles.optionButtons}
                        onPress={() => props.setScreen("FlagsFlag")}
                    >
                        <Text style={styles.deleteText}>Denuncias</Text>
                    </Pressable>
                    {
                        props.name === props.myInfos.id ? 
                        <Pressable 
                            android_ripple={{color: lightTheme.ligthGrey}}
                            onPress={() => deletePost()}
                            style={styles.optionButtons}
                        >
                            <Text style={styles.deleteText}>Excluir</Text>
                        </Pressable> : 
                        null
                    }
                </Animated.View>
            </Animated.View>
        </View>
    )
}

function Post(props) {
    //Cancells effect
    const isCancelled = useRef(false)

    //Needed to calculate measurements
    const pressableRef = useRef(null)

    //Shows react element only resolved is true
    const[resolved, setResolved] = useState(false)

    //Sets further screens
    const[scrn, setScrn] = useState("Post")

    //Stores post components
    const[post, setPost] = useState()

    //Stores comments components
    const[comments, setComments] = useState([])

    //Updates onGet
    const[update, setUpdate] = useState(false)

    //like state
    const[like, setLike] = useState(false)

    //Modal vars
    const[isPostModalActive, setIsPostModalActive] = useState(false)
    const[pressInfos, setPressInfos] = useState({})
    const[modalInfos, setModalInfos] = useState(null)
    const[isModalActive, setIsModalActive] = useState(false)

    //Global width metric
    const metric = wp("5%")
    
    //Gets comments
    const onGet = async () => { 
        return await fetch(`${props.site}/api/forums/${props.forum}/posts/${props.post}`, 
        props.getEnvelope)
        .then(res => res.json())
        .then(data => {   
            setPost(data.post)
            setComments(
                data.post.comentaries !== null ? 
                data.post.comentaries.map((coments, index) => 
                    <PostCard 
                        site={props.site}
                        token={props.token}
                        myInfos={props.myInfos}
                        post={props.post}
                        deleteEnvelope={props.deleteEnvelope}

                        key={index}
                        bodyText={coments.bodyText}
                        name={coments.author}
                        owner={data.owner}
                        mods={data.mods}
                        rating={coments.upvotes}
                        isItPost={false}
                        forum={coments.forum}
                        comments={coments._id}
                        mode="Normal"
                        isOnModal={false}

                        setScreen={props.setScreen}
                        setForum={props.setForum}
                        setPost={props.setPost}
                        setFlagObj={props.setFlagObj}
                        onFunction={() => setUpdate(!update)}

                        setModalInfos={infos => setModalInfos(infos)}
                        setIsModalActive={bool => setIsModalActive(bool)}
                    />
                ): null)
            setResolved(true)
        })
        .catch(err => console.log(err))
    }

    const longPressBehaviour = () => {
        pressableRef.current.measure((x, y, w, h, pX, pY) => {
            setPressInfos({x, y, w, h, pX, pY})
            setIsPostModalActive(true)
        })
    }

    //Updates get comments 
    useEffect(() => {
        onGet()
        return () => isCancelled.current = true
    },[update])

    useBackHandler(() => {
        isModalActive ? 
        setIsModalActive(false) : 
        isPostModalActive ?
        setIsPostModalActive(false) :
        props.setPrevScreen()

        return true    
    })

    return (
        <View style={{flex: 1, justifyContent: "center", backgroundColor: lightTheme.ligthGrey}}>
            { resolved ? 
                <React.Fragment>
                    <ScrollView contentContainerStyle={{paddingBottom: 200}}>
                        <View style={{
                            flex: 1, 
                            top: 0,
                            overflow: 'hidden',
                            marginHorizontal: metric/2,
                            marginBottom: metric,
                            marginTop: metric,
                            borderRadius: 20, 
                            borderColor: lightTheme.ligthGrey,
                            borderBottomWidth: wp("0.5%"),
                            backgroundColor: lightTheme.ligthGrey,
                        }}>
                            <Pressable 
                                ref={pressableRef}
                                onLongPress={longPressBehaviour}
                                android_ripple={{
                                    color: lightTheme.kindOfLightGrey, 
                                    borderless: true
                                }}
                                style={{padding: wp("5%")}}
                            >
                                <Text style={styles.headerText}>{post.title}</Text>
                                <Text style={{marginBottom: wp("5%"), ...styles.bodyText}}>
                                    {post.bodyText}
                                </Text>

                                <View style={{
                                    marginBottom: wp("5%"), 
                                    overflow: 'hidden',
                                    ...styles.bottomWrapper
                                }}>
                                    <Text 
                                        style={{
                                            marginRight: wp("1.25%"),
                                        ...styles.headerText2
                                        }} 
                                        numberOfLines={1}
                                    > 
                                        {post.author}
                                    </Text>
                                    <Text style={styles.bodyText2} numberOfLines={1}>
                                        {`at ${props.forum}`}
                                    </Text>
                                </View>

                                <View style={styles.bottomWrapper}>
                                    <TouchableOpacity 
                                        onPress={() => {
                                            setLike(!like)
                                        }}
                                        style={{marginLeft: -wp("1.5%"),...styles.bottomWrapper}}
                                    >
                                        <Icons 
                                            name="Arrow" 
                                            width={wp("10%")} 
                                            height={wp("10%")} 
                                            viewBox="0 0 300 300" 
                                            fill="none" 
                                            style={{
                                                stroke: like ? lightTheme.green :
                                                lightTheme.darkGrey,
                                                strokeLinejoin: "round",
                                                strokeWidth:"15.9px",
                                                transform: [{ rotate: "90deg" }]
                                            }}
                                        />
                                        <Text style={{
                                            color: like ? lightTheme.green :
                                            lightTheme.darkGrey, 
                                            marginBottom: wp("0.625%"),
                                            ...styles.rateText
                                        }}>
                                            {post.upvotes + (like && 1)}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </Pressable>
                        </View>

                        <View style={{
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            paddingTop: metric/2,
                            top: wp("0")
                        }}>
                            {comments}
                        </View>
                    </ScrollView>

                    <InteligentButton 
                        site={props.site}
                        token={props.token}
                        screen={scrn}
                        
                        forum={props.forum}
                        post={props.post}
                        
                        setScreen={props.setScreen}
                        setPrevScreen={props.setPrevScreen}
                        setPost={props.setPost}
                        setPrevPost={props.setPrevPost} 

                        setScrn={scrn => setScrn(scrn)}
                        onFunction={onGet}
                    />
                    
                    {
                        isPostModalActive &&
                        <PostModal 
                            site={props.site}
                            token={props.token}
                            myInfos={props.myInfos}
                            forum={props.forum}
                            post={props.post}
                            name={post.author}
                            deleteEnvelope={props.deleteEnvelope}

                            post={post}
                            like={like}
                            pressInfos={pressInfos}

                            setScreen={props.setScreen}
                            setPrevScreen={props.setPrevScreen}

                            setIsPostModalActive={() => setIsPostModalActive(false)}
                            setLike={() => setLike(prev => !prev)}
                        />
                    }

                    {
                        isModalActive &&
                        <PostCardModal
                            site={props.site} 
                            token={props.token} 
                            myInfos={props.myInfos}
                            getEnvelope={props.getEnvelope}
                            deleteEnvelope={props.deleteEnvelope}
                            
                            setScreen={props.setScreen}
                            setForum={props.setForum}
                            setPost={props.setPost} 
                            setFlagObj={props.setFlagObj}
                            
                            bodyText={modalInfos.bodyText}
                            mode={modalInfos.mode}
                            name={modalInfos.name}
                            owner={modalInfos.owner}
                            mods={modalInfos.mods}
                            forum={modalInfos.forum}
                            forumName={modalInfos.forumName}
                            title={modalInfos.title}
                            rating={modalInfos.rating}
                            post={modalInfos.post}
                            comments={modalInfos.comments}
                            isItPost={modalInfos.isItPost}
                            like={modalInfos.like}
                            pressInfos={modalInfos.pressInfos}
                            pressCondition={modalInfos.pressCondition}

                            setLike={modalInfos.setLike}
                            onFunction={modalInfos.onFunction}
                            setIsModalActive={bool => setIsModalActive(bool)}
                        />
                    }
                </React.Fragment> :
                <Refresh/>
            }
        </View>
    )
}

export default Post