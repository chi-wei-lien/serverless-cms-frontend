import { PostGroupResponse } from '@/app/types/field'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const groupId = searchParams.get('group-id') as string
  const postId = searchParams.get('post-id') as string

  const paramsObj = {
    'group-id': groupId,
    'post-id': postId,
  }
  const newSearchParams = new URLSearchParams(paramsObj)

  const response = await fetch(
    'http://127.0.0.1:8080/get-post?' + newSearchParams,
    {
      method: 'GET',
    }
  )

  const post = (await response.json())[0] as PostGroupResponse

  const postObj = JSON.parse(post.data.S)
  const postParsed = {
    postId: post.SK.S,
    createdOn: postObj.createdOn,
    data: JSON.parse(postObj['fields']),
  }

  return Response.json(postParsed)
}
