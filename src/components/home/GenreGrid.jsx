"use client";

import Link from "next/link";

const genres = [
    { name: "Fiction", icon: "✦", color: "bg-[#FAEEDA]", border: "border-[#FAC775]", text: "text-[#854F0B]" },
    { name: "Mystery", icon: "◈", color: "bg-[#E1F5EE]", border: "border-[#9FE1CB]", text: "text-[#085041]" },
    { name: "Romance", icon: "◇", color: "bg-[#FBEAF0]", border: "border-[#F4C0D1]", text: "text-[#72243E]" },
    { name: "Sci-Fi", icon: "◉", color: "bg-[#EEEDFE]", border: "border-[#CECBF6]", text: "text-[#3C3489]" },
    { name: "Fantasy", icon: "✧", color: "bg-[#E8DFD0]", border: "border-[#D8CEBC]", text: "text-[#5C4F3A]" },
    { name: "Horror", icon: "◆", color: "bg-[#FCEBEB]", border: "border-[#F7C1C1]", text: "text-[#791F1F]" },
    { name: "Biography", icon: "◎", color: "bg-[#EAF3DE]", border: "border-[#C0DD97]", text: "text-[#27500A]" },
    { name: "Self-help", icon: "◐", color: "bg-[#E6F1FB]", border: "border-[#B5D4F4]", text: "text-[#0C447C]" },
];

export default function GenreGrid() {
    return (
        <section className="bg-[var(--cream-2)] border-b border-[var(--border)] py-8 px-5">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                    {genres.map((g) => (
                        <Link
                            key={g.name}
                            // URL এ ?genre=fiction 
                            href={`/browse?genre=${g.name.toLowerCase()}`}
                            className="no-underline block group"
                        >
                            <div
                                className={`border ${g.color} ${g.border} rounded-xl p-4 text-center cursor-pointer transition-all duration-200 transform group-hover:-translate-y-1 group-hover:shadow-sm`}
                            >
                                <div className={`text-2xl ${g.text} mb-1.5`}>
                                    {g.icon}
                                </div>
                                <div
                                    className={`text-xs font-semibold ${g.text} font-sans tracking-wide`}
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