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
        await fetch(`http://192.168.0.111:3000/api/forums/find/${groupName}`, props.getEnvelope)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setForums(
                data[0] !== null ? data.map((forumInfo, index) => { return (
                    <ContactCard
                        key={index}
                        token={props.token}
                        myInfos={props.myInfos}
                        deleteEnvelope={props.deleteEnvelope}
                        title={forumInfo.groupName}
                        subtitle={`${forumInfo.followers.length} seguidores`}
                        owner={forumInfo.owner}
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
                    marginTop: wp("14%"),
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

        await fetch(`http://192.168.0.111:3000/api/forums/`, httpEnvelopePost)
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
                    marginTop: wp("14%"),
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

        await fetch(`http://192.168.0.111:3000/api/forums/${props.forum}/posts`, httpEnvelopePost)
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
                    marginTop: wp("14%"),
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

        await fetch(`http://192.168.0.111:3000/api/forums/${props.forum}/posts/${props.post}`, httpEnvelopePost)
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
                    marginTop: wp("14%"),
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

function SettingsOptionsCard(props) {
    const[headerText, setHeaderText] = useState("")
    const[bodyText, setBodyText] = useState("")
    const[text, setText] = useState("")
    const[link, setLink] = useState("")
    const[patchEnvelope, setPatchEnvelope] = useState({})

    const switchOperation = () => {
        switch (props.options) {
            case "Name":
                setHeaderText("Novo nome")
                setBodyText("Nome")
                setLink("http://192.168.0.111:3000/api/user/username")
                setPatchEnvelope({
                    method: "PATCH",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'auth-token': props.token
                    },
                    body: JSON.stringify({username: text})
                })
                break
            case "Bios":
                setHeaderText("Novo bios")
                setBodyText("Bios")
                setLink("http://192.168.0.111:3000/api/user/bios")
                setPatchEnvelope({
                    method: "PATCH",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'auth-token': props.token
                    },
                    body: JSON.stringify({bios: text})
                })
                break
            case "Email":
                setHeaderText("Novo email")
                setBodyText("Email")
                setLink("http://192.168.0.111:3000/api/user/email")
                setPatchEnvelope({
                    method: "PATCH",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'auth-token': props.token
                    },
                    body: JSON.stringify({email: text})
                })
                break
            case "Password":
                setHeaderText("Nova senha")
                setBodyText("Senha")
                setLink("http://192.168.0.111:3000/api/user/password")
                setPatchEnvelope({
                    method: "PATCH",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'auth-token': props.token
                    },
                    body: JSON.stringify({password: text})
                })
                break
            case "Delete":
                setHeaderText("Deletar conta")
                setLink("http://192.168.0.111:3000/api/user/user")
                break
            default: 
                setText("")
                setLink("")
                break
        }
    }

    useEffect(() => {switchOperation()},[text])

    const onTryToPatch = async () => {
        await fetch(link, props.options === "Delete"? props.deleteEnvelope : patchEnvelope)
        .then(res => res.json())
        .then(data => {
            data === "Updated" ? getNewInfos() : 
            data === "Removed" ? handleScreenList("Auth") : 
            null
        })
        .catch(err => err)
    }   

    const getNewInfos = async () => {
        await fetch("http://192.168.0.111:3000/api/user/infos", props.getEnvelope)
        .then(res => res.json())
        .then(data => {
            if (data != null){
                props.setMyInfos(data)
                props.setScreen("Settings")
            }
        })
        .catch(err => err)
    }

    const verify = () => {
        if (props.options === "Delete" || 
            ((props.options === "Name" || props.options === "Bios") && text.length > 0) || 
            (props.options === "Email" && text.length >= 7) || 
            (props.options === "Password" && text.length >= 8)
        ){
            onTryToPatch()
        } else {
            setText("")
            setLink("")
        }
    }
    
    return (
        <React.Fragment>
            <View style={{flex: 1}}>
                <Text style={{
                    marginLeft: wp("7.5%"), 
                    marginTop: wp("14%"),
                    ...styles.headerText3
                }}>
                    {headerText}
                </Text>
            </View>
            {
                props.options !== "Delete" ? 
                <View style={{bottom: wp("4%"),...styles.addCard}}>
                    <Text style={{
                        marginTop: wp("2.5%"),
                        ...styles.headerText4
                    }}>
                        {bodyText}
                    </Text>

                    <TextInput 
                        onChangeText={ text => setText(text)}
                        style={styles.addInput}
                        secureTextEntry={props.options === "Password" ? true : false}
                    />

                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => props.setScreen("Settings")}>    
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
                </View> :
                <View style={{bottom: wp("4%"),...styles.iButton}}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => props.setScreen("Settings")}>    
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
            }
            
        </React.Fragment>
    )
}

