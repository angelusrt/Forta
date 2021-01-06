import React, {useState} from 'react';
import { View, Image, KeyboardAvoidingView, Text, TextInput,TouchableOpacity, Platform} from "react-native"
import Svg, { 
    Circle, Ellipse, G, Text, TSpan, TextPath, Path, Polygon, Polyline, Line, Rect,
    Use, Image, Symbol, Defs, LinearGradient, RadialGradient, Stop, ClipPath, Pattern, Mask 
} from 'react-native-svg'

function PostCard(props) {
    return (
        <View>
            <Image/>
            <Text>
                {props.title}
            </Text>
            <Text>
                {props.bodyText}
            </Text>

            <View>
                <Image/>
                <View>
                    <Text>
                        {props.name}
                    </Text>
                    <Text>
                        {props.forum}
                    </Text>
                </View>
                <Text>
                    {props.rating}
                </Text>
                <TouchableOpacity>
                    <View>

                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View>
                        
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View>
                        
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default PostCard;