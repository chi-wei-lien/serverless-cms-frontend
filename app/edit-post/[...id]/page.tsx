'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import PostTableView from '@/app/components/PostTableView'
import decodeUrlString from '@/app/lib/decodeUrl'
import editPost from '@/app/lib/editPost'
import getPost from '@/app/lib/getPost'

import FieldJsonView from '../../components/FieldJsonView'
import { Post, PostFormValues } from '../../types/field'

interface CreatePostProps {
  params: { id: string[] }
}

const EditPost = ({ params }: CreatePostProps) => {
  const { data: session } = useSession()

  const [view, setView] = useState('tableView')
  const [post, setPost] = useState<Post>()
  const router = useRouter()
  const groupId = decodeUrlString(params['id'][0])
  const postId = decodeUrlString(params['id'][1])

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
    const callbackUrl = `/post-group/${groupId}`
    editPost(groupId, postId, formData, router, callbackUrl, session, true)
  }

  const fetchPost = async () => {
    const post = await getPost(groupId, postId, session)
    setValue('fields', post.fieldWithContent)
    setPost(post)
  }

  useEffect(() => {
    fetchPost()
  }, [])

  const watchField = watch('fields')

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="shadow p-3 mb-5 rounded">
        <h3>Edit Post</h3>
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

export default EditPost