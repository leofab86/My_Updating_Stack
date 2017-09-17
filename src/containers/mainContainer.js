import React from 'react';
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Header from '../components/header';
import GlobalPopup from '../components/globalPopup';


const mapStateToProps = (appState) => {
	return {appState}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({

})



class ViewContainer extends React.PureComponent {
	
	render(){
		console.log('renderering MainContainer');
		const { Component, appState, ...rest } = this.props;

		console.log('AppState: ', appState)
    console.log('Rest: ', rest)

		const componentName = Component.displayName || Component.name;
		const stateRouter = {
			Stateful: () => {
				return { thisIs: 'stateful' }
			},
			Functional: () => {
				return { thisIs: 'functional' }
			},
			ReduxContainer: () => {
				return { thisIs: 'reduxContainer' }
			}
		}

		return (
			<Route {...rest} render={routeProps => 
				<div>			
					<Header />
					<div className='container'>
						<Component {...routeProps} {...stateRouter[componentName]()}/>
					</div>
					<GlobalPopup />
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

