import { Zap, Users, Trophy, Heart } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: 'State-of-the-Art Equipment',
      description: 'Latest fitness technology and machines for optimal training results'
    },
    {
      icon: Users,
      title: 'Expert Trainers',
      description: 'Certified professionals ready to guide your fitness transformation'
    },
    {
      icon: Trophy,
      title: 'Group Classes',
      description: 'High-energy fitness classes including CrossFit, yoga, and cardio'
    },
    {
      icon: Heart,
      title: 'Personal Wellness',
      description: 'Holistic approach to fitness, nutrition, and mental health'
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 text-center">Why Choose GRIT?</h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto text-lg">
          Everything you need to achieve your fitness goals
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-gray-900 border border-red-600/20 hover:border-red-600/50 rounded-lg p-8 transition group hover:bg-gray-800">
                <Icon className="w-12 h-12 text-red-600 mb-4 group-hover:scale-110 transition" />
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}