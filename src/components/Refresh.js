import React, {useEffect, useState} from "react"
import {Animated, Easing} from "react-native"

import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import Icons from "./../components/Icons"
import {iconStyles} from "./../Styles.js"

function Refresh(){
    //Animation variable
    const[animRot, setAnimRot] = useState(new Animated.Value(0))

    //Range that'll be interpolated
    const spin = animRot.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    //Updates animation loop
    useEffect(() => {
        Animated.loop(Animated.timing(animRot,{
            toValue: 1,
            duration: 450,
            easing: Easing.linear,
            useNativeDriver: true
        })).start()
    },[animRot])

    return(
        <Animated.View style={{
            flex: 1,
            transform: [{ rotate: spin }],  
            justifyContent: "center", 
            alignItems: "center"
        }}>
            <Icons 
                name="Refresh" 
                width={wp("20%")} 
                height={wp("20%")} 
                viewBox="0 0 625 625" 
                fill="none" 
                style={iconStyles.icon10}
            />
        </Animated.View>
    )
}

export default Refresh