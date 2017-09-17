import React from 'react';
import is from 'prop-types';



class GlobalPopup extends React.Component{
	static propTypes = {
	};

	render(){
		const { 
			component: Component, visible, label, wide, closePopup, asyncSignup, asyncLogin, componentProps
		} = this.props;
		
		if(!visible) return null;

		const labelRender = (!label) ? null : <h2>{label}</h2>

		const grid = (wide) ? 
			'col-xs-10 col-sm-10 col-md-8 col-lg-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-2 col-lg-offset-3' 
		:	'col-xs-8 col-sm-8 col-md-6 col-lg-4 col-xs-offset-2 col-sm-offset-2 col-md-offset-3 col-lg-offset-4'

		return(
			<div className='fixedPlane'>
				<div className='container'>
					<div className={grid}>
						<div className='globalPopup'>
							<button onClick={closePopup} className='closeXButton'>X</button>
							{labelRender}
							<Component 
								popupProps={componentProps} 
								asyncSignup={asyncSignup}
								asyncLogin={asyncLogin}/>
							<br/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default GlobalPopup

