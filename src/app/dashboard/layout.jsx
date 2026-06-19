import DashboardSidebar from "@/components/layout/DashboardSidebar";
import ErrorBoundary from "@/components/ui/(shared)/ErrorBoundary";
import PrivateRoute from "@/components/ui/(shared)/PrivateRoute";


export const metadata = {
    title: "Dashboard | F.able",
    description: "Manage your account, ebooks, and platform configurations.",
};

export default function DashboardLayout({ children }) {
    return (
        <ErrorBoundary>
            <PrivateRoute>
                <div className="flex min-h-screen bg-[var(--cream)] text-[var(--ink)]">
                    <DashboardSidebar />
                    <main className="flex-1 p-8 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </PrivateRoute>
        </ErrorBoundary>
    );
}