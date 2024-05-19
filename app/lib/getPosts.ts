import { Session } from 'next-auth'

import { Post, PostGroupResponse } from '../types/field'

const getPosts = async (groupId: string, session: Session | null) => {
  const paramsObj = { 'group-id': groupId }
  const searchParams = new URLSearchParams(paramsObj)

  const response = await fetch(
    'http://127.0.0.1:8080/get-posts?' + searchParams,
    {
      method: 'GET',

      headers: {
        Authorization: `Bearer ${session?.idToken}`,
      },
    }
  )

  const posts = (await response.json()) as PostGroupResponse[]

  const postParsed: Post[] = []
  for (const post of posts) {
    const postObj = JSON.parse(post.data.S)
    postObj['postId'] = post.SK.S
    postObj['editUrl'] = `/edit-post/${groupId}/${postObj.postId}`
    postParsed.push(postObj)
  }
  return postParsed
}

export default getPosts
