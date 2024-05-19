import { Session } from 'next-auth'

const getGroup = async (groupId: string, session: Session | null) => {
  const paramsObj = { 'group-id': groupId }
  const searchParams = new URLSearchParams(paramsObj)

  const response = await fetch(
    'http://127.0.0.1:8080/get-group?' + searchParams,
    {
      method: 'GET',

      headers: {
        Authorization: `Bearer ${session?.idToken}`,
      },
    }
  )
  const group = (await response.json())[0]
  const groupParsed = JSON.parse(group.data.S)
  groupParsed['groupId'] = group.PK.S

  return groupParsed
}

export default getGroup
