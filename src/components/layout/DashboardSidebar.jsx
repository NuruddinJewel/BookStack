'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    FiShoppingBag, FiBookOpen, FiUser, FiHeart,
    FiGrid, FiPlusCircle, FiDollarSign, FiUsers,
    FiLayers, FiTrendingUp, FiLogOut
} from 'react-icons/fi';

// টেস্ট করার জন্য এখানে রোল পরিবর্তন করুন: "user", "writer", বা "admin"
const mockUser = {
    name: "ABC",
    email: "abc@fable.com",
    role: "admin"
};

export default function DashboardSidebar() {
    const pathname = usePathname();
    const { role, name, email } = mockUser;

    // প্রতিটি রোলের জন্য আলাদা মেনু স্ট্রাকচার
    const menuConfig = {
        user: [
            { label: "Overview", href: "/dashboard/user", icon: FiGrid },
            { label: "Purchased Ebooks", href: "/dashboard/user/purchased", icon: FiBookOpen },
            { label: "Purchase History", href: "/dashboard/user/history", icon: FiShoppingBag },
            { label: "Bookmarked", href: "/dashboard/user/bookmarks", icon: FiHeart },
            { label: "Profile", href: "/dashboard/user/profile", icon: FiUser },
        ],
        writer: [
            { label: "Overview", href: "/dashboard/writer", icon: FiGrid },
            { label: "Manage Ebooks", href: "/dashboard/writer/manage", icon: FiLayers },
            { label: "Add Ebook", href: "/dashboard/writer/add", icon: FiPlusCircle },
            { label: "Sales History", href: "/dashboard/writer/sales", icon: FiDollarSign },
            { label: "Bookmarked", href: "/dashboard/writer/bookmarks", icon: FiHeart },
        ],
        admin: [
            { label: "Dashboard Home", href: "/dashboard/admin", icon: FiTrendingUp },
            { label: "Manage Users", href: "/dashboard/admin/users", icon: FiUsers },
            { label: "Manage All Ebooks", href: "/dashboard/admin/ebooks", icon: FiLayers },
            { label: "All Transactions", href: "/dashboard/admin/transactions", icon: FiShoppingBag },
        ]
    };

    const currentMenu = menuConfig[role] || [];

    return (
        <aside className="w-64 h-screen bg-[var(--cream-2)] border-r border-[var(--border)] flex flex-col justify-between sticky top-0 left-0">

            {/* Top Section: Brand & User Info */}
            <div>
                {/* Brand Logo */}
                <div className="p-6 border-b border-[var(--border)]">
                    <Link href="/" className="no-underline block">
                        <span className="font-serif text-2xl font-medium text-[var(--ink)] tracking-tight">
                            F<span className="text-[var(--amber)]">.</span>able
                        </span>
                    </Link>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-[var(--amber-light)] text-[var(--amber)] text-[10px] font-semibold uppercase tracking-wider rounded-md">
                        {role} Portal
                    </span>
                </div>

                {/* User Profile Summary */}
                <div className="p-4 mx-3 my-4 bg-[var(--cream-3)] rounded-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--amber)] flex items-center justify-center text-[var(--cream)] font-bold text-lg">
                        {name[0]}
                    </div>
                    <div className="overflow-hidden">
                        <h4 className="text-sm font-semibold text-[var(--ink)] truncate">{name}</h4>
                        <p className="text-xs text-[var(--ink-3)] truncate">{email}</p>
                    </div>
                </div>

                {/* Dynamic Navigation Links */}
                <nav className="px-3 space-y-1">
                    {currentMenu.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 no-underline group
                  ${isActive
                                        ? 'bg-[var(--ink)] text-[var(--cream)] shadow-sm'
                                        : 'text-[var(--ink-2)] hover:bg-[var(--cream-3)] hover:text-[var(--ink)]'
                                    }`}
                            >
                                <Icon
                                    size={18}
                                    className={isActive ? 'text-[var(--amber-mid)]' : 'text-[var(--ink-3)] group-hover:text-[var(--ink)]'}
                                />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Section: Logout / Return Home */}
            <div className="p-4 border-t border-[var(--border)]">
                <button
                    onClick={() => console.log("Logout triggered")}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-[var(--coral)] hover:bg-[var(--amber-light)] rounded-lg transition-colors cursor-pointer border-none bg-transparent"
                >
                    <FiLogOut size={18} />
                    Logout
                </button>
            </div>

        </aside>
    );
}