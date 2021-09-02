import React, {useState, useEffect, useMemo} from 'react'
import {View, Text, TextInput, TouchableOpacity, Platform} from "react-native"
import {useBackHandler} from '@react-native-community/hooks'

import Animated, { 
    useAnimatedStyle, 
    useSharedValue, 
    withTiming, 
    Easing, 
    runOnJS
} from 'react-native-reanimated'

import {createNativeStackNavigator} from "@react-navigation/native-stack"

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"

import Icons from "../components/Icons"
import {iconStyles, lightTheme, styles} from "../Styles.js"
import InteligentButton from "../components/InteligentButton";

function Login(props) {
    //Destructuring props
    const {navigation, route} = props

    //Email and password setted by input 
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    //Animation variables
    const heightAnim = useSharedValue(route.params.prevScreen !== "Register" ? 330 : 450)
    const marginAnim = useSharedValue(route.params.prevScreen !== "Register" ? 0 : 20)
    const opacAnim = useSharedValue(route.params.prevScreen !== "Register" ? 1 : 0.3)

    //Animation Styles
    const heightStyle = useAnimatedStyle(() => {
        return { height: heightAnim.value }
    })
    const TitleStyle = useAnimatedStyle(() => {
        return {
            marginTop: marginAnim.value,
            opacity: opacAnim.value
        }
    },[opacAnim.value])
    const opacStyle = useAnimatedStyle(() => {
        return { opacity: opacAnim.value }
    })

    //Transits to register page
    const transIn = () => {
        heightAnim.value = withTiming(330, {
            easing: Easing.elastic(1)
        })
        marginAnim.value = withTiming(0, {
            easing: Easing.elastic(1)
        })
        opacAnim.value = withTiming(1, {
            easing: Easing.elastic(1)
        })
    }

    //Navigates to register
    const onFinishedTransOut = () => {
        navigation.navigate("Register", {prevScreen: "Login"})
    }
    
    //Transits to register page
    const transOut = () => {
        heightAnim.value = withTiming(450, {
            easing: Easing.elastic(1)
        })
        marginAnim.value = withTiming(20, {
            easing: Easing.elastic(1)
        })
        opacAnim.value = withTiming(0.3, {
            easing: Easing.elastic(1)
        }, isFinished => {if(isFinished) runOnJS(onFinishedTransOut)()})
    }

    //Method that logs and handle screen 
    const onLog = async () => {
        //Envelopes used in fetch api
        const postEnvelope = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                host: "forta-forum.herokuapp.com",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        }
        let getEnvelope

        //Gets token 
        await fetch(`${props.site}/api/user/login`, postEnvelope)
        .then(res => JSON.parse(JSON.stringify(res)).headers.map["auth-token"])
        .then(data => {
            //Sets token required to go to tab
            props.setToken(data)

            //Sets envelope needed to fetch myInfo
            getEnvelope = {
                method: "GET",
                headers: {
                    // 'accept-encoding': 'gzip, deflate, br',
                    // connection: 'keep-alive',
                    // host: "forta-forum.herokuapp.com",
                    //"Access-Control-Allow-Origin": "*",
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': data
                }
            }
        })
        .catch(err => console.log(err))

        //Gets myInfo 
        await fetch(`${props.site}/api/user/infos`, getEnvelope)
        .then(res => res.json())
        .then(data => props.setMyInfos(data))
        .catch(err => console.log(err))

        //Goes to tab, where things happens
        props.setScreen()
    }
    
    //Verifies log conditions
    const verify = () => {
        if (email.length >= 8 && password.length >= 8) {
            onLog()
        } else {
            setEmail("")
            setPassword("")
        }
    }

    useEffect(() => {
        if(route.params.prevScreen === "Register") {
            route.params.prevScreen = "none"
            transIn() 
        }
    })

    return(
        <View style={styles.authContainer}>
            <Animated.View style={[
                styles.authCard,
                heightStyle
            ]}>
                <Animated.Text style={[
                    TitleStyle,
                    styles.authHeader
                ]}>
                    Entre
                </Animated.Text>
                
                <Text style={styles.authTitle}>Email</Text>
                <TextInput 
                    onChangeText={email => setEmail(email)}
                    style={styles.authInput}
                />
                
                <Text style={styles.authTitle}>Senha</Text>
                <TextInput 
                    onChangeText={pass => setPassword(pass)}
                    secureTextEntry={true}
                    style={styles.authInput}
                />


                <TouchableOpacity onPress={() => transOut()}>
                    <Animated.Text style={[
                        opacStyle,
                        styles.authSubtitle
                    ]}>
                        Não tem uma conta? Crie!
                    </Animated.Text>
                </TouchableOpacity>

                <View style={{
                    flex: 1, 
                    flexDirection: "row", 
                    alignItems: 'flex-end', 
                    marginTop: wp("5%")
                }}>
                    <TouchableOpacity 
                        onPress={() => verify()} 
                        style={styles.authGreenButton}
                    >
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill={lightTheme.white} 
                            style={iconStyles.iconAuth}
                        />
                    </TouchableOpacity>
                </View>
            </Animated.View>

            <View style={{
                position: 'absolute',
                bottom: hp(-6),
                zIndex: -1
            }}>
                <Icons 
                    name="Forta"                   
                    viewBox="0 0 2292 834" 
                    fill={lightTheme.kindOfLightGrey} 
                    width={wp("100%")} 
                    height={wp("100%")} 
                    style={{
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                        strokeLinejoin: "round",
                        strokeMiterlimit: 2,
                    }}
                />
            </View>
        </View>
    )
}

