"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) =>
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const { error: authError } = await signIn.email({
                email: form.email,
                password: form.password,
            });

            if (authError) {
                const errMsg = authError.message || "Invalid email or password.";
                setError(errMsg);
                toast.error(errMsg);
                return;
            }

            toast.success("Successfully signed in!");
            router.push("/");
            router.refresh();
        } catch {
            const errMsg = "Something went wrong. Please try again.";
            setError(errMsg);
            toast.error(errMsg);
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
            const errMsg = "Google sign-in failed. Please try again.";
            setError(errMsg);
            toast.error(errMsg);
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
                        Welcome back
                    </h1>
                    <p className="text-sm text-[var(--ink-3)]">
                        Sign in to continue reading
                    </p>
                </div>

                {/* Card */}
                <div className="card bg-[var(--cream)] border border-[var(--border)] shadow-sm rounded-xl">
                    <div className="card-body gap-0 p-7">

                        {/* Error */}
                        {error && (
                            <div className="alert bg-red-50 border border-red-200 text-red-800 text-sm mb-5 py-2.5 rounded-lg flex gap-2 items-center">
                                <FiAlertCircle size={15} className="shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

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
                                <div className="label pb-1 flex justify-between">
                                    <span className="label-text text-[var(--ink-2)] text-xs font-medium tracking-wide">
                                        Password
                                    </span>
                                    {/* <Link href="/forgot-password" className="text-xs text-[var(--amber)] no-underline hover:underline">
                                        Forgot password?
                                    </Link> */}
                                </div>
                                <label className="input input-bordered bg-[var(--cream-2)] border-[var(--border)] flex items-center gap-2 focus-within:border-[var(--amber)] focus-within:outline-none h-11 rounded-lg">
                                    <FiLock size={14} className="text-[var(--ink-3)] shrink-0" />
                                    <input
                                        type={showPass ? "text" : "password"}
                                        name="password"
                                        placeholder="Your password"
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

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading || googleLoading}
                                className="btn w-full mt-2 h-11 min-h-[2.75rem] rounded-lg transition-colors text-[var(--cream)] bg-[var(--ink)] hover:bg-[var(--ink-2)] border-none normal-case font-medium text-sm"
                            >
                                {loading && <span className="loading loading-spinner loading-sm text-[var(--cream)]" />}
                                {loading ? "Signing in..." : "Sign in"}
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

                        <p className="text-center text-sm text-[var(--ink-3)] mt-6">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="text-[var(--amber)] font-medium no-underline hover:underline">
                                Create one
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}