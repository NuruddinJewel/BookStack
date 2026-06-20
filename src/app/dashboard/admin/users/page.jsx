'use client';
import React, { useState, useEffect } from 'react';
import { FiUsers, FiShield, FiTrash2, FiCheckCircle } from 'react-icons/fi';

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    // Admin User List
    const fetchAllUsers = async (signal) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const token = localStorage.getItem('token');

            const res = await fetch(`${apiUrl}/admin/users`, {
                signal,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (res.ok) {
                const data = await res.json();
                setUsers(data);
            } else {
                console.error("Failed to fetch users");
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error("Error loading users:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        fetchAllUsers(controller.signal);
        return () => controller.abort();
    }, []);

    // User Role (User <-> Writer <-> Admin)
    const handleRoleChange = async (userId, newRole) => {
        setActionLoading(userId);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const token = localStorage.getItem('token');

            const res = await fetch(`${apiUrl}/admin/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role: newRole })
            });

            if (res.ok) {
                // New Role set
                setUsers(users.map(user => user._id === userId ? { ...user, role: newRole } : user));
            } else {
                alert("Failed to update user role");
            }
        } catch (error) {
            console.error("Error updating role:", error);
        } finally {
            setActionLoading(null);
        }
    };

    // User Delete
    const handleDeleteUser = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user account?");
        if (!confirmDelete) return;

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const token = localStorage.getItem('token');

            const res = await fetch(`${apiUrl}/admin/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                setUsers(users.filter(user => user._id !== userId));
            } else {
                alert("Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    if (loading) {
        return (
            <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--ink)]"></div>
                <p className="mt-4 text-sm text-[var(--ink-3)]">Loading user directory...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-serif font-bold tracking-tight text-[var(--ink)] m-0">
                    User Management
                </h1>
                <p className="text-sm text-[var(--ink-3)] mt-1 m-0">
                    Manage roles, monitor accounts, and control system access.
                </p>
            </div>

            {/* Users Table */}
            {users.length > 0 ? (
                <div className="bg-[var(--cream-2)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[var(--border)] bg-[rgba(0,0,0,0.02)]">
                                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)]">User Info</th>
                                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)]">Email</th>
                                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)]">Role / Group</th>
                                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border)]">
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-[rgba(0,0,0,0.01)] transition-colors">
                                        {/* User Details */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 bg-[var(--cream)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--ink)] font-serif font-bold text-sm">
                                                    {user.name ? user.name[0].toUpperCase() : 'U'}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-[var(--ink)] m-0">{user.name}</p>
                                                    <p className="text-[11px] text-[var(--ink-3)] m-0">ID: {user._id}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Email */}
                                        <td className="p-4 text-sm text-[var(--ink-2)]">
                                            {user.email}
                                        </td>

                                        {/* Dynamic Role Selector */}
                                        <td className="p-4">
                                            <select
                                                value={user.role}
                                                disabled={actionLoading === user._id}
                                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                className="px-3 py-1.5 bg-[var(--cream)] border border-[var(--border)] rounded-xl text-xs font-medium text-[var(--ink)] outline-none focus:border-[var(--ink)] transition-colors cursor-pointer disabled:opacity-50"
                                            >
                                                <option value="user">Reader / User</option>
                                                <option value="writer">Writer</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>

                                        {/* Delete Action */}
                                        <td className="p-4">
                                            <button
                                                onClick={() => handleDeleteUser(user._id)}
                                                className="p-2 border border-[var(--border)] bg-[var(--cream)] text-red-600 rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
                                                title="Delete Account"
                                            >
                                                <FiTrash2 size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="border border-dashed border-[var(--border)] rounded-2xl p-12 text-center max-w-md mx-auto">
                    <p className="text-sm text-[var(--ink-3)] m-0">No accounts found in database.</p>
                </div>
            )}
        </div>
    );
}