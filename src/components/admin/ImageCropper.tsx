import { useState, useRef } from 'react';
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { X, Crop as CropIcon, Check } from 'lucide-react';
import { type ImageType, IMAGE_DIMENSIONS } from '../../utils/imageUpload';

interface ImageCropperProps {
  imageSrc: string;
  imageType: ImageType;
  onCropComplete: (croppedImageBlob: Blob) => void;
  onCancel: () => void;
}

export default function ImageCropper({ imageSrc, imageType, onCropComplete, onCancel }: ImageCropperProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const dimensions = IMAGE_DIMENSIONS[imageType];
  const aspectRatio = dimensions.width / dimensions.height;

  const getCroppedImg = async (): Promise<Blob | null> => {
    if (!completedCrop || !imgRef.current) {
      return null;
    }

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return null;
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.95);
    });
  };

  const handleCropConfirm = async () => {
    const croppedBlob = await getCroppedImg();
    if (croppedBlob) {
      onCropComplete(croppedBlob);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#BF9B30]/30 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white mb-1">Crop Image</h2>
            <p className="text-[#D8C08E] text-sm">
              Target: {dimensions.width}x{dimensions.height}px ({dimensions.aspectRatio})
            </p>
          </div>
          <button
            onClick={onCancel}
            className="text-[#D8C08E] hover:text-[#BF9B30] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Crop Area */}
        <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-[#1A1A2F]">
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspectRatio}
            className="max-w-full"
          >
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop preview"
              className="max-w-full max-h-[60vh] object-contain"
            />
          </ReactCrop>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-[#BF9B30]/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#D8C08E] text-sm">
            <CropIcon className="w-4 h-4" />
            <span>Drag to adjust crop area</span>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-[#BF9B30]/30 text-[#D8C08E] rounded-xl font-semibold hover:border-[#BF9B30] transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCropConfirm}
              disabled={!completedCrop}
              className="flex items-center gap-2 bg-[#BF9B30] text-[#0A0A1F] px-6 py-3 rounded-xl font-bold hover:bg-[#D8C08E] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="w-5 h-5" />
              Apply Crop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
