import React, {useState, useRef, useEffect} from 'react'
import {View, ScrollView, TouchableOpacity, TextInput, Text, Animated} from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"

import {lightTheme, styles, iconStyles} from "./../Styles.js"
import ContactCard from './ContactCard.js'
import Icons from "./Icons"

function ForumSearch(props) {
    const[groupName, setGroupName] = useState("")
    const[forums, setForums] = useState(null)

    const onTryToGet = async () => {
        const httpEnvelopeGet = {
            method: "GET",
            headers: {
                'accept-encoding': 'gzip, deflate, br',
                Accept: 'application/json',
                connection: 'keep-alive',
                host: 'localhost:3000',
                'Content-Type': 'application/json'
            }
        }

        await fetch(`http://192.168.0.106:3000/api/forums/find/${groupName}`, httpEnvelopeGet)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setForums(
                data[0] !== null ? data.map((forumInfo, index) => { return (
                    <ContactCard
                        key={index}
                        title={forumInfo.groupName}
                        subtitle={`${forumInfo.followers.length} seguidores`}
                        mode="Forum"
                        favorite={false}
                        forum={forumInfo._id}
                        handleForum={props.handleForum}
                        handleScreenList={props.handleScreenList}
                    />
                )}) : null
            )
        })
        .catch(err => err)
    }   

    const verify = () => {
        if (groupName.length > 0){
            onTryToGet()
        } else {
            setGroupName("")
        }
    }
    
    return (
        <React.Fragment>
            <View style={{flex:1, width: wp("100%")}}>
                <Text style={{
                    marginLeft: wp("7.5%"), 
                    marginTop: wp("10%"),
                    ...styles.headerText3
                }}>
                    Forums encontrados
                </Text>
                {   
                    forums !== null ? 
                    <ScrollView contentContainerStyle={{marginTop: wp("2.5%")}}>
                        {forums}
                    </ScrollView> :
                    <Text style={{marginLeft: wp("7.5%"), ...styles.bodyText4}}>
                        Nenhum foi encontrado
                    </Text>
                }
            </View>
            <View style={{bottom: wp("4%"), ...styles.addCard}}>
                <Text style={{
                    marginTop: wp("2.5%"),
                    ...styles.headerText4
                }}>
                    Pesquise um forum
                </Text>
                <TextInput 
                    onChangeText={ text => setGroupName(text)}
                    style={styles.addInput}
                />

                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => props.setScreen("Forums")}>    
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={{marginLeft: wp("-1.25%"), ...iconStyles.icon1}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => verify()}>    
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={iconStyles.icon4}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </React.Fragment>
    )
}

function ForumAddCard(props) {
    const[groupName, setGroupName] = useState("")
    const[bios, setBios] = useState("")
    const[tags, setTags] = useState([])

    const onTryToPost = async () => {
        const httpEnvelopePost = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'auth-token': props.token
            },
            body: JSON.stringify({groupName,bios,tags})
        }

        await fetch(`http://192.168.0.106:3000/api/forums/`, httpEnvelopePost)
        .then(res => res.json())
        .then(data => {
            props.handleForum(data)
            props.handleScreenList("Forum")
        })
        .catch(err => err)
    }   

    const verify = () => {
        if (groupName.length > 0 && bios.length > 0 && tags.length > 0 && tags.length <= 4){
            onTryToPost()
        } else {
            setGroupName("")
            setBios("")
            setTags([""])
        }
    }
    
    return (
        <React.Fragment>
            <View style={{flex: 1}}>
                <Text style={{
                    marginLeft: wp("7.5%"), 
                    marginTop: wp("10%"),
                    ...styles.headerText3
                }}>
                    Crie Forum 
                </Text>
            </View>
            <View style={{bottom: wp("4%"),...styles.addCard}}>
                <Text style={{
                    marginTop: wp("2.5%"),
                    ...styles.headerText4
                }}>
                    Nome do forum
                </Text>
                <TextInput 
                    onChangeText={ text => setGroupName(text)}
                    style={styles.addInput}
                />

                <Text style={styles.headerText4}>Bios</Text>
                <TextInput 
                    onChangeText={ text => setBios(text)}
                    numberOfLines={4}
                    multiline={true}
                    style={styles.addInput}
                />

                <Text style={styles.headerText4}>Tags</Text>
                <TextInput 
                    onChangeText={ text => setTags(text.split(" ", 4))}
                    style={styles.addInput}
                />  

                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => props.setScreen("Forums")}>    
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={{marginLeft: wp("-1.25%"), ...iconStyles.icon1}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => verify()}>    
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={iconStyles.icon4}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </React.Fragment>
    )
}

