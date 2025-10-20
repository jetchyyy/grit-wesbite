import { Music, Dumbbell, Heart, Flame, Calendar, User } from 'lucide-react';
import { useState } from 'react';
import ClassModal from './ClassModal';

export default function Classes() {
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClassClick = (classData: any) => {
    setSelectedClass(classData);
    setIsModalOpen(true);
  };

  const classes = [
   
    {
      icon: Music,
      name: 'POPHITS',
      instructor: 'Zin Ernie',
      day: 'Monday',
      time: '5:30 PM – 6:30 PM',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800',
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      icon: Dumbbell,
      name: 'PRIME CONDITIONING',
      instructor: 'Coach Loen',
      day: 'Tuesday',
      time: '5:30 PM – 6:30 PM',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: Heart,
      name: 'PULSE',
      instructor: 'Coach Carli',
      day: 'Wednesday',
      time: '5:30 PM – 6:30 PM',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800',
      color: 'from-red-500/20 to-orange-500/20'
    },
    {
      icon: Flame,
      name: 'COREX',
      instructor: 'Coach Jayjay',
      day: 'Thursday',
      time: '5:30 PM – 6:30 PM',
      image: 'https://images.unsplash.com/photo-1540206395-68808572332f?q=80&w=800',
      color: 'from-yellow-500/20 to-amber-500/20'
    },
    {
      icon: Music,
      name: 'RETRO DANCE FUZION',
      instructor: 'Coach Charie',
      day: 'Friday',
      time: '5:30 PM – 6:30 PM',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800',
      color: 'from-green-500/20 to-emerald-500/20'
    },
     {
      icon: Flame,
      name: 'MUAY THAI',
      instructor: 'Muay Thai Mini Hub',
      day: 'Mon, Wed, Sat',
      time: '6:30 PM – 8:00 PM',
      image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800',
      color: 'from-indigo-500/20 to-violet-500/20'
    }
  ];

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
        <div className="grid md:grid-cols-6 gap-6 auto-rows-[280px]">
          {classes.map((cls, idx) => {
            const Icon = cls.icon;
            // Bento Grid layout: 
            // Top row: 2 equal-width cards (3 cols each)
            // Middle row: 3 equal-width cards (2 cols each)
            // Bottom row: 1 full-width card (6 cols)
            const gridClass = idx === 0 || idx === 1
              ? 'md:col-span-3' // Top row - 2 equal cards
              : idx === 2 || idx === 3 || idx === 4
              ? 'md:col-span-2' // Middle row - 3 equal cards
              : 'md:col-span-6'; // Bottom row - 1 full-width card
            
            return (
              <div
                key={idx}
                onClick={() => handleClassClick(cls)}
                className={`${gridClass} group relative overflow-hidden rounded-2xl bg-[#0A0A1F]/50 border border-[#BF9B30]/20 hover:border-[#BF9B30]/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#BF9B30]/10 cursor-pointer`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                  <img
                    src={cls.image}
                    alt={`${cls.name} fitness class with instructor ${cls.instructor} at GRIT Fitness Gym Cebu`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${cls.color}`}></div>
                </div>

                {/* Content */}
                <div className={`relative backdrop-blur-sm h-full flex flex-col justify-between ${idx === 5 ? 'p-10' : 'p-6'}`}>
                  <div>
                    {/* Icon */}
                    <div className={`mb-4 inline-flex items-center justify-center rounded-xl bg-[#BF9B30]/20 border border-[#BF9B30] group-hover:bg-[#BF9B30] transition-all duration-300 ${idx === 5 ? 'w-16 h-16' : 'w-12 h-12'}`}>
                      <Icon className={`text-[#BF9B30] group-hover:text-[#0A0A1F] transition-colors duration-300 ${idx === 5 ? 'w-8 h-8' : 'w-6 h-6'}`} />
                    </div>

                    {/* Class Name */}
                    <h3 className={`font-black text-white mb-3 group-hover:text-[#BF9B30] transition-colors duration-300 ${idx === 5 ? 'text-4xl' : 'text-2xl'}`}>
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
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="text-[#BF9B30] font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                      Book Now
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#BF9B30] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            );
          })}
        </div>

        
      </div>

      {/* Class Modal */}
      <ClassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        classData={selectedClass}
      />
    </section>
  );
}