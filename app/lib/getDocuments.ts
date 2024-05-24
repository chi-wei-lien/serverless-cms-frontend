'use server'
import { Document } from '../types/field'

const getDocuments = async () => {
  const response = await fetch('http://127.0.0.1:8080/list-bucket-items', {
    method: 'GET',
    next: {
      tags: ['documents'],
    },
  })

  const documents = (await response.json()) as Document[]
  for (const document of documents) {
    const paramsObj = {
      key: document.key,
    }
    const searchParams = new URLSearchParams(paramsObj)
    document.link = `http://localhost:3000/api/get-document?${searchParams}`
  }
  return documents
}

export default getDocuments
