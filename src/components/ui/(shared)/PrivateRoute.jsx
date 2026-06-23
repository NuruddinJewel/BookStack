'use client';
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateRoute({ children }) {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }
    }, [session, isPending, router]);

    if (isPending) {
        return (
            <div className="min-h-screen bg-[var(--cream)] flex flex-col items-center justify-center gap-4">
                <span className="loading loading-ring loading-lg text-[var(--ink)] w-12 h-12"></span>
                <p className="text-sm font-serif text-[var(--ink-2)] tracking-wide animate-pulse">
                    Verifying shelf access...
                </p>
            </div>
        );
    }

    if (session) {
        return <>{children}</>;
    }

    return null;
}