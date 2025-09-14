<div align="center">
	<h1>🌐 StreamChat – Real‑Time Language Exchange Platform</h1>
	<p><strong>Chat • Learn • Connect</strong></p>
	<p>A full‑stack web app for discovering language partners, sending friend requests, and chatting in real time with video call support.</p>
	<img src="../public/vite.svg" alt="Logo" width="64" />
</div>

---

## 🚀 Overview
StreamChat helps language learners find partners, build a friends network, and communicate instantly using chat (Stream Chat API) and video calls (Stream Video SDK). The UI is fully responsive (mobile-first) with a desktop two‑pane chat layout and WhatsApp‑style mobile navigation.

---

## ✨ Features
### Authentication & Onboarding
- Secure signup / login with HTTP‑only cookies (JWT based)
- Onboarding flow: avatar randomizer, bio, languages, location, profile completion state
- Theme persistence (Zustand + localStorage + dynamic `data-theme`)

### Social Graph & Discovery
- Recommended users (excludes already-friended accounts)
- Send friend requests with optimistic UI
- View outgoing & incoming requests (notifications page)
- Accept requests → moves both users into friends list
- Friends page with search & quick chat access

### Real-Time Chat & Calls
- 1:1 channels (deterministic channel id composition)
- Stream Chat SDK integration (messages, threads, input, header)
- Lazy or prefetched Stream auth token (React Query caching)
- Video call initiation posts link inside chat (Stream Video SDK ready via dependency)
- Unread badge counts (local event-based) + active chat highlight

### UI / UX
- Responsive layout: 
	- Desktop: persistent sidebar (friends list) + chat pane
	- Mobile: dedicated Friends view → navigates to Chat view
- DaisyUI + Tailwind for rapid theming (multiple theme presets selectable)
- Search filters (friends & chat sidebar)
- Skeleton / loader states (spinners, ChatLoader)
- Toast notifications for feedback

### State & Data Layer
- React Query for server state (friends, recommendations, auth user, stream token)
- Zustand for lightweight UI/theme state
- Graceful error handling & defensive null checks

### Backend (Summary)
- Node + Express + MongoDB (Mongoose models)
- JWT auth middleware & cookie session mgmt
- Friend request model (pending/accepted)
- Stream server token endpoint

### Code Quality & Structure
- Modular controllers / routes / models setup
- Separation of API helper layer on frontend
- Utility functions (capitalize, flag mapping)
- Reusable FriendCard component (full & compact variants)

---

## 🧰 Tech Stack
### Frontend
- React 19 + Vite 7
- React Router DOM 7
- @tanstack/react-query 5
- Zustand 5
- TailwindCSS 3 + DaisyUI 4
- Stream Chat & stream-chat-react 13
- @stream-io/video-react-sdk (video call integration potential)
- Axios, React Hot Toast, Lucide Icons

### Backend
- Express 4
- Mongoose 8
- JSON Web Token (jsonwebtoken)
- bcryptjs (password hashing)
- cookie-parser, cors, dotenv
- Stream Chat server SDK

### Dev / Tooling
- Nodemon (backend dev)
- ESLint (custom + React hooks + refresh plugins)
- PostCSS / Autoprefixer

---

## 📁 Project Structure (Frontend)
```
frontend/
	src/
		pages/        -> Top-level views (Home, Friends, Chat, Onboarding, Auth, Notifications, Call)
		components/   -> Reusable UI (FriendCard, Sidebar, Navbar, ThemeSelector, loaders)
		hooks/        -> Custom hooks (useAuthUser, auth mutations)
		lib/          -> API helpers, axios instance, utilities
		store/        -> Zustand store(s) (theme)
		constants/    -> Static mappings (themes, language → flag country codes)
```

## 🔐 Environment Variables
Create a `.env` in both `backend` and `frontend` as needed.

Frontend (`/frontend/.env`):
```
VITE_API_URL=http://localhost:5000/api
VITE_STREAM_API_KEY=YOUR_STREAM_KEY
```

