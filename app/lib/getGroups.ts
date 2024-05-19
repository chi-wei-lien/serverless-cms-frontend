import { Session } from 'next-auth'

import { PostGroup, PostGroupResponse } from '../types/field'

const getGroups = async (session: Session | null) => {
  const response = await fetch('http://127.0.0.1:8080/get-groups', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.idToken}`,
    },
  })
  const groups = (await response.json()) as PostGroupResponse[]
  const groupParsed: PostGroup[] = []
  for (const group of groups) {
    const groupObj = JSON.parse(group.data.S)
    groupObj['groupId'] = group.PK.S
    groupObj['editUrl'] = `/edit-post-group/${groupObj.groupId}`
    groupObj['postUrl'] = `/post-group/${groupObj.groupId}`
    groupParsed.push(groupObj)
  }

  return groupParsed
}

export default getGroups
