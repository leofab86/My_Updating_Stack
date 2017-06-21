import React from 'react';
import is from 'prop-types';

import TextInput from './common/textInput';

const { ReactComponent } = window.CONFIG;


class Login extends ReactComponent {
	static propTypes = {
		propName: is.oneOfType([is.string, is.number]),
		asyncLogin: is.func.isRequired,
		asyncSignup: is.func.isRequired
	};

	state = {
		username: '',
		password: '',
		name:'',
		email:''
	}

	inputHandler = event => {
		const { name, value } = event.target;
		this.setState({[name]:value});
	}

	submit = () => {
		this.props.asyncLogin(this.state)
	}

	render() {
		const { loginCallback, signupCallback } = this.props.popupProps || {};
		const { asyncLogin, asyncSignup } = this.props;		
		const grid = this.props.popupProps ? null :
			"col-xs-10 col-sm-10 col-md-8 col-lg-8 col-xs-offset-1 col-sm-offset-1 col-md-offset-2 col-lg-offset-2"

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

				{renderInput('name', 'Name')}
				<br/>

				{renderInput('email', 'Email')}
				<br/>

				{renderInput('username', 'Username')}
				<br/>

				{renderInput('password', 'Password', 'password')}
				<br/>


				<div className='centerButton'>
					<button className="btn btn-success" 
						onClick={asyncLogin.bind(null, this.state, loginCallback)}
						>Login</button>
					<button className="btn btn-success" 
						onClick={asyncSignup.bind(null, this.state, signupCallback)}
						>Signup</button>			
				</div>

			</div>
		)
	}
}

export default Login

