'use server'
import { revalidateTag } from 'next/cache'
import { Session } from 'next-auth'

const deleteDocument = async (key: string, session: Session | null) => {
  const paramsObj = { objectKey: key }
  const searchParams = new URLSearchParams(paramsObj)

  const url = `http://127.0.0.1:8080/remove-bucket-item?${searchParams}`

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
