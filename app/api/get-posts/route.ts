import { ExternalPostInGroup, PostGroupResponse } from '@/app/types/field'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const groupId = searchParams.get('group-id') as string

  const paramsObj = { 'group-id': groupId }
  const newSearchParams = new URLSearchParams(paramsObj)

  const response = await fetch(
    'http://127.0.0.1:8080/get-posts?' + newSearchParams,
    {
      method: 'GET',
    }
  )

  const posts = (await response.json()) as PostGroupResponse[]

  const postParsed: ExternalPostInGroup[] = []
  for (const post of posts) {
    const postObj = JSON.parse(post.data.S)
    postParsed.push({
      postId: post.SK.S,
      createdOn: postObj.createdOn,
      data: JSON.parse(postObj['fields']),
    })
  }

  return Response.json(postParsed)
}
