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
import InteligentButton from "../components/InteligentButton.js"
import PostCardModal from "../components/modals/PostCardModal";
import {lightTheme, styles} from "./../Styles.js"

//Global width metric
const metric = wp("5%")

function ForumModal(props) {
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
        posAnim.value = withTiming(50, {
            easing: Easing.elastic(1)
        })
        opacAnim.value = withTiming(1, {
            easing: Easing.elastic(1)
        })
    }

    //Deletes forum
    const deleteForum = async() => {
        await fetch(`${props.site}/api/forums/${props.forum}`, 
        props.deleteEnvelope)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    useEffect(() => {transIn()},[])

    return (
        <View style={{
            position: 'absolute',
            height: "100%",
            backgroundColor: "transparent",
            width: "100%",
            margin: 0,
            zIndex: 2
        }}>
            <View
                style={{
                    position: 'absolute',
                    height: "100%",
                    backgroundColor: lightTheme.darkGrey,
                    opacity: 0.2,
                    width: "100%"
                }}
                onTouchStart={props.setIsForumModalActive}
            />

            <Animated.View style={[
                //styles.authCard,
                posStyle
            ]}>
                <View
                    style={{
                        width: "100%",
                        height: wp("35%"),
                        backgroundColor: lightTheme.notSoLightGrey,
                        borderRadius: 5
                    }}
                />
                
                <Pressable 
                    android_ripple={{
                        color: lightTheme.kindOfLightGrey, 
                        borderless: false
                    }}
                    style={{
                        padding: metric,
                        borderRadius: metric, 
                        overflow: 'hidden',
                        top: wp("-10%"),
                        zIndex: 10,
                        //flex: 1, 
                        marginHorizontal: metric/2,
                        backgroundColor: lightTheme.ligthGrey,
                    }}
                >
                    <View style={{
                        marginBottom: metric,
                        overflow: 'hidden',
                        ...styles.bottomWrapper
                    }}>
                        <View style={{
                            width: metric * 4,
                            height: metric * 4,
                            backgroundColor: lightTheme.yellow,
                            borderRadius: 10,
                        }}/>
                        <View Style={styles.bottomWrapper}>
                            <View style={{
                                paddingLeft: metric,
                                width: metric * 13
                            }}>
                                <Text 
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={{
                                        marginTop: metric/4,
                                        marginBottom: -metric/4,
                                        fontFamily: "Poppins_700Bold",
                                        fontSize: wp("7%"),
                                        color: lightTheme.darkGrey
                                    }}
                                >
                                    {props.forum.groupName}
                                </Text>
                                <View style={{
                                    marginBottom: metric,
                                    ...styles.bottomWrapper
                                }}>
                                    {props.forum.tags.map((tag, index) => 
                                        <Text 
                                            key={index} 
                                            numberOfLines={1} 
                                            style={{
                                                paddingRight: metric/2,
                                                ...styles.bodyText2
                                            }}
                                        >
                                            {tag}
                                        </Text>                                
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                    
                    <Text style={{marginBottom: metric/2, ...styles.bodyText}}>
                        {props.forum.bios}
                    </Text>
                    
                    <View style={styles.bottomWrapper}>
                        <View style={{flex: 1.5, marginRight: wp("5%")}}>
                            <Text style={{color: lightTheme.darkGrey, ...styles.rateText}}>
                                {`${props.forum.followers.length} membros`}
                            </Text>
                        </View>
                
                        <View style={{alignItems: 'flex-end', ...styles.rightButtonsWrapper}}>
                            <TouchableOpacity 
                                onPress={props.verify}
                                style={{flexDirection: 'row', alignItems: "center"}}
                            >
                                <Text style={{
                                    color: props.follow ? lightTheme.green : 
                                    lightTheme.darkGrey, 
                                    marginRight: wp("1.25%"),
                                    ...styles.rateText
                                }}>
                                    Seguindo
                                </Text>
                                <Icons 
                                    name="Arrow" 
                                    width={wp("10%")} 
                                    height={wp("10%")} 
                                    viewBox="0 0 300 300" 
                                    fill="none" 
                                    style={{
                                        stroke: props.follow ? lightTheme.green : 
                                        lightTheme.darkGrey,
                                        strokeLinejoin: "round",
                                        strokeWidth: "15.9px",
                                        transform: [{ rotate: "180deg" }]
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Pressable>

                <Animated.View style={[
                    styles.authCard,
                    opacStyle
                ]}>
                    <Pressable 
                        android_ripple={{color: lightTheme.ligthGrey}}
                        style={styles.optionButtons}
                        onPress={() => props.setScreen("Rules")}
                    >
                        <Text style={styles.headerText}>
                            Regras
                        </Text>
                    </Pressable>
                    <Pressable 
                        android_ripple={{color: lightTheme.ligthGrey}}
                        style={styles.optionButtons}
                        onPress={() => props.setScreen("Mods")}
                    >
                        <Text style={styles.headerText}>
                            Mods
                        </Text>
                    </Pressable>
                    {
                        props.owner === props.myInfos.id || 
                        props.mods.map(mod => mod) === props.myInfos.id ? 
                        <Pressable 
                            android_ripple={{color: lightTheme.ligthGrey}}
                            style={styles.optionButtons}
                            onPress={() => props.setScreen("Flags")}
                        >
                            <Text style={styles.deleteText}>Denuncias</Text>
                        </Pressable> : 
                        null
                    }
                    {
                        props.owner === props.myInfos.id ? 
                        <Pressable 
                            android_ripple={{color: lightTheme.ligthGrey}}
                            onPress={deleteForum}
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

function Forum(props) {
    //Shows react element only resolved is true
    const[resolved, setResolved] = useState(false)

    //Needed to calculate measurements
    const pressableRef = useRef(null)

    //Modal vars
    const[isForumModalActive, setIsForumModalActive] = useState(false)
    const[pressInfos, setPressInfos] = useState({})
    const[modalInfos, setModalInfos] = useState(null)
    const[isModalActive, setIsModalActive] = useState(false)

    //Sets further screens
    const[scrn, setScrn] = useState("Forum")

    //Stores forum components
    const[forum, setForum] = useState()

    //Stores posts components
    const[posts, setPosts] = useState()

    //Updates onGet
    const[update, setUpdate] = useState(false)
    
    //Follow state
    const[follow, setFollow] = useState(true)

    //Gets Forum
    const onGet = async () => { 
        return await fetch(`${props.site}/api/forums/${props.forum}`, props.getEnvelope)
        .then(res => res.json())
        .then(data => {
            setForum(data)              
            setPosts(data.posts.map((posts, index) =>
                <PostCard
                    site={props.site} 
                    token={props.token}
                    myInfos={props.myInfos}
                    deleteEnvelope={props.deleteEnvelope}
                    
                    key={index}
                    title={posts.title}
                    bodyText={posts.bodyText}
                    name={posts.author}
                    owner={data.owner}
                    mods={data.mods}
                    isItPost={true}
                    mode="Normal"
                    forum={props.forum}
                    forumName={data.groupName}
                    rating={posts.upvotes}
                    post={posts._id}
                    isOnModal={false}

                    setScreen={props.setScreen}
                    setForum={props.setForum}
                    setPost={props.setPost}
                    setFlagObj={props.setFlagObj}
                    onFunction={() => setUpdate(!update)}

                    setModalInfos={infos => setModalInfos(infos)}
                    setIsModalActive={bool => setIsModalActive(bool)}
                />
            ))
            onGetMyForum()
            setResolved(true)
        })
        .catch( err => console.log(err))
    }

    //Sets follow state
    const onGetMyForum = async () => {
        return await fetch(`${props.site}/api/user/myForums`, props.getEnvelope)
        .then(res => res.json())
        .then(data => setFollow(data.indexOf(props.forum) !== -1 ? true : false))
        .catch(err => console.log(err))
    }
    
    //Follows forum
    const onFollow = async () => {
        return await fetch(`${props.site}/api/forums/${props.forum}/follow`, props.patchEnvelope)
        .then(res => res.json())
        .then(data => data === "Followed" ? onGet() : null)
        .catch(err => console.log(err))
    }

    //Unfollows forum
    const onUnfollow = async () => {
        return await fetch(`${props.site}/api/forums/${props.forum}/follow`, props.deleteEnvelope)
        .then(res => res.json())
        .then(data => data === "Removed" ? onGet() : null)
        .catch(err => console.log(err))
    }

    const longPressBehaviour = () => {
        pressableRef.current.measure((x, y, w, h, pX, pY) => {
            setPressInfos({x, y, w, h, pX, pY})
            setIsForumModalActive(true)
        })
    }
    
    //Follow or unfollow
    const verify = () => follow ? onUnfollow() : onFollow()

    //Updates forum
    useEffect(() => {onGet()},[update])

    useBackHandler(() => {
        isModalActive ? 
        setIsModalActive(false) : 
        isForumModalActive ?
        setIsForumModalActive(false) :
        props.setPrevScreen()

        return true    
    })

    return (
        <View style={{flex: 1, justifyContent: "center", backgroundColor: lightTheme.ligthGrey}}>
            { resolved ? 
                <React.Fragment>
                    <ScrollView contentContainerStyle={{paddingBottom: 200}}>
                        <View
                            ref={pressableRef} 
                            style={{
                                width: "100%",
                                height: wp("35%"),
                                backgroundColor: lightTheme.notSoLightGrey,
                                borderRadius: 5, 
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0
                            }}
                        />
                        
                        <View style={{
                            borderRadius: metric, 
                            overflow: 'hidden',
                            top: wp("-10%"),
                            flex: 1, 
                            marginHorizontal: metric/2,
                            marginBottom: metric,
                            backgroundColor: lightTheme.ligthGrey,
                        }}>
                            <Pressable 
                                onLongPress={longPressBehaviour}
                                android_ripple={{
                                    color: lightTheme.kindOfLightGrey, 
                                    borderless: true
                                }}
                                style={{padding: metric}}
                            >
                                <View style={{
                                    marginBottom: metric,
                                    overflow: 'hidden',
                                    ...styles.bottomWrapper
                                }}>
                                    <View style={{
                                        width: metric * 4,
                                        height: metric * 4,
                                        backgroundColor: lightTheme.yellow,
                                        borderRadius: 10,
                                    }}/>
                                    <View Style={styles.bottomWrapper}>
                                        <View style={{
                                            paddingLeft: metric,
                                            width: metric * 13
                                        }}>
                                            <Text 
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                                style={{
                                                    marginTop: metric/4,
                                                    marginBottom: -metric/4,
                                                    fontFamily: "Poppins_700Bold",
                                                    fontSize: wp("7%"),
                                                    color: lightTheme.darkGrey
                                                }}
                                            >
                                                {forum.groupName}
                                            </Text>
                                            <View style={{
                                                marginBottom: metric,
                                                ...styles.bottomWrapper
                                            }}>
                                                {forum.tags.map((tag, index) => 
                                                    <Text 
                                                        key={index} 
                                                        numberOfLines={1} 
                                                        style={{
                                                            paddingRight: metric/2,
                                                            ...styles.bodyText2
                                                        }}
                                                    >
                                                        {tag}
                                                    </Text>                                
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                
                                <Text style={{marginBottom: metric/2, ...styles.bodyText}}>
                                    {forum.bios}
                                </Text>
                                
                                <View style={styles.bottomWrapper}>
                                    <View style={{flex: 1.5, marginRight: wp("5%")}}>
                                        <Text style={{color: lightTheme.darkGrey, ...styles.rateText}}>
                                            {`${forum.followers.length} membros`}
                                        </Text>
                                    </View>
                            
                                    <View style={{alignItems: 'flex-end', ...styles.rightButtonsWrapper}}>
                                        <TouchableOpacity 
                                            onPress={() => verify()}
                                            style={{flexDirection: 'row', alignItems: "center"}}
                                        >
                                            <Text style={{
                                                color: follow ? lightTheme.green : 
                                                lightTheme.darkGrey, 
                                                marginRight: wp("1.25%"),
                                                ...styles.rateText
                                            }}>
                                                Seguindo
                                            </Text>
                                            <Icons 
                                                name="Arrow" 
                                                width={wp("10%")} 
                                                height={wp("10%")} 
                                                viewBox="0 0 300 300" 
                                                fill="none" 
                                                style={{
                                                    stroke: follow ? lightTheme.green : 
                                                    lightTheme.darkGrey,
                                                    strokeLinejoin: "round",
                                                    strokeWidth: "15.9px",
                                                    transform: [{ rotate: "180deg" }]
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Pressable>
                        </View>
            
                        <View style={{
                            backgroundColor: lightTheme.ligthGrey, 
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            paddingTop: metric/2,
                            top: wp("-12.5%")
                        }}>
                            {posts}
                        </View>
                    </ScrollView>
                    
                    <InteligentButton 
                        site={props.site}
                        token={props.token}
                        forum={props.forum}
                        
                        screen={scrn}

                        setScreen={props.setScreen}
                        setPrevScreen={props.setPrevScreen}
                        setPost={props.setPost}

                        setScrn={scrn => setScrn(scrn)}
                        onFunction={onGet}
                    />

                    {
                        isForumModalActive &&
                        <ForumModal 
                            myInfos={props.myInfos}
                            owner={forum.owner}
                            mods={forum.mods}
                            forum={props.forum}
                            isForumModalActive={isForumModalActive}
                            deleteEnvelope={props.deleteEnvelope}

                            forum={forum}
                            follow={follow}
                            pressInfos={pressInfos}
                            verify={verify}

                            setScreen={props.setScreen}
                            setForum={props.setForum}
                            
                            setIsForumModalActive={() => setIsForumModalActive(false)}       
                            setFollow={() => setFollow(prev => !prev)}             
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
                <Refresh
                    setPrevScreen={props.setPrevScreen}
                />
            }
        </View>
    )
}

export default Forum