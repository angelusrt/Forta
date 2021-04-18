import React, {useState, useEffect} from 'react';
import _reactNative, { View, ScrollView, Text, TouchableOpacity, Platform} from "react-native"

import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import Icons from "./../components/Icons";

import { lightTheme, styles } from "./../Styles.js";
import PostCard from "./../components/PostCard";
import InteligentButton from "../components/InteligentButton.js";
import ObjectByString from "../components/ObjectByString";

function Forum(props) {
    const[forum, setForum] = useState()
    const[posts, setPosts] = useState([])
    const[resolved, setResolved] = useState(false)
    const[follow, setFollow] = useState(true)
    const[optionsActive, setOptionsActive] = useState(false)

    const metric = wp("5%")
    
    let profileImage = 
        <View style={{
            width: metric * 4,
            height: metric * 4,
            backgroundColor: lightTheme.yellow,
            borderRadius: 10,
            borderColor: lightTheme.ligthGrey,
            borderWidth: wp("0.625%")
        }}/>

    let bannerImage = 
        <View style={{
            width: "100%",
            height: wp("35%"),
            backgroundColor: lightTheme.red,
            borderRadius: 5, 
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
        }}/>

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

    const onTryToGetForum = async () => { 
        return await fetch(`http://192.168.0.106:3000/api/forums/${props.forum}`, httpEnvelope )
                    .then( res => res.json() )
                    .then( data => {
                        setForum(data)                
                        setPosts(data.posts.map( (posts, index) => (
                            <PostCard 
                                key={`2_${index}`}
                                imagePlaceholder={
                                    <View style={{
                                        width: wp("95%"),
                                        height: wp("95%"),
                                        marginLeft: wp("2.5%"),
                                        marginTop: wp("-20%"),
                                        top: wp("20%"),
                                        borderColor: lightTheme.ligthGrey,
                                        borderTopWidth: wp("0.5%"),
                                        backgroundColor: lightTheme.notSoDarkGrey,
                                        borderRadius: 20, 
                                    }}/>
                                }
                                title={posts.title}
                                bodyText={posts.bodyText}
                                name={posts.author}
                                forum={data.groupName}
                                rating={posts.upvotes}
                                post={posts._id}
                                handlePostList={props.handlePostList}
                                handleScreenList={props.handleScreenList}
                            />
                        )))
                        setResolved(true)
                    })
                    .catch( err => console.log(err) )
    }
    
    useEffect(() => {
        onTryToGetForum()
    },[])

    let options = (
        <View
            style={{
                position: 'absolute',
                top: wp("10%"),
                right: 0,
                ...styles.options
            }}
        >
            <TouchableOpacity
                style={ styles.bottomWrapper }
            >
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
            <TouchableOpacity
                style={ styles.bottomWrapper }
            >
                <Icons name="Bios" width={wp("10%")} height={wp("10%")} viewBox="0 0 625 625" fill="none" style={{
                    stroke:lightTheme.darkGrey,
                    strokeWidth:"33.1px",
                    strokeLinejoin: "round",
                    strokeMiterlimit:"1.5"
                }}/>
                <Text style={ styles.headerText }>Regras</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={ styles.bottomWrapper }
            >
                <Icons name="Comentaries" width={wp("10%")} height={wp("10%")} viewBox="0 0 625 625" fill="none" style={{
                    stroke:lightTheme.darkGrey,
                    strokeWidth:"33.1px",
                    strokeLinejoin: "round",
                    strokeMiterlimit:"1.5"
                }}/>
                <Text style={ styles.headerText }>Mods</Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={{flex: 1, backgroundColor: lightTheme.ligthGrey}}>
            {   resolved ? 
                <ScrollView contentContainerStyle={{paddingBottom: 200}}>
                    { bannerImage }
                    
                    <View style={{
                        //marginHorizontal: wp("5%"),
                        top: wp("-10%")
                    }}>
                        <View style={{
                            flex: 1, 
                            padding: metric,
                            marginHorizontal: metric/2,
                            marginBottom: metric,
                            borderRadius: metric,
                            backgroundColor: lightTheme.ligthGrey,
                        }}>
                            <View
                                style={{
                                    marginBottom: metric,
                                    overflow: 'hidden',
                                    ...styles.bottomWrapper
                                }}
                            >
                                { profileImage }

                                <View Style={styles.bottomWrapper}>
                                    <View style={{
                                        paddingLeft: metric,
                                        width: metric * 13
                                    }}>
                                        <Text 
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                //flex: 1,
                                                marginBottom: -wp("2.5%"),
                                                ...styles.headerText3
                                            }}
                                        >
                                            {forum.groupName}
                                        </Text>
                                        <View style={{
                                            marginBottom: metric,
                                            ...styles.bottomWrapper
                                        }}>
                                            {
                                                forum.tags.map(tag => (
                                                    <Text numberOfLines={1} style={{
                                                        paddingRight: metric/2,
                                                        ...styles.bodyText2
                                                    }}>
                                                        {tag}
                                                    </Text>                                
                                                ))
                                            }
                                        </View>
                                    </View>
                                </View>
                            </View>
                            
                            <Text style={{ marginBottom: metric/2, ...styles.bodyText }}>
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
                                        onPress={ () => {
                                            setFollow(!follow)
                                        }}
                                    >
                                        <Icons name="Arrow" width={wp("10%")} height={wp("10%")} viewBox="0 0 300 300" fill="none" style={{
                                            stroke: follow ? lightTheme.green : lightTheme.darkGrey ,
                                            strokeLinejoin: "round",
                                            strokeWidth:"15.9px",
                                            transform: [{ rotate: "180deg" }]
                                        }}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Icons name="Bell" width={wp("10%")} height={wp("10%")} viewBox="0 0 625 625" fill="none" style={{
                                            stroke: lightTheme.darkGrey,
                                            strokeWidth:"33.1px",
                                            strokeLinejoin: "round",
                                            strokeMiterlimit:"1.5"
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

                                { optionsActive && options } 
                            </View>
                        </View>
                    </View>
                    
                    <View 
                        style={{backgroundColor: lightTheme.ligthGrey, 
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            paddingTop: metric/2,
                            top: wp("-12.5%")
                        }}
                    >
                        {posts}
                    </View>
                </ScrollView> : 
                <Text style={{textAlign: "center"}}>Loading...</Text>
            }
            <InteligentButton 
                postLength={props.postLength} 
                handleDecrementPost={props.handleDecrementPost} 
                
                handleDecrementScreen={props.handleDecrementScreen} 
                screen="Forum"
            />
        </View>
    );
}

export default Forum;