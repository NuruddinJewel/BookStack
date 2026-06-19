'use client';
import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    maxWidth = 'max-w-lg'
}) {
    // এস্কেপ বাটন চাপলে মোডাল ক্লোজ করা এবং ব্যাকগ্রাউন্ড স্ক্রল অফ করা
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // পেজ স্ক্রল বন্ধ করে
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop / Overlay */}
            <div
                className="absolute inset-0 bg-[var(--ink)]/40 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div
                className={`relative w-full ${maxWidth} bg-[var(--cream)] border border-[var(--border)] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] transform transition-all duration-300 scale-100 opacity-100 animate-[fadeIn_0.2s_ease-out]`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
                    <h2 className="text-xl font-serif font-semibold text-[var(--ink)] m-0">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-[var(--ink-3)] hover:text-[var(--coral)] hover:bg-[var(--cream-3)] rounded-full transition-colors border-none bg-transparent cursor-pointer"
                        aria-label="Close modal"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                {/* Body / Scrollable Content */}
                <div className="px-6 py-5 overflow-y-auto text-[var(--ink-2)]">
                    {children}
                </div>
            </div>

            {/* Tailwind Custom Keyframes for Modal animation */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
}