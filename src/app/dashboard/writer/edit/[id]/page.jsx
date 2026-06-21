// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { FiSave, FiArrowLeft, FiBook, FiDollarSign, FiGrid } from 'react-icons/fi';

// export default function EditBookPage({ params }) {
//     const router = useRouter();

//     // Dynamic Id
//     const unwrappedParams = React.use(params);
//     const bookId = unwrappedParams.id;

//     const [formData, setFormData] = useState({ title: '', category: '', price: '' });
//     const [loading, setLoading] = useState(true);
//     const [updating, setUpdating] = useState(false);
//     const [message, setMessage] = useState({ type: '', text: '' });

//     //Data Fetch
//     useEffect(() => {
//         const controller = new AbortController();

//         async function fetchBookDetails() {
//             try {
//                 const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//                 const token = localStorage.getItem('token');

//                 const res = await fetch(`${apiUrl}/writer/books/${bookId}`, {
//                     signal: controller.signal,
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json'
//                     }
//                 });

//                 if (res.ok) {
//                     const data = await res.json();
//                     setFormData({
//                         title: data.title || '',
//                         category: data.category || '',
//                         price: data.price || ''
//                     });
//                 } else {
//                     console.error("Failed to fetch book data");
//                     setMessage({ type: 'error', text: 'Failed to load book data.' });
//                 }
//             } catch (error) {
//                 if (error.name !== 'AbortError') {
//                     console.error("Error fetching book:", error);
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchBookDetails();

//         return () => controller.abort();
//     }, [bookId]);

//     // Data Submit (Put)
//     const handleUpdateSubmit = async (e) => {
//         e.preventDefault();
//         setUpdating(true);
//         setMessage({ type: '', text: '' });

//         try {
//             const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//             const token = localStorage.getItem('token');

//             const res = await fetch(`${apiUrl}/writer/books/${bookId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     title: formData.title,
//                     category: formData.category,
//                     price: parseFloat(formData.price) // Number Convert
//                 })
//             });

//             if (res.ok) {
//                 setMessage({ type: 'success', text: 'Ebook information updated successfully!' });

//                 // Manage
//                 setTimeout(() => {
//                     router.push('/dashboard/writer/manage');
//                 }, 2000);
//             } else {
//                 setMessage({ type: 'error', text: 'Failed to update ebook information.' });
//             }
//         } catch (error) {
//             console.error("Error updating book:", error);
//             setMessage({ type: 'error', text: 'Server error. Please try again.' });
//         } finally {
//             setUpdating(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="py-20 text-center flex flex-col items-center justify-center">
//                 <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--ink)]"></div>
//                 <p className="mt-4 text-sm text-[var(--ink-3)]">Loading ebook details...</p>
//             </div>
//         );
//     }

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
//                     Edit Ebook Info
//                 </h1>
//                 <p className="text-sm text-[var(--ink-3)] m-0">
//                     Update the details of your uploaded book.
//                 </p>
//             </div>

//             {/* Edit Form Card */}
//             <div className="bg-[var(--cream-2)] border border-[var(--border)] rounded-2xl p-6 md:p-8 shadow-sm">

//                 {message.text && (
//                     <div className={`p-4 rounded-xl text-sm mb-6 border ${message.type === 'success'
//                         ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
//                         : 'bg-rose-50 border-rose-200 text-rose-800'
//                         }`}>
//                         {message.text}
//                     </div>
//                 )}

//                 <form onSubmit={handleUpdateSubmit} className="space-y-5">
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
//                             />
//                         </div>
//                     </div>

//                     <hr className="border-[var(--border)] my-6" />

//                     <button
//                         type="submit"
//                         disabled={updating}
//                         className="w-full sm:w-auto px-6 py-3 bg-[var(--ink)] text-[var(--cream)] rounded-xl text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer border-none"
//                     >
//                         {updating ? 'Saving Changes...' : <><FiSave size={14} /> Save Changes</>}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiSave, FiArrowLeft, FiBook, FiDollarSign, FiGrid } from 'react-icons/fi';

export default function EditBookPage({ params }) {
    const router = useRouter();
    const unwrappedParams = React.use(params);
    const bookId = unwrappedParams.id;

    const [formData, setFormData] = useState({ title: '', category: '', price: '', coverImage: '', description: '' });
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const controller = new AbortController();

        async function fetchBookDetails() {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
                const res = await fetch(`${apiUrl}/writer/books/${bookId}`, { signal: controller.signal });

                if (res.ok) {
                    const data = await res.json();
                    setFormData({
                        title: data.title || '',
                        category: data.category || '',
                        price: data.price ?? '',
                        coverImage: data.coverImage || '',
                        description: data.description || '',
                    });
                } else {
                    setMessage({ type: 'error', text: 'Failed to load book data.' });
                }
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error("Error fetching book:", error);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchBookDetails();
        return () => controller.abort();
    }, [bookId]);

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setMessage({ type: '', text: '' });

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

            const res = await fetch(`${apiUrl}/writer/books/${bookId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    category: formData.category,
                    price: parseFloat(formData.price),
                    coverImage: formData.coverImage,
                    description: formData.description,
                })
            });

            if (res.ok) {
                setMessage({ type: 'success', text: 'Ebook information updated successfully!' });
                setTimeout(() => {
                    router.push('/dashboard/writer/manage');
                }, 1500);
            } else {
                setMessage({ type: 'error', text: 'Failed to update ebook information.' });
            }
        } catch (error) {
            console.error("Error updating book:", error);
            setMessage({ type: 'error', text: 'Server error. Please try again.' });
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--ink)]"></div>
                <p className="mt-4 text-sm text-[var(--ink-3)]">Loading ebook details...</p>
            </div>
        );
    }

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
                    Edit Ebook Info
                </h1>
                <p className="text-sm text-[var(--ink-3)] m-0">
                    Update the details of your uploaded book.
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

                <form onSubmit={handleUpdateSubmit} className="space-y-5">
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
                            />
                        </div>
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
                            />
                        </div>
                    </div>

                    <hr className="border-[var(--border)] my-6" />

                    <button
                        type="submit"
                        disabled={updating}
                        className="w-full sm:w-auto px-6 py-3 bg-[var(--ink)] text-[var(--cream)] rounded-xl text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer border-none"
                    >
                        {updating ? 'Saving Changes...' : <><FiSave size={14} /> Save Changes</>}
                    </button>
                </form>
            </div>
        </div>
    );
}