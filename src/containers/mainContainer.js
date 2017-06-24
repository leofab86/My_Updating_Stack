import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import * as AppActions from '../actions/reduxActions';
import Header from '../components/header';
import GlobalPopup from '../components/globalPopup';

import { updateReporterII, stateTrackerII } from 'my_decorators';

const { ReactComponent } = window.CONFIG;


const mapStateToProps = (appState) => {
	return {appState}
}

const mapDispatchToProps = (dispatch) => {
	let dispatcher = {};
	for (var key in AppActions) {
		const action = AppActions[key];
		dispatcher[key] = (param1, param2, param3) => {
			dispatch(action(param1, param2, param3))
		}
	}
	return {dispatcher}
}


@updateReporterII
@stateTrackerII
class ViewContainer extends ReactComponent {
	
	render(){
		console.log('render');
		const { Component, dispatcher, appState, ...rest } = this.props;

		//Destructure all dispatchable redux functions that components need to use
		const { newPopup, closePopup, asyncSignup, asyncLogin, asyncLogout 
		} = dispatcher;

		const { globalPopup, auth } = appState;
		const { isSignedIn, user_name } = auth;

		const componentName = Component.displayName || Component.name;
		const stateRouter = {
			Stateful: () => {
				return { thisIs: 'stateful', isSignedIn }
			},
			Functional: () => {
				return { thisIs: 'functional', globalPopup }
			},
			ReduxContainer: () => {
				return { thisIs: 'reduxContainer' }
			},
			Login: () => {
				return { asyncLogin, asyncSignup }
			}
		}

		return (
			<Route {...rest} render={routeProps => 
				<div>			
					<Header {...{isSignedIn, user_name, asyncLogout, newPopup, closePopup}}/>
					<div className='container'>
						<Component {...routeProps} {...stateRouter[componentName]()}/>
					</div>
					<GlobalPopup {...{...globalPopup, closePopup, asyncSignup, asyncLogin}}/>
				</div>
			}/>
		);
	}
}

const MainContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ViewContainer)

MainContainer.displayName = 'MainContainer';

export default MainContainer;

