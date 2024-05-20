import { ExternalPostGroup, PostGroupResponse } from '@/app/types/field'

export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url)
  // const groupId = searchParams.get('groupId');

  const response = await fetch('http://127.0.0.1:8080/get-groups', {
    method: 'GET',
  })

  const groups = (await response.json()) as PostGroupResponse[]
  const groupParsed: ExternalPostGroup[] = []
  for (const group of groups) {
    const groupObj = JSON.parse(group.data.S)
    groupParsed.push({
      groupId: group.PK.S,
      groupName: groupObj.groupName,
      createdOn: groupObj.createdOn,
    })
  }

  return Response.json(groupParsed)
}