Backend (`/backend/.env`):
```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=super_secret_jwt_key
STREAM_API_KEY=YOUR_STREAM_KEY
STREAM_API_SECRET=YOUR_STREAM_SECRET
CLIENT_ORIGIN=http://localhost:5173
```

> Never commit real secrets. Use local `.env` and environment-based deployment configs.

---

## 🛠️ Setup & Run
### Prerequisites
- Node 18+
- MongoDB instance (Atlas or local)
- Stream Chat account / API key & secret

### Install
```bash
cd backend && npm install
cd ../frontend && npm install
```

### Development
```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```
Visit: http://localhost:5173

### Production Build
```bash
cd frontend
npm run build
npm run preview
```

---

## 🔄 Key Data Flows
1. Auth bootstrap: `useAuthUser` fetches `/auth/me` → sets `authUser` → routes gate content.
2. Onboarding completion triggers profile update; recommendations query refetches.
3. Friends & Recommendations: React Query caches `friends`, `users`. Mutations invalidate relevant caches.
4. Friend Requests: Outgoing & incoming endpoints populate Notifications UI (extendable).
5. Chat: Prefetched Stream token speeds initial connect; deterministic channel ID = sorted user IDs.
6. Unread logic: Local event listener increments counts; resets when channel opened.

---

## 🧪 Potential Test Areas (Future)
- Auth route protection & redirects
- Friend request lifecycle (send → accept)
- Channel creation ensures consistent channel id
- Theme persistence across reload

---

## 🗺️ Roadmap Ideas
- [ ] Real unread counts via channel queries (persistent)
- [ ] Presence indicators (online / last seen)
- [ ] Group chats & multi-user channels
- [ ] Message reactions & attachments
- [ ] Typing indicators & delivery receipts
- [ ] Voice messages
- [ ] Internationalization (i18n)
- [ ] CI pipeline & basic unit tests
- [ ] Accessibility pass (aria roles, focus traps)

---

## 🤝 Contributing
1. Fork & branch: `feat/your-feature`
2. Follow existing code style (ESLint will guide)
3. Write concise commit messages
4. Open PR with description & screenshots (if UI)

---

## 📸 Suggested Screens (Add Later)
You can add screenshots/GIFs here:
- Friends list
- Chat (desktop + mobile)
- Onboarding avatar selector
- Dark / light theme variants

---

## 💡 Design Decisions
- Chose React Query instead of Redux for simpler server cache semantics
- Local unread counts kept ephemeral to avoid complexity early
- Deterministic channel ID prevents duplicate 1–1 threads
- Compact vs full FriendCard variant for reuse and consistent styling

---

## 🧩 Main Libraries At A Glance
| Area | Library | Purpose |
|------|---------|---------|
| UI | React, TailwindCSS, DaisyUI | Component + styling + theming |
| State / Data | React Query | Server cache & fetching |
| Local State | Zustand | Theme + light shared UI bits |
| Realtime Chat | stream-chat, stream-chat-react | Messaging SDK & UI primitives |
| Video | @stream-io/video-react-sdk | Video call capability |
| Routing | react-router-dom | SPA navigation |
| Forms / UX | react-hot-toast | User feedback |
| Icons | lucide-react | Iconography |
| HTTP | Axios | API helper layer |
| Auth (backend) | jsonwebtoken, bcryptjs | JWT signing & password hashing |
| DB | mongoose | ODM for MongoDB |

---

## 🙌 Acknowledgements
- Stream for powerful Chat & Video APIs
- Tailwind & DaisyUI for rapid styling
- TanStack Query for ergonomic async state

---

## 📄 License
This project is currently unlicensed 

---

## ✨ Inspiration
Designed to feel familiar to users of messaging apps (WhatsApp / Discord hybrid) while focused on language pairing.

---

<div align="center">
	<sub>Built with focus on developer experience & extensibility. PRs welcome!</sub>
</div>
