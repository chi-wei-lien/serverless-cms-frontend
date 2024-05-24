import DocumentDashboard from '../components/DocumentDashboard'
import PostGroupDashboard from '../components/PostGroupDashboard'
import getDocuments from '../lib/getDocuments'

const DashboardPage = async () => {
  const documents = await getDocuments()

  return (
    <div>
      <div className="d-flex justify-content-center mt-4">
        <div className="shadow p-3 mb-5 rounded">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item" style={{ width: '832px' }}>
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <h3 className="text-center w-100">Post Groups</h3>
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <PostGroupDashboard />
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <h3 className="text-center w-100">Documents</h3>
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <DocumentDashboard documents={documents} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
