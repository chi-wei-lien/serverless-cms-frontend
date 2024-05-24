import { ChangeEvent, useRef } from 'react'
import { Control, useFieldArray } from 'react-hook-form'

import { PostFormValues } from '../types/field'

interface UploadImagesParam {
  control: Control<PostFormValues, any>
}

const UploadImages = ({ control }: UploadImagesParam) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'images',
  })

  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const onAddDocuments = () => {
    hiddenFileInput.current?.click()
  }

  const handleAddDocuments = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(
      (event.target as HTMLInputElement).files || []
    )

    const files = uploadedFiles.map((file) => {
      append({
        data: file,
        name: file.name,
      })
    })

    if (hiddenFileInput.current) {
      hiddenFileInput.current.value = ''
    }
  }

  return (
    <>
      <input
        ref={hiddenFileInput}
        type="file"
        multiple
        onChange={handleAddDocuments}
        className="d-none"
      />

      <button
        onClick={(e) => {
          e.preventDefault()
          onAddDocuments()
        }}
        className="btn btn-secondary ms-4 mb-4"
      >
        Add documents
      </button>

      {fields.map((image, index) => (
        <div key={image.id}>
          {image.name}
          <button
            onClick={() => remove(index)}
            className="btn btn-secondary ms-4"
          >
            remove
          </button>
        </div>
      ))}
    </>
  )
}

export default UploadImages
