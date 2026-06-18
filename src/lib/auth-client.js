import { createAuthClient } from "better-auth/react"
// import { adminClient } from "better-auth/plugins";
export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    // plugins: [
    //     adminClient()
    // ]
})
export const {
    signIn,
    signOut,
    signUp,
    useSession,
} = authClient
