// 'use client';
// import React, { useState, useEffect, useRef } from 'react';
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import { FiCheckCircle, FiArrowRight } from "react-icons/fi";
// import { useSession } from '@/lib/auth-client';

// export default function SuccessPage() {
//     const searchParams = useSearchParams();
//     const sessionId = searchParams.get('session_id');

//     // User Session Loading
//     const { data: authSession, isPending: isAuthPending } = useSession();

//     // Stripe Payment 
//     const [stripeSession, setStripeSession] = useState(null);
//     const [pageLoading, setPageLoading] = useState(true);

//     // React Strict Mode-Single Reference
//     const hasSaved = useRef(false);

//     useEffect(() => {
//         if (!sessionId) {
//             setPageLoading(false);
//             return;
//         }

//         if (hasSaved.current) return;
//         hasSaved.current = true;

//         async function handlePaymentSuccess() {
//             try {
//                 const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

//                 // Stripe Session Details
//                 const res = await fetch(`${apiUrl}/checkout-session/${sessionId}`);
//                 if (!res.ok) {
//                     setPageLoading(false);
//                     return;
//                 }
//                 const sessionData = await res.json();
//                 setStripeSession(sessionData);

//                 // Payment Success
//                 if (sessionData && sessionData.paymentStatus === "paid") {
//                     await fetch(`${apiUrl}/save-purchase`, {
//                         method: "POST",
//                         headers: { "Content-Type": "application/json" },
//                         body: JSON.stringify({
//                             ebookId: sessionData.ebookId,
//                             buyerId: sessionData.buyerId,
//                             buyerEmail: sessionData.customerEmail,
//                             stripeSessionId: sessionId,
//                             amount: sessionData.amountTotal,
//                         }),
//                     });
//                 }
//             } catch (error) {
//                 console.error("Error confirming purchase:", error);
//             } finally {
//                 setPageLoading(false);
//             }
//         }

//         handlePaymentSuccess();
//     }, [sessionId]);

//     //Page Load
//     if (pageLoading || isAuthPending) {
//         return (
//             <div className="min-h-[calc(100vh-56px)] bg-[var(--cream-2)] flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--ink)]"></div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-[calc(100vh-56px)] bg-[var(--cream-2)] flex items-center justify-center px-4 py-12">
//             <div className="w-full max-w-md text-center">
//                 <div className="card bg-[var(--cream)] border border-[var(--border)] shadow-sm rounded-xl p-8">

//                     {/* Success Icon */}
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

//                     {/* Receipt Details Block */}
//                     {stripeSession && (
//                         <div className="bg-[var(--cream-2)] border border-[var(--border)] rounded-lg p-4 mb-6 text-left text-sm">
//                             <div className="flex justify-between text-[var(--ink-2)] mb-1">
//                                 <span>Amount paid</span>
//                                 <span className="font-medium text-[var(--ink)]">
//                                     ${stripeSession.amountTotal ? (stripeSession.amountTotal).toFixed(2) : "0.00"}
//                                 </span>
//                             </div>
//                             {stripeSession.customerEmail && (
//                                 <div className="flex justify-between text-[var(--ink-2)]">
//                                     <span>Receipt sent to</span>
//                                     <span className="font-medium text-[var(--ink)]">{stripeSession.customerEmail}</span>
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     {/* Dynamic Button */}
//                     <Link
//                         href={authSession?.user?.role === 'writer' ? "/dashboard/writer/manage" : "/dashboard/user/purchased"}
//                         className="btn btn-neutral w-full h-11 rounded-lg text-sm font-medium normal-case flex items-center justify-center gap-2 active:scale-95 transition-all"
//                     >
//                         {authSession?.user?.role === 'writer' ? "Manage my books" : "View my purchases"}
//                         <FiArrowRight size={15} />
//                     </Link>

//                 </div>
//             </div>
//         </div>
//     );
// }


'use client';
import React, { useState, useEffect, useRef, Suspense } from 'react'; // Suspense 
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { useSession } from '@/lib/auth-client';

// Payment Success
function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');

    // User Session Loading
    const { data: authSession, isPending: isAuthPending } = useSession();

    // Stripe Payment 
    const [stripeSession, setStripeSession] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);

    // React Strict Mode-Single Reference
    const hasSaved = useRef(false);

    useEffect(() => {
        if (!sessionId) {
            setPageLoading(false);
            return;
        }

        if (hasSaved.current) return;
        hasSaved.current = true;

        async function handlePaymentSuccess() {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

                // Stripe Session Details
                const res = await fetch(`${apiUrl}/checkout-session/${sessionId}`);
                if (!res.ok) {
                    setPageLoading(false);
                    return;
                }
                const sessionData = await res.json();
                setStripeSession(sessionData);

                // Payment Success
                if (sessionData && sessionData.paymentStatus === "paid") {
                    await fetch(`${apiUrl}/save-purchase`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            ebookId: sessionData.ebookId,
                            buyerId: sessionData.buyerId,
                            buyerEmail: sessionData.customerEmail,
                            stripeSessionId: sessionId,
                            amount: sessionData.amountTotal,
                        }),
                    });
                }
            } catch (error) {
                console.error("Error confirming purchase:", error);
            } finally {
                setPageLoading(false);
            }
        }

        handlePaymentSuccess();
    }, [sessionId]);

    // Page Load
    if (pageLoading || isAuthPending) {
        return (
            <div className="min-h-[calc(100vh-56px)] bg-[var(--cream-2)] flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--ink)]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-56px)] bg-[var(--cream-2)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md text-center">
                <div className="card bg-[var(--cream)] border border-[var(--border)] shadow-sm rounded-xl p-8">

                    {/* Success Icon */}
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

                    {/* Receipt Details Block */}
                    {stripeSession && (
                        <div className="bg-[var(--cream-2)] border border-[var(--border)] rounded-lg p-4 mb-6 text-left text-sm">
                            <div className="flex justify-between text-[var(--ink-2)] mb-1">
                                <span>Amount paid</span>
                                <span className="font-medium text-[var(--ink)]">
                                    ${stripeSession.amountTotal ? (stripeSession.amountTotal).toFixed(2) : "0.00"}
                                </span>
                            </div>
                            {stripeSession.customerEmail && (
                                <div className="flex justify-between text-[var(--ink-2)]">
                                    <span>Receipt sent to</span>
                                    <span className="font-medium text-[var(--ink)]">{stripeSession.customerEmail}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Dynamic Button */}
                    <Link
                        href={authSession?.user?.role === 'writer' ? "/dashboard/writer/manage" : "/dashboard/user/purchased"}
                        className="btn btn-neutral w-full h-11 rounded-lg text-sm font-medium normal-case flex items-center justify-center gap-2 active:scale-95 transition-all"
                    >
                        {authSession?.user?.role === 'writer' ? "Manage my books" : "View my purchases"}
                        <FiArrowRight size={15} />
                    </Link>

                </div>
            </div>
        </div>
    );
}

// Suspense
export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-[calc(100vh-56px)] bg-[var(--cream-2)] flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--ink)]"></div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}