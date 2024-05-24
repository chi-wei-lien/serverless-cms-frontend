import { Control, UseFormRegister } from 'react-hook-form'

import { PostFormValues } from '../types/field'

interface FormDataTypeSelectorProps {
  register: UseFormRegister<PostFormValues>
  index: number
  control: Control<PostFormValues, any>
  dataType: string
}

const FormDataTypeSelector = ({
  register,
  control,
  dataType,
  index,
}: FormDataTypeSelectorProps) => {
  if (dataType === 'date') {
    return (
      <input
        className="form-control"
        {...register(`fields.${index}.content` as const, {
          required: true,
        })}
        type="date"
      ></input>
    )
  }
  if (dataType === 'long text') {
    return (
      <textarea
        className="form-control"
        {...register(`fields.${index}.content` as const, {
          required: true,
        })}
      ></textarea>
    )
  }
  return (
    <input
      className="form-control"
      {...register(`fields.${index}.content` as const, {
        required: true,
      })}
    ></input>
  )
}

export default FormDataTypeSelector
