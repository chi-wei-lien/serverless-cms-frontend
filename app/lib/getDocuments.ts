'use server'
import { getServerSession } from 'next-auth/next'

import { Document } from '../types/field'
import authOptions from './auth'

const getDocuments = async () => {
  const session = await getServerSession(authOptions)

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/list-bucket-items`,
    {
      method: 'GET',
      next: {
        revalidate: 0,
        tags: ['documents'],
      },
      headers: {
        Authorization: `Bearer ${session?.idToken}`,
        'Content-Type': 'application/json',
      },
    }
  )

  const data = await response.json()
  const documents = data as Document[]
  for (const document of documents) {
    const paramsObj = {
      key: document.key,
    }
    const searchParams = new URLSearchParams(paramsObj)
    document.link = `${process.env.NEXT_PUBLIC_APP_URL}/api/get-document?${searchParams}`
  }
  return documents
}

export default getDocuments
