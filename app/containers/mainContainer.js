import React from 'react';
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import {asyncGetPosts} from '../actions/reduxActions'
import Header from '../components/header';
import Modal from '../components/modal';


const mapStateToProps = (appState) => {
	return {appState}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  asyncGetPosts
}, dispatch)


@connect(mapStateToProps, mapDispatchToProps)
export default class MainContainer extends React.PureComponent {
	
	render(){
		const { Component, appState, ...rest } = this.props;

    const asyncGetPosts = this.props.asyncGetPosts

		const componentName = Component.displayName || Component.name;
		const stateRouter = {
			Stateful: () => {
				return { thisIs: 'stateful' }
			},
			Functional: () => {
				return { thisIs: 'functional', asyncGetPosts }
			},
			ReduxContainer: () => {
				return { thisIs: 'reduxContainer' }
			},
		}

		return (
			<Route {...rest} render={routeProps => 
				<div>			
					<Header />
					<div className='container'>
						<Component {...routeProps} {...stateRouter[componentName]()}/>
					</div>
					<Modal />
				</div>
			}/>
		);
	}
}


