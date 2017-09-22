import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'

import { asyncGetPosts } from '../actions/reduxActions';
import GenericComponent from './genericDumbComponent';


const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
	asyncGetPosts: asyncGetPosts
}, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class GenericContainer {

  render() {
    return (
      <GenericComponent/>
    )
  }
}