'use server'
import { Group } from '../types/field'

const getGroups = async () => {
  const response = await fetch('http://localhost:3000/api/get-groups', {
    method: 'GET',
    next: {
      tags: ['groups'],
    },
  })
  const groups = (await response.json()) as Group[]
  for (const group of groups) {
    group.editUrl = `/edit-post-group/${group.groupId}`
    group.postUrl = `/post-group/${group.groupId}`
  }
  return groups
}

export default getGroups
