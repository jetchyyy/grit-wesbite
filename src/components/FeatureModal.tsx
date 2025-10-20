import { X, ChevronLeft, ChevronRight, Zap, Users, Trophy, Heart, Dumbbell, Target } from 'lucide-react';
import { useState, useEffect, memo } from 'react';

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    iconName: string;
    title: string;
    description: string;
    image: string;
    fullDescription: string;
    gallery?: string[];
    benefits: string[];
  } | null;
}

const FeatureModal = memo(function FeatureModal({ isOpen, onClose, feature }: FeatureModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Icon mapping
  const iconMap: any = {
    Zap,
    Users,
    Trophy,
    Heart,
    Dumbbell,
    Target,
  };

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

  const Icon = iconMap[feature.iconName] || Zap;
  const gallery = feature.gallery || [];
  const allImages = [feature.image, ...gallery].filter(img => img && img.trim() !== '');

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
  <div className="relative bg-[#0A0A1F] border-2 border-[#BF9B30]/40 rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-[#BF9B30]/20
    [&::-webkit-scrollbar]:w-3
    [&::-webkit-scrollbar-track]:bg-[#0A0A1F]/50
    [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-track]:border
    [&::-webkit-scrollbar-track]:border-[#BF9B30]/20
    [&::-webkit-scrollbar-thumb]:bg-gradient-to-b
    [&::-webkit-scrollbar-thumb]:from-[#BF9B30]
    [&::-webkit-scrollbar-thumb]:to-[#D8C08E]
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:border-2
    [&::-webkit-scrollbar-thumb]:border-[#0A0A1F]
    hover:[&::-webkit-scrollbar-thumb]:from-[#D8C08E]
    hover:[&::-webkit-scrollbar-thumb]:to-[#BF9B30]
    [&::-webkit-scrollbar-thumb]:transition-all">
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
            {allImages[currentImageIndex] && (
              <img
                src={allImages[currentImageIndex]}
                alt={`${feature.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            )}
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
            <h3 className="text-2xl font-bold text-[#BF9B30] mb-4 flex items-center gap-2">
              <div className="w-1 h-8 bg-[#BF9B30] rounded-full"></div>
              Overview
            </h3>
            <div 
              className="text-[#D8C08E]/90 text-lg leading-[1.8] break-words overflow-wrap-anywhere
                prose prose-invert prose-lg
                prose-p:text-[#D8C08E] prose-p:leading-[1.8] prose-p:mb-4 prose-p:break-words
                prose-headings:text-white prose-headings:font-bold prose-headings:mb-3 prose-headings:break-words
                prose-h3:text-xl prose-h4:text-lg
                prose-strong:text-white prose-strong:font-semibold
                prose-em:text-[#D8C08E] prose-em:italic
                prose-ul:text-[#D8C08E] prose-ul:space-y-2 prose-ul:my-4 prose-ul:list-inside
                prose-ol:text-[#D8C08E] prose-ol:space-y-2 prose-ol:my-4 prose-ol:list-inside
                prose-li:text-[#D8C08E] prose-li:leading-relaxed prose-li:break-words
                prose-a:text-[#BF9B30] prose-a:underline prose-a:hover:text-[#D8C08E] prose-a:break-words
                prose-pre:overflow-x-auto prose-pre:break-words prose-pre:whitespace-pre-wrap
                prose-code:break-words prose-code:whitespace-normal
                max-w-none w-full overflow-hidden"
              dangerouslySetInnerHTML={{ __html: feature.fullDescription }}
            />
          </div>

          {/* Benefits Grid */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-[#BF9B30] mb-6 flex items-center gap-2">
              <div className="w-1 h-8 bg-[#BF9B30] rounded-full"></div>
              Key Benefits
            </h3>
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
              <h3 className="text-2xl font-bold text-[#BF9B30] mb-6 flex items-center gap-2">
                <div className="w-1 h-8 bg-[#BF9B30] rounded-full"></div>
                Gallery
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {allImages.map((img, idx) => (
                  img && (
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
                  )
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
});

export default FeatureModal;
