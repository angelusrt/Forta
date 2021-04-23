import React, {useState} from 'react'
import {View, TouchableOpacity, TextInput, Text} from "react-native"
import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import {lightTheme, styles, iconStyles} from "./../Styles.js"
import Icons from "./Icons"

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
        <View style={styles.addCard}>
            <Text style={styles.headerText2}>GroupName</Text>
            <TextInput 
                onChangeText={ text => setGroupName(text)}
                style={styles.authInput}
            />

            <Text style={styles.headerText2}>Bios</Text>
            <TextInput 
                onChangeText={ text => setBios(text)}
                numberOfLines={4}
                multiline={true}
                style={styles.authInput}
            />

            <Text style={styles.headerText2}>Tags</Text>
            <TextInput 
                onChangeText={ text => setTags(text.split(" ", 4))}
                style={styles.authInput}
            />  

            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => props.setScreen("Forums")}>    
                    <Icons 
                        name="Arrow" 
                        width={wp("10%")} 
                        height={wp("10%")} 
                        viewBox="0 0 300 300" 
                        fill="none" 
                        style={iconStyles.icon1}
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
        <View style={styles.addCard}>
            <Text style={styles.headerText2}>Title</Text>
            <TextInput 
                onChangeText={ text => setTitle(text)}
                style={styles.authInput}
            />

            <Text style={styles.headerText2}>comentary</Text>
            <TextInput 
                onChangeText={ text => setBodyText(text)}
                numberOfLines={4}
                multiline={true}
                style={styles.authInput}
            />

            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => props.setScreen("Forum")}>    
                    <Icons 
                        name="Arrow" 
                        width={wp("10%")} 
                        height={wp("10%")} 
                        viewBox="0 0 300 300" 
                        fill="none" 
                        style={iconStyles.icon1}
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
        <View style={styles.addCard}>
            <Text style={styles.headerText2}>Comentary</Text>
            <TextInput 
                onChangeText={ text => setBodyText(text)}
                numberOfLines={4}
                multiline={true}
                style={styles.authInput}
            />

            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => props.setScreen("Post")}>    
                    <Icons 
                        name="Arrow" 
                        width={wp("10%")} 
                        height={wp("10%")} 
                        viewBox="0 0 300 300" 
                        fill="none" 
                        style={iconStyles.icon1}
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
    )
}

function InteligentButton(props) {
    let buttonIcons
    switch (props.screen) {
        case "Forums":
            buttonIcons = 
                <React.Fragment>
                    <TouchableOpacity>
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
        case "Chats":
        case "Invites":
            buttonIcons = 
                <React.Fragment>
                    <TouchableOpacity>
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
        case "ForumAdd":
            buttonIcons = 
                <ForumAddCard 
                    token={props.token}
                    setScreen={screen => props.setScreen(screen)}   
                    handleScreenList={ screen => props.handleScreenList(screen)}
                    handleForum={ forum => props.handleForum(forum)} 
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
                    <TouchableOpacity>
                        <Icons 
                            name="Lupe" 
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
                    <TouchableOpacity onPress={() => {
                        props.handleDecrementPost()
                        props.handleDecrementScreen()
                    }}>    
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
				   		onChangeText={ text => props.setMessage(text)} 
						onSubmitEditing={ () => props.verify()} 
						style={{
							fontFamily: "Roboto_500Medium",
							paddingHorizontal: wp("2.5%"),
							width: wp("55%"),
							marginRight: wp("1.25%"),
							borderRadius: 10,
							borderWidth: wp("0.5%"),
							borderColor: lightTheme.kindOfLightGrey,
							color: lightTheme.darkGrey, 
							backgroundColor: lightTheme.ligthGrey
                    	}
					}/>
                    <TouchableOpacity>
                        <Icons 
                            name="Add" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 625 625" 
                            fill="none" 
                            style={iconStyles.icon2}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>    
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
                        style={iconStyles.icon1}
                    />
                </TouchableOpacity>
            break
    }

    return (
        <View>
            { 
                props.screen === "PostAdd" || props.screen === "ForumAdd" || props.screen === "ComentaryAdd" ? 
                <View style={{position: "absolute", bottom: wp("5%"), width: wp("100%")}}>{buttonIcons}</View> : 
                <View style={styles.iButton}>{buttonIcons}</View>
            } 
        </View>
    )
}

export default InteligentButton