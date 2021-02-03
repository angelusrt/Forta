import React, {useState, useEffect} from 'react';
import _reactNative, { View, ScrollView, Text, TouchableOpacity, Platform} from "react-native"

import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import Icons from "./../components/Icons";

import { lightTheme, styles } from "./../Styles.js";
import PostCard from "./../components/PostCard";
import InteligentButton from "../components/InteligentButton.js";
import ObjectByString from "../components/ObjectByString";

function Forum(props) {
    const[follow, setFollow] = useState(true)
    const[optionsActive, setOptionsActive] = useState(false)

    const metric = wp("5%")
    
    let profileImage = 
        ObjectByString(props.db, `${props.forum}.profileImage`) != null ?
        <View style={{
            width: metric * 4,
            height: metric * 4,
            backgroundColor: lightTheme.yellow,
            borderRadius: 10,
            borderColor: lightTheme.kindOfLightGrey,
            borderWidth: wp("0.625%")
        }}/> : 
        <View style={{
            width: metric * 4,
            height: metric * 4,
            backgroundColor: lightTheme.red,
            borderRadius: 10,
            borderColor: lightTheme.kindOfLightGrey,
            borderWidth: wp("0.625%")
        }}/>

    let bannerImage = 
        ObjectByString(props.db, `${props.forum}.bannerImage`) != null ?
        <View style={{
            width: "100%",
            height: wp("35%"),
            backgroundColor: lightTheme.red,
            borderRadius: 20, 
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
        }}/>:
        <View style={{
            width: "100%",
            height: wp("35%"),
            backgroundColor: lightTheme.yellow,
            borderRadius: 20, 
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
        }}/>


    let forum = []
    forum = ObjectByString(props.db, `${props.forum}.posts`).map(
        (posts, index) => (
            <PostCard 
                key={index}
                imagePlaceholder={
                    posts.postImage != null?
                    <View style={{
                        width: "100%",
                        height: wp("90%"),
                        backgroundColor: lightTheme.darkGrey,
                        borderRadius: 20, 
                    }}/> : null
                }
                title={posts.title}
                bodyText={posts.body}
                name={ObjectByString(props.db, posts.name)}
                forum={ObjectByString(props.db, `${props.forum}.name`)}
                rating={posts.upvotes}
                post={`${props.forum}.posts[${index}]`}
                handlePostList={props.handlePostList}
                handleScreenList={props.handleScreenList}
            />
        )
    )

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
        <View style={{flex: 1, backgroundColor: lightTheme.kindOfLightGrey}}>
            <ScrollView contentContainerStyle={{paddingBottom: 200}}>
            { bannerImage }
                <View style={{
                    marginHorizontal: metric,
                    top: wp("-15%")
                }}>
                    { profileImage }
                    <View style={{ marginHorizontal: metric, marginTop: metric/2 }}>
                        <Text style={styles.headerText3}>
                            {ObjectByString(props.db, `${props.forum}.name`)}
                        </Text>
                        <View style={{marginBottom: metric, ...styles.bottomWrapper}}>
                            {
                                ObjectByString(props.db, `${props.forum}.tags`).map(tag => (
                                    <Text style={{paddingRight: metric/2 ,...styles.bodyText2}}>{tag}</Text>                                
                                ))
                            }
                        </View>
                        <Text style={{ marginBottom: metric/2, ...styles.bodyText }}>
                            {ObjectByString(props.db, `${props.forum}.bios`)}
                        </Text>
                        <View style={styles.bottomWrapper}>
                            <View style={{flex: 1.5, marginRight: wp("5%")}}>
                                <Text style={{color: lightTheme.darkGrey, ...styles.rateText}}>
                                    {`${ObjectByString(props.db, `${props.forum}.followers`)} membros`}
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
                            {
                                optionsActive && options
                            } 
                        </View>
                    </View>
                </View>
                <View 
                    style={{backgroundColor: lightTheme.kindOfLightGrey, 
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingTop: metric/2,
                        top: wp("-12.5%")
                    }}
                >
                    {forum}
                </View>
            </ScrollView>
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