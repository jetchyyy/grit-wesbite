import { Zap, Users, Trophy, Heart } from 'lucide-react';
import { useState } from 'react';
import FeatureModal from './FeatureModal';

export default function Features() {
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFeatureClick = (feature: any) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
  };

  const features = [
    {
      icon: Zap,
      title: 'State-of-the-Art Equipment',
      description: 'Latest fitness technology and machines for optimal training results',
      image: 'GritFeature1.jpg',
      alt: 'Modern gym equipment and cardio machines at GRIT Fitness Gym Cebu',
      fullDescription: 'GRIT Fitness Gym is equipped with the latest cutting-edge fitness technology and premium equipment. From advanced cardio machines with interactive displays to professional-grade strength training equipment, every piece is carefully selected to optimize your workout experience. Our facility features top brands in the fitness industry, ensuring durability, safety, and maximum performance for all fitness levels.',
      benefits: [
        'Premium cardio machines (treadmills, ellipticals, bikes)',
        'Full range of free weights and dumbbells',
        'Professional strength training equipment',
        'Functional training area with battle ropes, TRX, kettlebells',
        'Regular equipment maintenance and sanitation',
        'Equipment suitable for beginners to advanced athletes'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200',
        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200',
        'https://images.unsplash.com/photo-1540206395-68808572332f?q=80&w=1200',
        'https://images.unsplash.com/photo-1580086319619-3ed498161c77?q=80&w=1200',
        'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?q=80&w=1200'
      ]
    },
    {
      icon: Users,
      title: 'Expert Trainers',
      description: 'Certified professionals ready to guide your fitness transformation',
      image: 'GritFeature2.jpg',
      alt: 'Professional fitness trainers coaching members at GRIT Gym Cebu',
      fullDescription: 'Our team of certified fitness professionals brings years of experience and specialized knowledge to help you achieve your goals. Each trainer is passionate about fitness and dedicated to providing personalized guidance, proper form instruction, and motivation. Whether you\'re a beginner or an experienced athlete, our trainers create customized workout plans tailored to your specific needs and fitness level.',
      benefits: [
        'Certified and experienced fitness professionals',
        'Personalized workout plans and goal setting',
        'Proper form and technique instruction',
        'Nutrition guidance and lifestyle coaching',
        'Progress tracking and accountability',
        'Specialized training in strength, conditioning, and functional fitness'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200',
        'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200',
        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200',
        'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1200'
      ]
    },
    {
      icon: Trophy,
      title: 'Group Classes',
      description: 'High-energy fitness classes including Muay Thai, dance classes, and conditioning',
      image: 'GritFeature4.jpg',
      alt: 'Group fitness classes and Muay Thai training at GRIT Fitness Cebu',
      fullDescription: 'Experience the energy and motivation of group fitness at GRIT! Our diverse class schedule includes 8 weekly sessions ranging from high-intensity conditioning to dance fitness and martial arts. Led by expert instructors, each class is designed to challenge you, keep workouts exciting, and build a supportive community. Whether you prefer POPHITS dance, PRIME CONDITIONING strength training, or MUAY THAI martial arts, there\'s a class for every fitness preference.',
      benefits: [
        '8 weekly group fitness classes included in membership',
        'Muay Thai with certified martial arts instructors',
        'Dance fitness (POPHITS, RETRO DANCE FUZION)',
        'Strength and conditioning (PRIME, COREX)',
        'High-energy cardio classes (PULSE)',
        'Beginner-friendly with modifications available'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200',
        'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1200',
        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200',
        'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=1200',
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200'
      ]
    },
    {
      icon: Heart,
      title: 'Positive Community',
      description: 'Supportive members and uplifting atmosphere that motivate you to reach your goals together.',
      image: 'GritFeature5.jpg',
      alt: 'Supportive fitness community working out together at GRIT Gym',
      fullDescription: 'At GRIT Fitness Gym, you\'re not just joining a gym—you\'re joining a family. Our judgment-free community of over 500+ members creates an atmosphere of support, encouragement, and positive energy. Whether you\'re working out solo or joining a group class, you\'ll feel the uplifting vibe that makes GRIT special. We believe fitness is better together, and our community proves it every day.',
      benefits: [
        '500+ supportive and welcoming members',
        'Judgment-free environment for all fitness levels',
        'Member events and community challenges',
        'Social fitness atmosphere that motivates',
        'Friendly staff always ready to help',
        'Build lasting friendships and accountability partners'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200',
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200',
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200',
        'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1200',
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200'
      ]
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
                onClick={() => handleFeatureClick(feature)}
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

      {/* Feature Modal */}
      <FeatureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        feature={selectedFeature}
      />
    </section>
  );
}