'use server'
import { Post } from '../types/field'

const getPost = async (groupId: string, postId: string) => {
  const paramsObj = {
    'group-id': groupId,
    'post-id': postId,
  }
  const searchParams = new URLSearchParams(paramsObj)

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/get-post?${searchParams}`,
    {
      method: 'GET',
      next: {
        tags: ['posts'],
      },
    }
  )
  const post = (await response.json()) as Post
  return post
}

export default getPost
