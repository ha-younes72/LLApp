import React from "react";

import { Icon } from "react-native-vector-icons/Ionicons";

import {
    View,
    Text,
    Platform
} from "react-native";
import IconWithBadge from "../../_global/Icons";


class cameraIcon extends React.Component {
    render() {
        return (
            <View style={{
                ...Platform.select({
                    android:{
                        paddingRight: 16,
                        //marginLeft: 8
                    }
                }),
                //marginRight: 10,
                //paddingRight: 10
            }}>
                <IconWithBadge style={{padding:0}} name={'ios-barcode'} size={30} color={'black'} badgeCount={0}>
                </IconWithBadge>
            </View>

        )
    }
}
/*
<IconWithBadge name={'ios-barcode'} size={30} color={'black'} badgeCount={0}>
                </IconWithBadge>
                
const cameraIcon = () => {
    return (
        <View style={{
            marginRight: 10
        }}>
            <Icon name={'ios-barcode'}></Icon>
        </View>
    )
}*/

export default cameraIcon 