import React, {useState, useEffect} from 'react'
import _reactNative, {View, ScrollView, Text, TouchableOpacity, Pressable} from "react-native"
import Modal from 'react-native-modal'
import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import Refresh from "../components/Refresh"
import Icons from "./../components/Icons"
import PostCard from "./../components/PostCard"
import InteligentButton from "../components/InteligentButton.js"
import {iconStyles, lightTheme, styles} from "./../Styles.js"

function Options(props) {
    //Deletes forum
    const deleteForum = async() => {
        await fetch(`${props.site}/api/forums/${props.forum}`, 
        props.deleteEnvelope)
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
                            onPress={() => props.setScreen("Rules")}
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
                            onPress={() => props.setScreen("Mods")}
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
                        {
                            props.owner === props.myInfos.id || 
                            props.mods.map(mod => mod) === props.myInfos.id ? 
                            <Pressable 
                                android_ripple={{color: lightTheme.ligthGrey}}
                                style={styles.optionButtons}
                                onPress={() => props.setScreen("Flags")}
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

function Forum(props) {
    //Shows react element only resolved is true
    const[resolved, setResolved] = useState(false)

    //Sets popup on or off
    const[isModalVisible, setModalVisible] = useState(false)

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

    //Global width metric
    const metric = wp("5%")

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

                    setScreen={props.setScreen}
                    setForum={props.setForum}
                    setPost={props.setPost}
                    setFlagObj={props.setFlagObj}
                    onFunction={() => setUpdate(!update)}
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
    
    //Follow or unfollow
    const verify = () => follow ? onUnfollow() : onFollow()

    //Updates forum
    useEffect(() => {onGet()},[update])

    return (
        <View style={{flex: 1, justifyContent: "center", backgroundColor: lightTheme.ligthGrey}}>
            { resolved ? 
                <React.Fragment>
                    <ScrollView contentContainerStyle={{paddingBottom: 200}}>
                        <View style={{
                            width: "100%",
                            height: wp("35%"),
                            backgroundColor: lightTheme.notSoLightGrey,
                            borderRadius: 5, 
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0
                        }}/>
                        
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
                                onLongPress={() => setModalVisible(true)}
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

                        <Options 
                            myInfos={props.myInfos}
                            owner={forum.owner}
                            mods={forum.mods}
                            forum={props.forum}
                            isModalVisible={isModalVisible}
                            deleteEnvelope={props.deleteEnvelope}

                            setScreen={props.setScreen}
                            setForum={props.setForum}
                            
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
                </React.Fragment> : 
                <Refresh/>
            }
        </View>
    )
}

export default Forum