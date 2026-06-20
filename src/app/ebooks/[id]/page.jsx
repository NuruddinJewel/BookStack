// import React from 'react';
// import Link from 'next/link';
// import { FiArrowLeft, FiStar, FiShoppingCart, FiBookOpen } from 'react-icons/fi';
// import Image from 'next/image';

// async function getBookDetails(id) {
//     try {
//         const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//         const res = await fetch(`${apiUrl}/ebooks/${id}`, {
//             cache: 'no-store'
//         });

//         if (!res.ok) return null;
//         return await res.json();
//     } catch (error) {
//         console.error("Error fetching book details from backend:", error);
//         return null;
//     }
// }

// export default async function EbookDetailsPage({ params }) {
//     const resolvedParams = await params;
//     const bookId = resolvedParams.id;

//     // DataFetch From Backend
//     const book = await getBookDetails(bookId);

//     if (!book) {
//         return (
//             <div className="min-h-screen bg-[var(--cream)] flex flex-col items-center justify-center">
//                 <h2 className="text-2xl font-serif text-[var(--ink)] mb-4">Book not found</h2>
//                 <Link href="/browse" className="text-[var(--ink-2)] underline hover:text-[var(--ink)]">
//                     Go back to library
//                 </Link>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)] py-12 px-6 sm:px-12">
//             <div className="max-w-5xl mx-auto">

//                 {/* Back Button */}
//                 <Link href="/browse" className="inline-flex items-center gap-2 text-[var(--ink-3)] hover:text-[var(--ink)] mb-8 transition-colors no-underline">
//                     <FiArrowLeft /> Back to Browse
//                 </Link>

//                 <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
//                     {/* Left: Book Cover Image */}
//                     <div className="w-full md:w-1/3 aspect-[2/3] bg-[var(--ink)] rounded-2xl shadow-xl flex items-center justify-center p-0 text-center relative overflow-hidden shrink-0">
//                         {book.coverImage ? (
//                             <Image
//                                 src={book.coverImage}
//                                 alt={book.title || "Book Cover"}
//                                 width={400}
//                                 height={600}
//                                 className="w-full h-full object-cover"
//                                 priority
//                             />
//                         ) : (
//                             <>
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//                                 <h1 className="font-serif text-3xl font-bold text-[var(--cream)] relative z-10 leading-snug px-4">
//                                     {book.title}
//                                 </h1>
//                             </>
//                         )}
//                     </div>

//                     {/* Right: Book Details */}
//                     <div className="flex-1 space-y-6">

//                         {/* Title & Category */}
//                         <div>
//                             <span className="inline-block px-3 py-1 bg-[var(--cream-2)] border border-[var(--border)] text-[var(--ink-2)] text-xs font-semibold tracking-wider uppercase rounded-full mb-4">
//                                 {book.category || "General"}
//                             </span>
//                             <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--ink)] m-0 mb-2 leading-tight">
//                                 {book.title}
//                             </h1>
//                             <p className="text-xl text-[var(--ink-3)] m-0">By <span className="text-[var(--ink-2)] font-medium">{book.author || "Unknown"}</span></p>
//                         </div>

//                         {/* Rating & Price */}
//                         <div className="flex items-center gap-6 py-4 border-y border-[var(--border)]">
//                             <div className="flex items-center gap-2">
//                                 <FiStar className="text-[var(--amber)] fill-[var(--amber)]" size={24} />
//                                 <span className="text-xl font-bold">{book.rating || "0.0"}</span>
//                             </div>
//                             <div className="w-px h-8 bg-[var(--border)]"></div>
//                             <div className="text-3xl font-bold">
//                                 ${typeof book.price === 'number' ? book.price.toFixed(2) : "0.00"}
//                             </div>
//                         </div>

