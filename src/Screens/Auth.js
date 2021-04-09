import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, Button} from "react-native"
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { createStackNavigator } from "@react-navigation/stack"

//import InteligentButton from "../components/InteligentButton";
import Icons from "../components/Icons";

import { lightTheme, styles } from "./../Styles.js";

function Login(props) {
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    const onTryToLog = async () => {
        const httpEnvelope = {
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
        const token = await fetch("http://192.168.0.106:3000/api/user/login", httpEnvelope )
                            .then( res => JSON.parse(JSON.stringify(res)).headers.map["auth-token"])
                            .catch(err => console.log(err))

        await props.setToken(token)
        await props.handleToken()
        console.log(token)
    }
    
    return(
        <View style={ styles.authContainer }>
            <View style={ styles.authCard }>

                <Text style={ styles.authHeader }>Entre</Text>
                
                <Text style={ styles.authTitle }>Email</Text>

                <TextInput 
                    onChangeText={ email => setEmail(email)}
                    style={ styles.authInput }
                />
                
                <Text style={ styles.authTitle }>Senha</Text>

                <TextInput 
                    onChangeText={ pass => setPassword(pass)}
                    secureTextEntry={ true }
                    style={ styles.authInput }
                />

                <TouchableOpacity
                    onPress={ () => props.navigation.navigate("ChangePassword")}
                >
                    <Text style={ styles.authSubtitle }>Não se lembra da senha? Mude!</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={ () => props.navigation.navigate("Register")}
                >
                    <Text style={ styles.authSubtitle }>Não tem uma conta? Crie!</Text>
                </TouchableOpacity>

                <View style={{ marginTop: wp("5%"), ...styles.bottomWrapper }}>
                    <TouchableOpacity
                        onPress={ () => onTryToLog() } 
                        style={{
                            marginRight: wp("2.5%"),
                            backgroundColor: lightTheme.green, 
                            ...styles.authButton,
                            ...styles.bottomWrapper 
                        }}
                    >
                        <Icons name="Arrow" width={wp("10%")} height={wp("10%")} viewBox="0 0 300 300" fill={ lightTheme.white } style={{
                            stroke: lightTheme.white,
                            strokeLinejoin: "round",
                            strokeWidth:"9px",
                            transform: [{ rotate: "180deg" }]
                        }}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={ () => onTryToLog() } 
                        style={{
                            backgroundColor: lightTheme.ligthGrey, 
                            ...styles.authButton,
                            ...styles.bottomWrapper 
                        }}
                    >
                        <Icons name="Google" viewBox="0 0 300 300" fill="none" style={{
                            stroke: lightTheme.darkGrey,
                            strokeWidth:"15.9px",
                            strokeLinejoin: "round",
                            strokeMiterlimit:"1.5"
                        }}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={ () => onTryToLog() } 
                        style={{
                            backgroundColor: lightTheme.ligthGrey, 
                            ...styles.authButton,
                            ...styles.bottomWrapper 
                        }}
                    >
                        <Icons name="Facebook" viewBox="0 0 625 625" fill="none" style={{
                            stroke: lightTheme.darkGrey,
                            strokeWidth:"33.1px",
                            strokeLinejoin: "round",
                            strokeMiterlimit:"1.5"
                        }}/>    
                    </TouchableOpacity>
                </View>
            </View>

            {/* <InteligentButton 
                handleScreenList={props.handleScreenList} 
                screen={props.route}
            /> */}
        </View>
    )
}

function ChangePassword({navigation}) {
    return(
        <View style={ styles.authContainer }>
            {/* <View style={ styles.authTopCard }>
                <Icons name="Forta" width={wp("30%")} height={wp("30%")} viewBox="0 0 2292 834" fill={ lightTheme.notSoLightGrey } style={{
                    strokeWidth:"33.1px",
                    strokeLinejoin: "round",
                    strokeMiterlimit:"2"
                }}/>
            </View> */}
            <View style={ styles.authCard }>

                <Text style={ styles.authHeader }>Mude sua senha</Text>
                
                <Text style={ styles.authTitle }>Senha</Text>
                
                <TextInput 
                    secureTextEntry={ true }
                    style={ styles.authInput }
                />
                
                <Text style={ styles.authTitle }>Repita sua senha</Text>
                
                <TextInput 
                    secureTextEntry={ true }
                    style={ styles.authInput }
                />

                <TouchableOpacity
                    onPress={ () => onTryToLog() } 
                    style={{
                        marginRight: wp("2.5%"),
                        marginTop: wp("5%"),
                        backgroundColor: lightTheme.green, 
                        ...styles.authButton,
                        ...styles.bottomWrapper 
                    }}
                >
                    <Icons name="Arrow" width={wp("10%")} height={wp("10%")} viewBox="0 0 300 300" fill={ lightTheme.white } style={{
                        stroke: lightTheme.white,
                        strokeLinejoin: "round",
                        strokeWidth:"9px",
                        transform: [{ rotate: "180deg" }]
                    }}/>
                </TouchableOpacity>
            </View>

            {/* <InteligentButton 
                handleScreenList={props.handleScreenList} 
                screen={props.route}
            /> */}
        </View>
    )
}

function Register(props) {
    
    const verify = () => {
        if (
            (props.password === props.password2) &&
            (props.password.length >= 8) &&
            (props.email.length >= 8)
        ){
            props.navigation.navigate("User")
        } else{
            props.setEmail("")
            props.setPassword("")
            props.setPassword2("")
        }
    }

    return(
        <View style={ styles.authContainer }>
            {/* <View style={ styles.authTopCard }>
                <Icons name="Forta" width={wp("30%")} height={wp("30%")} viewBox="0 0 2292 834" fill={ lightTheme.notSoLightGrey } style={{
                    strokeWidth:"33.1px",
                    strokeLinejoin: "round",
                    strokeMiterlimit:"2"
                }}/>
            </View> */}
            <View style={ styles.authCard }>

                <Text style={ styles.authSubheader }>01/03</Text>

                <Text style={ styles.authHeader }>Registre</Text>
                
                <Text style={ styles.authTitle }>Email</Text>

                <TextInput 
                    onChangeText={ email => props.setEmail(email)}
                    style={ styles.authInput }
                />
                
                <Text style={ styles.authTitle }>Senha</Text>

                <TextInput 
                    onChangeText={ pass => props.setPassword(pass)}
                    secureTextEntry={ true }
                    style={ styles.authInput }
                />

                <Text style={ styles.authTitle }>Repita sua senha</Text>

                <TextInput 
                    onChangeText={ pass => props.setPassword2(pass)}
                    secureTextEntry={ true }
                    style={ styles.authInput }
                />

                <Text style={ styles.authSubtitle }>
                    Ao registrar estais a concordar com nossos 
                    <TouchableOpacity>
                        <Text style={ styles.authGreenSubtitle }>termos</Text>
                    </TouchableOpacity>
                </Text>

                <View style={{marginTop: wp("5%"), ...styles.bottomWrapper }}>
                    <TouchableOpacity
                        onPress={ verify } 
                        style={{
                            marginRight: wp("2.5%"),
                            backgroundColor: lightTheme.green, 
                            ...styles.authButton,
                            ...styles.bottomWrapper 
                        }}
                    >
                        <Icons name="Arrow" width={wp("10%")} height={wp("10%")} viewBox="0 0 300 300" fill={ lightTheme.white } style={{
                            stroke: lightTheme.white,
                            strokeLinejoin: "round",
                            strokeWidth:"9px",
                            transform: [{ rotate: "180deg" }]
                        }}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={ () => onTryToLog() } 
                        style={{
                            backgroundColor: lightTheme.ligthGrey, 
                            ...styles.authButton,
                            ...styles.bottomWrapper 
                        }}
                    >
                        <Icons name="Google" viewBox="0 0 300 300" fill="none" style={{
                            stroke: lightTheme.darkGrey,
                            strokeWidth:"15.9px",
                            strokeLinejoin: "round",
                            strokeMiterlimit:"1.5"
                        }}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={ () => onTryToLog() } 
                        style={{
                            backgroundColor: lightTheme.ligthGrey, 
                            ...styles.authButton,
                            ...styles.bottomWrapper 
                        }}
                    >
                        <Icons name="Facebook" viewBox="0 0 625 625" fill="none" style={{
                            stroke: lightTheme.darkGrey,
                            strokeWidth:"33.1px",
                            strokeLinejoin: "round",
                            strokeMiterlimit:"1.5"
                        }}/>    
                    </TouchableOpacity>
                </View>
            </View>
            {/* <InteligentButton 
                handleScreenList={props.handleScreenList} 
                screen={props.route}
            /> */}
        </View>
    )
}

function User(props) {

    const verify = () => {
        if (
            (props.username.length <= 16) &&
            (props.bios.length <= 16) &&
            (props.username !== "<Username>") &&
            (props.bios !== "<Bios>")
        ){
            onTryToLog()
        } else{
            props.setUsername("<Username>")
            props.setBios("<Bios>")
        }
    }

    const onTryToLog = async () => {
        const httpEnvelope = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password,
                bios
            })
        }
        const token = await fetch("http://192.168.0.106:3000/api/user/register", httpEnvelope )
                            .then( res => JSON.parse(res))
                            .catch(err => err)
        
        console.log(token)
        props.setToken(token)
        props.handleToken()
    }
    // {
    //     "type":"default","status":200,"ok":true,"headers":{
    //         "map":{
    //             "content-length":"149","connection":"keep-alive","x-powered-by":"Express","content-type":"text/html; charset=utf-8",
    //              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDI3ZGY4MDM1NzVjMzBkMDhkZWFkYzciLCJpYXQiOjE2MTYzNzA4ODZ9.p1hT1wYQVfY_QHkapjC2Kpn0DvSMtdeOUci_vXS63UQ","etag":"W/\"95-W2akAsncUlUMIChUVvDfjweEMUY\"","date":"Sun, 21 Mar 2021 23:54:46 GMT","cache-control":"public, max-age=0"
    //         }
    //     },"url":"http://192.168.0.106:3000/api/user/login","bodyUsed":false,"_bodyInit":{
    //         "_data":{
    //             "size":149,"offset":0,"blobId":"205892a7-4b56-48e7-adb9-e163255971cb","__collector":{}
    //         }
    //     },"_bodyBlob":{
    //         "_data":{
    //             "size":149,"offset":0,"blobId":"205892a7-4b56-48e7-adb9-e163255971cb","__collector":{}
    //         }
    //     }
    // }
    return(
        <View style={ styles.authContainer }>
            <View style={ styles.authCard }>

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
                            { props.username }
                        </Text>

                        <Text style={ styles.authSubheader }>{ props.bios }</Text>
                    </View>
                </View>

                <Text style={ styles.authSubheader }>03/03</Text>

                <Text style={{...styles.authHeader }}>Crie seu usuário</Text>
                
                <Text style={ styles.authTitle }>Usuário</Text>
                
                <TextInput 
                    onChangeText={ text => {
                        if(text !== ""){
                            console.log(text)
                            props.setUsername(text)
                        } else {
                            props.setUsername(`<Username>`)
                        }
                    }}
                    style={ styles.authInput }
                />
                
                <Text style={ styles.authTitle }>Bios</Text>

                <TextInput 
                    onChangeText={ text => {
                        if(text != ""){
                            props.setBios(text)
                        } else {
                            props.setBios(`<Bios>`)
                        }
                    }}
                    style={ styles.authInput }
                />

                <View style={{marginTop: wp("5%"), ...styles.bottomWrapper }}>
                    <TouchableOpacity
                        onPress={ () => verify } 
                        style={{
                            marginRight: wp("2.5%"),
                            backgroundColor: lightTheme.green, 
                            ...styles.authButton,
                            ...styles.bottomWrapper 
                        }}
                    >
                        <Icons name="Arrow" width={wp("10%")} height={wp("10%")} viewBox="0 0 300 300" fill={ lightTheme.white } style={{
                            stroke: lightTheme.white,
                            strokeLinejoin: "round",
                            strokeWidth:"9px",
                            transform: [{ rotate: "180deg" }]
                        }}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ 
                            marginRight: wp("2.5%"),
                            padding: wp("3.5%"),
                            ...styles.bottomWrapper 
                        }}
                    >
                        <Text style={ styles.headerText }>Add foto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ 
                            marginRight: wp("2.5%"),
                            padding: wp("3.5%"),
                            ...styles.bottomWrapper 
                        }}
                    >
                        <Text style={ styles.headerText }>Add capa</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* <InteligentButton 
                handleScreenList={props.handleScreenList} 
                screen={props.route}
            /> */}
        </View>
    )
}

function Auth(props) {
    const Stack = createStackNavigator();
    
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[password2, setPassword2] = useState("")
    const[username, setUsername] = useState(`<Username>`)
    const[bios, setBios] = useState(`<Bios>`)

    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen 
                name="Login" 
                options={{ header: () => null }}
            >
                {prop => (
                    <Login
                        {...prop}
                        
                        setToken={ token => props.setToken(token) }
                        handleToken={ () => props.handleToken() }
                    />
                )}
            </Stack.Screen>
            <Stack.Screen name="ChangePassword" component={ ChangePassword } options={{ header: () => null }}/>
            <Stack.Screen 
                name="Register" 
                options={{ header: () => null }}
            >
                {prop => (
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
                )}
            </Stack.Screen>
            <Stack.Screen 
                name="User" 
                options={{ header: () => null }}
            >
                {prop => (
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
                        
                        setToken={token => props.setToken(token)}
                        handleToken={() => props.handleToken()}
                    />
                )} 
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default Auth;