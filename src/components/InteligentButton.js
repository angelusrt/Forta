import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Platform} from "react-native"
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

import { lightTheme, styles } from "./../Styles.js";
import Icons from "./Icons";

function InteligentButton(props) {

    let buttonIcons;
    
    switch (props.currentScreen) {
        case "Forums":
            buttonIcons = 
                <React.Fragment>
                    <TouchableOpacity>
                        <Icons name="Lupe" width={wp("10%")} height={wp("10%")} viewBox="0 0 300 300" fill="none" style={{
                            stroke: lightTheme.darkGrey,
                            strokeWidth:"15.9px",
                            strokeLinejoin: "round",
                            strokeMiterlimit:"1.5"
                        }}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icons name="Add" width={wp("10%")} height={wp("10%")} viewBox="0 0 625 625" fill="none" style={{
                            stroke: lightTheme.darkGrey,
                            strokeWidth:"33.1px",
                            strokeLinejoin: "round",
                            strokeMiterlimit:"1.5"
                        }}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.nextScreen("Settings")}
                    >    
                        <Icons name="Options" width={wp("3.3%")} height={wp("10%")} viewBox="208 0 208 625" fill="none" style={{
                            stroke: lightTheme.red,
                            strokeWidth:"33.1px",
                            strokeLinejoin: "round",
                            strokeMiterlimit:"1.5",
                            marginLeft: wp("2.5%"),
                            marginRight: wp("2.5%")
                        }}/>
                    </TouchableOpacity>
                </React.Fragment>
            break;
        case "Home":
        case "Chats":
        case "Invites":
            buttonIcons = 
                <React.Fragment>
                    <TouchableOpacity>
                        <Icons name="Lupe" width={wp("10%")} height={wp("10%")} viewBox="0 0 300 300" fill="none" style={{
                            stroke: lightTheme.darkGrey,
                            strokeWidth:"15.9px",
                            strokeLinejoin: "round",
                            strokeMiterlimit:"1.5"
                        }}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.nextScreen("Settings")}
                    >    
                        <Icons name="Options" width={wp("3.3%")} height={wp("10%")} viewBox="208 0 208 625" fill="none" style={{
                            stroke: lightTheme.red,
                            strokeWidth:"33.1px",
                            strokeLinejoin: "round",
                            strokeMiterlimit:"1.5",
                            marginLeft: wp("2.5%"),
                            marginRight: wp("2.5%")
                        }}/>
                    </TouchableOpacity>
                </React.Fragment>
            break;
        case "Settings":
        default:
            buttonIcons =
                <TouchableOpacity
                    onPress={() => props.nextScreen("HomeTab")}
                >    
                    <Icons name="Arrow" width={wp("10%")} height={wp("10%")} viewBox="0 0 300 300" fill="none" style={{
                        stroke: lightTheme.darkGrey ,
                        strokeLinejoin: "round",
                        strokeWidth:"15.9px"
                    }}/>
                </TouchableOpacity>
            break;
    }

    return (
        <View style={styles.iButton}>
            { buttonIcons }
        </View>
    );
}

export default InteligentButton;