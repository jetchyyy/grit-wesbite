import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, Loader } from 'lucide-react';
import { uploadImage, type ImageType, IMAGE_DIMENSIONS } from '../../utils/imageUpload';

interface ImageUploadDropzoneProps {
  onUploadComplete: (urls: string[]) => void;
  imageType: ImageType;
  multiple?: boolean;
  maxFiles?: number;
}

export default function ImageUploadDropzone({
  onUploadComplete,
  imageType,
  multiple = false,
  maxFiles = 1,
}: ImageUploadDropzoneProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ file: File; preview: string }[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const dimensions = IMAGE_DIMENSIONS[imageType];

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      // Create previews
      const filesWithPreview = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setUploadedFiles((prev) => [...prev, ...filesWithPreview]);

      // Upload files
      setUploading(true);
      const uploadPromises = acceptedFiles.map(async (file) => {
        try {
          setUploadProgress((prev) => ({ ...prev, [file.name]: 25 }));
          
          const url = await uploadImage({
            file,
            folder: imageType + 's',
            imageType,
          });

          setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));
          return url;
        } catch (error: any) {
          console.error(`Failed to upload ${file.name}:`, error);
          alert(`Failed to upload ${file.name}: ${error.message}`);
          return null;
        }
      });

      const urls = (await Promise.all(uploadPromises)).filter((url): url is string => url !== null);
      
      if (urls.length > 0) {
        onUploadComplete(urls);
      }

      setUploading(false);
      setUploadProgress({});
    },
    [imageType, onUploadComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
    multiple,
    maxFiles,
    disabled: uploading,
  });

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer ${
          isDragActive
            ? 'border-[#BF9B30] bg-[#BF9B30]/10'
            : 'border-[#BF9B30]/30 hover:border-[#BF9B30]/60 hover:bg-[#BF9B30]/5'
        } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4">
          {uploading ? (
            <>
              <Loader className="w-12 h-12 text-[#BF9B30] animate-spin" />
              <p className="text-[#BF9B30] font-semibold">Uploading images...</p>
            </>
          ) : (
            <>
              <div className="p-4 bg-[#BF9B30]/20 rounded-full">
                <Upload className="w-8 h-8 text-[#BF9B30]" />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold mb-1">
                  {isDragActive ? 'Drop images here' : 'Drag & drop images here'}
                </p>
                <p className="text-[#D8C08E] text-sm">
                  or click to browse • {multiple ? `Up to ${maxFiles} files` : '1 file'} • Max 10MB each
                </p>
                <p className="text-[#BF9B30] text-xs mt-2">
                  Recommended: {dimensions.width}x{dimensions.height}px ({dimensions.aspectRatio})
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Preview Grid */}
      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {uploadedFiles.map((fileObj, index) => (
            <div
              key={index}
              className="relative group bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl overflow-hidden"
            >
              <img
                src={fileObj.preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover"
                onLoad={() => URL.revokeObjectURL(fileObj.preview)}
              />
              
              {/* Upload Progress */}
              {uploadProgress[fileObj.file.name] !== undefined && uploadProgress[fileObj.file.name] < 100 && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <div className="text-center">
                    <Loader className="w-6 h-6 text-[#BF9B30] animate-spin mx-auto mb-2" />
                    <p className="text-white text-xs">{uploadProgress[fileObj.file.name]}%</p>
                  </div>
                </div>
              )}

              {/* Remove Button */}
              {!uploading && (
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              )}

              {/* File Name */}
              <div className="p-2 bg-[#0A0A1F]/90 backdrop-blur-sm">
                <p className="text-[#D8C08E] text-xs truncate">{fileObj.file.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      <div className="flex items-start gap-2 p-3 bg-[#BF9B30]/10 border border-[#BF9B30]/30 rounded-lg">
        <ImageIcon className="w-5 h-5 text-[#BF9B30] flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="text-white font-semibold mb-1">Image Guidelines</p>
          <ul className="text-[#D8C08E] text-xs space-y-1">
            <li>• Images will be automatically resized to {dimensions.width}x{dimensions.height}px</li>
            <li>• Compressed to ~1MB or less for optimal performance</li>
            <li>• Supported formats: JPG, PNG, WebP</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
