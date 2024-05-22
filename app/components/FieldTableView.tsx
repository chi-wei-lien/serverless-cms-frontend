'use client'
import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormRegister,
} from 'react-hook-form'

import { GroupFormValues } from '../types/field'

interface FieldTableViewParam {
  register: UseFormRegister<GroupFormValues>
  fields: FieldArrayWithId<GroupFormValues, 'fields', 'id'>[]
  remove: UseFieldArrayRemove
  ready: Boolean
}

const LoadingMessage = (
  <tr>
    <td colSpan={4}>
      <div className="w-1 d-flex justify-content-center">
        <div className="spinner-border" role="status" />
      </div>
    </td>
  </tr>
)

const NoFieldMessage = (
  <tr>
    <td colSpan={5}>
      There are currently no fields yet! Create one by using the &quot;Create
      Field&quot; button above.
    </td>
  </tr>
)

const FieldTableView = ({
  register,
  fields,
  remove,
  ready,
}: FieldTableViewParam) => {
  return (
    <table className="table">
      <thead className="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Field Name</th>
          <th scope="col">Data Type</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {!ready && LoadingMessage}
        {ready && fields.length == 0 && NoFieldMessage}
        {fields.map((field, index) => {
          return (
            <tr key={field.id + 1}>
              <th scope="row">{index + 1}</th>
              <td>
                <input
                  className="form-control"
                  {...register(`fields.${index}.name` as const, {
                    required: true,
                  })}
                ></input>
              </td>
              <td>
                <select
                  id="inputState"
                  className="form-select"
                  {...register(`fields.${index}.dataType` as const, {
                    required: true,
                  })}
                >
                  <option>string</option>
                  <option>long text</option>
                  <option>date</option>
                </select>
              </td>
              <td>
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => remove(index)}
                >
                  DELETE
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default FieldTableView
