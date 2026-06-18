"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { signUp, signIn } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "", email: "", password: "", confirmPassword: "",
    });
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) =>
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (form.password !== form.confirmPassword) {
            const msg = "Passwords do not match.";
            setError(msg);
            toast.error(msg);
            return;
        }
        if (form.password.length < 8) {
            const msg = "Password must be at least 8 characters.";
            setError(msg);
            toast.error(msg);
            return;
        }

        setLoading(true);
        try {
            const { error: authError } = await signUp.email({
                name: form.name,
                email: form.email,
                password: form.password,
            });

            if (authError) {
                const msg = authError.message || "Registration failed.";
                setError(msg);
                toast.error(msg);
                return;
            }

            toast.success("Account created successfully!");
            router.push("/");
            router.refresh();
        } catch {
            const msg = "Something went wrong. Please try again.";
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError("");
        setGoogleLoading(true);
        try {
            await signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch {
            const msg = "Google sign-in failed. Please try again.";
            setError(msg);
            toast.error(msg); // <-- টোস্ট এরর
            setGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-56px)] bg-[var(--cream-2)] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">

                {/* Logo + heading */}
                <div className="text-center mb-8">
                    <Link href="/" className="no-underline">
                        <span className="font-serif text-3xl font-medium text-[var(--ink)] tracking-tight">
                            F<span className="text-[var(--amber)]">.</span>able
                        </span>
                    </Link>
                    <h1 className="font-serif text-2xl font-medium text-[var(--ink)] mt-4 mb-1">
                        Create your account
                    </h1>
                    <p className="text-sm text-[var(--ink-3)]">
                        Join thousands of readers and writers
                    </p>
                </div>

                {/* Card */}
                <div className="card bg-[var(--cream)] border border-[var(--border)] shadow-sm rounded-xl">
                    <div className="card-body gap-0 p-7">

                        {/* Error alert */}
                        {error && (
                            <div className="alert bg-red-50 border border-red-200 text-red-800 text-sm mb-5 py-2.5 rounded-lg flex gap-2 items-center">
                                <FiAlertCircle size={15} className="shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                            {/* Full name */}
                            <label className="form-control">
                                <div className="label pb-1">
                                    <span className="label-text text-[var(--ink-2)] text-xs font-medium tracking-wide">
                                        Full name
                                    </span>
                                </div>
                                <label className="input input-bordered bg-[var(--cream-2)] border-[var(--border)] flex items-center gap-2 focus-within:border-[var(--amber)] focus-within:outline-none h-11 rounded-lg">
                                    <FiUser size={14} className="text-[var(--ink-3)] shrink-0" />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your full name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        className="grow bg-transparent text-sm text-[var(--ink)] placeholder:text-[var(--ink-3)] border-none outline-none h-full"
                                    />
                                </label>
                            </label>

                            {/* Email */}
                            <label className="form-control">
                                <div className="label pb-1">
                                    <span className="label-text text-[var(--ink-2)] text-xs font-medium tracking-wide">
                                        Email address
                                    </span>
                                </div>
                                <label className="input input-bordered bg-[var(--cream-2)] border-[var(--border)] flex items-center gap-2 focus-within:border-[var(--amber)] focus-within:outline-none h-11 rounded-lg">
                                    <FiMail size={14} className="text-[var(--ink-3)] shrink-0" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="your@email.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        className="grow bg-transparent text-sm text-[var(--ink)] placeholder:text-[var(--ink-3)] border-none outline-none h-full"
                                    />
                                </label>
                            </label>

                            {/* Password */}
                            <label className="form-control">
                                <div className="label pb-1">
                                    <span className="label-text text-[var(--ink-2)] text-xs font-medium tracking-wide">
                                        Password
                                    </span>
                                </div>
                                <label className="input input-bordered bg-[var(--cream-2)] border-[var(--border)] flex items-center gap-2 focus-within:border-[var(--amber)] focus-within:outline-none h-11 rounded-lg">
                                    <FiLock size={14} className="text-[var(--ink-3)] shrink-0" />
                                    <input
                                        type={showPass ? "text" : "password"}
                                        name="password"
                                        placeholder="Min. 8 characters"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        className="grow bg-transparent text-sm text-[var(--ink)] placeholder:text-[var(--ink-3)] border-none outline-none h-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass(!showPass)}
                                        className="text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors focus:outline-none"
                                        aria-label="Toggle password"
                                    >
                                        {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                                    </button>
                                </label>
                            </label>

                            {/* Confirm password */}
                            <label className="form-control">
                                <div className="label pb-1">
                                    <span className="label-text text-[var(--ink-2)] text-xs font-medium tracking-wide">
                                        Confirm password
                                    </span>
                                </div>
                                <label className="input input-bordered bg-[var(--cream-2)] border-[var(--border)] flex items-center gap-2 focus-within:border-[var(--amber)] focus-within:outline-none h-11 rounded-lg">
                                    <FiLock size={14} className="text-[var(--ink-3)] shrink-0" />
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Repeat your password"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        className="grow bg-transparent text-sm text-[var(--ink)] placeholder:text-[var(--ink-3)] border-none outline-none h-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors focus:outline-none"
                                        aria-label="Toggle confirm password"
                                    >
                                        {showConfirm ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                                    </button>
                                </label>
                            </label>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading || googleLoading}
                                className="btn w-full mt-2 h-11 min-h-[2.75rem] rounded-lg transition-colors text-[var(--cream)] bg-[var(--ink)] hover:bg-[var(--ink-2)] border-none normal-case font-medium text-sm"
                            >
                                {loading && <span className="loading loading-spinner loading-sm text-[var(--cream)]" />}
                                {loading ? "Creating account..." : "Create account"}
                            </button>
                        </form>

                        <div className="divider text-[var(--ink-3)] text-xs my-5 before:bg-[var(--border)] after:bg-[var(--border)]">or</div>

                        {/* Google Sign In */}
                        <button
                            type="button"
                            disabled={loading || googleLoading}
                            onClick={handleGoogleSignIn}
                            className="btn w-full h-11 min-h-[2.75rem] rounded-lg transition-colors bg-[var(--cream)] hover:bg-[var(--cream-2)] border border-[var(--border)] text-[var(--ink)] normal-case font-medium text-sm flex items-center justify-center gap-2"
                        >
                            {googleLoading ? (
                                <span className="loading loading-spinner loading-sm text-[var(--ink)]" />
                            ) : (
                                <FcGoogle size={18} />
                            )}
                            Continue with Google
                        </button>

                        {/* Login link */}
                        <p className="text-center text-sm text-[var(--ink-3)] mt-6">
                            Already have an account?{" "}
                            <Link href="/login" className="text-[var(--amber)] font-medium no-underline hover:underline">
                                Sign in
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}