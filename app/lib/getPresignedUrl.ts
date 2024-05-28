'use server'

import { Session } from 'next-auth'

const getPresignedUrl = async (key: string, session: Session | null) => {
  const paramsObj = { objectKey: key }
  const searchParams = new URLSearchParams(paramsObj)

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/gen-presigned-url?${searchParams}`,
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
