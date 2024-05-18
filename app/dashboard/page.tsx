'use client'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import { PostGroup, PostGroupResponse } from '../types/field'

const NoGroupMessage = (
  <tr>
    <td colSpan={4}>
      There are currently no groups yet! Create one by using the &quot;Create
      Post Group&quot; button above.
    </td>
  </tr>
)

const DashboardPage = () => {
  const { data: session } = useSession()
  const [groups, setGroups] = useState<PostGroup[]>([])

  const fetchGroups = async () => {
    const response = await fetch('http://127.0.0.1:8080/get-groups', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session?.idToken}`,
      },
    })
    const groups = (await response.json()) as PostGroupResponse[]
    const groupParsed: PostGroup[] = []
    for (const group of groups) {
      const groupObj = JSON.parse(group.data.S)
      groupObj['groupId'] = group.PK.S
      groupObj['editUrl'] = `/edit-post-group/${groupObj.groupId}`
      groupParsed.push(groupObj)
    }
    console.log(groupParsed)
    setGroups(groupParsed)
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="shadow p-3 mb-5 rounded">
        <h3>Post Groups</h3>
        <div className="d-flex justify-content-end">
          <Link href="/create-post-group" className="btn btn-primary mt-2">
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
              {groups.length == 0 && NoGroupMessage}
              {groups.map((group, index) => {
                return (
                  <tr key={index + 1}>
                    <th scope="row">{index + 1}</th>
                    <td>{group.groupName}</td>
                    <td>{group.createdOn.substring(0, 10)}</td>
                    <td>
                      <a
                        href={group.editUrl}
                        className="btn btn-primary"
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

export default DashboardPage
