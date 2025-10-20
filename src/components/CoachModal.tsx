import { X, Instagram, Award } from 'lucide-react';
import { useEffect } from 'react';

interface CoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookSession?: () => void;
  coach: {
    name: string;
    specialty: string;
    description: string;
    image: string;
    gallery?: string[];
  } | null;
}

export default function CoachModal({ isOpen, onClose, onBookSession, coach }: CoachModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !coach) return null;

  // Generate placeholder gallery images if not provided
  const galleryImages = coach.gallery || [
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=600',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600',
    'https://images.unsplash.com/photo-1540206395-68808572332f?q=80&w=600',
    'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=600',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A1F]/95 backdrop-blur-md">
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#0A0A1F]/95 backdrop-blur-xl border-2 border-[#BF9B30]/40 rounded-3xl shadow-2xl shadow-[#BF9B30]/20 scrollbar-thin scrollbar-thumb-[#BF9B30]/60 scrollbar-track-[#0A0A1F]/80">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right z-10 w-12 h-12 flex items-center justify-center rounded-full bg-[#BF9B30]/20 border border-[#BF9B30] hover:bg-[#BF9B30] text-[#BF9B30] hover:text-[#0A0A1F] transition-all duration-300 backdrop-blur-sm"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-12">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            {/* Profile Image */}
            <div className="relative w-full md:w-64 h-80 rounded-2xl overflow-hidden flex-shrink-0">
              <img
                src={coach.image}
                alt={coach.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A1F] via-transparent to-transparent"></div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-[#BF9B30]/20 border border-[#BF9B30] rounded-full px-4 py-2 mb-4">
                <Award className="w-4 h-4 text-[#BF9B30]" />
                <span className="text-[#BF9B30] font-semibold text-sm tracking-wide">{coach.specialty}</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                {coach.name}
              </h2>

              <p className="text-[#D8C08E] text-lg leading-relaxed mb-6">
                {coach.description}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#BF9B30]/20 border border-[#BF9B30] flex items-center justify-center">
                    <Award className="w-6 h-6 text-[#BF9B30]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">8+ Years Experience</div>
                    <div className="text-[#D8C08E] text-sm">Professional Certification</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">@{coach.name.toLowerCase().replace(' ', '')}</div>
                    <div className="text-[#D8C08E] text-sm">Follow on Instagram</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (onBookSession) {
                    onBookSession();
                    onClose();
                  }
                }}
                className="mt-8 bg-[#BF9B30] text-[#0A0A1F] px-8 py-4 rounded-xl hover:bg-[#D8C08E] transition-all duration-300 font-bold shadow-lg shadow-[#BF9B30]/30 hover:shadow-xl hover:shadow-[#BF9B30]/50 hover:-translate-y-1"
              >
                Book a Session with {coach.name}
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#BF9B30]/50 to-transparent mb-12"></div>

          {/* Gallery Section */}
          <div>
            <h3 className="text-3xl font-black text-white mb-6">
              Training <span className="text-[#BF9B30]">Gallery</span>
            </h3>
            <p className="text-[#D8C08E] mb-8">
              See {coach.name} in action with our members
            </p>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={img}
                    alt={`${coach.name} training ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[#0A0A1F]/40 group-hover:bg-[#BF9B30]/40 transition-all duration-300"></div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
