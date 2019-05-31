import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.app, action) {
	switch (action.type) {

		case types.RETRIEVE_RECOMMENDED_OFFS_SUCCESS:
			return {
				...state,
				recommendedOffs: action.recommendedOffs
			};

		case types.RETRIEVE_POPULAR_OFFS_SUCCESS:
			return {
				...state,
				popularOffs: action.popularOffs
			};

		case types.RETRIEVE_PRODUCTS_SEARCH_RESULT_SUCCESS:
			return {
				...state,
				searchResults: action.searchResults
			};

		case types.ADD_TO_WISHLIST:
			return {
				...state,
				wishlist: [...state.wishlist, { off: action.off, prf: action.prf }],
				wishlistCounter: state.wishlistCounter + 1
			}

		case types.REMOVE_FROM_WISHLIST:
			return {
				...state,
				wishlist: action.index === 0 ? state.wishlist.slice(1) : state.wishlist.slice(0, action.index).concat(state.wishlist.slice(action.index + 1)),//[state.wishlist.splice(0,action.index), state.wishlist.splice(action.index+1, state.wishlist.length)],
				wishlistCounter: state.wishlistCounter - 1
			}

		case types.RETRIEVE_CATEGORIES_SUCCESS:
			return {
				...state,
				categories: action.categories
			};

		case types.RETRIEVE_CATEGORY_PRODUCTS_SUCCESS:
			return {
				...state,
				categoryOffs: action.categoryOffs
			};

		case types.RETRIEVE_OTHER_PRODUCTS_SUCCESS:
			return {
				...state,
				otherProducts: action.otherProducts
			};

		case types.RETRIEVE_SIMILAR_PRODUCTS_SUCCESS:
			return {
				...state,
				similarProducts: action.similarProducts
			};

		case types.RETRIEVE_PRODUCT_DETAILS_SUCCESS:
			return {
				...state,
				details: action.details
			};

		case types.ADD_TO_NOTIFS:
			return {
				...state,
				notifs: [...state.notifs, { notif: action.notif, appstate: action.appstate }],
				notifsCounter: state.notifsCounter + 1
			};

		default:
			return state;
	}
}
