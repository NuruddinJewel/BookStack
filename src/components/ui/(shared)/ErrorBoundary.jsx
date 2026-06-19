'use client';
import React, { Component } from 'react';
import Link from 'next/link';
import { FiAlertTriangle, FiRefreshCw, FiHome } from 'react-icons/fi';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }


    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }


    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }


    handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {

            return (
                <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center p-6">
                    <div className="max-w-md w-full text-center p-8 bg-[var(--cream-2)] border border-[var(--border)] rounded-2xl shadow-sm space-y-6">
                        {/* Elegant Danger Icon */}
                        <div className="w-16 h-16 bg-red-50 text-[var(--coral)] rounded-full flex items-center justify-center mx-auto border border-red-100">
                            <FiAlertTriangle size={32} />
                        </div>

                        {/* Heading & Message */}
                        <div className="space-y-2">
                            <h2 className="font-serif text-2xl font-bold text-[var(--ink)] tracking-tight">
                                Something went wrong
                            </h2>
                            <p className="text-sm text-[var(--ink-3)] leading-relaxed">
                                An unexpected error occurred while loading this page. {"Don't"} worry, your data is safe.
                            </p>
                        </div>

                        {/* Technical Error Details */}
                        {this.state.error && (
                            <div className="p-3 bg-[var(--cream-3)] border border-[var(--border)] rounded-lg text-left overflow-x-auto max-h-24">
                                <code className="text-xs font-mono text-red-600">
                                    {this.state.error.toString()}
                                </code>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                            <button
                                onClick={this.handleReset}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--ink)] text-[var(--cream)] rounded-lg text-sm font-medium hover:opacity-90 transition-all cursor-pointer border-none shadow-sm"
                            >
                                <FiRefreshCw size={16} />
                                Try Again
                            </button>

                            {/*  <a> এর বদলে <Link> ব্যবহার করা হলো */}
                            <Link
                                href="/"
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent text-[var(--ink-2)] border border-[var(--border)] rounded-lg text-sm font-medium hover:bg-[var(--cream-3)] transition-all no-underline text-center"
                            >
                                <FiHome size={16} />
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;