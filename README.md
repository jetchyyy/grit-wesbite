# GRIT Fitness Gym Website

A modern, high-performance website for GRIT Fitness Gym in Cebu City, Philippines. Built with React, TypeScript, Tailwind CSS, and Firebase.

## 🚀 Features

### Public Website

- **Responsive Landing Page** - Optimized for mobile, tablet, and desktop
- **Hero Section** - Eye-catching intro with member testimonial
- **Features Showcase** - Interactive gallery modals for 4 core features
- **Weekly Classes** - Bento Grid layout showcasing gym classes
- **Coach Profiles** - Meet our expert trainers with detailed modals
- **Pricing Plans** - 5 membership tiers with comparison
- **Member Testimonials** - Social proof from satisfied members
- **FAQ Section** - Comprehensive answers with Schema.org markup
- **Contact Form** - Get in touch section
- **SEO Optimized** - Meta tags, Open Graph, structured data

### Admin CMS (Content Management System)

- **Secure Authentication** - Email/password & Google Sign-In
- **Manage Classes** - CRUD operations with image upload (1200x800px)
- **Manage Coaches** - CRUD operations with image upload (400x600px)
- **Manage Pricing** - Update membership plans
- **Manage Testimonials** - Add/edit member reviews
- **Media Library** - Centralized image management
- **Image Optimization** - Automatic compression and resizing
- **Role-Based Access** - Admin-only routes with Firebase security rules

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Backend**: Firebase
  - Authentication (Email + Google OAuth)
  - Firestore Database
  - Cloud Storage
  - Analytics
- **Icons**: Lucide React
- **Image Optimization**: browser-image-compression

## 📁 Project Structure

```
grit-website/
├── src/
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx & FeatureModal.tsx
│   │   ├── Classes.tsx & ClassModal.tsx
│   │   ├── Coaches.tsx & CoachModal.tsx
│   │   ├── Pricing.tsx & PaymentModal.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   ├── Contact.tsx
│   │   └── admin/
│   │       └── PrivateRoute.tsx
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   └── admin/
│   │       ├── Login.tsx
│   │       ├── Dashboard.tsx
│   │       ├── ManageClasses.tsx
│   │       ├── ManageCoaches.tsx
│   │       ├── ManagePricing.tsx
│   │       ├── ManageTestimonials.tsx
│   │       └── MediaLibrary.tsx
│   ├── hooks/
│   │   └── useAuth.tsx
│   ├── utils/
│   │   └── imageUpload.ts
│   └── firebase/
│       └── config.ts
├── docs/
│   ├── CMS_IMPLEMENTATION.md
│   ├── CMS_SETUP_GUIDE.md
│   ├── SEO_IMPLEMENTATION.md
│   └── MODAL_PERFORMANCE_OPTIMIZATION.md
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── firestore.rules
├── storage.rules
└── README.md
```

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:

```powershell
git clone https://github.com/jetchyyy/grit-wesbite.git
cd grit-website
```

2. Install dependencies:

```powershell
npm install
```

3. Set up environment variables:
   Create `.env` file in root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. Run development server:

```powershell
npm run dev
```

5. Open `http://localhost:5173`

## 🔐 CMS Setup

**First-time setup required!** Follow the [CMS Setup Guide](./docs/CMS_SETUP_GUIDE.md) to:

1. Enable Firebase Authentication, Firestore, and Storage
2. Create an admin user
3. Deploy security rules
4. Access the CMS at `/admin/login`

## 📦 Available Scripts

```powershell
npm run dev        # Start development server with HMR
npm run build      # Build for production (tsc + vite build)
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

## 🎨 Brand Colors

- **Primary (Gold)**: `#BF9B30` - CTAs, icons, accents
- **Secondary (White)**: `#FFFFFF` - High-contrast text
- **Accent (Tan)**: `#D8C08E` - Supporting text, borders
- **Background (Navy)**: `#0A0A1F` - Dark canvas

## 🖼️ Image Specifications

| Content Type | Dimensions  | Aspect Ratio | Max Size             |
| ------------ | ----------- | ------------ | -------------------- |
| Classes      | 1200 x 800  | 3:2          | 1MB (auto-optimized) |
| Coaches      | 400 x 600   | 2:3          | 1MB (auto-optimized) |
| Testimonials | 200 x 200   | 1:1          | 1MB (auto-optimized) |
| Features     | 800 x 600   | 4:3          | 1MB (auto-optimized) |
| Hero         | 1920 x 1080 | 16:9         | 1MB (auto-optimized) |

## 📊 Performance Optimizations

- ✅ React.memo() on all modal components
- ✅ useCallback() for stable event handlers
- ✅ Lazy loading for images (`loading="lazy"`)
- ✅ will-change CSS hints for animations
- ✅ Optimized transition durations (200-300ms)
- ✅ Custom scrollbar styling
- ✅ Image compression on upload
- ✅ Code splitting with React Router

**Target Metrics:**

- INP < 200ms ✅
- FCP < 1.8s
- LCP < 2.5s

## 🔒 Security Features

- Firebase Authentication (Email + Google OAuth)
- Role-based access control (admin role required)
- Firestore security rules (read: public, write: admin only)
- Storage security rules (upload: admin only)
- Protected admin routes with PrivateRoute component
- Input validation and sanitization

## 📚 Documentation

- [CMS Implementation Guide](./docs/CMS_IMPLEMENTATION.md) - Architecture and technical details
- [CMS Setup Guide](./docs/CMS_SETUP_GUIDE.md) - Step-by-step setup instructions
- [SEO Implementation](./docs/SEO_IMPLEMENTATION.md) - SEO strategy and implementation
- [Modal Performance Optimization](./docs/MODAL_PERFORMANCE_OPTIMIZATION.md) - Performance improvements

## 🚀 Deployment

### Build for Production

```powershell
npm run build
```

### Deploy to Firebase Hosting

```powershell
firebase deploy --only hosting
```

### Deploy Security Rules

```powershell
firebase deploy --only firestore:rules
firebase deploy --only storage
```

## 🤝 Contributing

This is a private client project. For authorized contributors:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add some feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a pull request

## 📝 License

© 2025 GRIT Fitness Gym. All rights reserved.

## 📞 Support

For questions or issues:

- Email: admin@gritfitness.com
- GitHub Issues: [Create an issue](https://github.com/jetchyyy/grit-wesbite/issues)

---

**Built with 💪 by the GRIT Fitness development team**
