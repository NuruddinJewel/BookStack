// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useState } from "react";
// import { FiMenu, FiX, FiSearch, FiLogOut, FiUser } from "react-icons/fi";
// import { useSession, signOut } from "@/lib/auth-client";
// import { toast } from "react-toastify";

// const navLinks = [
//     { label: "Home", href: "/" },
//     { label: "Browse ebooks", href: "/browse" },
// ];

// export default function Navbar() {
//     const pathname = usePathname();
//     const router = useRouter();
//     const [menuOpen, setMenuOpen] = useState(false);

//     // Better-auth Session
//     const { data: session, isPending } = useSession();
//     const isLoggedIn = !!session;

//     const handleLogout = async () => {
//         await signOut({
//             fetchOptions: {
//                 onSuccess: () => {
//                     toast.success("Successfully logged out!");
//                     router.push("/login");
//                     router.refresh();
//                 },
//                 onError: (ctx) => {
//                     toast.error(ctx.error.message || "Logout failed. Try again.");
//                 }
//             }
//         });
//     };

//     return (
//         <header
//             className="sticky top-0 z-50"
//             style={{
//                 background: "var(--cream)",
//                 borderBottom: "1px solid var(--border)",
//             }}
//         >
//             <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
//                 {/* Logo */}
//                 <Link href="/" className="no-underline">
//                     <span
//                         className="text-xl font-medium tracking-tight"
//                         style={{
//                             fontFamily: "var(--serif)",
//                             color: "var(--ink)",
//                         }}
//                     >
//                         F<span style={{ color: "var(--amber)" }}>.</span>able
//                     </span>
//                 </Link>

//                 {/* Desktop nav */}
//                 <nav className="hidden md:flex items-center gap-6">
//                     {navLinks.map((link) => {
//                         const active = pathname === link.href;
//                         return (
//                             <Link
//                                 key={link.href}
//                                 href={link.href}
//                                 className="text-sm no-underline pb-0.5 transition-colors duration-150"
//                                 style={{
//                                     fontWeight: active ? 500 : 400,
//                                     color: active ? "var(--amber)" : "var(--ink-2)",
//                                     borderBottom: active ? "1.5px solid var(--amber)" : "1.5px solid transparent",
//                                 }}
//                             >
//                                 {link.label}
//                             </Link>
//                         );
//                     })}
//                     {isLoggedIn && (

//                         <Link
//                             href="/dashboard"
//                             className="text-sm no-underline pb-0.5"
//                             style={{
//                                 fontWeight: pathname.startsWith("/dashboard") ? 500 : 400,
//                                 color: pathname.startsWith("/dashboard") ? "var(--amber)" : "var(--ink-2)",
//                                 borderBottom: pathname.startsWith("/dashboard") ? "1.5px solid var(--amber)" : "1.5px solid transparent",
//                             }}
//                         >
//                             Dashboard
//                         </Link>
//                     )}
//                 </nav>

//                 {/* Right Side Actions (Desktop + Mobile Search/Hamburger) */}
//                 <div className="flex items-center gap-3">
//                     {/* Search Icon */}
//                     <button
//                         aria-label="Search"
//                         className="bg-none border-none cursor-pointer flex items-center p-1"
//                         style={{ color: "var(--ink-3)" }}
//                     >
//                         <FiSearch size={18} />
//                     </button>

//                     {/* Desktop Auth (Hidden on Mobile) */}
//                     <div className="hidden md:block">
//                         {isPending ? (
//                             <span className="loading loading-spinner loading-sm text-[var(--ink-3)]"></span>
//                         ) : isLoggedIn ? (
//                             <div className="dropdown dropdown-end">
//                                 <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder border border-[var(--border)] bg-[var(--cream-2)] w-9 h-9 min-h-0">
//                                     <span className="text-[var(--ink)] font-medium text-sm">
//                                         {session.user?.name?.charAt(0).toUpperCase() || "U"}
//                                     </span>
//                                 </div>
//                                 <ul tabIndex={0} className="dropdown-content menu p-2 shadow-md border border-[var(--border)] bg-[var(--cream)] rounded-lg w-52 mt-2 gap-1 z-50">
//                                     <li className="px-3 py-2 border-b border-[var(--border)] mb-1 pointer-events-none">
//                                         <p className="text-xs text-[var(--ink-3)] font-semibold p-0 bg-transparent">Signed in as</p>
//                                         <p className="text-sm font-medium text-[var(--ink)] truncate p-0 bg-transparent">{session.user?.email}</p>
//                                     </li>
//                                     <li>
//                                         <Link href="/dashboard" className="text-[var(--ink-2)] text-sm flex gap-2 items-center hover:bg-[var(--cream-2)] rounded-md py-2">
//                                             <FiUser size={14} /> Dashboard
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <button
//                                             onClick={handleLogout}
//                                             className="text-red-600 text-sm flex gap-2 items-center hover:bg-red-50 rounded-md py-2 w-full text-left"
//                                         >
//                                             <FiLogOut size={14} /> Sign out
//                                         </button>
//                                     </li>
//                                 </ul>
//                             </div>
//                         ) : (
//                             <div className="flex items-center gap-3">
//                                 <Link href="/login">
//                                     <button
//                                         className="bg-none border-none text-sm cursor-pointer p-2"
//                                         style={{ color: "var(--ink-2)", fontFamily: "var(--sans)" }}
//                                     >
//                                         Sign in
//                                     </button>
//                                 </Link>
//                                 <Link href="/register">
//                                     <button
//                                         className="border-none text-xs font-medium cursor-pointer px-[18px] py-1.5 rounded-md"
//                                         style={{ background: "var(--ink)", color: "var(--cream)", fontFamily: "var(--sans)" }}
//                                     >
//                                         Get started
//                                     </button>
//                                 </Link>
//                             </div>
//                         )}
//                     </div>

