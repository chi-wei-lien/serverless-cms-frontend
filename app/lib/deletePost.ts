'use server'
import { revalidateTag } from 'next/cache'
import { Session } from 'next-auth'

const deletePost = async (
  groupId: string,
  postId: string,
  session: Session | null
) => {
  const paramsObj = {
    'group-id': groupId,
    'post-id': postId,
  }
  const searchParams = new URLSearchParams(paramsObj)

  const url = `http://127.0.0.1:8080/delete-post?${searchParams}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.idToken}`,
    },
  })

  const responseData = await response.json()
  console.log(responseData)
  revalidateTag('posts')
}

export default deletePost
