import React, {useState, useEffect} from 'react';
import _reactNative, { View, ScrollView, Text, TouchableOpacity, Platform} from "react-native"

import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icons from "./../components/Icons";

import { lightTheme, styles } from "./../Styles.js";
import PostCard from "./../components/PostCard";
import InteligentButton from "../components/InteligentButton.js";
import ObjectByString from "../components/ObjectByString";

function Post(props) {
    const[likeActive, setLikeActive] = useState(false)
    let postImage = 
        ObjectByString(props.db, `${props.post}.postImage`) != null?
        <View style={{
            width: "100%",
            height: wp("100%"),
            backgroundColor: lightTheme.darkGrey,
            borderRadius: 20, 
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
        }}/> : 
        null

    let posts = []
    posts = ObjectByString(props.db, `${props.post}.comentaries`).map(
        (posts, index) => (
            <PostCard 
                key={index}
                title={posts.title}
                bodyText={posts.body}
                name={ObjectByString(props.db, posts.name)}
                forum="Pewdie"
                rating={posts.upvotes}
                post={`${props.post}.comentaries[${index}]`}
                handlePostList={props.handlePostList}
                handleScreenList={props.handleScreenList}
            />
        )
    )

    return (
        <View style={{flex: 1, backgroundColor: lightTheme.ligthGrey}}>
            <ScrollView contentContainerStyle={{width: "100%"}}>
                { postImage }
                <View>
                    <View style={{
                        marginHorizontal: wp("10%"),
                        marginVertical: wp("5%")
                    }}>
                        <Text style={styles.headerText}>
                            {ObjectByString(props.db, `${props.post}.title`)}
                        </Text>
                        <Text style={{ marginBottom: wp("5%"), ...styles.bodyText }}>
                            {ObjectByString(props.db, `${props.post}.body`)}
                        </Text>

                        <View style={styles.bottomWrapper}>
                            { props.photoPlaceholder }
                            <View style={{flex: 1.5, marginRight: wp("5%")}}>
                                <Text style={styles.headerText2} numberOfLines={1}> 
                                    {ObjectByString(props.db, ObjectByString(props.db, `${props.post}.name`))}
                                </Text>
                                <Text style={styles.bodyText2} numberOfLines={1}>
                                    Pewdie
                                </Text>
                            </View>
                            <View style={{alignItems: 'flex-end', ...styles.rightButtonsWrapper}}>
                                <Text style={{color: likeActive?lightTheme.green:lightTheme.darkGrey, marginBottom: wp("0.625%"), ...styles.rateText}}>
                                    {ObjectByString(props.db, `${props.post}.upvotes`) + (likeActive && 1)}
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
                                <TouchableOpacity style={{ marginLeft: wp("2.5%")}}>
                                    <Icons name="Options" width={wp("3.3%")} height={wp("10%")} viewBox="208 0 208 625" fill="none" style={{
                                        stroke: lightTheme.red,
                                        strokeWidth:"33.1px",
                                        strokeLinejoin: "round",
                                        strokeMiterlimit:"1.5"
                                    }}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {posts}
                </View>
            </ScrollView>
            <InteligentButton 
                postLength={props.postLength} 
                handleDecrementPost={props.handleDecrementPost} 

                handleDecrementScreen={props.handleDecrementScreen} 
                screen="Post"
            />
        </View>
    );
}

export default Post;