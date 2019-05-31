//import _ from 'lodash';
import React, { Component } from 'react';

import {
  View,
  Text,
  ScrollView,
  FlatList,
  RefreshControl,
  TextInput,
  ListView
} from 'react-native'
import axios from 'axios'
import CardThree from './components/CardThree';
import { Navigation } from 'react-native-navigation'
import { colors } from "../_global/theme";
import { iconsMap } from '../../utils/AppIcons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as offsActions from './actions';
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/Search.style'
import { API_URL } from '../../constants/api';
import TopNav from './components/TopNav';
import { MessageBar } from 'react-native-messages';

//import {Constants, Colors, Typography, View, ActionBar, PageControl, Carousel} from 'react-native-ui-lib'; //eslint-disable-line
//import cameraSelected from '../../assets/icons/cameraSelected.png';
//import video from '../../assets/icons/video.png';
//import tags from '../../assets/icons/tags.png';
//import collections from '../../assets/icons/collections.png';
//import richText from '../../assets/icons/richText.png';


class Search extends Component {
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
      currentPage: 1,
      searchResults: {
        results: []
      },
      query: null
    };

    //this._viewMovie = this._viewMovie.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this._handleTextInput = this._handleTextInput.bind(this);
    Navigation.events().bindComponent(this);

    this.MessageBar = React.createRef();
  }

  async componentDidAppear() {
    this.MessageBar.current.register();
    this.setState({
      setMessagebar: true
    }, () => {
      console.log('search appear')
    })
  }

  async componentDidDisappear() {
    //this.MessageBar.current.unregister();
    this.setState({
      setMessagebar: false
    }, () => {
      console.log('search disappear')
    })
  }

  _handleTextInput(event) {
    const query = event.nativeEvent.text;
    this.setState({ query });
    if (!query) this.setState({ query: '' });

    setTimeout(() => {
      if (query.length) {
        this.props.actions.retrieveSearchResults(this.props.token, this.state.query, 1)
        //.then(() => {
        const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
        const dataSource = ds.cloneWithRows(this.props.searchResults);
        this.setState({
          dataSource,
          isLoading: false
        });
        //});
      }
    }, 1000);
  }

  _retrieveNextPage() {
    if (this.state.currentPage !== 10) {
      this.setState({
        currentPage: this.state.currentPage + 1
      });

      let page;
      if (this.state.currentPage === 1) {
        page = 2;
        this.setState({ currentPage: 2 });
      } else {
        page = this.state.currentPage + 1;
      }

      var config = {
        headers: { 'Authorization': "bearer " + this.props.token }
      };

      var bodyParameters = {
        lat: 11,
        long: 25
      };
      axios.post(API_URL + 'offs/recoms/10?page=' + page, bodyParameters, config)
        .then(res => {
          console.log("ghhhhhhhhhh", res.data.offs)
          //dispatch(retrieveSearchResultsSuccess(res.data));
          //goHome();
          const data = this.state.searchResults.results;
          const newData = res.data.offs;

          newData.map((item, index) => data.push(item));

          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data)
          });
        })
        .catch(error => {
          console.log(error.response); //eslint-disable-line
        });
      /*axios.get(`${TMDB_URL}/search/movie/?api_key=${TMDB_API_KEY}&query=${this.state.query}&page=${page}`)
        .then(res => {
          const data = this.state.searchResults.results;
          const newData = res.data.results;

          newData.map((item, index) => data.push(item));

          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.searchResults.results)
          });
        }).catch(err => {
          console.log('next page', err); // eslint-disable-line
        });*/
    }
  }

  _renderListView() {
    let listView;
    if (this.state.query) {
      listView = (
        <ListView
          enableEmptySections
          onEndReached={type => this._retrieveNextPage()}
          onEndReachedThreshold={1200}
          dataSource={this.state.dataSource}
          renderRow={rowData => <CardThree info={rowData} viewProduct={this._viewProduct} />}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.seperator} />}
        />
      );
    } else {
      listView = <View />;
    }

    return listView;
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

  render() {
    //const { type, categoryOffs, popularOffs } = this.props;
    return (
      <View style={styles.container}>
        <TopNav screenTitle={'Search'} />
        <View style={styles.searchbox}>
          <View style={styles.searchboxBorder}>
            <TextInput
              style={styles.textInput}
              //autoFocus
              returnKeyType={'search'}
              value={this.state.query}
              onChange={this._handleTextInput}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>
        {!this.state.isLoading && this._renderListView()}
        {
          //this.state.setMessagebar ? <MessageBar /> : null
        }
        <MessageBar ref={this.MessageBar} />
      </View>
      /*this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
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
        </ScrollView>
        */
    );
  }
}



function mapStateToProps(state, ownProps) {
  return {
    //appstate: state.appReducer,
    //recommendedOffs: state.appReducer.recommendedOffs,
    //categoryOffs: state.appReducer.categoryOffs,
    //popularOffs: state.appReducer.popularOffs,
    searchResults: state.appReducer.searchResults,
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


export default connect(mapStateToProps, mapDispatchToProps)(Search);
