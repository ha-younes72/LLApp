//import _ from 'lodash';
import React, { Component } from 'react';

import {
    View,
    Text,
    ScrollView,
    FlatList,
    RefreshControl
} from 'react-native'
import CardThree from './components/CardThree';
import { Navigation } from 'react-native-navigation'
import { colors } from "../_global/theme";
import { iconsMap } from '../../utils/AppIcons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as offsActions from './actions';
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/WishList.style'
import TopNav from './components/TopNav';
import { MessageBar } from "react-native-messages";

//import {Constants, Colors, Typography, View, ActionBar, PageControl, Carousel} from 'react-native-ui-lib'; //eslint-disable-line
//import cameraSelected from '../../assets/icons/cameraSelected.png';
//import video from '../../assets/icons/video.png';
//import tags from '../../assets/icons/tags.png';
//import collections from '../../assets/icons/collections.png';
//import richText from '../../assets/icons/richText.png';


class WishList extends Component {
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
            //isLoading: true,
            //isRefreshing: false
        };

        //this._viewMovie = this._viewMovie.bind(this);
        //this._onRefresh = this._onRefresh.bind(this);
        Navigation.events().bindComponent(this);

        this.MessageBar = React.createRef();
    }

    componentDidAppear() {
        this.MessageBar.current.register();
        this.setState({
            setMessagebar: true
        }, () => {
            console.log('wishlist appear')
        })
    }

    componentDidDisappear() {
        this.setState({
            setMessagebar: false
        }, () => {
            console.log('wishlist disappear')
        })
    }

    componentDidMount() {
        /*if (this.props.type === 'popular') {
          console.log('I am Popular')
          this.setState({ isLoading: false });
        } else {
          console.log('I am Not Popular')
          this._retrieveOffs()
        }*/
        //this._retrieveOffsbyCategory();
        //this._retrieveCats();
    }

    componentWillReceiveProps(nextProps) {
        /*if (nextProps.categoryOffs) {
          this.setState({ isLoading: false });
        }*/
    }

    /*
    _retrieveOffs(isRefreshed) {
      this.props.actions.retrieveCategoryOffs(this.props.token, this.props.type, 1);
      //this.props.actions.retrievePopularOffs(this.props.token, 1);
      if (isRefreshed && this.setState({ isRefreshing: false }));
    }
    */
    /*_removeFromWishlist(off) {
        this.props.actions.removeFromWishlist(off);
    }*/

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

    }

    /*
    _onRefresh() {
      this.setState({ isRefreshing: true });
      this._retrieveOffs('isRefreshed');
    }
    */

    /*navigationButtonPressed({ buttonId }) {
      //if (buttonId === 'close') {
      console.log('I have to close product list')
      Navigation.dismissModal(this.props.componentId)
      //Navigation.popTo('LeftDrawer')
      //}
    }
    */

    render() {
        const { wishlist } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <TopNav screenTitle={'Wishlist'} />
                <ScrollView
                    style={styles.container}
                    /*refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            colors={[colors.primary]}
                            tintColor="white"
                            title="loading..."
                            titleColor="white"
                            progressBackgroundColor="white"
                        />
                    }*/>
                    <FlatList
                        //horizontal={true}
                        key={2}
                        style={styles.flatList}
                        data={wishlist}
                        //contentContainerStyle={styles.flatListBRecContainer}
                        renderItem={({ item, index }) => {
                            //console.log('Wishlist:')
                            return (
                                //<TouchableOpacity onPress={() => this._viewOffsList(item.name, item.name)}>
                                <CardThree
                                    info={item.off}
                                    viewProduct={this._viewProduct}
                                    closebtn={true}
                                    index={index}
                                    prf={item.prf}>
                                </CardThree>
                                //</TouchableOpacity>
                            )
                        }}
                        //numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                    //onEndReached={this.handelMore}
                    //onEndReachedThreshold={1}
                    //ListFooterComponent={this.renderFooterIndicator}
                    //refreshing={this.state.refreshing}
                    //onRefresh={this.handleRefresh}
                    />
                </ScrollView>
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
        //appstate: state.appReducer,
        //recommendedOffs: state.appReducer.recommendedOffs,
        wishlist: state.appReducer.wishlist,
        //popularOffs: state.appReducer.popularOffs,
        token: state.authReducer.token,
        //wishlistCounter: state.appReducer.wishlistCounter,
        //categories: state.appReducer.categories,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(offsActions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(WishList);
