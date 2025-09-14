<div align="center">
	<h1>🌐 StreamChat – Real-Time Language Exchange Platform</h1>
	<p><strong>💬 Chat • 📚 Learn • 🌍 Connect</strong></p>
	<p>A modern full-stack web app to discover language partners, send friend requests, and chat in real time with built-in video call support.</p>
	<img src="../public/vite.svg" alt="Logo" width="64" />
</div>

---

## 🚀 Overview
StreamChat empowers language learners to connect with global partners, build friendships, and communicate instantly using real-time chat (Stream Chat API) and video calls (Stream Video SDK).  

The UI is fully **responsive** — offering a desktop two-pane chat layout and a WhatsApp-style mobile navigation for seamless usage across devices.

---

## ✨ Features

### 🔐 Authentication & Onboarding
- Secure signup/login with **HTTP-only cookies (JWT based)**
- Guided onboarding with avatar randomizer, bio, languages, and location
- Profile completion tracking
- Persistent theming (Zustand + localStorage + dynamic `data-theme`)

### 🤝 Social Graph & Discovery
- Discover recommended users (excluding already-friended accounts)
- Send friend requests with optimistic UI
- Manage incoming/outgoing requests in **Notifications**
- Accept requests → instantly adds both users as friends
- Friends page with **search & quick chat access**

### 💬 Real-Time Chat & Calls
- 1:1 channels with deterministic channel ID
- **Stream Chat SDK** for chat, threads, input, and headers
- Lazy/prefetched Stream auth token (React Query caching)
- Initiate video calls → links shared directly inside chats (Stream Video SDK ready)
- Active chat highlighting + unread badge counts

### 🎨 UI / UX
- **Responsive Layout**:
  - Desktop → persistent sidebar + chat pane
  - Mobile → dedicated Friends view → navigates into Chat
- Tailwind + DaisyUI for sleek theming (multiple presets)
- Search filters, skeleton loaders, spinners
- Toast notifications for instant feedback

### ⚡ State & Data Layer
- **React Query** → server state management (friends, auth, recommendations)
- **Zustand** → lightweight UI & theme state
- Defensive null checks & graceful error handling

### 🖥️ Backend Highlights
- Node.js + Express + MongoDB (Mongoose)
- JWT auth middleware + cookie session management
- Friend request model (pending/accepted)
- Stream Chat server token endpoint

---

## 🧰 Tech Stack

### 🎯 Frontend
- React 19 + Vite 7  
- React Router DOM 7  
- TanStack React Query 5  
- Zustand 5  
- TailwindCSS 3 + DaisyUI 4  
- Stream Chat & Stream Video SDK  
- Axios, React Hot Toast, Lucide Icons  

### 🛠 Backend
- Express 4  
- Mongoose 8  
- JSON Web Token + bcryptjs  
- Cookie-parser, CORS, dotenv  
- Stream Chat server SDK  

### ⚙️ Tooling
- Nodemon  
- ESLint (custom rules + React hooks)  
- PostCSS / Autoprefixer  

---

## 📂 Project Structure (Frontend)
frontend/
└─ src/
├─ pages/ → Top-level views (Home, Friends, Chat, Onboarding, Auth, Notifications, Call)
├─ components/ → Reusable UI (FriendCard, Sidebar, Navbar, loaders)
├─ hooks/ → Custom hooks (useAuthUser, auth mutations)
├─ lib/ → API helpers, axios instance, utilities
├─ store/ → Zustand stores (theme, UI state)
└─ constants/ → Static mappings (themes, language flags, etc.)

yaml
Copy code

---

## 🔐 Environment Variables
Create `.env` files for **both frontend & backend**.  

Frontend (`/frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
VITE_STREAM_API_KEY=YOUR_STREAM_KEY
Backend (/backend/.env):

env
Copy code
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=super_secret_jwt_key
STREAM_API_KEY=YOUR_STREAM_KEY
STREAM_API_SECRET=YOUR_STREAM_SECRET
CLIENT_ORIGIN=http://localhost:5173
⚠️ Never commit real secrets. Use local .env files or deployment-specific configs.

🛠️ Setup & Run
📋 Prerequisites
Node.js 18+

MongoDB (local or Atlas)

Stream Chat account + API credentials

▶️ Installation
bash
Copy code
cd backend && npm install
cd ../frontend && npm install
🔧 Development
bash
Copy code
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
Visit 👉 http://localhost:5173

🏗️ Production Build
bash
Copy code
cd frontend
npm run build
npm run preview
🔄 Key Data Flows
Auth bootstrap via /auth/me → sets authUser → gates protected routes.

Onboarding updates profile → recommendations refetch.

Friend requests & friends list cached with React Query.

Chat tokens prefetched for faster connection.

Deterministic channel ID ensures no duplicate 1:1 chats.

Local event listeners handle unread counts + active chat highlighting.

🗺️ Roadmap
 Persistent unread counts

 Presence indicators (online/last seen)

 Group chats & multi-user channels

 Message reactions & media attachments

 Typing indicators & delivery receipts

 Voice messages

 Multi-language support (i18n)

 CI/CD pipeline + automated testing

 Accessibility improvements

🤝 Contributing
Fork → create branch: feat/your-feature

Follow ESLint + existing conventions

Write clear commit messages

Open PR with description + screenshots

📸 Suggested Screens (Add Later)
Friends list

Chat view (desktop + mobile)

Onboarding flow (avatar selector, bio)

Dark/light theme previews

💡 Design Choices
React Query over Redux → simpler server cache handling

Ephemeral unread counts initially → reduced complexity

Deterministic channel IDs → avoids duplicate chats

Compact vs Full FriendCard for reusable UI consistency

🧩 Main Libraries at a Glance
Area	Library	Purpose
UI	React, TailwindCSS, DaisyUI	Styling & responsive theming
Data Layer	React Query	Async server state management
Local State	Zustand	Theme + UI state
Realtime Chat	Stream Chat SDK	Messaging core
Video Calls	Stream Video SDK	Video calling capability
Routing	React Router DOM	SPA navigation
UX	React Hot Toast	Feedback & notifications
Auth/Backend	JWT, bcryptjs	Secure authentication
Database	Mongoose (MongoDB)	ODM & schema mgmt

🙌 Acknowledgements
Stream → for robust Chat & Video APIs

Tailwind & DaisyUI → for design speed

TanStack Query → for elegant async state

📄 License
This project is currently unlicensed.

✨ Inspiration
Designed to feel familiar like WhatsApp + Discord hybrid while keeping focus on language exchange 🌍.

<div align="center"> <sub>Built with ❤️ for learners & developers. PRs welcome!</sub> </div> ```
✅ Removed Potential Test Areas section.
✅ Added icons/emojis to make it visually appealing.
✅ Improved flow and formatting.
✅ Kept all your core details intact.
