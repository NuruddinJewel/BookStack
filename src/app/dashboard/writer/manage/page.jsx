// 'use client';
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { FiEdit3, FiTrash2, FiBook, FiPlus, FiStar } from 'react-icons/fi';

// export default function ManageBooksPage() {
//     const [books, setBooks] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Backend
//     const fetchWriterBooks = async (signal) => {
//         try {
//             const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//             const token = localStorage.getItem('token');

//             const res = await fetch(`${apiUrl}/writer/my-books`, {
//                 signal,
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (res.ok) {
//                 const data = await res.json();
//                 setBooks(data);
//             } else {
//                 console.error("Failed to fetch writer books");
//             }
//         } catch (error) {
//             if (error.name !== 'AbortError') {
//                 console.error("Error loading books:", error);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const controller = new AbortController();
//         fetchWriterBooks(controller.signal);

//         return () => {
//             controller.abort();
//         };
//     }, []);

//     // Book Delete
//     const handleDeleteBook = async (bookId) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this ebook?");
//         if (!confirmDelete) return;

//         try {
//             const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//             const token = localStorage.getItem('token');

//             const res = await fetch(`${apiUrl}/writer/books/${bookId}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             if (res.ok) {
//                 // UI Update
//                 setBooks(books.filter(book => book._id !== bookId));
//             } else {
//                 alert("Failed to delete the book");
//             }
//         } catch (error) {
//             console.error("Error deleting book:", error);
//         }
//     };

//     return (
//         <div className="space-y-6">
//             {/* Header with Add New Button */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                 <div>
//                     <h1 className="text-2xl font-serif font-bold tracking-tight text-[var(--ink)] m-0">
//                         Manage My Ebooks
//                     </h1>
//                     <p className="text-sm text-[var(--ink-3)] mt-1 m-0">
//                         View, edit info, or delete your published and pending ebooks.
//                     </p>
//                 </div>
//                 <Link
//                     href="/dashboard/writer/add"
//                     className="flex items-center gap-2 px-4 py-2.5 bg-[var(--ink)] text-[var(--cream)] rounded-xl text-xs font-medium hover:opacity-90 transition-opacity no-underline cursor-pointer"
//                 >
//                     <FiPlus size={16} />
//                     Add New Ebook
//                 </Link>
//             </div>

//             {loading ? (
//                 /* Loading State */
//                 <div className="py-20 text-center flex flex-col items-center justify-center">
//                     <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--ink)]"></div>
//                     <p className="mt-4 text-sm text-[var(--ink-3)]">Loading your books...</p>
//                 </div>
//             ) : books.length > 0 ? (
//                 /* Books Grid */
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {books.map((book) => {
//                         return (
//                             <div
//                                 key={book._id}
//                                 className="group bg-[var(--cream-2)] border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col hover:shadow-sm transition-all duration-300"
//                             >
//                                 {/* Book Cover Image & Status Tag */}
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

//                                     {/* Status Badge (Pending / Approved) */}
//                                     <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${book.status === 'approved'
//                                         ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
//                                         : 'bg-amber-50 border-amber-200 text-amber-700'
//                                         }`}>
//                                         {book.status || 'pending'}
//                                     </span>
//                                 </div>

//                                 {/* Book Info */}
//                                 <div className="p-4 flex flex-col flex-1">
//                                     <h4 className="font-serif font-bold text-sm text-[var(--ink)] line-clamp-1 m-0">
//                                         {book.title || "Untitled"}
//                                     </h4>
//                                     <p className="text-xs text-[var(--ink-3)] mt-1 m-0">Genre: {book.category || "General"}</p>

//                                     {/* Price & Rating Display */}
//                                     <div className="flex items-center justify-between mt-3 mb-4">
//                                         <span className="font-bold text-base text-[var(--ink)]">
//                                             ${typeof book.price === 'number' ? book.price.toFixed(2) : "0.00"}
//                                         </span>
//                                         <div className="flex items-center gap-1 text-xs text-[var(--ink-2)]">
//                                             <FiStar className="text-[var(--amber)] fill-[var(--amber)]" size={12} />
//                                             <span>{book.rating || "0.0"}</span>
//                                         </div>
//                                     </div>

//                                     {/* Edit & Delete Actions */}
//                                     <div className="mt-auto flex gap-2">
//                                         <Link
//                                             href={`/dashboard/writer/edit/${book._id}`}
//                                             className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-[var(--border)] bg-[var(--cream)] text-[var(--ink)] hover:border-[var(--ink-3)] rounded-xl text-xs font-medium transition-colors no-underline"
//                                         >
//                                             <FiEdit3 size={12} />
//                                             Edit Info
//                                         </Link>
//                                         <button
//                                             onClick={() => handleDeleteBook(book._id)}
//                                             className="p-2 border border-[var(--border)] bg-[var(--cream)] text-red-600 rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
//                                             title="Delete Ebook"
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
//                 /* Empty State  */
//                 <div className="border border-dashed border-[var(--border)] rounded-2xl p-12 text-center max-w-md mx-auto mt-10">
//                     <div className="w-12 h-12 bg-[var(--cream-2)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--ink-3)] mx-auto mb-4">
//                         <FiBook size={20} />
//                     </div>
//                     <h3 className="text-lg font-serif font-bold text-[var(--ink)] mb-1">No books published</h3>
//                     <p className="text-xs text-[var(--ink-3)] mb-6">
//                         You {"haven't"} uploaded any ebooks yet. Share your stories with the world!
//                     </p>
//                     <Link
//                         href="/dashboard/writer/add"
//                         className="inline-flex px-5 py-2.5 bg-[var(--ink)] text-[var(--cream)] rounded-xl text-xs font-medium hover:opacity-90 transition-opacity no-underline"
//                     >
//                         Upload Your First Book
//                     </Link>
//                 </div>
//             )}
//         </div>
//     );
// }

//Updated-2
// 'use client';
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { FiEdit3, FiTrash2, FiBook, FiPlus, FiStar } from 'react-icons/fi';
// import { useSession } from '@/lib/auth-client';

// export default function ManageBooksPage() {
//     const { data: session, isPending } = useSession();
//     const [books, setBooks] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchWriterBooks = async (writerId, signal) => {
//         try {
//             const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//             const res = await fetch(`${apiUrl}/writer/my-books?writerId=${writerId}`, { signal });

//             if (res.ok) {
//                 const data = await res.json();
//                 setBooks(data);
//             } else {
//                 console.error("Failed to fetch writer books");
//             }
//         } catch (error) {
//             if (error.name !== 'AbortError') {
//                 console.error("Error loading books:", error);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (isPending) return;
//         const writerId = session?.user?.id;
//         if (!writerId) {
//             setLoading(false);
//             return;
//         }

//         const controller = new AbortController();
//         fetchWriterBooks(writerId, controller.signal);
//         return () => controller.abort();
//     }, [session, isPending]);

//     const handleDeleteBook = async (bookId) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this ebook?");
//         if (!confirmDelete) return;

//         try {
//             const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//             const res = await fetch(`${apiUrl}/writer/books/${bookId}`, { method: 'DELETE' });

//             if (res.ok) {
//                 setBooks(books.filter(book => book._id !== bookId));
//             } else {
//                 alert("Failed to delete the book");
//             }
//         } catch (error) {
//             console.error("Error deleting book:", error);
//         }
//     };

//     return (
//         <div className="space-y-6">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                 <div>
//                     <h1 className="text-2xl font-serif font-bold tracking-tight text-[var(--ink)] m-0">
//                         Manage My Ebooks
//                     </h1>
//                     <p className="text-sm text-[var(--ink-3)] mt-1 m-0">
//                         View, edit info, or delete your published ebooks.
//                     </p>
//                 </div>
//                 <Link
//                     href="/dashboard/writer/add"
//                     className="flex items-center gap-2 px-4 py-2.5 bg-[var(--ink)] text-[var(--cream)] rounded-xl text-xs font-medium hover:opacity-90 transition-opacity no-underline cursor-pointer"
//                 >
//                     <FiPlus size={16} />
//                     Add New Ebook
//                 </Link>
//             </div>

//             {loading || isPending ? (
//                 <div className="py-20 text-center flex flex-col items-center justify-center">
//                     <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--ink)]"></div>
//                     <p className="mt-4 text-sm text-[var(--ink-3)]">Loading your books...</p>
//                 </div>
//             ) : books.length > 0 ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                     {books.map((book) => (
//                         <div
//                             key={book._id}
//                             className="group bg-[var(--cream-2)] border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col hover:shadow-sm transition-all duration-300"
//                         >
//                             <div className="aspect-[2/3] w-full relative overflow-hidden bg-[var(--ink)]">
//                                 {book.coverImage ? (
//                                     <Image
//                                         src={book.coverImage}
//                                         alt={book.title || "Book Cover"}
//                                         fill
//                                         sizes="(max-width: 768px) 100vw, 25vw"
//                                         className="object-cover"
//                                     />
//                                 ) : (
//                                     <div className="w-full h-full flex items-center justify-center text-[var(--cream-2)] text-xs">No Cover</div>
//                                 )}

//                                 <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${book.isSold
//                                     ? 'bg-rose-50 border-rose-200 text-rose-700'
//                                     : 'bg-emerald-50 border-emerald-200 text-emerald-700'
//                                     }`}>
//                                     {book.isSold ? 'Sold' : book.status || 'published'}
//                                 </span>
//                             </div>

//                             <div className="p-4 flex flex-col flex-1">
//                                 <h4 className="font-serif font-bold text-sm text-[var(--ink)] line-clamp-1 m-0">
//                                     {book.title || "Untitled"}
//                                 </h4>
//                                 <p className="text-xs text-[var(--ink-3)] mt-1 m-0">Genre: {book.category || "General"}</p>

//                                 <div className="flex items-center justify-between mt-3 mb-4">
//                                     <span className="font-bold text-base text-[var(--ink)]">
//                                         ${typeof book.price === 'number' ? book.price.toFixed(2) : "0.00"}
//                                     </span>
//                                     <div className="flex items-center gap-1 text-xs text-[var(--ink-2)]">
//                                         <FiStar className="text-[var(--amber)] fill-[var(--amber)]" size={12} />
//                                         <span>{book.rating || "0.0"}</span>
//                                     </div>
//                                 </div>

//                                 <div className="mt-auto flex gap-2">
//                                     <Link
//                                         href={`/dashboard/writer/edit/${book._id}`}
//                                         className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-[var(--border)] bg-[var(--cream)] text-[var(--ink)] hover:border-[var(--ink-3)] rounded-xl text-xs font-medium transition-colors no-underline"
//                                     >
//                                         <FiEdit3 size={12} />
//                                         Edit Info
//                                     </Link>
//                                     <button
//                                         onClick={() => handleDeleteBook(book._id)}
//                                         className="p-2 border border-[var(--border)] bg-[var(--cream)] text-red-600 rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
//                                         title="Delete Ebook"
//                                     >
//                                         <FiTrash2 size={14} />
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <div className="border border-dashed border-[var(--border)] rounded-2xl p-12 text-center max-w-md mx-auto mt-10">
//                     <div className="w-12 h-12 bg-[var(--cream-2)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--ink-3)] mx-auto mb-4">
//                         <FiBook size={20} />
//                     </div>
//                     <h3 className="text-lg font-serif font-bold text-[var(--ink)] mb-1">No books published</h3>
//                     <p className="text-xs text-[var(--ink-3)] mb-6">
//                         You {"haven't"} uploaded any ebooks yet. Share your stories with the world!
//                     </p>
//                     <Link
//                         href="/dashboard/writer/add"
//                         className="inline-flex px-5 py-2.5 bg-[var(--ink)] text-[var(--cream)] rounded-xl text-xs font-medium hover:opacity-90 transition-opacity no-underline"
//                     >
//                         Upload Your First Book
//                     </Link>
//                 </div>
//             )}
//         </div>
//     );
// }

//3

'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiEdit3, FiTrash2, FiBook, FiPlus, FiStar, FiClock, FiBookOpen } from 'react-icons/fi';
import { useSession } from '@/lib/auth-client';

export default function ManageBooksPage() {
    const { data: session, isPending } = useSession();
    const [activeTab, setActiveTab] = useState('written'); // 'written' | 'purchased'

    const [myBooks, setMyBooks] = useState([]);
    const [purchasedBooks, setPurchasedBooks] = useState([]);
    const [loadingWritten, setLoadingWritten] = useState(true);
    const [loadingPurchased, setLoadingPurchased] = useState(true);

    // My Books (lekha boi)
    useEffect(() => {
        if (isPending) return;
        const writerId = session?.user?.id;
        if (!writerId) {
            setLoadingWritten(false);
            return;
        }

        const controller = new AbortController();

        async function fetchMyBooks() {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const res = await fetch(`${apiUrl}/writer/my-books?writerId=${writerId}`, { signal: controller.signal });

                if (res.ok) {
                    const data = await res.json();
                    setMyBooks(data);
                }
            } catch (error) {
                if (error.name !== 'AbortError') console.error("Error loading my books:", error);
            } finally {
                setLoadingWritten(false);
            }
        }

        fetchMyBooks();
        return () => controller.abort();
    }, [session, isPending]);

    // Purchased Books (kena boi)
    useEffect(() => {
        if (isPending) return;
        const writerId = session?.user?.id;
        if (!writerId) {
            setLoadingPurchased(false);
            return;
        }

        const controller = new AbortController();

        async function fetchPurchased() {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const res = await fetch(`${apiUrl}/user/purchased?userId=${writerId}`, { signal: controller.signal });

                if (res.ok) {
                    const data = await res.json();
                    setPurchasedBooks(data);
                }
            } catch (error) {
                if (error.name !== 'AbortError') console.error("Error loading purchased books:", error);
            } finally {
                setLoadingPurchased(false);
            }
        }

        fetchPurchased();
        return () => controller.abort();
    }, [session, isPending]);

    const handleDeleteBook = async (bookId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this ebook?");
        if (!confirmDelete) return;

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${apiUrl}/writer/books/${bookId}`, { method: 'DELETE' });

            if (res.ok) {
                setMyBooks(myBooks.filter(book => book._id !== bookId));
            } else {
                alert("Failed to delete the book");
            }
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-serif font-bold tracking-tight text-[var(--ink)] m-0">
                        My Library
                    </h1>
                    <p className="text-sm text-[var(--ink-3)] mt-1 m-0">
                        Manage your published ebooks and view what you've purchased.
                    </p>
                </div>
                <Link
                    href="/dashboard/writer/add"
                    className="flex items-center gap-2 px-4 py-2.5 bg-[var(--ink)] text-[var(--cream)] rounded-xl text-xs font-medium hover:opacity-90 transition-opacity no-underline cursor-pointer"
                >
                    <FiPlus size={16} />
                    Add New Ebook
                </Link>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-[var(--border)]">
                <button
                    onClick={() => setActiveTab('written')}
                    className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer bg-transparent ${activeTab === 'written'
                        ? 'border-[var(--ink)] text-[var(--ink)]'
                        : 'border-transparent text-[var(--ink-3)] hover:text-[var(--ink-2)]'
                        }`}
                >
                    My Books ({myBooks.length})
                </button>
                <button
                    onClick={() => setActiveTab('purchased')}
                    className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors cursor-pointer bg-transparent ${activeTab === 'purchased'
                        ? 'border-[var(--ink)] text-[var(--ink)]'
                        : 'border-transparent text-[var(--ink-3)] hover:text-[var(--ink-2)]'
                        }`}
                >
                    Purchased ({purchasedBooks.length})
                </button>
            </div>

            {/* My Books Tab */}
            {activeTab === 'written' && (
                loadingWritten || isPending ? (
                    <div className="py-20 text-center flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--ink)]"></div>
                        <p className="mt-4 text-sm text-[var(--ink-3)]">Loading your books...</p>
                    </div>
                ) : myBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {myBooks.map((book) => (
                            <div
                                key={book._id}
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
                                    <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm ${book.isSold
                                        ? 'bg-rose-50 border-rose-200 text-rose-700'
                                        : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                        }`}>
                                        {book.isSold ? 'Sold' : book.status || 'published'}
                                    </span>
                                </div>

                                <div className="p-4 flex flex-col flex-1">
                                    <h4 className="font-serif font-bold text-sm text-[var(--ink)] line-clamp-1 m-0">
                                        {book.title || "Untitled"}
                                    </h4>
                                    <p className="text-xs text-[var(--ink-3)] mt-1 m-0">Genre: {book.category || "General"}</p>

                                    <div className="flex items-center justify-between mt-3 mb-4">
                                        <span className="font-bold text-base text-[var(--ink)]">
                                            ${typeof book.price === 'number' ? book.price.toFixed(2) : "0.00"}
                                        </span>
                                        <div className="flex items-center gap-1 text-xs text-[var(--ink-2)]">
                                            <FiStar className="text-[var(--amber)] fill-[var(--amber)]" size={12} />
                                            <span>{book.rating || "0.0"}</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto flex gap-2">
                                        <Link
                                            href={`/dashboard/writer/edit/${book._id}`}
                                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-[var(--border)] bg-[var(--cream)] text-[var(--ink)] hover:border-[var(--ink-3)] rounded-xl text-xs font-medium transition-colors no-underline"
                                        >
                                            <FiEdit3 size={12} />
                                            Edit Info
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteBook(book._id)}
                                            className="p-2 border border-[var(--border)] bg-[var(--cream)] text-red-600 rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
                                            title="Delete Ebook"
                                        >
                                            <FiTrash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="border border-dashed border-[var(--border)] rounded-2xl p-12 text-center max-w-md mx-auto mt-10">
                        <div className="w-12 h-12 bg-[var(--cream-2)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--ink-3)] mx-auto mb-4">
                            <FiBook size={20} />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-[var(--ink)] mb-1">No books published</h3>
                        <p className="text-xs text-[var(--ink-3)] mb-6">
                            You {"haven't"} uploaded any ebooks yet. Share your stories with the world!
                        </p>
                        <Link
                            href="/dashboard/writer/add"
                            className="inline-flex px-5 py-2.5 bg-[var(--ink)] text-[var(--cream)] rounded-xl text-xs font-medium hover:opacity-90 transition-opacity no-underline"
                        >
                            Upload Your First Book
                        </Link>
                    </div>
                )
            )}

            {/* Purchased Tab */}
            {activeTab === 'purchased' && (
                loadingPurchased || isPending ? (
                    <div className="py-20 text-center flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--ink)]"></div>
                        <p className="mt-4 text-sm text-[var(--ink-3)]">Loading your purchases...</p>
                    </div>
                ) : purchasedBooks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {purchasedBooks.map((item) => {
                            const book = item.book;
                            if (!book) return null;

                            return (
                                <div
                                    key={item._id}
                                    className="flex gap-4 bg-[var(--cream-2)] border border-[var(--border)] rounded-2xl p-4 hover:shadow-sm transition-all duration-300"
                                >
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

                                    <div className="flex flex-col flex-1 min-w-0">
                                        <h3 className="font-serif font-bold text-base text-[var(--ink)] line-clamp-1 m-0">
                                            {book.title}
                                        </h3>
                                        <p className="text-xs text-[var(--ink-3)] mt-1 m-0">
                                            By {book.writerName || book.author || "Unknown"}
                                        </p>

                                        {item.purchaseDate && (
                                            <div className="flex items-center gap-1 text-[11px] text-[var(--ink-3)] mt-2">
                                                <FiClock size={12} />
                                                <span>Purchased: {new Date(item.purchaseDate).toLocaleDateString()}</span>
                                            </div>
                                        )}

                                        <div className="mt-auto">
                                            <Link
                                                href={`/ebooks/${book._id}`}
                                                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[var(--ink)] text-[var(--cream)] rounded-xl text-xs font-medium hover:opacity-90 transition-opacity no-underline"
                                            >
                                                <FiBookOpen size={14} />
                                                View Book
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="border border-dashed border-[var(--border)] rounded-2xl p-12 text-center max-w-md mx-auto mt-10">
                        <div className="w-12 h-12 bg-[var(--cream-2)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--ink-3)] mx-auto mb-4">
                            <FiBookOpen size={20} />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-[var(--ink)] mb-1">No purchases yet</h3>
                        <p className="text-xs text-[var(--ink-3)] mb-6">
                            Browse the library and discover books from other writers.
                        </p>
                        <Link
                            href="/browse"
                            className="inline-flex px-5 py-2.5 bg-[var(--ink)] text-[var(--cream)] rounded-xl text-xs font-medium hover:opacity-90 transition-opacity no-underline"
                        >
                            Browse Ebooks
                        </Link>
                    </div>
                )
            )}
        </div>
    );
}