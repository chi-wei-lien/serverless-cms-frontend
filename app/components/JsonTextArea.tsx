'use client'
import { useSession } from 'next-auth/react'
import { FormEvent } from 'react'

const JsonTextArea = () => {
  const { data: session } = useSession()

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const response = await fetch(
      'https://z8ehdqjo22.execute-api.us-east-1.amazonaws.com/Stage/create-table',
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${session?.idToken}`,
        },
      }
    )

    const data = await response.json()
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Json Table Schema</label>
          <textarea className="form-control" name="jsonTableSchema"></textarea>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default JsonTextArea
