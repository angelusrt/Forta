import React, {useState, useEffect} from 'react';
import _reactNative, { View, ScrollView, Text, TouchableOpacity, Platform} from "react-native"

import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import Icons from "./../components/Icons";

import { lightTheme, styles } from "./../Styles.js";
import PostCard from "./../components/PostCard";
import InteligentButton from "../components/InteligentButton.js";
import ObjectByString from "../components/ObjectByString";

function Post(props) {
    const[post, setPost] = useState()
    const[comentaries, setComentaries] = useState([])
    const[resolved, setResolved] = useState(false)
    const[likeActive, setLikeActive] = useState(false)
    const[optionsActive, setOptionsActive] = useState(false)
    const[screen, setScreen] = useState("Post")

    const metric = wp("5%")

    // let postImage = 
    //     <View style={{
    //         width: "100%",
    //         height: wp("100%"),
    //         backgroundColor: lightTheme.notSoDarkGrey,
    //         borderRadius: 5, 
    //         borderTopRightRadius: 0,
    //         borderTopLeftRadius: 0,
    //     }}/>

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
                    handlePostList={props.handlePostList}
                    handleScreenList={props.handleScreenList}
                />
            ): null)
            setResolved(true)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        onTryToGetPost()
    },[])

    let options = (
        <View style={{
            position: 'absolute',
            top: wp("10%"),
            right: 0,
            ...styles.options
        }}>
            <TouchableOpacity style={styles.bottomWrapper}>
                <Icons name="Share" width={wp("10%")} height={wp("10%")} viewBox="0 0 625 625" fill="none" style={{
                    stroke:lightTheme.darkGrey,
                    strokeWidth:"33.1px",
                    strokeLinejoin:"round",
                    strokeMiterlimit:"1.5"
                }}/>
                <Text style={ styles.headerText }>Compartilhar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={ styles.bottomWrapper }
            >
                <Icons name="Star" width={wp("10%")} height={wp("10%")} viewBox="0 0 625 625" fill="none" style={{
                    stroke:lightTheme.darkGrey,
                    strokeWidth:"33.1px",
                    strokeLinejoin:"round",
                    strokeMiterlimit:"1.5"
                }}/>
                <Text style={ styles.headerText }>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={ styles.bottomWrapper }
            >
                <Icons name="Remove" width={wp("10%")} height={wp("10%")} viewBox="0 0 300 300" fill="none" style={{
                    stroke:lightTheme.darkGrey,
                    strokeWidth:"15.9px",
                    strokeLinejoin: "round",
                    strokeMiterlimit:"1.5"
                }}/>
                <Text style={ styles.headerText }>Denunciar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={ styles.bottomWrapper }
            >
                <Icons name="Remove" width={wp("10%")} height={wp("10%")} viewBox="0 0 300 300" fill="none" style={{
                    stroke:lightTheme.darkGrey,
                    strokeWidth:"15.9px",
                    strokeLinejoin: "round",
                    strokeMiterlimit:"1.5"
                }}/>
                <Text style={ styles.headerText }>Excluir</Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={{flex: 1, backgroundColor: lightTheme.ligthGrey}}>
            {   resolved ? 
                <ScrollView contentContainerStyle={{paddingBottom: 200}}>
                    {/* { postImage } */}
                    <View style={{
                        padding: wp("5%"), 
                        marginHorizontal: wp("2.5%"),
                        borderRadius: 20, 
                        borderColor: lightTheme.ligthGrey,
                        //borderTopWidth: wp("0.5%"),
                        // top: postImage === null? 0 : wp("-10%"),
                        top: 0,
                        borderBottomWidth: wp("0.5%"),
                        backgroundColor: lightTheme.ligthGrey,
                        // marginBottom: postImage === null? wp("5%") : wp("-5%")
                        marginBottom: wp("5%")
                    }}>
                        <View style={{
                            // marginHorizontal: wp("10%"),
                            // marginVertical: wp("5%")
                        }}>
                            <Text style={styles.headerText}>
                                {post.title}
                            </Text>
                            <Text style={{ marginBottom: wp("5%"), ...styles.bodyText }}>
                                {post.bodyText}
                            </Text>

                            <View style={styles.bottomWrapper}>
                                { props.photoPlaceholder }
                                <View style={{flex: 1.5, marginRight: wp("5%")}}>
                                    <Text style={styles.headerText2} numberOfLines={1}> 
                                        {post.author}
                                    </Text>
                                    <Text style={styles.bodyText2} numberOfLines={1}>
                                        Pewdie
                                    </Text>
                                </View>
                                <View style={{alignItems: 'flex-end', ...styles.rightButtonsWrapper}}>
                                    <Text style={{color: likeActive?lightTheme.green:lightTheme.darkGrey, marginBottom: wp("0.625%"), ...styles.rateText}}>
                                        {post.upvotes + (likeActive && 1)}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={ () => {
                                            setLikeActive(!likeActive)
                                        }}
                                    >
                                        <Icons name="Arrow" width={wp("10%")} height={wp("10%")} viewBox="0 0 300 300" fill="none" style={{
                                            stroke: likeActive?lightTheme.green:lightTheme.darkGrey ,
                                            strokeLinejoin: "round",
                                            strokeWidth:"15.9px",
                                            transform: [{ rotate: "90deg" }]
                                        }}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginLeft: wp("2.5%")}}
                                        onPress={() => setOptionsActive(!optionsActive)}
                                    >
                                        <Icons name="Options" width={wp("3.3%")} height={wp("10%")} viewBox="208 0 208 625" fill="none" style={{
                                            stroke: lightTheme.red,
                                            strokeWidth:"33.1px",
                                            strokeLinejoin: "round",
                                            strokeMiterlimit:"1.5"
                                        }}/>
                                    </TouchableOpacity>
                                </View>
                                {optionsActive && options}
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            paddingTop: metric/2,
                            top: wp("0")
                        }}
                    >
                        {comentaries}
                    </View>
                </ScrollView> :
                <Text style={{textAlign: "center"}}>Loading...</Text>
            }
            <InteligentButton 
                token={props.token}
                myInfos={props.myInfos}
                screen={screen}
                setScreen={screen => setScreen(screen)}
                forum={props.forum}
                post={props.post}
                postLength={props.postLength}
                handlePostList={props.handlePostList}
                handleScreenList={props.handleScreenList}
                handleDecrementPost={props.handleDecrementPost} 
                handleDecrementScreen={props.handleDecrementScreen} 
            />
        </View>
    );
}

export default Post;