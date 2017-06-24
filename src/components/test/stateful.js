import React from 'react';

import cookie from 'react-cookie';
import ajax from '../../helpers/ajax';
import { updateReporterII, stateTrackerII } from 'my_decorators'

const {ReactComponent} = window.CONFIG;

@stateTrackerII
@updateReporterII
class Stateful extends ReactComponent {

	constructor (props) {
		super();	
	}

	state = {
		key: 'value'
	}

	render() {
		console.log(this.props)

		const grid = "col-xs-10 col-sm-10 col-md-8 col-lg-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-2 col-lg-offset-3";
		return (
			<div className={grid}>
				<h1>I am a stateful Component</h1>
			</div>
		)

	}
}


export default Stateful