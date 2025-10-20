# Coaches CMS - Complete Implementation

**Status:** ✅ Complete  
**Date:** October 21, 2025

## Overview

The Coaches section is now fully CMS-driven with all fields editable through the admin dashboard, including rich text descriptions, icon selection, and gallery images.

---

## Available Fields

### Basic Information

- **Name** (string, required): Coach's full name
- **Specialty** (string, required): Coach's area of expertise (e.g., "Strength & Conditioning")
- **Image** (string URL, required): Main profile photo displayed on landing page and modal

### Visual Elements

- **Icon** (string, required): Icon displayed on coach card badge
  - Options: Award, Target, Heart, Zap
  - Default: Award (Trophy)
  - Icons from lucide-react library

### Rich Content

- **Description** (HTML string, required): Coach bio, qualifications, achievements

  - Created using TipTap rich text editor
  - Supports: Bold, Italic, Underline, Headings, Lists, Links, Text Alignment
  - Displayed in CoachModal as formatted HTML
  - Card preview strips HTML tags and shows first 100 characters

- **Gallery** (string array, optional): Additional training/action photos
  - Accepts 1-5 images
  - Displayed in CoachModal gallery section
  - Fallback to placeholder images if not provided

### Professional Information

- **Experience** (string, optional): Years of experience
  - Example: "8+ Years Experience", "10 Years Professional Trainer"
  - Default: "8+ Years Experience" if not provided
  - Displayed in CoachModal with certification badge

### Social Media

- **Instagram** (string, optional): Instagram handle or profile
  - Example: "@coachdan", "coachdan"
  - Displayed with purple/pink Instagram gradient badge
- **Facebook** (string, optional): Facebook username or URL
  - Example: "@coachdan", "facebook.com/coachdan"
  - Displayed with blue Facebook gradient badge
- **Twitter** (string, optional): Twitter/X handle
  - Example: "@coachdan"
  - Displayed with sky-blue Twitter gradient badge

---

## Data Structure

### TypeScript Interface

```typescript
interface Coach {
  id?: string;
  name: string;
  specialty: string;
  description: string;
  image: string;
  iconName: string;
  gallery?: string[];
  experience?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
}
```

### Firestore Document Example

```json
{
  "name": "Coach Dan",
  "specialty": "Strength",
  "description": "<p><strong>Strength conditioning</strong> and HIIT specialist</p>",
  "image": "https://firebasestorage.googleapis.com/...",
  "iconName": "Zap",
  "experience": "10+ Years Experience",
  "instagram": "@coachdan",
  "facebook": "coachdan.fitness",
  "twitter": "@coachdan",
  "gallery": [
    "https://firebasestorage.googleapis.com/.../1.jpg",
    "https://firebasestorage.googleapis.com/.../2.jpg",
    "https://firebasestorage.googleapis.com/.../3.jpg"
  ]
}
```

---

## Frontend Display

### Coaches.tsx (Landing Page)

- Fetches all coaches from Firestore `coaches` collection
- Maps `iconName` string to actual lucide-react icon component
- Displays in 4-column responsive grid
- Each card shows:
  - Profile image with gradient overlay
  - Icon badge (top-right corner)
  - Name and specialty
  - First 100 characters of description (HTML tags stripped)
  - Hover effects with scale and glow
- Loading state with spinner
- Empty state message

### CoachModal.tsx (Detail View)

- Triggered when coach card is clicked
- Displays full coach information:
  - Large profile image (left side)
  - Name, specialty badge, and full HTML description
  - Experience badge (customizable or default "8+ Years")
  - Social media links (Instagram, Facebook, Twitter - if provided)
  - "Book a Session" CTA button
  - Gallery section with 3-column grid
  - Hover effects on gallery images
- **HTML Rendering:** Uses `dangerouslySetInnerHTML` with Tailwind prose classes
- **Fallback:** Shows default text if description is empty
- **Social Media:** Only displays social links that have been filled in

---

## Admin Interface (ManageCoaches.tsx)

### Form Fields

1. **Coach Photo** (required)

   - Single image upload via drag-and-drop
   - Preview with remove button
   - Uploaded to Firebase Storage `coaches/` folder
   - Automatically tracked in Media Library

2. **Coach Name** (required)

   - Text input
   - Example: "Coach SKBD"

3. **Specialty** (required)

   - Text input
   - Placeholder: "e.g., Strength & Conditioning"

4. **Icon** (required)

   - Dropdown selector with 4 options:
     - Award (Trophy) - Default
     - Target (Bullseye)
     - Heart
     - Zap (Lightning)
   - Controls which icon appears on coach card

5. **Description** (required)

   - Rich text editor (TipTap)
   - Toolbar: Bold, Italic, Underline, Headings, Lists, Alignment, Links
   - Placeholder: "Enter coach bio and qualifications..."
   - Saves as HTML string

6. **Experience** (optional)

   - Text input
   - Placeholder: "e.g., 8+ Years Experience"
   - Default: "8+ Years Experience" if left empty

7. **Social Media** (optional)

   - Three text inputs in a row: Instagram, Facebook, Twitter
   - Instagram placeholder: "@username"
   - Facebook placeholder: "@username or URL"
   - Twitter placeholder: "@username"
   - Only displayed in modal if filled in

