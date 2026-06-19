import React from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiStar, FiShoppingCart, FiBookOpen } from 'react-icons/fi';


const DUMMY_BOOKS = [
    { id: 1, title: "The Silent Echo", author: "Sarah Jenkins", price: 14.99, category: "Fiction", rating: 4.8 },
    { id: 2, title: "The Kite Runner", author: "Khaled Hosseini", price: 18.50, category: "Fiction", rating: 4.9 },
    { id: 3, title: "Shadows of the North", author: "L.R. Wright", price: 16.00, category: "Mystery", rating: 4.6 },
    { id: 4, title: "Gone Girl", author: "Gillian Flynn", price: 19.99, category: "Mystery", rating: 4.7 },
    { id: 5, title: "The Girl on the Train", author: "Paula Hawkins", price: 15.50, category: "Mystery", rating: 4.5 },
    { id: 6, title: "Pride and Prejudice", author: "Jane Austen", price: 12.00, category: "Romance", rating: 4.9 },
    { id: 7, title: "The Notebook", author: "Nicholas Sparks", price: 14.50, category: "Romance", rating: 4.7 },
    { id: 8, title: "Project Hail Mary", author: "Andy Weir", price: 24.00, category: "Sci-Fi", rating: 4.9 },
    { id: 9, title: "Dune", author: "Frank Herbert", price: 22.50, category: "Sci-Fi", rating: 4.8 },
    { id: 10, title: "The Name of the Wind", author: "Patrick Rothfuss", price: 25.00, category: "Fantasy", rating: 4.8 },
    { id: 11, title: "Mistborn: The Final Empire", author: "Brandon Sanderson", price: 21.00, category: "Fantasy", rating: 4.7 },
    { id: 12, title: "The Hobbit", author: "J.R.R. Tolkien", price: 18.00, category: "Fantasy", rating: 4.9 },
    { id: 13, title: "The Shining", author: "Stephen King", price: 19.99, category: "Horror", rating: 4.8 },
    { id: 14, title: "Dracula", author: "Bram Stoker", price: 10.99, category: "Horror", rating: 4.6 },
    { id: 15, title: "Steve Jobs", author: "Walter Isaacson", price: 28.00, category: "Biography", rating: 4.7 },
    { id: 16, title: "The Diary of a Young Girl", author: "Anne Frank", price: 15.00, category: "Biography", rating: 4.9 },
    { id: 17, title: "Atomic Habits", author: "James Clear", price: 22.00, category: "Self-Help", rating: 4.9 },
    { id: 18, title: "Deep Work", author: "Cal Newport", price: 18.50, category: "Self-Help", rating: 4.8 },
    { id: 19, title: "Me Before You", author: "Jojo Moyes", price: 13.99, category: "Romance", rating: 4.8 },
    { id: 20, title: "Becoming", author: "Michelle Obama", price: 20.00, category: "Biography", rating: 4.9 },
];

export default async function EbookDetailsPage({ params }) {
    const resolvedParams = await params;
    const bookId = Number(resolvedParams.id);
    const book = DUMMY_BOOKS.find((b) => b.id === bookId);

    // If books not Found
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

                {/* Back Button */}
                <Link href="/browse" className="inline-flex items-center gap-2 text-[var(--ink-3)] hover:text-[var(--ink)] mb-8 transition-colors no-underline">
                    <FiArrowLeft /> Back to Browse
                </Link>

                <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">

                    {/* Left: Book Cover Image Placeholder */}
                    <div className="w-full md:w-1/3 aspect-[2/3] bg-[var(--ink)] rounded-2xl shadow-xl flex items-center justify-center p-8 text-center relative overflow-hidden shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <h1 className="font-serif text-3xl font-bold text-[var(--cream)] relative z-10 leading-snug">
                            {book.title}
                        </h1>
                    </div>

                    {/* Right: Book Details */}
                    <div className="flex-1 space-y-6">

                        {/* Title & Category */}
                        <div>
                            <span className="inline-block px-3 py-1 bg-[var(--cream-2)] border border-[var(--border)] text-[var(--ink-2)] text-xs font-semibold tracking-wider uppercase rounded-full mb-4">
                                {book.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--ink)] m-0 mb-2 leading-tight">
                                {book.title}
                            </h1>
                            <p className="text-xl text-[var(--ink-3)] m-0">By <span className="text-[var(--ink-2)] font-medium">{book.author}</span></p>
                        </div>

                        {/* Rating & Price */}
                        <div className="flex items-center gap-6 py-4 border-y border-[var(--border)]">
                            <div className="flex items-center gap-2">
                                <FiStar className="text-[var(--amber)] fill-[var(--amber)]" size={24} />
                                <span className="text-xl font-bold">{book.rating}</span>
                            </div>
                            <div className="w-px h-8 bg-[var(--border)]"></div>
                            <div className="text-3xl font-bold">
                                ${book.price.toFixed(2)}
                            </div>
                        </div>

                        {/* Description (Dummy text) */}
                        <div className="space-y-4 text-[var(--ink-3)] leading-relaxed">
                            <h3 className="text-lg font-semibold text-[var(--ink)] m-0">Synopsis</h3>
                            <p>
                                Dive into the captivating world of <strong>{book.title}</strong> by {book.author}.
                                This masterfully crafted piece in the {book.category} genre will take you on an unforgettable journey.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-[var(--ink)] text-[var(--cream)] rounded-xl font-medium hover:opacity-90 transition-opacity border-none cursor-pointer">
                                <FiShoppingCart size={20} />
                                Add to Cart
                            </button>
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