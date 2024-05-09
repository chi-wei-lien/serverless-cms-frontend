'use client'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function HomePage() {
  return (
    <div className="w-full">
      <div className="d-flex justify-content-center">
        <Link href="signin" className="btn btn-light m-1">
          sign in
        </Link>
        <button
          type="button"
          className="btn btn-dark m-1"
          onClick={() => {
            redirect('/signin')
          }}
        >
          sign up
        </button>
      </div>
      <div className="d-flex justify-content-center">
        <div className="mt-5">
          <h3>What is Serverless CMS?</h3>
          <p></p>
          <h3>Motivation?</h3>
          <p></p>
          <h3>How to use?</h3>
          <p></p>
        </div>
      </div>
    </div>
  )
}
