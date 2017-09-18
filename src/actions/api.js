import ajax from '../helpers/ajax'


export async function newPost (post) {
  return ajax.post('api/posts', {
    body: JSON.stringify(post)
  })
}

export async function getPosts () {
  return ajax.get('api/posts')
}