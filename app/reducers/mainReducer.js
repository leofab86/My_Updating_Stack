import { combineReducers } from 'redux';

import modalReducer from './modalReducer'
import postsReducer from './postsReducer'



const mainReducer = combineReducers({
  posts: postsReducer,
  modal: modalReducer
})

export default mainReducer