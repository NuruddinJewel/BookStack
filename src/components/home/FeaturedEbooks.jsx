'use client'
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";

const MOCK_EBOOKS = [
    { _id: "1", title: "The Amber House", author: "Jessica Noor", genre: "Fiction", price: 4.99, spineColor: "#BA7517", bgColor: "#E8DFD0", iconColor: "#854F0B" },
    { _id: "2", title: "Ink & Shadow", author: "Amelia Osei", genre: "Mystery", price: 3.49, spineColor: "#0F6E56", bgColor: "#DDE8E0", iconColor: "#085041" },
    { _id: "3", title: "The Last Cartographer", author: "Seren Adisa", genre: "Fantasy", price: 5.99, spineColor: "#534AB7", bgColor: "#E0E0E8", iconColor: "#3C3489" },
    { _id: "4", title: "Salt & Starlight", author: "Miriam Takeda", genre: "Romance", price: 3.99, spineColor: "#993556", bgColor: "#EEDED8", iconColor: "#72243E" },
    { _id: "5", title: "Beyond the Veil", author: "Kofi Mensah", genre: "Sci-Fi", price: 6.49, spineColor: "#185FA5", bgColor: "#D8E0E8", iconColor: "#0C447C" },
    { _id: "6", title: "The Hollow Year", author: "Priya Anand", genre: "Horror", price: 4.49, spineColor: "#A32D2D", bgColor: "#E8D8D8", iconColor: "#791F1F" },
];

const DUAL_EBOOKS = [...MOCK_EBOOKS, ...MOCK_EBOOKS];

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
                        duration: 20,
                        repeat: Infinity,
                    }}
                >
                    {DUAL_EBOOKS.map((book, index) => (
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
                                    <div style={{ height: "130px", background: book.bgColor, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                        {/* Spine */}
                                        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "7px", background: book.spineColor }} />
                                        <span style={{ fontFamily: "var(--font-serif)", fontSize: "36px", color: book.iconColor, opacity: 0.5 }}>✦</span>
                                    </div>

                                    {/* Meta */}
                                    <div style={{ padding: "12px 12px 14px" }}>
                                        <div style={{ fontSize: "10px", color: "var(--color-ink-3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: "4px" }}>
                                            {book.genre}
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