// eslint-disable-next-line unused-imports/no-unused-imports
import NextAuth from 'next-auth'

declare module 'next-auth/jwt' {
  // type return by the jwt callback function in next auth's authOptions
  interface JWT {
    idToken?: string
  }
}

declare module 'next-auth' {
  // type return by the session callback function in next auth's authOptions
  interface Session {
    idToken: string | undefined
  }
}
