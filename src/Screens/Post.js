import React, {useState, useEffect} from 'react'
import _reactNative, {View, ScrollView, Text, TouchableOpacity, Pressable, Animated, Easing} from "react-native"
import Modal from 'react-native-modal'
import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import Icons from "./../components/Icons"
import PostCard from "./../components/PostCard"
import InteligentButton from "../components/InteligentButton.js"
import {iconStyles, lightTheme, styles} from "./../Styles.js"

function Options(props) {
    const deletePost = async() => {
        await fetch(`http://192.168.0.111:3000/api/forums/${props.forum}/posts/${props.post}`, props.deleteEnvelope)
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
                            onPress={() => {
                                props.handleScreenList("FlagsFlag")
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
                            </Pressable> : null
                        }
                    </View>
                </View>
            </Modal>
        </View>
    )
}

function Refresh(){
    const[animRot, setAnimRot] = useState(new Animated.Value(0))

    const spin = animRot.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    useEffect(() => {
        Animated.loop(Animated.timing(animRot,{
            toValue: 1,
            duration: 450,
            easing: Easing.linear,
            useNativeDriver: true
        })).start()
    },[animRot])

    return(
        <Animated.View style={{transform: [{ rotate: spin }], flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Icons 
                name="Refresh" 
                width={wp("20%")} 
                height={wp("20%")} 
                viewBox="0 0 625 625" 
                fill="none" 
                style={iconStyles.icon10}
            />
        </Animated.View>
    )
}

function Post(props) {
    const[post, setPost] = useState()
    const[comentaries, setComentaries] = useState([])
    const[likeActive, setLikeActive] = useState(false)
    const[screen, setScreen] = useState("Post")
    const[resolved, setResolved] = useState(false)
    const[isModalVisible, setModalVisible] = useState(false)
    const metric = wp("5%")
    
    const onTryToGetPost = async () => { 
        return await fetch(`http://192.168.0.111:3000/api/forums/${props.forum}/posts/${props.post}`, props.getEnvelope)
        .then(res => res.json())
        .then(data =>{            
            setPost(data.post)
            setComentaries(data.post.comentaries !== null ? data.post.comentaries.map((coments, index) => 
                <PostCard 
                    key={index}
                    token={props.token}
                    myInfos={props.myInfos}
                    deleteEnvelope={props.deleteEnvelope}
                    title={null}
                    bodyText={coments.bodyText}
                    name={coments.author}
                    owner={data.owner}
                    mods={data.mods.length === 0 ? null : data.mods}
                    rating={coments.upvotes}
                    post={props.post}
                    coments={coments._id}
                    isItPost={false}
                    mode="Normal"
                    forum={coments.forum}
                    handleForum={props.handleForum}
                    handlePostList={props.handlePostList}
                    handleScreenList={props.handleScreenList}
                    handleFlagObj={props.handleFlagObj}
                />
            ): null)
            setResolved(true)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {onTryToGetPost()},[])

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
                            isModalVisible={isModalVisible}
                            setModalVisible={prop => setModalVisible(prop)}
                            deleteEnvelope={props.deleteEnvelope}
                            token={props.token}
                            myInfos={props.myInfos}
                            forum={props.forum}
                            post={props.post}
                            name={post.author}
                            handleScreenList={props.handleScreenList}
                        />

                        <View style={{
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            paddingTop: metric/2,
                            top: wp("0")
                        }}>
                            {comentaries}
                        </View>
                    </ScrollView>
                    <InteligentButton 
                        token={props.token}
                        screen={screen}
                        setScreen={screen => setScreen(screen)}
                        forum={props.forum}
                        post={props.post}
                        handlePostList={props.handlePostList}
                        handleScreenList={props.handleScreenList}
                        handleDecrementPost={props.handleDecrementPost} 
                        handleDecrementScreen={props.handleDecrementScreen} 
                    />
                </React.Fragment> :
                <Refresh/>
            }
        </View>
    )
}

export default Post