8. **Gallery Images** (optional)
   - Multi-image upload (up to 5 images)
   - Shows preview grid (3 columns)
   - Remove button per image (X icon on hover)
   - Drag-and-drop or click to upload
   - Uploaded to Firebase Storage `coaches/` folder

### Actions

- **Add Coach:** Opens modal with empty form
- **Edit Coach:** Pre-fills form with existing data
- **Delete Coach:** Confirms, then deletes from Firestore and Storage
- **Save:** Validates required fields, saves to Firestore

---

## User Workflow

### Creating a New Coach

1. Navigate to `/admin/coaches`
2. Click "Add Coach" button
3. Upload profile photo (drag-and-drop or click)
4. Enter coach name and specialty
5. Select an icon from dropdown
6. Write coach bio using rich text editor (format as needed)
7. (Optional) Upload 1-5 gallery images
8. Click "Add Coach"
9. Coach appears on landing page immediately

### Editing an Existing Coach

1. Navigate to `/admin/coaches`
2. Click "Edit" on coach card
3. Modify any fields (name, specialty, icon, description, images)
4. Add or remove gallery images as needed
5. Click "Update Coach"
6. Changes reflect on landing page immediately

### Managing Gallery

- **Add Images:** Use drag-and-drop area to upload (max 5 total)
- **Remove Images:** Hover over image thumbnail, click X button
- **Order:** Images display in the order they were uploaded
- Gallery is optional - falls back to placeholder images if empty

---

## Data Flow

```
Admin Dashboard (ManageCoaches.tsx)
  ↓
Upload Image → Firebase Storage (coaches/)
  ↓
Save Metadata → Firestore (media collection)
  ↓
Save Coach → Firestore (coaches collection)
  ↓
Landing Page (Coaches.tsx) → Fetch & Display
  ↓
User Click → Open Modal (CoachModal.tsx)
  ↓
Display HTML Description + Gallery
```

---

## Troubleshooting

### Description Showing `<p></p>` Tags

**Cause:** Description rendered as plain text instead of HTML  
**Solution:** ✅ Fixed - CoachModal now uses `dangerouslySetInnerHTML`  
**Verification:** Check CoachModal.tsx lines with `dangerouslySetInnerHTML`

### Gallery Not Displaying

**Cause:** Gallery field is optional and may be empty  
**Solution:** Modal automatically falls back to placeholder images from Unsplash  
**Action:** Upload gallery images in admin panel to replace placeholders

### Icon Not Showing Correctly

**Cause:** Missing `iconName` field in Firestore document  
**Solution:** Edit coach in admin panel, select icon from dropdown, save  
**Fallback:** Coaches.tsx defaults to `Award` icon if iconName is missing

### Old Coaches Missing New Fields

**Cause:** Coaches created before icon/gallery fields were added  
**Solution:**

- Edit each coach in admin panel
- Select an icon from dropdown
- Optionally add gallery images
- Save changes

**Alternative:** Manually add fields in Firebase Console:

```javascript
{
  iconName: "Award",
  gallery: []
}
```

---

## Future Enhancements

### Potential Features

- [ ] Reorderable gallery (drag-and-drop)
- [ ] Image captions for gallery
- [ ] Video embed support
- [ ] Coach availability calendar
- [ ] Booking integration
- [ ] Certifications/badges display
- [ ] Social media links (beyond Instagram)
- [ ] Client testimonials per coach
- [ ] Specialties as tags (filterable)

### Performance Optimizations

- [ ] Image lazy loading (already implemented)
- [ ] Infinite scroll for large coach lists
- [ ] Image CDN integration
- [ ] Progressive image loading

---

## Completion Checklist

- [x] Add `iconName` field to Coach interface
- [x] Add `gallery` field to Coach interface
- [x] Initialize fields in formData
- [x] Add icon dropdown to admin form
- [x] Add gallery upload section to admin form
- [x] Implement gallery handlers (upload, remove)
- [x] Update CoachModal to render HTML description
- [x] Add fallback for empty description
- [x] Fix `<p></p>` bug with dangerouslySetInnerHTML
- [x] Apply Tailwind prose classes for HTML styling
- [x] Test icon selection in admin
- [x] Test gallery upload in admin
- [x] Test HTML description rendering in modal
- [x] Verify no TypeScript errors
- [x] Create documentation

---

## Related Files

### Frontend Components

- `src/components/Coaches.tsx` - Landing page coach grid
- `src/components/CoachModal.tsx` - Coach detail modal

### Admin Pages

- `src/pages/admin/ManageCoaches.tsx` - Coach CRUD interface

### Shared Components

- `src/components/admin/RichTextEditor.tsx` - TipTap editor
- `src/components/admin/ImageUploadDropzone.tsx` - Drag-drop upload

### Utilities

- `src/utils/imageUpload.ts` - Image optimization and Firebase upload

### Configuration

- `firestore.rules` - Database security rules
- `storage.rules` - File storage security rules

---

**Implementation Status:** ✅ All fields implemented and functional  
**Documentation Status:** ✅ Complete  
**Testing Status:** ✅ No errors found  
**Ready for Production:** ✅ Yes
