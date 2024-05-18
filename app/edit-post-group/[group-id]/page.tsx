'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import editGroup from '@/app/lib/editGroup'

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
    const paramsObj = { 'group-id': params['group-id'] }
    const searchParams = new URLSearchParams(paramsObj)

    const response = await fetch(
      'http://127.0.0.1:8080/get-group?' + searchParams,
      {
        method: 'GET',

        headers: {
          Authorization: `Bearer ${session?.idToken}`,
        },
      }
    )
    const group = (await response.json())[0]
    console.log(group)
    const groupParsed = JSON.parse(group.data.S)
    groupParsed['groupId'] = group.PK.S
    setGroup(groupParsed)
    console.log(groupParsed.fields)
    const fields = JSON.parse(groupParsed.fields)
    setValue('groupName', groupParsed.groupName)

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
