import React from 'react';
import { Navigation } from "react-native-navigation";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Platform,
  FlatList,
  Alert,
  AsyncStorage,
  Button
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as offsActions from './actions';
import CardOne from './components/CardOne';
import CardTwo from './components/CardTwo';
import Card from "./components/Card";
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/Home.style';
import { iconsMap } from '../../utils/AppIcons';
import { colors } from '../_global/theme';
import TopNav from './components/TopNav';

import firebase from 'react-native-firebase';
import { MessageBar } from 'react-native-messages';
import { showMessage } from 'react-native-messages';

class Home extends React.Component {
  static get options() {
    return {
      topBar: {
        visible: false
        /*title: {
          text: 'Home'
        }
        /*leftButtons: [
          {
            id: 'buttonOne',
            icon: require('../../utils/signup.png')
          }
        ],
        rightButtons: [],*/
      },
      bottomTabs: {
        backgroundColor: colors.primaryLight
      },
      bottomTab: {
        //badge: '0'
        icon: iconsMap['ios-home'],//require('../utils/signup.png')
        iconColor: colors.primary,
        selectedIconColor: 'white',
        textColor: colors.primary,
        selectedTextColor: 'white'
      }
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isRefreshing: false
    };

    //this._viewMovie = this._viewMovie.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    Navigation.events().bindComponent(this);

    this.MessageBar = React.createRef();
  }


  async componentDidMount() {
    this._retrieveOffs();
    this._retrieveCats();
    this.checkPermission();
    this.createNotificationListeners();
  }

  async componentDidAppear() {
    this.MessageBar.current.register();
    this.setState({
      setMessagebar: true
    }, () => {
      console.log('home appear')
    })
  }

