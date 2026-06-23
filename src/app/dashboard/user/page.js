import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
    title: "Reader Dashboard | F.able",
};

async function getDashboardStats(userId) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        const [purchasedRes, bookmarksRes] = await Promise.all([
            fetch(`${apiUrl}/user/purchased?userId=${userId}`, { cache: "no-store" }),
            fetch(`${apiUrl}/user/bookmarks?userId=${userId}`, { cache: "no-store" }),
        ]);

        const purchased = purchasedRes.ok ? await purchasedRes.json() : [];
        const bookmarks = bookmarksRes.ok ? await bookmarksRes.json() : [];

        return {
            purchasedCount: purchased.length,
            bookmarksCount: bookmarks.length,
        };
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return { purchasedCount: 0, bookmarksCount: 0 };
    }
}

export default async function UserPage() {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;

    const { purchasedCount, bookmarksCount } = await getDashboardStats(userId);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-serif font-bold tracking-tight text-[var(--ink)] m-0">
                    Reader Dashboard
                </h1>
                <p className="text-sm text-[var(--ink-3)] mt-1 m-0">
                    Welcome to your personal library. Dive back into your favorite stories.
                </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Link
                    href="/dashboard/user/purchased"
                    className="p-6 bg-[var(--cream-2)] border border-[var(--border)] rounded-xl flex flex-col justify-between no-underline hover:border-[var(--ink-3)] transition-colors"
                >
                    <div>
                        <h3 className="text-base font-semibold text-[var(--ink)] m-0">My Purchased Library</h3>
                        <p className="text-sm text-[var(--ink-3)] mt-1 m-0">Quick access to your bought ebooks.</p>
                    </div>
                    <h2 className="text-3xl font-bold mt-4 text-[var(--ink)] m-0">
                        {purchasedCount} <span className="text-sm font-normal text-[var(--ink-3)]">Books owned</span>
                    </h2>
                </Link>

                <Link
                    href="/dashboard/user/bookmarks"
                    className="p-6 bg-[var(--cream-2)] border border-[var(--border)] rounded-xl flex flex-col justify-between no-underline hover:border-[var(--ink-3)] transition-colors"
                >
                    <div>
                        <h3 className="text-base font-semibold text-[var(--ink)] m-0">Bookmarks & Wishlist</h3>
                        <p className="text-sm text-[var(--ink-3)] mt-1 m-0">Books you have saved to read later.</p>
                    </div>
                    <h2 className="text-3xl font-bold mt-4 text-[var(--ink)] m-0">
                        {bookmarksCount} <span className="text-sm font-normal text-[var(--ink-3)]">Saved items</span>
                    </h2>
                </Link>
            </div>
        </div>
    );
}