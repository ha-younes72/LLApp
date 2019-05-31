//import _ from 'lodash';
import React, { Component } from 'react';

import {
	View,
	Text,
	ScrollView,
	FlatList,
	RefreshControl,
	Image,
	TouchableOpacity,
	TextInput
} from 'react-native'
import CardThree from './components/CardThree';
import { Navigation } from 'react-native-navigation'
import { colors } from "../_global/theme";
import { iconsMap } from '../../utils/AppIcons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CardTwo from './components/CardTwo';

import * as usrActions from '../authentication/actions';
import ProgressBar from '../_global/ProgressBar';
import styles from './styles/Profile.style'
import TopNav from './components/TopNav';
import { MessageBar } from "react-native-messages";
import { RadioGroup } from "react-native-btr";
//import console = require('console');

class Profile extends Component {
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
			saveChanges: true
			//isLoading: true,
			//isRefreshing: false
		};

		Navigation.events().bindComponent(this);

		this.MessageBar = React.createRef();
	}
	componentDidAppear() {
		this.MessageBar.current.register();
	}

	componentDidDisappear() {
	}

	componentDidMount() {

	}

	componentWillReceiveProps(nextProps) {

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

	render() {
		const { userInfo } = this.props;
		const name = userInfo.fname.toUpperCase() + ' ' + userInfo.lname.toUpperCase()
		return (
			<View style={{ flex: 1 }}>
				<TopNav screenTitle={'Profile'} />
				<ScrollView
					style={styles.container}
					showsVerticalScrollIndicator={false}
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
					<View style={styles.container}>
						<View style={styles.header}></View>
						<Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
						<View style={styles.body}>
							<View style={styles.infoContent}>
								<Text style={styles.name}>{name}</Text>
								<Text style={styles.job}>UX Designer / Mobile developer</Text>
								<Text style={styles.description}>
									Welcome {name}
								</Text>
								<Text style={styles.description}>
									Mail: {userInfo.email}
								</Text>

								<TouchableOpacity style={styles.buttonContainer}>
									<Text style={styles.buttontext}>Edit Info</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.prfContent}>
								<Text style={{ fontSize: 18 }} > Preferences: </Text>
								<View style={styles.seperator} />
								<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
									<Text style={{ padding: 5 }}>Get Realtime Notification:</Text>
									<RadioGroup
										color={colors.primary}
										style={{ flexDirection: 'row', padding: 5 }}
										labelStyle={{ fontSize: 14 }}
										radioButtons={
											[
												{
													label: 'Yes',
													value: 'RealTimeNotifYes',
													checked: true,
													color: colors.primary,
													flexDirection: 'row',
													size: 10
												},
												{
													label: 'No',
													value: 'RealTimeNotifNo',
													checked: false,
													color: colors.primary,
													flexDirection: 'row',
													size: 10
												}
											]
										}
										onPress={
											radioButtons => {
												this.setState({
													saveChanges: false
												}, () => {
													console.log(radioButtons)
												})
											}
										}
									/>
								</View>

								<View
									style={{
										flex: 1,
										alignItems: 'flex-start',
										justifyContent: 'space-between',
										borderTopWidth: 2,
										borderTopColor: 'white',
										marginTop: 7
									}}>
									<Text style={{ padding: 5, fontSize: 16 }}> Favorite Categories: </Text>
									{
										this.props.categories.length>0 ?
											<FlatList
												horizontal={true}
												showsHorizontalScrollIndicator={false}
												key={0}
												style={[styles.flatListCats,{marginBottom:5}]}
												data={this.props.categories}
												//contentContainerStyle={styles.flatListBRecContainer}
												renderItem={({ item }) => {

													return (
														<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
															<CardTwo info={item} viewOffsList={this._viewOffsList}></CardTwo>
															<TouchableOpacity
																style={{
																	//position: 'relative',
																	//left: 0,
																	//bottom: 0,
																	backgroundColor: 'white',
																	flex: 1,
																	justifyContent: 'center',
																	alignItems: 'center',
																	borderColor: colors.primary,
																	borderWidth: 1.5,
																	borderRadius: 50,
																	width: '70%'
																	//height: 20,
																	//width: 20
																}}
																onPress={() => {
																	this.setState({
																		//categories: null,
																		saveChanges: false
																	}, this.props.actions.removeFromFavCats)
																}}
															>
																<View style={{
																	padding: 5
																}}>
																	<Text style={{
																		color: colors.primary
																	}}>
																		Remove
                                  </Text>
																</View>
															</TouchableOpacity>
														</View>
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
											:
											<Text style={{ paddingVertical: 5, paddingHorizontal: 15, fontSize: 12, alignSelf: "center", color: colors.primary }}>
												You've not selected any categories, you can do it by searching categories
                      </Text>
									}
									<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
										<Text style={{ padding: 5 }}> Search in Categories: </Text>
										<View style={styles.searchbox}>
											<View style={styles.searchboxBorder}>
												<TextInput
													style={styles.textInput}
													//autoFocus
													returnKeyType={'search'}
													//value={this.state.query}
													//onChange={this._handleTextInput}
													underlineColorAndroid="transparent"
												/>
											</View>
										</View>
									</View>
									<FlatList
										horizontal={true}
										showsHorizontalScrollIndicator={false}
										key={2}
										style={styles.flatListCats}
										data={this.props.scategories}
										//contentContainerStyle={styles.flatListBRecContainer}
										renderItem={({ item }) => {

											return (
												//<TouchableOpacity onPress={() => this._viewOffsList(item.name, item.name)}>
												<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
													<CardTwo info={item} viewOffsList={this._viewOffsList}></CardTwo>
													<TouchableOpacity
														style={{
															//position: 'relative',
															//left: 0,
															//bottom: 0,
															backgroundColor: 'white',
															flex: 1,
															justifyContent: 'center',
															alignItems: 'center',
															borderColor: colors.primary,
															borderWidth: 1.5,
															borderRadius: 50,
															width: '70%'
															//height: 20,
															//width: 20
														}}
														onPress={() => {
															this.props.actions.addToFavCats(item)
															this.setState({
																//categories: item,
																saveChanges: false
															}, () => console.log(item))
														}}
													>
														<View style={{
															padding: 5
														}}>
															<Text style={{
																color: colors.primary
															}}>
																Select
                              </Text>
														</View>
													</TouchableOpacity>
												</View>

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
								</View>

								<View
									style={{
										flex: 1,
										alignItems: 'flex-start',
										justifyContent: 'space-between',
										borderTopWidth: 2,
										borderTopColor: 'white',
										marginTop: 7
									}}>
									<Text style={{ padding: 5 }}> My Stores: </Text>
									<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
										<Text style={{ padding: 5 }}> Search in Stores: </Text>
										<View style={styles.searchbox}>
											<View style={styles.searchboxBorder}>
												<TextInput
													style={styles.textInput}
													//autoFocus
													returnKeyType={'search'}
													//value={this.state.query}
													//onChange={this._handleTextInput}
													underlineColorAndroid="transparent"
												/>
											</View>
										</View>
									</View>
								</View>

								<View
									style={{
										flex: 1,
										alignItems: 'flex-start',
										justifyContent: 'space-between',
										borderTopWidth: 2,
										borderTopColor: 'white',
										marginTop: 7
									}}>
									<Text style={{ padding: 5 }}> My Casual WishList: </Text>
									<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
										<Text style={{ padding: 5 }}> Search in Products: </Text>
										<View style={styles.searchbox}>
											<View style={styles.searchboxBorder}>
												<TextInput
													style={styles.textInput}
													//autoFocus
													returnKeyType={'search'}
													//value={this.state.query}
													//onChange={this._handleTextInput}
													underlineColorAndroid="transparent"
												/>
											</View>
										</View>
									</View>
								</View>

								<TouchableOpacity
									style={
										this.state.saveChanges ?
											styles.buttonContainerDisabled :
											styles.buttonContainer
									}
									disabled={this.state.saveChanges}
									onPress={
										() => {
											this.setState({
												saveChanges: true
											})
										}
									}
								>
									<Text style={styles.buttontext}>Save Changes</Text>
								</TouchableOpacity>
							</View>

						</View>
					</View>
				</ScrollView>
				<MessageBar ref={this.MessageBar} />
			</View>

		);
	}
}



function mapStateToProps(state, ownProps) {
	return {
		//appstate: state.appReducer,
		//recommendedOffs: state.appReducer.recommendedOffs,
		//wishlist: state.appReducer.wishlist,
		//popularOffs: state.appReducer.popularOffs,
		token: state.authReducer.token,
		userInfo: state.authReducer.user,
		categories: state.authReducer.favCats,
		//wishlistCounter: state.appReducer.wishlistCounter,
		scategories: state.appReducer.categories,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(usrActions, dispatch)
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
