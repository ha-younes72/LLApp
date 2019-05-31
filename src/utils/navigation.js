import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from "../modules/_global/theme";
import { iconsMap, iconsLoaded } from './AppIcons'


defaultOptions = {
  bottomTabs: {
    backgroundColor: colors.primaryLight
  },
  bottomTab: {
    iconColor: colors.primary,
    selectedIconColor: 'white',
    textColor: colors.primary,
    selectedTextColor: 'white'
  },
  animations: {
    setRoot: {
      enabled: 'true',// | 'false', // Optional, used to enable/disable the animation
      alpha: {
        from: 0,
        to: 1,
        duration: 1000,
        startDelay: 0,
        interpolation: 'accelerate'
      }
    },
    push: {
      enabled: 'true',
      alpha: {
        from: 0,
        to: 1,
        duration: 2000,
        startDelay: 0,
        interpolation: 'accelerate'
      }
    }
  },
  /*
  topBar: {
    leftButtons: [
      {
        id: 'openDrawer',
        icon: require('./signin.png')
      }
    ],
    rightButtons: [
      {
        id: 'openCamera',
        icon: require('./signin.png')
      }
    ]
  },*/
  topBar: {
    /*leftButtons: [
      {
        id: 'openDrawer',
        icon: iconsMap['ios-menu']//require('./signin.png')
      }
    ],
    rightButtons: [
      {
        id: 'openCamera',
        icon: iconsMap['ios-barcode']//require('./signin.png')
      }
    ],*/
    visible: false,
    animate: false, // Controls whether TopBar visibility changes should be animated
    hideOnScroll: false,
    buttonColor: colors.primary,
    drawBehind: true,
    testID: 'topBar',
    title: {
      text: 'Title',
      fontSize: 18,
      color: colors.primary,
      alignment: 'center'
      /*fontFamily: 'Helvetica',
      component: {
        name: 'example.CustomTopBarTitle',
        alignment: 'center'
      }
      */
    },
    /*
    subtitle: {
      text: 'Title',
      fontSize: 14,
      color: 'red',
      fontFamily: 'Helvetica',
      alignment: 'center'
    },
    */
    backButton: {
      //icon: require('./signin.png'),
      //visible: true
    },
    background: {
      color: colors.gray,//'#00ff00',
      /*component: {
        name: 'example.CustomTopBarBackground'
      }
      */
    },

  }
}
Navigation.setDefaultOptions(defaultOptions);

export const goToAuth = () => Navigation.setRoot({
  root: {
    bottomTabs: {
      id: 'AuthBottomTabs',
      children: [
        {
          component: {
            id: 'AuthBottomTabSignIn',
            name: 'leaflet.SignIn',
            options: {
              bottomTab: {
                fontSize: 12,
                text: 'Sign In',
                icon: iconsMap['ios-log-in']//require('./signin.png')
              }
            }
          },
        },
        {
          component: {
            id: 'AuthBottomTabSignUp',
            name: 'leaflet.SignUp',
            options: {
              bottomTab: {
                text: 'Sign Up',
                fontSize: 12,
                icon: iconsMap['ios-person-add']//require('./signup.png')
              }
            }
          },
        },
      ],
    }
  }
});

export const goHome2 = () => Navigation.setRoot({
  root: {
    bottomTabs: {
      id: 'App',
      children: [
        {
          component: {
            name: 'leaflet.Home',
            options: {
              bottomTab: {
                text: 'Home',
                fontSize: 12,
                icon: iconsMap['ios-home']//require('./signup.png')
              }
            }
          }
        }
      ],
    }
  }
})


export const goHome = () => Navigation.setRoot({
  root: {
    sideMenu: {
      left: {
        component: {
          id: 'LeftDrawer',
          name: 'leaflet.Drawer',
          passProps: {
            text: 'This is a left side menu screen'
          }
        }
      },
      center: {
        stack: {
          id: 'AppStack',
          children: [{
            bottomTabs: {
              id: 'AppBottomTabs',
              children: [
                {
                  stack: {
                    id: 'HomeStack',
                    children: [
                      {
                        component: {
                          id: 'AppBottonTabHome',
                          name: 'leaflet.Home',
                          options: {
                            bottomTab: {
                              text: 'Home',
                              fontSize: 12,
                              icon: iconsMap['ios-home'],//require('../utils/signup.png')
                              iconColor: colors.primary,
                              selectedIconColor: 'white',
                              textColor: colors.primary,
                              selectedTextColor: 'white'
                            }
                          }
                        }
                      }
                    ],
                    options: defaultOptions
                  }
                },
                {
                  stack: {
                    id: 'SearchStack',
                    children: [
                      {
                        component: {
                          id: 'AppBottonTabSearch',
                          name: 'leaflet.Search',
                          options: {
                            bottomTab: {
                              text: 'Search',
                              fontSize: 12,
                              icon: iconsMap['ios-search']//require('../utils/signup.png')
                            }
                          }
                        }
                      }
                    ],
                    options: defaultOptions
                  }
                  /*component: {
                    name: 'leaflet.Search',
                    options: {
                      bottomTab: {
                        text: 'Search',
                        fontSize: 12,
                        icon: iconsMap['ios-search']// require('../utils/signup.png')
                      }
                    }
                  }*/
                },
                {
                  stack: {
                    id: 'WishListStack',
                    children: [
                      {
                        component: {
                          id: 'AppBottonTabWishList',
                          name: 'leaflet.WishList',
                          options: {
                            bottomTab: {
                              text: 'Wishlist',
                              fontSize: 12,
                              icon: iconsMap['ios-cart']//require('../utils/signup.png')
                            }
                          }
                        }
                      }
                    ],
                    options: defaultOptions
                  }/*
                  component: {
                    name: 'leaflet.ProductsList',
                    options: {
                      bottomTab: {
                        text: 'Wishlist',
                        fontSize: 12,
                        icon: iconsMap['ios-cart']//require('../utils/signup.png')
                      }
                    }
                  }*/
                },
                {
                  stack: {
                    id: 'ProfileStack',
                    children: [
                      {
                        component: {
                          id: 'AppBottonTabProfile',
                          name: 'leaflet.Profile',
                          options: {
                            bottomTab: {
                              text: 'Profile',
                              fontSize: 12,
                              icon: iconsMap['ios-person']//require('../utils/signup.png')
                            }
                          }
                        }
                      }
                    ],
                    options: defaultOptions
                  }
                  /*component: {
                    name: 'leaflet.Home',
                    options: {
                      bottomTab: {
                        text: 'Profile',
                        fontSize: 12,
                        icon: iconsMap['ios-person']//require('../utils/signup.png')
                      }
                    }
                  }*/
                }
              ]
            }
          }],
          options: defaultOptions
        }
      },
      /*right: {
        component: {
          id: 'RightDrawer',
          name: 'leaflet.Camera',
          passProps: {
            text: 'This is a right side menu screen'
          }
        },
        width: 100,
        height: 100,
        //width: 30,
      }*/
    }
  }
});