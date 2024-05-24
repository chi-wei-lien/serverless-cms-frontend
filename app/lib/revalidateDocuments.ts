'use server'

import { revalidateTag } from 'next/cache'

const revalidateDocuments = async () => {
  revalidateTag('documents')
}

export default revalidateDocuments
