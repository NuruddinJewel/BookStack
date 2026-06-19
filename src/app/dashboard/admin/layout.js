import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminDashboardLayout({ children }) {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        redirect("/login?callbackUrl=/dashboard/admin");
    }

    if (session.user.role !== "admin") {
        redirect("/");
    }

    return <>{children}</>;
}