'use server'
import { revalidateTag } from 'next/cache'
import { Session } from 'next-auth'

import { GroupFormValues } from '../types/field'

const editGroup = async (
  groupId: string,
  formData: GroupFormValues,
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
    groupName: formData.groupName,
    fields: fieldString,
    groupId: groupId,
    createdOn: new Date().toISOString(),
  }

  const url = update
    ? 'http://127.0.0.1:8080/update-group'
    : 'http://127.0.0.1:8080/add-group'

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${session?.idToken}`,
      'Content-Type': 'application/json',
    },
  })
  const responseData = await response.json()
  revalidateTag('groups')
}

export default editGroup
