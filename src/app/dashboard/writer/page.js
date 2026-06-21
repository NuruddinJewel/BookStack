// import RoleGuard from "@/components/ui/(shared)/RoleGuard";

// export const metadata = {
//     title: "Writer Studio | F.able",
// };

// export default function WriterPage() {
//     return (
//         <RoleGuard allowedRoles={["writer", "admin"]}>
//             <div className="space-y-6">
//                 {/* Header */}
//                 <div>
//                     <h1 className="text-2xl font-serif font-bold tracking-tight text-[var(--ink)] m-0">
//                         Writer Studio
//                     </h1>
//                     <p className="text-sm text-[var(--ink-3)] mt-1 m-0">
//                         Track your book metrics, sales performances, and creations.
//                     </p>
//                 </div>

//                 {/* Metrics Grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
//                     <div className="p-5 bg-[var(--cream-2)] border border-[var(--border)] rounded-xl">
//                         <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] m-0">Published Ebooks</p>
//                         <h3 className="text-2xl font-bold mt-1.5 text-[var(--ink)] m-0">12</h3>
//                     </div>
//                     <div className="p-5 bg-[var(--cream-2)] border border-[var(--border)] rounded-xl">
//                         <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] m-0">Total Copies Sold</p>
//                         <h3 className="text-2xl font-bold mt-1.5 text-[var(--ink)] m-0">1,080</h3>
//                     </div>
//                     <div className="p-5 bg-[var(--cream-2)] border border-[var(--border)] rounded-xl">
//                         <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] m-0">Net Earnings</p>
//                         <h3 className="text-2xl font-bold mt-1.5 text-green-600 m-0">$4,320</h3>
//                     </div>
//                 </div>
//             </div>
//         </RoleGuard>
//     );
// }

//Updated
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
    title: "Writer Studio | F.able",
};

async function getWriterStats(writerId) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        const [booksRes, salesRes] = await Promise.all([
            fetch(`${apiUrl}/writer/my-books?writerId=${writerId}`, { cache: "no-store" }),
            fetch(`${apiUrl}/writer/sales-report?writerId=${writerId}`, { cache: "no-store" }),
        ]);

        const books = booksRes.ok ? await booksRes.json() : [];
        const sales = salesRes.ok ? await salesRes.json() : { stats: {} };

        return {
            publishedCount: books.length,
            totalCopiesSold: sales.stats?.totalCopiesSold || 0,
            netEarnings: sales.stats?.totalRevenue || 0,
        };
    } catch (error) {
        console.error("Error fetching writer stats:", error);
        return { publishedCount: 0, totalCopiesSold: 0, netEarnings: 0 };
    }
}

export default async function WriterPage() {
    const session = await auth.api.getSession({ headers: await headers() });
    const writerId = session?.user?.id;

    const { publishedCount, totalCopiesSold, netEarnings } = await getWriterStats(writerId);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-serif font-bold tracking-tight text-[var(--ink)] m-0">
                    Writer Studio
                </h1>
                <p className="text-sm text-[var(--ink-3)] mt-1 m-0">
                    Track your book metrics, sales performances, and creations.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <Link
                    href="/dashboard/writer/manage"
                    className="p-5 bg-[var(--cream-2)] border border-[var(--border)] rounded-xl no-underline hover:border-[var(--ink-3)] transition-colors"
                >
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] m-0">Published Ebooks</p>
                    <h3 className="text-2xl font-bold mt-1.5 text-[var(--ink)] m-0">{publishedCount}</h3>
                </Link>
                <Link
                    href="/dashboard/writer/sales"
                    className="p-5 bg-[var(--cream-2)] border border-[var(--border)] rounded-xl no-underline hover:border-[var(--ink-3)] transition-colors"
                >
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] m-0">Total Copies Sold</p>
                    <h3 className="text-2xl font-bold mt-1.5 text-[var(--ink)] m-0">{totalCopiesSold}</h3>
                </Link>
                <Link
                    href="/dashboard/writer/sales"
                    className="p-5 bg-[var(--cream-2)] border border-[var(--border)] rounded-xl no-underline hover:border-[var(--ink-3)] transition-colors"
                >
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] m-0">Net Earnings</p>
                    <h3 className="text-2xl font-bold mt-1.5 text-green-600 m-0">${netEarnings.toFixed(2)}</h3>
                </Link>
            </div>
        </div>
    );
}