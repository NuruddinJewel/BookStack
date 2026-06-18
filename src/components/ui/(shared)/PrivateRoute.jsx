'use client';
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateRoute({ children }) {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login");
        }
    }, [session, isPending, router]);

    if (isPending) {
        return (
            <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[var(--ink)]"></div>
            </div>
        );
    }

    return session ? <>{children}</> : null;
}