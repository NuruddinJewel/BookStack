"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX, FiSearch, FiLogOut, FiUser } from "react-icons/fi";
import { useSession, signOut } from "@/lib/auth-client";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse ebooks", href: "/browse" },
];

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    // Better-auth Session 
    const { data: session, isPending } = useSession();
    const isLoggedIn = !!session;

    const handleLogout = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                    router.refresh();
                }
            }
        });
    };

    return (
        <header
            style={{
                background: "var(--cream)",
                borderBottom: "1px solid var(--border)",
                position: "sticky",
                top: 0,
                zIndex: 50,
            }}
        >
            <div
                className="max-w-6xl mx-auto px-5"
                style={{ height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
                {/* Logo */}
                <Link href="/" style={{ textDecoration: "none" }}>
                    <span
                        style={{
                            fontFamily: "var(--serif)",
                            fontSize: "22px",
                            fontWeight: 500,
                            color: "var(--ink)",
                            letterSpacing: "-.5px",
                        }}
                    >
                        F<span style={{ color: "var(--amber)" }}>.</span>able
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                style={{
                                    fontSize: "13.5px",
                                    fontWeight: active ? 500 : 400,
                                    color: active ? "var(--amber)" : "var(--ink-2)",
                                    textDecoration: "none",
                                    borderBottom: active ? "1.5px solid var(--amber)" : "1.5px solid transparent",
                                    paddingBottom: "2px",
                                    transition: "color .15s, border-color .15s",
                                }}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                    {isLoggedIn && (
                        <Link
                            href="/dashboard"
                            style={{
                                fontSize: "13.5px",
                                fontWeight: pathname.startsWith("/dashboard") ? 500 : 400,
                                color: pathname.startsWith("/dashboard") ? "var(--amber)" : "var(--ink-2)",
                                textDecoration: "none",
                                borderBottom: pathname.startsWith("/dashboard") ? "1.5px solid var(--amber)" : "1.5px solid transparent",
                                paddingBottom: "2px",
                            }}
                        >
                            Dashboard
                        </Link>
                    )}
                </nav>

                {/* Desktop right side */}
                <div className="hidden md:flex items-center gap-3">
                    <button
                        aria-label="Search"
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "var(--ink-3)",
                            display: "flex",
                            alignItems: "center",
                            padding: "4px",
                        }}
                    >
                        <FiSearch size={17} />
                    </button>

                    {isPending ? (
                        <span className="loading loading-spinner loading-sm text-[var(--ink-3)]"></span>
                    ) : isLoggedIn ? (

                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder border border-[var(--border)] bg-[var(--cream-2)] w-9 h-9 min-h-0">
                                <span className="text-[var(--ink)] font-medium text-sm">
                                    {session.user?.name?.charAt(0).toUpperCase() || "U"}
                                </span>
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow-md border border-[var(--border)] bg-[var(--cream)] rounded-lg w-52 mt-2 gap-1">
                                <li className="px-3 py-2 border-b border-[var(--border)] mb-1">
                                    <p className="text-xs text-[var(--ink-3)] font-semibold p-0">Signed in as</p>
                                    <p className="text-sm font-medium text-[var(--ink)] truncate p-0">{session.user?.email}</p>
                                </li>
                                <li>
                                    <Link href="/dashboard" className="text-[var(--ink-2)] text-sm flex gap-2 items-center hover:bg-[var(--cream-2)] rounded-md py-2">
                                        <FiUser size={14} /> Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="text-red-600 text-sm flex gap-2 items-center hover:bg-red-50 rounded-md py-2 w-full text-left"
                                    >
                                        <FiLogOut size={14} /> Sign out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <button
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: "var(--ink-2)",
                                        fontSize: "13.5px",
                                        cursor: "pointer",
                                        fontFamily: "var(--sans)",
                                        padding: "7px 4px",
                                    }}
                                >
                                    Sign in
                                </button>
                            </Link>
                            <Link href="/register">
                                <button
                                    style={{
                                        background: "var(--ink)",
                                        border: "none",
                                        color: "var(--cream)",
                                        fontSize: "13px",
                                        fontWeight: 500,
                                        padding: "7px 18px",
                                        borderRadius: "7px",
                                        cursor: "pointer",
                                        fontFamily: "var(--sans)",
                                    }}
                                >
                                    Get started
                                </button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    onClick={() => setMenuOpen(!menuOpen)}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--ink)",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div
                    className="md:hidden"
                    style={{
                        background: "var(--cream-2)",
                        borderTop: "1px solid var(--border)",
                        padding: "16px 20px 20px",
                    }}
                >
                    {navLinks.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                style={{
                                    display: "block",
                                    padding: "10px 0",
                                    fontSize: "15px",
                                    fontWeight: active ? 500 : 400,
                                    color: active ? "var(--amber)" : "var(--ink-2)",
                                    textDecoration: "none",
                                    borderBottom: "1px solid var(--border)",
                                }}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                    {isLoggedIn && (
                        <Link
                            href="/dashboard"
                            onClick={() => setMenuOpen(false)}
                            style={{
                                display: "block",
                                padding: "10px 0",
                                fontSize: "15px",
                                fontWeight: pathname.startsWith("/dashboard") ? 500 : 400,
                                color: pathname.startsWith("/dashboard") ? "var(--amber)" : "var(--ink-2)",
                                textDecoration: "none",
                                borderBottom: "1px solid var(--border)",
                            }}
                        >
                            Dashboard
                        </Link>
                    )}

                    <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                        {isPending ? (
                            <div className="w-full text-center py-2">
                                <span className="loading loading-spinner loading-sm text-[var(--ink-3)]"></span>
                            </div>
                        ) : isLoggedIn ? (
                            <button
                                onClick={() => {
                                    setMenuOpen(false);
                                    handleLogout();
                                }}
                                style={{
                                    width: "100%",
                                    background: "rgba(220, 38, 38, 0.1)",
                                    border: "1px solid rgba(220, 38, 38, 0.2)",
                                    color: "rgb(220, 38, 38)",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    padding: "9px",
                                    borderRadius: "7px",
                                    cursor: "pointer",
                                    fontFamily: "var(--sans)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px"
                                }}
                            >
                                <FiLogOut size={14} /> Sign out
                            </button>
                        ) : (
                            <>
                                <Link href="/login" onClick={() => setMenuOpen(false)} style={{ flex: 1 }}>
                                    <button
                                        style={{
                                            width: "100%",
                                            background: "var(--cream)",
                                            border: "1px solid var(--border)",
                                            color: "var(--ink)",
                                            fontSize: "14px",
                                            padding: "9px",
                                            borderRadius: "7px",
                                            cursor: "pointer",
                                            fontFamily: "var(--sans)",
                                        }}
                                    >
                                        Sign in
                                    </button>
                                </Link>
                                <Link href="/register" onClick={() => setMenuOpen(false)} style={{ flex: 1 }}>
                                    <button
                                        style={{
                                            width: "100%",
                                            background: "var(--ink)",
                                            border: "none",
                                            color: "var(--cream)",
                                            fontSize: "14px",
                                            fontWeight: 500,
                                            padding: "9px",
                                            borderRadius: "7px",
                                            cursor: "pointer",
                                            fontFamily: "var(--sans)",
                                        }}
                                    >
                                        Get started
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}