import React, {useEffect} from 'react'
import {View, Text, Pressable} from "react-native"
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  Easing
} from 'react-native-reanimated'

import ContactCard from "../ContactCard"
import {lightTheme, styles} from "../../Styles"

function ForumCardModal(props) {
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

    //Deletes forum
    const onDelete = async() => {
        await fetch(`${props.site}/api/forums/${props.forum}`, 
        props.deleteEnvelope)
        .then(res => res.json())
        .then(data => props.onFunction())
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
                    myInfos={props.myInfos}
                    deleteEnvelope={props.deleteEnvelope}
                    title={props.title}
                    subtitle={props.subtitle}
                    owner={props.owner}
                    mods={props.mods}
                    favorite={props.favorite}
                    forum={props.forum}
                    mode={props.mode}
                    
                    isOnModal={true}

                    setScreen={props.setScreen}
                    setForum={props.setForum}
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
                        style={styles.optionButtons}
                        onPress={() => {
                            props.setScreen("Rules")
                            props.setForum(props.forum) 
                        }}
                    >
                        <Text style={styles.headerText}>
                            Regras
                        </Text>
                    </Pressable>
                    <Pressable 
                        android_ripple={{color: lightTheme.ligthGrey}}
                        style={styles.optionButtons}
                        onPress={() => {
                            props.setScreen("Mods")
                            props.setForum(props.forum) 
                        }}
                    >
                        <Text style={styles.headerText}>
                            Mods
                        </Text>
                    </Pressable>
                    {
                        props.owner === props.myInfos.id || 
                        props.mods.map(mod => mod) === props.myInfos.id ? 
                        <Pressable 
                            android_ripple={{color: lightTheme.ligthGrey}}
                            style={styles.optionButtons}
                            onPress={() => {
                                props.setScreen("Flags")
                                props.setForum(props.forum) 
                            }}
                        >
                            <Text style={styles.deleteText}>Denuncias</Text>
                        </Pressable> : 
                        null
                    }
                    {
                        props.owner === props.myInfos.id ? 
                        <Pressable 
                            android_ripple={{color: lightTheme.ligthGrey}}
                            onPress={onDelete}
                            style={styles.optionButtons}
                        >
                            <Text style={styles.deleteText}>Excluir</Text>
                        </Pressable> : null
                    }
                </Animated.View>
            </Animated.View>
        </View>
    )
}

export default ForumCardModal