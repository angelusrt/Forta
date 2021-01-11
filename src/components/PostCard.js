import React, {useState} from 'react';
import { View, Image, Text, TouchableOpacity, Platform} from "react-native"
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import Icons from "./../components/Icons";
import { lightTheme, styles } from "./../Styles";

function PostCard(props) {
    const[likeActive, setLikeActive] = useState(false);

    return (
        <View style={{borderRadius: 20, ...styles.card}}>
            {(props.postImage && <Image/>) || props.imagePlaceholder }
            
            <View style={{padding: wp("5%")}}>
                <Text style={styles.headerText}>
                    {props.title}
                </Text>
                <Text style={styles.bodyText}>
                    {props.bodyText}
                </Text>

                <View style={styles.bottomWrapper}>
                    { props.photoPlaceholder }
                    <View style={{flex: 1.5, marginRight: wp("5%")}}>
                        <Text style={styles.headerText2} numberOfLines={1}> 
                            {props.name}
                        </Text>
                        <Text style={styles.bodyText2} numberOfLines={1}>
                            {props.forum}
                        </Text>
                    </View>
                    <View style={{alignItems: 'flex-end', ...styles.rightButtonsWrapper}}>
                        <Text style={{color: likeActive?lightTheme.green:lightTheme.darkGrey, marginBottom: wp("0.625%"), ...styles.rateText}}>
                            {props.rating}
                        </Text>
                        <TouchableOpacity
                            onPress={ () => {
                                setLikeActive(!likeActive)
                            }}
                        >
                            <Icons name="Arrow" width={wp("10%")} height={wp("10%")} viewBox="0 0 300 300" fill="none" style={{
                                stroke: likeActive?lightTheme.green:lightTheme.darkGrey ,
                                strokeLinejoin: "round",
                                strokeWidth:"15.9px",
                                transform: [{ rotate: "90deg" }]
                            }}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: wp("2.5%")}}>
                            <Icons name="Options" width={wp("3.3%")} height={wp("10%")} viewBox="208 0 208 625" fill="none" style={{
                                stroke: lightTheme.red,
                                strokeWidth:"33.1px",
                                strokeLinejoin: "round",
                                strokeMiterlimit:"1.5"
                            }}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default PostCard;