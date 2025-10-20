import imageCompression from 'browser-image-compression';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '../firebase/config';

// Image dimension configurations for different content types
export const IMAGE_DIMENSIONS = {
  class: { width: 1200, height: 800, aspectRatio: '3:2' },
  coach: { width: 400, height: 600, aspectRatio: '2:3' },
  testimonial: { width: 200, height: 200, aspectRatio: '1:1' },
  feature: { width: 800, height: 600, aspectRatio: '4:3' },
  hero: { width: 1920, height: 1080, aspectRatio: '16:9' },
} as const;

export type ImageType = keyof typeof IMAGE_DIMENSIONS;

interface UploadOptions {
  file: File;
  folder: string; // e.g., 'classes', 'coaches', 'testimonials'
  imageType: ImageType;
  filename?: string;
  saveToMediaLibrary?: boolean; // Optional: save metadata to Firestore media collection
}

/**
 * Resize and compress an image to specified dimensions
 */
async function resizeImage(
  file: File,
  targetWidth: number,
  targetHeight: number
): Promise<File> {
  const options = {
    maxSizeMB: 1, // Max file size 1MB
    maxWidthOrHeight: Math.max(targetWidth, targetHeight),
    useWebWorker: true,
    fileType: 'image/jpeg' as const,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw new Error('Failed to optimize image');
  }
}

/**
 * Validate image aspect ratio (exported for external use)
 */
export function validateAspectRatio(
  img: HTMLImageElement,
  expectedRatio: string,
  tolerance: number = 0.1
): boolean {
  const [widthRatio, heightRatio] = expectedRatio.split(':').map(Number);
  const expectedAspect = widthRatio / heightRatio;
  const actualAspect = img.width / img.height;
  
  return Math.abs(expectedAspect - actualAspect) <= tolerance;
}

/**
 * Get image dimensions from file
 */
function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.width, height: img.height });
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    
    img.src = url;
  });
}

/**
 * Upload image to Firebase Storage with optimization
 * @returns Download URL of the uploaded image
 */
export async function uploadImage({
  file,
  folder,
  imageType,
  filename,
  saveToMediaLibrary = true,
}: UploadOptions): Promise<string> {
  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image');
  }

  // Validate file size (max 10MB before compression)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error('Image size must be less than 10MB');
  }

  // Get target dimensions
  const dimensions = IMAGE_DIMENSIONS[imageType];
  
  // Check image dimensions (optional warning)
  const { width, height } = await getImageDimensions(file);
  console.log(`Original image: ${width}x${height}`);
  console.log(`Target dimensions: ${dimensions.width}x${dimensions.height} (${dimensions.aspectRatio})`);

  // Resize and compress image
  const optimizedFile = await resizeImage(file, dimensions.width, dimensions.height);

  // Generate filename
  const timestamp = Date.now();
  const name = filename || `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
  const storagePath = `${folder}/${name}`;

  // Upload to Firebase Storage
  const storageRef = ref(storage, storagePath);
  
  try {
    await uploadBytes(storageRef, optimizedFile);
    const downloadURL = await getDownloadURL(storageRef);
    console.log(`✅ Image uploaded successfully: ${storagePath}`);
    
    // Save metadata to Firestore media collection
    if (saveToMediaLibrary) {
      try {
        await addDoc(collection(db, 'media'), {
          url: downloadURL,
          name: name,
          type: imageType,
          size: optimizedFile.size,
          uploadedAt: serverTimestamp(),
          folder: folder
        });
        console.log(`✅ Media metadata saved to Firestore`);
      } catch (error) {
        console.error('Error saving media metadata:', error);
        // Don't throw - image is uploaded, metadata save is non-critical
      }
    }
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image to storage');
  }
}

/**
 * Delete image from Firebase Storage
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    // Extract storage path from URL
    const url = new URL(imageUrl);
    const pathMatch = url.pathname.match(/\/o\/(.+)\?/);
    
    if (!pathMatch) {
      throw new Error('Invalid storage URL');
    }
    
    const storagePath = decodeURIComponent(pathMatch[1]);
    const storageRef = ref(storage, storagePath);
    
    await deleteObject(storageRef);
    console.log(`✅ Image deleted successfully: ${storagePath}`);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image from storage');
  }
}

/**
 * Upload multiple images
 */
export async function uploadMultipleImages(
  files: File[],
  folder: string,
  imageType: ImageType
): Promise<string[]> {
  const uploadPromises = files.map((file) =>
    uploadImage({ file, folder, imageType })
  );
  
  return Promise.all(uploadPromises);
}
