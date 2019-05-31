import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ScrollView
} from 'react-native'

import Toast from "../_global/Toast";

import ProgressBar from "../_global/ProgressBar";

import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconWithBadge from "../_global/Icons";

import axios from 'axios'
import styles from './styles/signup.style'
import uuidV4 from 'uuid/v4'
//import validation from '../../Actions/validation'
import validate from './validators/validate_wrapper'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from './actions';
import { RadioGroup } from "react-native-btr";
import { colors } from "../_global/theme"

class Register extends React.Component {
  state = {
    password: '',
    id: '',
    mail: '',
    mailError: '',
    passwordError: '',
    fnameError: '',
    fname: '',
    lname: '',
    isRegistering: false,
    showPass: false,
    owner: false,
    storeName: '',
    storeAddress: ''
  }

  onChangeText = (key, value) => {
    this.setState(
      {
        [key]: value,
        isRegistering: false
      }
    )
    if (this.props.message) this.rmError()
  }

  submit = () => {

    const mailError = validate('email', this.state.mail)
    const passwordError = validate('password', this.state.password)
    const fnameError = validate('firstname', this.state.fname)

    this.setState({
      mailError: mailError,
      passwordError: passwordError,
      fnameError: fnameError
    })

    if (!mailError && !passwordError && !fnameError) {
      var user = null
      if (this.state.owner) {
        user = {
          password: this.state.password,
          email: this.state.mail,
          fname: this.state.fname,
          lname: this.state.lname,
          id: uuidV4(),
          roles: ['user', 'owner'],
          storeName: this.state.storeName,
          storeAddress: this.state.storeAddress
        }
      } else {
        user = {
          password: this.state.password,
          email: this.state.mail,
          fname: this.state.fname,
          lname: this.state.lname,
          id: uuidV4(),
          roles: ['user']
        }
      }
      //this.props.screenProps.addUser(user)
      /*console.log('Username: ', this.state.username, 
          '\n Pass: ', this.state.password,
          '\n Id: ', this.state.id,
          '\n mail: ', this.state.mail
      )*/
      this.setState({
        //password: '',
        //id: '',
        //mail: '',
        passwordError: '',
        mailError: '',
        fnameError: '',
        //fname: '',
        //lname: '',
        isRegistering: true
      }, () => { this.props.actions.signupUser(user) })
    }


  }

  /*

  _signUp(user) {
    //var url = 'http://192.168.15.65:3210/signup';
    var url = this.props.screenProps.url + 'users/signup';
    console.log('Url: ', url);
    const base = this;
    axios.post(url, {
      fname: user.fname,
      lname: user.lname,
      password: user.password,
      email: user.email
    })
      .then(function (response) {
        console.log('Register Response', response)
        if (response.status === 200) {
          base._signUpAsync(user)
        } else {
          if (response.status === 409) {
            alert('Mail Exists')
          } else {
            alert('Error: ', response.data.error)
          }
        }
      })
      .catch(function (error) {
        if (error.response.status === 409) {
          alert('Mail Exists')
        } else {
          alert('Error: ', error.response.data.error)
        }
        console.log("Error:", error.response);
      });
  }

  _signUpAsync = async (user) => {
    const base = this;
    await AsyncStorage.setItem('userToken', JSON.stringify(user))
      .then(base.props.navigation.navigate('App'))
      .catch(err => {
        console.log('error: ', err);
      })
    //await AsyncStorage.setItem('userToken', {user});
  };
  */
  rmError() {
    this.setState({
      isRegistering: false,
    })
    //const err = this.props.message;
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

      <ScrollView style={styles.container} contentContainerStyle={styles.containerContent}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>LeafLet App</Text>
        </View>

        <View style={styles.inputMainContainer}>
          <Input
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.input}
            onChangeText={val => this.onChangeText('fname', val)}
            placeholder='First Name'
            value={this.state.fname}
            onBlur={() => {
              this.setState({
                fnameError: validate('firstname', this.state.fname)
              })
            }}
            leftIcon={
              <Icon
                name='user'
                size={24}
                color='black'
              />
            }
            errorStyle={{ color: 'red' }}
            errorMessage={this.state.fnameError ? this.state.fnameError : null}
          />

          <Input
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.input}
            onChangeText={val => this.onChangeText('lname', val)}
            placeholder='Last Name'
            value={this.state.lname}
            leftIcon={
              <Icon
                name='user'
                size={24}
                color='black'
              />
            }
          />

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

          <View style={[{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingLeft: 30 }]}>
            <Text style={{ padding: 5, color: 'white', fontSize: 16 }}>Store Owner:</Text>
            <RadioGroup
              color={'white'}
              style={{ flexDirection: 'row', padding: 5 }}
              labelStyle={{ fontSize: 14 }}
              radioButtons={
                [
                  {
                    label: 'Yes',
                    value: 'RealTimeNotifYes',
                    checked: false,
                    color: 'white',
                    flexDirection: 'row',
                    size: 10
                  },
                  {
                    label: 'No',
                    value: 'RealTimeNotifNo',
                    checked: false,
                    color: 'white',
                    flexDirection: 'row',
                    size: 10
                  }
                ]
              }
              onPress={
                radioButtons => {
                  if (radioButtons[0].checked) {
                    this.setState({
                      owner: true
                    }, () => {
                      console.log('Yes')
                    })
                  } else {
                    this.setState({
                      owner: false
                    }, () => {
                      console.log('No')
                    })
                  }
                }
              }
            />
          </View>

          {this.state.owner
            ?
            <View>
              <Input
                containerStyle={styles.inputContainer}
                inputContainerStyle={styles.input}
                onChangeText={val => this.onChangeText('storeName', val)}
                placeholder='Store Name'
                value={this.state.storeName}
                /*onBlur={() => {
                  this.setState({
                    passwordError: validate('password', this.state.password)
                  })
                }}*/
                //secureTextEntry={!this.state.showPass}
                leftIcon={
                  <Icon
                    name='home'
                    size={24}
                    color='black'
                  />
                }
              //errorStyle={{ color: 'red' }}
              //errorMessage={this.state.passwordError ? this.state.passwordError : null}
              />
              <Input
                containerStyle={styles.inputContainer}
                inputContainerStyle={styles.input}
                onChangeText={val => this.onChangeText('storeAddress', val)}
                placeholder='Store Address'
                value={this.state.storeAddress}
                /*onBlur={() => {
                  this.setState({
                    passwordError: validate('password', this.state.password)
                  })
                }}
                secureTextEntry={!this.state.showPass}*/
                leftIcon={
                  <Icon
                    name='key'
                    size={24}
                    color='black'
                  />
                }

              //errorStyle={{ color: 'red' }}
              //errorMessage={this.state.passwordError ? this.state.passwordError : null}
              />
            </View>
            :
            null
          }


        </View>
        {this.state.isRegistering ?
          <View style={styles.progressBar}>
            <ProgressBar color={'white'} />
            <Toast visible={this.props.message ? true : false} message={this.props.message} />
          </View>
          :
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={this.submit}>
              <View style={styles.buttonInner}>
                <Text style={styles.buttontext}>Sign Up</Text>
              </View>
            </TouchableOpacity>
          </View>
        }
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);