import { connect } from 'react-redux';

import * as AppActions from '../../actions/reduxActions';
import StatefulComponent from './stateful';


const mapStateToProps = ({auth, data, globalPopup}) => {
  return auth
}

const mapDispatchToProps = (dispatch) => {
	let dispatcher = {};
	for (var key in AppActions) {
		dispatcher[key] = (param1, param2) => {
			dispatch(AppActions[key](param1, param2))
		}
	}
	return {dispatcher}
}

const ReduxContainer = connect(
  mapStateToProps,
  // mapDispatchToProps
)(StatefulComponent)

ReduxContainer.displayName = 'ReduxContainer';

export default ReduxContainer;