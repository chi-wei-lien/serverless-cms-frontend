import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { Session } from 'next-auth'

import { PostFormValues } from '../types/field'

const editPost = async (
  groupId: string,
  postId: string,
  formData: PostFormValues,
  router: AppRouterInstance,
  callbackUrl: string,
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
    ? 'http://127.0.0.1:8080/update-post'
    : 'http://127.0.0.1:8080/add-post'

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${session?.idToken}`,
    },
  })
  const responseData = await response.json()
  router.push(callbackUrl)
}

export default editPost
