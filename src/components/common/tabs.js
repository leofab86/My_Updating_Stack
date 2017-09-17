import React from 'react';
import is from 'prop-types';
import Immutable from 'immutable';



class Tabs extends React.PureComponent{
	static propTypes = {
		activeTab: is.oneOfType([is.string, is.number]).isRequired,
		tabs: is.array.isRequired,
		children: is.oneOfType([is.arrayOf(is.func), is.func]).isRequired,
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

		let Child = this.props.children ? this.props.children[activeTab] || this.props.children : null;
		let childProps = this.props.childProps ? this.props.childProps[activeTab] || this.props.childProps : {};

		return(
			<div>
				<ul className="nav nav-tabs">
					{this.props.tabs.map(renderTab, this)}
				</ul>

				<div className="tab-content">
					<br/>
					<Child  {...childProps}/>
				</div>			
			</div>
		);
	}
}


export default Tabs

