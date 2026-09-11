'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

// This is a secret key only the server knows. 
// If a hacker doesn't have this, they can't forge a "wristband".
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 Days
  
  // 1. Create the JWT (The signed note)
  const session = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey) // QUESTION 1: What do we sign this with to keep it secret?

  // 2. Store the JWT in a Cookie
  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true, // Security: Prevents JS from reading the cookie
    secure: true,
    expires: expiresAt,
    sameSite: 'lax', 
    path: '/',
  })
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    return null // If the token is fake or expired, return nothing
  }
}

export async function deleteSession() {
  const cookieStore = await cookies() // QUESTION 2: Where do we get the cookies from to delete them?
  cookieStore.delete('session')
}

