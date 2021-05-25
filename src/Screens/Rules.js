import React, {useState, useEffect} from 'react'
import {View, Text, ScrollView} from "react-native"
import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import InteligentButton from "../components/InteligentButton.js"
import {lightTheme, styles} from "./../Styles"

function Rules(props) {
    const[rules, setRules] = useState("")
    const[owner, setOwner] = useState("")
    const[screen, setScreen] = useState("Rules")

    const onTryToGetRules = async () => {
        await fetch(`http://192.168.0.111:3000/api/forums/${props.forum}/rules`, props.getEnvelope)
        .then(res => res.json())
        .then(data => {
            setOwner(data.owner)
            setRules(data.rules)
        })
        .catch(err => err)
    }   

    useEffect(() => {onTryToGetRules()},[])

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
                    Regras
                </Text>
                
                <ScrollView contentContainerStyle={{marginTop: wp("2.5%")}}>
                    <Text style={{
                        marginTop: wp("2.5%"),
                        marginLeft: wp("7.5%"),
                        marginRight: wp("7.5%"),
                        ...styles.rulesText
                    }}>
                        {rules}
                    </Text>
                </ScrollView>
            </View>

            <InteligentButton 
                token={props.token}     
                myInfos={props.myInfos} 
                rules={rules} 
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

export default Rules