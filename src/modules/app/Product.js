import React, { Component, PropTypes } from 'react';
import {
	Image,
	Linking,
	RefreshControl,
	ScrollView,
	Text,
	ToastAndroid,
	View
} from 'react-native';
import { TabBar } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollableTabView } from '@valdio/react-native-scrollable-tabview';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as offsActions from './actions';
import Casts from './tabs/Casts';
import DefaultTabBar from '../_global/scrollableTabView/DefaultTabBar';
import Info from './tabs/Info';
import ProgressBar from '../_global/ProgressBar';
import Trailers from './tabs/Trailers';
import styles from './styles/Product.style';
import { API_URL } from '../../constants/api';
import { Navigation } from 'react-native-navigation';
import { colors } from '../_global/theme';
import { iconsMap } from '../../utils/AppIcons';
import { MessageBar } from "react-native-messages";

class Product extends Component {
	static get options() {
		return {
			topBar: {
				visible: true,
				title: {
					text: 'Product Info',
					color: colors.primary,
					backgroundColor: colors.primary
				},
				color: colors.primary

				/*leftButtons: [
					{
					id: 'buttonOne',
					icon: require('../../utils/signup.png')
					}
				],
				rightButtons: [],*/
			},
		};
	}
	constructor(props) {
		super(props);

		this.state = {
			castsTabHeight: null,
			heightAnim: null,
			infoTabHeight: null,
			isLoading: true,
			isRefreshing: false,
			showSimilarProducts: true,
			trailersTabHeight: null,
			tab: 0,
			youtubeVideos: []
		};

		this._getTabHeight = this._getTabHeight.bind(this);
		this._onChangeTab = this._onChangeTab.bind(this);
		this._onContentSizeChange = this._onContentSizeChange.bind(this);
		this._onRefresh = this._onRefresh.bind(this);
		this._onScroll = this._onScroll.bind(this);
		this._viewProduct = this._viewProduct.bind(this);
		//this._openYoutube = this._openYoutube.bind(this);
		Navigation.events().bindComponent(this);

		this.MessageBar = React.createRef();
	}

	componentWillMount() {
		this._retrieveDetails();
		//this.MessageBar.current.register();
	}

