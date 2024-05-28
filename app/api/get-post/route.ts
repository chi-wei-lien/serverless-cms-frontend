import { DynamodbResponse, Post } from '@/app/types/field'

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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-post?` + newSearchParams,
    {
      method: 'GET',
      next: {
        revalidate: 0,
      },
    }
  )

  const post = (await response.json())[0] as DynamodbResponse

  const postObj = JSON.parse(post.data.S)
  const postParsed: Post = {
    postId: post.SK.S,
    createdOn: postObj.createdOn,
    data: JSON.parse(postObj['fields']),
  }

  return Response.json(postParsed)
}
