import Documentation from '@/app/components/Documentation'
import decodeUrlString from '@/app/lib/decodeUrlString'
import getPosts from '@/app/lib/getPosts'

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

const replacer = (key: string, value: string) => {
  if (key == 'editUrl') return undefined
  else return value
}

const PostGroup = async ({ params }: PostGroupProps) => {
  const groupId = decodeUrlString(params['group-id'])
  const paramsObj = { 'group-id': groupId }
  const searchParams = new URLSearchParams(paramsObj)
  const apiUrl = 'http://localhost:3000/api/get-posts?' + searchParams
  const sampleRequest = `const response = await fetch('${apiUrl}', {
  method: 'GET'
})
const data = await response.json()`
  const posts = await getPosts(groupId)
  const sampleResponse = JSON.stringify(posts, replacer, '\t')

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="shadow p-3 mb-5 rounded">
        <h3 className="text-center">Posts</h3>
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
        <Documentation
          sampleRequest={sampleRequest}
          sampleResponse={sampleResponse}
        />
      </div>
    </div>
  )
}

export default PostGroup
