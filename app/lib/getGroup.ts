'use server'
const getGroup = async (groupId: string) => {
  const paramsObj = { 'group-id': groupId }
  const searchParams = new URLSearchParams(paramsObj)

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/get-group?${searchParams}`,
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
