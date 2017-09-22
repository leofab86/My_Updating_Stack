import { POSTS_STORE } from './constants';
import * as api from './api'

// ------------ Redux Actions -------------

export function storePosts(posts) {
	return { type: POSTS_STORE, posts}
}


//------------- Async Actions ------------

export function asyncGetPosts () {
	return async function (dispatch) {
    const posts = await api.asyncGetPosts()
    dispatch(storePosts(posts))
    return posts
  }
}