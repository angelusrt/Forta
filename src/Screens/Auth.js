import React, {useState} from 'react'
import {View, Text, TextInput, TouchableOpacity} from "react-native"
import {widthPercentageToDP as wp} from "react-native-responsive-screen"
import {createStackNavigator} from "@react-navigation/stack"

import Icons from "../components/Icons"
import {iconStyles, lightTheme, styles} from "./../Styles.js"

function Login(props) {
    //Email and password setted by input 
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    //Method that logs and handle screen 
    const onLog = async () => {
        //Envelopes used in fetch api
        const postEnvelope = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        }
        let getEnvelope

        //Gets token 
        await fetch("http://192.168.0.111:3000/api/user/login", postEnvelope)
        .then(res => JSON.parse(JSON.stringify(res)).headers.map["auth-token"])
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

        //Gets myInfo 
        await fetch("http://192.168.0.111:3000/api/user/infos", getEnvelope)
        .then(res => res.json())
        .then(data => props.setMyInfos(data))
        .catch(err => console.log(err))

        //Goes to tab, where things happens
        props.setScreen()
    }
    
    return(
        <View style={styles.authContainer}>
            <View style={styles.authCard}>
                <Text style={styles.authHeader}>Entre</Text>
                
                <Text style={styles.authTitle}>Email</Text>
                <TextInput 
                    onChangeText={email => setEmail(email)}
                    style={styles.authInput}
                />
                
                <Text style={styles.authTitle}>Senha</Text>
                <TextInput 
                    onChangeText={ pass => setPassword(pass)}
                    secureTextEntry={ true }
                    style={ styles.authInput }
                />

                <TouchableOpacity onPress={() => props.navigation.navigate("Register")}>
                    <Text style={styles.authSubtitle}>Não tem uma conta? Crie!</Text>
                </TouchableOpacity>

                <View style={{marginTop: wp("5%"), ...styles.bottomWrapper}}>
                    <TouchableOpacity onPress={() => onLog()} style={styles.authGreenButton}>
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
            </View>
        </View>
    )
}

function Register(props) {
    //If params matches, it goes to User 
    const verify = () => {
        if (
            props.password === props.password2 && 
            props.password.length >= 8 && 
            props.email.length >= 8
        ) {
            props.navigation.navigate("User")
        } else {
            props.setEmail("")
            props.setPassword("")
            props.setPassword2("")
        }
    }

    return(
        <View style={styles.authContainer}>
            <View style={styles.authCard}>
                <Text style={styles.authSubheader}>01/02</Text>

                <Text style={styles.authHeader}>Registre</Text>
                
                <Text style={styles.authTitle}>Email</Text>
                <TextInput 
                    onChangeText={email => props.setEmail(email)}
                    style={styles.authInput}
                />
                
                <Text style={styles.authTitle}>Senha</Text>
                <TextInput 
                    onChangeText={pass => props.setPassword(pass)}
                    secureTextEntry={true}
                    style={styles.authInput}
                />

                <Text style={styles.authTitle}>Repita sua senha</Text>
                <TextInput 
                    onChangeText={pass => props.setPassword2(pass)}
                    secureTextEntry={true}
                    style={styles.authInput}
                />

                <Text style={styles.authSubtitle}>
                    Ao registrar estais a concordar com nossos 
                    <TouchableOpacity>
                        <Text style={styles.authGreenSubtitle}>termos</Text>
                    </TouchableOpacity>
                </Text>

                <View style={{marginTop: wp("5%"), ...styles.bottomWrapper}}>
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
            </View>
        </View>
    )
}

