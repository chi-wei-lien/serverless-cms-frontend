'use client'

import { useSession } from 'next-auth/react'
import { ChangeEvent, useRef, useState } from 'react'

import deleteDocument from '../lib/deleteDocument'
import getPresignedUrl from '../lib/getPresignedUrl'
import revalidateDocuments from '../lib/revalidateDocuments'
import { Document } from '../types/field'

interface DocumentDashboardProps {
  documents: Document[]
}

const NoDocumentMessage = (
  <tr>
    <td colSpan={4}>
      There are currently no document yet! Create one by using the &quot;Create
      document&quot; button above.
    </td>
  </tr>
)

const DocumentDashboard = ({ documents }: DocumentDashboardProps) => {
  const { data: session } = useSession()

  const [editMode, setEditMode] = useState(false)

  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const onAddDocuments = () => {
    hiddenFileInput.current?.click()
  }

  const uploadToPresignedUrl = async (presignedUrl: string, document: File) => {
    const result = await fetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'x-amz-server-side-encryption': 'AES256',
      },
      body: document,
    })
  }

  const handleAddDocuments = async (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(
      (event.target as HTMLInputElement).files || []
    )

    const files = uploadedFiles.map(async (file) => {
      const presignedUrl = await getPresignedUrl(file.name, session)
      await uploadToPresignedUrl(presignedUrl, file)
    })
    await revalidateDocuments()

    if (hiddenFileInput.current) {
      hiddenFileInput.current.value = ''
    }
    revalidateDocuments
  }

  return (
    <div>
      <div className="d-flex justify-content-end">
        {!editMode && (
          <button
            className="btn btn-dark mt-2"
            onClick={() => {
              setEditMode(true)
            }}
          >
            Edit
          </button>
        )}
        {editMode && (
          <div>
            <button
              className="btn btn-light"
              onClick={() => {
                setEditMode(false)
              }}
            >
              Done
            </button>
            <button
              className="btn btn-dark ms-2"
              onClick={() => {
                onAddDocuments()
              }}
            >
              Add Document
            </button>
            <input
              ref={hiddenFileInput}
              type="file"
              multiple
              onChange={handleAddDocuments}
              className="d-none"
            />
          </div>
        )}
      </div>
      <div className="mt-3" style={{ width: '800px' }}>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Key</th>
              <th scope="col">Type</th>
              {editMode && <th scope="col">Action</th>}
              {!editMode && <th scope="col">Link</th>}
            </tr>
          </thead>
          <tbody>
            {documents.map((document, index) => {
              return (
                <tr key={index + 1}>
                  <th scope="row">{index + 1}</th>
                  <td>{document.key}</td>
                  <td>{document.type}</td>
                  <td>
                    {editMode && (
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => {
                          deleteDocument(document.key, session)
                        }}
                      >
                        DELETE
                      </button>
                    )}
                    {!editMode && (
                      <a
                        href="#"
                        className="pe-auto"
                        onClick={() => {
                          navigator.clipboard.writeText(document.link)
                        }}
                      >
                        {document.link}
                        <i className="bi bi-copy ms-2"></i>
                      </a>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DocumentDashboard