//                         {/* Description */}
//                         <div className="space-y-4 text-[var(--ink-3)] leading-relaxed">
//                             <h3 className="text-lg font-semibold text-[var(--ink)] m-0">Synopsis</h3>
//                             <p>
//                                 {book.description ? book.description : `Dive into the captivating world of ${book.title} by ${book.author}. This masterfully crafted piece in the ${book.category || 'library'} genre will take you on an unforgettable journey.`}
//                             </p>
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                             <button className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-[var(--ink)] text-[var(--cream)] rounded-xl font-medium hover:opacity-90 transition-opacity border-none cursor-pointer">
//                                 <FiShoppingCart size={20} />
//                                 Add to Cart
//                             </button>
//                             <button className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-[var(--ink)] text-[var(--ink)] rounded-xl font-medium hover:bg-[var(--cream-2)] transition-colors cursor-pointer">
//                                 <FiBookOpen size={20} />
//                                 Read Sample
//                             </button>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

//Updated

import React from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiStar, FiBookOpen } from 'react-icons/fi';
import Image from 'next/image';
import BuyButton from '@/components/ebooks/BuyButton';

async function getBookDetails(id) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/ebooks/${id}`, {
            cache: 'no-store'
        });

        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Error fetching book details from backend:", error);
        return null;
    }
}

export default async function EbookDetailsPage({ params }) {
    const resolvedParams = await params;
    const bookId = resolvedParams.id;

    const book = await getBookDetails(bookId);

    if (!book) {
        return (
            <div className="min-h-screen bg-[var(--cream)] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-serif text-[var(--ink)] mb-4">Book not found</h2>
                <Link href="/browse" className="text-[var(--ink-2)] underline hover:text-[var(--ink)]">
                    Go back to library
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)] py-12 px-6 sm:px-12">
            <div className="max-w-5xl mx-auto">

                <Link href="/browse" className="inline-flex items-center gap-2 text-[var(--ink-3)] hover:text-[var(--ink)] mb-8 transition-colors no-underline">
                    <FiArrowLeft /> Back to Browse
                </Link>

                <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">

                    <div className="w-full md:w-1/3 aspect-[2/3] bg-[var(--ink)] rounded-2xl shadow-xl flex items-center justify-center p-0 text-center relative overflow-hidden shrink-0">
                        {book.coverImage ? (
                            <Image
                                src={book.coverImage}
                                alt={book.title || "Book Cover"}
                                width={400}
                                height={600}
                                className="w-full h-full object-cover"
                                priority
                            />
                        ) : (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <h1 className="font-serif text-3xl font-bold text-[var(--cream)] relative z-10 leading-snug px-4">
                                    {book.title}
                                </h1>
                            </>
                        )}
                        {/* {book.isSold && (
                            <span className="absolute top-3 right-3 bg-[var(--coral)] text-white text-xs font-medium px-3 py-1 rounded-full z-10">
                                Sold
                            </span>
                        )} */}
                    </div>

                    <div className="flex-1 space-y-6">

                        <div>
                            <span className="inline-block px-3 py-1 bg-[var(--cream-2)] border border-[var(--border)] text-[var(--ink-2)] text-xs font-semibold tracking-wider uppercase rounded-full mb-4">
                                {book.category || book.genre || "General"}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--ink)] m-0 mb-2 leading-tight">
                                {book.title}
                            </h1>
                            <p className="text-xl text-[var(--ink-3)] m-0">
                                By <span className="text-[var(--ink-2)] font-medium">{book.writerName || book.author || "Unknown"}</span>
                            </p>
                        </div>

                        <div className="flex items-center gap-6 py-4 border-y border-[var(--border)]">
                            <div className="flex items-center gap-2">
                                <FiStar className="text-[var(--amber)] fill-[var(--amber)]" size={24} />
                                <span className="text-xl font-bold">{book.rating || "0.0"}</span>
                            </div>
                            <div className="w-px h-8 bg-[var(--border)]"></div>
                            <div className="text-3xl font-bold">
                                ${typeof book.price === 'number' ? book.price.toFixed(2) : "0.00"}
                            </div>
                        </div>

                        <div className="space-y-4 text-[var(--ink-3)] leading-relaxed">
                            <h3 className="text-lg font-semibold text-[var(--ink)] m-0">Synopsis</h3>
                            <p>
                                {book.description ? book.description : `Dive into the captivating world of ${book.title}.`}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <BuyButton book={book} />
                            <button className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-[var(--ink)] text-[var(--ink)] rounded-xl font-medium hover:bg-[var(--cream-2)] transition-colors cursor-pointer">
                                <FiBookOpen size={20} />
                                Read Sample
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
