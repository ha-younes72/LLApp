import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import { Navigation } from "react-native-navigation";
//import { RNCamera } from 'react-native-camera';

import { colors, fonts } from '../../_global/theme'
import IconWithBadge from '../../_global/Icons';
import { iconsMap } from '../../../utils/AppIcons';

const PendingView = () => (
    <View
        style={{
            flex: 1,
            backgroundColor: 'lightgreen',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Text>Waiting</Text>
    </View>
);

class TopNav extends React.Component {
    state = {
        result: 'No Result'
    }

    render() {
        const { screenTitle } = this.props
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.menuTrigger} onPress={() => { this.openDrawer() }}>
                    <View style={styles.menuTriggerInner}>
                        <IconWithBadge name={'ios-menu'} size={37} color={'white'} ></IconWithBadge>
                    </View>
                </TouchableOpacity>

                <View style={styles.title}>
                    <Text style={styles.titleText} > {screenTitle} </Text>
                </View>

                <View style={styles.barcode}>
                    <TouchableOpacity onPress={() => { this.openCamera() }}>
                        <View>
                            <IconWithBadge name={'ios-barcode'} size={37} color={'white'} ></IconWithBadge>
                        </View>
                    </TouchableOpacity>
                </View>


            </View>
        );
    }

    openDrawer() {
        console.log('I have to open the menu')
        Navigation.mergeOptions('LeftDrawer', {
            sideMenu: {
                left: {
                    visible: true
                }
            }
        });
    }

    openCamera() {
        console.log('I have to open the camera')
        //Navigation.showModal()
        /*Navigation.mergeOptions('RightDrawer', {
            sideMenu: {
                right: {
                    visible: true
                }
            }
        });*/
        /*
        Navigation.showModal({
            stack: {
                children: [{
                    component: {
                        name: 'leaflet.Camera',
                        passProps: {
                            text: 'stack with one child'
                        },
                        options: {
                            topBar: {
                                visible: false,
                                drawBehind: true,
                               
                            }
                        }
                    }
                }]
            }
        });*/
        /*Navigation.showOverlay({
            component: {
                name: 'leaflet.Camera',
                options: {
                    overlay: {
                        interceptTouchOutside: true
                    }
                }
            },
            topBar: {
                backButton: {
                    visible: true
                }
            }
        });*/

        Navigation.push('AppStack', {
            component: {
                name: 'leaflet.Camera',
                /*options: {
                    topBar: {
                        visible: false,
                        drawBehind: true,
                        backButton: {
                            icon: iconsMap['ios-cart'],//require('./signin.png'),
                            visible: true
                        },
                    },
                }*/
            },


            /*bottomTab:{
                visible: false
            }*/
        })
    }

    takePicture = async function (camera) {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        //  eslint-disable-next-line
        console.log(data.uri);
    };


}


const styles = StyleSheet.create({
    container: {
        position: 'relative',
        top: 0,
        left: 0,
        height: 45,
        backgroundColor: colors.primary,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
    },
    menuTrigger: {
        flex: 1,
        //backgroundColor:'black'
    },
    menuTriggerInner: {
        alignItems: 'center',
        flex: 1
    },
    title: {
        flex: 5,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 23,
        color: 'white',
        fontFamily: fonts.primary,
    },
    barcode: {
        flex: 1
    }
})


export default TopNav

/*
<View style={styles.barcode}>
                <RNCamera
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                    >
                    {({ camera, status, recordAudioPermissionStatus }) => {
                        if (status !== 'READY') return <PendingView />;
                        return (
                        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                                <View>
                                    <IconWithBadge name={'ios-barcode'} size={37} color={'white'} ></IconWithBadge>
                                </View>
                            </TouchableOpacity>
                        </View>
                        );
                    }}
                </RNCamera>
            </View>

            */