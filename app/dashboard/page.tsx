import Link from 'next/link'

const DashboardPage = () => {
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
                <th scope="col">Field Name</th>
                <th scope="col">Data Type</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
