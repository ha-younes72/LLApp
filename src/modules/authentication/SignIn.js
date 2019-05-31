import React from 'react'
import {
  View,
  Text,
  //TextInput,
  TouchableOpacity,
  //AsyncStorage
} from 'react-native'

import Toast from "../_global/Toast";

import ProgressBar from "../_global/ProgressBar";

import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconWithBadge from "../_global/Icons";
//import { ToastAndroid } from 'react-native';

//import axios from 'axios'
import validate from './validators/validate_wrapper'

//import uuidV4 from 'uuid/v4'
import styles from './styles/signin.style'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userActions from './actions';


class Login extends React.Component {
  state = {
    mailError: '',
    mail: '',
    passwordError: '',
    password: '',
    isSigningIn: false,
    showPass: false,
    //hasError: ''
  }

  onChangeText = (key, value) => {
    this.setState(
      {
        [key]: value,
        isSigningIn: false
      }
    )
    if (this.props.message) this.rmError()
  }

  submit = () => {

    const mailError = validate('email', this.state.mail)
    const passwordError = validate('password', this.state.password)

    this.setState({
      mailError: mailError,
      passwordError: passwordError
    })

    if (!mailError && !passwordError) {
      const user = {
        password: this.state.password,
        email: this.state.mail
      }
      this.setState({
        //mail: '',
        //password: '',
        passwordError: '',
        mailError: '',
        isSigningIn: true
      }, () => { this.props.actions.signinUser(user) })
    }


  }

  /*
  _signIn(user){
    //console.log('Props: ', this.props)
    var url = this.props.screenProps.url+'users/signin';
    //var url = 'http://192.168.15.65:3210/data';
    //console.log('Url: ', url);
    var base = this
    axios.post(url, {
      email: user.email,
      password: user.password
    })
    .then(function (response) {
      if (response.data.success){
        //console.log('Signed In ', response.data.success);
        //console.log('id:',response.data.userInfo)
        base.props.screenProps.userId = response.data.userInfo._id;
        base.props.screenProps.token = response.data.token;
        //console.log('screenProps: ' ,base.props.screenProps)
        base._signInAsync(user);
      }else{
        alert('Not Registered!!!\n Please Register.');
        base.props.navigation.navigate('Register');
      }
      //console.log('Response:', response);
    })
    .catch(function (error) {
      alert(error.response.data.message);
      base.props.navigation.navigate('Register');
      console.log('Errorrrrrrrrrrrrrrrrrrrrrrr:',error.response);
    });
    //this._signInAsync(user)
  }
  
  
  _signInAsync =  async (user) => {
    await AsyncStorage.setItem('userToken', JSON.stringify(user))
      .then()
      .catch(err => {
        alert('error: ', err);
      })
    //await AsyncStorage.setItem('userToken', {user});

    this.props.navigation.navigate('App');
    //this.props.navigation.navigate('App');
  };
*/
  rmError() {
    this.setState({
      isSigningIn: false,
    })
    //const err = this.props.error;
    //console.log("I'm going to show error if I can: ", err)
    this.props.actions.clearError();
    //ToastAndroid.show(err, ToastAndroid.SHORT);
    //return (
    //<View style={styles.progressBar}>
    //    <Toast visible={true} message={err} />
    //  <ProgressBar />
    //</View>
    //)
  }

  render() {
    return (

      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>LeafLet App</Text>
        </View>

        <View style={styles.inputMainContainer}>
          <Input
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.input}
            onChangeText={val => this.onChangeText('mail', val)}
            placeholder='Mail'
            value={this.state.mail}
            onBlur={() => {
              this.setState({
                mailError: validate('email', this.state.mail)
              })
            }}
            leftIcon={
              <IconWithBadge
                style={{ margin: 0 }}
                name='ios-mail'
                size={24}
                color='black'
              />
            }
            errorStyle={{ color: 'red' }}
            errorMessage={this.state.mailError ? this.state.mailError : null}
          />

          <Input
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.input}
            onChangeText={val => this.onChangeText('password', val)}
            placeholder='Password'
            value={this.state.password}
            onBlur={() => {
              this.setState({
                passwordError: validate('password', this.state.password)
              })
            }}
            secureTextEntry={!this.state.showPass}
            leftIcon={
              <Icon
                name='key'
                size={24}
                color='black'
              />
            }
            rightIcon={
              <TouchableOpacity onPress={() => {
                if (this.state.showPass) {
                  this.setState({
                    showPass: false
                  })
                } else {
                  this.setState({
                    showPass: true
                  })
                }
              }}>
                <Icon
                  name='eye'
                  size={24}
                  color='black'
                />
              </TouchableOpacity>
            }
            errorStyle={{ color: 'red' }}
            errorMessage={this.state.passwordError ? this.state.passwordError : null}
          />
        </View>
        {this.state.isSigningIn ?
          <View style={styles.progressBar}>
            <ProgressBar color={'white'} />
            <Toast visible={this.props.message ? true : false} message={this.props.message} />
          </View>
          :
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={this.submit}>
              <View style={styles.buttonInner}>
                <Text style={styles.buttontext}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
        }
      </View>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {
    //user: state.user,
    //token: state.token,
    message: state.authReducer.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);


/*<TouchableOpacity style = {styles.button} onPress={()=>{this.props.navigation.navigate('Register')}}>
    <View style = {styles.buttonInner}>
        <Text style={styles.buttontext}>Sign Up</Text>
    </View>
</TouchableOpacity>*/