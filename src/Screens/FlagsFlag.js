import React, {useState, useEffect} from 'react'
import {View, Text, ScrollView} from "react-native"
import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import InteligentButton from "../components/InteligentButton.js"
import PostCard from "../components/PostCard";
import {lightTheme, styles} from "./../Styles"

function FlagsFlag(props) {
    const[cards, setCards] = useState(null)
    const[screen, setScreen] = useState("FlagsFlag")
    const[message, setMessage] = useState("")

    const onTryToGetFlags = async () => { 
        props.flagObj.isItPost ?
        await fetch(`http://192.168.0.111:3000/api/forums/${props.forum}/flags/${props.flagObj.post}/`, props.getEnvelope)
        .then(res => res.json())
        .then(data => {
            if(data != null) {
                setCards(
                    data.flags.map((flag, index) =>(
                        <PostCard
                            key={index}
                            token={props.token}
                            myInfos={props.myInfos}

                            title={null}
                            bodyText={flag.message}
                            name={flag.sender}
                            rating={0}

                            owner={props.flagObj.owner}
                            mods={props.flagObj.mods}

                            isItPost={true}
                            post={props.flagObj.post}
                            forum={props.forum}

                            mode="FlagsFlag"
                            setMessage={message => setMessage(message)}
                            setScreen={screen => setScreen(screen)}
                            handleDecrementScreen={props.handleDecrementScreen}
                            deleteEnvelope={props.deleteEnvelope}
                        />
                    ))
                )
            }  
        })
        .catch(err => err) : 
        await fetch(`http://192.168.0.111:3000/api/forums/${props.forum}/flags/${props.flagObj.post}/${props.flagObj.comentaries}`, props.getEnvelope)
        .then(res => res.json())
        .then(data => {
            if(data != null) {
                setCards(
                    data.flags.map((flag, index) =>(
                        <PostCard
                            key={index}
                            token={props.token}
                            myInfos={props.myInfos}

                            title={null}
                            bodyText={flag.message}
                            name={flag.sender}
                            rating={0}

                            owner={props.flagObj.owner}
                            mods={props.flagObj.mods}

                            isItPost={false}
                            post={props.flagObj.post}
                            coments={props.flagObj.comentaries}
                            forum={props.forum}

                            mode="FlagsFlag"
                            setScreen={screen => setScreen(screen)}
                            handleDecrementScreen={props.handleDecrementScreen}
                        />
                    ))
                )
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
                    Denuncias
                </Text> 
                
                <ScrollView contentContainerStyle={{marginTop: wp("2.5%")}}>
                    {cards}
                </ScrollView>
            </View>

            <InteligentButton 
                token={props.token}
                myInfos={props.myInfos}
                forum={props.forum}
                message={message}
                screen={screen}
                setScreen={screen => setScreen(screen)}
                flagObj={props.flagObj}
                handleDecrementScreen={props.handleDecrementScreen}
            />
        </View>
    )
}

export default FlagsFlag