// 'use client';
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useSearchParams, useRouter } from 'next/navigation'; // useRouter 
// import { FiFilter, FiSearch, FiStar } from 'react-icons/fi';

// const CATEGORIES = ["All", "Fiction", "Mystery", "Romance", "Sci-Fi", "Fantasy", "Horror", "Biography", "Self-Help"];

// export default function BrowsePage() {
//     const [books, setBooks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchQuery, setSearchQuery] = useState("");

//     const searchParams = useSearchParams();
//     const router = useRouter(); // URL Update

//     // URL active Category
//     const genreParam = searchParams.get('genre') || 'All';
//     const activeCategory = CATEGORIES.find(
//         (cat) => cat.toLowerCase() === genreParam.toLowerCase()
//     ) || "All";

//     // URL change
//     const handleCategoryChange = (category) => {
//         if (category === "All") {
//             router.push('/browse');
//         } else {
//             router.push(`/browse?genre=${category.toLowerCase()}`);
//         }
//     };

//     // DataFetch From Backend 
//     useEffect(() => {
//         async function fetchBooks() {
//             try {
//                 const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//                 const res = await fetch(`${apiUrl}/ebooks`);

//                 if (res.ok) {
//                     const data = await res.json();
//                     setBooks(data);
//                 } else {
//                     console.error("Failed to fetch books from backend. Status:", res.status);
//                 }
//             } catch (error) {
//                 console.error("Error connecting to backend server:", error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchBooks();
//     }, []);

//     // Data Filtering
//     const filteredBooks = books.filter((book) => {
//         const title = book.title || "";
//         const author = book.author || "";
//         const category = book.category || "";

//         const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             author.toLowerCase().includes(searchQuery.toLowerCase());

//         const matchesCategory = activeCategory === "All" || category.toLowerCase() === activeCategory.toLowerCase();
//         return matchesSearch && matchesCategory;
//     });

//     return (
//         <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
//             {/* Header Section */}
//             <header className="bg-[var(--cream-2)] border-b border-[var(--border)] pt-16 pb-12 px-6 sm:px-12 text-center">
//                 <div className="max-w-4xl mx-auto space-y-4">
//                     <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-[var(--ink)] m-0">
//                         Explore the Library
//                     </h1>
//                     <p className="text-lg text-[var(--ink-3)] max-w-2xl mx-auto m-0">
//                         Discover thousands of ebooks across different genres. Find your next great read today.
//                     </p>
//                 </div>
//             </header>

//             {/* Main Content Area */}
//             <main className="max-w-7xl mx-auto px-6 sm:px-12 py-10">

//                 {/* Filters & Search Bar */}
//                 <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10">

//                     {/* Search Input */}
//                     <div className="relative w-full md:w-96">
//                         <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-3)]" size={20} />
//                         <input
//                             type="text"
//                             placeholder="Search by title or author..."
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             className="w-full pl-12 pr-4 py-3 bg-[var(--cream)] border border-[var(--border)] rounded-xl outline-none focus:border-[var(--ink)] focus:ring-1 focus:ring-[var(--ink)] transition-all text-sm"
//                         />
//                     </div>

//                     {/* Category Pills */}
//                     <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
//                         <div className="flex items-center gap-2 px-2 text-[var(--ink-3)]">
//                             <FiFilter size={18} />
//                         </div>
//                         {CATEGORIES.map((category) => (
//                             <button
//                                 key={category}
//                                 onClick={() => handleCategoryChange(category)}
//                                 className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer ${activeCategory === category
//                                     ? 'bg-[var(--ink)] text-[var(--cream)] border-[var(--ink)]'
//                                     : 'bg-[var(--cream-2)] text-[var(--ink-2)] border-[var(--border)] hover:border-[var(--ink-3)]'
//                                     }`}
//                             >
//                                 {category}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Ebooks Grid / Loading / Empty State */}
//                 {loading ? (
//                     <div className="py-20 text-center flex flex-col items-center justify-center">
//                         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--ink)]"></div>
//                         <p className="mt-4 text-[var(--ink-3)]">Loading library data...</p>
//                     </div>
//                 ) : filteredBooks.length > 0 ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//                         {filteredBooks.map((book) => {
//                             // const bookId = book.id || book._id;
//                             const bookId = book._id;
//                             return (
//                                 <Link
//                                     href={`/ebooks/${bookId}`}
//                                     key={bookId}
//                                     className="group flex flex-col bg-[var(--cream-2)] border border-[var(--border)] rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 no-underline text-[var(--ink)]"
//                                 >
//                                     <div className="aspect-[2/3] w-full relative overflow-hidden bg-[var(--ink)]">
//                                         {book.coverImage ? (
//                                             <Image
//                                                 src={book.coverImage}
//                                                 alt={book.title || "Book Cover"}
//                                                 fill
//                                                 sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
//                                                 className="object-cover"
//                                             />
//                                         ) : (
//                                             <div className="w-full h-full flex items-center justify-center text-[var(--cream-2)] text-xs">No Cover</div>
//                                         )}
//                                     </div>

