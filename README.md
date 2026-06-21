# 📚 Fable – Ebook Sharing Platform

**Fable** is a premium digital platform meticulously crafted to connect ebook lovers, avid readers, and collectors with talented, original writers. The platform balances aesthetic reading experiences with rigorous studio management, allowing readers to discover content seamlessly while offering writers a full-fledged environment to monetize and track their literary masterpieces.

---

## 🌟 Key Features

### 📖 Reader Space (User Portal)
* **Discover & Read:** Seamlessly browse thousands of original ebooks across a multitude of genres via an intuitive filter-by-genre layout.
* **Personalized Dashboard:** A minimalist personal library tracking purchased ebooks, quick access to bought content, and total bookmark/wishlist metrics.
* **Smart Search:** Real-time search engine to locate titles or authors instantly.

### ✍️ Writer Studio (Writer Portal)
* **One-Time Verification:** Aspiring authors gain publishing rights through a secure, one-time verification payment infrastructure via Stripe.
* **Author Metrics Dashboard:** Track total published ebooks, precise book sales performance, and a clear net earnings tally inside a dedicated studio .
* **Full Inventory Management:** Seamless interfaces to add new ebooks, review previous sales history, and curate bookmarked content.

### 👑 System Governance (Admin Portal)
* **Comprehensive Overview:** A central control system displaying total platform users, active ebooks live on the platform, gross platform revenue, and critical metrics .
* **Content & User Moderation:** Complete system oversight to approve pending author registrations, manage active platform ebooks, and review all active transactional records.

---

## 🛠️ Tech Stack & NPM Packages Used

### 💻 Front-End
* **Framework:** Next.js 
* **Styling & UI Components:** DaisyUI & Tailwind CSS (for the rich cream and ink typography interface)
* **Icons Elements:** `lucide-react`, `react-icons`
* **Payment Processing:** `@stripe/stripe-js` / `@stripe/react-stripe-js`
* **Authentication Client:** `better-auth`

### ⚙️ Back-End
* **Runtime Environment:** Node.js with Express.js framework
* **Database Driver:** MongoDB Node driver (Object/Document mapping)
* **Payment Handler:** `stripe` (Server-side SDK integration)
* **Environment Utilities:** `dotenv`
* **Security & Middleware:** `cors`

---

🎁 **Live Project URL:** [https://book-stack-gules.vercel.app](https://book-stack-gules.vercel.app)