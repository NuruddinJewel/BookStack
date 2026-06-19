// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { admin } from "better-auth/plugins";
// const client = new MongoClient(process.env.MONGODB_URI);
// const db = client.db(process.env.DB_NAME);

// export const auth = betterAuth({
//     database: mongodbAdapter(db, {
//         // Optional: if you don't provide a client, database transactions won't be enabled.
//         client
//     }),
//     emailAndPassword: {
//         enabled: true,
//     },
//     socialProviders: {
//         google: {
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         },
//     },
//     plugins: [
//         admin()
//     ]
// });




import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.DB_NAME);

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "user",
                input: true, // signup theke client field hisebe pathano jabe
            },
        },
    },
    databaseHooks: {
        user: {
            create: {
                before: async (user, ctx) => {
                    const requestedRole = ctx?.body?.role;

                    const allowedRoles = ["user", "writer"];
                    const finalRole = allowedRoles.includes(requestedRole)
                        ? requestedRole
                        : "user";

                    return {
                        data: {
                            ...user,
                            role: finalRole,
                        },
                    };
                },
            },
        },
    },
    plugins: [
        nextCookies(),
    ]
});