import React, {useEffect} from 'react'
import {View, Text, Pressable} from "react-native"
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  Easing
} from 'react-native-reanimated'

import ContactCard from '../ContactCard'
import {lightTheme, styles} from "../../Styles"

function ChatCardModal(props) {
    //Animation variables
    const posAnim = useSharedValue(props.pressInfos.pY)
    const opacAnim = useSharedValue(0)

    //Animation Styles
    const posStyle = useAnimatedStyle(() => {
        return {top: posAnim.value}
    })
    const opacStyle = useAnimatedStyle(() => {
        return {opacity: opacAnim.value}
    })

    //Transits to register page
    const transIn = () => {
        posAnim.value = withTiming(150, {
            easing: Easing.elastic(1)
        })
        opacAnim.value = withTiming(1, {
            easing: Easing.elastic(1)
      })
    }

    //Deletes chat
    const onDelete = async() => {
        await fetch(`${props.site}/api/chats/${props.chat}`, 
        props.deleteEnvelope)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    //Initiates transition
    useEffect(() => {transIn()},[])

    return (
        <View style={{
            position: 'absolute',
            height: "100%",
            backgroundColor: "transparent",
            width: "100%",
            margin: 0,
            zIndex: 2
        }}>
            <View
                style={{
                    position: 'absolute',
                    height: "100%",
                    backgroundColor: lightTheme.darkGrey,
                    opacity: 0.2,
                    width: "100%"
                }}
                onTouchStart={() => props.setIsModalActive()}
            />
            <Animated.View style={posStyle}>
                <ContactCard
                    site={props.site}
                    deleteEnvelope={props.deleteEnvelope}
                    title={props.title}
                    subtitle={props.subtitle}
                    favorite={props.favorite}
                    chat={props.chat}
                    mode={props.mode}
                    
                    isOnModal={true}

                    setScreen={props.setScreen}
                    setChat={props.setChat}
                    setFavorite={props.setFavorite}
                    setModalInfos={props.setModalInfos}
                    setIsModalActive={props.setIsModalActive}
                />
                <Animated.View style={[
                    styles.authCard,    
                    opacStyle
                ]}>
                    <Pressable 
                        android_ripple={{color: lightTheme.ligthGrey}}
                        onPress={() => onDelete()}
                        style={styles.optionButtons}
                    >
                        <Text style={styles.deleteText}>Excluir</Text>
                    </Pressable>
                </Animated.View>
            </Animated.View>
        </View>
    )
}

export default ChatCardModal