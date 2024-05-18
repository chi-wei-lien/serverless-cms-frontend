export interface Field {
  name: string
  dataType: string
}

export type FormValues = {
  groupName: string
  fields: Field[]
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
}
