import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL
})
export const {
    signIn,
    signOut,
    signUp,
    useSession,
} = authClient

//2

// import { createAuthClient } from "better-auth/react";
// import { adminClient } from "better-auth/client/plugins";
// import { ac, userRole, writerRole, adminRole } from "./permissions";

// export const authClient = createAuthClient({
//     baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
//     plugins: [
//         adminClient({
//             ac,
//             roles: {
//                 user: userRole,
//                 writer: writerRole,
//                 admin: adminRole,
//             },
//         }),
//     ],
// });

// export const { signIn, signUp, signOut, useSession } = authClient;