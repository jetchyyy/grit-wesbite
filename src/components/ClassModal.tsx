import { X, Calendar, Clock, User, Users, MapPin } from 'lucide-react';
import { useEffect, memo } from 'react';

interface ClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  classData: {
    name: string;
    instructor: string;
    day: string;
    time: string;
    image: string;
    icon: any;
    color: string;
    description?: string;
    gallery?: string[];
  } | null;
}

const ClassModal = memo(function ClassModal({ isOpen, onClose, classData }: ClassModalProps) {
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

  if (!isOpen || !classData) return null;

  const Icon = classData.icon;

  // Generate placeholder gallery images if not provided
  const galleryImages = classData.gallery || [
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=600',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600',
    'https://images.unsplash.com/photo-1540206395-68808572332f?q=80&w=600',
    'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=600',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600',
    'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=600',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A1F]/95 backdrop-blur-md">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-[#0A0A1F]/95 backdrop-blur-xl border-2 border-[#BF9B30]/40 rounded-3xl shadow-2xl shadow-[#BF9B30]/20
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
        hover:[&::-webkit-scrollbar-thumb]:to-[#BF9B30]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right z-10 w-12 h-12 flex items-center justify-center rounded-full bg-[#BF9B30]/20 border border-[#BF9B30] hover:bg-[#BF9B30] text-[#BF9B30] hover:text-[#0A0A1F] transition-all duration-300 backdrop-blur-sm"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-12">
          {/* Hero Section */}
          <div className="relative h-80 rounded-3xl overflow-hidden mb-12">
            <img
              src={classData.image}
              alt={classData.name}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${classData.color}`}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A1F] via-[#0A0A1F]/50 to-transparent"></div>
            
            {/* Hero Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-[#BF9B30] flex items-center justify-center">
                  <Icon className="w-8 h-8 text-[#0A0A1F]" />
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    {classData.name}
                  </h2>
                  <p className="text-[#D8C08E] font-medium">Group Fitness Class</p>
                </div>
              </div>
            </div>
          </div>

          {/* Class Details Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Left Column - Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-white mb-4">Class Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-[#0A0A1F]/60 backdrop-blur-sm border border-[#BF9B30]/30 rounded-xl p-4">
                    <div className="w-12 h-12 rounded-xl bg-[#BF9B30]/20 border border-[#BF9B30] flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-[#BF9B30]" />
                    </div>
                    <div>
                      <div className="text-[#D8C08E] text-sm">Instructor</div>
                      <div className="text-white font-bold">{classData.instructor}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-[#0A0A1F]/60 backdrop-blur-sm border border-[#BF9B30]/30 rounded-xl p-4">
                    <div className="w-12 h-12 rounded-xl bg-[#BF9B30]/20 border border-[#BF9B30] flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-[#BF9B30]" />
                    </div>
                    <div>
                      <div className="text-[#D8C08E] text-sm">Schedule</div>
                      <div className="text-white font-bold">{classData.day}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-[#0A0A1F]/60 backdrop-blur-sm border border-[#BF9B30]/30 rounded-xl p-4">
                    <div className="w-12 h-12 rounded-xl bg-[#BF9B30]/20 border border-[#BF9B30] flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[#BF9B30]" />
                    </div>
                    <div>
                      <div className="text-[#D8C08E] text-sm">Time</div>
                      <div className="text-white font-bold">{classData.time}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-[#0A0A1F]/60 backdrop-blur-sm border border-[#BF9B30]/30 rounded-xl p-4">
                    <div className="w-12 h-12 rounded-xl bg-[#BF9B30]/20 border border-[#BF9B30] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#BF9B30]" />
                    </div>
                    <div>
                      <div className="text-[#D8C08E] text-sm">Location</div>
                      <div className="text-white font-bold">GRIT Fitness Gym</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-[#0A0A1F]/60 backdrop-blur-sm border border-[#BF9B30]/30 rounded-xl p-4">
                    <div className="w-12 h-12 rounded-xl bg-[#BF9B30]/20 border border-[#BF9B30] flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-[#BF9B30]" />
                    </div>
                    <div>
                      <div className="text-[#D8C08E] text-sm">Class Size</div>
                      <div className="text-white font-bold">Max 20 participants</div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#BF9B30] text-[#0A0A1F] px-8 py-4 rounded-xl hover:bg-[#D8C08E] transition-all duration-300 font-bold text-lg shadow-lg shadow-[#BF9B30]/30 hover:shadow-xl hover:shadow-[#BF9B30]/50 hover:-translate-y-1">
                Reserve Your Spot
              </button>
            </div>

            {/* Right Column - Description */}
            <div>
              <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-8 bg-[#BF9B30] rounded-full"></div>
                About This Class
              </h3>
              <div className="bg-[#0A0A1F]/60 backdrop-blur-sm border border-[#BF9B30]/30 rounded-xl p-6 space-y-4">
                {classData.description ? (
                  <div 
                    className="text-[#D8C08E]/90 leading-[1.8] break-words overflow-wrap-anywhere
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
                    dangerouslySetInnerHTML={{ __html: classData.description }}
                  />
                ) : (
                  <>
                    <p className="text-[#D8C08E] leading-relaxed">
                      Join us for an energizing {classData.name} session that will push your limits and help you achieve your fitness goals.
                    </p>
                    <p className="text-[#D8C08E] leading-relaxed">
                      Led by our expert instructor {classData.instructor}, this class combines high-energy movements with proper technique to maximize results while minimizing injury risk.
                    </p>
                  </>
                )}
                <div className="pt-4 border-t border-[#BF9B30]/20">
                  <h4 className="text-white font-bold mb-3">What to Bring:</h4>
                  <ul className="space-y-2 text-[#D8C08E]">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#BF9B30]"></div>
                      Water bottle
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#BF9B30]"></div>
                      Workout towel
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#BF9B30]"></div>
                      Positive attitude
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#BF9B30]/50 to-transparent mb-12"></div>

          {/* Gallery Section */}
          <div>
            <h3 className="text-3xl font-black text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-10 bg-[#BF9B30] rounded-full"></div>
              Class <span className="text-[#BF9B30]">Gallery</span>
            </h3>
            <p className="text-[#D8C08E] mb-8">
              See our members in action during {classData.name} classes
            </p>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={img}
                    alt={`${classData.name} class ${idx + 1}`}
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
});

export default ClassModal;
