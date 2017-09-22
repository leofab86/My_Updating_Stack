import React from 'react';
import is from 'prop-types';



export default class GenericComponent extends React.PureComponent{
	static propTypes = {}

	state = {}

	render() {
		const grid = "col-xs-12 col-sm-12 col-md-10 col-lg-10 col-md-offset-1 col-lg-offset-1";
		return(
			<div>
				<h1>Generic Component</h1>
			</div>
		);
	}
}

