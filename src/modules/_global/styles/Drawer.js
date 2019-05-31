/*import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 25,
		justifyContent: 'center'
	},
	drawerList: {

	},
	drawerListIcon: {
		width: 27
	},
	drawerListItem: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 23
	},
	drawerListItemText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 23,
		paddingLeft: 15,
		flex: 1
	},
	linearGradient: {
		// top: 0,
		// left: 0,
		// right: 0,
		// height: 248,
		// position: 'absolute'
		flex: 1
	},
	_version: {
		color: '#3c3c3c',
		position: 'absolute',
		bottom: 25,
		marginLeft: 53
	}
});

export default styles;*/

import {
    StyleSheet,
    Platform,
    Dimensions
} from 'react-native'
import { colors } from '../theme'
import { fonts } from '../theme'

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //width: deviceWidth,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    linearGradient: {
		// top: 0,
		// left: 0,
		// right: 0,
		// height: 248,
		// position: 'absolute'
		flex: 1
	},
    header: {
        backgroundColor: 'white',
        width: '100%',
        //paddingTop: 70,
    },
    headerText: {
        color: 'white',
        fontSize: 25,
        fontFamily: fonts.primary,
        marginBottom: 20,
    },
    menuItem: {
        backgroundColor: 'transparent',//colors.primary,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        margin: 1,
        width: '100%',
        height: 40,
        justifyContent: 'center'

    },
    menuItemInner: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    menuItemText: {
        fontSize: 15,
        fontFamily: fonts.primary,
        color: 'white'
    },
    drawerCover: {
        alignSelf: "stretch",
        height: deviceHeight / 3.5,
        width: null,//(deviceWidth * 2) / 3,
        position: "relative",
        opacity: 0.3,
        //marginBottom: 10,
    },
    drawerImage: {
        position: "absolute",
        left: Platform.OS === "android" ? deviceWidth / 12 : deviceWidth / 11,
        top: Platform.OS === "android" ? deviceHeight / 15 : deviceHeight / 14,
        //left: 10,
        //top: 12,
        width: 232,
        height: 108,
        resizeMode: "cover"
    }
});

export default styles