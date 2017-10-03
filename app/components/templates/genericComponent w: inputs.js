import React from 'react';
import is from 'prop-types';

import TextInput from '../common/textInput';


export default class COMPONENTNAME extends React.PureComponent {
	static propTypes = {
		propName: is.oneOfType([is.string, is.number])
	};

	state = {

	}

	inputHandler = event => {
		const { name, value } = event.target;
		this.setState({[name]:value});
	}

	submit = () => {

	}

	render() {
		const grid = "col-xs-10 col-sm-10 col-md-8 col-lg-8 col-xs-offset-1 col-sm-offset-1 col-md-offset-2 col-lg-offset-2"
		const { a } = this.props;

		const renderInput = (name, label, type='text') => {
			return (
				<TextInput
					name={name}
					label={label}
					type={type}
					value={this.state[name]}
					onChange={this.inputHandler} />
			)
		}

		return (
			<div className={grid}>

				<div className='jumbotron'><h3>Generic Component w/ Inputs</h3></div>

				{renderInput('name', 'Label')}
				<br/>

				{renderInput('name', 'Label')}
				<br/>

				{renderInput('name', 'Label')}
				<br/>

				<div className='centerButton'>
					<button className="btn btn-success" 
						onClick={this.submit}
						>Submit</button>				
				</div>

			</div>
		)
	}
}


