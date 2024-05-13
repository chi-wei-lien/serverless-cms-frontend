'use client'
import { signIn, signOut, useSession } from 'next-auth/react'

const SignInUpOut = () => {
  const { data: session } = useSession()

  if (session) {
    return (
      <button onClick={() => signOut()} className="btn btn-dark m-1">
        sign out
      </button>
    )
  }

  return (
    <button onClick={() => signIn('cognito')} className="btn btn-dark m-1">
      sign in
    </button>
  )
}

export default SignInUpOut
