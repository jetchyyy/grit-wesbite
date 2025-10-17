import { Zap, Users, Trophy, Heart } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: 'State-of-the-Art Equipment',
      description: 'Latest fitness technology and machines for optimal training results',
      image: 'GritFeature1.jpg',
      alt: 'Modern gym equipment and cardio machines at GRIT Fitness Gym Cebu'
    },
    {
      icon: Users,
      title: 'Expert Trainers',
      description: 'Certified professionals ready to guide your fitness transformation',
      image: 'GritFeature2.jpg',
      alt: 'Professional fitness trainers coaching members at GRIT Gym Cebu'
    },
    {
      icon: Trophy,
      title: 'Group Classes',
      description: 'High-energy fitness classes including Muay Thai, dance classes, and conditioning',
      image: 'GritFeature4.jpg',
      alt: 'Group fitness classes and Muay Thai training at GRIT Fitness Cebu'
    },
    {
      icon: Heart,
      title: 'Positive Community',
      description: 'Supportive members and uplifting atmosphere that motivate you to reach your goals together.',
      image: 'GritFeature5.jpg',
      alt: 'Supportive fitness community working out together at GRIT Gym'
    }
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A0A1F] via-[#0A0A1F] to-[#1A1A2F]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Why Choose <span className="text-[#BF9B30]">GRIT</span>?
          </h2>
          <p className="text-[#D8C08E] text-lg md:text-xl max-w-2xl mx-auto">
            Everything you need to achieve your fitness goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx} 
                className="group relative overflow-hidden rounded-2xl h-[400px] cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#BF9B30]/20"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={feature.image} 
                    alt={feature.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A1F] via-[#0A0A1F]/80 to-transparent"></div>
                  <div className="absolute inset-0 bg-[#0A0A1F]/40 group-hover:bg-[#0A0A1F]/30 transition-all duration-500"></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6 z-10">
                  {/* Icon with animated background */}
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#BF9B30]/20 border border-[#BF9B30] backdrop-blur-sm group-hover:bg-[#BF9B30] transition-all duration-300">
                      <Icon className="w-7 h-7 text-[#BF9B30] group-hover:text-[#0A0A1F] transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-white mb-3 group-hover:text-[#BF9B30] transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#D8C08E] leading-relaxed opacity-90">
                    {feature.description}
                  </p>

                  {/* Hover indicator */}
                  <div className="mt-4 flex items-center gap-2 text-[#BF9B30] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm">Learn More</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Border glow effect on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#BF9B30]/50 rounded-2xl transition-all duration-500"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}