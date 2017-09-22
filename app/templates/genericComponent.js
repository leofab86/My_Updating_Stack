import React from 'react';
import is from 'prop-types';



GenericComponent.propTypes = {
	example: is.oneOfType([is.string, is.number])
}

export default function GenericComponent (props) {

	function click () {}

	const grid = "col-xs-12 col-sm-12 col-md-10 col-lg-10 col-md-offset-1 col-lg-offset-1";
	return (
		<div className={grid}>
			<button onClick={click}>Click Me</button>
		</div>
	)
}


// export default class GenericComponent extends React.PureComponent{
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

