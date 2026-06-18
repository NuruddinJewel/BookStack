'use client';
import React, { useEffect } from 'react';
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function RoleGuard({ children, allowedRoles = [] }) {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    const userRole = session?.user?.role;

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login");
            return;
        }
        if (!isPending && session && !allowedRoles.includes(userRole)) {
            router.push("/"); //  Custom '/unauthorized'
        }
    }, [session, isPending, userRole, allowedRoles, router]);

    if (isPending) {
        return (
            <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[var(--ink)]"></div>
            </div>
        );
    }

    return session && allowedRoles.includes(userRole) ? <>{children}</> : null;
}