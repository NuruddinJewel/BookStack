import RoleGuard from "@/components/ui/RoleGuard";

export const metadata = {
    title: "Writer Studio | F.able",
};

export default function WriterPage() {
    return (
        <RoleGuard allowedRoles={["writer", "admin"]}>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-serif font-bold tracking-tight text-[var(--ink)] m-0">
                        Writer Studio
                    </h1>
                    <p className="text-sm text-[var(--ink-3)] mt-1 m-0">
                        Track your book metrics, sales performances, and creations.
                    </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="p-5 bg-[var(--cream-2)] border border-[var(--border)] rounded-xl">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] m-0">Published Ebooks</p>
                        <h3 className="text-2xl font-bold mt-1.5 text-[var(--ink)] m-0">12</h3>
                    </div>
                    <div className="p-5 bg-[var(--cream-2)] border border-[var(--border)] rounded-xl">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] m-0">Total Copies Sold</p>
                        <h3 className="text-2xl font-bold mt-1.5 text-[var(--ink)] m-0">1,080</h3>
                    </div>
                    <div className="p-5 bg-[var(--cream-2)] border border-[var(--border)] rounded-xl">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] m-0">Net Earnings</p>
                        <h3 className="text-2xl font-bold mt-1.5 text-green-600 m-0">$4,320</h3>
                    </div>
                </div>
            </div>
        </RoleGuard>
    );
}