import React, {useState} from 'react';
import { View, Image, Text, TouchableOpacity, Platform} from "react-native"
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import Icons from "./../components/Icons";
import { lightTheme, styles } from "./../Styles";

function ForumButtons(props) {
    const[favoriteActive, setFavoriteActive] = useState(props.favorite === 0 ? false: true);

    return(
        <React.Fragment>
            <TouchableOpacity 
                onPress={ () => setFavoriteActive(!favoriteActive)} 
            >
                <Icons name="Star" width={wp("10%")} height={wp("10%")} viewBox="0 0 625 625" fill="none" style={{
                    stroke: favoriteActive?lightTheme.yellow:lightTheme.darkGrey,
                    strokeWidth:"33.1px",
                    strokeLinejoin: "round",
                    strokeMiterlimit:"1.5"
                }}/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Icons name="Options" width={wp("3.3%")} height={wp("10%")} viewBox="208 0 208 625" fill="none" style={{
                    stroke: lightTheme.red,
                    strokeWidth:"33.1px",
                    strokeLinejoin: "round",
                    strokeMiterlimit:"1.5",
                    marginLeft: wp("2.5%")
                }}/>
            </TouchableOpacity>
        </React.Fragment>
    )
}

function ChatButtons(props) {
    const[favoriteActive, setFavoriteActive] = useState(props.favorite === 0 ? false: true);

    return(
        <React.Fragment>
            <Text style={styles.bodyText2}>{props.lastSaw}</Text>
            <TouchableOpacity 
                onPress={ () => setFavoriteActive(!favoriteActive)} 
                style={{
                    marginLeft: wp("2.5%")
                }}
            >
                <Icons name="Star" width={wp("10%")} height={wp("10%")} viewBox="0 0 625 625" fill="none" style={{
                    stroke: favoriteActive?lightTheme.yellow:lightTheme.darkGrey,
                    strokeWidth:"33.1px",
                    strokeLinejoin: "round",
                    strokeMiterlimit:"1.5"
                }}/>
            </TouchableOpacity>
        </React.Fragment>
    )
}

function InviteButtons(props) {
    const[accept, setAccept] = useState(false);
    const[deny, setDeny] = useState(false);

    return(
        <React.Fragment>
            <Text style={styles.bodyText2}>{props.lastSaw}</Text>
            <TouchableOpacity 
                onPress={ () => setAccept(!accept)} 
            >
                <Icons name="Accept" width={wp("10%")} height={wp("10%")} viewBox="0 0 300 300" fill="none" style={{
                    stroke: accept?lightTheme.green:lightTheme.darkGrey,
                    strokeWidth: "15.9px",
                    strokeLinejoin: "round",
                    strokeMiterlimit:"1.5"
                }}/>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={ () => setDeny(!deny)} 
            >
                <Icons name="Remove" width={wp("10%")} height={wp("10%")} viewBox="0 0 300 300" fill="none" style={{
                    stroke: deny?lightTheme.red:lightTheme.darkGrey,
                    strokeWidth:"15.9px",
                    strokeLinejoin: "round",
                    strokeMiterlimit:"1.5"
                }}/>
            </TouchableOpacity>
        </React.Fragment>
    )
}

function ContactCard(props) {
    
    return (
        <View style={{borderRadius: 20, padding: wp("5%"), ...styles.card, ...styles.bottomWrapper}}>
            { props.imagePlaceholder}
            {/* <Image/> */}
            <View style={{flex: 2, marginRight: wp("5%"), marginLeft: wp("2.5%")}}>
                <Text style={styles.headerText2} numberOfLines={1}> 
                    {props.title}
                </Text>
                <Text style={styles.bodyText2} numberOfLines={1}>
                    {props.subtitle}
                </Text>
            </View>
            <View style={styles.rightButtonsWrapper}>
                {
                    (props.mode === "Forum")?<ForumButtons favorite={props.favorite}/>:
                    (props.mode === "Chat")?<ChatButtons favorite={props.favorite} lastSaw={props.lastSaw}/>:
                    <InviteButtons/>
                }
            </View>
        </View>
    );
}

export default ContactCard;