"use client";

import Link from "next/link";

const genres = [
    { name: "Fiction", icon: "✦", color: "#FAEEDA", border: "#FAC775", text: "#854F0B" },
    { name: "Mystery", icon: "◈", color: "#E1F5EE", border: "#9FE1CB", text: "#085041" },
    { name: "Romance", icon: "◇", color: "#FBEAF0", border: "#F4C0D1", text: "#72243E" },
    { name: "Sci-Fi", icon: "◉", color: "#EEEDFE", border: "#CECBF6", text: "#3C3489" },
    { name: "Fantasy", icon: "✧", color: "#E8DFD0", border: "#D8CEBC", text: "#5C4F3A" },
    { name: "Horror", icon: "◆", color: "#FCEBEB", border: "#F7C1C1", text: "#791F1F" },
    { name: "Biography", icon: "◎", color: "#EAF3DE", border: "#C0DD97", text: "#27500A" },
    { name: "Self-help", icon: "◐", color: "#E6F1FB", border: "#B5D4F4", text: "#0C447C" },
];

export default function GenreGrid() {
    return (
        <section
            style={{
                background: "var(--cream-2)",
                borderBottom: "1px solid var(--border)",
                padding: "28px 20px",
            }}
        >
            <div className="max-w-6xl mx-auto">
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                        gap: "10px",
                    }}
                >
                    {genres.map((g) => (
                        <Link
                            key={g.name}
                            href={`/browse?genre=${g.name.toLowerCase()}`}
                            style={{ textDecoration: "none" }}
                        >
                            <div
                                style={{
                                    background: g.color,
                                    border: `1px solid ${g.border}`,
                                    borderRadius: "10px",
                                    padding: "14px 10px",
                                    textAlign: "center",
                                    cursor: "pointer",
                                    transition: "transform .15s, box-shadow .15s",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                            >
                                <div style={{ fontSize: "20px", color: g.text, marginBottom: "6px" }}>
                                    {g.icon}
                                </div>
                                <div
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: 500,
                                        color: g.text,
                                        fontFamily: "var(--sans)",
                                    }}
                                >
                                    {g.name}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}