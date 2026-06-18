'use client'
import Link from "next/link";

const MOCK_WRITERS = [
    {
        _id: "w1",
        name: "Jessica Noor",
        sales: 38,
        ebooks: 4,
        badge: "Top seller",
        bg: "#FAEEDA",
        color: "#854F0B",
    },
    {
        _id: "w2",
        name: "Amelia Osei",
        sales: 27,
        ebooks: 6,
        badge: "Rising star",
        bg: "#E1F5EE",
        color: "#085041",
    },
    {
        _id: "w3",
        name: "Seren Adisa",
        sales: 22,
        ebooks: 3,
        badge: "Editor's pick",
        bg: "#EEEDFE",
        color: "#3C3489",
    },
];

function initials(name) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
}

export default function TopWriters() {
    return (
        <section
            style={{
                padding: "48px 20px 56px",
                background: "var(--cream-2)",
                borderTop: "1px solid var(--border)",
            }}
        >
            <div className="max-w-6xl mx-auto">

                {/* header */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: "24px",
                    }}
                >
                    <div>
                        <h2
                            style={{
                                fontFamily: "var(--serif)",
                                fontSize: "24px",
                                fontWeight: 500,
                                color: "var(--ink)",
                                marginBottom: "4px",
                            }}
                        >
                            Top writers
                        </h2>
                        <p style={{ fontSize: "13px", color: "var(--ink-3)" }}>
                            Writers with the most sales this month
                        </p>
                    </div>
                    <Link
                        href="/browse"
                        style={{
                            fontSize: "13px",
                            color: "var(--amber)",
                            textDecoration: "none",
                            fontWeight: 500,
                        }}
                    >
                        Meet all writers →
                    </Link>
                </div>

                {/* cards */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "14px",
                    }}
                >
                    {MOCK_WRITERS.map((writer, i) => (
                        <Link
                            key={writer._id}
                            href={`/browse?writer=${writer._id}`}
                            style={{ textDecoration: "none" }}
                        >
                            <div
                                style={{
                                    background: "var(--cream)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "12px",
                                    padding: "24px 20px",
                                    textAlign: "center",
                                    cursor: "pointer",
                                    transition: "border-color .2s, transform .15s",
                                    position: "relative",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = "var(--amber)";
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = "var(--border)";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                            >
                                {/* rank */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "12px",
                                        left: "12px",
                                        fontFamily: "var(--serif)",
                                        fontSize: "11px",
                                        color: "var(--ink-3)",
                                        fontStyle: "italic",
                                    }}
                                >
                                    #{i + 1}
                                </div>

                                {/* avatar */}
                                <div
                                    style={{
                                        width: "52px",
                                        height: "52px",
                                        borderRadius: "50%",
                                        background: writer.bg,
                                        border: `2px solid ${writer.color}30`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontFamily: "var(--serif)",
                                        fontSize: "18px",
                                        fontWeight: 500,
                                        color: writer.color,
                                        margin: "0 auto 12px",
                                    }}
                                >
                                    {initials(writer.name)}
                                </div>

                                <div
                                    style={{
                                        fontFamily: "var(--serif)",
                                        fontSize: "15px",
                                        fontWeight: 500,
                                        color: "var(--ink)",
                                        marginBottom: "4px",
                                    }}
                                >
                                    {writer.name}
                                </div>

                                <div style={{ fontSize: "12px", color: "var(--ink-3)", marginBottom: "12px" }}>
                                    {writer.sales} sales · {writer.ebooks} ebooks
                                </div>

                                <div
                                    style={{
                                        display: "inline-block",
                                        background: writer.bg,
                                        color: writer.color,
                                        fontSize: "11px",
                                        fontWeight: 500,
                                        padding: "3px 12px",
                                        borderRadius: "20px",
                                        border: `1px solid ${writer.color}40`,
                                        letterSpacing: ".03em",
                                    }}
                                >
                                    ✦ {writer.badge}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}