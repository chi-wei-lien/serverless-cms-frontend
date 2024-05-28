'use server'
import { revalidateTag } from 'next/cache'
import { Session } from 'next-auth'

const deleteDocument = async (key: string, session: Session | null) => {
  const paramsObj = { objectKey: key }
  const searchParams = new URLSearchParams(paramsObj)

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/delete-bucket-item?${searchParams}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.idToken}`,
    },
  })

  const responseData = await response.json()
  revalidateTag('documents')
}

export default deleteDocument
