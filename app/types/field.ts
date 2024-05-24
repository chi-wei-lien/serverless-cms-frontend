export interface Field {
  name: string
  dataType: string
}

export interface FieldWithContent {
  name: string
  dataType: string
  content: string
}

export type GroupFormValues = {
  groupName: string
  fields: Field[]
}

export type Document = {
  key: string
  link: string
  type: string
  data?: File | null
}

export type PostFormValues = {
  fields: FieldWithContent[]
}

export type DocumentFormValues = {
  documents: Document[]
}

export type DynamodbResponse = {
  PK: {
    S: string
  }
  SK: {
    S: string
  }
  data: {
    S: string
  }
}

export type Group = {
  groupId: string
  groupName: string
  createdOn: string
  fields: string
  editUrl?: string
  postUrl?: string
}

export type Post = {
  postId: string
  createdOn: string
  data: FieldWithContent[]
  editUrl?: string
}
