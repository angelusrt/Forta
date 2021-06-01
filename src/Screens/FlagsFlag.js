import React, {useState, useEffect} from 'react'
import {View, Text, ScrollView} from "react-native"
import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import InteligentButton from "../components/InteligentButton.js"
import PostCard from "../components/PostCard";
import {lightTheme, styles} from "./../Styles"

function FlagsFlag(props) {
    //Controls further screens
    const[scrn, setScrn] = useState("FlagsFlag")

    //Stores card components
    const[cards, setCards] = useState(null)
    
    //Edit message of flag
    const[message, setMessage] = useState("")

    //Gets flags of a post or comment
    const onGet = async () => { 
        props.flagObj.isItPost ?
        await fetch(`http://192.168.0.111:3000/api/forums/${props.forum}/flags/${props.flagObj.post}/`, 
        props.getEnvelope)
        .then(res => res.json())
        .then(data => {
            if(data != null) 
                setCards(
                    data.flags.map((flag, index) =>(
                        <PostCard
                            token={props.token}
                            myInfos={props.myInfos}
                            post={props.flagObj.post}
                            forum={props.forum}
                            owner={props.flagObj.owner}
                            mods={props.flagObj.mods}

                            key={index}
                            mode="FlagsFlag"
                            isItPost={true}
                            bodyText={flag.message}
                            name={flag.sender}
                            rating={0}
                            
                            

                            setPrevScreen={props.setPrevScreen}
                            deleteEnvelope={props.deleteEnvelope}

                            setScreen={scrn => setScrn(scrn)}
                            setMessage={message => setMessage(message)}
                        />
                    ))
                )
        })
        .catch(err => err) : 
        await fetch(`http://192.168.0.111:3000/api/forums/${props.forum}/flags/${props.flagObj.post}/${props.flagObj.comentaries}`, 
        props.getEnvelope)
        .then(res => res.json())
        .then(data => {
            if(data != null) 
                setCards(
                    data.flags.map((flag, index) =>(
                        <PostCard
                            token={props.token}
                            myInfos={props.myInfos}
                            post={props.flagObj.post}
                            comments={props.flagObj.comentaries}
                            forum={props.forum}
                            owner={props.flagObj.owner}
                            mods={props.flagObj.mods}

                            key={index}
                            mode="FlagsFlag"
                            isItPost={false}
                            bodyText={flag.message}
                            name={flag.sender}
                            rating={0}

                            setPrevScreen={props.setPrevScreen}

                            setScreen={scrn => setScrn(scrn)}
                            setMessage={message => setMessage(message)}
                        />
                    ))
                )
        })
        .catch(err => err)
    }

    //Gets flags of a post or comment
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
                    Denuncias
                </Text> 
                
                <ScrollView contentContainerStyle={{paddingBottom: 200, marginTop: wp("2.5%")}}>
                    {cards}
                </ScrollView>
            </View>

            <InteligentButton 
                token={props.token}
                myInfos={props.myInfos}
                flagObj={props.flagObj}
                forum={props.forum}

                screen={scrn}
                message={message}
                
                setPrevScreen={props.setPrevScreen}

                setScrn={scrn => setScrn(scrn)}
            />
        </View>
    )
}

export default FlagsFlag