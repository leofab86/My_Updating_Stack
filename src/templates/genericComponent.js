import React from 'react';
import is from 'prop-types';

import chainHOC from '../helpers/chainHOC';

const { ReactComponent } = window.CONFIG;


GenericComponent.propTypes = {
	example: is.oneOfType([is.string, is.number])
}

function GenericComponent (props) {

	function click () {}

	const grid = "col-xs-12 col-sm-12 col-md-10 col-lg-10 col-md-offset-1 col-lg-offset-1";
	return (
		<div className={grid}>
			<button onClick={click}>Click Me</button>
		</div>
	)
}

export default chainHOC(GenericComponent, ['updateReporterPP']);


// class GenericComponent extends ReactComponent{
//	static propTypes = {}

// 	render() {
// 		const grid = "col-xs-12 col-sm-12 col-md-10 col-lg-10 col-md-offset-1 col-lg-offset-1";
// 		return(
// 			<div>
// 				<h1>Generic Component</h1>
// 			</div>
// 		);
// 	}
// }


//export default chainHOC(GenericComponent, ['stateTrackerII', 'updateReporterII']);