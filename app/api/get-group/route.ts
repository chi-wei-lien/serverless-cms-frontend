import { DynamodbResponse, Group } from '@/app/types/field'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const groupId = searchParams.get('group-id') as string

  const paramsObj = {
    'group-id': groupId,
  }
  const newSearchParams = new URLSearchParams(paramsObj)

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-group?` + newSearchParams,
    {
      method: 'GET',
      next: {
        revalidate: 0,
      },
    }
  )

  const group = (await response.json())[0] as DynamodbResponse
  const groupObj = JSON.parse(group.data.S)
  const groupParsed: Group = {
    groupId: group.PK.S,
    groupName: groupObj.groupName,
    createdOn: groupObj.createdOn,
    fields: JSON.parse(groupObj.fields),
  }

  return Response.json(groupParsed)
}
