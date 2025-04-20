import { createAuthClient } from "better-auth/react"
import { getSessionCookie } from "better-auth/cookies"
import { NextRequest } from "next/server"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
})

export const getSession = async (request: NextRequest) => {
    return await getSessionCookie(request)
}