'use server'
const getGroup = async (groupId: string) => {
  const paramsObj = { 'group-id': groupId }
  const searchParams = new URLSearchParams(paramsObj)

  const response = await fetch(
    'http://localhost:3000/api/get-group?' + searchParams,
    {
      method: 'GET',
      next: {
        tags: ['groups'],
      },
    }
  )

  const group = await response.json()
  return group
}

export default getGroup
