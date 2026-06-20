// // import { redirect } from 'next/navigation'

// // import { stripe } from '../../lib/stripe'

// // export default async function Success({ searchParams }) {
// //     const { session_id } = await searchParams

// //     if (!session_id)
// //         throw new Error('Please provide a valid session_id (`cs_test_...`)')

// //     const {
// //         status,
// //         customer_details: { email: customerEmail }
// //     } = await stripe.checkout.sessions.retrieve(session_id, {
// //         expand: ['line_items', 'payment_intent']
// //     })

// //     if (status === 'open') {
// //         return redirect('/')
// //     }

// //     if (status === 'complete') {
// //         return (
// //             <section id="success">
// //                 <p>
// //                     {/* We appreciate your business! A confirmation email will be sent to{' '}
// //           {customerEmail}. If you have any questions, please email{' '}
// //           <a href="mailto:orders@example.com">orders@example.com</a>. */}
// //                     Success !!!
// //                 </p>
// //             </section>
// //         )
// //     }
// // }
// import React from 'react';

// const page = () => {
//     return (
//         <h2>
//             Success !!!
//         </h2>
//     );
// };

// export default page;
//2
// import Link from "next/link";
// import { FiCheckCircle, FiArrowRight } from "react-icons/fi";

// async function getSessionDetails(sessionId) {
//     if (!sessionId) return null;
//     try {
//         const res = await fetch(
//             `${process.env.NEXT_PUBLIC_API_URL}/checkout-session/${sessionId}`,
//             { cache: "no-store" }
//         );
//         if (!res.ok) return null;
//         return await res.json();
//     } catch {
//         return null;
//     }
// }

// export default async function SuccessPage({ searchParams }) {
//     const params = await searchParams;
//     const sessionId = params?.session_id;
//     const session = await getSessionDetails(sessionId);

//     return (
//         <div className="min-h-[calc(100vh-56px)] bg-[var(--cream-2)] flex items-center justify-center px-4 py-12">
//             <div className="w-full max-w-md text-center">
//                 <div className="card bg-[var(--cream)] border border-[var(--border)] shadow-sm rounded-xl p-8">

//                     <div className="flex justify-center mb-5">
//                         <div className="w-16 h-16 rounded-full bg-[var(--amber-light)] flex items-center justify-center">
//                             <FiCheckCircle size={32} className="text-[var(--amber)]" />
//                         </div>
//                     </div>

//                     <h1 className="font-serif text-2xl font-medium text-[var(--ink)] mb-2">
//                         Payment successful
//                     </h1>
//                     <p className="text-sm text-[var(--ink-3)] mb-6">
//                         Thank you for your purchase. Your ebook is now available in your library.
//                     </p>

//                     {session && (
//                         <div className="bg-[var(--cream-2)] border border-[var(--border)] rounded-lg p-4 mb-6 text-left text-sm">
//                             <div className="flex justify-between text-[var(--ink-2)] mb-1">
//                                 <span>Amount paid</span>
//                                 <span className="font-medium text-[var(--ink)]">${session.amountTotal?.toFixed(2)}</span>
//                             </div>
//                             {session.customerEmail && (
//                                 <div className="flex justify-between text-[var(--ink-2)]">
//                                     <span>Receipt sent to</span>
//                                     <span className="font-medium text-[var(--ink)]">{session.customerEmail}</span>
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     <Link
//                         href="/dashboard/user/purchases"
//                         className="btn btn-neutral w-full h-11 rounded-lg text-sm font-medium normal-case flex items-center justify-center gap-2"
//                     >
//                         View my purchases <FiArrowRight size={15} />
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }

//Updated

import Link from "next/link";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";

async function getSessionDetails(sessionId) {
    if (!sessionId) return null;
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/checkout-session/${sessionId}`,
            { cache: "no-store" }
        );
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

async function savePurchase(session, sessionId) {
    if (!session || session.paymentStatus !== "paid") return null;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/save-purchase`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ebookId: session.ebookId,
                buyerId: session.buyerId,
                buyerEmail: session.customerEmail,
                stripeSessionId: sessionId,
                amount: session.amountTotal,
            }),
            cache: "no-store",
        });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

export default async function SuccessPage({ searchParams }) {
    const params = await searchParams;
    const sessionId = params?.session_id;
    const session = await getSessionDetails(sessionId);

    // payment successful hole purchase MongoDB e save kora
    if (session) {
        await savePurchase(session, sessionId);
    }

    return (
        <div className="min-h-[calc(100vh-56px)] bg-[var(--cream-2)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md text-center">
                <div className="card bg-[var(--cream)] border border-[var(--border)] shadow-sm rounded-xl p-8">

                    <div className="flex justify-center mb-5">
                        <div className="w-16 h-16 rounded-full bg-[var(--amber-light)] flex items-center justify-center">
                            <FiCheckCircle size={32} className="text-[var(--amber)]" />
                        </div>
                    </div>

                    <h1 className="font-serif text-2xl font-medium text-[var(--ink)] mb-2">
                        Payment successful
                    </h1>
                    <p className="text-sm text-[var(--ink-3)] mb-6">
                        Thank you for your purchase. Your ebook is now available in your library.
                    </p>

                    {session && (
                        <div className="bg-[var(--cream-2)] border border-[var(--border)] rounded-lg p-4 mb-6 text-left text-sm">
                            <div className="flex justify-between text-[var(--ink-2)] mb-1">
                                <span>Amount paid</span>
                                <span className="font-medium text-[var(--ink)]">${session.amountTotal?.toFixed(2)}</span>
                            </div>
                            {session.customerEmail && (
                                <div className="flex justify-between text-[var(--ink-2)]">
                                    <span>Receipt sent to</span>
                                    <span className="font-medium text-[var(--ink)]">{session.customerEmail}</span>
                                </div>
                            )}
                        </div>
                    )}

                    <Link
                        href="/dashboard/user/purchased"
                        className="btn btn-neutral w-full h-11 rounded-lg text-sm font-medium normal-case flex items-center justify-center gap-2"
                    >
                        View my purchases <FiArrowRight size={15} />
                    </Link>
                </div>
            </div>
        </div>
    );
}