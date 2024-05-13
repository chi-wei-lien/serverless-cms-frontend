'use client'
import { useSession } from 'next-auth/react'

import JsonTextArea from '../components/JsonTextArea'

const DashboardPage = () => {
  const { data: session } = useSession()

  async function onClick() {
    const response = await fetch(
      'https://3utbpmwz99.execute-api.us-east-1.amazonaws.com/Stage/gen-presigned-url',
      {
        headers: {
          Authorization: `Bearer ${session?.idToken}`,
        },
        method: 'GET',
      }
    )

    const data = await response.json()
  }
  return (
    <div>
      <JsonTextArea />
      <button
        onClick={() => {
          onClick()
        }}
        className="btn btn-dark"
      >
        test
      </button>
    </div>
  )
}

export default DashboardPage
