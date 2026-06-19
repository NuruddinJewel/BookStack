import React from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiStar, FiShoppingCart, FiBookOpen } from 'react-icons/fi';
import Image from 'next/image';


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
                    <div className="w-full md:w-1/3 aspect-2/3 bg-[var(--ink)] rounded-2xl shadow-xl flex items-center justify-center p-0 text-center relative overflow-hidden shrink-0">
                        {book.coverImage ? (
                            <Image
                                src={book.coverImage}
                                alt={book.title}
                                width={400}
                                height={600}
                                className="w-full h-full object-cover"
                                priority //
                            />
                        ) : (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <h1 className="font-serif text-3xl font-bold text-[var(--cream)] relative z-10 leading-snug px-4">
                                    {book.title}
                                </h1>
                            </>
                        )}
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