function PostAddCard(props) {
    const[title, setTitle] = useState("")
    const[bodyText, setBodyText] = useState("")

    const onTryToPost = async () => {
        const httpEnvelopePost = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'auth-token': props.token
            },
            body: JSON.stringify({title,bodyText})
        }

        await fetch(`http://192.168.0.106:3000/api/forums/${props.forum}/posts`, httpEnvelopePost)
        .then(res => res.json())
        .then(data => {
            props.handleScreenList("Post")
            props.handlePostList(data)
        })
        .catch(err => err)
    }   

    const verify = () => {
        if (title.length > 0 && bodyText.length > 0){
            onTryToPost()
        } else{
            setTitle("")
            setBodyText("")
        }
    }

    return (
        <React.Fragment>
            <View style={{flex: 1}}>
                <Text style={{
                    marginLeft: wp("7.5%"), 
                    marginTop: wp("10%"),
                    ...styles.headerText3
                }}>
                    Crie Postagem
                </Text>
            </View>
            <View style={{bottom: wp("4%"),...styles.addCard}}>
                <Text style={{
                    marginTop: wp("2.5%"),
                    ...styles.headerText4
                }}>
                    Título
                </Text>
                <TextInput 
                    onChangeText={ text => setTitle(text)}
                    style={styles.addInput}
                />

                <Text style={styles.headerText4}>Corpo de texto</Text>
                <TextInput 
                    onChangeText={ text => setBodyText(text)}
                    numberOfLines={4}
                    multiline={true}
                    style={styles.addInput}
                />

                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => props.setScreen("Forum")}>    
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={{marginLeft: wp("-1.25%"), ...iconStyles.icon1}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => verify()}>    
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={iconStyles.icon4}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </React.Fragment>
    )
}

function ComentaryAddCard(props) {
    const[bodyText, setBodyText] = useState("")

    const onTryToPost = async () => {
        const httpEnvelopePost = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'auth-token': props.token
            },
            body: JSON.stringify({bodyText})
        }

        await fetch(`http://192.168.0.106:3000/api/forums/${props.forum}/posts/${props.post}`, httpEnvelopePost)
        .then(res => res.json())
        .then(data => {
            props.handleScreenList("Post")
            props.handlePostList(data)
        })
        .catch(err => err)
    }   

    const verify = () => {
        if (bodyText.length > 0){
            onTryToPost()
        } else{
            setTitle("")
            setBodyText("")
        }
    }

    return (
        <React.Fragment>
            <View style={{flex: 1}}>
                <Text style={{
                    marginLeft: wp("7.5%"), 
                    marginTop: wp("10%"),
                    ...styles.headerText3
                }}>
                    Crie Comentário 
                </Text>
            </View>
            <View style={{bottom: wp("4%"),...styles.addCard}}>
                <Text style={{
                    marginTop: wp("2.5%"),
                    ...styles.headerText4
                }}>
                    Comentário
                </Text>
                <TextInput 
                    onChangeText={ text => setBodyText(text)}
                    numberOfLines={4}
                    multiline={true}
                    style={styles.addInput}
                />

                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => props.setScreen("Post")}>    
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={{marginLeft: wp("-1.25%"), ...iconStyles.icon1}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => verify()}>    
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={iconStyles.icon4}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </React.Fragment>
    )
}

