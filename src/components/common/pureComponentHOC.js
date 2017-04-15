import React from 'react';

export function pureComponentPP (WrappedComponent) {

	class pureComponentHOC_PP extends React.PureComponent {
		
		name = WrappedComponent.displayName || WrappedComponent.name;
		static displayName = WrappedComponent.displayName || WrappedComponent.name;

		render() {
			return(
				<WrappedComponent {...this.props}/>
			);
		}
	}

	return pureComponentHOC_PP
}