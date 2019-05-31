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
import styles from './styles/ProductsList.style'
import { MessageBar } from 'react-native-messages';

//import {Constants, Colors, Typography, View, ActionBar, PageControl, Carousel} from 'react-native-ui-lib'; //eslint-disable-line
//import cameraSelected from '../../assets/icons/cameraSelected.png';
//import video from '../../assets/icons/video.png';
//import tags from '../../assets/icons/tags.png';
//import collections from '../../assets/icons/collections.png';
//import richText from '../../assets/icons/richText.png';


class ProductsList extends Component {

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

  componentDidMount() {
    this.MessageBar.current.register();
    if (this.props.type === 'popular') {
      console.log('I am Popular')
      this.setState({ isLoading: false });
    } else {
      console.log('I am Not Popular')
      this._retrieveOffs()
    }
    //this._retrieveOffsbyCategory();
    //this._retrieveCats();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categoryOffs) {
      this.setState({ isLoading: false });
    }
  }

  async componentDidAppear() {
    this.MessageBar.current.register();
    this.setState({
      setMessagebar: true
    }, () => {
      console.log('home appear')
    })
  }
  _retrieveOffs(isRefreshed) {
    this.props.actions.retrieveCategoryOffs(this.props.token, this.props.type, 1);
    //this.props.actions.retrievePopularOffs(this.props.token, 1);
    if (isRefreshed && this.setState({ isRefreshing: false }));
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

  }

  _onRefresh() {
    this.setState({ isRefreshing: true });
    this._retrieveOffs('isRefreshed');
  }

  navigationButtonPressed({ buttonId }) {
    //if (buttonId === 'close') {
    console.log('I have to close product list')
    Navigation.dismissModal(this.props.componentId)
    //Navigation.popTo('LeftDrawer')
    //}
  }

  render() {
    const { type, categoryOffs, popularOffs } = this.props;
    return (
      this.state.isLoading ?
        <View style={styles.progressBar}>
          <ProgressBar />
          <MessageBar ref={this.MessageBar} />
        </View>
        :
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
          <FlatList
            //horizontal={true}
            key={2}
            style={styles.flatList}
            data={type === 'popular' ? popularOffs : categoryOffs}
            //contentContainerStyle={styles.flatListBRecContainer}
            renderItem={({ item }) => {

              return (
                //<TouchableOpacity onPress={() => this._viewOffsList(item.name, item.name)}>
                <CardThree info={item} viewProduct={this._viewProduct}></CardThree>
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
          <MessageBar ref={this.MessageBar} />
        </ScrollView>

    );
  }
}



function mapStateToProps(state, ownProps) {
  return {
    //appstate: state.appReducer,
    //recommendedOffs: state.appReducer.recommendedOffs,
    categoryOffs: state.appReducer.categoryOffs,
    popularOffs: state.appReducer.popularOffs,
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


export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