//                                     <div className="p-5 flex flex-col flex-1">
//                                         <div className="flex justify-between items-start gap-2 mb-2">
//                                             <h4 className="font-semibold text-base line-clamp-1 m-0 group-hover:text-[var(--amber)] transition-colors">
//                                                 {book.title}
//                                             </h4>
//                                         </div>
//                                         <p className="text-sm text-[var(--ink-3)] mb-4 m-0">By {book.author || "Unknown"}</p>

//                                         <div className="mt-auto flex items-center justify-between">
//                                             <div className="flex items-center gap-1 text-sm font-medium text-[var(--ink-2)]">
//                                                 <FiStar className="text-[var(--amber)] fill-[var(--amber)]" size={14} />
//                                                 {book.rating || "0.0"}
//                                             </div>
//                                             <span className="font-bold text-lg text-[var(--ink)]">
//                                                 ${typeof book.price === 'number' ? book.price.toFixed(2) : "0.00"}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </Link>
//                             );
//                         })}
//                     </div>
//                 ) : (
//                     /* Empty State */
//                     <div className="py-20 text-center flex flex-col items-center justify-center">
//                         <div className="w-16 h-16 bg-[var(--cream-2)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--ink-3)] mb-4">
//                             <FiSearch size={24} />
//                         </div>
//                         <h3 className="text-xl font-serif font-bold text-[var(--ink)] mb-2">No books found</h3>
//                         <p className="text-[var(--ink-3)] max-w-md mx-auto">
//                             {`We couldn't find any books matching "${searchQuery}" in the " ${activeCategory} " category.`}
//                         </p>
//                         <button
//                             onClick={() => { setSearchQuery(""); router.push('/browse'); }}
//                             className="mt-6 px-6 py-2.5 bg-[var(--ink)] text-[var(--cream)] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity border-none cursor-pointer"
//                         >
//                             Clear Filters
//                         </button>
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// }


'use client';
import React, { useState, useEffect, Suspense } from 'react'; // Suspense 
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { FiFilter, FiSearch, FiStar } from 'react-icons/fi';

const CATEGORIES = ["All", "Fiction", "Mystery", "Romance", "Sci-Fi", "Fantasy", "Horror", "Biography", "Self-Help"];