//                     {/* Mobile Hamburger Button */}
//                     <button
//                         className="md:hidden bg-none border-none cursor-pointer flex items-center p-1"
//                         style={{ color: "var(--ink)" }}
//                         aria-label={menuOpen ? "Close menu" : "Open menu"}
//                         onClick={() => setMenuOpen(!menuOpen)}
//                     >
//                         {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
//                     </button>
//                 </div>
//             </div>

//             {/* Mobile Expandable Menu (Smooth Slide Transition) */}
//             <div
//                 className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-[var(--border)] ${menuOpen ? "max-h-[350px] opacity-100 visible" : "max-h-0 opacity-0 invisible"
//                     }`}
//                 style={{ background: "var(--cream-2)" }}
//             >
//                 <div className="px-5 py-4 flex flex-col gap-1">
//                     {navLinks.map((link) => {
//                         const active = pathname === link.href;
//                         return (
//                             <Link
//                                 key={link.href}
//                                 href={link.href}
//                                 onClick={() => setMenuOpen(false)}
//                                 className="block py-2.5 text-base no-underline border-b border-[var(--border)]/40"
//                                 style={{
//                                     fontWeight: active ? 500 : 400,
//                                     color: active ? "var(--amber)" : "var(--ink-2)",
//                                 }}
//                             >
//                                 {link.label}
//                             </Link>
//                         );
//                     })}
//                     {isLoggedIn && (
//                         <Link
//                             href="/dashboard"
//                             onClick={() => setMenuOpen(false)}
//                             className="block py-2.5 text-base no-underline border-b border-[var(--border)]/40"
//                             style={{
//                                 fontWeight: pathname.startsWith("/dashboard") ? 500 : 400,
//                                 color: pathname.startsWith("/dashboard") ? "var(--amber)" : "var(--ink-2)",
//                             }}
//                         >
//                             Dashboard
//                         </Link>
//                     )}

//                     {/* Mobile Auth Buttons */}
//                     <div className="flex flex-col gap-3 mt-4">
//                         {isPending ? (
//                             <div className="w-full text-center py-2">
//                                 <span className="loading loading-spinner loading-sm text-[var(--ink-3)]"></span>
//                             </div>
//                         ) : isLoggedIn ? (
//                             <div className="flex flex-col gap-2">
//                                 <p className="text-xs text-[var(--ink-3)] px-1 truncate">
//                                     Logged in as: <span className="font-semibold text-[var(--ink)]">{session.user?.email}</span>
//                                 </p>
//                                 <button
//                                     onClick={() => {
//                                         setMenuOpen(false);
//                                         handleLogout();
//                                     }}
//                                     className="w-full text-sm font-medium py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
//                                     style={{
//                                         background: "rgba(220, 38, 38, 0.1)",
//                                         border: "1px solid rgba(220, 38, 38, 0.2)",
//                                         color: "rgb(220, 38, 38)",
//                                         fontFamily: "var(--sans)",
//                                     }}
//                                 >
//                                     <FiLogOut size={14} /> Sign out
//                                 </button>
//                             </div>
//                         ) : (
//                             <div className="flex gap-3">
//                                 <Link href="/login" onClick={() => setMenuOpen(false)} className="flex-1">
//                                     <button
//                                         className="w-full text-sm py-2 rounded-md cursor-pointer transition-colors"
//                                         style={{
//                                             background: "var(--cream)",
//                                             border: "1px solid var(--border)",
//                                             color: "var(--ink)",
//                                             fontFamily: "var(--sans)",
//                                         }}
//                                     >
//                                         Sign in
//                                     </button>
//                                 </Link>
//                                 <Link href="/register" onClick={() => setMenuOpen(false)} className="flex-1">
//                                     <button
//                                         className="w-full text-sm font-medium py-2 rounded-md border-none cursor-pointer transition-colors"
//                                         style={{
//                                             background: "var(--ink)",
//                                             color: "var(--cream)",
//                                             fontFamily: "var(--sans)",
//                                         }}
//                                     >
//                                         Get started
//                                     </button>
//                                 </Link>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </header>
//     );
// }

