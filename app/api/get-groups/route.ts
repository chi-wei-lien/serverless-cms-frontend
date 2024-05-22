import { DynamodbResponse, Group } from '@/app/types/field'

export async function GET(request: Request) {
  const response = await fetch('http://127.0.0.1:8080/get-groups', {
    method: 'GET',
    next: {
      revalidate: 0,
    },
  })

  const groups = (await response.json()) as DynamodbResponse[]
  const groupParsed: Group[] = []
  for (const group of groups) {
    const groupObj = JSON.parse(group.data.S)
    groupParsed.push({
      groupId: group.PK.S,
      groupName: groupObj.groupName,
      createdOn: groupObj.createdOn,
      fields: JSON.parse(groupObj.fields),
    })
  }

  return Response.json(groupParsed)
}
