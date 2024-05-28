'use server'
import { revalidateTag } from 'next/cache'
import { Session } from 'next-auth'

const deleteGroup = async (groupId: string, session: Session | null) => {
  const paramsObj = {
    'group-id': groupId,
  }
  const searchParams = new URLSearchParams(paramsObj)

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/delete-group?${searchParams}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.idToken}`,
    },
  })

  const responseData = await response.json()
  revalidateTag('groups')
}

export default deleteGroup
