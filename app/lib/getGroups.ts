'use server'
import { Group } from '../types/field'

const getGroups = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/get-groups`,
    {
      method: 'GET',
      next: {
        tags: ['groups'],
      },
    }
  )
  const groups = (await response.json()) as Group[]
  for (const group of groups) {
    group.editUrl = `/edit-group/${group.groupId}`
    group.postUrl = `/group/${group.groupId}`
  }
  return groups
}

export default getGroups
