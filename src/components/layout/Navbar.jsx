"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse ebooks", href: "/browse" },
    { label: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    // Configure with Better-auth
    const isLoggedIn = false;

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
                </nav>

                {/* Desktop right side */}
                <div className="hidden md:flex items-center gap-3">
                    {/* Search icon */}
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

                    {isLoggedIn ? (
                        <Link href="/dashboard">
                            <button
                                style={{
                                    background: "var(--cream-2)",
                                    border: "1px solid var(--border)",
                                    color: "var(--ink)",
                                    fontSize: "13px",
                                    padding: "7px 16px",
                                    borderRadius: "7px",
                                    cursor: "pointer",
                                    fontFamily: "var(--sans)",
                                }}
                            >
                                Dashboard
                            </button>
                        </Link>
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

                    <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
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
                    </div>
                </div>
            )}
        </header>
    );
}