// 'use client';
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { FiPlusCircle, FiArrowLeft, FiBook, FiDollarSign, FiGrid, FiImage } from 'react-icons/fi';

// export default function AddBookPage() {
//     const router = useRouter();
//     const [formData, setFormData] = useState({
//         title: '',
//         category: '',
//         price: '',
//         coverImage: ''
//     });
//     const [submitting, setSubmitting] = useState(false);
//     const [message, setMessage] = useState({ type: '', text: '' });

//     // Form Handler (POST Request)
//     const handleAddBookSubmit = async (e) => {
//         e.preventDefault();
//         setSubmitting(true);
//         setMessage({ type: '', text: '' });

//         try {
//             const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//             const token = localStorage.getItem('token');

//             const res = await fetch(`${apiUrl}/writer/books`, {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     title: formData.title,
//                     category: formData.category,
//                     price: parseFloat(formData.price), // Number-এ Covert
//                     coverImage: formData.coverImage
//                 })
//             });

//             if (res.ok) {
//                 setMessage({ type: 'success', text: 'New ebook uploaded successfully! Waiting for admin approval.' });

//                 // Form Reset
//                 setFormData({ title: '', category: '', price: '', coverImage: '' });

//                 // Manage Page Redirect
//                 setTimeout(() => {
//                     router.push('/dashboard/writer/manage');
//                 }, 2000);
//             } else {
//                 setMessage({ type: 'error', text: 'Failed to upload ebook. Please try again.' });
//             }
//         } catch (error) {
//             console.error("Error adding book:", error);
//             setMessage({ type: 'error', text: 'Server error. Please try again later.' });
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     return (
//         <div className="max-w-2xl space-y-6">
//             {/* Back Button & Header */}
//             <div className="space-y-2">
//                 <button
//                     onClick={() => router.back()}
//                     className="flex items-center gap-2 text-xs font-medium text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors bg-transparent border-none cursor-pointer p-0"
//                 >
//                     <FiArrowLeft size={14} /> Back to Manage
//                 </button>
//                 <h1 className="text-2xl font-serif font-bold tracking-tight text-[var(--ink)] m-0">
//                     Upload New Ebook
//                 </h1>
//                 <p className="text-sm text-[var(--ink-3)] m-0">
//                     Fill in the details below to add a new book to the library.
//                 </p>
//             </div>

//             {/* Add Book Form Card */}
//             <div className="bg-[var(--cream-2)] border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-sm">

//                 {message.text && (
//                     <div className={`p-4 rounded-xl text-sm mb-6 border ${message.type === 'success'
//                         ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
//                         : 'bg-rose-50 border-rose-200 text-rose-800'
//                         }`}>
//                         {message.text}
//                     </div>
//                 )}

//                 <form onSubmit={handleAddBookSubmit} className="space-y-5">
//                     {/* Title */}
//                     <div className="space-y-2">
//                         <label className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)] block">Book Title</label>
//                         <div className="relative">
//                             <FiBook className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-3)]" size={16} />
//                             <input
//                                 type="text"
//                                 required
//                                 value={formData.title}
//                                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                                 className="w-full pl-11 pr-4 py-3 bg-[var(--cream)] border border-[var(--border)] rounded-xl outline-none focus:border-[var(--ink)] transition-all text-sm text-[var(--ink)]"
//                                 placeholder="e.g., The Midnight Library"
//                             />
//                         </div>
//                     </div>

//                     {/* Category */}
//                     <div className="space-y-2">
//                         <label className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)] block">Genre / Category</label>
//                         <div className="relative">
//                             <FiGrid className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-3)]" size={16} />
//                             <input
//                                 type="text"
//                                 required
//                                 value={formData.category}
//                                 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                                 className="w-full pl-11 pr-4 py-3 bg-[var(--cream)] border border-[var(--border)] rounded-xl outline-none focus:border-[var(--ink)] transition-all text-sm text-[var(--ink)]"
//                                 placeholder="e.g., Fiction, Thriller, Sci-Fi"
//                             />
//                         </div>
//                     </div>

//                     {/* Price */}
//                     <div className="space-y-2">
//                         <label className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)] block">Price (USD)</label>
//                         <div className="relative">
//                             <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-3)]" size={16} />
//                             <input
//                                 type="number"
//                                 step="0.01"
//                                 required
//                                 value={formData.price}
//                                 onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                                 className="w-full pl-11 pr-4 py-3 bg-[var(--cream)] border border-[var(--border)] rounded-xl outline-none focus:border-[var(--ink)] transition-all text-sm text-[var(--ink)]"
//                                 placeholder="0.00 (Set 0 for Free)"
//                             />
//                         </div>
//                     </div>

//                     {/* Cover Image URL */}
//                     <div className="space-y-2">
//                         <label className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)] block">Cover Image URL</label>
//                         <div className="relative">
//                             <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-3)]" size={16} />
//                             <input
//                                 type="url"
//                                 required
//                                 value={formData.coverImage}
//                                 onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
//                                 className="w-full pl-11 pr-4 py-3 bg-[var(--cream)] border border-[var(--border)] rounded-xl outline-none focus:border-[var(--ink)] transition-all text-sm text-[var(--ink)]"
//                                 placeholder="https://example.com/image.jpg"
//                             />
//                         </div>
//                     </div>

//                     <hr className="border-[var(--border)] my-6" />

//                     {/* Submit Button */}
//                     <button
//                         type="submit"
//                         disabled={submitting}
//                         className="w-full sm:w-auto px-6 py-3 bg-[var(--ink)] text-[var(--cream)] rounded-xl text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer border-none"
//                     >
//                         {submitting ? (
//                             'Uploading...'
//                         ) : (
//                             <>
//                                 <FiPlusCircle size={14} />
//                                 Upload Ebook
//                             </>
//                         )}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

//Updated
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiPlusCircle, FiArrowLeft, FiBook, FiDollarSign, FiGrid, FiImage } from 'react-icons/fi';
import { useSession } from '@/lib/auth-client';

