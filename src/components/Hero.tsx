
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            NO LIMITS.<br />ONLY <span className="text-red-600">GRIT</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your body and mind at Cebu's premier fitness destination. Push your limits and discover what you're truly capable of.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition font-bold text-lg flex items-center justify-center gap-2">
              Start Your Journey <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-lg hover:bg-red-600/10 transition font-bold text-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}