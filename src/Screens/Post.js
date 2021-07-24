import React, {useState, useEffect, useRef} from 'react'
import _reactNative, {View, ScrollView, Text, TouchableOpacity, Pressable} from "react-native"
import Modal from 'react-native-modal'
import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import Refresh from "../components/Refresh"
import Icons from "./../components/Icons"
import PostCard from "./../components/PostCard"
import InteligentButton from "../components/InteligentButton.js"
import {iconStyles, lightTheme, styles} from "./../Styles.js"

function Options(props) {
    //Deletes post
    const deletePost = async() => {
        await fetch(`${props.site}/api/forums/${props.forum}/posts/${props.post}`, 
        props.deleteEnvelope)
        .then(res => res.json())
        .then(data => props.setPrevScreen())
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
                            onPress={() => props.setScreen("FlagsFlag")}
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
                        {
                            props.name === props.myInfos.id ? 
                            <Pressable 
                                android_ripple={{color: lightTheme.ligthGrey}}
                                onPress={() => deletePost()}
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
                            </Pressable> : 
                            null
                        }
                    </View>
                </View>
            </Modal>
        </View>
    )
}

function Post(props) {
    //Cancells effect
    const isCancelled = useRef(false)

    //Shows react element only resolved is true
    const[resolved, setResolved] = useState(false)

    //Sets popup on or off
    const[isModalVisible, setModalVisible] = useState(false)

    //Sets further screens
    const[scrn, setScrn] = useState("Post")

    //Stores post components
    const[post, setPost] = useState()

    //Stores comments components
    const[comments, setComments] = useState([])

    //Updates onGet
    const[update, setUpdate] = useState(false)

    //like state
    const[likeActive, setLikeActive] = useState(false)

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

                        setScreen={props.setScreen}
                        setForum={props.setForum}
                        setPost={props.setPost}
                        setFlagObj={props.setFlagObj}
                        onFunction={() => setUpdate(!update)}
                    />
                ): null)
            setResolved(true)
        })
        .catch(err => console.log(err))
    }

    //Updates get comments 
    //useEffect(() => {onGet()},[update])

    useEffect(() => {
        onGet()
        return () => isCancelled.current = true
    },[update])

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
                                onLongPress={() => setModalVisible(true)}
                                android_ripple={{
                                    color: lightTheme.kindOfLightGrey, 
                                    borderless: true
                                }}
                                style={{padding: wp("5%")}}
                            >
                                <View>
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
                                                setLikeActive(!likeActive)
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
                                                    stroke: likeActive?lightTheme.green:lightTheme.darkGrey ,
                                                    strokeLinejoin: "round",
                                                    strokeWidth:"15.9px",
                                                    transform: [{ rotate: "90deg" }]
                                                }}
                                            />
                                            <Text style={{
                                                color: likeActive ? lightTheme.green :
                                                lightTheme.darkGrey, 
                                                marginBottom: wp("0.625%"),
                                                ...styles.rateText
                                            }}>
                                                {post.upvotes + (likeActive && 1)}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Pressable>
                        </View>
                        
                        <Options 
                            site={props.site}
                            token={props.token}
                            myInfos={props.myInfos}
                            forum={props.forum}
                            post={props.post}
                            name={post.author}
                            deleteEnvelope={props.deleteEnvelope}

                            isModalVisible={isModalVisible}
                            
                            setScreen={props.setScreen}
                            setPrevScreen={props.setPrevScreen}

                            setModalVisible={prop => setModalVisible(prop)}
                        />

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
                </React.Fragment> :
                <Refresh/>
            }
        </View>
    )
}

export default Post