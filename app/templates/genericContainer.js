import { connect } from 'react-redux';

import { asyncEditUser } from '../actions/reduxActions';
import GenericComponent from './genericComponent';


const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
	return { asyncEditUser: (id, callback) => dispatch( asyncEditUser(id, callback))}
}

const ReduxContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(GenericComponent)

ReduxContainer.displayName = 'ReduxContainer';

export default ReduxContainer;