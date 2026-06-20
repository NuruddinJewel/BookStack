// 'use client'
// import Link from "next/link";
// import Image from "next/image";
// import { FiHeart } from "react-icons/fi";
// import { motion } from "framer-motion";

// const DUMMY_BOOKS = [
//     { id: 2, title: "The Kite Runner", author: "Khaled Hosseini", price: 18.50, category: "Fiction", rating: 4.9, "coverImage": "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1579036753i/77203.jpg" },
//     { id: 3, title: "Shadows of the North", author: "L.R. Wright", price: 16.00, category: "Mystery", rating: 4.6, "coverImage": "https://i.ibb.co.com/sdLPNQKP/book3.png" },
//     { id: 5, title: "The Girl on the Train", author: "Paula Hawkins", price: 15.50, category: "Mystery", rating: 4.5, "coverImage": "https://www.penguin.co.uk/_next/image?url=https%3A%2F%2Fcdn.penguin.co.uk%2Fdam-assets%2Fbooks%2F9781784161750%2F9781784161750-jacket-large.jpg&w=819&q=100" },
//     { id: 6, title: "Pride and Prejudice", author: "Jane Austen", price: 12.00, category: "Romance", rating: 4.9, "coverImage": "https://m.media-amazon.com/images/I/712P0p5cXIL._AC_UF1000,1000_QL80_.jpg" },
//     { id: 8, title: "Project Hail Mary", author: "Andy Weir", price: 24.00, category: "Sci-Fi", rating: 4.9, "coverImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDWoDwePSMnFVBJxfz_STbab9VTmMBR1Vx8G5lPNcDdg&s=10" },
//     { id: 11, title: "Mistborn: The Final Empire", author: "Brandon Sanderson", price: 21.00, category: "Fantasy", rating: 4.7, "coverImage": "https://zenoagency.com/wp-content/uploads/2016/06/Sanderson-M1-FinalEmpireUK10.jpg" },
//     { id: 12, title: "The Hobbit", author: "J.R.R. Tolkien", price: 18.00, category: "Fantasy", rating: 4.9, "coverImage": "https://m.media-amazon.com/images/I/712cDO7d73L._AC_UF1000,1000_QL80_.jpg" },
//     { id: 15, title: "Steve Jobs", author: "Walter Isaacson", price: 28.00, category: "Biography", rating: 4.7, "coverImage": "https://m.media-amazon.com/images/I/71mmowWE5iL.jpg" },
//     { id: 16, title: "The Diary of a Young Girl", author: "Anne Frank", price: 15.00, category: "Biography", rating: 4.9, "coverImage": "https://storage.googleapis.com/circlesoft/document/photos/004/452/044/original_diary_1.jpeg?1753234296" },
//     { id: 17, title: "Atomic Habits", author: "James Clear", price: 22.00, category: "Self-Help", rating: 4.9, "coverImage": "https://bhumika.com.bd/wp-content/uploads/2026/03/Atomic-Habit.jpg" },
//     { id: 18, title: "Deep Work", author: "Cal Newport", price: 18.50, category: "Self-Help", rating: 4.8, "coverImage": "https://miro.medium.com/v2/1*KL67NUR5iyhggxTqzVQg5A.jpeg" },
//     { id: 20, title: "Educated", author: "Tara Westover", price: 20.00, category: "Biography", rating: 4.9, "coverImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmF6jZoEd14atpPB-C7nOhiuGYi0WrQN0O5gY6EPtG_g&s=10" },
// ];

// const DUAL_EBOOKS = [...DUMMY_BOOKS, ...DUMMY_BOOKS];

// export default function FeaturedEbooks() {
//     return (
//         <section style={{ padding: "48px 0", background: "var(--color-cream)", overflow: "hidden" }}>
//             <div className="max-w-6xl mx-auto px-5">
//                 {/* Header */}
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "24px" }}>
//                     <div>
//                         <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", fontWeight: 500, color: "var(--color-ink)", marginBottom: "4px" }}>
//                             Featured ebooks
//                         </h2>
//                         <p style={{ fontSize: "13px", color: "var(--color-ink-3)" }}>
//                             Handpicked by our editors this week
//                         </p>
//                     </div>
//                     <Link href="/browse" style={{ fontSize: "13px", color: "var(--color-amber)", textDecoration: "none", fontWeight: 500 }}>
//                         See all →
//                     </Link>
//                 </div>
//             </div>
//             <div style={{ width: "100%", overflow: "hidden", display: "flex" }}>
//                 <motion.div
//                     style={{
//                         display: "flex",
//                         gap: "16px",
//                         padding: "10px 0",
//                         width: "max-content",
//                     }}
//                     animate={{
//                         x: ["-50%", "0%"],
//                     }}
//                     transition={{
//                         ease: "linear",
//                         duration: 40,
//                         repeat: Infinity,
//                     }}
//                 >
//                     {DUAL_EBOOKS.map((book, index) => (
//                         <div
//                             key={`${book.id}-${index}`}
//                             style={{ width: "160px", flexShrink: 0 }}
//                         >
//                             <Link href={`/ebooks/${book.id}`} style={{ textDecoration: "none" }}>
//                                 <div
//                                     style={{
//                                         background: "var(--color-cream)",
//                                         border: "1px solid var(--color-border-custom)",
//                                         borderRadius: "10px",
//                                         overflow: "hidden",
//                                         cursor: "pointer",
//                                         transition: "border-color .2s, transform .15s",
//                                     }}
//                                     onMouseEnter={(e) => {
//                                         e.currentTarget.style.borderColor = "var(--color-amber)";
//                                         e.currentTarget.style.transform = "translateY(-5px)";
//                                     }}
//                                     onMouseLeave={(e) => {
//                                         e.currentTarget.style.borderColor = "var(--color-border-custom)";
//                                         e.currentTarget.style.transform = "translateY(0)";
//                                     }}
//                                 >
//                                     {/* Cover */}
//                                     <div style={{ height: "130px", position: "relative", background: "var(--color-ink, #1a1a1a)" }}>
//                                         <Image
//                                             src={book.coverImage}
//                                             alt={book.title}
//                                             fill
//                                             sizes="160px"
//                                             style={{ objectFit: "cover" }}
//                                         />
//                                     </div>

