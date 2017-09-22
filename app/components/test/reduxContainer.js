import {bindActionCreators} from 'redux'
import { connect } from 'react-redux';

import StatefulComponent from './stateful';


const mapStateToProps = (appState) => {
  return appState
}

const mapDispatchToProps = (dispatch) => bindActionCreators({

})

const ReduxContainer = connect(
  mapStateToProps,
  // mapDispatchToProps
)(StatefulComponent)

ReduxContainer.displayName = 'ReduxContainer';

export default ReduxContainer;