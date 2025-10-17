import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Classes from '../components/Classes';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

export default function LandingPage() {
  return (
    <div className="bg-black text-white">
      <Navigation />
      <Hero />
      <Features />
      <Classes />
      <Pricing />
      <Testimonials />
      <Contact />
      
      {/* Footer */}
      <footer className="bg-gray-900 border-t border-red-600/30 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 GRIT Gym. All rights reserved. Cebu City, Philippines</p>
        </div>
      </footer>
    </div>
  );
}