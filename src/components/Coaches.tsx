import { Award, Target, Heart, Zap } from 'lucide-react';
import { useState, useCallback, memo } from 'react';
import CoachModal from './CoachModal';
import PaymentModal from './PaymentModal';

interface Coach {
  name: string;
  specialty: string;
  description: string;
  image: string;
  icon: typeof Award;
  gallery?: string[];
}

// Memoized Coach Card component
const CoachCard = memo(({ coach, idx, onClick }: { coach: Coach; idx: number; onClick: (coach: Coach) => void }) => {
  const Icon = coach.icon;
  
  return (
    <div
      onClick={() => onClick(coach)}
      className="group bg-[#0A0A1F]/60 backdrop-blur-xl border border-[#BF9B30]/30 rounded-2xl overflow-hidden hover:border-[#BF9B30]/60 hover:scale-105 hover:shadow-2xl hover:shadow-[#BF9B30]/20 transition-all duration-300 cursor-pointer will-change-transform"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={coach.image}
          alt={`${coach.name} - ${coach.specialty} coach at GRIT Fitness Gym Cebu`}
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110 will-change-transform"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A1F] via-[#0A0A1F]/50 to-transparent"></div>
        
        {/* Icon Badge */}
        <div className="absolute top-4 right-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#BF9B30]/90 backdrop-blur-sm border border-[#BF9B30]">
            <Icon className="w-6 h-6 text-[#0A0A1F]" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-black text-white mb-2 group-hover:text-[#BF9B30] transition-colors duration-200">
          {coach.name}
        </h3>
        
        <div className="inline-block bg-[#BF9B30]/20 border border-[#BF9B30] rounded-full px-3 py-1 mb-4">
          <span className="text-[#BF9B30] font-semibold text-xs tracking-wide">{coach.specialty}</span>
        </div>

        <p className="text-[#D8C08E] text-sm leading-relaxed">
          {coach.description}
        </p>
      </div>

      {/* Hover accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#BF9B30] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
});

export default function Coaches() {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleCoachClick = useCallback((coach: Coach) => {
    setSelectedCoach(coach);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCoach(null), 300);
  }, []);

  const handleBookSession = useCallback(() => {
    setIsPaymentModalOpen(true);
  }, []);

  const handleClosePaymentModal = useCallback(() => {
    setIsPaymentModalOpen(false);
  }, []);

  const coaches: Coach[] = [
    {
      name: 'Coach 1',
      specialty: 'Strength & Conditioning',
      description: 'Certified strength coach with 8+ years experience. Specializes in functional training and athletic performance enhancement.',
      image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=400',
      icon: Award
    },
    {
      name: 'Coach 2',
      specialty: 'HIIT & Cardio Expert',
      description: 'High-energy trainer passionate about cardiovascular fitness and body transformation through intense interval training.',
      image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=400',
      icon: Zap
    },
    {
      name: 'Coach 3',
      specialty: 'Core & Mobility',
      description: 'Movement specialist focused on core strength, flexibility, and injury prevention. Helps clients build a solid foundation.',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400',
      icon: Target
    },
    {
      name: 'Coach 4',
      specialty: 'Dance & Wellness',
      description: 'Combines dance fitness with holistic wellness approach. Creates fun, engaging workouts that improve both body and mind.',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=400',
      icon: Heart
    }
  ];

  return (
    <section id="coaches" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A0A1F] via-[#0A0A1F] to-[#1A1A2F] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-72 h-72 bg-[#BF9B30]/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#BF9B30]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#BF9B30]/20 border border-[#BF9B30] rounded-full px-6 py-2 mb-6">
            <Award className="w-4 h-4 text-[#BF9B30]" />
            <span className="text-[#BF9B30] font-semibold text-sm tracking-wide">EXPERT TRAINERS</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Meet Our <span className="text-[#BF9B30]">Coaches</span>
          </h2>
          <p className="text-[#D8C08E] text-lg md:text-xl max-w-2xl mx-auto">
            Certified professionals dedicated to helping you reach your fitness goals
          </p>
        </div>

        {/* Coaches Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coaches.map((coach, idx) => (
            <CoachCard key={idx} coach={coach} idx={idx} onClick={handleCoachClick} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-[#D8C08E] text-lg mb-6">
            Want to work with our expert coaches?
          </p>
          <button
            onClick={handleBookSession}
            className="bg-[#BF9B30] text-[#0A0A1F] px-10 py-4 rounded-xl hover:bg-[#D8C08E] transition-all duration-300 font-bold text-lg shadow-lg shadow-[#BF9B30]/30 hover:shadow-xl hover:shadow-[#BF9B30]/50 hover:-translate-y-1"
          >
            Join us now
          </button>
        </div>
      </div>

      {/* Coach Modal */}
      <CoachModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onBookSession={handleBookSession}
        coach={selectedCoach}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handleClosePaymentModal}
      />
    </section>
  );
}
