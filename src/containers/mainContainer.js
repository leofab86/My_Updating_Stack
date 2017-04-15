import React from 'react';
import { connect } from 'react-redux';

import * as AppActions from '../actions/reduxActions';
import Header from '../components/header';
import GlobalPopup from '../components/globalPopup';
import StateTracker from '../stateTracker/stateTracker';
import chainHOC from '../helpers/chainHOC';

const { ReactComponent, stateTracker } = window.CONFIG;


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

class ViewContainer extends ReactComponent {
	
	render(){		
		//Destructure all dispatchable redux functions that components need to use
		const { closePopup, asyncSignup, asyncLogin, asyncLogout, newPopup
		} = this.props.dispatcher;

		const { globalPopup, auth } = this.props.appState;
		const { isSignedIn } = auth;
		
		const Child = this.props.children.type;
		const childName = Child.displayName || Child.name;

		const propsRouter = {
			Stateful: () => {
				const param = this.props.children.props.params.param;
				return { thisIs: 'stateful', param }
			},
			Functional: () => {
				return { thisIs: 'functional' }
			},
			ReduxContainer: () => {
				return { thisIs: 'reduxContainer' }
			}
		}

		return (
			<div>
				{ (stateTracker) ? <StateTracker appState={{...this.props.appState}}/> : null }

				<Header {...{isSignedIn, asyncLogout, newPopup, closePopup}}/>
				<div className='container'>
					<Child {...propsRouter[childName]()} />						
				</div>

				<GlobalPopup {...{...globalPopup, closePopup, asyncSignup, asyncLogin}}/>
			</div>
		);
	}
}

const MainContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(chainHOC(ViewContainer, ['updateReporterII', 'stateTrackerII']))

MainContainer.displayName = 'MainContainer';

export default MainContainer;

