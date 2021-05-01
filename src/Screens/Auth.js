import React, {useState} from 'react'
import {View, Text, TextInput, TouchableOpacity} from "react-native"
import {widthPercentageToDP as wp} from "react-native-responsive-screen"
import {createStackNavigator} from "@react-navigation/stack"

import Icons from "../components/Icons"
import {iconStyles, lightTheme, styles} from "./../Styles.js"

function Login(props) {
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    const onTryToLog = async () => {
        const httpEnvelopePost = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }
        
        let httpEnvelopeGet = {}

        await fetch("http://192.168.0.106:3000/api/user/login", httpEnvelopePost)
        .then(res => JSON.parse(JSON.stringify(res)).headers.map["auth-token"])
        .then(data => {
            props.setToken(data)
    
            httpEnvelopeGet = {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': data
                }
            }
        })
        .catch(err => console.log(err))

        await fetch("http://192.168.0.106:3000/api/user/infos", httpEnvelopeGet)
        .then(res => res.json())
        .then(data => props.setMyInfos(data))
        .catch(err => console.log(err))

        props.handleToken()
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
                    <TouchableOpacity onPress={() => onTryToLog()} style={styles.authGreenButton}>
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
    const verify = () => {
        if (props.password === props.password2 && 
            props.password.length >= 8 && 
            props.email.length >= 8
        ){
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
    const onTryToLog = async () => {
        const httpEnvelopePost = {
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
        let httpEnvelopeGet = {}

        await fetch("http://192.168.0.106:3000/api/user/register", httpEnvelopePost)
        .then(res => res.json())
        .then(data => {
            props.setToken(data)

            httpEnvelopeGet = {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': data
                }
            }
        })
        .catch(err => err)

        await fetch("http://192.168.0.106:3000/api/user/infos", httpEnvelopeGet)
        .then(res => res.json())
        .then(data => props.setMyInfos(data))
        .catch(err => console.log(err))

        props.handleToken()
    }   

    const verify = () => {
        if (props.username.length <= 16 && props.bios.length <= 16 &&
            props.username !== "<Username>" && props.bios !== "<Bios>"
        ) {
            onTryToLog()
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
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[password2, setPassword2] = useState("")
    const[username, setUsername] = useState(`<Username>`)
    const[bios, setBios] = useState(`<Bios>`)

    const Stack = createStackNavigator()

    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" options={{header: () => null}}>
                {prop => 
                    <Login
                        {...prop} 
                        token={props.token}
                        setToken={token => props.setToken(token)}
                        myInfos={props.myInfos}
                        setMyInfos={myInfos => props.setMyInfos(myInfos)}
                        handleToken={() => props.handleToken()}
                    />
                }
            </Stack.Screen>
            
            <Stack.Screen name="Register" options={{header: () => null}}>
                {prop => 
                    <Register
                        {...prop}
                        email={email} 
                        setEmail={email => setEmail(email)}
                        password={password} 
                        setPassword={password => setPassword(password)}
                        password2={password2} 
                        setPassword2={password => setPassword2(password)}
                        setToken={token => props.setToken(token)}
                        handleToken={() => props.handleToken()}
                    />
                }
            </Stack.Screen>
            <Stack.Screen name="User" options={{header: () => null}}>
                {prop => 
                    <User
                        {...prop} 
                        email={email} 
                        setEmail={email => setEmail(email)}
                        password={password} 
                        setPassword={password => setPassword(password)}
                        username={username} 
                        setUsername={username => setUsername(username)}
                        bios={bios} 
                        setBios={bios => setBios(bios)}
                        token={props.token}
                        setToken={token => props.setToken(token)}
                        myInfos={props.myInfos}
                        setMyInfos={myInfos => props.setMyInfos(myInfos)}
                        handleToken={() => props.handleToken()}
                    />
                } 
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default Auth