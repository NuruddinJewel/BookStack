export default function DashboardLoading() {
    return (
        <div className="min-h-[60vh] w-full flex flex-col items-center justify-center gap-4 bg-transparent">
            {/* Elegant DaisyUI Ring Spinner */}
            <span className="loading loading-ring loading-lg text-[var(--ink)] w-14 h-14"></span>

            {/* Book/Shelf Theme text */}
            <p className="text-sm font-serif text-[var(--ink-2)] tracking-wide animate-pulse">
                Opening your dashboard shelf...
            </p>
        </div>
    );
}