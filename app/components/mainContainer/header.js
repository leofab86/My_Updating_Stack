import React from 'react';
import is from 'prop-types';
import { Link } from 'react-router-dom';

import Functional from '../test/functional';



export default class Header extends React.PureComponent{
	static propTypes = {
	  app: is.shape({
      reduxControlModal: is.func.isRequired,
      asyncGetPosts: is.func.isRequired
    }).isRequired
	}

	signIn = () => {
		this.props.app.reduxControlModal({
			showModal: true,
			wide: false,
			label: 'Sign In',
			Component: Functional,
			props: {
				asyncGetPosts: this.props.app.asyncGetPosts,
			}
		})
	}

	signUp = () => {
		this.props.app.reduxControlModal({
			showModal: true,
			wide: false,
			label: '',
			Component: Functional,
			props: {
				type: 'signup',
				asyncGetPosts: this.props.app.asyncGetPosts
			}
		})
	}

	render() {
		return (
			<div className="header">
        <div className="home">
          <a>Logo</a>

        </div>
        <div className="middle" />

        <div className="account">
          <a onClick={this.signIn}>Sign in</a>
          <a onClick={this.signUp}>Sign up</a>
        </div>
      </div>
    )
	}
}



