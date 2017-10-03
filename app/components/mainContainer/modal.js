import React from 'react';
import is from 'prop-types';



export default class Modal extends React.PureComponent{

  static propTypes = {
    reduxControlModal: is.func.isRequired,
    showModal: is.bool.isRequired,
    label: is.string.isRequired,
    Component: is.func.isRequired,
    props: is.object.isRequired
	}


	closeModal = () => {
    this.props.reduxControlModal({showModal: false})
  }

	render(){
		const { Component, showModal, label, props } = this.props;
		
		if(!showModal) return null;

		return(
			<div className='fixedPlane'>
        <div className='myModal'>
          <button onClick={this.closeModal} className='closeXButton'>X</button>
          {label && label}
          <Component {...props}/>
          <br/>
        </div>
			</div>
		)
	}
}
