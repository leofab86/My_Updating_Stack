import React from 'react';




class Stateful extends React.PureComponent {

	state = {
		key: 'value'
	}

	render() {
		console.log(this)

		const grid = "col-xs-10 col-sm-10 col-md-8 col-lg-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-2 col-lg-offset-3";
		return (
			<div className={grid}>
				<h1>I am a stateful Component</h1>
			</div>
		)

	}
}


export default Stateful