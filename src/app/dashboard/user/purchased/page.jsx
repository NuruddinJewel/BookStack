// 'use client';
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { FiBookOpen, FiDownload, FiClock } from 'react-icons/fi';

// export default function PurchasedEbooksPage() {
//     const [purchasedBooks, setPurchasedBooks] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         async function fetchPurchasedBooks() {
//             try {
//                 const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

//                 const token = localStorage.getItem('token');

//                 const res = await fetch(`${apiUrl}/user/purchased`, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json'
//                     }
//                 });

//                 if (res.ok) {
//                     const data = await res.json();
//                     setPurchasedBooks(data); // Database Set
//                 } else {
//                     console.error("Failed to fetch purchased books. Status:", res.status);
//                 }
//             } catch (error) {
//                 console.error("Error connecting to backend server:", error);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchPurchasedBooks();
//     }, []);

//     return (
//         <div className="space-y-8">
//             {/* Page Header */}
//             <div>
//                 <h1 className="text-3xl font-serif font-bold text-[var(--ink)] m-0">
//                     My Purchased Library
//                 </h1>
//                 <p className="text-sm text-[var(--ink-3)] mt-2 m-0">
//                     Access and read all the ebooks you have purchased.
//                 </p>
//             </div>

//             {/* Loading State */}
//             {loading ? (
//                 <div className="py-20 text-center flex flex-col items-center justify-center">
//                     <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--ink)]"></div>
//                     <p className="mt-4 text-sm text-[var(--ink-3)]">Loading your library...</p>
//                 </div>
//             ) : purchasedBooks.length > 0 ? (
//                 /* Ebooks Grid */
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {purchasedBooks.map((item) => {
//                         const book = item.book || item;
//                         const bookId = book.id || book._id;

//                         return (
//                             <div
//                                 key={bookId}
//                                 className="flex gap-4 bg-[var(--cream-2)] border border-[var(--border)] rounded-2xl p-4 hover:shadow-sm transition-all duration-300"
//                             >
//                                 {/* Book Cover Image */}
//                                 <div className="w-24 aspect-[2/3] relative rounded-xl overflow-hidden bg-[var(--ink)] flex-shrink-0">
//                                     {book.coverImage ? (
//                                         <Image
//                                             src={book.coverImage}
//                                             alt={book.title || "Book Cover"}
//                                             fill
//                                             sizes="96px"
//                                             className="object-cover"
//                                         />
//                                     ) : (
//                                         <div className="w-full h-full flex items-center justify-center text-[var(--cream-2)] text-[10px]">No Cover</div>
//                                     )}
//                                 </div>

//                                 {/* Book Details & Actions */}
//                                 <div className="flex flex-col flex-1 min-w-0">
//                                     <h3 className="font-serif font-bold text-base text-[var(--ink)] line-clamp-1 m-0">
//                                         {book.title}
//                                     </h3>
//                                     <p className="text-xs text-[var(--ink-3)] mt-1 m-0">
//                                         By {book.author || "Unknown"}
//                                     </p>

//                                     {/* Purchase Date (If available in transaction) */}
//                                     {item.purchaseDate && (
//                                         <div className="flex items-center gap-1 text-[11px] text-[var(--ink-3)] mt-2">
//                                             <FiClock size={12} />
//                                             <span>Purchased: {new Date(item.purchaseDate).toLocaleDateString()}</span>
//                                         </div>
//                                     )}

//                                     {/* Action Buttons */}
//                                     <div className="mt-auto flex gap-2">
//                                         <Link
//                                             href={`/ebooks/${bookId}/read`}
//                                             className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[var(--ink)] text-[var(--cream)] rounded-xl text-xs font-medium hover:opacity-90 transition-opacity no-underline"
//                                         >
//                                             <FiBookOpen size={14} />
//                                             Read Now
//                                         </Link>

//                                         {book.downloadUrl && (
//                                             <a
//                                                 href={book.downloadUrl}
//                                                 download
//                                                 className="flex items-center justify-center p-2 bg-[var(--cream)] border border-[var(--border)] text-[var(--ink-2)] rounded-xl hover:border-[var(--ink-3)] transition-colors"
//                                                 title="Download PDF/EPUB"
//                                             >
//                                                 <FiDownload size={14} />
//                                             </a>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             ) : (
//                 /* Empty State  */
//                 <div className="border border-dashed border-[var(--border)] rounded-2xl p-12 text-center max-w-md mx-auto mt-10">
//                     <div className="w-12 h-12 bg-[var(--cream-2)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--ink-3)] mx-auto mb-4">
//                         <FiBookOpen size={20} />
//                     </div>
//                     <h3 className="text-lg font-serif font-bold text-[var(--ink)] mb-1">Your library is empty</h3>
//                     <p className="text-xs text-[var(--ink-3)] mb-6">
//                         You {"haven't"} purchased any ebooks yet. Start exploring our collection to find your next favorite book!
//                     </p>
//                     <Link
//                         href="/browse"
//                         className="inline-flex px-5 py-2.5 bg-[var(--ink)] text-[var(--cream)] rounded-xl text-xs font-medium hover:opacity-90 transition-opacity no-underline"
//                     >
//                         Browse Ebooks
//                     </Link>
//                 </div>
//             )}
//         </div>
//     );
// }

//For Stripe Payment Configuration

'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiBookOpen, FiDownload, FiClock } from 'react-icons/fi';
import { useSession } from '@/lib/auth-client';

export default function PurchasedEbooksPage() {
    const { data: session, isPending } = useSession();
    const [purchasedBooks, setPurchasedBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // session load 
        if (isPending) return;

        async function fetchPurchasedBooks() {
            const userId = session?.user?.id;

            if (!userId) {
                setLoading(false);
                return;
            }

            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const res = await fetch(`${apiUrl}/user/purchased?userId=${userId}`);

                if (res.ok) {
                    const data = await res.json();
                    setPurchasedBooks(data);
                } else {
                    console.error("Failed to fetch purchased books. Status:", res.status);
                }
            } catch (error) {
                console.error("Error connecting to backend server:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPurchasedBooks();
    }, [session, isPending]);

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-serif font-bold text-[var(--ink)] m-0">
                    My Purchased Library
                </h1>
                <p className="text-sm text-[var(--ink-3)] mt-2 m-0">
                    Access and read all the ebooks you have purchased.
                </p>
            </div>

            {/* Loading State / Content Conditional Rendering */}
            {loading || isPending ? (
                <div className="py-20 text-center flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--ink)]"></div>
                    <p className="mt-4 text-sm text-[var(--ink-3)]">Loading your library...</p>
                </div>
            ) : purchasedBooks.length > 0 ? (
                /* Ebooks Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {purchasedBooks.map((item) => {
                        const book = item.book;
                        if (!book) return null; // book delete skip

                        const bookId = book._id;

                        return (
                            <div
                                key={item._id}
                                className="flex gap-4 bg-[var(--cream-2)] border border-[var(--border)] rounded-2xl p-4 hover:shadow-sm transition-all duration-300"
                            >
                                {/* Book Cover Image */}
                                <div className="w-24 aspect-[2/3] relative rounded-xl overflow-hidden bg-[var(--ink)] flex-shrink-0">
                                    {book.coverImage ? (
                                        <Image
                                            src={book.coverImage}
                                            alt={book.title || "Book Cover"}
                                            fill
                                            sizes="96px"
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[var(--cream-2)] text-[10px]">No Cover</div>
                                    )}
                                </div>

                                {/* Book Details & Actions */}
                                <div className="flex flex-col flex-1 min-w-0">
                                    <h3 className="font-serif font-bold text-base text-[var(--ink)] line-clamp-1 m-0">
                                        {book.title}
                                    </h3>
                                    <p className="text-xs text-[var(--ink-3)] mt-1 m-0">
                                        By {book.author || book.writerName || "Unknown"}
                                    </p>

                                    {item.purchaseDate && (
                                        <div className="flex items-center gap-1 text-[11px] text-[var(--ink-3)] mt-2">
                                            <FiClock size={12} />
                                            <span>Purchased: {new Date(item.purchaseDate).toLocaleDateString()}</span>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="mt-auto flex gap-2 pt-3">
                                        {/* <button
                                            // href={`/ebooks/${bookId}/read`}
                                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[var(--ink)] text-[var(--cream)] rounded-xl text-xs font-medium hover:opacity-90 transition-opacity no-underline"
                                        >
                                            <FiBookOpen size={14} />
                                            Read Now
                                        </button> */}
                                        <button
                                            // href={`/ebooks/${bookId}/read`}
                                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[var(--ink)] text-[var(--cream)] rounded-xl text-xs font-medium hover:opacity-90 active:scale-95 active:opacity-80 transition-all duration-150 no-underline"
                                        >
                                            <FiBookOpen size={14} />
                                            Read Now
                                        </button>

                                        {/* Download Button */}
                                        {book.downloadUrl && (
                                            <a
                                                href={book.downloadUrl}
                                                download
                                                className="flex items-center justify-center p-2 bg-[var(--cream)] border border-[var(--border)] text-[var(--ink-2)] rounded-xl hover:border-[var(--ink-3)] transition-colors"
                                                title="Download PDF/EPUB"
                                            >
                                                <FiDownload size={14} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* Empty State */
                <div className="border border-dashed border-[var(--border)] rounded-2xl p-12 text-center max-w-md mx-auto mt-10">
                    <div className="w-12 h-12 bg-[var(--cream-2)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--ink-3)] mx-auto mb-4">
                        <FiBookOpen size={20} />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[var(--ink)] mb-1">Your library is empty</h3>
                    <p className="text-xs text-[var(--ink-3)] mb-6">
                        You {"haven't"} purchased any ebooks yet. Start exploring our collection to find your next favorite book!
                    </p>
                    <Link
                        href="/browse"
                        className="inline-flex px-5 py-2.5 bg-[var(--ink)] text-[var(--cream)] rounded-xl text-xs font-medium hover:opacity-90 transition-opacity no-underline"
                    >
                        Browse Ebooks
                    </Link>
                </div>
            )}
        </div>
    );
}