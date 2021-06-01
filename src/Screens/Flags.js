import React, {useState, useEffect} from 'react'
import {View, Text, ScrollView} from "react-native"
import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import InteligentButton from "../components/InteligentButton.js"
import PostCard from "../components/PostCard";
import {lightTheme, styles} from "./../Styles"

function Flags(props) {
    //Stores all cards components
    const[cards, setCards] = useState([])

    const onGetPostsAndComments = async (isItPost, post, comments = "", index) => {
        isItPost ?
        await fetch(`http://192.168.0.111:3000/api/forums/${props.forum}/posts/${post}`, 
        props.getEnvelope)
        .then(res => res.json())
        .then(data => { 
            if(data != null) 
                setCards( state => [state, 
                    <PostCard
                        token={props.token}
                        myInfos={props.myInfos}
                        deleteEnvelope={props.deleteEnvelope}

                        key={index}
                        mode="Flags"
                        isItPost={true}
                        title={data.post.title}
                        bodyText={data.post.bodyText}
                        name={data.post.author}
                        owner={data.owner}
                        mods={data.mods}
                        forum={data.post.forum}
                        post={post}
                        comments={comments}
                        rating={data.post.upvotes}
                        
                        setScreen={props.setScreen}
                        setPrevScreen={props.setPrevScreen}
                        setForum={props.setForum}
                        setFlagObj={props.setFlagObj} 
                    />
                ])
        })
        .catch(err => err) :
        await fetch(`http://192.168.0.111:3000/api/forums/${props.forum}/posts/${post}/comentaries/${comments}`, 
        props.getEnvelope)
        .then(res => res.json())
        .then(data => {
            if(data != null) 
                setCards( state => [
                    state,
                    <PostCard
                        token={props.token}
                        myInfos={props.myInfos}
                        deleteEnvelope={props.deleteEnvelope}

                        key={index}
                        mode="Flags"
                        isItPost={false}
                        bodyText={data.comentary.bodyText}
                        name={data.comentary.author}
                        owner={data.owner}
                        mods={data.mods}
                        forum={data.comentary.forum}
                        post={post}
                        comments={comments}
                        rating={data.comentary.upvotes}
                        
                        setScreen={props.setScreen}
                        setForum={props.setForum}
                        setFlagObj={props.setFlagObj}
                    /> 
                ])
        })
        .catch(err => err)
    }

    //On get posts and comments flagged
    const onGet = async () => {
        await fetch(`http://192.168.0.111:3000/api/forums/${props.forum}/flags`, 
        props.getEnvelope)
        .then(res => res.json())
        .then(data => { 
            if(data.flags[0] != null) 
                data.flags.map((obj, index) => {
                    onGetPostsAndComments(
                        obj.isItPost, 
                        obj.post, 
                        obj.comentaries,
                        index
                    )
                })
        })
        .catch(err => err)
    }   

    //Updates cards
    useEffect(() => {onGet()},[])

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: lightTheme.ligthGrey,
        }}>
            <View style={{flex:1, width: wp("100%")}}>
                <Text style={{
                    marginLeft: wp("7.5%"), 
                    marginTop: wp("10%"),
                    ...styles.headerText3
                }}>
                    Posts denunciados
                </Text> 
                
                <ScrollView contentContainerStyle={{paddingBottom: 200, marginTop: wp("2.5%")}}>
                    <React.Fragment>
                        {cards.map(card => card)}
                    </React.Fragment>
                </ScrollView>
            </View>

            <InteligentButton 
                screen={"Flags"}
                setPrevScreen={props.setPrevScreen}
            />
        </View>
    )
}

export default Flags