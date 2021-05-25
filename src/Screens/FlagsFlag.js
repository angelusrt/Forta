import React, {useState, useEffect} from 'react'
import {View, Text, ScrollView} from "react-native"
import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import InteligentButton from "../components/InteligentButton.js"
import PostCard from "../components/PostCard";
import {lightTheme, styles} from "./../Styles"

function FlagsFlag(props) {
    const[cards, setCards] = useState(null)
    const[screen, setScreen] = useState("FlagsFlag")

    const onTryToGetFlags = async () => {
        let link 
        props.flagObj.isItPost ?
        link = `http://192.168.0.111:3000/api/forums/${props.forum}/flags/${props.flagObj.post}/` :
        link = `http://192.168.0.111:3000/api/forums/${props.forum}/flags/${props.flagObj.post}/${props.flagObj.comentaries}`
        
        console.log(props.flagObj)
        await fetch(link, props.getEnvelope)
        .then(res => res.json())
        .then(data => {
            console.log(data)
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
                            owner={props.flagObj.owner}
                            mods={props.flagObj.mods}
                            mode="FlagsFlag"
                            forum={props.forum}
                            rating={0}
                            deleteEnvelope={props.deleteEnvelope}
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
                screen={screen}
                setScreen={screen => setScreen(screen)}
                flagObj={props.flagObj}
                handleDecrementScreen={props.handleDecrementScreen}
            />
        </View>
    )
}

export default FlagsFlag