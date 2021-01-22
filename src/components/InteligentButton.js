import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, Platform} from "react-native"
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

import { lightTheme, styles } from "./../Styles.js";
import Icons from "./Icons";

function InteligentButton(props) {

    let buttonIcons;
    
    switch (props.screen) {
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
                        onPress={() => props.handleScreenList("Settings")}
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
                        onPress={() => props.handleScreenList("Settings")}
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
        case "Post":
            buttonIcons =
                <React.Fragment>
                    <TouchableOpacity
                        onPress={() => 
                            {
                                props.handleDecrementPost()
                                props.handleDecrementScreen()
                            }
                        }
                    >    
                        <Icons name="Arrow" width={wp("10%")} height={wp("10%")} viewBox="0 0 300 300" fill="none" style={{
                            stroke: lightTheme.darkGrey ,
                            strokeLinejoin: "round",
                            strokeWidth:"15.9px",
                            marginRight: wp("1.25%")
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
                </React.Fragment>
            break;
        case "Forum":
            buttonIcons =
                <React.Fragment>
                    <TouchableOpacity
                        onPress={() => props.handleDecrementScreen()}
                    >    
                        <Icons name="Arrow" width={wp("10%")} height={wp("10%")} viewBox="0 0 300 300" fill="none" style={{
                            stroke: lightTheme.darkGrey ,
                            strokeLinejoin: "round",
                            strokeWidth:"15.9px",
                            marginRight: wp("1.25%")
                        }}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icons name="Lupe" width={wp("10%")} height={wp("10%")} viewBox="0 0 300 300" fill="none" style={{
                            stroke: lightTheme.darkGrey,
                            strokeWidth:"15.9px",
                            strokeLinejoin: "round",
                            strokeMiterlimit:"1.5",
                            marginRight: wp("1.25%")
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
                </React.Fragment>
            break;
        case "Settings":
        default:
            buttonIcons =
                <TouchableOpacity
                    onPress={() => props.handleDecrementScreen()}
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