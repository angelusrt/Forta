import React, {useState, useEffect} from 'react'
import _reactNative, {View, ScrollView, Text, TouchableOpacity, Pressable, Animated, Easing} from "react-native"
import Modal from 'react-native-modal'
import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import Icons from "./../components/Icons"
import PostCard from "./../components/PostCard"
import InteligentButton from "../components/InteligentButton.js"
import {iconStyles, lightTheme, styles} from "./../Styles.js"

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
                                name="Bios" 
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
                                Regras
                            </Text>
                        </Pressable>
                        <Pressable 
                            android_ripple={{color: lightTheme.ligthGrey}}
                            style={styles.optionButtons}
                        >
                            <Icons 
                                name="Comentaries" 
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
                                Mods
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

function Forum(props) {
    const[forum, setForum] = useState()
    const[posts, setPosts] = useState([])
    const[follow, setFollow] = useState(true)
    const[screen, setScreen] = useState("Forum")
    const[resolved, setResolved] = useState(false)
    const[isModalVisible, setModalVisible] = useState(false)
    const metric = wp("5%")
    const httpEnvelope = {
        method: "GET",
        headers: {
            'accept-encoding': 'gzip, deflate, br',
            accept: '*/*',
            connection: 'keep-alive',
            host: 'localhost:3000',
            'auth-token': props.token
        }
    }
    const httpEnvelopePatch = {
        method: "PATCH",
        headers: {
            'accept-encoding': 'gzip, deflate, br',
            accept: '*/*',
            connection: 'keep-alive',
            host: 'localhost:3000',
            'auth-token': props.token
        }
    }
    const httpEnvelopeDelete = {
        method: "DELETE",
        headers: {
            'accept-encoding': 'gzip, deflate, br',
            accept: '*/*',
            connection: 'keep-alive',
            host: 'localhost:3000',
            'auth-token': props.token
        }
    }

    const onTryToGetForum = async () => { 
        return await fetch(`http://192.168.0.106:3000/api/forums/${props.forum}`, httpEnvelope)
        .then(res => res.json())
        .then(data => {
            setForum(data)                
            setPosts(data.posts.map((posts, index) =>
                <PostCard 
                    key={index}
                    title={posts.title}
                    bodyText={posts.bodyText}
                    name={posts.author}
                    forum={props.forum}
                    forumName={data.groupName}
                    rating={posts.upvotes}
                    post={posts._id}
                    handleForum={props.handleForum}
                    handlePostList={props.handlePostList}
                    handleScreenList={props.handleScreenList}
                />
            ))
            onTrytoGetUserMyForum()
            setResolved(true)
        })
        .catch( err => console.log(err))
    }

    const onTrytoGetUserMyForum = async () => {
        return await fetch(`http://192.168.0.106:3000/api/user/myForums`, httpEnvelope)
        .then(res => res.json())
        .then(data => setFollow(data.indexOf(props.forum) !== -1 ? true : false))
        .catch(err => console.log(err))
    }
    
    const onTrytoFollow = async () => {
        return await fetch(`http://192.168.0.106:3000/api/forums/${props.forum}/follow`, httpEnvelopePatch)
        .then(res => res.json())
        .then(data => data === "You followed" ? onTryToGetForum() : null)
        .catch(err => console.log(err))
    }

    const onTrytoUnfollow = async () => {
        return await fetch(`http://192.168.0.106:3000/api/forums/${props.forum}/follow`, httpEnvelopeDelete)
        .then(res => res.json())
        .then(data => data === "Removed sucessfully" ? onTryToGetForum() : null)
        .catch(err => console.log(err))
    }
    
    const verify = () => follow === true ? onTrytoUnfollow() : onTrytoFollow()

    useEffect(() => {onTryToGetForum()},[])

    return (
        <View style={{flex: 1, justifyContent: "center", backgroundColor: lightTheme.ligthGrey}}>
            { resolved ? 
                <React.Fragment>
                    <ScrollView contentContainerStyle={{paddingBottom: 200}}>
                        <View style={{
                            width: "100%",
                            height: wp("35%"),
                            backgroundColor: lightTheme.red,
                            borderRadius: 5, 
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0
                        }}/>
                        
                        <Pressable 
                            onLongPress={() => setModalVisible(true)}
                            style={{
                                top: wp("-10%"),
                                flex: 1, 
                                padding: metric,
                                marginHorizontal: metric/2,
                                marginBottom: metric,
                                borderRadius: metric,
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
                                    borderColor: lightTheme.ligthGrey,
                                    borderWidth: wp("0.625%")
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
                                                marginBottom: wp("0%"),
                                                ...styles.headerText3
                                            }}
                                        >
                                            {forum.groupName}
                                        </Text>
                                        <View style={{
                                            marginBottom: metric,
                                            ...styles.bottomWrapper
                                        }}>
                                            {forum.tags.map((tag, index) => 
                                                <Text key={index} numberOfLines={1} style={{
                                                    paddingRight: metric/2,
                                                    ...styles.bodyText2
                                                }}>
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

                        <Options 
                            isModalVisible={isModalVisible}
                            setModalVisible={prop => setModalVisible(prop)}
                        />
            
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
                        token={props.token}                
                        screen={screen}
                        setScreen={screen => setScreen(screen)}
                        forum={props.forum} 
                        handlePostList={props.handlePostList}
                        handleScreenList={props.handleScreenList}
                        handleDecrementScreen={props.handleDecrementScreen}
                    />
                </React.Fragment> : 
                <Refresh/>
            }
        </View>
    )
}

export default Forum