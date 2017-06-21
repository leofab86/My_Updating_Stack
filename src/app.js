import React from 'react';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 

import { newSession, asyncAuthenticate } from './actions/reduxActions';
import { authenticate } from './actions/authActions';
import { errorHandler } from './helpers/appHelpers';
import {AUTH, AUTH_CLEAR, POPUP, DATA_GET, DATA_ADD} from './actions/constants';
import MainContainer from './containers/mainContainer';
import Stateful from './components/test/stateful';
import Functional from './components/test/functional';
import ReduxContainer from './components/test/reduxContainer';
import Login from './components/login';
import { setConfig, STContainer, decoratorsConfig } from 'my_decorators';

setConfig({
	stateTracker: false,
	updateReports: { mount: false, update: false, pass: false, render: true }
});

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
		case AUTH_CLEAR:
			return action.userObj
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


export function renderApp() {
	//Authenticate and get resources here
	if(window.express.errors) errorHandler(window.express.errors);
	
	authenticate(user =>{
		store.dispatch(newSession(user))
	})

	return (
		<Provider store={store} key="provider">
			<div>
				{ decoratorsConfig.stateTracker && <STContainer /> }
				<Router>
					<Switch>
						<MainContainer exact path='/' Component={Functional}/>
						<MainContainer exact path='/stateful' Component={Stateful}/>
						<MainContainer path='/stateful/:param' Component={Stateful}/>
						<MainContainer path='/redux' Component={ReduxContainer}/>
						<MainContainer path='/login' Component={Login}/>
					</Switch>
				</Router>
			</div>
		</Provider>
	);


	
}



//--------------TEST DISPATCH ACTIONS-------------------

// console.log(store.getState())
// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// );

//store.dispatch(AppActions.newPopup({visible:true}))



