import {POSTS_STORE} from '../actions/constants';

export default function postsReducer ( state = {}, action ) {
  switch (action.type) {
    case POSTS_STORE: {
      const newPosts = {}
      for (let post of action.posts) {
        newPosts[post._id] = post
      }
      return newPosts
    }
    default:
      return state
  }
}