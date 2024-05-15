'use client'
import { useState } from 'react'

import { Field } from '../types/field'

interface FieldJsonViewProps {
  fields: Field[]
}

const FieldJsonView = ({ fields }: FieldJsonViewProps) => {
  const createJsonString = () => {
    let jsonString = JSON.stringify(fields, null, '\t')
    return jsonString
  }

  const [jsonString, setJsonString] = useState(createJsonString())

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="form-group">
        <label>Json Table Schema</label>
        <textarea
          style={{ width: '800px', height: '500px' }}
          className="form-control"
          name="jsonTableSchema"
          value={jsonString}
          readOnly
        />
      </div>
    </div>
  )
}

export default FieldJsonView
