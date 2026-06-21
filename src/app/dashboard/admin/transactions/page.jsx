'use client';
import React, { useState, useEffect } from 'react';
import { FiCalendar, FiFileText, FiHash, FiUser } from 'react-icons/fi';

export default function AdminTransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTransactions = async (signal) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${apiUrl}/admin/transactions`, { signal });

            if (res.ok) {
                const data = await res.json();
                setTransactions(data);
            } else {
                console.error("Failed to fetch transactions");
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error("Error loading transactions:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        fetchTransactions(controller.signal);
        return () => controller.abort();
    }, []);

    if (loading) {
        return (
            <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--ink)]"></div>
                <p className="mt-4 text-sm text-[var(--ink-3)]">Loading ledger statements...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-serif font-bold tracking-tight text-[var(--ink)] m-0">
                    Financial Transactions
                </h1>
                <p className="text-sm text-[var(--ink-3)] mt-1 m-0">
                    View and audit all platform purchases.
                </p>
            </div>

            {transactions.length > 0 ? (
                <div className="bg-[var(--cream-2)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[var(--border)] bg-[rgba(0,0,0,0.02)]">
                                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)]">
                                        <div className="flex items-center gap-1"><FiHash /> Transaction ID</div>
                                    </th>
                                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)]">
                                        <div className="flex items-center gap-1"><FiFileText /> Type</div>
                                    </th>
                                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)]">
                                        <div className="flex items-center gap-1"><FiUser /> Buyer Email</div>
                                    </th>
                                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)]">
                                        <div className="flex items-center gap-1"><FiCalendar /> Date</div>
                                    </th>
                                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)]">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border)]">
                                {transactions.map((tx) => (
                                    <tr key={tx._id} className="hover:bg-[rgba(0,0,0,0.01)] transition-colors">
                                        <td className="p-4 text-xs font-mono font-semibold text-[var(--ink)]">
                                            {tx.transactionId?.substring(0, 16)}...
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-emerald-50 border-emerald-200 text-emerald-700">
                                                {tx.type}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-[var(--ink-2)]">{tx.email}</td>
                                        <td className="p-4 text-sm text-[var(--ink-3)]">
                                            {new Date(tx.date).toLocaleDateString('en-US', {
                                                year: 'numeric', month: 'short', day: 'numeric',
                                                hour: '2-digit', minute: '2-digit'
                                            })}
                                        </td>
                                        <td className="p-4 text-sm font-bold text-[var(--ink)]">
                                            ${tx.amount?.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="border border-dashed border-[var(--border)] rounded-2xl p-12 text-center max-w-md mx-auto">
                    <p className="text-sm text-[var(--ink-3)] m-0">No financial transactions logged yet.</p>
                </div>
            )}
        </div>
    );
}