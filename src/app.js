import React from 'react';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'; 

import {AUTH, POPUP, DATA_GET, DATA_ADD} from './actions/constants';
import MainContainer from './containers/mainContainer';
import TestStateful from './components/test/stateful';
import TestFunctional from './components/test/functional';
import ReduxContainer from './components/test/reduxContainer';

const { reduxDevtools } = window.CONFIG;


const mainReducer = combineReducers({
	auth: authReducer,
	globalPopup: popupReducer,
	data: dataReducer
})

function authReducer ( state = { isSignedIn: false }, action) {
	switch (action.type) {
		case AUTH:
			return {...state, ...action.userObj}
		default:
			return state
	}
}

function popupReducer ( state = {
	visible: false,
	wide: false,
	label: '',
	component: () => {},
	componentProps: {}
}, action) {
	switch (action.type) {
		case POPUP:
			return {...state, ...action.popupObj}
		default:
			return state
	}
}

function dataReducer ( state = {}, action ) {
	switch (action.type) {
		case DATA_GET: {
			let dataSet = {};
			action.dataSet.map(data => {
				dataSet[data.id] = data
			})
			return dataSet
		}
		case DATA_ADD:
			return { ...state, [action.data.id]:action.data }

		default:
			return state
	}
}

let store;
if (reduxDevtools) {
	store = createStore(
		mainReducer,
		composeWithDevTools( 
			applyMiddleware(thunk),
	));
} else {
	store = compose(
		applyMiddleware(thunk)
	)(createStore)(mainReducer);
}

class AppRouter extends React.Component{
	render() {
		return(
			<Router history={browserHistory}>
				<Route path='/' component={MainContainer}>
					<IndexRoute component={TestFunctional} />
					<Route path='/stateful' component={TestStateful} />
					<Route path='/stateful/:param' component={TestStateful} />
					<Route path='/redux' component={ReduxContainer} />
				</Route>
				<Route path='/noContainer' component={TestFunctional} />
			</Router>
		);
	}
}

export function renderApp() {
	

	return (
		<Provider store={store} key="provider">
			<AppRouter />
		</Provider>
	);
}



//--------------TEST DISPATCH ACTIONS-------------------

// console.log(store.getState())
// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// );

//store.dispatch(AppActions.newPopup({visible:true}))



