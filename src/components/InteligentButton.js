import React from 'react';
import { View, ScrollView, Text, Platform} from "react-native"
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

import { lightTheme, styles } from "./../Styles.js";
import Icons from "./Icons";

function InteligentButton(props) {
    return (
        <View style={styles.iButton}>
            <Icons name="Lupe" width={wp("10%")} height={wp("10%")} viewBox="0 0 300 300" fill="none" style={{
                stroke: lightTheme.darkGrey,
                strokeWidth:"15.9px",
                strokeLinejoin: "round",
                strokeMiterlimit:"1.5"
            }}/>
            <Icons name="Options" width={wp("3.3%")} height={wp("10%")} viewBox="208 0 208 625" fill="none" style={{
                stroke: lightTheme.red,
                strokeWidth:"33.1px",
                strokeLinejoin: "round",
                strokeMiterlimit:"1.5",
                marginLeft: wp("2.5%")
            }}/>
        </View>
    );
}

export default InteligentButton;