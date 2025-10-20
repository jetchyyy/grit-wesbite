import { Music, Dumbbell, Heart, Flame, Calendar, User } from 'lucide-react';
import { useState, useCallback, memo, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import ClassModal from './ClassModal';

// Icon mapping
const iconMap: any = {
  Music,
  Dumbbell,
  Heart,
  Flame,
};

// Memoized ClassCard component to prevent re-renders
const ClassCard = memo(({ cls, idx, onClick }: any) => {
  const Icon = cls.icon;
  const gridClass = idx === 0 || idx === 1
    ? 'md:col-span-3'
    : idx === 2 || idx === 3 || idx === 4
    ? 'md:col-span-2'
    : 'md:col-span-6';

  return (
    <div
      onClick={() => onClick(cls)}
      className={`${gridClass} group relative overflow-hidden rounded-2xl bg-[#0A0A1F]/50 border border-[#BF9B30]/20 hover:border-[#BF9B30]/60 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#BF9B30]/10 cursor-pointer will-change-transform`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
        <img
          src={cls.image}
          alt={`${cls.name} fitness class with instructor ${cls.instructor} at GRIT Fitness Gym Cebu`}
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110 will-change-transform"
          loading="lazy"
          decoding="async"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${cls.color}`}></div>
      </div>

      {/* Content */}
      <div className={`relative backdrop-blur-sm h-full flex flex-col justify-between ${idx === 5 ? 'p-10' : 'p-6'}`}>
        <div>
          {/* Icon */}
          <div className={`mb-4 inline-flex items-center justify-center rounded-xl bg-[#BF9B30]/20 border border-[#BF9B30] group-hover:bg-[#BF9B30] transition-all duration-200 will-change-[background-color] ${idx === 5 ? 'w-16 h-16' : 'w-12 h-12'}`}>
            <Icon className={`text-[#BF9B30] group-hover:text-[#0A0A1F] transition-colors duration-200 ${idx === 5 ? 'w-8 h-8' : 'w-6 h-6'}`} />
          </div>

          {/* Class Name */}
          <h3 className={`font-black text-white mb-3 group-hover:text-[#BF9B30] transition-colors duration-200 ${idx === 5 ? 'text-4xl' : 'text-2xl'}`}>
            {cls.name}
          </h3>

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-[#BF9B30]" />
            <span className="text-[#D8C08E] font-medium">{cls.instructor}</span>
          </div>

          {/* Schedule */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#BF9B30]" />
              <span className="text-white font-semibold text-sm">{cls.day}</span>
            </div>
            <div className="flex items-center gap-2 pl-6">
              <span className="text-[#BF9B30] font-bold text-sm">{cls.time}</span>
            </div>
          </div>
        </div>

        {/* Hover CTA */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="text-[#BF9B30] font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all duration-200">
            Book Now
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#BF9B30] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
});

export default function Classes() {
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'classes'));
      const classesData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          icon: iconMap[data.iconName] || Dumbbell, // Map icon name to icon component
          color: data.color || 'from-blue-500/20 to-cyan-500/20', // Default color if missing
        };
      });
      setClasses(classesData);
    } catch (error) {
      console.error('Error fetching classes:', error);
      // Fallback to empty array if error
      setClasses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClassClick = useCallback((classData: any) => {
    // Use requestIdleCallback to defer non-critical work
    requestIdleCallback(() => {
      setSelectedClass(classData);
    }, { timeout: 50 });
    
    // Open modal immediately for instant feedback
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <section id="classes" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1A1A2F] via-[#1A1A2F] to-[#0A0A1F] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#BF9B30]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#BF9B30]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Fitness Classes <span className="text-[#BF9B30]">Cebu</span>
          </h2>
          <p className="text-[#D8C08E] text-lg md:text-xl max-w-2xl mx-auto">
            Join our energizing group fitness classes led by expert trainers every week
          </p>
        </div>

        {/* Classes Bento Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#BF9B30]"></div>
            <p className="text-[#D8C08E] mt-4">Loading classes...</p>
          </div>
        ) : classes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#D8C08E] text-lg">No classes available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-6 gap-6 auto-rows-[280px]">
            {classes.map((cls, idx) => (
              <ClassCard key={cls.id || idx} cls={cls} idx={idx} onClick={handleClassClick} />
            ))}
          </div>
        )}

        
      </div>

      {/* Class Modal */}
      <ClassModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        classData={selectedClass}
      />
    </section>
  );
}