'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import getPosts from '@/app/lib/getPosts'
import { Post } from '@/app/types/field'

const NoPostMessage = (
  <tr>
    <td colSpan={4}>
      There are currently no posts yet! Create one by using the &quot;Create
      Post&quot; button above.
    </td>
  </tr>
)

interface PostGroupProps {
  params: { 'group-id': string }
}

const PostGroup = ({ params }: PostGroupProps) => {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<Post[]>([])

  const fetchPosts = async () => {
    const posts = await getPosts(params['group-id'], session)
    setPosts(posts)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="shadow p-3 mb-5 rounded">
        <h3>Posts</h3>
        <div className="d-flex justify-content-end">
          <a
            href={`/create-post/${params['group-id']}`}
            className="btn btn-dark mt-2"
          >
            Create Post
          </a>
        </div>
        <div className="mt-3" style={{ width: '800px' }}>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Post Id</th>
                <th scope="col">Last Modified</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.length == 0 && NoPostMessage}
              {posts.map((post, index) => {
                return (
                  <tr key={index + 1}>
                    <th scope="row">{index + 1}</th>
                    <td>{post.postId}</td>
                    <td>{post.createdOn.substring(0, 10)}</td>
                    <td>
                      <a
                        href={post.editUrl}
                        className="btn btn-dark"
                        type="button"
                      >
                        edit
                      </a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PostGroup