//                                     {/* Meta */}
//                                     <div style={{ padding: "12px 12px 14px" }}>
//                                         <div style={{ fontSize: "10px", color: "var(--color-ink-3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: "4px" }}>
//                                             {book.category}
//                                         </div>
//                                         <div style={{ fontFamily: "var(--font-serif)", fontSize: "14px", fontWeight: 500, color: "var(--color-ink)", lineHeight: 1.3, marginBottom: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
//                                             {book.title}
//                                         </div>
//                                         <div style={{ fontSize: "11px", color: "var(--color-ink-3)", marginBottom: "10px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
//                                             by {book.author}
//                                         </div>
//                                         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                                             <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-amber)" }}>
//                                                 ${book.price.toFixed(2)}
//                                             </span>
//                                             <button aria-label="Bookmark" onClick={(e) => e.preventDefault()} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-ink-3)", padding: "2px", display: "flex" }}>
//                                                 <FiHeart size={15} />
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </Link>
//                         </div>
//                     ))}
//                 </motion.div>
//             </div>
//         </section>
//     );
// }

//Updated

'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";

export default function FeaturedEbooks() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
                const res = await fetch(`${apiUrl}/ebooks`);

                if (res.ok) {
                    const data = await res.json();
                    setBooks(data.slice(0, 12)); // shudu prothom 12 ta dekhabo
                } else {
                    console.error("Failed to fetch featured ebooks. Status:", res.status);
                }
            } catch (error) {
                console.error("Error fetching featured ebooks:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchBooks();
    }, []);

    const dualBooks = [...books, ...books];

    if (loading) {
        return (
            <section style={{ padding: "48px 0", background: "var(--color-cream)" }}>
                <div className="max-w-6xl mx-auto px-5">
                    <p style={{ fontSize: "13px", color: "var(--color-ink-3)" }}>Loading featured ebooks...</p>
                </div>
            </section>
        );
    }

    if (books.length === 0) {
        return null;
    }

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
                    {dualBooks.map((book, index) => (
                        <div
                            key={`${book._id}-${index}`}
                            style={{ width: "160px", flexShrink: 0 }}
                        >
                            <Link href={`/ebooks/${book._id}`} style={{ textDecoration: "none" }}>
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
                                        {book.coverImage ? (
                                            <Image
                                                src={book.coverImage}
                                                alt={book.title}
                                                fill
                                                sizes="160px"
                                                style={{ objectFit: "cover" }}
                                            />
                                        ) : (
                                            <div style={{
                                                height: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "var(--color-cream)",
                                                fontSize: "11px",
                                            }}>
                                                No Cover
                                            </div>
                                        )}
                                        {/* {book.isSold && (
                                            <span style={{
                                                position: "absolute",
                                                top: "8px",
                                                right: "8px",
                                                background: "var(--color-coral, #993C1D)",
                                                color: "#fff",
                                                fontSize: "10px",
                                                fontWeight: 500,
                                                padding: "2px 8px",
                                                borderRadius: "10px",
                                            }}>
                                                Sold
                                            </span>
                                        )} */}
                                    </div>

                                    {/* Meta */}
                                    <div style={{ padding: "12px 12px 14px" }}>
                                        <div style={{ fontSize: "10px", color: "var(--color-ink-3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: "4px" }}>
                                            {book.category || book.genre}
                                        </div>
                                        <div style={{ fontFamily: "var(--font-serif)", fontSize: "14px", fontWeight: 500, color: "var(--color-ink)", lineHeight: 1.3, marginBottom: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {book.title}
                                        </div>
                                        <div style={{ fontSize: "11px", color: "var(--color-ink-3)", marginBottom: "10px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            by {book.author || book.writerName || "Unknown"}
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-amber)" }}>
                                                ${typeof book.price === "number" ? book.price.toFixed(2) : "0.00"}
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