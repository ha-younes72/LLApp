import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Image,
  ScrollView
} from 'react-native';
//import Icon from 'react-native-vector-icons/Ionicons';
import IconWithBadge from '../_global/Icons'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import styles from './styles/Drawer';
import { Navigation } from "react-native-navigation";
const drawerCover = require("../../../assets/images/corporate-leaflet.jpg");
const drawerImage = require("../../../assets/images/Petanux_logo.png");
import { iconsMap } from '../../utils/AppIcons';
import { colors } from '../_global/theme';

datas = [{
  name: "My Profile",
  route: "ProfileStack",
  icon: "ios-contact",
  index: 3,
  badgeCount: 0
}, {
  name: "Wishlist",
  route: "WishListStack",
  icon: "ios-cart",
  index: 2,
  badgeCount: 0
}, {
  name: "Notifications",
  route: "Notifications",
  icon: "ios-notifications",
  badgeCount: 1
}, {
  name: "Sign Out",
  route: "Logout",
  icon: "ios-log-out",
  badgeCount: 0
}]

class Drawer extends Component {
  constructor(props) {
    super(props);

    //this._goToProducts = this._goToProducts.bind(this);
    //this._openSearch = this._openSearch.bind(this);
  }

  _openSearch() {
    this._toggleDrawer();
    /*Navigation.showModal({
        stack: {
            children: [{
                component: {
                    name: 'leaflet.Search',
                    options: {
                        topBar: {
                            title: {
                                text: 'Search'
                            }
                        }
                    }
                }
            }]
        }
    });*/
    /*
    this.props.navigator.showModal({
        screen: 'leaflet.Search',
        title: 'Search'
    });*/
  }

  _goToProducts() {
    this._toggleDrawer();
    /*
    this.props.navigator.popToRoot({
        screen: 'leaflet.Products'
    });*/
  }

  _toggleDrawer() {
    /*
    this.props.navigator.toggleDrawer({
        to: 'closed',
        side: 'left',
        animated: true
    });
    */
  }
  render() {
    return (
      <LinearGradient colors={['rgba(0, 191, 255, 0.5)', 'rgba(0, 191, 255, 0.7)', 'rgba(0, 191, 255, 1)']} style={styles.linearGradient}>
        <ScrollView >
          <View style={styles.container}>
            <View style={styles.header}>
              <Image source={drawerCover} style={styles.drawerCover} />

              <Image square style={styles.drawerImage} source={drawerImage} />

            </View>

            {
              datas.map((data, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.menuItem}
                    onPress={() => {
                      data.name === 'Notifications' ?
                        Navigation.showModal({
                          stack: {
                            id: 'NotificationsStack',
                            children: [{
                              component: {
                                name: 'leaflet.Notifications',
                                passProps: {
                                  
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
                        :
                        Navigation.mergeOptions('AppBottomTabs', {
                          bottomTabs: {
                            currentTabIndex: data.index
                          }
                        })
                      Navigation.mergeOptions('LeftDrawer', {
                        sideMenu: {
                          left: {
                            visible: false
                          }
                        }
                      })
                    }}
                  >
                    <View style={styles.menuItemInner}>
                      <IconWithBadge
                        name={data.icon}
                        badgeCount={
                          data.name === 'Wishlist' ?
                            this.props.counter
                            : data.name === 'Notifications' ?
                              this.props.notifsCounter :
                              data.badgeCount
                        }
                        color={'white'}
                        size={27}
                      />
                      <Text style={styles.menuItemText}> {data.name} </Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            }

          </View>
        </ScrollView>
      </LinearGradient>
    );
  }

  /*
  render() {
      const iconSearch = (<Icon name="md-search" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
      const iconMovies = (<Icon name="md-film" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 3 }]} />);
      const iconTV = (<Icon name="ios-desktop" size={26} color="#9F9F9F" style={styles.drawerListIcon} />);
      return (
          //<LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0,0,0, 0.9)', 'rgba(0,0,0, 1)']} style={styles.linearGradient}>
          <View style={styles.container}>
              <View style={styles.drawerList}>
                  <TouchableOpacity onPress={this._openSearch}>
                      <View style={styles.drawerListItem}>
                          {iconSearch}
                          <Text style={styles.drawerListItemText}>
                              Search
              </Text>
                      </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this._goToMovies}>
                      <View style={styles.drawerListItem}>
                          {iconMovies}
                          <Text style={styles.drawerListItemText}>
                              Movies
              </Text>
                      </View>
                  </TouchableOpacity>
                  <View style={styles.drawerListItem}>
                      {iconTV}
                      <Text style={styles.drawerListItemText} onPress={() => ToastAndroid.show('Coming Soon!', ToastAndroid.SHORT)}>
                          TV Shows
            </Text>
                  </View>
              </View>
              <Text style={styles._version}>
              </Text>
          </View>
          //</LinearGradient>
      );
  }*/
}

function mapStateToProps(state, ownProps) {
  return {
    counter: state.appReducer.wishlistCounter,
    notifsCounter: state.appReducer.notifsCounter
    //user: state.user,
    //token: state.token,
    //error: state.authReducer.error
  };
}

export default connect(mapStateToProps)(Drawer);
