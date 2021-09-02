import React, {useState, useEffect} from 'react'
import {View, Text, ScrollView} from "react-native"
import {useBackHandler} from '@react-native-community/hooks'

import {widthPercentageToDP as wp} from "react-native-responsive-screen"

import InteligentButton from "../components/InteligentButton.js"
import PostCard from "../components/PostCard"
import PostCardModal from '../components/modals/PostCardModal'
import {lightTheme, styles} from "./../Styles"

function Flags(props) {
    //Stores all cards components
    const[cards, setCards] = useState([])

    //Modal vars
    const[modalInfos, setModalInfos] = useState(null)
    const[isModalActive, setIsModalActive] = useState(false)

    const onGetPostsAndComments = async (isItPost, post, comments = "", index) => {
        isItPost ?
        await fetch(`${props.site}/api/forums/${props.forum}/posts/${post}`, 
        props.getEnvelope)
        .then(res => res.json())
        .then(data => { 
            if(data != null) 
                setCards( state => [state, 
                    <PostCard
                        site={props.site}
                        token={props.token}
                        myInfos={props.myInfos}
                        deleteEnvelope={props.deleteEnvelope}

                        key={index}
                        mode="Flags"
                        isItPost={true}
                        title={data.post.title}
                        bodyText={data.post.bodyText}
                        name={data.post.author}
                        owner={data.owner}
                        mods={data.mods}
                        forum={data.post.forum}
                        post={post}
                        comments={comments}
                        rating={data.post.upvotes}
                        isOnModal={false}
                        
                        setScreen={props.setScreen}
                        setPrevScreen={props.setPrevScreen}
                        setForum={props.setForum}
                        setFlagObj={props.setFlagObj} 

                        setModalInfos={infos => setModalInfos(infos)}
                        setIsModalActive={bool => setIsModalActive(bool)}
                    />
                ])
        })
        .catch(err => err) :
        await fetch(`${props.site}/api/forums/${props.forum}/posts/${post}/comentaries/${comments}`, 
        props.getEnvelope)
        .then(res => res.json())
        .then(data => {
            if(data != null) 
                setCards( state => [
                    state,
                    <PostCard
                        site={props.site}
                        token={props.token}
                        myInfos={props.myInfos}
                        deleteEnvelope={props.deleteEnvelope}

                        key={index}
                        mode="Flags"
                        isItPost={false}
                        bodyText={data.comentary.bodyText}
                        name={data.comentary.author}
                        owner={data.owner}
                        mods={data.mods}
                        forum={data.comentary.forum}
                        post={post}
                        comments={comments}
                        rating={data.comentary.upvotes}
                        isOnModal={false}
                        
                        setScreen={props.setScreen}
                        setForum={props.setForum}
                        setFlagObj={props.setFlagObj}

                        setModalInfos={infos => setModalInfos(infos)}
                        setIsModalActive={bool => setIsModalActive(bool)}
                    /> 
                ])
        })
        .catch(err => err)
    }

    //On get posts and comments flagged
    const onGet = async () => {
        await fetch(`${props.site}/api/forums/${props.forum}/flags`, 
        props.getEnvelope)
        .then(res => res.json())
        .then(data => { 
            if(data.flags[0] != null) 
                data.flags.map((obj, index) => {
                    onGetPostsAndComments(
                        obj.isItPost, 
                        obj.post, 
                        obj.comentaries,
                        index
                    )
                })
        })
        .catch(err => err)
    }   

    //Updates cards
    useEffect(() => {onGet()},[])

    useBackHandler(() => {
        isModalActive ? setIsModalActive(false) : props.setPrevScreen()
        return true    
    })

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: lightTheme.ligthGrey,
        }}>
            <View style={{flex:1, width: wp("100%")}}>
                <Text style={{
                    marginLeft: wp("7.5%"), 
                    marginTop: wp("10%"),
                    ...styles.headerText3
                }}>
                    Posts denunciados
                </Text> 
                
                <ScrollView contentContainerStyle={{paddingBottom: 200, marginTop: wp("2.5%")}}>
                    <React.Fragment>
                        {cards.map(card => card)}
                    </React.Fragment>
                </ScrollView>
            </View>

            <InteligentButton 
                screen={"Flags"}
                setPrevScreen={props.setPrevScreen}
            />

            {
                isModalActive &&
                <PostCardModal
                    site={props.site} 
                    token={props.token} 
                    myInfos={props.myInfos}
                    getEnvelope={props.getEnvelope}
                    deleteEnvelope={props.deleteEnvelope}
                    
                    setScreen={props.setScreen}
                    setForum={props.setForum}
                    setPost={props.setPost} 
                    setFlagObj={props.setFlagObj}
                    
                    bodyText={modalInfos.bodyText}
                    mode={modalInfos.mode}
                    name={modalInfos.name}
                    owner={modalInfos.owner}
                    mods={modalInfos.mods}
                    forum={modalInfos.forum}
                    forumName={modalInfos.forumName}
                    title={modalInfos.title}
                    rating={modalInfos.rating}
                    post={modalInfos.post}
                    comments={modalInfos.comments}
                    isItPost={modalInfos.isItPost}
                    like={modalInfos.like}
                    pressInfos={modalInfos.pressInfos}
                    pressCondition={modalInfos.pressCondition}

                    setLike={modalInfos.setLike}
                    onFunction={modalInfos.onFunction}
                    setIsModalActive={bool => setIsModalActive(bool)}
                />
            }
        </View>
    )
}

export default Flags