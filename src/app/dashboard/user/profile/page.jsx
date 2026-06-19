'use client';
import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiCalendar, FiSave, FiEdit2 } from 'react-icons/fi';

export default function UserProfilePage() {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [joinDate, setJoinDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Profile Data
    const fetchProfile = async (signal) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const token = localStorage.getItem('token');

            const res = await fetch(`${apiUrl}/user/profile`, {
                signal,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (res.ok) {
                const data = await res.json();
                setFormData({ name: data.name || '', email: data.email || '' });
                setJoinDate(data.createdAt || '');
            } else {
                console.error("Failed to fetch profile");
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error("Error loading profile:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        fetchProfile(controller.signal);

        return () => {
            controller.abort();
        };
    }, []);

    // Profile Update Handler
    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setMessage({ type: '', text: '' });

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const token = localStorage.getItem('token');

            const res = await fetch(`${apiUrl}/user/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to update profile. Try again.' });
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setMessage({ type: 'error', text: 'Server error. Please try again later.' });
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--ink)]"></div>
                <p className="mt-4 text-sm text-[var(--ink-3)]">Loading your profile...</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-serif font-bold tracking-tight text-[var(--ink)] m-0">
                    Profile Settings
                </h1>
                <p className="text-sm text-[var(--ink-3)] mt-1 m-0">
                    Manage your account details and personal information.
                </p>
            </div>

            {/* Profile Form Card */}
            <div className="bg-[var(--cream-2)] border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-sm">

                {/* Status Message */}
                {message.text && (
                    <div className={`p-4 rounded-xl text-sm mb-6 border ${message.type === 'success'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-rose-50 border-rose-200 text-rose-800'
                        }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleUpdate} className="space-y-5">
                    {/* Name Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)] block">
                            Full Name
                        </label>
                        <div className="relative">
                            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-3)]" size={16} />
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full pl-11 pr-4 py-3 bg-[var(--cream)] border border-[var(--border)] rounded-xl outline-none focus:border-[var(--ink)] focus:ring-1 focus:ring-[var(--ink)] transition-all text-sm text-[var(--ink)]"
                                placeholder="Your Name"
                            />
                        </div>
                    </div>

                    {/* Email Input (Read Only ) */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)] block">
                            Email Address
                        </label>
                        <div className="relative opacity-70">
                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-3)]" size={16} />
                            <input
                                type="email"
                                readOnly
                                value={formData.email}
                                className="w-full pl-11 pr-4 py-3 bg-[rgba(0,0,0,0.03)] border border-[var(--border)] rounded-xl outline-none cursor-not-allowed text-sm text-[var(--ink-2)]"
                                title="Email address cannot be changed"
                            />
                        </div>
                    </div>

                    {/* Account Created Date */}
                    {joinDate && (
                        <div className="flex items-center gap-2 pt-2 text-xs text-[var(--ink-3)]">
                            <FiCalendar size={14} />
                            <span>Member since: {new Date(joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    )}

                    <hr className="border-[var(--border)] my-6" />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={updating}
                        className="w-full sm:w-auto px-6 py-3 bg-[var(--ink)] text-[var(--cream)] rounded-xl text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer border-none"
                    >
                        {updating ? (
                            <>
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-[var(--cream)]"></div>
                                Saving Changes...
                            </>
                        ) : (
                            <>
                                <FiSave size={14} />
                                Save Changes
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}