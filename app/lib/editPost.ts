'use server'
import { revalidateTag } from 'next/cache'
import { Session } from 'next-auth'

import { PostFormValues } from '../types/field'

const editPost = async (
  groupId: string,
  postId: string,
  formData: PostFormValues,
  session: Session | null,
  update: Boolean
) => {
  let fieldString = '['
  for (let i = 0; i < formData.fields.length; i += 1) {
    fieldString += JSON.stringify(formData.fields[i])
    if (i != formData.fields.length - 1) {
      fieldString += ','
    }
  }
  fieldString += ']'

  const data = {
    postId: postId,
    fields: fieldString,
    groupId: groupId,
    createdOn: new Date().toISOString(),
  }

  const url = update
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/update-post`
    : `${process.env.NEXT_PUBLIC_BACKEND_URL}/add-post`

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${session?.idToken}`,
      'Content-Type': 'application/json',
    },
  })
  const responseData = await response.json()
  revalidateTag('posts')
}

export default editPost
