'use client'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import SignInUpOut from './SignInUpOut'

const Navbar = () => {
  const { data: session } = useSession()

  return (
    <div className="d-flex justify-content-center">
      <Link href="/" className="btn btn-light m-1">
        Home
      </Link>
      {session && (
        <Link href="/dashboard" className="btn btn-light m-1">
          Dashboard
        </Link>
      )}
      <SignInUpOut />
    </div>
  )
}

export default Navbar