	componentDidMount() {
		this.MessageBar.current.register();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.similarProducts) this.setState({ isLoading: false });
	}

	_retrieveDetails(isRefreshed) {
		this.props.actions.retrieveProductDetails(this.props.token, this.props.off.product._id, this.props.off)
		//.then(() => {
		this._retrieveProductDetails();
		this._retrieveOtherStoreOffs();
		this._retrieveSimilarProducts();


		//});
		if (isRefreshed && this.setState({ isRefreshing: false }));
	}

	_retrieveSimilarProducts() {
		this.props.actions.retrieveSimilarProducts(this.props.token, this.props.off.category.split("/")[0]);
	}

	_retrieveOtherStoreOffs() {
		this.props.actions.retrieveOtherStoreOffs(this.props.token, this.props.off.product._id);
	}

	_onRefresh() {
		this.setState({ isRefreshing: true });
		this._retrieveDetails('isRefreshed');
	}

	_onScroll(event) {
		const contentOffsetY = event.nativeEvent.contentOffset.y.toFixed();
		if (contentOffsetY > 150) {
			Navigation.mergeOptions(this.props.componentId, {
				topBar: {
					visible: false,
					drawBehind: true,
					animate: true
				}
			})
			//this._toggleNavbar('hidden');
		} else {
			Navigation.mergeOptions(this.props.componentId, {
				topBar: {
					visible: true,
					drawBehind: false,
					animate: true
				}
			})
		}
	}

	/*_toggleNavbar(status) {
		this.props.navigator.toggleNavBar({
			to: status,
			animated: true
		});
	}*/

	_onChangeTab({ i, ref }) {
		this.setState({ tab: i });
	}

	// ScrollView onContentSizeChange prop
	_onContentSizeChange(width, height) {
		if (this.state.tab === 0 ) {
			this.setState({ infoTabHeight: height });
		}
	}

	_getTabHeight(tabName, height) {
		if (tabName === 'casts') this.setState({ castsTabHeight: height });
		if (tabName === 'trailers') this.setState({ trailersTabHeight: height });
	}

	_retrieveProductDetails() {
		/*this.props.details.videos.results.map(item => {
			const request = axios.get(`${YOUTUBE_URL}/?id=${item.key}&key=${YOUTUBE_API_KEY}&part=snippet`)
				.then(res => {
					const data = this.state.youtubeVideos;
					data.push(res.data.items[0]);
				})
				.catch(error => {
					console.log(error); //eslint-disable-line
				});
			return request;
		});
		*/
	}

	_viewProduct(off) {
		Navigation.push('ProductStack', {
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
								id: 'close1',
								icon: iconsMap['ios-close']
							}
						],
						backButton: {
							visible: false
						}
					}
				}
			},
		})
	}

	/*_openYoutube(youtubeUrl) {
		Linking.canOpenURL(youtubeUrl).then(supported => {
			if (supported) {
				Linking.openURL(youtubeUrl);
			} else {
				ToastAndroid.show(`RN Don't know how to handle this url ${youtubeUrl}`, ToastAndroid.SHORT);
			}
		});
	}*/

	/*_onNavigatorEvent(event) {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'close') {
				this.props.navigator.dismissModal();
			}
		}
	}*/
	navigationButtonPressed({ buttonId }) {
		if (buttonId === 'close') {
			console.log('I have to close product list')
			Navigation.dismissModal(this.props.componentId)
			//Navigation.popTo('LeftDrawer')
		} else {
			Navigation.pop('ProductStack')
		}
	}

	render() {
		const iconStar = <Icon name="md-star" size={16} color="#F5B642" />;
		const details = this.props.off;
		const info = this.props.off;

		let height;
		if (this.state.tab === 0) height = this.state.infoTabHeight;
		if (this.state.tab === 1) height = this.state.castsTabHeight;
		if (this.state.tab === 2) height = this.state.trailersTabHeight;

		return (
			this.state.isLoading ?
				<View style={styles.progressBar}>
					<ProgressBar />
					<MessageBar ref={this.MessageBar} />
				</View>
				:
				<ScrollView
					style={styles.container}
					//onScroll={this._onScroll.bind(this)}
					//scrollEventThrottle={100}
					onContentSizeChange={this._onContentSizeChange}
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
					<View style={{ height }}>
						<Swiper
							style={styles.swiper}
							//autoplay
							//autoplayTimeout={4}
							showsPagination={false}
							height={248}
							loop={false}
						//index={5}
						>
							{
								info.product.imgs.map((item, index) => (
									<View key={index}>
										<Image source={{ uri: `${API_URL}${(item)}` }} style={styles.imageBackdrop} />
										<LinearGradient colors={['rgba(0, 0, 0, 0.2)', 'rgba(0,0,0, 0.2)', 'rgba(0,0,0, 0.7)']} style={styles.linearGradient} />
									</View>
								))
							}
						</Swiper>
						<View style={styles.cardContainer}>
							<Image source={{ uri: `${API_URL}${info.product.imgs[0]}` }} style={styles.cardImage} />
							<View style={styles.cardDetails}>
								<Text numberOfLines={2} style={styles.cardTitle}>{info.product.name}</Text>
								<Text numberOfLines={3} style={styles.cardTagline}>{info.product.desc}</Text>
								<View style={styles.cardGenre}>
									<Text style={styles.cardGenreItem}>{info.category}</Text>
									{/*
										info.genres.map(item => (
											<Text key={item.id} style={styles.cardGenreItem}>{item.name}</Text>
										))
										*/
									}
								</View>
								<View style={styles.cardNumbers}>
									<View style={styles.cardStar}>
										{iconStar}
										<Text style={styles.cardStarRatings}>4.5</Text>
									</View>
									<Text style={styles.cardRunningHours} />
								</View>
							</View>
						</View>
						<View style={styles.contentContainer}>
							{/*
							<TabBar //selectedIndex={selectedIndex}
								onChangeIndex={index => this.setState({ selectedIndex: index })}>
								<TabBar.Item label='FEED' />
								<TabBar.Item label='SERVICES' />
								<TabBar.Item label='CHAT' />
								<TabBar.Item label='ABOUT' />
							</TabBar>
							
								this.state.selectedIndex === 1 ?
									<View style={{ width: 200, height: 60, backgroundColor: 'red' }}>
									</View>
									:
									<View style={{ width: 200, height: 60, backgroundColor: 'green' }}>
									</View>
						*/}
							{/*
							<ScrollableTabView>
								<Text tabLabel='Tab #1'>My</Text>
								<Text tabLabel='Tab #2'>favorite</Text>
								<Text tabLabel='Tab #3'>project</Text>
							</ScrollableTabView>
							*/}
							{
								<ScrollableTabView
									onChangeTab={this._onChangeTab}
									renderTabBar={() => (
										<DefaultTabBar
											textStyle={styles.textStyle}
											underlineStyle={styles.underlineStyle}
											style={styles.tabBar}
										/>
									)}>
									<Info
										tabLabel="INFO"
										info={info}
										similarProducts={this.props.similarProducts}
										otherProducts={this.props.otherProducts}
										viewProduct={this._viewProduct}
									/>
									<Casts
										tabLabel="TECHNICAL INFO"
										info={info}
										getTabHeight={this._getTabHeight}
									/>
									<Trailers
										tabLabel="COMMENTS"
										details={details}
										//youtubeVideos={this.state.youtubeVideos}
										//openYoutube={this._openYoutube}
										getTabHeight={this._getTabHeight}
									/>
									
								</ScrollableTabView>

							}

						</View>
					</View>
					<MessageBar ref={this.MessageBar} />
				</ScrollView>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		details: state.appReducer.details,
		similarProducts: state.appReducer.similarProducts,
		otherProducts: state.appReducer.otherProducts,
		token: state.authReducer.token
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(offsActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
