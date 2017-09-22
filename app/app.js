import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import mainReducer from './reducers/mainReducer';
import MainContainer from './containers/mainContainer';
import Stateful from './components/test/stateful';
import Functional from './components/test/functional';
import ReduxContainer from './components/test/reduxContainer';
import Login from './components/login';



let store;
const reduxDevTools = false;

if (reduxDevTools) {
	store = createStore(
		mainReducer,
		composeWithDevTools( 
			applyMiddleware(thunk),
		)
	)
} else {
	store = createStore(
		mainReducer,
		applyMiddleware(thunk)
	)
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



