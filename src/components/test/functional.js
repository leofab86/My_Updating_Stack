import React from 'react';
import { BrowserHistory } from 'react-router-dom';

import Tabs from '../common/tabs';
import {newPost, getPosts} from '../../actions/api'


function Functional (props) {
	console.log(props);

  const click = async () => {
		console.log(await newPost({
      title: 'async post',
      author: 'async leo',
      body: 'async body'
    }))
	}

  const click2 = async () => {
    console.log(await getPosts())
  }

	function navigate () {
		props.history.push('/stateful')
	}

	const grid = "col-xs-10 col-sm-10 col-md-8 col-lg-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-2 col-lg-offset-3";
	return (
		<div className={grid}>
			<h1>I am a functional Component</h1>
			<button onClick={click}>Test Button</button>
			<br/><br/>

      <button onClick={click2}>Test Button 2</button>
      <br/><br/>

			<button onClick={navigate}>Navigate</button>
			<br/><br/><br/>

			<Tabs activeTab='1' tabs={tabs} >
				{childrenArray}
			</Tabs>
		</div>
	)
}

export default Functional;


function Tab (props) {
	console.log('tab is rendering');
	return (
		<h1>{props.label}?</h1>
	)
}

//Need to define these to pass to Tabs to avoid re-rendering;

const tabs = ['Login', 'Sign Up'];
const childrenArray = [Tab, Tab];

