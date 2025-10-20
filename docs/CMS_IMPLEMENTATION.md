# GRIT Fitness CMS Implementation Guide

## Overview

The Content Management System (CMS) allows administrators to manage gym website content including classes, coaches, pricing, and testimonials through a secure admin panel.

## 🏗️ Architecture

### Monorepo Structure

- **Public Routes**: `/` - Landing page visible to all users
- **Admin Routes**: `/admin/*` - Protected routes requiring authentication

### Technology Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Routing**: React Router v6
- **Backend**: Firebase (Firestore + Storage + Authentication)
- **Image Optimization**: browser-image-compression

## 🔐 Security Implementation

### Authentication Flow

1. Admin navigates to `/admin/login`
2. Signs in with email/password or Google OAuth
3. Firebase verifies credentials
4. System checks Firestore for admin role (`users/{uid}.role === 'admin'`)
5. If authorized, redirects to `/admin` dashboard
6. All admin routes protected by `PrivateRoute` component

### Firestore Security Rules

```javascript
// Only admins can write, everyone can read
match /classes/{classId} {
  allow read: if true;
  allow write: if isAdmin();
}
```

### Storage Security Rules

```javascript
// Only admins can upload, everyone can download
match /classes/{allPaths=**} {
  allow read: if true;
  allow write: if isAdmin();
}
```

## 📁 File Structure

```
src/
├── components/
│   └── admin/
│       └── PrivateRoute.tsx          # Route protection
├── pages/
│   ├── LandingPage.tsx               # Public homepage
│   └── admin/
│       ├── Login.tsx                 # Admin authentication
│       ├── Dashboard.tsx             # Admin layout with sidebar
│       ├── DashboardHome.tsx         # Dashboard homepage
│       ├── ManageClasses.tsx         # CRUD for classes
│       ├── ManageCoaches.tsx         # CRUD for coaches
│       ├── ManagePricing.tsx         # Pricing management
│       ├── ManageTestimonials.tsx    # Testimonials management
│       └── MediaLibrary.tsx          # Media upload hub
├── hooks/
│   └── useAuth.tsx                   # Authentication state
├── utils/
│   └── imageUpload.ts                # Image optimization & upload
└── firebase/
    └── config.ts                     # Firebase initialization
```

## 🖼️ Image Dimensions

Each content type has specific image dimensions for optimal display:

| Content Type     | Dimensions  | Aspect Ratio | Usage                    |
| ---------------- | ----------- | ------------ | ------------------------ |
| **Classes**      | 1200 x 800  | 3:2          | Class background images  |
| **Coaches**      | 400 x 600   | 2:3          | Coach profile photos     |
| **Testimonials** | 200 x 200   | 1:1          | Member profile pictures  |
| **Features**     | 800 x 600   | 4:3          | Feature highlight images |
| **Hero**         | 1920 x 1080 | 16:9         | Hero section backgrounds |

### Image Upload Process

1. User selects image file
2. `uploadImage()` validates file type and size (max 10MB)
3. `browser-image-compression` resizes to target dimensions
4. Image compressed to ~1MB or less
5. Uploaded to Firebase Storage in organized folders
6. Returns public download URL
7. URL saved to Firestore document

## 🚀 Usage Guide

### Setting Up Admin Access

1. **Create Admin User in Firebase Console**:

   - Go to Firebase Console → Authentication
   - Add new user with email/password
   - Note the User UID

2. **Add Admin Role in Firestore**:

   ```javascript
   // In Firestore, create document:
   Collection: users
   Document ID: {USER_UID}
   Data: {
     email: "admin@gritfitness.com",
     role: "admin",
     createdAt: {current timestamp}
   }
   ```

3. **Deploy Security Rules**:
   ```powershell
   firebase deploy --only firestore:rules
   firebase deploy --only storage
   ```

### Managing Classes

1. Navigate to `/admin/classes`
2. Click **"Add Class"** button
3. Upload class image (1200x800px recommended)
4. Fill in details:
   - Class Name (e.g., "HIIT Training")
   - Instructor name
   - Day (e.g., "Monday & Wednesday")
   - Time (e.g., "6:00 AM")
   - Description
5. Click **"Add Class"** to save
6. Edit/Delete existing classes using action buttons

### Managing Coaches

1. Navigate to `/admin/coaches`
2. Click **"Add Coach"** button
3. Upload coach photo (400x600px recommended)
4. Fill in details:
   - Coach Name
   - Specialty (e.g., "Strength & Conditioning")
   - Description (bio/credentials)
5. Click **"Add Coach"** to save

## 🛠️ Development

### Running Locally

```powershell
npm run dev
```

### Building for Production

```powershell
npm run build
```

### Accessing Admin Panel

- **Local**: `http://localhost:5173/admin/login`
- **Production**: `https://yourdomain.com/admin/login`

## 🔧 Maintenance

### Updating Content

All content updates are real-time through the CMS. No code deployment needed.

### Image Storage Management

- Images stored in Firebase Storage under organized folders
- Automatic optimization reduces bandwidth costs
- Old images should be manually deleted when replacing

### Backup

- Firestore has automatic backups
- Export data regularly: Firebase Console → Firestore → Import/Export

## 📊 Firebase Quotas

### Free Tier Limits

- **Storage**: 5GB
- **Downloads**: 1GB/day
- **Firestore Reads**: 50k/day
- **Firestore Writes**: 20k/day

### Recommended Upgrades

- **Blaze Plan**: Pay-as-you-go for production
- Monitor usage in Firebase Console

## 🐛 Troubleshooting

### "Permission Denied" Error

1. Check user has `role: 'admin'` in Firestore
2. Verify security rules are deployed
3. Clear browser cache and re-login

### Image Upload Fails

1. Check file size (<10MB)
2. Verify file is valid image format
3. Check Storage rules are deployed
4. Ensure Firebase Storage is enabled

### Cannot Access Admin Routes

1. Verify user is logged in
2. Check `useAuth()` hook returns `isAdmin: true`
3. Check browser console for errors

## 🔒 Security Best Practices

1. **Never commit Firebase config to public repos** (use `.env`)
2. **Enable 2FA** for admin accounts
3. **Regular security audits** of Firestore/Storage rules
4. **Monitor Firebase Console** for unusual activity
5. **Limit admin accounts** to trusted personnel only

## 📝 Future Enhancements

- [ ] Rich text editor for descriptions
- [ ] Drag-and-drop image ordering
- [ ] Bulk upload functionality
- [ ] Image cropper in-browser
- [ ] Version history/rollback
- [ ] Advanced media library with search
- [ ] Analytics dashboard
- [ ] Email notifications for submissions
- [ ] Multi-language support

## 📞 Support

For issues or questions, contact the development team or refer to:

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Router Documentation](https://reactrouter.com/)
- Project GitHub repository

---

**Last Updated**: October 20, 2025  
**Version**: 1.0.0
