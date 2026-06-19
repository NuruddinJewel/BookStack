import React from 'react';

export default function LoadingSpinner() {
    return (
        <div className="min-h-screen bg-[var(--cream)] flex flex-col items-center justify-center gap-4">
            {/* Book Flip Animation Structure */}
            <div className="relative w-16 h-12 flex items-center justify-between">
                <div className="w-1 h-full bg-[var(--ink)] opacity-60 rounded-full animate-pulse"></div>

                {/* Book Pages Wrapping Area */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-10 border-2 border-[var(--ink)] rounded-sm relative bg-[var(--cream-2)] flex">
                        {/* Middle Spine */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[var(--border)] -translate-x-1/2"></div>

                        {/* Flipping Page */}
                        <div className="w-1/2 h-full bg-[var(--cream-3)] ml-auto origin-left animate-[spin_1.5s_infinite_linear] border-l border-[var(--border)]"></div>
                    </div>
                </div>

                <div className="w-1 h-full bg-[var(--ink)] opacity-60 rounded-full animate-pulse"></div>
            </div>

            {/* Elegant Font Text */}
            <p className="font-serif italic text-sm text-[var(--ink-2)] tracking-wide animate-pulse">
                Opening the pages...
            </p>

            {/* Custom Tailwind keyframe injecting directly via style if not present in tailwind.config */}
            <style jsx global>{`
                @keyframes spin {
                    0% { transform: rotateY(0deg); }
                    100% { transform: rotateY(-180deg); }
                }
            `}</style>
        </div>
    );
}