function UserSearch(props) {
    const[username, setUsername] = useState("")
    const[users, setUsers] = useState(null)

    const onTryToGet = async () => {
        const httpEnvelopeGet = {
            method: "GET",
            headers: {
                'accept-encoding': 'gzip, deflate, br',
                Accept: 'application/json',
                connection: 'keep-alive',
                host: 'localhost:3000',
                'Content-Type': 'application/json'
            }
        }

        await fetch(`http://192.168.0.106:3000/api/chats/find/${username}`, httpEnvelopeGet)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setUsers(
                data[0] !== null ? data.map((users, index) => { return (
                    <ContactCard
                        key={index}
                        title={users.username}
                        subtitle={users.bios}
                        mode="User"
                    />
                )}) : null
            )
        })
        .catch(err => err)
    }   

    const verify = () => {
        if (username.length > 0){
            onTryToGet()
        } else {
            setUsername("")
        }
    }
    
    return (
        <React.Fragment>
            <View style={{flex:1, width: wp("100%")}}>
                <Text style={{
                    marginLeft: wp("7.5%"), 
                    marginTop: wp("10%"),
                    ...styles.headerText3
                }}>
                    Usúarios encontrados
                </Text>
                {   
                    users !== null ? 
                    <ScrollView contentContainerStyle={{marginTop: wp("2.5%")}}>
                        {users}
                    </ScrollView> :
                    <Text style={{marginLeft: wp("7.5%"), ...styles.bodyText4}}>
                        Ninguém foi encontrado
                    </Text>
                }
            </View>
            <View style={{bottom: wp("4%"),...styles.addCard}}>
                <Text style={{
                    marginTop: wp("2.5%"),
                    ...styles.headerText4
                }}>
                    Pesquise um usúario
                </Text>
                <TextInput 
                    onChangeText={ text => setUsername(text)}
                    style={styles.addInput}
                />

                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => props.setScreen("Chats")}>    
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={{marginLeft: wp("-1.25%"), ...iconStyles.icon1}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => verify()}>    
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={iconStyles.icon4}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </React.Fragment>
    )
}

function usePrevious(value) {
    const ref = useRef()
    
    useEffect(() => {ref.current = value})
    
    return ref.current
}

