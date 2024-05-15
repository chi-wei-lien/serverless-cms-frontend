export interface Field {
  name: string
  dataType: string
}

export type FormValues = {
  groupName: string
  fields: Field[]
}
