/* eslint-disable global-require */
/* eslint-disable no-undef */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

let middleware = [thunk];

if (__DEV__) {
	const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
	middleware = [...middleware, reduxImmutableStateInvariant, logger];
} else {
	middleware = [...middleware];
}

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export default function configureStore(initialState) {
	return createStore(
		rootReducer,
		initialState, composeWithDevTools(
			applyMiddleware(...middleware),
			// other store enhancers if any
		)
		//applyMiddleware(...middleware)
	);
}
