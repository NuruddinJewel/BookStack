'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch, FiStar, FiFilter } from 'react-icons/fi';

const DUMMY_BOOKS = [
    { id: 1, title: "The Silent Echo", author: "Sarah Jenkins", price: 14.99, category: "Fiction", rating: 4.8, "coverImage": "https://i.ibb.co.com/F4p8R7Yg/book1.png" },
    { id: 2, title: "The Kite Runner", author: "Khaled Hosseini", price: 18.50, category: "Fiction", rating: 4.9, "coverImage": "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1579036753i/77203.jpg" },
    { id: 3, title: "Shadows of the North", author: "L.R. Wright", price: 16.00, category: "Mystery", rating: 4.6, "coverImage": "https://i.ibb.co.com/sdLPNQKP/book3.png" },
    { id: 4, title: "Gone Girl", author: "Gillian Flynn", price: 19.99, category: "Mystery", rating: 4.7, "coverImage": "https://cdn.hachette.com.au/books/9780297859406.jpg" },
    { id: 5, title: "The Girl on the Train", author: "Paula Hawkins", price: 15.50, category: "Mystery", rating: 4.5, "coverImage": "https://www.penguin.co.uk/_next/image?url=https%3A%2F%2Fcdn.penguin.co.uk%2Fdam-assets%2Fbooks%2F9781784161750%2F9781784161750-jacket-large.jpg&w=819&q=100" },
    { id: 6, title: "Pride and Prejudice", author: "Jane Austen", price: 12.00, category: "Romance", rating: 4.9, "coverImage": "https://m.media-amazon.com/images/I/712P0p5cXIL._AC_UF1000,1000_QL80_.jpg" },
    { id: 7, title: "The Notebook", author: "Nicholas Sparks", price: 14.50, category: "Romance", rating: 4.7, "coverImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc7l9G-wZSEJEp0HNdMXVyNVf9zfpnH4YHDmBwqSqtNj5HlH-Zj4yP4x2r&s=10" },
    { id: 8, title: "Project Hail Mary", author: "Andy Weir", price: 24.00, category: "Sci-Fi", rating: 4.9, "coverImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDWoDwePSMnFVBJxfz_STbab9VTmMBR1Vx8G5lPNcDdg&s=10" },
    { id: 9, title: "Dune", author: "Frank Herbert", price: 22.50, category: "Sci-Fi", rating: 4.8, "coverImage": "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg" },
    { id: 10, title: "The Name of the Wind", author: "Patrick Rothfuss", price: 25.00, category: "Fantasy", rating: 4.8, "coverImage": "https://cdn.othoba.com/images/thumbs/1927289_the-name-of-the-wind-paperback-.jpeg" },
    { id: 11, title: "Mistborn: The Final Empire", author: "Brandon Sanderson", price: 21.00, category: "Fantasy", rating: 4.7, "coverImage": "https://zenoagency.com/wp-content/uploads/2016/06/Sanderson-M1-FinalEmpireUK10.jpg" },
    { id: 12, title: "The Hobbit", author: "J.R.R. Tolkien", price: 18.00, category: "Fantasy", rating: 4.9, "coverImage": "https://m.media-amazon.com/images/I/712cDO7d73L._AC_UF1000,1000_QL80_.jpg" },
    { id: 13, title: "The Shining", author: "Stephen King", price: 19.99, category: "Horror", rating: 4.8, "coverImage": "https://m.media-amazon.com/images/I/91U7HNa2NQL.jpg" },
    { id: 14, title: "Dracula", author: "Bram Stoker", price: 10.99, category: "Horror", rating: 4.6, "coverImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqTyOMqaO0PFtWb8gzwFMqwaG6fMfiE16dvGRhABYIJ64jp_p4IKrgHy2W&s=10" },
    { id: 15, title: "Steve Jobs", author: "Walter Isaacson", price: 28.00, category: "Biography", rating: 4.7, "coverImage": "https://m.media-amazon.com/images/I/71mmowWE5iL.jpg" },
    { id: 16, title: "The Diary of a Young Girl", author: "Anne Frank", price: 15.00, category: "Biography", rating: 4.9, "coverImage": "https://storage.googleapis.com/circlesoft/document/photos/004/452/044/original_diary_1.jpeg?1753234296" },
    { id: 17, title: "Atomic Habits", author: "James Clear", price: 22.00, category: "Self-Help", rating: 4.9, "coverImage": "https://bhumika.com.bd/wp-content/uploads/2026/03/Atomic-Habit.jpg" },
    { id: 18, title: "Deep Work", author: "Cal Newport", price: 18.50, category: "Self-Help", rating: 4.8, "coverImage": "https://miro.medium.com/v2/1*KL67NUR5iyhggxTqzVQg5A.jpeg" },
    { id: 19, title: "Me Before You", author: "Jojo Moyes", price: 13.99, category: "Romance", rating: 4.8, "coverImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWntTmvKX9Ow5nDukVFAuuZ07Bpo4dz-g1G-9wPQA8Xg&s=10" },
    { id: 20, title: "Educated", author: "Tara Westover", price: 20.00, category: "Biography", rating: 4.9, "coverImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmF6jZoEd14atpPB-C7nOhiuGYi0WrQN0O5gY6EPtG_g&s=10" },
];

const CATEGORIES = ["All", "Fiction", "Mystery", "Romance", "Sci-Fi", "Fantasy", "Horror", "Biography", "Self-Help"];

export default function BrowsePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredBooks = DUMMY_BOOKS.filter((book) => {
        const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === "All" || book.category === activeCategory;
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
                                onClick={() => setActiveCategory(category)}
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

                {/* Ebooks Grid */}
                {filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredBooks.map((book) => (
                            <Link
                                href={`/ebooks/${book.id}`}
                                key={book.id}
                                className="group flex flex-col bg-[var(--cream-2)] border border-[var(--border)] rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 no-underline text-[var(--ink)]"
                            >
                                {/* Book Cover Image */}
                                <div className="aspect-[2/3] w-full relative overflow-hidden bg-[var(--ink)]">
                                    <Image
                                        src={book.coverImage}
                                        alt={book.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                                        className="object-cover"
                                    />
                                </div>

                                {/* Book Info */}
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex justify-between items-start gap-2 mb-2">
                                        <h4 className="font-semibold text-base line-clamp-1 m-0 group-hover:text-[var(--amber)] transition-colors">
                                            {book.title}
                                        </h4>
                                    </div>
                                    <p className="text-sm text-[var(--ink-3)] mb-4 m-0">By {book.author}</p>

                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex items-center gap-1 text-sm font-medium text-[var(--ink-2)]">
                                            <FiStar className="text-[var(--amber)] fill-[var(--amber)]" size={14} />
                                            {book.rating}
                                        </div>
                                        <span className="font-bold text-lg text-[var(--ink)]">
                                            ${book.price.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="py-20 text-center flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-[var(--cream-2)] border border-[var(--border)] rounded-full flex items-center justify-center text-[var(--ink-3)] mb-4">
                            <FiSearch size={24} />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-[var(--ink)] mb-2">No books found</h3>

                        <p className="text-[var(--ink-3)] max-w-md mx-auto">
                            {`We couldn't find any books matching "${searchQuery}" in the "${activeCategory}" category.`}
                        </p>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
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