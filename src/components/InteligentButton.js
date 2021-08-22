import React, {useState, useRef, useEffect} from 'react'
import {View, ScrollView, TouchableOpacity, TextInput, Text, Animated} from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen"

import {lightTheme, styles, iconStyles} from "./../Styles.js"
import ContactCard from './ContactCard.js'
import Icons from "./Icons"

function ForumSearch(props) {
    //Forum name that'll be searched
    const[groupName, setGroupName] = useState("")
    
    //Variable that stores forums component
    const[forums, setForums] = useState(null)

    //Function that sets forums found
    const onGet = async () => {
        await fetch(`${props.site}/api/forums/find/${groupName}`, props.getEnvelope)
        .then(res => res.json())
        .then(data => {
            setForums(
                data[0] !== null ? data.map((forumInfo, index) => { return (
                    <ContactCard
                        site={props.site}
                        token={props.token}
                        myInfos={props.myInfos}
                        deleteEnvelope={props.deleteEnvelope}
                        
                        key={index}
                        title={forumInfo.groupName}
                        subtitle={`${forumInfo.followers.length} seguidores`}
                        owner={forumInfo.owner}
                        mods={forumInfo.mods}
                        favorite={false}
                        forum={forumInfo._id}
                        mode="Forum"
                        
                        setScreen={props.setScreen}
                        setForum={props.setForum}
                    />
                )}) : null
            )
        })
        .catch(err => err)
    }   

    //If param matches, fulfills search
    const verify = () => groupName.length > 0 ? onGet() : setGroupName("")
    
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
                    forums != null ? 
                    <ScrollView contentContainerStyle={{
                        paddingBottom: 200, 
                        marginTop: wp("2.5%")
                    }}>
                        {forums}
                    </ScrollView> :
                    <Text style={{
                        marginLeft: wp("7.5%"), 
                        ...styles.bodyText4
                    }}>
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
                    <TouchableOpacity onPress={() => props.setScrn("Forums")}>    
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
    //Forums infos 
    const[groupName, setGroupName] = useState("")
    const[bios, setBios] = useState("")
    const[tags, setTags] = useState([])

    //Function that posts forum 
    const onPost = async () => {
        const postEnvelope = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'auth-token': props.token
            },
            body: JSON.stringify({groupName,bios,tags})
        }

        await fetch(`${props.site}/api/forums/`, postEnvelope)
        .then(res => res.json())
        .then(data => {
            props.setScreen("Forum")
            props.setForum(data)
        })
        .catch(err => err)
    }   

    //If params matches, fulfills search
    const verify = () => {
        if (
            groupName.length > 0 && 
            bios.length > 0 && 
            tags.length > 0 && 
            tags.length <= 4
        ) {
            onPost()
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
                    <TouchableOpacity onPress={() => props.setScrn("Forums")}>    
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={{marginLeft: wp("-1.25%"), ...iconStyles.icon1}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={verify}>    
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
    //Post Info
    const[title, setTitle] = useState("")
    const[bodyText, setBodyText] = useState("")

    //Function that posts post 
    const onPost = async () => {
        const postEnvelope = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'auth-token': props.token
            },
            body: JSON.stringify({title,bodyText})
        }

        await fetch(`${props.site}/api/forums/${props.forum}/posts`, postEnvelope)
        .then(res => res.json())
        .then(data => {
            props.setScrn("Forum")
            props.onFunction()
        })
        .catch(err => err)
    }   

    //If params matches, fulfills search
    const verify = () => {
        if (title.length > 0 && bodyText.length > 0){
            onPost()
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
                    <TouchableOpacity onPress={() => props.setScrn("Forum")}>    
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

function CommentaryAddCard(props) {
    //Commentary info
    const[bodyText, setBodyText] = useState("")

    //Function that posts post 
    const onPost = async () => {
        const postEnvelope = {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'auth-token': props.token
            },
            body: JSON.stringify({bodyText})
        }

        await fetch(`${props.site}/api/forums/${props.forum}/posts/${props.post}`, 
        postEnvelope)
        .then(res => res.json())
        .then(data => {
            props.setScrn("Post")
            props.onFunction()
        })
        .catch(err => err)
    }   

    //If params matches, fulfills search
    const verify = () => bodyText.length > 0 ? onPost() : setBodyText("")

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
                    <TouchableOpacity onPress={() => props.setScrn("Post")}>    
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={{marginLeft: wp("-1.25%"), ...iconStyles.icon1}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={verify}>    
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
    //Header and Title that will be dynamically displayed
    const[headerText, setHeaderText] = useState("")
    const[titleText, setTitleText] = useState("")

    //Text that will be fetched
    const[text, setText] = useState("")

    //Link that will be dynamically assigned
    const[link, setLink] = useState("")

    //Envelope that will be dynamically assigned
    const[patchEnvelope, setPatchEnvelope] = useState({})

    //A method that dynamically assign variable values depending on "props.options"
    const switchOperation = () => {
        switch (props.options) {
            case "Name":
                setHeaderText("Novo nome")
                setTitleText("Nome")
                setLink(`${props.site}/api/user/username`)
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
                setTitleText("Bios")
                setLink(`${props.site}/api/user/bios`)
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
                setTitleText("Email")
                setLink(`${props.site}/api/user/email`)
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
                setTitleText("Senha")
                setLink(`${props.site}/api/user/password`)
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
                setLink(`${props.site}/api/user/user`)
                break
            default: 
                setText("")
                setLink("")
                break
        }
    }

    //Patches new information and goes on 
    const onPatch = async () => {
        await fetch(link, props.options === "Delete"? props.deleteEnvelope : patchEnvelope)
        .then(res => res.json())
        .then(data => {
            data === "Updated" ? onGetNewInfos() : 
            data === "Removed" ? props.setScreen("Auth") : 
            null
        })
        .catch(err => err)
    }   

    //Gets new information retrieved before
    const onGetNewInfos = async () => {
        await fetch(`${props.site}/api/user/infos`, props.getEnvelope)
        .then(res => res.json())
        .then(data => {
            if (data != null) {
                props.setMyInfos(data)
                props.setScrn("Settings")
            }
        })
        .catch(err => err)
    }

    //Verifies params, if matches the "onPatch" method runs, if not it cleans variables
    const verify = () => {
        if (
            props.options === "Delete" || 
            ((props.options === "Name" || props.options === "Bios") && text.length > 0) || 
            (props.options === "Email" && text.length >= 7) || 
            (props.options === "Password" && text.length >= 8)
        ) {
            onPatch()
        } else {
            setText("")
            setLink("")
        }
    }
    
    //Calls switchOperation evry time text changes
    useEffect(() => {switchOperation()},[text])

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
                        {titleText}
                    </Text>

                    <TextInput 
                        onChangeText={text => setText(text)}
                        style={styles.addInput}
                        secureTextEntry={props.options === "Password" ? true : false}
                    />

                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => props.setScrn("Settings")}>    
                            <Icons 
                                name="Arrow" 
                                width={wp("10%")} 
                                height={wp("10%")} 
                                viewBox="0 0 300 300" 
                                fill="none" 
                                style={{marginLeft: wp("-1.25%"), ...iconStyles.icon1}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={verify}>    
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
                        <TouchableOpacity onPress={() => props.setScrn("Settings")}>    
                            <Icons 
                                name="Arrow" 
                                width={wp("10%")} 
                                height={wp("10%")} 
                                viewBox="0 0 300 300" 
                                fill="none" 
                                style={iconStyles.icon1}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={verify}>    
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
    //Username searched
    const[username, setUsername] = useState("")
    
    //Stores users components
    const[users, setUsers] = useState(null)

    //Function that searches users 
    const onGet = async () => {
        await fetch(`${props.site}/api/chats/find/${username}`, props.getEnvelope)
        .then(res => res.json())
        .then(data => {
            setUsers(
                data[0] !== null ? data.map((users, index) => { return (
                    <ContactCard
                        site={props.site}
                        token={props.token}
                        forum={props.description === "mod" ? props.forum : null}
                        description={props.description}
                        
                        key={index}
                        title={users.username}
                        subtitle={users.bios}
                        user={users.id}
                        mode="User"
                    />
                )}) : null
            )
        })
        .catch(err => err)
    }   

    //If param matches, fulfills search
    const verify = () => username.length > 0 ? onGet() : setUsername("")
    
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
                    <ScrollView contentContainerStyle={{
                        paddingBottom: 200, 
                        marginTop: wp("2.5%")
                    }}>
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
                        if (props.description === "chat") {
                            props.setScrn("Chats")
                            props.onFunction()
                        } else {
                            props.setScrn("Mods")
                        }
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
                    <TouchableOpacity onPress={verify}>    
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
    //Stores old rules that'll be updated
    const[rules, setRules] = useState(props.rules)
    
    //Function that updates rules 
    const onPatch = async () => {
        const patchEnvelope = {
            method: "PATCH",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'auth-token': props.token
            },
            body: JSON.stringify({rules})
        }

        await fetch(`${props.site}/api/forums/${props.forum}/rules`, patchEnvelope)
        .then(res => res.json())
        .then(data => data === "Updated" ? props.setScrn("Rules") : null)
        .catch(err => err)
    }   
    
    //Finds all specific chars in a string
    const getIndicesOf = (searchStr, str, caseSensitive) => {
        var searchStrLen = searchStr.length
        if (searchStrLen == 0) {
            return []
        }

        var startIndex = 0, index, indices = []
        if (!caseSensitive) {
            str = str.toLowerCase()
            searchStr = searchStr.toLowerCase()
        }
        
        while ((index = str.indexOf(searchStr, startIndex)) > -1) {
            indices.push(index)
            startIndex = index + searchStrLen
        }

        return indices
    }

    //If param matches, fulfills update
    const verify = () => rules.length > 0 ? onPatch() : setRules("")

    //Converts traditional text to hex code
    String.prototype.hexEncode = function(){
        var hex, i
    
        var result = ""
        for (i = 0; i < this.length; i++) {
            hex = this.charCodeAt(i).toString(16)
            result += ("000" + hex).slice(-4)
        }

        return result
    }

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
                    <TouchableOpacity onPress={() => props.setScrn("Rules")}>    
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={{marginLeft: wp("-1.25%"), ...iconStyles.icon1}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={verify}>    
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
    //Flag message
    const[text, setText] = useState("")
    
    //Function that posts flag 
    const onFlag = async () => {
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
        
        await fetch(`${props.site}/api/forums/${props.forum}/flags`,postEnvelope)
        .then(res => res.json())
        .then(data => {
            props.setScrn("FlagsFlag")
            props.setUpdate()
        })
        .catch(err => err)
    }   

    //If param matches, fulfills post
    const verify = () => text.length > 10 ? onFlag() : setText("")
    
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
                    <TouchableOpacity onPress={() => props.setScrn("FlagsFlag")}>    
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={{marginLeft: wp("-1.25%"), ...iconStyles.icon1}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={verify}>    
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

function FlagsFlagUpdateCard(props) {
    //Flag message
    const[text, setText] = useState(props.message)
    
    //Function that updates flag 
    const onFlag = async () => {
        const patchEnvelope = {
            method: "PATCH",
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
        
        await fetch(`${props.site}/api/forums/${props.forum}/flags`,patchEnvelope)
        .then(res => res.json())
        .then(data => {
            props.setScrn("FlagsFlag")
            props.setUpdate()
        })
        .catch(err => err)
    }   

    //Finds all specific chars in a string
    function getIndicesOf(searchStr, str, caseSensitive) {
        var searchStrLen = searchStr.length
        if (searchStrLen == 0) {
            return []
        }

        var startIndex = 0, index, indices = []
        if (!caseSensitive) {
            str = str.toLowerCase()
            searchStr = searchStr.toLowerCase()
        }

        while ((index = str.indexOf(searchStr, startIndex)) > -1) {
            indices.push(index)
            startIndex = index + searchStrLen
        }
        
        return indices
    }

    //If param matches, fulfills update
    const verify = () => text.length > 10 ? onFlag() : setText("")

    //Converts traditional text to hex code
    String.prototype.hexEncode = function() {
        var hex, i
    
        var result = ""
        for (i = 0; i < this.length; i++) {
            hex = this.charCodeAt(i).toString(16)
            result += ("000" + hex).slice(-4)
        }
    
        return result
    }
    
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
                    defaultValue={text}
                    onChangeText={ text => setText(text)}
                    multiline={true}
                    maxLength={1024}
                    numberOfLines={
                        text == null ? 
                        null : 
                        getIndicesOf("000a", text.hexEncode()).length != 0 ? 
                        getIndicesOf("000a", text.hexEncode()).length + 1 : 
                        1
                    }
                    style={styles.rulesInput}
                />

                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => props.setScrn("FlagsFlag")}>    
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={{marginLeft: wp("-1.25%"), ...iconStyles.icon1}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={verify}>    
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
    //Fade animation variables
    const fadeAnim = useRef(new Animated.Value(0)).current
    const prevScreen = usePrevious(props.screen)
    const[active, setActive] = useState(false)

    //Animation update
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

    //Sets how the button will be
    let buttonIcons
    switch (props.screen) {
        case "Forums":
            buttonIcons = 
                <React.Fragment>
                    <TouchableOpacity onPress={() => props.setScrn("ForumSearch")}>
                        <Icons 
                            name="Lupe" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={iconStyles.icon1}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.setScrn("ForumAdd")}>
                        <Icons 
                            name="Add" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 625 625" 
                            fill="none" 
                            style={iconStyles.icon2}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.setScreen("Settings")}>    
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
                    <TouchableOpacity onPress={() => props.setScreen("Settings")}>    
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
                    <TouchableOpacity onPress={() => props.setScrn("UserSearch")}>
                        <Icons 
                            name="Lupe" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={iconStyles.icon1}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.setScreen("Settings")}>    
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
                    site={props.site}
                    token={props.token}
                    myInfos={props.myInfos}    
                    getEnvelope={props.getEnvelope}
                    deleteEnvelope={props.deleteEnvelope}
                    
                    setScreen={props.setScreen}
                    setScrn={props.setScrn}
                    setForum={props.setForum} 
                />
            break
        case "ForumAdd":
            buttonIcons = 
                <ForumAddCard 
                    site={props.site}
                    token={props.token}

                    setScreen={props.setScreen}
                    setScrn={props.setScrn}   
                    setForum={props.setForum} 
                    onFunction={props.onFunction}
                />
            break    
        case "Forum":
            buttonIcons =
                <React.Fragment>
                    <TouchableOpacity onPress={props.setPrevScreen}>    
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={iconStyles.icon1}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.setScrn("PostAdd")}>
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
                    <TouchableOpacity onPress={props.setPrevScreen}>    
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
                        <TouchableOpacity onPress={() => props.setScrn("ModsSearch")}>
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
                    site={props.site}
                    token={props.token}
                    forum={props.forum}
                    getEnvelope={props.getEnvelope}

                    description="mod"
                    
                    setScrn={props.setScrn}
                />
            break 
        case "Rules":
            buttonIcons =
                <React.Fragment>
                    <TouchableOpacity onPress={props.setPrevScreen}>    
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
                        <TouchableOpacity onPress={() => props.setScrn("RulesUpdate")}>
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
                    site={props.site}
                    token={props.token}
                    forum={props.forum}
                    rules={props.rules}
                    getEnvelope={props.getEnvelope}

                    setScrn={props.setScrn}
                />
            break 
        case "PostAdd": 
            buttonIcons = 
                <PostAddCard 
                    site={props.site}
                    token={props.token}
                    forum={props.forum} 
                    
                    setScrn={props.setScrn}
                    onFunction={props.onFunction}
                />
            break
        case "Post":    
            buttonIcons =
                <React.Fragment>
                    <TouchableOpacity onPress={props.setPrevScreen}>    
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={iconStyles.icon1}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.setScrn("CommentaryAdd")}>
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
        case "CommentaryAdd":
            buttonIcons = 
                <CommentaryAddCard
                    site={props.site}
                    token={props.token}
                    forum={props.forum}
                    post={props.post} 

                    setScrn={props.setScrn}   
                    onFunction={props.onFunction}
                />
            break
        case "UserSearch":
            buttonIcons = 
                <UserSearch 
                    site={props.site}
                    token={props.token}
                    getEnvelope={props.getEnvelope}
        
                    description="chat"
                    
                    setScrn={props.setScrn}
                    onFunction={props.onFunction}
                />
            break    
        case "Chat":
            buttonIcons =
                <React.Fragment>
                    <TouchableOpacity onPress={props.setPrevScreen}>    
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
						onSubmitEditing={props.verify} 
						style={styles.chatInput}
					/>
                    <TouchableOpacity onPress={props.verify}>    
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
                    site={props.site}
                    token={props.token}
                    screen={props.screen}
                    options={props.options}
                    getEnvelope={props.getEnvelope}
                    deleteEnvelope={props.deleteEnvelope}

                    setScreen={props.setScreen}
                    setScrn={props.setScrn}
                    setMyInfos={props.setMyInfos}
                />
            break
        case "FlagsFlag":  
            buttonIcons =
                <React.Fragment>
                    <TouchableOpacity onPress={props.setPrevScreen}>    
                        <Icons 
                            name="Arrow" 
                            width={wp("10%")} 
                            height={wp("10%")} 
                            viewBox="0 0 300 300" 
                            fill="none" 
                            style={iconStyles.icon1}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.setScrn("FlagsFlagAdd")}>
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
                    site={props.site}
                    token={props.token}
                    screen={props.screen}
                    forum={props.forum}
                    flagObj={props.flagObj}

                    setScrn={props.setScrn}
                    setUpdate={props.setUpdate}
                />
            break
        case "FlagsFlagUpdate": 
            buttonIcons =
                <FlagsFlagUpdateCard
                    token={props.token}
                    screen={props.screen}
                    forum={props.forum}
                    flagObj={props.flagObj}
                    message={props.message}

                    setScrn={props.setScrn}
                    setUpdate={props.setUpdate}
                />
            break
        case "Auth":
        case "Settings":
        case "Flags":
        default:
            buttonIcons =
                <TouchableOpacity onPress={props.setPrevScreen}>    
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
                props.screen === "CommentaryAdd" || props.screen === "ForumSearch" ||
                props.screen === "UserSearch" || props.screen === "ModsSearch" ||
                props.screen === "SettingsOptions" || props.screen === "RulesUpdate" ||
                props.screen === "FlagsFlagAdd" || props.screen === "FlagsFlagUpdate" ?
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
                <Animated.View style={[{zIndex: 2, bottom: hp(2.5), opacity: fadeAnim}, styles.iButton]}>
                    {buttonIcons}
                </Animated.View>
            } 
        </React.Fragment>
    )
}

export default InteligentButton