import React, {useState, useEffect} from 'react'
import {View, Text, ScrollView} from "react-native"
import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import InteligentButton from "../components/InteligentButton.js"
import PostCard from "../components/PostCard";
import {lightTheme, styles} from "./../Styles"

function Flags(props) {
    const[owner, setOwner] = useState("")
    const[mods, setMods] = useState([""])
    const[cards, setCards] = useState(null)

    const onTryToGetPostsAndComentaries = async (isItPost, post, comentaries = "", index) => {
        if(isItPost){
            await fetch(`http://192.168.0.111:3000/api/forums/${props.forum}/posts/${post}`, props.getEnvelope)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data != null) {
                    setCards( state => (
                        state, 
                        <PostCard
                            key={index}
                            token={props.token}
                            myInfos={props.myInfos}
                            title={data.title}
                            bodyText={data.bodyText}
                            name={data.author}
                            owner={owner}
                            mods={mods}
                            mode="Flags"
                            isItPost={true}
                            forum={data.forum}
                            post={post}
                            coments={comentaries}
                            rating={data.upvotes}
                            handleFlagObj={props.handleFlagObj}
                            handleScreenList={props.handleScreenList}
                            deleteEnvelope={props.deleteEnvelope}
                        />
                    ))
                }  
            })
            .catch(err => err)
        } else {
            await fetch(`http://192.168.0.111:3000/api/forums/${props.forum}/posts/${post}/comentaries/${comentaries}`, props.getEnvelope)
            .then(res => res.json())
            .then(data => {
                if(data != null) {
                    setCards( state => (
                        state, 
                        <PostCard
                            key={index}
                            token={props.token}
                            myInfos={props.myInfos}
                            title={null}
                            bodyText={data.bodyText}
                            name={data.author}
                            owner={owner}
                            mods={mods}
                            mode="Flags"
                            isItPost={true}
                            forum={data.forum}
                            post={post}
                            coments={comentaries}
                            rating={data.upvotes}
                            flagObj={{isItPost,post,comentaries}}
                            handleFlagObj={props.setFlagObj}
                            handleScreenList={props.handleScreenList}
                        />
                    ))
                } 
            })
            .catch(err => err)
        }
    }

    const onTryToGetFlags = async () => {
        await fetch(`http://192.168.0.111:3000/api/forums/${props.forum}/flags`, props.getEnvelope)
        .then(res => res.json())
        .then(data => {
            setOwner(data.owner)
            setMods(data.mods)
            console.log(data)
            if(data.flags[0] != null){
                data.flags.map((obj, index) => {
                    onTryToGetPostsAndComentaries(
                        obj.isItPost, 
                        obj.post, 
                        obj.comentaries,
                        index
                    )
                })
            }
        })
        .catch(err => err)
    }   

    useEffect(() => {onTryToGetFlags()},[])

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
                
                <ScrollView contentContainerStyle={{marginTop: wp("2.5%")}}>
                    {cards}
                </ScrollView>
            </View>

            <InteligentButton 
                screen={"Flags"}
                handleDecrementScreen={props.handleDecrementScreen}
            />
        </View>
    )
}

export default Flags