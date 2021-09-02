import React, {useState, useEffect} from 'react'
import {View, Text, ScrollView} from "react-native"
import {useBackHandler} from '@react-native-community/hooks'

import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import InteligentButton from "../components/InteligentButton.js"
import {lightTheme, styles} from "./../Styles"

function Rules(props) {
    //Controls further screens
    const[scrn, setScrn] = useState("Rules")
    
    //Stores rules 
    const[rules, setRules] = useState("")
    
    //Owner of the forum
    const[owner, setOwner] = useState("")
    
    //Gets rules
    const onGet = async () => {
        await fetch(`${props.site}/api/forums/${props.forum}/rules`, 
        props.getEnvelope)
        .then(res => res.json())
        .then(data => {
            setOwner(data.owner)
            setRules(data.rules)
        })
        .catch(err => err)
    }   

    //Updates rules
    useEffect(() => {onGet()},[])

    useBackHandler(() => {
        props.setPrevScreen()
        return true    
    })

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
                site={props.site}
                token={props.token}     
                myInfos={props.myInfos} 
                forum={props.forum}
                getEnvelope={props.getEnvelope}

                rules={rules} 
                owner={owner} 
                screen={scrn}
                
                setPrevScreen={props.setPrevScreen}
            
                setScrn={scrn => setScrn(scrn)}
            />
        </View>
    )
}

export default Rules