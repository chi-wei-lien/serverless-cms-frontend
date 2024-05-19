'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import FieldJsonView from '../components/FieldJsonView'
import FieldTableView from '../components/FieldTableView'
import editGroup from '../lib/editGroup'
import { FormValues } from '../types/field'

const CreatePostGroup = () => {
  const { data: session } = useSession()
  const [view, setView] = useState('tableView')
  const router = useRouter()

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
    const groupId = `group-${isoDateString}`
    editGroup(groupId, formData, router, session, false)
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
                className={
                  'nav-link ' +
                  (view == 'jsonView' ? 'text-secondary' : 'active text-dark')
                }
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
                className={
                  'nav-link ' +
                  (view == 'jsonView' ? 'active text-dark' : 'text-secondary')
                }
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
                className="btn btn-dark"
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
                ready={true}
                fields={fields}
                register={register}
                remove={remove}
              />
            )}
            {view == 'jsonView' && <FieldJsonView fields={watchField} />}
            <div className="mt-4">
              <Link href="/dashboard" className="btn btn-light">
                cancel
              </Link>
              <input type="submit" className="btn btn-dark ms-2" value="save" />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePostGroup
