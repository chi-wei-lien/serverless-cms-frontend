'use client'
import { UseFieldArrayRemove, UseFormRegister } from 'react-hook-form'

import { Field, FormValues } from '../types/field'

interface FieldTableViewParam {
  register: UseFormRegister<FormValues>
  fields: Field[]
  remove: UseFieldArrayRemove
}

const NoFieldMessage = (
  <tr>
    <td colSpan={5}>
      There are currently no fields yet! Create one by using the &quot;Create
      Field&quot; button above.
    </td>
  </tr>
)

const FieldTableView = ({ register, fields, remove }: FieldTableViewParam) => {
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
        {fields.length == 0 && NoFieldMessage}
        {fields.map((field, index) => {
          return (
            <tr key={index + 1}>
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
                  <option>date</option>
                </select>
              </td>
              <td>
                <button
                  className="btn btn-danger"
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
