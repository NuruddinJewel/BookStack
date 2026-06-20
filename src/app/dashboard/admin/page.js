'use client';
import React, { useState, useEffect } from 'react';
import RoleGuard from "@/components/ui/(shared)/RoleGuard";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Legend
} from 'recharts';

const COLORS = ['#1e1e1e', '#8f7754', '#4a5d4e', '#665566', '#a18276'];

export default function AdminPage() {
    const [chartData, setChartData] = useState({ sales: [], genres: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchAnalytics() {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const token = localStorage.getItem('token');

                const res = await fetch(`${apiUrl}/admin/analytics`, {
                    signal: controller.signal,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setChartData({
                        sales: data?.sales || [],
                        genres: data?.genres || []
                    });
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("Error loading charts:", error);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchAnalytics();
        return () => controller.abort();
    }, []);

    const genresDataWithColors = chartData?.genres?.map((entry, index) => ({
        ...entry,
        fill: COLORS[index % COLORS.length]
    })) || [];

    return (
        <RoleGuard allowedRoles={["admin"]}>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-serif font-bold tracking-tight text-[var(--ink)] m-0">
                        Admin Overview
                    </h1>
                    <p className="text-sm text-[var(--ink-3)] mt-1 m-0">
                        Welcome back, Administrator. Here is the latest system state.
                    </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="p-5 bg-[var(--cream-2)] border border-[var(--border)] rounded-xl">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] m-0">Total Users</p>
                        <h3 className="text-2xl font-bold mt-1.5 text-[var(--ink)] m-0">1,240</h3>
                    </div>
                    <div className="p-5 bg-[var(--cream-2)] border border-[var(--border)] rounded-xl">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] m-0">Active Ebooks</p>
                        <h3 className="text-2xl font-bold mt-1.5 text-[var(--ink)] m-0">482</h3>
                    </div>
                    <div className="p-5 bg-[var(--cream-2)] border border-[var(--border)] rounded-xl">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] m-0">Total Revenue</p>
                        <h3 className="text-2xl font-bold mt-1.5 text-[var(--ink)] m-0">$12,450</h3>
                    </div>
                    <div className="p-5 bg-[var(--cream-2)] border border-[var(--border)] rounded-xl">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--amber)] m-0">Pending Approvals</p>
                        <h3 className="text-2xl font-bold mt-1.5 text-[var(--amber)] m-0">7</h3>
                    </div>
                </div>

                {/* Charts Section */}
                {loading ? (
                    <div className="py-12 text-center text-xs text-[var(--ink-3)]">Loading visual reports...</div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* 1. Monthly Sales Bar Chart */}
                        <div className="lg:col-span-2 bg-[var(--cream-2)] border border-[var(--border)] p-5 rounded-2xl flex flex-col h-80">
                            <h3 className="text-sm font-bold font-serif text-[var(--ink)] mb-4 m-0">Monthly Sales Volume</h3>
                            <div className="w-full flex-1 min-h-0 relative">
                                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                                    <BarChart data={chartData?.sales || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                                        <XAxis dataKey="month" stroke="var(--ink-3)" fontSize={11} />
                                        <YAxis stroke="var(--ink-3)" fontSize={11} />
                                        <Tooltip cursor={{ fill: 'rgba(0,0,0,0.01)' }} />
                                        <Bar dataKey="sales" fill="var(--ink)" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* 2. Ebooks by Genre Pie Chart */}
                        <div className="bg-[var(--cream-2)] border border-[var(--border)] p-5 rounded-2xl flex flex-col h-80">
                            <h3 className="text-sm font-bold font-serif text-[var(--ink)] mb-2 m-0">Ebooks by Genre</h3>
                            <div className="w-full flex-1 min-h-0 relative">
                                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                                    <PieChart>
                                        <Pie
                                            data={genresDataWithColors}
                                            cx="50%"
                                            cy="40%"
                                            innerRadius={55}
                                            outerRadius={75}
                                            paddingAngle={4}
                                            dataKey="value"
                                        />
                                        <Tooltip />
                                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </RoleGuard>
    );
}