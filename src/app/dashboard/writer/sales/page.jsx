'use client';
import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiBookOpen, FiTrendingUp, FiCalendar } from 'react-icons/fi';

export default function WriterSalesPage() {
    const [salesData, setSalesData] = useState({ stats: {}, history: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchSales() {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const token = localStorage.getItem('token');

                const res = await fetch(`${apiUrl}/writer/sales-report`, {
                    signal: controller.signal,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setSalesData(data);
                } else {
                    console.error("Failed to fetch sales data");
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("Error loading sales report:", error);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchSales();
        return () => controller.abort();
    }, []);

    const { stats, history } = salesData;

    if (loading) {
        return (
            <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--ink)]"></div>
                <p className="mt-4 text-sm text-[var(--ink-3)]">Loading sales analytics...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-serif font-bold tracking-tight text-[var(--ink)] m-0">
                    Sales & Revenue
                </h1>
                <p className="text-sm text-[var(--ink-3)] mt-1 m-0">
                    Track your book sales, net royalties, and performance metrics.
                </p>
            </div>

            {/* Stats Overview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Total Revenue */}
                <div className="bg-[var(--cream-2)] border border-[var(--border)] rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-[var(--amber)] flex items-center justify-center">
                        <FiDollarSign size={22} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] m-0">Total Earnings</p>
                        <h3 className="text-xl font-bold text-[var(--ink)] mt-1 m-0">
                            ${stats.totalRevenue ? stats.totalRevenue.toFixed(2) : "0.00"}
                        </h3>
                    </div>
                </div>

                {/* Total Books Sold */}
                <div className="bg-[var(--cream-2)] border border-[var(--border)] rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                        <FiBookOpen size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] m-0">Copies Sold</p>
                        <h3 className="text-xl font-bold text-[var(--ink)] mt-1 m-0">{stats.totalCopiesSold || 0} pcs</h3>
                    </div>
                </div>

                {/* This Month Earning */}
                <div className="bg-[var(--cream-2)] border border-[var(--border)] rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
                        <FiTrendingUp size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] m-0">This Month</p>
                        <h3 className="text-xl font-bold text-[var(--ink)] mt-1 m-0">
                            ${stats.thisMonthRevenue ? stats.thisMonthRevenue.toFixed(2) : "0.00"}
                        </h3>
                    </div>
                </div>
            </div>

            {/* Sales Breakdown Table */}
            <div className="space-y-4">
                <h3 className="text-lg font-serif font-bold text-[var(--ink)] m-0">Recent Sales History</h3>

                {history.length > 0 ? (
                    <div className="bg-[var(--cream-2)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-[var(--border)] bg-[rgba(0,0,0,0.02)]">
                                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)]">Book Title</th>
                                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)]"><div className="flex items-center gap-1"><FiCalendar /> Date</div></th>
                                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)]">Customer ID</th>
                                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)]">Royalty Earned</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[var(--border)]">
                                    {history.map((sale) => (
                                        <tr key={sale._id} className="hover:bg-[rgba(0,0,0,0.01)] transition-colors">
                                            <td className="p-4 text-sm font-medium text-[var(--ink)]">
                                                {sale.bookTitle}
                                            </td>
                                            <td className="p-4 text-sm text-[var(--ink-2)]">
                                                {new Date(sale.purchaseDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </td>
                                            <td className="p-4 text-xs font-mono text-[var(--ink-3)]">
                                                {sale.buyerId.substring(0, 10)}...
                                            </td>
                                            <td className="p-4 text-sm font-bold text-emerald-700">
                                                +${sale.amount.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    /* Empty State */
                    <div className="border border-dashed border-[var(--border)] rounded-2xl p-12 text-center max-w-md mx-auto">
                        <p className="text-xs text-[var(--ink-3)] m-0">
                            No copies have been sold yet. When readers purchase your books, the detailed breakdown will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}