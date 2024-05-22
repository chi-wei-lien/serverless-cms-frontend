'use server'
import { ExternalPostInGroup } from '../types/field'

const getPosts = async (groupId: string) => {
  const paramsObj = { 'group-id': groupId }
  const searchParams = new URLSearchParams(paramsObj)
  const apiUrl = 'http://localhost:3000/api/get-posts?' + searchParams

  const response = await fetch(apiUrl, {
    method: 'GET',
    next: {
      tags: ['posts'],
    },
  })

  const posts = (await response.json()) as ExternalPostInGroup[]

  for (const post of posts) {
    post['editUrl'] = `/edit-post/${groupId}/${post.postId}`
  }

  return posts
}

export default getPosts
