# Go Business Referral Dashboard

A modern, secure, and responsive referral management system built for Go Business. This project was developed as a coding assessment based on the specifications detailed in the requirements document.

##  Technology Stack
- **Frontend Core:** React, HTML5, Vanilla CSS
- **Routing:** React Router v6 (`react-router-dom`)
- **Authentication & Cookies:** JSON Web Token (JWT) saved in cookies via `js-cookie`
- **Scaffolding:** Vite with React / JavaScript config
- **Fonts:** Google Fonts (Outfit & Plus Jakarta Sans)

##  File Structure
The file structure has been organized precisely to ensure that pages are placed inside their own page directories under components, while keeping the main app as the entry point:
```
Referral_Dashboard_Assessment/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── pages/
│   │   │   ├── Login.jsx            # Public Auth page
│   │   │   ├── Dashboard.jsx        # Protected Referral Dashboard page
│   │   │   ├── ReferralDetail.jsx   # Protected Referral Details page
│   │   │   └── NotFound.jsx         # Public 404 Page
│   │   ├── ProtectedRoute.jsx       # Route Guard checking cookie existence
│   │   ├── Navbar.jsx               # Universal Navbar with logout actions
│   │   └── Footer.jsx               # Universal Footer with metadata links
│   ├── App.css                      # App override styles
│   ├── App.jsx                      # Main app route setup (wraps BrowserRouter)
│   ├── index.css                    # Unified CSS & Modern Design tokens
│   └── main.jsx                     # Entry React DOM mount
├── index.html                       # Base HTML (fonts preconnected)
├── package.json
└── README.md
```

##  Route Protection & API Endpoints
- **Public Routes:**
  - `/login`: Unauthenticated users can log in. Authenticated users are automatically redirected to the dashboard (`/`).
  - `*`: Not Found page showing a clean 404 message and a link back to dashboard.
- **Protected Routes:**
  - `/`: The main Referral Dashboard. Requires a valid `jwt_token` cookie.
  - `/referral/:id`: Detail page of a specific partner. Requires `jwt_token` cookie.
  - `/dashboard/referrals`: Automatically redirects to `/`.

- **Test API Credentials:**
  - **Email:** `admin@example.com`
  - **Password:** `admin123`

##  Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
By default, the application will boot up at `http://localhost:5173/` (or the next available port).

### 3. Build for Production
To generate a production-ready optimized build:
```bash
npm run build
```

### 4. Code Quality & Linting
To check the code against strict quality rules:
```bash
npm run lint
```
