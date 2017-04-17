import { connect } from 'react-redux';

import stateTracker from './stateTracker';


const mapStateToProps = (appState) => {
	return {appState}
}

const STContainer = connect(
	mapStateToProps
)(stateTracker)

STContainer.displayName = 'STContainer';

export default STContainer;