// Library and Filtering Logic
function BrowseContent() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const searchParams = useSearchParams();
    const router = useRouter();

    // URL active Category
    const genreParam = searchParams.get('genre') || 'All';
    const activeCategory = CATEGORIES.find(
        (cat) => cat.toLowerCase() === genreParam.toLowerCase()
    ) || "All";

    // URL change
    const handleCategoryChange = (category) => {
        if (category === "All") {
            router.push('/browse');
        } else {
            router.push(`/browse?genre=${category.toLowerCase()}`);
        }
    };

    // DataFetch From Backend 
    useEffect(() => {
        async function fetchBooks() {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const res = await fetch(`${apiUrl}/ebooks`);

                if (res.ok) {
                    const data = await res.json();
                    setBooks(data);
                } else {
                    console.error("Failed to fetch books from backend. Status:", res.status);
                }
            } catch (error) {
                console.error("Error connecting to backend server:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchBooks();
    }, []);

    // Data Filtering
    const filteredBooks = books.filter((book) => {
        const title = book.title || "";
        const author = book.author || "";
        const category = book.category || "";

        const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            author.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = activeCategory === "All" || category.toLowerCase() === activeCategory.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
            {/* Header Section */}
            <header className="bg-[var(--cream-2)] border-b border-[var(--border)] pt-16 pb-12 px-6 sm:px-12 text-center">
                <div className="max-w-4xl mx-auto space-y-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-[var(--ink)] m-0">
                        Explore the Library
                    </h1>
                    <p className="text-lg text-[var(--ink-3)] max-w-2xl mx-auto m-0">
                        Discover thousands of ebooks across different genres. Find your next great read today.
                    </p>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-6 sm:px-12 py-10">

                {/* Filters & Search Bar */}
                <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10">

                    {/* Search Input */}
                    <div className="relative w-full md:w-96">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-3)]" size={20} />
                        <input
                            type="text"
                            placeholder="Search by title or author..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-[var(--cream)] border border-[var(--border)] rounded-xl outline-none focus:border-[var(--ink)] focus:ring-1 focus:ring-[var(--ink)] transition-all text-sm"
                        />
                    </div>

                    {/* Category Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                        <div className="flex items-center gap-2 px-2 text-[var(--ink-3)]">
                            <FiFilter size={18} />
                        </div>
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer ${activeCategory === category
                                    ? 'bg-[var(--ink)] text-[var(--cream)] border-[var(--ink)]'
                                    : 'bg-[var(--cream-2)] text-[var(--ink-2)] border-[var(--border)] hover:border-[var(--ink-3)]'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Ebooks Grid / Loading / Empty State */}
                {loading ? (
                    <div className="py-20 text-center flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--ink)]"></div>
                        <p className="mt-4 text-[var(--ink-3)]">Loading library data...</p>
                    </div>
                ) : filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredBooks.map((book) => {
                            const bookId = book._id;
                            return (
                                <Link
                                    href={`/ebooks/${bookId}`}
                                    key={bookId}
                                    className="group flex flex-col bg-[var(--cream-2)] border border-[var(--border)] rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 no-underline text-[var(--ink)]"
                                >
                                    <div className="aspect-[2/3] w-full relative overflow-hidden bg-[var(--ink)]">
                                        {book.coverImage ? (
                                            <Image
                                                src={book.coverImage}
                                                alt={book.title || "Book Cover"}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[var(--cream-2)] text-xs">No Cover</div>
                                        )}
                                    </div>

                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="flex justify-between items-start gap-2 mb-2">
                                            <h4 className="font-semibold text-base line-clamp-1 m-0 group-hover:text-[var(--amber)] transition-colors">
                                                {book.title}
                                            </h4>
                                        </div>
                                        <p className="text-sm text-[var(--ink-3)] mb-4 m-0">By {book.author || "Unknown"}</p>

                                        <div className="mt-auto flex items-center justify-between">
                                            <div className="flex items-center gap-1 text-sm font-medium text-[var(--ink-2)]">
                                                <FiStar className="text-[var(--amber)] fill-[var(--amber)]" size={14} />
                                                {book.rating || "0.0"}
                                            </div>
                                            <span className="font-bold text-lg text-[var(--ink)]">
                                                ${typeof book.price === 'number' ? book.price.toFixed(2) : "0.00"}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="py-20 text-center flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-[var(--cream-2)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--ink-3)] mb-4">
                            <FiSearch size={24} />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-[var(--ink)] mb-2">No books found</h3>
                        <p className="text-[var(--ink-3)] max-w-md mx-auto">
                            {`We couldn't find any books matching "${searchQuery}" in the " ${activeCategory} " category.`}
                        </p>
                        <button
                            onClick={() => { setSearchQuery(""); router.push('/browse'); }}
                            className="mt-6 px-6 py-2.5 bg-[var(--ink)] text-[var(--cream)] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity border-none cursor-pointer"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

// Suspense
export default function BrowsePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--ink)]"></div>
            </div>
        }>
            <BrowseContent />
        </Suspense>
    );
}