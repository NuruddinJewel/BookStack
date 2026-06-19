'use client';
import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiCalendar, FiHash, FiCheckCircle } from 'react-icons/fi';

export default function PurchaseHistoryPage() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchHistory() {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const token = localStorage.getItem('token');

                const res = await fetch(`${apiUrl}/user/history`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setHistory(data);
                } else {
                    console.error("Failed to fetch history. Status:", res.status);
                }
            } catch (error) {
                console.error("Error connecting to backend server:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchHistory();
    }, []);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-serif font-bold tracking-tight text-[var(--ink)] m-0">
                    Purchase History
                </h1>
                <p className="text-sm text-[var(--ink-3)] mt-1 m-0">
                    Track and view all your past transactions and billing invoices.
                </p>
            </div>

            {loading ? (
                /* Loading State */
                <div className="py-20 text-center flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--ink)]"></div>
                    <p className="mt-4 text-sm text-[var(--ink-3)]">Loading transaction history...</p>
                </div>
            ) : history.length > 0 ? (
                /* History Table Container */
                <div className="bg-[var(--cream-2)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[var(--border)] bg-[rgba(0,0,0,0.02)]">
                                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)]"><div className="flex items-center gap-1"><FiHash /> Transaction ID</div></th>
                                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)]">Book Title</th>
                                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)]"><div className="flex items-center gap-1"><FiCalendar /> Date</div></th>
                                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)]"><div className="flex items-center gap-1"><FiDollarSign /> Amount</div></th>
                                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)]">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border)]">
                                {history.map((tx) => (
                                    <tr key={tx._id || tx.transactionId} className="hover:bg-[rgba(0,0,0,0.01)] transition-colors">
                                        <td className="p-4 text-xs font-mono text-[var(--ink-3)]">
                                            {tx.transactionId || tx._id?.substring(0, 8)}...
                                        </td>
                                        <td className="p-4 text-sm font-medium text-[var(--ink)]">
                                            {tx.bookTitle || "Premium Ebook"}
                                        </td>
                                        <td className="p-4 text-sm text-[var(--ink-2)]">
                                            {new Date(tx.purchaseDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td className="p-4 text-sm font-bold text-[var(--ink)]">
                                            ${typeof tx.amount === 'number' ? tx.amount.toFixed(2) : "0.00"}
                                        </td>
                                        <td className="p-4 text-sm">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                <FiCheckCircle size={12} />
                                                Success
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                /* Empty State  */
                <div className="border border-dashed border-[var(--border)] rounded-2xl p-12 text-center max-w-md mx-auto mt-10">
                    <div className="w-12 h-12 bg-[var(--cream-2)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--ink-3)] mx-auto mb-4">
                        <FiDollarSign size={20} />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[var(--ink)] mb-1">No transactions yet</h3>
                    <p className="text-xs text-[var(--ink-3)]">
                        You {"haven't"} made any purchases yet. Your billing history and receipts will appear here.
                    </p>
                </div>
            )}
        </div>
    );
}