function Register(props) {
    //Destructuring props
    const {navigation, route} = props

    //Email and password used in Register and User
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[password2, setPassword2] = useState("")
    const[mountable, setMountable] = useState(true)

    //Animation variables
    const heightAnim = useSharedValue(route.params.prevScreen !== "User" ? 470 : 330)
    const marginAnim = useSharedValue(route.params.prevScreen !== "User" ? 0 : 120)
    const opacAnim = useSharedValue(route.params.prevScreen !== "User" ? 0.3 : 1)

    //Animation styles
    const heightStyle = useAnimatedStyle(() => {
        return { 
            height: heightAnim.value,
            marginTop: marginAnim.value 
        }
    }, [marginAnim.value])
    const opacStyle = useAnimatedStyle(() => {
        return { opacity: opacAnim.value }
    }, [opacAnim.value])

    //Transits to register page
    const transIn = () => {
        opacAnim.value = withTiming(1, {
            easing: Easing.elastic(1)
        })
    }

    const onFinishedTransOut = () => {
        navigation.navigate("Login", {prevScreen: "Register"})
    }

    //Transits to register page
    const transOut = () => {
        opacAnim.value = withTiming(0.3, {
            easing: Easing.elastic(1)
        }, isFinished => {if(isFinished) runOnJS(onFinishedTransOut)()})
    }

    const onFinishedTransInUser = () => setMountable(true)

    const transInUser = () => {
        heightAnim.value = withTiming(470, {
            easing: Easing.elastic(1)
        })
        marginAnim.value = withTiming(0, {
            easing: Easing.elastic(1)
        })
        opacAnim.value = withTiming(1, {
            easing: Easing.elastic(1)
        }, isFinished => {if(isFinished) runOnJS(onFinishedTransInUser)()})
    }

    const onFinishedTransOutUser = () => navigation.navigate("User", {email, password})

    const transOutUser = () => {
        setMountable(false)
        heightAnim.value = withTiming(330, {
            easing: Easing.elastic(1)
        })
        marginAnim.value = withTiming(120, {
            easing: Easing.elastic(1)
        }, isFinished => {if(isFinished) runOnJS(onFinishedTransOutUser)()})
        opacAnim.value = withTiming(0.3, {
            easing: Easing.elastic(1)
        })
    }

    //If params matches, it goes to User 
    const verify = () => {
        if ( 
            password === password2 && 
            password.length >= 8 && 
            email.length >= 8
        ) {
            transOutUser()
        } else {
            setEmail("")
            setPassword("")
            setPassword2("")
        }
    }

    useBackHandler(() => {
        transOut()
        return true    
    })

    useEffect(() => {
        if (route.params.prevScreen === "User") {
            transInUser()
            route.params.prevScreen = "UserF" 
        } else if (route.params.prevScreen === "Login") {
            transIn()
            route.params.prevScreen = "LoginF"
        }
    })

    return(
        <View style={styles.authContainer}>
            <Animated.View style={[
                heightStyle,
                styles.authCard
            ]}>
                <Animated.Text style={[ 
                    opacStyle,
                    styles.authSubheader
                ]}>
                    01/02
                </Animated.Text>

                <Animated.Text style={[
                    opacStyle, 
                    styles.authHeader
                ]}>
                    Registre
                </Animated.Text>
                
                <Text style={styles.authTitle}>Email</Text>
                <TextInput 
                    onChangeText={email => setEmail(email)}
                    style={styles.authInput}
                />
                
                <Text style={styles.authTitle}>Senha</Text>
                <TextInput 
                    onChangeText={pass => setPassword(pass)}
                    secureTextEntry={true}
                    style={styles.authInput}
                />
                {   
                    mountable &&
                    <React.Fragment>
                        <Animated.Text style={[
                            opacStyle,
                            styles.authTitle
                        ]}>
                            Repita sua senha
                        </Animated.Text>
                        <TextInput 
                            onChangeText={pass => setPassword2(pass)}
                            secureTextEntry={true}
                            style={styles.authInput}
                        />

                        <Animated.Text style={[
                            opacStyle, 
                            styles.authSubtitle
                        ]}>
                            Ao registrar estais a concordar com nossos 
                            <TouchableOpacity>
                                <Animated.Text style={[
                                    opacStyle,
                                    styles.authGreenSubtitle
                                ]}>
                                    termos
                                </Animated.Text>
                            </TouchableOpacity>
                        </Animated.Text>
                    </React.Fragment>
                }

                <View style={{
                    flex: 1, 
                    flexDirection: "row", 
                    alignItems: 'flex-end', 
                    marginTop: wp("5%")
                }}>
                    <TouchableOpacity onPress={verify} style={styles.authGreenButton}>
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill={lightTheme.white} 
                            style={iconStyles.iconAuth}
                        />
                    </TouchableOpacity>
                </View>
            </Animated.View>
            <View style={{
                position: 'absolute',
                bottom: hp(-6),
                zIndex: -1
            }}>
                <Icons 
                    name="Forta" 
                    viewBox="0 0 2292 834" 
                    fill={lightTheme.kindOfLightGrey}
                    width={wp("100%")} 
                    height={wp("100%")} 
                    style={{
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                        strokeLinejoin: "round",
                        strokeMiterlimit: 2,
                    }}
                />
            </View>
            {
                Platform.OS !== 'android' ? 
                <InteligentButton screen="Auth" setPrevScreen={() => transOut()}/> : 
                null
            }
        </View>
    )
}

