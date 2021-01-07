import React, {useState} from 'react';
import { View, Image, Text, TouchableOpacity, Platform} from "react-native"
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import Icons from "./../components/Icons";
import { lightTheme, styles } from "./../Styles";

function PostCard(props) {
    const[likeActive, setLikeActive] = useState(false);

    return (
        <View style={styles.card}>
            {(props.postImage && <Image/>) || props.imagePlaceholder }
            <View style={styles.cardContentWrapper}>
                <Text style={styles.title}>
                    {props.title}
                </Text>
                <Text style={styles.bodyText}>
                    {props.bodyText}
                </Text>

                <View style={styles.bottomWrapper}>
                    {/* <Image/> */}
                    <View style={{flex: 1, marginRight: wp("5%")}}>
                        <Text style={styles.nameText} numberOfLines={1}> 
                            {props.name}
                        </Text>
                        <Text style={styles.forumText} numberOfLines={1}>
                            {props.forum}
                        </Text>
                    </View>
                    <View style={styles.rigthButtonsWrapper}>
                        <Text style={{color: likeActive?lightTheme.green:lightTheme.darkGrey, ...styles.rateText}}>
                            {props.rating}
                        </Text>
                        <TouchableOpacity
                            onPress={ () => {
                                setLikeActive(!likeActive)
                            }}
                        >
                            <View>
                                <Icons name="Arrow" width={wp("10%")} height={wp("10%")} viewBox="0 0 300 300" fill="none" style={{
                                    stroke: likeActive?lightTheme.green:lightTheme.darkGrey ,
                                    strokeLinejoin: "round",
                                    strokeWidth:"15.9px",
                                    transform: [{ rotate: "90deg" }]
                                }}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View>
                                <Icons name="Comentaries" width={wp("10%")} height={wp("10%")} viewBox="0 0 625 625" fill="none" style={{
                                    stroke: lightTheme.darkGrey,
                                    strokeWidth:"33.1px",
                                    strokeLinejoin: "round",
                                    strokeMiterlimit:"1.5"
                                }}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: wp("2.5%")}}>
                            <View>
                                <Icons name="Options" width={wp("3.3%")} height={wp("10%")} viewBox="208 0 208 625" fill="none" style={{
                                    stroke: lightTheme.red,
                                    strokeWidth:"33.1px",
                                    strokeLinejoin: "round",
                                    strokeMiterlimit:"1.5"
                                }}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default PostCard;