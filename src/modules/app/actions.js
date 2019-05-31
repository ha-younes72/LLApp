import axios from 'axios';
import * as types from '../../constants/actionTypes';
import { API_URL, API_KEY } from '../../constants/api';
import { goHome } from '../../utils/navigation'
import { ToastAndroid } from "react-native";
import { Navigation } from 'react-native-navigation';
// Signin User
export function retrieveRecommendedOffsSuccess(res) {
	return {
		type: types.RETRIEVE_RECOMMENDED_OFFS_SUCCESS,
		recommendedOffs: res.offs
	};
}

export function retrieveRecommendedOffs(token, page) {
	return function (dispatch) {
		console.log(API_URL + 'offs/recoms/10?page=' + page)
		var config = {
			headers: { 'Authorization': "bearer " + token }
		};

		var bodyParameters = {
			lat: 12,
			long: 13
		};
		axios.post(API_URL + 'offs/recoms/10?page=' + page, bodyParameters, config)
			.then(res => {
				dispatch(retrieveRecommendedOffsSuccess(res.data));
				//goHome();
			})
			.catch(error => {
				console.log(error.response); //eslint-disable-line
			});
	};
}

export function retrievePopularOffsSuccess(res) {
	return {
		type: types.RETRIEVE_POPULAR_OFFS_SUCCESS,
		popularOffs: res.offs
	};
}

export function retrievePopularOffs(token, page) {
	return function (dispatch) {
		console.log(API_URL + 'offs/recoms/10?page=' + page)
		var config = {
			headers: { 'Authorization': "bearer " + token }
		};

		var bodyParameters = {
			lat: 11,
			long: 25
		};
		axios.post(API_URL + 'offs/recoms/10?page=' + page, bodyParameters, config)
			.then(res => {
				dispatch(retrievePopularOffsSuccess(res.data));
				//goHome();
			})
			.catch(error => {
				console.log(error.response); //eslint-disable-line
			});
	};
}

export function addToWishlistSuccess(off, prf) {
	return {
		type: types.ADD_TO_WISHLIST,
		off: off,
		prf: prf
	}
}

export function addToWishlist(off, prf, counter) {
	return function (dispatch) {
		dispatch(addToWishlistSuccess(off, prf));
		ToastAndroid.showWithGravityAndOffset(
			'Succussfully Added',
			ToastAndroid.LONG,
			ToastAndroid.TOP,
			25,
			50,
		);

		Navigation.mergeOptions('AppBottonTabWishList', {
			bottomTab: {
				badge: counter + 1
			}
		})

	}
}

export function removeFromWishlistSuccess(index) {
	return {
		type: types.REMOVE_FROM_WISHLIST,
		index: index
	}
}

export function removeFromWishlist(index, counter) {
	return function (dispatch) {
		dispatch(removeFromWishlistSuccess(index));
		ToastAndroid.showWithGravityAndOffset(
			'Succussfully Removed',
			ToastAndroid.LONG,
			ToastAndroid.TOP,
			25,
			50,
		);

		Navigation.mergeOptions('AppBottonTabWishList', {
			bottomTab: {
				badge: counter - 1
			}
		})

	}
}

export function retrieveCategoriesSuccess(res) {
	return {
		type: types.RETRIEVE_CATEGORIES_SUCCESS,
		categories: res.categories
	};
}

export function retrieveCategories(token) {
	return function (dispatch) {
		console.log(API_URL + 'categories/')
		var config = {
			headers: { 'Authorization': "bearer " + token }
		};
		axios.get(API_URL + 'categories/', config)
			.then(res => {
				dispatch(retrieveCategoriesSuccess(res.data));
				//goHome();
			})
			.catch(error => {
				console.log(error.response); //eslint-disable-line
			});
	};
}


export function retrieveCategoryOffsSuccess(res) {
	return {
		type: types.RETRIEVE_CATEGORY_PRODUCTS_SUCCESS,
		categoryOffs: res.offs
	};
}

export function retrieveCategoryOffs(token, category, page) {
	return function (dispatch) {
		console.log(API_URL + 'offs/recomsbyCat/10?page=' + page)
		var config = {
			headers: { 'Authorization': "bearer " + token }
		};

		var bodyParameters = {
			lat: 11,
			long: 25,
			expr: category
		};
		axios.post(API_URL + 'offs/recomsbyCat/', bodyParameters, config)
			.then(res => {
				dispatch(retrieveCategoryOffsSuccess(res.data));
				//goHome();
			})
			.catch(error => {
				console.log(error.response); //eslint-disable-line
			});
	};
}