function User(props) {
    //Email and password used in Register and User
    const[email, setEmail] = useState(props.route.params.email)
    const[password, setPassword] = useState(props.route.params.password)
    
    //Username and bios used in User
    const[username, setUsername] = useState(`Username`)
    const[bios, setBios] = useState(`Bios`)

    //Animation variables
    const posAnim = useSharedValue(-110)
    const opacAnim = useSharedValue(0.3)

    //Animation styles
    const posStyle = useAnimatedStyle(() => {
        return { top: posAnim.value }
    })
    const opacStyle = useAnimatedStyle(() => {
        return { opacity: opacAnim.value }
    })

    //Transits to register page
    const transIn = () => {
        posAnim.value = withTiming(90, {
            duration: 600, 
            easing: Easing.elastic(1)
        })
        opacAnim.value = withTiming(1, {
            easing: Easing.elastic(1)
        })
    }

    const onFinishedTransOut = () => {
        props.navigation.navigate("Register", {prevScreen: "User"})
    }

    const transOut = () => {
        posAnim.value = withTiming(-110, {
            easing: Easing.elastic(1)
        })
        opacAnim.value = withTiming(0.3, {
            easing: Easing.elastic(1)
        }, isFinished => {if(isFinished) runOnJS(onFinishedTransOut)()})
    }

    //Method that logs and handle screen
    const onLog = async () => {
        // console.log({
        //     username: username,
        //     email: email,
        //     password: password,
        //     bios: bios
        // })

        //Envelopes used in fetch api
        const postEnvelope = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                bios: bios
            })
        }
        let getEnvelope

        //Register and gets token
        await fetch(`${props.site}/api/user/register`, postEnvelope)
        .then(res => res.json())
        .then(data => {
            //Sets token required to go to tab
            props.setToken(data)

            //Sets envelope needed to fetch myInfo
            getEnvelope = {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': data
                }
            }
        })
        .catch(err => console.log(err))

        //Gets my info
        await fetch(`${props.site}/api/user/infos`, getEnvelope)
        .then(res => res.json())
        .then(data => props.setMyInfos(data))
        .catch(err => console.log(err))

        //Goes to tab, where things happens
        props.setScreen()
    }   

    //If params matches logs, or else it'll clean variables
    const verify = () => {
        if (
            username.length <= 16 && bios.length <= 16 &&
            username !== "Username" && bios !== "Bios"
        ) {
            onLog()
        } else {
            setUsername("Username")
            setBios("Bios")
        }
    }

    useBackHandler(() => {
        transOut()
        return true    
    })

    useEffect(() => {transIn()}, [])

    return(
        <View style={styles.authContainer}>
            <Animated.View style={[
                {
                    position: 'absolute',
                    width: wp(100),
                },
                posStyle
            ]}>
                <View style={{
                    position: 'absolute',
                    top: -wp("20%"),
                    width: "100%",
                    height: wp("35%"),
                    marginBottom: 30,
                    borderRadius: 5,
                    backgroundColor: "#7475B9"
                }}/>

                <View style={styles.authCard}>
                    <View style={styles.bottomWrapper}>
                        <View style={{
                            width: wp("20%"),
                            height: wp("20%"),
                            marginRight: wp("5%"),
                            borderRadius: 15,
                            backgroundColor: "#E76E72"
                        }}/>

                        <View>
                            <Text style={{ 
                                fontFamily: 'Poppins_700Bold',
                                color: lightTheme.darkGrey,
                                fontSize: wp("7%"),
                                marginBottom: -wp("2.5%")
                            }}>
                                {username}
                            </Text>
                            
                            <Text style={styles.authSubheader2}>{bios}</Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
            <View style={[{marginTop: 130}, styles.authCard]}>
                <Animated.Text style={[opacStyle, styles.authSubheader]}>
                    02/02
                </Animated.Text>

                <Animated.Text style={[opacStyle, styles.authHeader]}>
                    Crie seu usuário
                </Animated.Text>
                
                <Animated.Text style={[opacStyle, styles.authTitle]}>
                    Usuário
                </Animated.Text>
                <TextInput 
                    onChangeText={text => 
                        text !== "" ? setUsername(text) : 
                        setUsername(`Username`)
                    }
                    style={styles.authInput}
                />
                
                <Animated.Text style={[opacStyle, styles.authTitle]}>
                    Bios
                </Animated.Text>
                <TextInput 
                    onChangeText={text => 
                        text !== "" ? setBios(text) : 
                        setBios(`Bios`)
                    }
                    style={styles.authInput}
                />

                <View style={{
                    flexDirection: "row", 
                    alignItems: 'center', 
                    marginTop: wp("2.5%")
                }}>
                    <TouchableOpacity 
                        onPress={() => verify()} 
                        style={styles.authGreenButton}
                    >
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill={lightTheme.white} 
                            style={iconStyles.iconAuth}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={{marginRight: wp(5)}}>
                        <Animated.Text style={[opacStyle, styles.buttonText]}>
                            Add foto
                        </Animated.Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{marginRight: wp(5)}}>
                        <Animated.Text style={[opacStyle, styles.buttonText]}>
                            Add capa
                        </Animated.Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                position: 'absolute',
                bottom: hp(-6),
                zIndex: -1
            }}>
                <Icons 
                    name="Forta" 
                    viewBox="0 0 2292 834"  
                    fill={lightTheme.kindOfLightGrey} 
                    width={wp("100%")} 
                    height={wp("100%")} 
                    style={{
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                        strokeLinejoin: "round",
                        strokeMiterlimit: 2,
                    }}
                />
            </View>
            {
                Platform.OS !== 'android' ? 
                <InteligentButton screen="Auth" setPrevScreen={() => transOut()}/> : 
                null
            }
        </View>
    )
}
 
//Creates a component that navigates beetween screens
const Stack = createNativeStackNavigator()

function Auth(props) {
    return (
        <Stack.Navigator
            initialRouteName="Login" 
            screenOptions={{
                animation: 'none', 
                headerShown: false,
            }}
        >
            <Stack.Screen name="Login" initialParams={{prevScreen: "none"}}>
                {
                    prop => 
                    <Login
                        {...prop}
                        site={props.site}
                        token={props.token}
                        myInfos={props.myInfos}
    
                        setToken={props.setToken}
                        setMyInfos={props.setMyInfos}
                        setScreen={props.setScreen}
                    />
                }
            </Stack.Screen>
            <Stack.Screen name="Register" component={Register} initialParams={{prevScreen: "Login"}}/>
            <Stack.Screen name="User">
                {
                    prop =>
                    <User 
                        {...prop}
                        site={props.site}
                        token={props.token}
                        myInfos={props.myInfos}
    
                        setToken={props.setToken}
                        setMyInfos={props.setMyInfos}
                        setScreen={props.setScreen}
                    />
                }
            </Stack.Screen>
        </Stack.Navigator>
      )
}
export default Auth