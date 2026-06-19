import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

export default function HeroBanner() {
    return (
        <section className="relative overflow-hidden bg-[var(--cream-2)] border-b border-[var(--border)] py-16 px-5 sm:px-10 lg:py-20">
            {/* Decorative quote mark */}
            <span
                className="absolute -top-6 right-6 font-serif text-[220px] text-[var(--cream-3)] select-none pointer-events-none leading-none hidden md:block"
                aria-hidden="true"
            >
                ”
            </span>

            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

                {/* Left Side: Content */}
                <div className="w-full lg:w-1/2 max-w-[560px] z-10">
                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-1.5 bg-[var(--amber-light)] border border-[#FAC775] rounded-full px-3.5 py-1 text-xs font-medium text-[var(--amber)] mb-5 tracking-wide">
                        <span>✦</span>
                        <span>Ebook sharing platform</span>
                    </div>

                    {/* Headline */}
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


                    {/* Subtitle */}
                    <p className="text-base text-[var(--ink-2)] leading-relaxed mb-8 max-w-[440px]">
                        Connect with writers. Explore stories across every genre.
                        Your next favourite read is one page away.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-3 mb-9">
                        <Link href="/browse">
                            <button className="inline-flex items-center gap-2 bg-[var(--amber)] hover:opacity-90 border-none text-white text-sm font-medium px-6 py-3 rounded-lg cursor-pointer font-sans transition-all">
                                Browse ebooks <FiArrowRight size={15} />
                            </button>
                        </Link>
                        <Link href="/register">
                            <button className="bg-transparent hover:bg-[var(--cream-3)] border border-[var(--border)] text-[var(--ink)] text-sm font-medium px-6 py-3 rounded-lg cursor-pointer font-sans transition-all">
                                Become a writer
                            </button>
                        </Link>
                    </div>

                    {/* Trust Bar */}
                    <div className="inline-flex flex-wrap items-center gap-5 bg-[var(--cream)] border border-[var(--border)] rounded-xl p-2.5 px-4.5">
                        {[
                            { value: "1,240+", label: "ebooks" },
                            { value: "380", label: "writers" },
                            { value: "Free", label: "to browse" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-baseline gap-1.5">
                                <span className="font-serif text-base font-medium text-[var(--ink)]">
                                    {item.value}
                                </span>
                                <span className="text-xs text-[var(--ink-3)]">
                                    {item.label}
                                </span>
                                {i < 2 && (
                                    <span className="ml-3.5 text-[var(--border)] text-base select-none">
                                        ·
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Image Banner */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end z-10">
                    <div className="relative w-full max-w-[480px] aspect-[4/3] sm:aspect-[16/10] lg:aspect-square drop-shadow-xl hover:scale-[1.02] transition-transform duration-300">
                        <Image
                            src="https://i.ibb.co.com/xqtt2rxL/Ebooks.png"
                            alt="Ebooks Hero Banner Illustration"
                            fill
                            priority
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}