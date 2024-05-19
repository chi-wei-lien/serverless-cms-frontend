'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import PostTableView from '@/app/components/PostTableView'
import editPost from '@/app/lib/editPost'
import getGroup from '@/app/lib/getGroup'

import FieldJsonView from '../../components/FieldJsonView'
import { FieldWithContent, PostFormValues, PostGroup } from '../../types/field'

interface CreatePostProps {
  params: { 'group-id': string }
}

const CreatePost = ({ params }: CreatePostProps) => {
  const { data: session } = useSession()

  const [view, setView] = useState('tableView')
  const [group, setGroup] = useState<PostGroup>()
  const router = useRouter()

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PostFormValues>({
    defaultValues: {
      fields: [],
    },
    mode: 'onBlur',
  })
  const { fields } = useFieldArray({
    name: 'fields',
    control,
  })

  const onSubmit = async (formData: PostFormValues) => {
    const isoDateString = new Date().toISOString()
    const groupId = decodeURIComponent(
      (params['group-id'] + '').replace(/\+/g, '%20')
    )
    const postId = `post-${isoDateString}`
    const callbackUrl = `/post-group/${groupId}`
    editPost(groupId, postId, formData, router, callbackUrl, session, false)
  }

  const fetchGroup = async () => {
    const group = await getGroup(params['group-id'], session)
    setGroup(group)
    const fields = JSON.parse(group.fields) as FieldWithContent[]
    setValue('fields', fields)
  }

  useEffect(() => {
    fetchGroup()
  }, [])

  const watchField = watch('fields')

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="shadow p-3 mb-5 rounded">
        <h3>Create Post</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="mt-3">Post Content</label>
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
          </ul>
          <div className="" style={{ width: '800px' }}>
            {view == 'tableView' && (
              <PostTableView fields={fields} register={register} />
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

export default CreatePost
