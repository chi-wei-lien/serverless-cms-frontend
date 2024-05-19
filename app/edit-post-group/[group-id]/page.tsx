'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import editGroup from '@/app/lib/editGroup'
import getGroup from '@/app/lib/getGroup'

import FieldJsonView from '../../components/FieldJsonView'
import FieldTableView from '../../components/FieldTableView'
import { FormValues, PostGroup } from '../../types/field'

interface EditPostGroupProps {
  params: { 'group-id': string }
}

const EditPostGroup = ({ params }: EditPostGroupProps) => {
  const { data: session } = useSession()

  const [view, setView] = useState('tableView')
  const router = useRouter()

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
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

  const [group, setGroup] = useState<PostGroup>()

  useEffect(() => {
    fetchGroup()
  }, [])

  const fetchGroup = async () => {
    const group = await getGroup(params['group-id'], session)
    setGroup(group)
    const fields = JSON.parse(group.fields)
    setValue('groupName', group.groupName)
    setValue('fields', fields)
  }

  const onSubmit = async (formData: FormValues) => {
    const groupId = decodeURIComponent(
      (params['group-id'] + '').replace(/\+/g, '%20')
    )
    editGroup(groupId, formData, router, session, true)
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
        <h3>Edit Post Group</h3>
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
                  (view == 'jsonView' ? 'active text-secondary' : 'text-black')
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
                  (view == 'jsonView' ? 'active text-black' : 'text-secondary')
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
              <input
                type="submit"
                className="btn btn-dark ms-2"
                value="update"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPostGroup
