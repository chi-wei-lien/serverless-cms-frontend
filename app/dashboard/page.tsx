'use client'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'

import getGroups from '../lib/getGroups'
import { PostGroup } from '../types/field'

const NoGroupMessage = (
  <tr>
    <td colSpan={4}>
      There are currently no groups yet! Create one by using the &quot;Create
      Post Group&quot; button above.
    </td>
  </tr>
)

const LoadingMessage = (
  <tr>
    <td colSpan={4}>
      <div className="w-1 d-flex justify-content-center">
        <div className="spinner-border" role="status" />
      </div>
    </td>
  </tr>
)

const DashboardPage = () => {
  const { data: session } = useSession()
  const [groups, setGroups] = useState<PostGroup[]>([])
  const [ready, setReady] = useState(false)
  const [sampleRequest, setSampleRequest] = useState('')
  const [sampleResponse, setSampleResponse] = useState('')

  const prepareDoc = async () => {
    const response = await fetch('/api/get-groups', {
      method: 'GET',
    })
    setSampleRequest(
      "const response = await fetch('/api/get-groups', {\n" +
        "\tmethod: 'GET'\n" +
        '})\n' +
        'const data = await response.json()\n'
    )
    setSampleResponse(JSON.stringify(await response.json(), null, '\t'))
  }

  const setup = async () => {
    const groups = await getGroups(session)
    setGroups(groups)
    prepareDoc()
    setReady(true)
  }

  useEffect(() => {
    setup()
  }, [])

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="shadow p-3 mb-5 rounded">
        <h3 className="text-center">Post Groups</h3>
        <div className="d-flex justify-content-end">
          <Link href="/create-post-group" className="btn btn-dark mt-2">
            Create Post Group
          </Link>
        </div>
        <div className="mt-3" style={{ width: '800px' }}>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Group Name</th>
                <th scope="col">Last Modified</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {!ready && LoadingMessage}
              {ready && groups.length == 0 && NoGroupMessage}
              {groups.map((group, index) => {
                return (
                  <tr key={index + 1}>
                    <th scope="row">{index + 1}</th>
                    <td>{group.groupName}</td>
                    <td>{group.createdOn.substring(0, 10)}</td>
                    <td>
                      <a
                        href={group.editUrl}
                        className="btn btn-light"
                        type="button"
                      >
                        edit
                      </a>
                      <a
                        href={group.postUrl}
                        className="btn btn-dark ms-2"
                        type="button"
                      >
                        posts
                      </a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <h3 className="text-center mt-5">Documentation</h3>
        <div>Sample Request (Node.js)</div>
        <SyntaxHighlighter language="javascript">
          {sampleRequest}
        </SyntaxHighlighter>
        Sample Response (json)
        <SyntaxHighlighter language="json">{sampleResponse}</SyntaxHighlighter>
      </div>
    </div>
  )
}

export default DashboardPage
