# GRIT Fitness CMS - Quick Setup Guide

## 🚀 Initial Setup (One-Time)

### 1. Firebase Console Setup

#### Enable Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Build** → **Authentication**
4. Click **Get Started**
5. Enable **Email/Password** provider
6. Enable **Google** provider (optional but recommended)

#### Enable Firestore Database

1. Navigate to **Build** → **Firestore Database**
2. Click **Create Database**
3. Choose **Production mode** (we have custom rules)
4. Select your region (closest to Philippines: `asia-southeast1`)

#### Enable Storage

1. Navigate to **Build** → **Storage**
2. Click **Get Started**
3. Choose **Production mode**
4. Use same region as Firestore

### 2. Create Admin User

#### Option A: Via Firebase Console

1. Go to **Authentication** → **Users**
2. Click **Add User**
3. Email: `admin@gritfitness.com` (or your email)
4. Password: Create a strong password
5. Copy the **User UID** (you'll need this next)

#### Option B: Register on Website Then Promote

1. Run the development server: `npm run dev`
2. Sign up with Email/Password at the login page
3. Find your User UID in Firebase Console → Authentication

### 3. Grant Admin Role

1. In Firebase Console, go to **Firestore Database**
2. Click **Start Collection**
3. Collection ID: `users`
4. Click **Next**
5. Document ID: Paste the **User UID** from step 2
6. Add fields:
   ```
   Field: email        Type: string     Value: admin@gritfitness.com
   Field: role         Type: string     Value: admin
   Field: createdAt    Type: timestamp  Value: [current time]
   Field: displayName  Type: string     Value: Admin User (optional)
   ```
7. Click **Save**

### 4. Deploy Security Rules

Open terminal in project directory:

```powershell
# Install Firebase CLI (if not installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in project (if not already done)
firebase init

# Select:
# - Firestore
# - Storage
# - Use existing project
# - Select your GRIT Fitness project

# Deploy security rules
firebase deploy --only firestore:rules
firebase deploy --only storage
```

## ✅ Verification

### Test Admin Login

1. Start dev server: `npm run dev`
2. Navigate to `http://localhost:5173/admin/login`
3. Sign in with admin credentials
4. You should see the CMS Dashboard

### Test CRUD Operations

1. Go to **Manage Classes**
2. Click **Add Class**
3. Upload a test image (1200x800px)
4. Fill in class details
5. Click **Add Class**
6. Verify the class appears in the list
7. Try editing and deleting

## 🔒 Security Checklist

- [ ] Firestore security rules deployed
- [ ] Storage security rules deployed
- [ ] Admin user created with `role: 'admin'`
- [ ] Email/Password authentication enabled
- [ ] Test login/logout flow
- [ ] Verify non-admin users cannot access `/admin`

## 📱 Production Deployment

### Build for Production

```powershell
npm run build
```

### Deploy to Firebase Hosting (Optional)

```powershell
firebase deploy --only hosting
```

### Deploy to Your Own Server

1. Upload contents of `dist/` folder to your web server
2. Configure server for SPA routing (all routes → `index.html`)
3. Set up SSL certificate (required for Firebase Auth)

## 🎨 Customization

### Change Admin Email Domain

Edit `src/pages/admin/Login.tsx`:

```typescript
placeholder = "admin@yourdomain.com";
```

### Modify Image Dimensions

Edit `src/utils/imageUpload.ts`:

```typescript
export const IMAGE_DIMENSIONS = {
  class: { width: 1200, height: 800, aspectRatio: "3:2" },
  // Modify as needed
};
```

### Add More Admin Users

Repeat steps 2-3 for each admin user.

## 🐛 Common Issues

### "Permission Denied" on Firestore

**Solution**: Deploy security rules with `firebase deploy --only firestore:rules`

### "User is not admin" after login

**Solution**: Check Firestore `users/{uid}` document has `role: 'admin'` field

### Images not uploading

**Solution**: Deploy storage rules with `firebase deploy --only storage`

### Routing not working on production

**Solution**: Configure your server for SPA routing (all requests → `index.html`)

## 📞 Next Steps

1. ✅ Complete this setup guide
2. ✅ Test all CMS features
3. ✅ Add real gym content (classes, coaches)
4. ✅ Configure backup strategy
5. ✅ Monitor Firebase quotas
6. ✅ Train staff on CMS usage

## 📚 Documentation

- [Full CMS Documentation](./CMS_IMPLEMENTATION.md)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Router Docs](https://reactrouter.com/)

---

**Setup complete!** You're ready to manage your gym's website content. 💪
