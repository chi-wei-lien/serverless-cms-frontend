import { Session } from 'next-auth'
import { Account } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CognitoProvider from 'next-auth/providers/cognito'

interface JwtCallbackParam {
  account: Account | null
  token: JWT
}

interface SessionnCallbackParam {
  session: Session
  token: JWT
}

const authOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID as string,
      clientSecret: process.env.COGNITO_CLIENT_SECRET as string,
      issuer: process.env.COGNITO_ISSUER as string,
      idToken: true,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ account, token }: JwtCallbackParam) {
      if (account) {
        token.idToken = account?.id_token
      }
      return token
    },
    async session({ session, token }: SessionnCallbackParam) {
      session.idToken = token.idToken
      return session
    },
  },
}

export default authOptions
