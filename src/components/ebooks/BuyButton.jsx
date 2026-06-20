"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiShoppingCart, FiCheckCircle } from "react-icons/fi";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function BuyButton({ book }) {
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const [loading, setLoading] = useState(false);

    const user = session?.user;
    const isOwner = user && book.writerId === user.id;
    const isSold = book.isSold;

    const handleBuy = async () => {
        if (!user) {
            router.push(`/login?callbackUrl=/ebooks/${book._id}`);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/checkout_sessions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ebookId: book._id,
                    title: book.title,
                    price: book.price,
                    coverImage: book.coverImage,
                    buyerId: user.id,
                    writerId: book.writerId,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Failed to start checkout.");
                return;
            }

            // Stripe checkout 
            window.location.href = data.url;
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Already purchased / sold
    //     if (isSold) {
    //         return (
    //             <button
    //                 disabled
    //                 className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-[var(--cream-3)] text-[var(--ink-3)] rounded-xl font-medium border-none cursor-not-allowed"
    //             >
    //                 <FiCheckCircle size={20} />
    //                 Already Purchased
    //             </button>
    //         );
    // }

    // Writer won't buy own books
    if (isOwner) {
        return (
            <button
                disabled
                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-[var(--cream-3)] text-[var(--ink-3)] rounded-xl font-medium border-none cursor-not-allowed"
                title="You cannot purchase your own ebook"
            >
                <FiShoppingCart size={20} />
                This is your ebook
            </button>
        );
    }

    return (
        <button
            onClick={handleBuy}
            disabled={loading || isPending}
            className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-[var(--ink)] text-[var(--cream)] rounded-xl font-medium hover:opacity-90 transition-opacity border-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
            {loading ? (
                <span className="loading loading-spinner loading-sm" />
            ) : (
                <FiShoppingCart size={20} />
            )}
            {loading ? "Redirecting..." : "Buy Now"}
        </button>
    );
}