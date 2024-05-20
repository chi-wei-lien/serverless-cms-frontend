'use client'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import Documentation from '@/app/components/Documentation'
import PostTableView from '@/app/components/PostTableView'
import decodeUrlString from '@/app/lib/decodeUrlString'
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
  const [ready, setReady] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [sampleRequest, setSampleRequest] = useState('')
  const [sampleResponse, setSampleResponse] = useState('')
  const callbackUrl = `/post-group/${groupId}`

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
    setSubmitting(true)
    editPost(groupId, postId, formData, router, callbackUrl, session, true)
  }

  const prepareDoc = async () => {
    const paramsObj = {
      'group-id': groupId,
      'post-id': postId,
    }
    const searchParams = new URLSearchParams(paramsObj)

    const apiUrl = window.location.hostname + '/api/get-post?' + searchParams
    const response = await fetch('/api/get-post?' + searchParams, {
      method: 'GET',
    })
    setSampleRequest(
      `const response = await fetch('${apiUrl}', {
  method: 'GET'
})
const data = await response.json()`
    )
    setSampleResponse(JSON.stringify(await response.json(), null, '\t'))
  }

  const setup = async () => {
    const post = await getPost(groupId, postId, session)
    setValue('fields', post.fieldWithContent)
    setPost(post)
    prepareDoc()
    setReady(true)
  }

  useEffect(() => {
    setup()
  }, [])

  const watchField = watch('fields')

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="shadow p-3 mb-5 rounded">
        <h3 className="text-center">Edit Post</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="mt-3">Post Content</label>
          <ul className="nav nav-tabs mt-3">
            <li className="nav-item">
              <button
                className={
                  'nav-link ' +
                  (view == 'tableView' ? 'active text-black' : 'text-secondary')
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
          </ul>
          <div className="" style={{ width: '800px' }}>
            {view == 'tableView' && (
              <PostTableView
                ready={ready}
                fields={fields}
                register={register}
              />
            )}
            {view == 'jsonView' && <FieldJsonView fields={watchField} />}
            <div className="mt-4">
              <button
                onClick={() => {
                  router.push(callbackUrl)
                }}
                className="btn btn-light"
                disabled={submitting}
              >
                cancel
              </button>
              <input
                type="submit"
                className="btn btn-dark ms-2"
                disabled={submitting}
                value={submitting ? 'updating' : 'update'}
              />
            </div>
          </div>
        </form>
        <Documentation
          sampleRequest={sampleRequest}
          sampleResponse={sampleResponse}
        />
      </div>
    </div>
  )
}

export default EditPost