//2
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX, FiSearch, FiLogOut, FiUser } from "react-icons/fi";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "react-toastify";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse ebooks", href: "/browse" },
];

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    const { data: session, isPending } = useSession();
    const isLoggedIn = !!session;

    // ইউজারের রোল অনুযায়ী ড্যাশবোর্ড পাথ নির্ধারণ
    const getDashboardPath = () => {
        if (!session?.user?.role) return "/dashboard/user";
        switch (session.user.role) {
            case "admin": return "/dashboard/admin";
            case "writer": return "/dashboard/writer";
            default: return "/dashboard/user";
        }
    };

    const dashboardPath = getDashboardPath();

    const handleLogout = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Successfully logged out!");
                    router.push("/login");
                    router.refresh();
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message || "Logout failed. Try again.");
                }
            }
        });
    };

    return (
        <header
            className="sticky top-0 z-50"
            style={{
                background: "var(--cream)",
                borderBottom: "1px solid var(--border)",
            }}
        >
            <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
                <Link href="/" className="no-underline">
                    <span className="text-xl font-medium tracking-tight" style={{ fontFamily: "var(--serif)", color: "var(--ink)" }}>
                        F<span style={{ color: "var(--amber)" }}>.</span>able
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <Link key={link.href} href={link.href} className="text-sm no-underline pb-0.5 transition-colors duration-150"
                                style={{ fontWeight: active ? 500 : 400, color: active ? "var(--amber)" : "var(--ink-2)", borderBottom: active ? "1.5px solid var(--amber)" : "1.5px solid transparent" }}>
                                {link.label}
                            </Link>
                        );
                    })}
                    {isLoggedIn && (
                        <Link href={dashboardPath} className="text-sm no-underline pb-0.5"
                            style={{ fontWeight: pathname.startsWith("/dashboard") ? 500 : 400, color: pathname.startsWith("/dashboard") ? "var(--amber)" : "var(--ink-2)", borderBottom: pathname.startsWith("/dashboard") ? "1.5px solid var(--amber)" : "1.5px solid transparent" }}>
                            Dashboard
                        </Link>
                    )}
                </nav>

                <div className="flex items-center gap-3">
                    {/* <button aria-label="Search" className="bg-none border-none cursor-pointer flex items-center p-1" style={{ color: "var(--ink-3)" }}>
                        <FiSearch size={18} />
                    </button> */}

                    <div className="hidden md:block">
                        {isPending ? (
                            <span className="loading loading-spinner loading-sm text-[var(--ink-3)]"></span>
                        ) : isLoggedIn ? (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder border border-[var(--border)] bg-[var(--cream-2)] w-9 h-9 min-h-0">
                                    <span className="text-[var(--ink)] font-medium text-sm">{session.user?.name?.charAt(0).toUpperCase() || "U"}</span>
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow-md border border-[var(--border)] bg-[var(--cream)] rounded-lg w-52 mt-2 gap-1 z-50">
                                    <li className="px-3 py-2 border-b border-[var(--border)] mb-1 pointer-events-none">
                                        <p className="text-xs text-[var(--ink-3)] font-semibold p-0 bg-transparent">Signed in as</p>
                                        <p className="text-sm font-medium text-[var(--ink)] truncate p-0 bg-transparent">{session.user?.email}</p>
                                    </li>
                                    <li>
                                        <Link href={dashboardPath} className="text-[var(--ink-2)] text-sm flex gap-2 items-center hover:bg-[var(--cream-2)] rounded-md py-2">
                                            <FiUser size={14} /> Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className="text-red-600 text-sm flex gap-2 items-center hover:bg-red-50 rounded-md py-2 w-full text-left">
                                            <FiLogOut size={14} /> Sign out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link href="/login"><button className="bg-none border-none text-sm cursor-pointer p-2" style={{ color: "var(--ink-2)" }}>Sign in</button></Link>
                                <Link href="/register"><button className="border-none text-xs font-medium cursor-pointer px-[18px] py-1.5 rounded-md" style={{ background: "var(--ink)", color: "var(--cream)" }}>Get started</button></Link>
                            </div>
                        )}
                    </div>

                    <button className="md:hidden bg-none border-none cursor-pointer flex items-center p-1" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                    </button>
                </div>
            </div>
            {/* Mobile Menu Logic এখানে আগের মতোই থাকবে, শুধু লিঙ্কগুলোতে dashboardPath ব্যবহার করবেন */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-[300px]" : "max-h-0"}`} style={{ background: "var(--cream-2)" }}>
                <div className="px-5 py-4 flex flex-col gap-3">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="py-2 border-b border-[var(--border)]/40">
                            {link.label}
                        </Link>
                    ))}
                    {isLoggedIn && (
                        <Link href={dashboardPath} onClick={() => setMenuOpen(false)} className="py-2 border-b border-[var(--border)]/40">
                            Dashboard
                        </Link>
                    )}
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="text-red-600 text-left py-2">Sign out</button>
                    ) : (
                        <Link href="/login" onClick={() => setMenuOpen(false)} className="py-2">Sign in</Link>
                    )}
                </div>
            </div>
        </header>
    );
}