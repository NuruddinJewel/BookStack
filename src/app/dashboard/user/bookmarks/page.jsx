// 'use client';
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { FiTrash2, FiHeart, FiBookOpen } from 'react-icons/fi';

// export default function BookmarkPage() {
//     const [bookmarks, setBookmarks] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // BookMark Data
//     // const fetchBookmarks = async () => {
//     //     try {
//     //         const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//     //         const token = localStorage.getItem('token');

//     //         const res = await fetch(`${apiUrl}/user/bookmarks`, {
//     //             headers: {
//     //                 'Authorization': `Bearer ${token}`,
//     //                 'Content-Type': 'application/json'
//     //             }
//     //         });

//     //         if (res.ok) {
//     //             const data = await res.json();
//     //             setBookmarks(data);
//     //         } else {
//     //             console.error("Failed to fetch bookmarks");
//     //         }
//     //     } catch (error) {
//     //         console.error("Error connecting to server:", error);
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };

//     // useEffect(() => {
//     //     fetchBookmarks();
//     // }, []);

//     // fetchBookmarks (signal Parameter)
//     const fetchBookmarks = async (signal) => {
//         try {
//             const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//             const token = localStorage.getItem('token');

//             const res = await fetch(`${apiUrl}/user/bookmarks`, {
//                 signal, // 🟢 নেটওয়ার্ক রিকোয়েস্ট ট্র্যাক করার জন্য সিগন্যাল
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (res.ok) {
//                 const data = await res.json();
//                 setBookmarks(data);
//             } else {
//                 console.error("Failed to fetch bookmarks");
//             }
//         } catch (error) {
//             // AbortError হলে সেটিকে কনসোলে এরর হিসেবে দেখানোর দরকার নেই
//             if (error.name !== 'AbortError') {
//                 console.error("Error connecting to server:", error);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     //  useEffect 
//     useEffect(() => {
//         const controller = new AbortController();

//         fetchBookmarks(controller.signal);

//         // Cleanup Function
//         return () => {
//             controller.abort();
//         };
//     }, []);


//     // BookMark Remove
//     const handleRemoveBookmark = async (bookmarkId) => {
//         try {
//             const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//             const token = localStorage.getItem('token');

//             const res = await fetch(`${apiUrl}/user/bookmarks/${bookmarkId}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 }
//             });

//             if (res.ok) {
//                 // UI Update
//                 setBookmarks(bookmarks.filter(item => item._id !== bookmarkId));
//             } else {
//                 console.error("Failed to delete bookmark");
//             }
//         } catch (error) {
//             console.error("Error deleting bookmark:", error);
//         }
//     };

//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div>
//                 <h1 className="text-2xl font-serif font-bold tracking-tight text-[var(--ink)] m-0">
//                     My Bookmarks & Wishlist
//                 </h1>
//                 <p className="text-sm text-[var(--ink-3)] mt-1 m-0">
//                     Books you have saved to read or purchase later.
//                 </p>
//             </div>

//             {loading ? (
//                 /* Loading State */
//                 <div className="py-20 text-center flex flex-col items-center justify-center">
//                     <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--ink)]"></div>
//                     <p className="mt-4 text-sm text-[var(--ink-3)]">Loading your wishlist...</p>
//                 </div>
//             ) : bookmarks.length > 0 ? (
//                 /* Bookmarks Grid */
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {bookmarks.map((item) => {
//                         const book = item.book || {};
//                         const bookId = book._id || book.id;

//                         return (
//                             <div
//                                 key={item._id}
//                                 className="group bg-[var(--cream-2)] border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col hover:shadow-sm transition-all duration-300"
//                             >
//                                 {/* Book Cover Image */}
//                                 <div className="aspect-[2/3] w-full relative overflow-hidden bg-[var(--ink)]">
//                                     {book.coverImage ? (
//                                         <Image
//                                             src={book.coverImage}
//                                             alt={book.title || "Book Cover"}
//                                             fill
//                                             sizes="(max-width: 768px) 100vw, 25vw"
//                                             className="object-cover"
//                                         />
//                                     ) : (
//                                         <div className="w-full h-full flex items-center justify-center text-[var(--cream-2)] text-xs">No Cover</div>
//                                     )}
//                                 </div>

//                                 {/* Book Info */}
//                                 <div className="p-4 flex flex-col flex-1">
//                                     <h4 className="font-serif font-bold text-sm text-[var(--ink)] line-clamp-1 m-0">
//                                         {book.title || "Untitled Book"}
//                                     </h4>
//                                     <p className="text-xs text-[var(--ink-3)] mt-1 mb-3 m-0">By {book.author || "Unknown"}</p>

//                                     {/* Action Buttons */}
//                                     <div className="mt-auto flex gap-2">
//                                         <Link
//                                             href={`/ebooks/${bookId}`}
//                                             className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[var(--ink)] text-[var(--cream)] rounded-xl text-xs font-medium hover:opacity-90 transition-opacity no-underline"
//                                         >
//                                             <FiBookOpen size={12} />
//                                             View Details
//                                         </Link>
//                                         <button
//                                             onClick={() => handleRemoveBookmark(item._id)}
//                                             className="p-2 border border-[var(--border)] bg-[var(--cream)] text-red-600 rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
//                                             title="Remove from bookmarks"
//                                         >
//                                             <FiTrash2 size={14} />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             ) : (
//                 /* Empty State */
//                 <div className="border border-dashed border-[var(--border)] rounded-2xl p-12 text-center max-w-md mx-auto mt-10">
//                     <div className="w-12 h-12 bg-[var(--cream-2)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--ink-3)] mx-auto mb-4">
//                         <FiHeart size={20} />
//                     </div>
//                     <h3 className="text-lg font-serif font-bold text-[var(--ink)] mb-1">Your wishlist is empty</h3>
//                     <p className="text-xs text-[var(--ink-3)] mb-6">
//                         Tap the bookmark icon while browsing to save books here.
//                     </p>
//                     <Link
//                         href="/browse"
//                         className="inline-flex px-5 py-2.5 bg-[var(--ink)] text-[var(--cream)] rounded-xl text-xs font-medium hover:opacity-90 transition-opacity no-underline"
//                     >
//                         Explore Books
//                     </Link>
//                 </div>
//             )}
//         </div>
//     );
// }

'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiTrash2, FiHeart, FiBookOpen } from 'react-icons/fi';
import { useSession } from '@/lib/auth-client';

export default function BookmarkPage() {
    const { data: session, isPending } = useSession();
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookmarks = async (userId, signal) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

            const res = await fetch(`${apiUrl}/user/bookmarks?userId=${userId}`, { signal });

            if (res.ok) {
                const data = await res.json();
                setBookmarks(data);
            } else {
                console.error("Failed to fetch bookmarks");
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error("Error connecting to server:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isPending) return;

        const userId = session?.user?.id;
        if (!userId) {
            setLoading(false);
            return;
        }

        const controller = new AbortController();
        fetchBookmarks(userId, controller.signal);

        return () => controller.abort();
    }, [session, isPending]);

    const handleRemoveBookmark = async (bookmarkId) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

            const res = await fetch(`${apiUrl}/user/bookmarks/${bookmarkId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setBookmarks(bookmarks.filter(item => item._id !== bookmarkId));
            } else {
                console.error("Failed to delete bookmark");
            }
        } catch (error) {
            console.error("Error deleting bookmark:", error);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-serif font-bold tracking-tight text-[var(--ink)] m-0">
                    My Bookmarks & Wishlist
                </h1>
                <p className="text-sm text-[var(--ink-3)] mt-1 m-0">
                    Books you have saved to read or purchase later.
                </p>
            </div>

            {loading || isPending ? (
                <div className="py-20 text-center flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--ink)]"></div>
                    <p className="mt-4 text-sm text-[var(--ink-3)]">Loading your wishlist...</p>
                </div>
            ) : bookmarks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {bookmarks.map((item) => {
                        const book = item.book;
                        if (!book) return null;

                        return (
                            <div
                                key={item._id}
                                className="group bg-[var(--cream-2)] border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col hover:shadow-sm transition-all duration-300"
                            >
                                <div className="aspect-[2/3] w-full relative overflow-hidden bg-[var(--ink)]">
                                    {book.coverImage ? (
                                        <Image
                                            src={book.coverImage}
                                            alt={book.title || "Book Cover"}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[var(--cream-2)] text-xs">No Cover</div>
                                    )}
                                </div>

                                <div className="p-4 flex flex-col flex-1">
                                    <h4 className="font-serif font-bold text-sm text-[var(--ink)] line-clamp-1 m-0">
                                        {book.title || "Untitled Book"}
                                    </h4>
                                    <p className="text-xs text-[var(--ink-3)] mt-1 mb-3 m-0">By {book.author || book.writerName || "Unknown"}</p>

                                    <div className="mt-auto flex gap-2">
                                        <Link
                                            href={`/ebooks/${book._id}`}
                                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[var(--ink)] text-[var(--cream)] rounded-xl text-xs font-medium hover:opacity-90 transition-opacity no-underline"
                                        >
                                            <FiBookOpen size={12} />
                                            View Details
                                        </Link>
                                        <button
                                            onClick={() => handleRemoveBookmark(item._id)}
                                            className="p-2 border border-[var(--border)] bg-[var(--cream)] text-red-600 rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
                                            title="Remove from bookmarks"
                                        >
                                            <FiTrash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="border border-dashed border-[var(--border)] rounded-2xl p-12 text-center max-w-md mx-auto mt-10">
                    <div className="w-12 h-12 bg-[var(--cream-2)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--ink-3)] mx-auto mb-4">
                        <FiHeart size={20} />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[var(--ink)] mb-1">Your wishlist is empty</h3>
                    <p className="text-xs text-[var(--ink-3)] mb-6">
                        Tap the bookmark icon while browsing to save books here.
                    </p>
                    <Link
                        href="/browse"
                        className="inline-flex px-5 py-2.5 bg-[var(--ink)] text-[var(--cream)] rounded-xl text-xs font-medium hover:opacity-90 transition-opacity no-underline"
                    >
                        Explore Books
                    </Link>
                </div>
            )}
        </div>
    );
}