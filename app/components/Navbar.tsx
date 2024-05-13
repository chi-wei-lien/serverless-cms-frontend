'use client'
import Link from 'next/link'

import SignInUpOut from './SignInUpOut'

const Navbar = () => {
  return (
    <div className="d-flex justify-content-center">
      <Link href="/" className="btn btn-light m-1">
        Home
      </Link>
      <Link href="/dashboard" className="btn btn-light m-1">
        Dashboard
      </Link>
      <SignInUpOut />
    </div>
  )
}

export default Navbar
