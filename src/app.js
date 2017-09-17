import React from 'react';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 

import { errorHandler } from './helpers/appHelpers';
import {POPUP, DATA_GET, DATA_ADD} from './actions/constants';
import MainContainer from './containers/mainContainer';
import Stateful from './components/test/stateful';
import Functional from './components/test/functional';
import ReduxContainer from './components/test/reduxContainer';
import Login from './components/login';




const mainReducer = combineReducers({
	globalPopup: popupReducer,
	data: dataReducer
})


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
const reduxDevTools = false;

if (reduxDevTools) {
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
	//if(window.express && window.express.errors) errorHandler(window.express.errors);
	
	// authenticate(user =>{
	// 	store.dispatch(newSession(user))
	// })

	return (
		<Provider store={store} key="provider">
			<div>
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



