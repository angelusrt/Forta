import React, {useState, useEffect} from 'react'
import _reactNative, {View, ScrollView, Text, TouchableOpacity, Pressable} from "react-native"
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
                animationInTiming={600}
                animationOutTiming={300}
                backdropTransitionInTiming={600}
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

function Post(props) {
    const[post, setPost] = useState()
    const[comentaries, setComentaries] = useState([])
    const[likeActive, setLikeActive] = useState(false)
    const[screen, setScreen] = useState("Post")
    const[resolved, setResolved] = useState(false)
    const[isModalVisible, setModalVisible] = useState(false)
    const metric = wp("5%")

    const httpEnvelope = {
        method: "GET",
        headers: {
            'accept-encoding': 'gzip, deflate, br',
            accept: '*/*',
            connection: 'keep-alive',
            host: 'localhost:3000'
        }
    }
    
    const onTryToGetPost = async () => { 
        return await fetch(`http://192.168.0.106:3000/api/forums/${props.forum}/posts/${props.post}`, httpEnvelope)
        .then(res => res.json())
        .then(data =>{            
            setPost(data)
            setComentaries(data.comentaries !== null ? data.comentaries.map((coments, index) => 
                <PostCard 
                    key={index}
                    title={null}
                    bodyText={coments.bodyText}
                    name={coments.author}
                    forum={coments.forum}
                    rating={coments.upvotes}
                    post={coments._id}
                    handleForum={props.handleForum}
                    handlePostList={props.handlePostList}
                    handleScreenList={props.handleScreenList}
                />
            ): null)
            setResolved(true)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {onTryToGetPost()},[])

    return (
        <View style={{flex: 1, backgroundColor: lightTheme.ligthGrey}}>
            { resolved ? 
                <React.Fragment>
                    <ScrollView contentContainerStyle={{paddingBottom: 200}}>
                        <Pressable 
                            onLongPress={() => setModalVisible(true)}
                            style={{
                                padding: wp("5%"), 
                                marginHorizontal: wp("2.5%"),
                                borderRadius: 20, 
                                borderColor: lightTheme.ligthGrey,
                                top: 0,
                                borderBottomWidth: wp("0.5%"),
                                backgroundColor: lightTheme.ligthGrey,
                                marginBottom: wp("5%")
                            }}
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
                        
                        <Options 
                            isModalVisible={isModalVisible}
                            setModalVisible={prop => setModalVisible(prop)}
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
                </React.Fragment>:
                <Text style={{textAlign: "center"}}>Loading...</Text>
            }
        </View>
    )
}

export default Post