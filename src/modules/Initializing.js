import React from 'react'
import { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import { goToAuth, goHome } from '../utils/navigation'

//import { USER_KEY } from '../constants/config'
import ProgressBar from './_global/ProgressBar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from './authentication/actions';
import firebase from 'react-native-firebase';
//var PushNotification = require('react-native-push-notification');
/*
PushNotification.configure({

  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function(token) {
      console.log( 'TOKEN:', token );
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
      console.log( 'NOTIFICATION:', notification );

      // process the notification

      // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
      notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
  senderID: "YOUR GCM (OR FCM) SENDER ID",

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
      alert: true,
      badge: true,
      sound: true
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
    * (optional) default: true
    * - Specified if permissions (ios) and token (android and ios) will requested or not,
    * - if not, you must call PushNotificationsHandler.requestPermissions() later
    *
  //requestPermissions: true,
});
*/
class Initialising extends Component {
  async componentDidMount() {
    //this.checkPermission();
		//this.createNotificationListeners();
    try {
      const userToken = await AsyncStorage.getItem('userToken');

      console.log("User From Async", userToken)
      Icon.getImageSource('ios-cart', 24, 'red').then(res => {
        console.log("Source: ", res.uri)
      })
      let user = null;
      if (userToken === null) {
        goToAuth();
      } else {
        user = JSON.parse(userToken);
        this.props.actions.signinUser(user);
      }
    } catch (err) {
      console.log('error: ', err)
      goToAuth()
    }
  }

  async componentWillUnmount() {
		//this.notificationListener();
		//this.notificationOpenedListener();
  }
  
  
  render() {
    return (
      <View style={styles.container}>
        <ProgressBar />
        <Text style={styles.welcome}>Loading</Text>
      </View>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    //user: state.user,
    //token: state.token,
    error: state.authReducer.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Initialising);

const styles = StyleSheet.create({
  welcome: {
    flex: 1,
    fontSize: 28
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
