'use client'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import FieldJsonView from '../components/FieldJsonView'
import FieldTableView from '../components/FieldTableView'
import { FormValues } from '../types/field'

const CreatePostGroup = () => {
  const { data: session } = useSession()

  const [view, setView] = useState('tableView')

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      groupName: '',
      fields: [],
    },
    mode: 'onBlur',
  })
  const { fields, append, remove } = useFieldArray({
    name: 'fields',
    control,
  })

  const onSubmit = async (formData: FormValues) => {
    const isoDateString = new Date().toISOString()
    let fieldString = '['
    for (let i = 0; i < formData.fields.length; i += 1) {
      fieldString += JSON.stringify(formData.fields[i])
      if (i != formData.fields.length - 1) {
        fieldString += ','
      }
    }
    const data = {
      groupName: formData.groupName,
      fields: fieldString,
      groupId: `group-${isoDateString}`,
    }
    const response = await fetch(
      'http://127.0.0.1:8080/add-group-to-post-list',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${session?.idToken}`,
        },
      }
    )
    const responseData = await response.json()
  }

  const watchField = watch('fields')

  function createField() {
    append({
      name: '',
      dataType: 'string',
    })
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="shadow p-3 mb-5 rounded">
        <h3>Create Post Group</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="mt-2">Post Group Name</label>
          <input
            className="mt-3 form-control"
            placeholder="My New Post Group"
            {...register(`groupName` as const, {
              required: true,
            })}
          />
          <label className="mt-3">Post Group Schema</label>
          <ul className="nav nav-tabs mt-3">
            <li className="nav-item">
              <button
                className={'nav-link ' + (view == 'tableView' ? 'active' : '')}
                onClick={(e) => {
                  e.preventDefault()
                  setView('tableView')
                }}
              >
                Table View
              </button>
            </li>
            <li className="nav-item">
              <button
                className={'nav-link ' + (view == 'jsonView' ? 'active' : '')}
                onClick={(e) => {
                  e.preventDefault()
                  setView('jsonView')
                }}
              >
                JSON View
              </button>
            </li>
            <li className="nav-item ms-auto">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault()
                  createField()
                }}
              >
                Create Field
              </button>
            </li>
          </ul>
          <div className="" style={{ width: '800px' }}>
            {view == 'tableView' && (
              <FieldTableView
                fields={fields}
                register={register}
                remove={remove}
              />
            )}
            {view == 'jsonView' && <FieldJsonView fields={watchField} />}
            <div className="mt-4">
              <Link href="/dashboard" className="btn btn-secondary">
                cancel
              </Link>
              <input
                type="submit"
                className="btn btn-primary ms-2"
                value="save"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePostGroup
