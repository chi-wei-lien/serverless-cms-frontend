'use server'
import { DynamodbResponse, Post } from '../types/field'

const getPost = async (groupId: string, postId: string) => {
  const paramsObj = {
    'group-id': groupId,
    'post-id': postId,
  }
  const searchParams = new URLSearchParams(paramsObj)

  const response = await fetch(
    'http://127.0.0.1:8080/get-post?' + searchParams,
    {
      method: 'GET',
      next: {
        tags: ['posts'],
      },
    }
  )
  const post = (await response.json())[0] as DynamodbResponse
  const postParsed = JSON.parse(post.data.S)
  postParsed['groupId'] = post.PK.S
  postParsed['data'] = JSON.parse(postParsed['fields'])

  return postParsed as Post
}

export default getPost
