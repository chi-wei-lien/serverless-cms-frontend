import decodeUrlString from '@/app/lib/decodeUrlString'
import { DynamodbResponse, ExternalPostInGroup } from '@/app/types/field'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const groupId = decodeUrlString(searchParams.get('group-id') as string)
  const paramsObj = { 'group-id': groupId }
  const newSearchParams = new URLSearchParams(paramsObj)
  const apiUrl = 'http://127.0.0.1:8080/get-posts?' + newSearchParams
  const response = await fetch(apiUrl, {
    method: 'GET',
    next: {
      revalidate: 0,
    },
  })
  const posts = (await response.json()) as DynamodbResponse[]

  const postParsed: ExternalPostInGroup[] = []
  for (const post of posts) {
    const postData = JSON.parse(post.data.S)
    const postObj: ExternalPostInGroup = {
      postId: post.SK.S,
      createdOn: postData.createdOn,
      data: JSON.parse(postData.fields),
    }
    postParsed.push(postObj)
  }
  return Response.json(postParsed)
}
