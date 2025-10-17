import { Flame, Zap, Wind, Dumbbell } from 'lucide-react';

export default function Classes() {
  const classes = [
    {
      icon: Flame,
      name: 'CrossFit',
      description: 'High-intensity workouts combining weightlifting, gymnastics, and cardio',
      schedule: 'Mon, Wed, Fri - 6:00 AM, 5:00 PM'
    },
    {
      icon: Wind,
      name: 'Yoga & Flexibility',
      description: 'Build strength and flexibility while finding inner peace and balance',
      schedule: 'Tue, Thu - 7:00 AM, 4:00 PM'
    },
    {
      icon: Zap,
      name: 'HIIT Training',
      description: 'Maximum calorie burn in minimum time with interval training',
      schedule: 'Mon, Wed, Fri - 7:00 PM'
    },
    {
      icon: Dumbbell,
      name: 'Strength & Conditioning',
      description: 'Build muscle and increase your overall strength progressively',
      schedule: 'Tue, Thu, Sat - 6:00 AM'
    }
  ];

  return (
    <section id="classes" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 text-center">Our Classes</h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto text-lg">
          Diverse programs designed for all fitness levels
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {classes.map((cls, idx) => {
            const Icon = cls.icon;
            return (
              <div key={idx} className="bg-gray-900/50 border border-red-600/30 rounded-lg p-8 hover:border-red-600 hover:bg-gray-900 transition">
                <Icon className="w-10 h-10 text-red-600 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{cls.name}</h3>
                <p className="text-gray-400 mb-4">{cls.description}</p>
                <p className="text-red-600 font-semibold text-sm">{cls.schedule}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}