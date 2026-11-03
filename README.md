# StudioSpace — Peer-to-Peer Creative Workspace & Production Studio Sharing Platform 🎥

> High-performance Next.js single-page application built for filmmakers, photographers, podcasters, and musicians to scout, list, inspect dynamic availability, and reserve turnkey production studios.

- **Live Application URL**: [https://studiospace-marketplace.vercel.app](https://studiospace-marketplace.vercel.app) *(Replace with your deployed production URL)*
- **Client GitHub Repository**: [StudioSpace Client Repository](https://github.com/nahidul472005/studiospace-client)
- **Server GitHub Repository**: [StudioSpace Server Repository](https://github.com/nahidul472005/studiospace-server)

---

## 🌟 Key Features
- **Interactive Production Hero Slider**: Multi-slide dynamic carousel using Swiper.js highlighting daylight cycloramas, sound stages, podcast rooms, and audio suites with targeted CTA navigation.
- **Dynamic Featured Spaces & Category Browsing**: Live MongoDB data fetching with `.limit(6)`, displaying hourly rates, location, rating badges, and one-click category filtering (`/studios?category=...`).
- **Real-Time Double-Booking Prevention (Challenge 2)**: Client-side duration calculations and server-side slot overlap collision rejection against confirmed reservations.
- **Full Studio Lifecycle & CRUD Management**:
  - Add New Studio with ImgBB upload and equipment amenity checklists (`/add-studio`).
  - Update pre-filled studio specifications (`/studios/edit/[id]`).
  - Delete studio listings with custom confirmation modal dialogs (`/my-listings`).
- **Comprehensive Authentication & Session Persistence**: Secure registration with uppercase, lowercase, and 6+ character password validation, Google social login, and persistent session across page reloads.
- **Theme Customization (Challenge 3)**: Full-system Light and Dark theme toggling with smooth transitions and persistent state.
- **PDF Booking Invoice Generator (Optional Bonus)**: Client-side downloadable official PDF receipts for confirmed studio bookings.
- **Saved Studios Wishlist (Optional Bonus)**: Interactive heart icon on studio cards allowing logged-in creators to store favorites in MongoDB.
- **Zero Default Alerts & Zero Lorem Ipsum**: Standardized feedback using Sonner toast notifications and custom modal dialogs with 100% authentic production studio content.

---

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (`.ts`, `.tsx`)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Toast Notifications**: Sonner
- **Carousels & Sliders**: Swiper.js
- **Document / PDF Generation**: jsPDF
- **Delight & Animations**: Canvas Confetti

---

## 🔐 Examiner Test Credentials
For immediate evaluation without manual registration:
- **Email**: `examiner@studiospace.com`
- **Password**: `Examiner123!`

*(You can also use the **"Auto Fill"** button located directly on the `/login` page or create any new account).*

---

## ⚙️ Local Setup Steps

### 1. Clone & Enter Directory
```bash
git clone <your-client-repo-url>
cd client
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root of `client`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 5. Build for Production
```bash
npm run build
npm start
```
