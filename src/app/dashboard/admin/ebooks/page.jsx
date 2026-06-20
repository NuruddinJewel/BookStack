'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiBook, FiCheck, FiX, FiTrash2, FiStar } from 'react-icons/fi';

export default function AdminEbooksPage() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionId, setActionId] = useState(null);

    // Backend Books data fetch
    const fetchAllBooks = async (signal) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const token = localStorage.getItem('token');

            const res = await fetch(`${apiUrl}/admin/ebooks`, {
                signal,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (res.ok) {
                const data = await res.json();
                setBooks(data);
            } else {
                console.error("Failed to fetch books");
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error("Error loading ebooks:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        fetchAllBooks(controller.signal);
        return () => controller.abort();
    }, []);

    // Book Status (Approve / Reject)
    const handleUpdateStatus = async (bookId, newStatus) => {
        setActionId(bookId);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const token = localStorage.getItem('token');

            const res = await fetch(`${apiUrl}/admin/ebooks/${bookId}/status`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                // UI-Status Update
                setBooks(books.map(book => book._id === bookId ? { ...book, status: newStatus } : book));
            } else {
                alert("Failed to update book status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
        } finally {
            setActionId(null);
        }
    };

    // Book Delete
    const handleDeleteBook = async (bookId) => {
        const confirmDelete = window.confirm("Are you sure you want to permanently delete this ebook?");
        if (!confirmDelete) return;

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const token = localStorage.getItem('token');

            const res = await fetch(`${apiUrl}/admin/ebooks/${bookId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                setBooks(books.filter(book => book._id !== bookId));
            } else {
                alert("Failed to delete book");
            }
        } catch (error) {
            console.error("Error deleting book by admin:", error);
        }
    };

    if (loading) {
        return (
            <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--ink)]"></div>
                <p className="mt-4 text-sm text-[var(--ink-3)]">Loading catalog...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-serif font-bold tracking-tight text-[var(--ink)] m-0">
                    Manage All Ebooks
                </h1>
                <p className="text-sm text-[var(--ink-3)] mt-1 m-0">
                    Review submissions, approve new releases, or remove content.
                </p>
            </div>

            {/* Ebooks Table / List View */}
            {books.length > 0 ? (
                <div className="bg-[var(--cream-2)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[var(--border)] bg-[rgba(0,0,0,0.02)]">
                                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)]">Ebook Details</th>
                                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)]">Genre & Price</th>
                                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)]">Current Status</th>
                                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)]">Moderation / Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border)]">
                                {books.map((book) => (
                                    <tr key={book._id} className="hover:bg-[rgba(0,0,0,0.01)] transition-colors">

                                        {/* Cover and Title */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-16 bg-[var(--ink)] relative rounded-lg overflow-hidden border border-[var(--border)] flex-shrink-0">
                                                    {book.coverImage ? (
                                                        <Image
                                                            src={book.coverImage}
                                                            alt={book.title}
                                                            fill
                                                            sizes="50px"
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="text-[9px] text-[var(--cream-2)] flex items-center justify-center h-full">No Cover</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-serif font-bold text-[var(--ink)] m-0 line-clamp-1">{book.title}</p>
                                                    <p className="text-xs text-[var(--ink-3)] m-0">Writer ID: {book.writerId}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Category & Price */}
                                        <td className="p-4">
                                            <p className="text-sm text-[var(--ink)] m-0 font-medium">{book.category}</p>
                                            <p className="text-xs text-[var(--ink-3)] m-0 font-semibold">${book.price ? book.price.toFixed(2) : "0.00"}</p>
                                        </td>

                                        {/* Status Badge */}
                                        <td className="p-4">
                                            <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${book.status === 'approved'
                                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                                : book.status === 'rejected'
                                                    ? 'bg-rose-50 border-rose-200 text-rose-700'
                                                    : 'bg-amber-50 border-amber-200 text-amber-700'
                                                }`}>
                                                {book.status || 'pending'}
                                            </span>
                                        </td>

                                        {/* Moderation Controls */}
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                {book.status !== 'approved' && (
                                                    <button
                                                        disabled={actionId === book._id}
                                                        onClick={() => handleUpdateStatus(book._id, 'approved')}
                                                        className="p-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors cursor-pointer"
                                                        title="Approve Book"
                                                    >
                                                        <FiCheck size={14} />
                                                    </button>
                                                )}

                                                {book.status === 'pending' && (
                                                    <button
                                                        disabled={actionId === book._id}
                                                        onClick={() => handleUpdateStatus(book._id, 'rejected')}
                                                        className="p-2 bg-amber-50 border border-amber-200 text-amber-600 rounded-xl hover:bg-amber-100 transition-colors cursor-pointer"
                                                        title="Reject Book"
                                                    >
                                                        <FiX size={14} />
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => handleDeleteBook(book._id)}
                                                    className="p-2 border border-[var(--border)] bg-[var(--cream)] text-red-600 rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
                                                    title="Permanently Delete"
                                                >
                                                    <FiTrash2 size={14} />
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="border border-dashed border-[var(--border)] rounded-2xl p-12 text-center max-w-md mx-auto">
                    <p className="text-sm text-[var(--ink-3)] m-0">No ebooks available in the catalog.</p>
                </div>
            )}
        </div>
    );
}