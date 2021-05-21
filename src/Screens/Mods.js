import React, {useState, useEffect} from 'react'
import {View, Text, ScrollView, TouchableOpacity, Pressable} from "react-native"
import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import ContactCard from "./../components/ContactCard.js"
import InteligentButton from "../components/InteligentButton.js"
import {iconStyles, lightTheme, styles} from "./../Styles"

function Mods(props) {
    const[mods, setMods] = useState(null)
    const[owner, setOwner] = useState("")
    const[screen, setScreen] = useState("Mods")

    const onTryToGetMods = async () => {
        await fetch(`http://192.168.0.111:3000/api/forums/${props.forum}`, props.getEnvelope)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setOwner(data.owner)
            setMods(
                data.mods[0] != null ? data.mods.map((mods, index) => { return (
                    <ContactCard
                        key={index}
                        token={props.token}
                        myInfos={props.myInfos}
                        title={mods.mod}
                        subtitle={mods.stats === false ? "Pendent" : "Moderator"}
                        mode="Mod"
                        stats={mods.stats}
                        user={mods.mod}
                        owner={data.owner}
                    />
                )}) : null
            )
        })
        .catch(err => err)
    }   

    useEffect(() => {onTryToGetMods()},[])

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
                    Mods
                </Text>
                {   
                    mods !== null ? 
                    <ScrollView contentContainerStyle={{marginTop: wp("2.5%")}}>
                        {mods}
                    </ScrollView> :
                    <Text style={{marginLeft: wp("7.5%"), ...styles.bodyText4}}>
                        Nenhum mod foi adicionado
                    </Text>
                }
            </View>
            <InteligentButton 
                token={props.token}     
                myInfos={props.myInfos}  
                forum={props.forum}
                owner={owner} 
                getEnvelope={props.getEnvelope}
                screen={screen}
                setScreen={screen => setScreen(screen)}
                handleDecrementScreen={props.handleDecrementScreen}
            />
        </View>
    )
}

export default Mods