export function retrieveSearchResultsSuccess(res) {
	return {
		type: types.RETRIEVE_PRODUCTS_SEARCH_RESULT_SUCCESS,
		searchResults: res.offs
	};
}

export function retrieveSearchResults(token, query ,page) {
	return function (dispatch) {
		console.log(API_URL + 'offs/recoms/10?page=' + page)
		var config = {
			headers: { 'Authorization': "bearer " + token }
		};

		var bodyParameters = {
			lat: 11,
			long: 25
		};
		axios.post(API_URL + 'offs/recoms/10?page=' + page, bodyParameters, config)
			.then(res => {
				dispatch(retrieveSearchResultsSuccess(res.data));
				//goHome();
			})
			.catch(error => {
				console.log(error.response); //eslint-disable-line
			});
	};
}


export function retrieveSimilarProductsSuccess(res) {
	return {
		type : types.RETRIEVE_SIMILAR_PRODUCTS_SUCCESS,
		similarProducts: res.offs
	};
}

export function retrieveSimilarProducts(token, category){
	return function (dispatch) {
		//console.log(API_URL + 'offs/recoms/10?page=' + page)
		var config = {
			headers: { 'Authorization': "bearer " + token }
		};

		var bodyParameters = {
			lat: 11,
			long: 25,
			expr: category
		};
		axios.post(API_URL + 'offs/recomsbyCat/', bodyParameters, config)
			.then(res => {
				dispatch(retrieveSimilarProductsSuccess(res.data));
				//goHome();
			})
			.catch(error => {
				console.log(error.response); //eslint-disable-line
			});
	};
};

export function retrieveOtherStoreOffsSuccess(res) {
	return {
		type : types.RETRIEVE_OTHER_PRODUCTS_SUCCESS,
		otherProducts: res.offs
	};
}

export function retrieveOtherStoreOffs(token, pid){
	return function (dispatch) {
		//console.log(API_URL + 'offs/recoms/10?page=' + page)
		var config = {
			headers: { 'Authorization': "bearer " + token }
		};

		/*var bodyParameters = {
			lat: 11,
			long: 25,
			expr: category
		};*/

		axios.get(API_URL + 'offs/byProduct/' + pid, config)
			.then(res => {
				dispatch(retrieveOtherStoreOffsSuccess(res.data));
				//goHome();
			})
			.catch(error => {
				console.log(error.response); //eslint-disable-line
			});
	};
};

export function retrieveProductDetailsSuccess(res) {
	return {
		type : types.RETRIEVE_PRODUCT_DETAILS_SUCCESS,
		details: res
	};
}

export function retrieveProductDetails(token, pid, off){
	return function (dispatch) {
		dispatch(retrieveOtherStoreOffsSuccess(off));
		//console.log(API_URL + 'offs/recoms/10?page=' + page)
		/*var config = {
			headers: { 'Authorization': "bearer " + token }
		};*/

		/*var bodyParameters = {
			lat: 11,
			long: 25,
			expr: category
		};*/

		/*axios.get(API_URL + 'offs/byProduct/' + pid, config)
			.then(res => {
				dispatch(retrieveOtherStoreOffsSuccess(res.data));
				//goHome();
			})
			.catch(error => {
				console.log(error.response); //eslint-disable-line
			});*/
	};
};

export function addToNotifsSuccess(notif, appstate) {
	return {
		type: types.ADD_TO_NOTIFS,
		notif: notif,
		appstate : appstate
	}
}

export function addToNotifs(token, notif, type) {
	return function (dispatch) {
		var config = {
			headers: { 'Authorization': "bearer " + token }
		};

		/*var bodyParameters = {
			lat: 11,
			long: 25,
			expr: category
		};*/

		axios.get(API_URL + 'offs/' + notif.data.id, config)
			.then(res => {
				dispatch(addToNotifsSuccess(res.data, type));;
				//goHome();
			})
			.catch(error => {
				console.log(error.response); //eslint-disable-line
			});
		
		/*ToastAndroid.showWithGravityAndOffset(
			'Succussfully Added',
			ToastAndroid.LONG,
			ToastAndroid.TOP,
			25,
			50,
		);*/

		/*Navigation.mergeOptions('AppBottonTabWishList', {
			bottomTab: {
				badge: counter + 1
			}
		})*/

	}
}

