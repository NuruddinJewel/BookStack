import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function HeroBanner() {
    return (
        <section
            style={{
                background: "var(--cream-2)",
                borderBottom: "1px solid var(--border)",
                padding: "64px 20px 56px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* decorative quote mark */}
            <span
                aria-hidden="true"
                style={{
                    position: "absolute",
                    top: "-24px",
                    right: "24px",
                    fontFamily: "var(--serif)",
                    fontSize: "220px",
                    color: "var(--cream-3)",
                    lineHeight: 1,
                    userSelect: "none",
                    pointerEvents: "none",
                }}
            >

            </span>

            <div className="max-w-6xl mx-auto">
                <div style={{ maxWidth: "560px" }}>
                    {/* eyebrow */}
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            background: "var(--amber-light)",
                            border: "1px solid #FAC775",
                            borderRadius: "20px",
                            padding: "4px 14px",
                            fontSize: "12px",
                            fontWeight: 500,
                            color: "var(--amber)",
                            marginBottom: "20px",
                            letterSpacing: ".04em",
                        }}
                    >
                        <span>✦</span>
                        <span>Ebook sharing platform</span>
                    </div>

                    {/* headline */}
                    <h1
                        style={{
                            fontFamily: "var(--serif)",
                            fontSize: "clamp(32px, 5vw, 52px)",
                            fontWeight: 500,
                            color: "var(--ink)",
                            lineHeight: 1.2,
                            marginBottom: "16px",
                        }}
                    >
                        Discover &amp; read{" "}
                        <em style={{ color: "var(--amber)", fontStyle: "italic" }}>
                            original
                        </em>{" "}
                        ebooks
                    </h1>

                    <p
                        style={{
                            fontSize: "16px",
                            color: "var(--ink-2)",
                            lineHeight: 1.7,
                            marginBottom: "32px",
                            maxWidth: "440px",
                        }}
                    >
                        Connect with writers. Explore stories across every genre.
                        Your next favourite read is one page away.
                    </p>

                    {/* CTA buttons */}
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "36px" }}>
                        <Link href="/browse">
                            <button
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    background: "var(--amber)",
                                    border: "none",
                                    color: "#fff",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    padding: "11px 24px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontFamily: "var(--sans)",
                                }}
                            >
                                Browse ebooks <FiArrowRight size={15} />
                            </button>
                        </Link>
                        <Link href="/register">
                            <button
                                style={{
                                    background: "transparent",
                                    border: "1px solid var(--border)",
                                    color: "var(--ink)",
                                    fontSize: "14px",
                                    padding: "11px 24px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontFamily: "var(--sans)",
                                }}
                            >
                                Become a writer
                            </button>
                        </Link>
                    </div>

                    {/* trust bar */}
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "20px",
                            background: "var(--cream)",
                            border: "1px solid var(--border)",
                            borderRadius: "10px",
                            padding: "10px 18px",
                            flexWrap: "wrap",
                        }}
                    >
                        {[
                            { value: "1,240+", label: "ebooks" },
                            { value: "380", label: "writers" },
                            { value: "Free", label: "to browse" },
                        ].map((item, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "baseline", gap: "5px" }}>
                                <span
                                    style={{
                                        fontFamily: "var(--serif)",
                                        fontSize: "16px",
                                        fontWeight: 500,
                                        color: "var(--ink)",
                                    }}
                                >
                                    {item.value}
                                </span>
                                <span style={{ fontSize: "12px", color: "var(--ink-3)" }}>
                                    {item.label}
                                </span>
                                {i < 2 && (
                                    <span
                                        style={{
                                            marginLeft: "14px",
                                            color: "var(--border)",
                                            fontSize: "16px",
                                        }}
                                    >
                                        ·
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}