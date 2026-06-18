import PrivateRoute from "@/components/ui/(shared)/PrivateRoute";
export const metadata = {
    title: "Reader Dashboard | F.able",
};

export default function UserPage() {
    return (
        <PrivateRoute>
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
                    <div className="p-6 bg-[var(--cream-2)] border border-[var(--border)] rounded-xl flex flex-col justify-between">
                        <div>
                            <h3 className="text-base font-semibold text-[var(--ink)] m-0">My Purchased Library</h3>
                            <p className="text-sm text-[var(--ink-3)] mt-1 m-0">Quick access to your bought ebooks.</p>
                        </div>
                        <h2 className="text-3xl font-bold mt-4 text-[var(--ink)] m-0">
                            4 <span className="text-sm font-normal text-[var(--ink-3)]">Books owned</span>
                        </h2>
                    </div>

                    <div className="p-6 bg-[var(--cream-2)] border border-[var(--border)] rounded-xl flex flex-col justify-between">
                        <div>
                            <h3 className="text-base font-semibold text-[var(--ink)] m-0">Bookmarks & Wishlist</h3>
                            <p className="text-sm text-[var(--ink-3)] mt-1 m-0">Books you have saved to read later.</p>
                        </div>
                        <h2 className="text-3xl font-bold mt-4 text-[var(--ink)] m-0">
                            18 <span className="text-sm font-normal text-[var(--ink-3)]">Saved items</span>
                        </h2>
                    </div>
                </div>
            </div>
        </PrivateRoute>
    );
}