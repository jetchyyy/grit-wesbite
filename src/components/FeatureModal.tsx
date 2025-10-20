import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    icon: any;
    title: string;
    description: string;
    image: string;
    alt: string;
    fullDescription: string;
    gallery: string[];
    benefits: string[];
  } | null;
}

export default function FeatureModal({ isOpen, onClose, feature }: FeatureModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !feature) return null;

  const Icon = feature.icon;
  const allImages = [feature.image, ...feature.gallery];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0A0A1F]/95 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
  <div className="relative bg-[#0A0A1F] border-2 border-[#BF9B30]/40 rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-[#BF9B30]/20 scrollbar-thin scrollbar-thumb-[#BF9B30]/60 scrollbar-track-[#0A0A1F]/80 scrollbar-corner-[#BF9B30]/30">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 bg-[#0A0A1F]/80 backdrop-blur-sm border border-[#BF9B30]/50 rounded-full p-3 hover:bg-[#BF9B30] hover:border-[#BF9B30] transition-all duration-300 group"
        >
          <X className="w-6 h-6 text-[#BF9B30] group-hover:text-[#0A0A1F]" />
        </button>

        {/* Hero Section */}
        <div className="relative h-[400px] overflow-hidden rounded-t-3xl">
          {/* Main Image with Navigation */}
          <div className="relative h-full">
            <img
              src={allImages[currentImageIndex]}
              alt={`${feature.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A1F] via-[#0A0A1F]/50 to-transparent"></div>

            {/* Image Navigation */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#0A0A1F]/80 backdrop-blur-sm border border-[#BF9B30]/50 rounded-full p-3 hover:bg-[#BF9B30] transition-all duration-300 group"
                >
                  <ChevronLeft className="w-6 h-6 text-[#BF9B30] group-hover:text-[#0A0A1F]" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#0A0A1F]/80 backdrop-blur-sm border border-[#BF9B30]/50 rounded-full p-3 hover:bg-[#BF9B30] transition-all duration-300 group"
                >
                  <ChevronRight className="w-6 h-6 text-[#BF9B30] group-hover:text-[#0A0A1F]" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#0A0A1F]/80 backdrop-blur-sm border border-[#BF9B30]/50 rounded-full px-4 py-2">
                  <span className="text-white font-semibold">
                    {currentImageIndex + 1} / {allImages.length}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Feature Icon & Title Overlay */}
          <div className="absolute bottom-6 left-6 flex items-center gap-4">
            <div className="bg-[#BF9B30] rounded-2xl p-4 shadow-xl">
              <Icon className="w-8 h-8 text-[#0A0A1F]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              {feature.title}
            </h2>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12">
          {/* Description */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-[#BF9B30] mb-4">Overview</h3>
            <p className="text-[#D8C08E] text-lg leading-relaxed">
              {feature.fullDescription}
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-[#BF9B30] mb-6">Key Benefits</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {feature.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-[#0A0A1F]/50 border border-[#BF9B30]/20 rounded-xl p-4 hover:border-[#BF9B30]/50 transition-all duration-300"
                >
                  <div className="bg-[#BF9B30]/20 rounded-full p-1 mt-1">
                    <svg
                      className="w-4 h-4 text-[#BF9B30]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-white leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery Thumbnails */}
          {allImages.length > 1 && (
            <div>
              <h3 className="text-2xl font-bold text-[#BF9B30] mb-6">Gallery</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      currentImageIndex === idx
                        ? 'border-[#BF9B30] scale-95'
                        : 'border-[#BF9B30]/20 hover:border-[#BF9B30]/60'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${feature.title} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {currentImageIndex === idx && (
                      <div className="absolute inset-0 bg-[#BF9B30]/20"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA Button */}
          <div className="mt-10 text-center">
            <a
              href="#pricing"
              onClick={onClose}
              className="inline-block bg-[#BF9B30] text-[#0A0A1F] px-10 py-4 rounded-xl hover:bg-[#D8C08E] transition-all duration-300 font-bold text-lg shadow-lg shadow-[#BF9B30]/30 hover:shadow-xl hover:shadow-[#BF9B30]/50 hover:-translate-y-1"
            >
              Start Your Journey
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
