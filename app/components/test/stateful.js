import React from 'react';




class Stateful extends React.PureComponent {

	state = {
		key: 'value'
	}

	render() {

		return (
			<div >
				<h1>I am a stateful Component</h1>
			</div>
		)

	}
}


export default Stateful