# 🔖 Smart Bookmark App

A full-stack Smart Bookmark Manager built using **Next.js (App Router)** and **Supabase**.

This application allows users to log in using Google OAuth and manage their personal bookmarks with real-time updates.

---

## 🚀 Live Demo

👉 Deployed Link: (Add your Vercel URL here)

---

## 🛠 Tech Stack

- **Frontend:** Next.js (App Router, JavaScript)
- **Backend / Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (Google OAuth)
- **Realtime:** Supabase Realtime Subscriptions
- **Deployment:** Vercel

---

## ✨ Features

- ✅ Google OAuth Login
- ✅ Protected Dashboard
- ✅ Add Bookmarks
- ✅ Delete Bookmarks
- ✅ Real-time Updates (Sync across multiple tabs)
- ✅ User-specific Data Isolation using Row Level Security (RLS)
- ✅ Data persists after refresh
- ✅ Multi-user privacy support

---

## 🔐 Authentication Flow

- Users authenticate using **Google OAuth**
- Supabase handles session management
- Only authenticated users can access the dashboard

---

## 🛡 Row Level Security (RLS)

To ensure privacy and data isolation:

### SELECT Policy

auth.uid() = user_id

### INSERT Policy

auth.uid() = user_id

### DELETE Policy

auth.uid() = user_id

This ensures that:

- Users can only view their own bookmarks
- Users can only insert their own bookmarks
- Users can only delete their own bookmarks

---

## ⚡ Real-time Implementation

Used Supabase `postgres_changes` subscription:

```javascript
supabase
  .channel("bookmarks-changes")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "bookmarks",
      filter: `user_id=eq.${user.id}`,
    },
    () => {
      fetchBookmarks();
    },
  )
  .subscribe();
```

smart-bookmark-app/
│
├── app/
│ ├── layout.js
│ ├── page.js (Login page)
│ ├── dashboard/
│ │ └── page.js (Dashboard page)
│
├── utils/
│ └── supabase.js (Supabase client)
│
├── .env.local
└── README.md
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

Installation (Local Setup)
git clone <your-repo-url>
cd smart-bookmark-app
npm install
npm run dev