function UserSearch(props) {
    const[username, setUsername] = useState("")
    const[users, setUsers] = useState(null)

    const onTryToGet = async () => {
        await fetch(`http://192.168.0.111:3000/api/chats/find/${username}`, props.getEnvelope)
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
                        description={props.description}
                        forum={props.description === "mod" ? props.forum : null}
                        user={users.id}
                        token={props.token}
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
                    marginTop: wp("14%"),
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
                    <TouchableOpacity onPress={() => {
                        props.description === "chat" ?
                        props.setScreen("Chats") :
                        props.setScreen("Mods")
                    }}>    
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

function RulesUpdate(props) {
    const[rules, setRules] = useState(props.rules)
    
    const onTryToPatch = async () => {
        const patchEnvelope = {
            method: "PATCH",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'auth-token': props.token
            },
            body: JSON.stringify({rules})
        }

        await fetch(`http://192.168.0.111:3000/api/forums/${props.forum}/rules`, patchEnvelope)
        .then(res => res.json())
        .then(data => data === "Updated" ? props.setScreen("Rules") : null)
        .catch(err => err)
    }   

    const verify = () => {
        if (rules.length > 0){
            onTryToPatch()
        } else{
            setRules("")
        }
    }

    String.prototype.hexEncode = function(){
        var hex, i;
    
        var result = "";
        for (i=0; i<this.length; i++) {
            hex = this.charCodeAt(i).toString(16);
            result += ("000"+hex).slice(-4);
        }
    
        return result
    }
    
    function getIndicesOf(searchStr, str, caseSensitive) {
        var searchStrLen = searchStr.length;
        if (searchStrLen == 0) {
            return [];
        }
        var startIndex = 0, index, indices = [];
        if (!caseSensitive) {
            str = str.toLowerCase();
            searchStr = searchStr.toLowerCase();
        }
        while ((index = str.indexOf(searchStr, startIndex)) > -1) {
            indices.push(index);
            startIndex = index + searchStrLen;
        }
        return indices;
    }

    console.log(rules == null ? null : getIndicesOf("000a", rules.hexEncode()) != null ? getIndicesOf("000a", rules.hexEncode()).length : 1)
    return (
        <React.Fragment>
            <View style={{flex: 1}}>
                <Text style={{
                    marginLeft: wp("7.5%"), 
                    marginTop: wp("14%"),
                    ...styles.headerText3
                }}>
                    Edite as regras 
                </Text>
            </View>

            <View style={{bottom: wp("4%"),...styles.addCard}}>
                <Text style={{
                    marginTop: wp("2.5%"),
                    ...styles.headerText4
                }}>
                    Regras
                </Text>
                
                <TextInput 
                    defaultValue={rules}
                    onChangeText={ text => setRules(text)}
                    multiline={true}
                    maxLength={1024}
                    numberOfLines={
                        rules == null ? 
                        null : 
                        getIndicesOf("000a", rules.hexEncode()).length != 0 ? 
                        getIndicesOf("000a", rules.hexEncode()).length + 1 : 
                        1
                    }
                    style={styles.rulesInput}
                />
                
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => props.setScreen("Rules")}>    
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

function FlagsFlagAddCard(props) {
    const[text, setText] = useState("")
    
    const onTryToFlag = async () => {
        const postEnvelope = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'auth-token': props.token
            },
            body: JSON.stringify({
                isItPost: props.flagObj.isItPost,
                post: props.flagObj.post,
                comentaries: props.flagObj.isItPost ? "" : props.flagObj.comentaries,
                message: text
            })
        }
        
        await fetch(`http://192.168.0.111:3000/api/forums/${props.forum}/flags`,postEnvelope)
        .then(res => res.json())
        .then(data => props.setScreen("FlagsFlag"))
        .catch(err => err)
    }   

    const verify = () => text.length > 10 ? onTryToFlag() : setText("")
    
    return (
        <React.Fragment>
            <View style={{flex: 1}}>
                <Text style={{
                    marginLeft: wp("7.5%"), 
                    marginTop: wp("14%"),
                    ...styles.headerText3
                }}>
                    Adicionar denuncia
                </Text>
            </View>

            <View style={{bottom: wp("4%"),...styles.addCard}}>
                <Text style={{
                    marginTop: wp("2.5%"),
                    ...styles.headerText4
                }}>
                    Denuncia
                </Text>

                <TextInput 
                    onChangeText={ text => setText(text)}
                    style={styles.addInput}
                />

                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => props.setScreen("FlagsFlag")}>    
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

    useEffect(() => {
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
                    getEnvelope={props.getEnvelope}
                    deleteEnvelope={props.deleteEnvelope}
                    myInfos={props.myInfos}
                    token={props.token}
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
        case "Mods":
            buttonIcons =
                <React.Fragment>
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
                    {   
                        props.myInfos.id === props.owner ?
                        <TouchableOpacity onPress={() => props.setScreen("ModsSearch")}>
                            <Icons 
                                name="Add" 
                                width={wp("10%")} 
                                height={wp("10%")} 
                                viewBox="0 0 625 625" 
                                fill="none" 
                                style={iconStyles.icon11}
                            />
                        </TouchableOpacity> :
                        null
                    }
                </React.Fragment>
            break
        case "ModsSearch":
            buttonIcons = 
                <UserSearch 
                    token={props.token}
                    forum={props.forum}
                    description="mod"
                    getEnvelope={props.getEnvelope}
                    setScreen={screen => props.setScreen(screen)}
                />
            break 
        case "Rules":
            buttonIcons =
                <React.Fragment>
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
                    {   
                        props.myInfos.id === props.owner ?
                        <TouchableOpacity onPress={() => props.setScreen("RulesUpdate")}>
                            <Icons 
                                name="Add" 
                                width={wp("10%")} 
                                height={wp("10%")} 
                                viewBox="0 0 625 625" 
                                fill="none" 
                                style={iconStyles.icon11}
                            />
                        </TouchableOpacity> :
                        null
                    }
                </React.Fragment>
            break
        case "RulesUpdate":
            buttonIcons = 
                <RulesUpdate 
                    token={props.token}
                    rules={props.rules}
                    forum={props.forum}
                    getEnvelope={props.getEnvelope}
                    setScreen={screen => props.setScreen(screen)}
                />
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
            buttonIcons = 
                <UserSearch 
                    getEnvelope={props.getEnvelope}
                    setScreen={screen => props.setScreen(screen)}
                    description="chat"
                    token={props.token}
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
        case "SettingsOptions": 
            buttonIcons =
                <SettingsOptionsCard
                    token={props.token}
                    options={props.options}
                    setMyInfos={props.setMyInfos}
                    screen={props.screen}
                    setScreen={props.setScreen}
                    handleScreenList={props.handleScreenList}
                    getEnvelope={props.getEnvelope}
                    deleteEnvelope={props.deleteEnvelope}
                />
            break
        case "FlagsFlag":  
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
                    <TouchableOpacity onPress={() => props.setScreen("FlagsFlagAdd")}>
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
        case "FlagsFlagAdd": 
            buttonIcons =
                <FlagsFlagAddCard
                    token={props.token}
                    forum={props.forum}
                    screen={props.screen}
                    setScreen={props.setScreen}
                    flagObj={props.flagObj}
                />
            break
        case "Settings":
        case "Flags":
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
                props.screen === "UserSearch" || props.screen === "ModsSearch" ||
                props.screen === "SettingsOptions" || props.screen === "RulesUpdate" ||
                props.screen === "FlagsFlagAdd" ?
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