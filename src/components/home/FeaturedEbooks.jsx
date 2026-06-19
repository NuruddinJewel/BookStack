'use client'
import Link from "next/link";
import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";

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

const DUAL_EBOOKS = [...DUMMY_BOOKS, ...DUMMY_BOOKS];

export default function FeaturedEbooks() {
    return (
        <section style={{ padding: "48px 0", background: "var(--color-cream)", overflow: "hidden" }}>
            <div className="max-w-6xl mx-auto px-5">
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "24px" }}>
                    <div>
                        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", fontWeight: 500, color: "var(--color-ink)", marginBottom: "4px" }}>
                            Featured ebooks
                        </h2>
                        <p style={{ fontSize: "13px", color: "var(--color-ink-3)" }}>
                            Handpicked by our editors this week
                        </p>
                    </div>
                    <Link href="/browse" style={{ fontSize: "13px", color: "var(--color-amber)", textDecoration: "none", fontWeight: 500 }}>
                        See all →
                    </Link>
                </div>
            </div>
            <div style={{ width: "100%", overflow: "hidden", display: "flex" }}>
                <motion.div
                    style={{
                        display: "flex",
                        gap: "16px",
                        padding: "10px 0",
                        width: "max-content",
                    }}
                    animate={{
                        x: ["-50%", "0%"],
                    }}
                    transition={{
                        ease: "linear",
                        duration: 40,
                        repeat: Infinity,
                    }}
                >
                    {DUAL_EBOOKS.map((book, index) => (
                        <div
                            key={`${book.id}-${index}`}
                            style={{ width: "160px", flexShrink: 0 }}
                        >
                            <Link href={`/ebooks/${book.id}`} style={{ textDecoration: "none" }}>
                                <div
                                    style={{
                                        background: "var(--color-cream)",
                                        border: "1px solid var(--color-border-custom)",
                                        borderRadius: "10px",
                                        overflow: "hidden",
                                        cursor: "pointer",
                                        transition: "border-color .2s, transform .15s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = "var(--color-amber)";
                                        e.currentTarget.style.transform = "translateY(-5px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = "var(--color-border-custom)";
                                        e.currentTarget.style.transform = "translateY(0)";
                                    }}
                                >
                                    {/* Cover */}
                                    <div style={{ height: "130px", position: "relative", background: "var(--color-ink, #1a1a1a)" }}>
                                        <Image
                                            src={book.coverImage}
                                            alt={book.title}
                                            fill
                                            sizes="160px"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>

                                    {/* Meta */}
                                    <div style={{ padding: "12px 12px 14px" }}>
                                        <div style={{ fontSize: "10px", color: "var(--color-ink-3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: "4px" }}>
                                            {book.category}
                                        </div>
                                        <div style={{ fontFamily: "var(--font-serif)", fontSize: "14px", fontWeight: 500, color: "var(--color-ink)", lineHeight: 1.3, marginBottom: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {book.title}
                                        </div>
                                        <div style={{ fontSize: "11px", color: "var(--color-ink-3)", marginBottom: "10px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            by {book.author}
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-amber)" }}>
                                                ${book.price.toFixed(2)}
                                            </span>
                                            <button aria-label="Bookmark" onClick={(e) => e.preventDefault()} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-ink-3)", padding: "2px", display: "flex" }}>
                                                <FiHeart size={15} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}