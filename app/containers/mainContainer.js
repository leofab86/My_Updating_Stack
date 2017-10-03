import React from 'react';
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import * as app from '../actions/application'
import Header from '../components/mainContainer/header';
import Modal from '../components/mainContainer/modal';


const mapStateToProps = (state) => ({
	modal: state.modal
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  reduxControlModal: app.controlModal,
	asyncGetPosts: app.asyncGetPosts
}, dispatch)


@connect(mapStateToProps, mapDispatchToProps)
export default class MainContainer extends React.PureComponent {

  constructor(props){
    super()
    this.appControl = {
      reduxControlModal: props.reduxControlModal,
      asyncGetPosts: props.asyncGetPosts
    }
  }

	render(){
		const { Component, reduxControlModal, ...rest } = this.props;

		return (
			<Route {...rest} render={routeProps => 
				<div>			
					<Header app={this.appControl}/>

          <div className='gridContainer'>
            <div className="gridLeft"/>

            <div className="gridMiddle">
              <Component {...routeProps} app={this.appControl}/>
            </div>

            <div className="gridRight"/>
					</div>

					<Modal {...this.props.modal} reduxControlModal={reduxControlModal}/>
				</div>
			}/>
		);
	}
}


