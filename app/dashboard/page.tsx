import Link from 'next/link'

import Documentation from '../components/Documentation'
import getGroups from '../lib/getGroups'

const NoGroupMessage = (
  <tr>
    <td colSpan={4}>
      There are currently no groups yet! Create one by using the &quot;Create
      Post Group&quot; button above.
    </td>
  </tr>
)

const replacer = (key: string, value: string) => {
  if (key == 'editUrl') return undefined
  else if (key == 'postUrl') return undefined
  else return value
}

const DashboardPage = async () => {
  const sampleRequest =
    `const response = await fetch('http://localhost:3000/api/get-groups', {\n` +
    "\tmethod: 'GET'\n" +
    '})\n' +
    'const data = await response.json()\n'
  const groups = await getGroups()
  const sampleResponse = JSON.stringify(groups, replacer, '\t')

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
        <Documentation
          sampleRequest={sampleRequest}
          sampleResponse={sampleResponse}
        />
      </div>
    </div>
  )
}

export default DashboardPage
