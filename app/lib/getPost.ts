'use server'
import { Post } from '../types/field'

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
  const group = (await response.json())[0]
  const groupParsed = JSON.parse(group.data.S)
  groupParsed['groupId'] = group.PK.S
  groupParsed['fieldWithContent'] = JSON.parse(groupParsed['fields'])

  return groupParsed as Post
}

export default getPost
