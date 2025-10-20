import { Zap, Users, Trophy, Heart, Dumbbell, Target } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import FeatureModal from './FeatureModal';

interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
  iconName: string;
  fullDescription: string;
  benefits: string[];
  gallery?: string[];
}

export default function Features() {
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'features'));
      const featuresData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Feature[];
      setFeatures(featuresData);
    } catch (error) {
      console.error('Error fetching features:', error);
      // Fallback to default features if fetch fails
      setFeatures(getDefaultFeatures());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultFeatures = (): Feature[] => {
    return [
      {
        id: '1',
        iconName: 'Zap',
        title: 'State-of-the-Art Equipment',
        description: 'Latest fitness technology and machines for optimal training results',
        image: 'GritFeature1.jpg',
        fullDescription: 'GRIT Fitness Gym is equipped with the latest cutting-edge fitness technology and premium equipment. From advanced cardio machines with interactive displays to professional-grade strength training equipment, every piece is carefully selected to optimize your workout experience.',
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
        ]
      },
      {
        id: '2',
        iconName: 'Users',
        title: 'Expert Trainers',
        description: 'Certified professionals ready to guide your fitness transformation',
        image: 'GritFeature2.jpg',
        fullDescription: 'Our team of certified fitness professionals brings years of experience and specialized knowledge to help you achieve your goals.',
        benefits: [
          'Certified and experienced fitness professionals',
          'Personalized workout plans and goal setting',
          'Proper form and technique instruction',
        ],
        gallery: []
      },
      {
        id: '3',
        iconName: 'Trophy',
        title: 'Group Classes',
        description: 'High-energy fitness classes including Muay Thai, dance classes, and conditioning',
        image: 'GritFeature4.jpg',
        fullDescription: 'Experience the energy and motivation of group fitness at GRIT!',
        benefits: [
          '8 weekly group fitness classes included in membership',
          'Muay Thai with certified martial arts instructors',
          'Dance fitness (POPHITS, RETRO DANCE FUZION)',
        ],
        gallery: []
      },
      {
        id: '4',
        iconName: 'Heart',
        title: 'Positive Community',
        description: 'Supportive members and uplifting atmosphere that motivate you to reach your goals together.',
        image: 'GritFeature5.jpg',
        fullDescription: 'At GRIT Fitness Gym, you\'re not just joining a gym—you\'re joining a family.',
        benefits: [
          '500+ supportive and welcoming members',
          'Judgment-free environment for all fitness levels',
          'Member events and community challenges',
        ],
        gallery: []
      }
    ];
  };

  const handleFeatureClick = useCallback((feature: any) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Icon mapping
  const iconMap: any = {
    Zap,
    Users,
    Trophy,
    Heart,
    Dumbbell,
    Target,
  };

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

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#BF9B30]"></div>
            <p className="text-[#D8C08E] mt-4">Loading features...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = iconMap[feature.iconName] || Zap;
              return (
                <div 
                  key={idx}
                  onClick={() => handleFeatureClick(feature)}
                  className="group relative overflow-hidden rounded-2xl h-[400px] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#BF9B30]/20 will-change-transform"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img 
                      src={feature.image} 
                      alt={`${feature.title} at GRIT Fitness Gym Cebu`}
                      className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110 will-change-transform"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A1F] via-[#0A0A1F]/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-[#0A0A1F]/40 group-hover:bg-[#0A0A1F]/30 transition-all duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6 z-10">
                    {/* Icon with animated background */}
                    <div className="mb-4">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#BF9B30]/20 border border-[#BF9B30] backdrop-blur-sm group-hover:bg-[#BF9B30] transition-all duration-200 will-change-[background-color]">
                        <Icon className="w-7 h-7 text-[#BF9B30] group-hover:text-[#0A0A1F] transition-colors duration-200" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-black text-white mb-3 group-hover:text-[#BF9B30] transition-colors duration-200">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#D8C08E] leading-relaxed opacity-90">
                      {feature.description.replace(/<[^>]*>/g, '')}
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
        )}
      </div>

      {/* Feature Modal */}
      <FeatureModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        feature={selectedFeature}
      />
    </section>
  );
}