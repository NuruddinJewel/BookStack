import React from 'react';

export default function Loading() {
    return (
        <div className="min-h-[80vh] bg-[var(--cream)] flex flex-col items-center justify-center px-6">
            <div className="flex flex-col items-center gap-6 text-center max-w-sm">


                <div className="relative w-20 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-[var(--amber)] opacity-10 animate-ping"></div>

                    <span className="loading loading-ring loading-lg text-[var(--ink)] w-16 h-16"></span>

                    <div className="absolute w-4 h-4 bg-[var(--amber)] rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-medium text-[var(--ink)] animate-pulse">
                        Opening the Fable...
                    </h3>
                    <p className="text-sm text-[var(--ink-3)] tracking-wide">
                        Waking up our archival shelves. Please hold on a brief moment.
                    </p>
                </div>
                <progress className="progress progress-warning w-44 bg-[var(--cream-2)] border border-[var(--border)] h-1.5"></progress>
            </div>
        </div>
    );
}