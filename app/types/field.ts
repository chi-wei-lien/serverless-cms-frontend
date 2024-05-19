export interface Field {
  name: string
  dataType: string
}

export interface FieldWithContent {
  name: string
  dataType: string
  content: string
}

export type FormValues = {
  groupName: string
  fields: Field[]
}

export type PostFormValues = {
  fields: FieldWithContent[]
}

export type PostGroupResponse = {
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

export type PostGroup = {
  groupName: string
  createdOn: string
  fields: string
  groupId: string
  editUrl: string
  postUrl: string
}

export type Post = {
  postId: string
  createdOn: string
  fieldWithContent: FieldWithContent[]
  editUrl: string
}
