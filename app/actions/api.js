import ajax from '../helpers/ajax'


export async function asyncNewPost (post) {
  return ajax.post('api/posts', {
    body: JSON.stringify(post)
  })
}

export async function asyncGetPosts () {
  return ajax.get('api/posts')
}