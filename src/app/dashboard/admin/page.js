// import RoleGuard from "@/components/ui/(shared)/RoleGuard";

// export const metadata = {
//     title: "Admin Home | F.able",
// };

// export default function AdminPage() {
//     return (
//         <RoleGuard allowedRoles={["admin"]}>
//             <div className="space-y-6">
//                 {/* Header */}
//                 <div>
//                     <h1 className="text-2xl font-serif font-bold tracking-tight text-[var(--ink)] m-0">
//                         Admin Overview
//                     </h1>
//                     <p className="text-sm text-[var(--ink-3)] mt-1 m-0">
//                         Welcome back, Administrator. Here is the latest system state.
//                     </p>
//                 </div>

//                 {/* Metrics Grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//                     <div className="p-5 bg-[var(--cream-2)] border border-[var(--border)] rounded-xl">
//                         <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] m-0">Total Users</p>
//                         <h3 className="text-2xl font-bold mt-1.5 text-[var(--ink)] m-0">1,240</h3>
//                     </div>
//                     <div className="p-5 bg-[var(--cream-2)] border border-[var(--border)] rounded-xl">
//                         <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] m-0">Active Ebooks</p>
//                         <h3 className="text-2xl font-bold mt-1.5 text-[var(--ink)] m-0">482</h3>
//                     </div>
//                     <div className="p-5 bg-[var(--cream-2)] border border-[var(--border)] rounded-xl">
//                         <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] m-0">Total Revenue</p>
//                         <h3 className="text-2xl font-bold mt-1.5 text-[var(--ink)] m-0">$12,450</h3>
//                     </div>
//                     <div className="p-5 bg-[var(--cream-2)] border border-[var(--border)] rounded-xl">
//                         <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-3)] m-0">Pending Approvals</p>
//                         <h3 className="text-2xl font-bold mt-1.5 text-[var(--amber)] m-0">7</h3>
//                     </div>
//                 </div>
//             </div>
//         </RoleGuard>
//     );
// }