export default function AddBookPage() {
    const router = useRouter();
    const { data: session } = useSession();

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        price: '',
        coverImage: '',
        description: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleAddBookSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage({ type: '', text: '' });

        const writerId = session?.user?.id;
        if (!writerId) {
            setMessage({ type: 'error', text: 'You must be logged in to upload a book.' });
            setSubmitting(false);
            return;
        }

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

            const res = await fetch(`${apiUrl}/writer/books`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    category: formData.category,
                    price: parseFloat(formData.price),
                    coverImage: formData.coverImage,
                    description: formData.description,
                    writerId,
                    writerName: session?.user?.name || 'Unknown',
                })
            });

            if (res.ok) {
                setMessage({ type: 'success', text: 'New ebook uploaded successfully!' });
                setFormData({ title: '', category: '', price: '', coverImage: '', description: '' });

                setTimeout(() => {
                    router.push('/dashboard/writer/manage');
                }, 1500);
            } else {
                setMessage({ type: 'error', text: 'Failed to upload ebook. Please try again.' });
            }
        } catch (error) {
            console.error("Error adding book:", error);
            setMessage({ type: 'error', text: 'Server error. Please try again later.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl space-y-6">
            <div className="space-y-2">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-xs font-medium text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors bg-transparent border-none cursor-pointer p-0"
                >
                    <FiArrowLeft size={14} /> Back to Manage
                </button>
                <h1 className="text-2xl font-serif font-bold tracking-tight text-[var(--ink)] m-0">
                    Upload New Ebook
                </h1>
                <p className="text-sm text-[var(--ink-3)] m-0">
                    Fill in the details below to add a new book to the library.
                </p>
            </div>

            <div className="bg-[var(--cream-2)] border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-sm">

                {message.text && (
                    <div className={`p-4 rounded-xl text-sm mb-6 border ${message.type === 'success'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-rose-50 border-rose-200 text-rose-800'
                        }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleAddBookSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)] block">Book Title</label>
                        <div className="relative">
                            <FiBook className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-3)]" size={16} />
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full pl-11 pr-4 py-3 bg-[var(--cream)] border border-[var(--border)] rounded-xl outline-none focus:border-[var(--ink)] transition-all text-sm text-[var(--ink)]"
                                placeholder="e.g., The Midnight Library"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)] block">Genre / Category</label>
                        <div className="relative">
                            <FiGrid className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-3)]" size={16} />
                            <input
                                type="text"
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full pl-11 pr-4 py-3 bg-[var(--cream)] border border-[var(--border)] rounded-xl outline-none focus:border-[var(--ink)] transition-all text-sm text-[var(--ink)]"
                                placeholder="e.g., Fiction, Thriller, Sci-Fi"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)] block">Description</label>
                        <textarea
                            required
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 bg-[var(--cream)] border border-[var(--border)] rounded-xl outline-none focus:border-[var(--ink)] transition-all text-sm text-[var(--ink)] resize-none"
                            placeholder="Write a short description of your book..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)] block">Price (USD)</label>
                        <div className="relative">
                            <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-3)]" size={16} />
                            <input
                                type="number"
                                step="0.01"
                                required
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full pl-11 pr-4 py-3 bg-[var(--cream)] border border-[var(--border)] rounded-xl outline-none focus:border-[var(--ink)] transition-all text-sm text-[var(--ink)]"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-2)] block">Cover Image URL</label>
                        <div className="relative">
                            <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-3)]" size={16} />
                            <input
                                type="url"
                                required
                                value={formData.coverImage}
                                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                                className="w-full pl-11 pr-4 py-3 bg-[var(--cream)] border border-[var(--border)] rounded-xl outline-none focus:border-[var(--ink)] transition-all text-sm text-[var(--ink)]"
                                placeholder="https://i.ibb.co/..."
                            />
                        </div>
                    </div>

                    <hr className="border-[var(--border)] my-6" />

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full sm:w-auto px-6 py-3 bg-[var(--ink)] text-[var(--cream)] rounded-xl text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer border-none"
                    >
                        {submitting ? 'Uploading...' : <><FiPlusCircle size={14} /> Upload Ebook</>}
                    </button>
                </form>
            </div>
        </div>
    );
}