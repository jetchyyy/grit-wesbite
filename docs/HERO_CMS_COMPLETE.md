# Hero Section CMS - Complete Implementation

**Status:** ✅ Complete  
**Date:** October 21, 2025

## Overview

The Hero Section (main landing page header) is now fully CMS-driven with all content editable through the admin dashboard, including background image, main headline, tagline, featured testimonial, and statistics.

---

## Available Fields

### Background

- **Background Image** (string URL, required): Full-screen hero background
  - Recommended size: 1920x1080 or larger
  - Supports various aspect ratios
  - Upload via drag-and-drop to Firebase Storage

### Main Headline (3-line structure)

- **First Line** (string, required): Main word in white
  - Example: "SWEAT"
  - Displays at largest size (6xl-10rem responsive)
- **Second Line - Gradient** (string, required): Highlight word with gold gradient
  - Example: "GRIND"
  - Gradient: from-[#BF9B30] to-[#D8C08E]
- **Third Line - Solid Gold** (string, required): Final word in solid gold
  - Example: "GRIT"
  - Color: #BF9B30

### Tagline

- **Tagline** (string, required): Subheading description
  - Example: "A judgment-free fitness community..."
  - Displays below headline in lighter gold (#D8C08E)
  - Responsive font size (xl-3xl)

### Featured Testimonial (Desktop/Right Side)

- **Quote** (string, required): Member testimonial text
  - Displays in italic style with quotation marks
  - Keep concise (1-2 sentences for best display)
- **Member Name** (string, required): Testimonial author
  - Example: "Jetch Merald"
- **Achievement** (string, required): Member's success metrics
  - Example: "Lost 25kg • 2 Years"
  - Use bullet • to separate multiple stats
- **Member Photo** (string URL, required): Profile image
  - Circular display (48x48px)
  - Recommended: Square image, 150x150 or larger
- **Rating** (number, required): Star rating 1-5
  - Click stars to set rating
  - Displays filled gold stars

### Statistics (Bottom Cards)

- **Stat 1:** Value + Label
  - Default: "500+" Members
- **Stat 2:** Value + Label
  - Default: "8" Weekly Classes
- **Stat 3:** Value + Label
  - Default: "5★" Rating

All stats display in both desktop (large card) and mobile (compact bar) layouts.

---

## Data Structure

### TypeScript Interface

```typescript
interface HeroContent {
  backgroundImage: string;
  mainHeading: string;
  highlightWord1: string;
  highlightWord2: string;
  tagline: string;
  testimonialQuote: string;
  testimonialName: string;
  testimonialAchievement: string;
  testimonialImage: string;
  testimonialRating: number;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
}
```

### Firestore Document

- **Collection:** `siteContent`
- **Document ID:** `hero`

Example:

```json
{
  "backgroundImage": "https://firebasestorage.googleapis.com/.../hero.jpg",
  "mainHeading": "SWEAT",
  "highlightWord1": "GRIND",
  "highlightWord2": "GRIT",
  "tagline": "A judgment-free fitness community that inspires people to live a healthier, more fulfilling lifestyle",
  "testimonialQuote": "GRIT completely transformed my fitness journey. The trainers are incredible and the community is so supportive!",
  "testimonialName": "Jetch Merald",
  "testimonialAchievement": "Lost 25kg • 2 Years",
  "testimonialImage": "https://firebasestorage.googleapis.com/.../member.jpg",
  "testimonialRating": 5,
  "stat1Value": "500+",
  "stat1Label": "Members",
  "stat2Value": "8",
  "stat2Label": "Weekly Classes",
  "stat3Value": "5★",
  "stat3Label": "Rating"
}
```

---

## Frontend Display

### Hero.tsx (Landing Page)

- Fetches content from Firestore `siteContent/hero` document
- Falls back to default values if document doesn't exist
- Responsive layout:
  - **Mobile:** Main heading, tagline, CTA button, stats bar at bottom
  - **Desktop:** Main content left, testimonial card + stats right
- Background image with gradient overlays
- Smooth animations and hover effects
- Loading happens on component mount
- No loading spinner (shows defaults immediately)

### Layout Structure

```
┌─────────────────────────────────────────────────────┐
│  Background Image (full screen)                     │
│  ┌──────────────────┐      ┌─────────────────┐    │
│  │  Main Headline   │      │  Testimonial    │    │
│  │  (3 lines)       │      │  Card           │    │
│  │  Tagline         │      │  + Stars        │    │
│  │  Join NOW Button │      │                 │    │
│  └──────────────────┘      │  Stats Card     │    │
│                             │  (3 stats)      │    │
│                             └─────────────────┘    │
└─────────────────────────────────────────────────────┘
```

---

## Admin Interface (ManageHero.tsx)

### Form Sections

1. **Background Image**

   - Single image upload via drag-and-drop
   - Preview with remove button
   - Uploaded to Firebase Storage `hero/` folder
   - Full-width preview (w-full h-64)

2. **Main Heading** (3 inputs)

   - First Line input (white text preview)
   - Second Line input (gradient gold preview)
   - Third Line input (solid gold preview)
   - Large text inputs (text-2xl font-black)

3. **Tagline**

   - Textarea for longer text
   - Preview shows in tan color (#D8C08E)
   - Min height: 100px

4. **Featured Testimonial** (5 fields)

   - Quote (textarea, 100px min height)
   - Member Name (text input)
   - Achievement (text input)
   - Member Photo (image upload, circular preview 96x96)
   - Rating (clickable 5-star selector)

5. **Statistics** (6 fields - 3 stats)
   - Each stat has:
     - Value input (large gold text preview)
     - Label input (white text)
   - Grid layout (3 columns on desktop)

### Save Behavior

- Uses Firestore `setDoc` to upsert document
- Document ID is always "hero" (single hero section)
- All fields required except optional removes
- Success/error alerts after save
- No page reload needed

---

## User Workflow

### Initial Setup (First Time)

1. Navigate to `/admin/hero`
2. Default values are pre-filled
3. Upload new background image (recommended)
4. Customize headline words to match brand
5. Update tagline for your gym
6. Replace testimonial with real member
7. Upload real member photo
8. Update statistics to match your gym
9. Click "Save Hero Section"
10. Visit homepage to see changes

### Updating Content

1. Navigate to `/admin/hero`
2. Form loads with current content
3. Modify any fields as needed
4. Click "Save Hero Section"
5. Changes appear on homepage immediately

### Changing Background Image

1. Click "Remove" on current image
2. Drag-and-drop new image or click to browse
3. Image uploads to Firebase Storage
4. Preview shows immediately
5. Save to apply

### Updating Testimonial

1. Edit quote text
2. Change member name
3. Update achievement/stats
4. Click "Remove" on photo, upload new one
5. Adjust star rating if needed
6. Save changes

### Updating Stats

1. Edit stat values (e.g., "600+" members)
2. Edit stat labels (e.g., "Active Members")
3. Stats appear in both desktop and mobile views
4. Save changes

---

## Data Flow

```
Admin Dashboard (ManageHero.tsx)
  ↓
Upload Images → Firebase Storage (hero/, testimonials/)
  ↓
Save All Content → Firestore (siteContent/hero document)
  ↓
Landing Page (Hero.tsx) → Fetch on Mount
  ↓
Display Hero Section with Fetched Content
```

---

## Responsive Behavior

### Desktop (lg and up)

- Main content positioned left
- Testimonial + stats positioned bottom-right
- Large typography (up to 10rem)
- Full testimonial card with quote, member info, stars
- Large stats card below testimonial

### Mobile

- Main content centered
- Testimonial hidden (too much for mobile)
- Compact stats bar at bottom
- Smaller typography (6xl-8xl)
- Stacked layout

---

## Security

### Firestore Rules

```javascript
match /siteContent/{contentId} {
  allow read: if true;  // Public can view
  allow create, update, delete: if isAdmin();  // Admins only
}
```

### Storage Rules

```javascript
match /hero/{allPaths=**} {
  allow read: if true;  // Public can view images
  allow write: if isAdmin();  // Only admins can upload
}
```

---

## Best Practices

### Image Guidelines

- **Background Image:**

  - Resolution: 1920x1080 minimum (2560x1440 recommended)
  - Format: JPG (smaller file size for backgrounds)
  - Optimize before upload (keep under 500KB if possible)
  - Choose images with clear subject matter
  - Avoid busy backgrounds (text needs to be readable)

- **Member Photo:**
  - Resolution: 150x150 minimum (300x300 recommended)
  - Format: JPG or PNG
  - Square aspect ratio (will be cropped to circle)
  - Well-lit, clear face
  - Keep under 100KB

### Text Guidelines

- **Headline:**

  - Keep words short and impactful (1 word per line ideal)
  - Use ALL CAPS for consistency with brand
  - 3-line structure works best for balance

- **Tagline:**

  - 1-2 sentences maximum
  - Clearly communicate value proposition
  - Keep under 150 characters for mobile

- **Testimonial Quote:**

  - 1-2 sentences for readability
  - Keep under 200 characters
  - Use authentic member voice
  - Focus on transformation/results

- **Statistics:**
  - Use + or ★ symbols for visual interest
  - Keep values short (3-4 characters ideal)
  - Keep labels concise (1-2 words)

---

## Troubleshooting

### Content Not Displaying

**Cause:** Hero document doesn't exist in Firestore  
**Solution:** Navigate to `/admin/hero` and save (creates document with current form values)  
**Fallback:** Component shows default values if document missing

### Background Image Not Loading

**Cause:** Image URL invalid or Storage permissions incorrect  
**Solution:** Re-upload image via admin panel, check Storage rules  
**Test:** Copy image URL and open in new tab

### Testimonial Not Showing

**Cause:** Hidden on mobile by design  
**Solution:** This is intentional - only visible on desktop (lg+)  
**Verify:** Test on desktop browser or increase browser width

### Stats Different on Mobile

**Cause:** Mobile shows different stat values  
**Solution:** This is a bug! Mobile stats use same data now (both read from `content` state)  
**Fix:** Already implemented in current code

### Changes Not Saving

**Cause:** Firestore rules not deployed or user not admin  
**Solution:** Deploy Firestore rules, verify user has admin role in `users/{uid}` document  
**Test:** Check browser console for permission errors

---

## Future Enhancements

### Potential Features

- [ ] Multiple hero slides/carousel
- [ ] Video background support
- [ ] Animated text effects
- [ ] Multiple testimonials rotation
- [ ] A/B testing different headlines
- [ ] Scheduled content changes
- [ ] Analytics tracking (CTA clicks)
- [ ] Mobile-specific testimonial (separate field)

### Performance Optimizations

- [ ] WebP image format support
- [ ] Responsive images (srcset)
- [ ] Lazy load below-fold content
- [ ] Preload critical hero image

---

## Completion Checklist

- [x] Create ManageHero.tsx admin page
- [x] Add all content fields (background, headline, tagline, testimonial, stats)
- [x] Implement image uploads (background + member photo)
- [x] Add star rating selector
- [x] Update Hero.tsx to fetch from Firestore
- [x] Map all content fields to display
- [x] Add fallback to default values
- [x] Add route to Dashboard navigation
- [x] Add route to App.tsx
- [x] Update Firestore rules for siteContent collection
- [x] Verify Storage rules for hero folder
- [x] Test all fields save correctly
- [x] Verify responsive layouts
- [x] Test image uploads
- [x] Verify no TypeScript errors
- [x] Create documentation

---

## Related Files

### Frontend Components

- `src/components/Hero.tsx` - Landing page hero section

### Admin Pages

- `src/pages/admin/ManageHero.tsx` - Hero content editor

### Shared Components

- `src/components/admin/ImageUploadDropzone.tsx` - Drag-drop upload

### Routing

- `src/App.tsx` - Hero route configuration
- `src/pages/admin/Dashboard.tsx` - Admin navigation

### Utilities

- `src/utils/imageUpload.ts` - Image optimization and Firebase upload

### Configuration

- `firestore.rules` - Database security rules (siteContent)
- `storage.rules` - File storage security rules (hero, testimonials)

---

**Implementation Status:** ✅ All features implemented and functional  
**Documentation Status:** ✅ Complete  
**Testing Status:** ✅ No errors found  
**Ready for Production:** ✅ Yes (after deploying rules and uploading first hero content)

---

## Quick Reference

**Admin URL:** `/admin/hero`  
**Firestore Path:** `siteContent/hero`  
**Storage Folders:** `hero/`, `testimonials/`  
**Document Type:** Single document (not a collection)  
**Update Method:** `setDoc` (upsert)  
**Public Access:** Read-only  
**Admin Access:** Full CRUD