  async componentDidDisappear() {
    //this.MessageBar.current.unregister();
    this.setState({
      setMessagebar: false
    }, () => {
      console.log('home disappear')
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.recommendedOffs && nextProps.popularOffs && nextProps.categories) {
      this.setState({ isLoading: false });
    }
  }

  _retrieveOffs(isRefreshed) {
    this.props.actions.retrieveRecommendedOffs(this.props.token, 1);
    this.props.actions.retrievePopularOffs(this.props.token, 1);
    if (isRefreshed && this.setState({ isRefreshing: false }));
  }

  _retrieveCats() {
    this.props.actions.retrieveCategories(this.props.token);
  }

  _viewOffsList(type, title) {
    let rightButtons = [];
    //if (Platform.OS === 'ios') {
    rightButtons = [
      {
        id: 'close',
        title: 'Close',
        color: colors.primary,
        icon: iconsMap['ios-close']
      }
    ];
    //}
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: 'leaflet.ProductsList',
            passProps: {
              type
            },
            options: {
              topBar: {
                visible: true,
                drawBehind: false,
                title: {
                  text: title,
                  color: colors.primary
                },
                rightButtons: rightButtons,
                backButton: {
                  //id: 'back',
                  visible: false,
                  color: colors.primary
                }
              }
            }
          }
        }]
      }
    });
  }

  _addtoWishlist(off) {
    this.props.actions.addToWishlist(off);
  }

  _viewProduct(off) {
    Navigation.showModal({
      stack: {
        id: 'ProductStack',
        children: [{
          component: {
            name: 'leaflet.Product',
            passProps: {
              off
            },
            options: {
              topBar: {
                visible: true,
                drawBehind: false,
                /*title: {
                  text: title
                },*/
                rightButtons: [
                  {
                    id: 'close',
                    icon: iconsMap['ios-arrow-round-down']
                  }
                ],
                backButton: {
                  visible: false
                }
              }
            }
          }
        }]
      }
    });
    /*
    this.props.navigator.showModal({
      screen: 'movieapp.Movie',
      passProps: {
        productId: productId
      },
      backButtonHidden: true,
      navigatorButtons: {
        rightButtons: [
          {
            id: 'close',
            icon: iconsMap['ios-arrow-round-down']
          }
        ]
      }
    });
    */
  }

  _onRefresh() {
    this.setState({ isRefreshing: true });
    this._retrieveOffs('isRefreshed');
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'openMenu') {
      console.log('I have to open the menu')
      Navigation.mergeOptions('LeftDrawer', {
        sideMenu: {
          left: {
            visible: true
          }
        }
      });
      //Navigation.popTo('LeftDrawer')
    }
  }

  logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken')
      goToAuth()
    } catch (err) {
      console.log('error signing out...: ', err)
    }
  }

  async componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async createNotificationListeners() {

    // Notification in foreground
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body, data } = notification;
      console.log('Notification in foreground: ', notification);
      this.showAlert({ title, body, data });
    });

    // Notification in background
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body, data } = notificationOpen.notification;
      console.log('Notification in background: ', notificationOpen.notification);
      this.props.actions.addToNotifs(this.props.token, { title, body, data }, 'Background')
      //this.showAlert(title, body, data);
    })

    // Notificatio when app is closed
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body, data } = notificationOpen.notification;
      console.log('Notification in closed: ', notificationOpen.notification);
      this.props.actions.addToNotifs(this.props.token, { title, body, data }, 'Closed')
      //this.showAlert(title, body, data);
    }

    // Data only payload in foreground
    this.messgaeListener = firebase.messaging().onMessage((message) => {
      console.log('Data only payload in foreground: ', message);
    })
  }

  CustomMessage({ message }) {
    console.log("Message Notif: ", message.notif)
    var off = message.notif
    return (
      <View style={styles.customMessage}>
        <Text style={styles.customMessageText}>{message.title}</Text>
        <Text style={styles.customMessageText}>{message.body}</Text>
        <View style={styles.separator} />
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
          {/*<Button
            title="Show"
            onPress={() => Navigation.showModal({
              stack: {
                id: 'ProductStack',
                children: [{
                  component: {
                    name: 'leaflet.Product',
                    passProps: {
                      off
                    },
                    options: {
                      topBar: {
                        visible: true,
                        drawBehind: false,
                        rightButtons: [
                          {
                            id: 'close',
                            icon: iconsMap['ios-arrow-round-down'],
                            color: colors.primary
                          }
                        ],
                        backButton: {
                          visible: false
                        }
                      }
                    }
                  }
                }]
              }
            })
            }
          />*/}
          <Button
            title="Dismiss"
          //onPress={() => showMessage('Hey!')}
          />
        </View>

      </View>
    );
  }

  async addToNotifs(token, notification, type) {
    this.props.actions.addToNotifs(token, notification, type)
  }

  showAlert(notification) {
    const { title, body, data } = notification;
    this.addToNotifs(this.props.token, notification, 'Foreground')
    var notif = this.props.notifs[this.props.notifsCounter - 1]
    console.log("Title: ", title, " Body: ", body, " Data: ", data)
    showMessage({ title, body, notif }, {
      messageComponent: this.CustomMessage,
      duration: 4000,
      slideAnimationOffset: 10,
      showAnimationDuration: 400,
      hideAnimationDuration: 600
    })
  }


  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('FCMToken: ', fcmToken)
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      console.log('FCMToken Remote: ', fcmToken)
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async requestPermission() {
    try {
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }


  render() {
    const { recommendedOffs, popularOffs } = this.props;
    const iconPlay = <Icon name="md-play" size={21} color="#9F9F9F" style={{ paddingLeft: 3, width: 22 }} />;
    const iconTop = <Icon name="md-trending-up" size={21} color="#9F9F9F" style={{ width: 22 }} />;
    const iconUp = <Icon name="md-recording" size={21} color="#9F9F9F" style={{ width: 22 }} />;

    return (
      <View style={{ flex: 1 }}>
        <TopNav screenTitle={'Home'} />
        {
          this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
            <ScrollView
              style={styles.container}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this._onRefresh}
                  colors={[colors.primary]}
                  tintColor="white"
                  title="loading..."
                  titleColor="white"
                  progressBackgroundColor="white"
                />
              }>
              <Swiper
                autoplay
                autoplayTimeout={4}
                showsPagination={false}
                height={248}
              >
                { //console.log("Recommended Offs: ", recommendedOffs)
                  recommendedOffs.map(info => (
                    <CardOne key={info._id} info={info} viewProduct={this._viewProduct} />
                  ))}
              </Swiper>
              <View>
                <View style={styles.listHeading}>
                  <Text style={styles.listHeadingLeft}>Popular</Text>
                  <TouchableOpacity>
                    <Text
                      style={styles.listHeadingRight}
                      onPress={this._viewOffsList.bind(this, 'popular', 'Popular')}>
                      See all
							      </Text>
                  </TouchableOpacity>
                </View>
                <ScrollView style={{ backgroundColor: colors.gray, padding: 5 }} horizontal showsHorizontalScrollIndicator={false}>
                  {popularOffs.map(info => (
                    <Card key={info._id} off={info} viewProduct={this._viewProduct} />
                  ))}
                </ScrollView>

                <View style={styles.listHeading}>
                  <Text style={styles.listHeadingLeft}>Categories</Text>
                  <TouchableOpacity>
                    <Text
                      style={styles.listHeadingRight}
                      onPress={this._viewOffsList.bind(this, 'categories', 'Categories')}>
                      See all
							      </Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  //horizontal={true}
                  key={2}
                  style={styles.flatListCats}
                  data={this.props.categories}
                  //contentContainerStyle={styles.flatListBRecContainer}
                  renderItem={({ item }) => {

                    return (
                      //<TouchableOpacity onPress={() => this._viewOffsList(item.name, item.name)}>
                      <CardTwo info={item} viewOffsList={this._viewOffsList}></CardTwo>
                      //</TouchableOpacity>
                    )
                  }}
                  numColumns={2}
                  keyExtractor={(item, index) => index.toString()}
                //onEndReached={this.handelMore}
                //onEndReachedThreshold={1}
                //ListFooterComponent={this.renderFooterIndicator}
                //refreshing={this.state.refreshing}
                //onRefresh={this.handleRefresh}
                />
                {/*
                  <View style={styles.browseList}>
                    <TouchableOpacity activeOpacity={0.7}>
                      <View style={styles.browseListItem}>
                        {iconPlay}
                        <Text
                          style={styles.browseListItemText}
                          onPress={this._viewOffsList.bind(this, 'now_playing', 'Now Playing')}>
                          Now Playing
								      </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7}>
                      <View style={styles.browseListItem}>
                        {iconTop}
                        <Text style={styles.browseListItemText} onPress={this._viewOffsList.bind(this, 'top_rated', 'Top Rated')}>
                          Top Rated
								      </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7}>
                      <View style={styles.browseListItem}>
                        {iconUp}
                        <Text
                          style={styles.browseListItemText}
                          onPress={this._viewOffsList.bind(this, 'upcoming', 'Upcoming')}>
                          Upcoming
								      </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  */
                }
              </View>
            </ScrollView>

        }
        {
          //this.state.setMessagebar ? <MessageBar /> : null
        }
        <MessageBar ref={this.MessageBar} />
      </View>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    recommendedOffs: state.appReducer.recommendedOffs,
    popularOffs: state.appReducer.popularOffs,
    token: state.authReducer.token,
    wishlistCounter: state.appReducer.wishlistCounter,
    categories: state.appReducer.categories,
    notifs: state.appReducer.notifs,
    notifsCounter: state.appReducer.notifsCounter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(offsActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);

/*
const styles = StyleSheet.create({
      container: {
      flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})*/
