import Link from "next/link";
import { FiTwitter, FiFacebook, FiInstagram, FiGithub, FiMail } from "react-icons/fi";

const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Ebooks", href: "/browse" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
];

const genres = [
    { label: "Fiction", href: "/browse?genre=fiction" },
    { label: "Mystery", href: "/browse?genre=mystery" },
    { label: "Romance", href: "/browse?genre=romance" },
    { label: "Sci-Fi", href: "/browse?genre=sci-fi" },
    { label: "Fantasy", href: "/browse?genre=fantasy" },
    { label: "Horror", href: "/browse?genre=horror" },
];

const socials = [
    { icon: FiTwitter, href: "#", label: "Twitter" },
    { icon: FiFacebook, href: "#", label: "Facebook" },
    { icon: FiInstagram, href: "#", label: "Instagram" },
    { icon: FiGithub, href: "#", label: "GitHub" },
];

export default function Footer() {
    return (
        <footer className="bg-cream-2 border-t border-border-custom mt-auto">
            {/* Main Grid Container */}
            <div className="max-w-6xl mx-auto px-5 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-9">

                    {/* Brand Column */}
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="no-underline inline-block">
                            <span className="font-serif text-2xl font-medium text-ink tracking-tight">
                                F<span className="text-amber">.</span>able
                            </span>
                        </Link>
                        <p className="text-sm text-ink-3 leading-relaxed max-w-[220px]">
                            A platform for readers and writers to share original ebooks across every genre.
                        </p>

                        {/* Social Links with Smooth Hover Effect */}
                        <div className="flex gap-2.5 mt-2">
                            {socials.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-cream border border-border-custom text-ink-3 no-underline transition-all duration-300 hover:text-amber hover:border-amber hover:-translate-y-0.5 shadow-sm"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h4 className="font-serif text-sm font-semibold text-ink mb-4 tracking-wide uppercase text-[12px]">
                            Quick links
                        </h4>
                        <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-ink-3 no-underline transition-colors duration-200 hover:text-amber"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Genres Column */}
                    <div>
                        <h4 className="font-serif text-sm font-semibold text-ink mb-4 tracking-wide uppercase text-[12px]">
                            Browse by genre
                        </h4>
                        <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                            {genres.map((g) => (
                                <li key={g.href}>
                                    <Link
                                        href={g.href}
                                        className="text-sm text-ink-3 no-underline transition-colors duration-200 hover:text-amber"
                                    >
                                        {g.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Column with Beautiful Input Box */}
                    <div>
                        <h4 className="font-serif text-sm font-semibold text-ink mb-2 tracking-wide uppercase text-[12px]">
                            Stay in the loop
                        </h4>
                        <p className="text-sm text-ink-3 leading-relaxed mb-4">
                            Get new ebook drops and writer spotlights in your inbox.
                        </p>

                        {/* Beautiful Input & Button Box */}
                        <div className="flex flex-col gap-2 max-w-[260px]">
                            <div className="flex items-center bg-cream border border-border-custom rounded-lg px-3 py-2.5 focus-within:border-amber focus-within:ring-1 focus-within:ring-amber transition-all shadow-sm">
                                <FiMail size={16} className="text-ink-3 mr-2 shrink-0" />
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full bg-transparent border-none outline-none text-sm text-ink font-sans placeholder:text-ink-3/50"
                                />
                            </div>
                            <button className="w-full bg-ink text-cream text-sm font-medium py-2.5 rounded-lg cursor-pointer font-sans transition-all duration-200 hover:bg-amber active:scale-[0.98] shadow-sm">
                                Subscribe
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Footer Bar */}
            <div className="border-t border-border-custom py-4 px-5">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-xs text-ink-3 m-0">
                        © {new Date().getFullYear()} Fable · All rights reserved
                    </p>
                    <div className="flex gap-4">
                        {["About", "Contact", "Privacy Policy"].map((label) => (
                            <Link
                                key={label}
                                href={`/${label.toLowerCase().replace(" ", "-")}`}
                                className="text-xs text-ink-3 no-underline transition-colors duration-200 hover:text-amber"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}