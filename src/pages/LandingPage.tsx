import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Classes from '../components/Classes';
import Coaches from '../components/Coaches';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import FAQ from '../components/FAQ';

export default function LandingPage() {
  return (
    <div className="bg-black text-white">
      <Navigation />
      <Hero />
      <Features />
      <Classes />
      <Coaches />
      <Pricing />
      <Testimonials />
      <Contact />
      <FAQ />
      
      {/* Footer */}
      <footer className="bg-[#0A0A1F] border-t border-[#BF9B30]/20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-black text-white mb-3">
                <span className="text-[#BF9B30]">GRIT</span> Fitness
              </h3>
              <p className="text-[#D8C08E] text-sm leading-relaxed">
                A judgment-free fitness community in Cebu City that inspires people to live healthier, more fulfilling lifestyles.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-[#D8C08E] text-sm">
                <li><a href="#home" className="hover:text-[#BF9B30] transition-colors">Home</a></li>
                <li><a href="#features" className="hover:text-[#BF9B30] transition-colors">Features</a></li>
                <li><a href="#classes" className="hover:text-[#BF9B30] transition-colors">Classes</a></li>
                <li><a href="#pricing" className="hover:text-[#BF9B30] transition-colors">Pricing</a></li>
                <li><a href="#faq" className="hover:text-[#BF9B30] transition-colors">FAQ</a></li>
                <li><a href="#contact" className="hover:text-[#BF9B30] transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-[#D8C08E] text-sm">
                <li>A-Strip Building, V. Rama Avenue</li>
                <li>Cebu City, Philippines</li>
                <li className="pt-2">
                  <a href="tel:09177773090" className="hover:text-[#BF9B30] transition-colors">0917 777 3090</a>
                </li>
                <li>
                  <a href="mailto:gritfitnesscebu@gmail.com" className="hover:text-[#BF9B30] transition-colors">gritfitnesscebu@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#BF9B30]/20 text-center">
            <p className="text-[#D8C08E] text-sm">
              &copy; 2025 <span className="text-[#BF9B30] font-semibold">GRIT Fitness Gym</span>. All rights reserved. | Open Daily 10AM - 10PM
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}