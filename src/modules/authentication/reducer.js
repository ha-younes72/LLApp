import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.auth, action) {
    switch (action.type) {

        case types.SIGNIN_USER_SUCCESS:
            return {
                ...state,
                user: action.user,
                token: action.token
            };

        case types.SIGNIN_USER_FAIL:
            return {
                ...state,
                message: action.message,
            };

        case types.SIGNUP_USER_SUCCESS:
            return {
                ...state,
                message: action.message
                //token: action.token
            };

        case types.SIGNUP_USER_FAIL:
            return {
                ...state,
                message: action.message,
            };

        case types.CLEAR_AUTH_ERROR:
            return {
                ...state,
                message: action.message
            };

        case types.ADD_TO_FAVORITE_CATEGORIES_SUCCESS:
            return {
                ...state,
                favCats: [...state.favCats, action.cat]
            }

        case types.REMOVE_FROM_FAVORITE_CATEGORIES_SUCCESS:
            return {
                ...state,
                favCats: action.index === 0 ? state.favCats.slice(1) : state.favCats.slice(0, action.index).concat(state.favCats.slice(action.index + 1)),
            }

        default:
            return state;
    }
}
