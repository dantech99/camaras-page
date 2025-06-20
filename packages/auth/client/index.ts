import { createAuthClient } from "better-auth/react"
import { getSessionCookie } from "better-auth/cookies"
import { adminClient, inferAdditionalFields, phoneNumberClient } from "better-auth/client/plugins"
import { NextRequest } from "next/server"
import type { auth } from "utils/auth"


export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    fetchOptions: {
        credentials: "include"
    },
    plugins: [
        inferAdditionalFields<typeof auth>(),
        adminClient(),
        phoneNumberClient(),
    ]
})

export const getSession = async (request: NextRequest) => {
    return await getSessionCookie(request)
}