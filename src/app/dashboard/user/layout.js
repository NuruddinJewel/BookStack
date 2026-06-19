import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function UserDashboardLayout({ children }) {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        redirect("/login?callbackUrl=/dashboard/user");
    }

    if (session.user.role !== "user") {
        redirect("/");
    }

    return <>{children}</>;
}