function InteligentButton(props) {
    const fadeAnim = useRef(new Animated.Value(0)).current
    const prevScreen = usePrevious(props.screen)
    const[active, setActive] = useState(false)

    React.useEffect(() => {
        fadeAnim.setValue(0)
        setActive(true)
        if(active === true){
            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: true
                }
            ).start()
        }
        if(fadeAnim === 1){
            setActive(false)
        }
    }, [fadeAnim, prevScreen])
    

    let buttonIcons
    switch (props.screen) {
        case "Forums":
            buttonIcons = 
                <React.Fragment>
                    <TouchableOpacity onPress={() => props.setScreen("ForumSearch")}>
                        <Icons 
                            name="Lupe" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={iconStyles.icon1}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.setScreen("ForumAdd")}>
                        <Icons 
                            name="Add" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 625 625" 
                            fill="none" 
                            style={iconStyles.icon2}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.handleScreenList("Settings")}>    
                        <Icons 
                            name="Options" 
                            width={wp("3.3%")} 
                            height={wp("10%")} 
                            viewBox="208 0 208 625" 
                            fill="none" 
                            style={iconStyles.icon3}
                        />
                    </TouchableOpacity>
                </React.Fragment>
            break
        case "Home":
        case "Invites":
            buttonIcons = 
                <React.Fragment>
                    <TouchableOpacity onPress={() => props.handleScreenList("Settings")}>    
                        <Icons 
                            name="Options" 
                            width={wp("3.3%")} 
                            height={wp("10%")} 
                            viewBox="208 0 208 625" 
                            fill="none" 
                            style={iconStyles.icon3}
                        />
                    </TouchableOpacity>
                </React.Fragment>
            break
        case "Chats":
            buttonIcons = 
                <React.Fragment>
                    <TouchableOpacity onPress={() => props.setScreen("UserSearch")}>
                        <Icons 
                            name="Lupe" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={iconStyles.icon1}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.handleScreenList("Settings")}>    
                        <Icons 
                            name="Options" 
                            width={wp("3.3%")} 
                            height={wp("10%")} 
                            viewBox="208 0 208 625" 
                            fill="none" 
                            style={iconStyles.icon3}
                        />
                    </TouchableOpacity>
                </React.Fragment>
            break
        case "ForumSearch":
            buttonIcons = 
                <ForumSearch 
                    setScreen={screen => props.setScreen(screen)}
                    handleScreenList={ screen => props.handleScreenList(screen)}
                    handleForum={props.handleForum} 
                />
            break
        case "ForumAdd":
            buttonIcons = 
                <ForumAddCard 
                    token={props.token}
                    setScreen={screen => props.setScreen(screen)}   
                    handleScreenList={ screen => props.handleScreenList(screen)}
                    handleForum={props.handleForum} 
                />
            break    
        case "Forum":
            buttonIcons =
                <React.Fragment>
                    <TouchableOpacity onPress={() => props.handleDecrementScreen()}>    
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={iconStyles.icon1}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.setScreen("PostAdd")}>
                        <Icons 
                            name="Add" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 625 625" 
                            fill="none" 
                            style={iconStyles.icon2}
                        />
                    </TouchableOpacity>
                </React.Fragment>
            break
        case "PostAdd": 
            buttonIcons = 
                <PostAddCard 
                    token={props.token}
                    forum={props.forum} 
                    setScreen={screen => props.setScreen(screen)}   
                    handleScreenList={ screen => props.handleScreenList(screen)}
                    handlePostList={ post => props.handlePostList(post)} 
                />
            break
        case "Post":    
            buttonIcons =
                <React.Fragment>
                    <TouchableOpacity onPress={() => props.handleDecrementScreen()}>    
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={iconStyles.icon1}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.setScreen("ComentaryAdd")}>
                        <Icons 
                            name="Add" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 625 625" 
                            fill="none" 
                            style={iconStyles.icon2}
                        />
                    </TouchableOpacity>
                </React.Fragment>
            break
        case "ComentaryAdd":
            buttonIcons = 
                <ComentaryAddCard
                    token={props.token}
                    forum={props.forum}
                    post={props.post} 
                    setScreen={screen => props.setScreen(screen)}   
                    handleScreenList={screen => props.handleScreenList(screen)}
                    handlePostList={post => props.handlePostList(post)} 
                />
            break
        case "UserSearch":
            buttonIcons = <UserSearch setScreen={screen => props.setScreen(screen)}/>
            break    
        case "Chat":
            buttonIcons =
                <React.Fragment>
                    <TouchableOpacity onPress={() => props.handleDecrementScreen()}>    
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={iconStyles.icon1}
                        />
                    </TouchableOpacity>
                   <TextInput 
				   		onChangeText={text => props.setMessage(text)} 
                        value={props.message}
						onSubmitEditing={() => props.verify()} 
						style={styles.chatInput}
					/>
                    <TouchableOpacity onPress={() => props.verify()}>    
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={iconStyles.icon4}
                        />
                    </TouchableOpacity> 
                </React.Fragment>
            break
        case "Settings":
        default:
            buttonIcons =
                <TouchableOpacity onPress={() => props.handleDecrementScreen()}>    
                    <Icons 
                        name="Arrow" 
                        width={wp("10%")} 
                        height={wp("10%")} 
                        viewBox="0 0 300 300" 
                        fill="none" 
                        style={iconStyles.icon9}
                    />
                </TouchableOpacity>
            break
    }

    return (
        <React.Fragment>
            { 
                props.screen === "PostAdd" || props.screen === "ForumAdd" || 
                props.screen === "ComentaryAdd" || props.screen === "ForumSearch" ||
                props.screen === "UserSearch"?
                <Animated.View style={{
                    position: "absolute",
                    height: hp("100%"),
                    width: wp("100%"),
                    bottom: wp("0%"), 
                    backgroundColor: lightTheme.ligthGrey,
                    opacity: fadeAnim, 
                }}>
                    {buttonIcons}
                </Animated.View> : 
                <Animated.View style={{bottom: wp("5%"), opacity: fadeAnim, ...styles.iButton}}>
                    {buttonIcons}
                </Animated.View>
            } 
        </React.Fragment>
    )
}

export default InteligentButton