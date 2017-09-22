import React from 'react';

//----------------------Inverse Inheritance: When need to access state---------------------------------

export function II (WrappedComponent) {

	class genHOC extends WrappedComponent {
		
		name = WrappedComponent.displayName || WrappedComponent.name;
		static displayName = WrappedComponent.displayName || WrappedComponent.name;

		componentWillMount() {
			if (super.componentWillMount) super.componentWillMount();
		}

		render() {
			return(
				super.render()
			);
		}
	}

	return genHOC
}


//-----------------------Props Proxy: When no state necessary-----------------------------

export function PP (WrappedComponent) {

	class genHOC extends React.PureComponent {
		
		name = WrappedComponent.displayName || WrappedComponent.name;
		static displayName = WrappedComponent.displayName || WrappedComponent.name;

		componentWillMount() {}

		render() {
			return(
				<WrappedComponent {...this.props}/>
			);
		}
	}

	return genHOC
}


