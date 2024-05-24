'use server'

import { Session } from 'next-auth'

const getPresignedUrl = async (key: string, session: Session | null) => {
  const paramsObj = { objectKey: key }
  const searchParams = new URLSearchParams(paramsObj)

  const response = await fetch(
    'http://127.0.0.1:8080/gen-presigned-url?' + searchParams,
    {
      method: 'GET',
      next: {
        tags: ['documents'],
      },
      headers: {
        Authorization: `Bearer ${session?.idToken}`,
      },
    }
  )

  const url = (await response.json())['presigned URL']
  return url
}

export default getPresignedUrl
