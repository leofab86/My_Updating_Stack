import React from 'react';
import is from 'prop-types';
import Immutable from 'immutable';

import chainHOC from '../../helpers/chainHOC';

const {ReactComponent} = window.CONFIG;


class Tabs extends ReactComponent{
	static propTypes = {
		activeTab: is.oneOfType([is.string, is.number]).isRequired,
		tabs: is.array.isRequired,
		children: is.oneOfType([is.arrayOf(is.object), is.object]).isRequired,
	};

	state = {data: Immutable.fromJS({ activeTab: 0 })}

	componentWillReceiveProps(nextProps) {
		if(this.state.data.get('activeTab')!==nextProps.activeTab) {
			let nextState = this.state.data.set('activeTab', nextProps.activeTab);
			this.setState({data:nextState});
		}
	}

	componentWillMount(){
		let nextState = this.state.data.set('activeTab', this.props.activeTab);
		this.setState({data: nextState});
	}

	selectTab (event) {
		let nextState = this.state.data.set('activeTab', event.target.id);
		this.setState({data: nextState});
	}

	render() {
		let activeTab = this.state.data.get('activeTab');

		const renderTab = (label, index) => {
			return (
				<li 
					key={index} 
					className={index == activeTab ? 'active' : ''} 
					onClick={this.selectTab.bind(this)}
					><a className='tab' id={index.toString()}>{label}</a></li>
			)
		}

		let child = (this.props.children) ? React.cloneElement(
			this.props.children[activeTab] || this.props.children, 
			(this.props.childProps) ? this.props.childProps[activeTab] || this.props.childProps : null
		) : null;		

		return(
			<div>
				<ul className="nav nav-tabs">
					{this.props.tabs.map(renderTab, this)}
				</ul>

				<div className="tab-content">
					<br/>
					{child}
				</div>			
			</div>
		);
	}
}


export default chainHOC(Tabs, ['stateTrackerII', 'updateReporterII']);