function User(props) {
    //Method that logs and handle screen
    const onLog = async () => {
        //Envelopes used in fetch api
        const postEnvelope = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: props.username,
                email: props.email,
                password: props.password,
                bios: props.bios
            })
        }
        let getEnvelope

        //Register and gets token
        await fetch("http://192.168.0.111:3000/api/user/register", postEnvelope)
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
        await fetch("http://192.168.0.111:3000/api/user/infos", getEnvelope)
        .then(res => res.json())
        .then(data => props.setMyInfos(data))
        .catch(err => console.log(err))

        //Goes to tab, where things happens
        props.setScreen()
    }   

    //If params matches logs, or else it'll clean variables
    const verify = () => {
        if (
            props.username.length <= 16 && props.bios.length <= 16 &&
            props.username !== "<Username>" && props.bios !== "<Bios>"
        ) {
            onLog()
        } else {
            props.setUsername("<Username>")
            props.setBios("<Bios>")
        }
    }

    return(
        <View style={styles.authContainer}>
            <View style={styles.authCard}>
                <View style={{
                    position: 'absolute',
                    right: -wp("7.5%"),
                    top: -wp("20%"),
                    width: wp("100%"),
                    height: wp("35%"),
                    marginBottom: wp("5%"),
                    borderRadius: 5,
                    backgroundColor: lightTheme.notSoLightGrey
                }}/>

                <View style={{
                    width: wp("95%"),
                    padding: wp("5%"),
                    marginLeft: -wp("5%"),
                    marginTop: wp("5%"), 
                    marginBottom: wp("5%"),
                    borderRadius: wp("2.5%"),
                    backgroundColor: lightTheme.ligthGrey,
                    ...styles.bottomWrapper 
                }}>
                    <View style={{
                        width: wp("20%"),
                        height: wp("20%"),
                        marginRight: wp("5%"),
                        borderRadius: wp("2.5%"),
                        backgroundColor: lightTheme.notSoLightGrey
                    }}/>

                    <View>
                        <Text style={{ 
                            fontFamily: 'Poppins_700Bold',
                            color: lightTheme.darkGrey,
                            fontSize: wp("7%"),
                            marginBottom: -wp("2.5%")
                        }}>
                            {props.username}
                        </Text>
                        
                        <Text style={styles.authSubheader}>{props.bios}</Text>
                    </View>
                </View>

                <Text style={styles.authSubheader}>02/02</Text>

                <Text style={{...styles.authHeader}}>Crie seu usuário</Text>
                
                <Text style={styles.authTitle}>Usuário</Text>
                <TextInput 
                    onChangeText={text => 
                        text !== "" ? props.setUsername(text) : 
                        props.setUsername(`<Username>`)
                    }
                    style={styles.authInput}
                />
                
                <Text style={styles.authTitle}>Bios</Text>
                <TextInput 
                    onChangeText={text => 
                        text !== "" ? props.setBios(text) : 
                        props.setBios(`<Bios>`)
                    }
                    style={styles.authInput}
                />

                <View style={{marginTop: wp("5%"), ...styles.bottomWrapper}}>
                    <TouchableOpacity onPress={() => verify()} style={styles.authGreenButton}>
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill={lightTheme.white} 
                            style={iconStyles.iconAuth}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ 
                        marginRight: wp("2.5%"),
                        padding: wp("3.5%"),
                        ...styles.bottomWrapper 
                    }}>
                        <Text style={styles.headerText}>Add foto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ 
                        marginRight: wp("2.5%"),
                        padding: wp("3.5%"),
                        ...styles.bottomWrapper 
                    }}>
                        <Text style={styles.headerText}>Add capa</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

function Auth(props) {
    //Creates a component that navigates beetween screens 
    const Stack = createStackNavigator()

    //Email and password used in Register and User
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[password2, setPassword2] = useState("")
    
    //Username and bios used in User
    const[username, setUsername] = useState(`<Username>`)
    const[bios, setBios] = useState(`<Bios>`)

    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" options={{header: () => null}}>
                { 
                    prop => 
                    <Login
                        {...prop} 
                        token={props.token}
                        myInfos={props.myInfos}

                        setToken={props.setToken}
                        setMyInfos={props.setMyInfos}
                        setScreen={props.setScreen}
                    />
                }
            </Stack.Screen>
            
            <Stack.Screen name="Register" options={{header: () => null}}>
                {
                    prop => 
                    <Register
                        {...prop}
                        email={email} 
                        password={password} 
                        password2={password2}
                        
                        setEmail={email => setEmail(email)}
                        setPassword={password => setPassword(password)}
                        setPassword2={password => setPassword2(password)}
                    />
                }
            </Stack.Screen>
            
            <Stack.Screen name="User" options={{header: () => null}}>
                {
                    prop => 
                    <User
                        {...prop} 
                        token={props.token}
                        myInfos={props.myInfos}

                        email={email} 
                        password={password}
                        username={username}
                        bios={bios}

                        setToken={props.setToken}
                        setMyInfos={props.setMyInfos}
                        setScreen={props.setScreen}

                        setEmail={email => setEmail(email)}
                        setPassword={password => setPassword(password)}
                        setUsername={username => setUsername(username)}
                        setBios={bios => setBios(bios)}
                    />
                } 
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default Auth