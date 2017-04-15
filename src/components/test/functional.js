import React from 'react';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

import ajax from '../../helpers/ajax';
import { errorHandler } from '../../helpers/appHelpers';
import chainHOC from '../../helpers/chainHOC';
import Tabs from '../common/tabs';

const { ReactComponent } = window.CONFIG;

function Functional (props) {
	console.log(props);
	function click () {
		$.ajax({
			url: '/api/users',
			type: 'GET',
			headers: cookie.load('authHeaders'),
			success: function (param1, param2, param3) {
				console.log(arguments)
			},
			error: function(e) {
				console.log(arguments);
			}
		})
	}

	function navigate () {
		browserHistory.push('/stateful')
	}

	const grid = "col-xs-10 col-sm-10 col-md-8 col-lg-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-2 col-lg-offset-3";
	return (
		<div className={grid}>
			<h1>I am a functional Component</h1>
			<button onClick={click}>Test Ajax</button>
			<br/><br/>
			<button onClick={navigate}>Navigate</button>
			<br/>
			<br/>
			<br/>
			<Tabs activeTab='1' tabs={['Login', 'Sign Up']} >
				<Tab_HOC />
			</Tabs>
		</div>
	)
}

export default chainHOC(Functional, ['updateReporterPP', 'stateTrackerII']);


function Tab (props) {
	console.log('tab is rendering');
	return (
		<h1>{props.label}?</h1>
	)
}

const Tab_HOC = chainHOC(Tab, ['pureComponentPP', 'stateTrackerII'])

