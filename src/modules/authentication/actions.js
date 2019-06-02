import axios from 'axios';
import { AsyncStorage } from "react-native";
import * as types from '../../constants/actionTypes';
import { API_URL, API_KEY } from '../../constants/api';
import { goHome } from '../../utils/navigation'

// Signin User
export function signinUserSuccess(res) {
	return {
		type: types.SIGNIN_USER_SUCCESS,
		user: res.userInfo,
		token: res.token
	};
}

export function signinUserFail(res) {
	return {
		type: types.SIGNIN_USER_FAIL,
		message: res.message
	};
}

export function signinUser(user) {
	return function (dispatch) {
		console.log(API_URL + 'users/signin')
		axios.post(API_URL + 'users/signin', {
			email: user.email,
			password: user.password
		})
			.then(res => {
				dispatch(signinUserSuccess(res.data));
				_signInAsync(user)
			})
			.catch(error => {
				dispatch(signinUserFail(error.response.data));
				console.log("Error Logging In: ", error.response.data); //eslint-disable-line
			});
	};
}

_signInAsync = async (user) => {
	await AsyncStorage.setItem('userToken', JSON.stringify(user))
		.then(() => {
			console.log("The user has been stored locallkky")
			goHome();
		})
		.catch(err => {
			alert('error: jhggkj', err);
		})
};

// Signup User
export function signupUserSuccess(res) {
	return {
		type: types.SIGNUP_USER_SUCCESS,
		message: res.message
		//user: res.userInfo,
		//token: res.token
	};
}

export function signupUserFail(res) {
	return {
		type: types.SIGNUP_USER_FAIL,
		message: res.message
	};
}

export function signupUser(user) {
	return function (dispatch) {
		console.log(API_URL + 'users/signup')
		axios.post(API_URL + 'users/signup', {
			fname: user.fname,
			lname: user.lname,
			password: user.password,
			email: user.email
		})
			.then(res => {
				console.log("SignUp Response: ", res.data);
				dispatch(signupUserSuccess(res.data));
				//_signupAsync(user)
			})
			.catch(error => {
				dispatch(signupUserFail(error.response.data));
				console.log("Error Signing Up: ", error.response.data); //eslint-disable-line
			});
	};
}

_signupAsync = async (user) => {
	await AsyncStorage.setItem('userToken', JSON.stringify(user))
		.then(() => {
			console.log("The user has been stored locally")
			goHome();
		})
		.catch(err => {
			alert('error: ', err);
		})
};

// Forgot Password
export function forgotPassSuccess(res) {
	return {
		type: types.FORGOT_PASS_SUCCESS,
		message: res.message
		//user: res.userInfo,
		//token: res.token
	};
}

export function forgotPassFail(res) {
	return {
		type: types.FORGOT_PASS_FAIL,
		message: res.message
	};
}

export function forgotPass(user) {
	return function (dispatch) {
		console.log(API_URL + 'users/forgottpass')
		axios.post(API_URL + 'users/forgottpass', {
			//fname: user.fname,
			//lname: user.lname,
			password: user.password,
			email: user.email
		})
			.then(res => {
				console.log("ForgotPass Response: ", res.data);
				dispatch(forgotPassSuccess(res.data));
				//_signupAsync(user)
			})
			.catch(error => {
				dispatch(forgotPassFail(error.response.data));
				console.log("Error ForgettingPass: ", error.response.data); //eslint-disable-line
			});
	};
}


// Error Clear
export function clearErrorSUCCESS() {
	return {
		type: types.CLEAR_AUTH_ERROR,
		message: null
	}
}

export function clearError() {
	return function (dispatch) {
		dispatch(clearErrorSUCCESS());
	};
}

// Edit Favorite Categories
export function addToFavCatsSuccess(data) {
	return {
		type: types.ADD_TO_FAVORITE_CATEGORIES_SUCCESS,
		cat: data
	}
}

export function addToFavCats(item) {
	return function (dispatch) {
		dispatch(addToFavCatsSuccess(item))
	}
}

export function removeFromFavCatsSuccess(data) {
	return {
		type: types.REMOVE_FROM_FAVORITE_CATEGORIES_SUCCESS,
		cat: data
	}
}

export function removeFromFavCats(item) {
	return function (dispatch) {
		dispatch(addToFavCatsSuccess(item))
	}
}