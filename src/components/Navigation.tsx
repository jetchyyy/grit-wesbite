import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import PaymentModal from './PaymentModal';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A1F]/90 backdrop-blur-xl shadow-lg shadow-[#0A0A1F]/50 border-b border-[#BF9B30]/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Far Left */}
            <a href="#home" className="flex items-center gap-3 group">
              <img
                src="/GritLogo-Transparent.png"
                alt="GRIT Fitness"
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-110"
              />
            </a>

            {/* Desktop Menu - Center */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
              <a
                href="#home"
                className="text-white hover:text-[#BF9B30] transition-colors duration-300 font-semibold relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#BF9B30] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#features"
                className="text-white hover:text-[#BF9B30] transition-colors duration-300 font-semibold relative group"
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#BF9B30] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#classes"
                className="text-white hover:text-[#BF9B30] transition-colors duration-300 font-semibold relative group"
              >
                Classes
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#BF9B30] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#coaches"
                className="text-white hover:text-[#BF9B30] transition-colors duration-300 font-semibold relative group"
              >
                Coaches
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#BF9B30] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#pricing"
                className="text-white hover:text-[#BF9B30] transition-colors duration-300 font-semibold relative group"
              >
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#BF9B30] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#faq"
                className="text-white hover:text-[#BF9B30] transition-colors duration-300 font-semibold relative group"
              >
                FAQ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#BF9B30] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#contact"
                className="text-white hover:text-[#BF9B30] transition-colors duration-300 font-semibold relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#BF9B30] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>

            {/* Join Now Button - Far Right */}
            <div className="hidden md:block">
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="bg-[#BF9B30] text-[#0A0A1F] px-8 py-3 rounded-lg hover:bg-[#D8C08E] transition-all duration-300 font-bold shadow-lg shadow-[#BF9B30]/30 hover:shadow-xl hover:shadow-[#BF9B30]/50 hover:-translate-y-0.5"
              >
                Join Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#BF9B30] hover:text-[#D8C08E] transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden pb-6 space-y-1 bg-[#0A0A1F]/95 backdrop-blur-xl rounded-b-2xl border-t border-[#BF9B30]/20">
              <a
                href="#home"
                onClick={() => setIsOpen(false)}
                className="block text-white hover:text-[#BF9B30] hover:bg-[#BF9B30]/10 py-3 px-4 rounded-lg transition-all font-semibold"
              >
                Home
              </a>
              <a
                href="#features"
                onClick={() => setIsOpen(false)}
                className="block text-white hover:text-[#BF9B30] hover:bg-[#BF9B30]/10 py-3 px-4 rounded-lg transition-all font-semibold"
              >
                Features
              </a>
              <a
                href="#classes"
                onClick={() => setIsOpen(false)}
                className="block text-white hover:text-[#BF9B30] hover:bg-[#BF9B30]/10 py-3 px-4 rounded-lg transition-all font-semibold"
              >
                Classes
              </a>
              <a
                href="#coaches"
                onClick={() => setIsOpen(false)}
                className="block text-white hover:text-[#BF9B30] hover:bg-[#BF9B30]/10 py-3 px-4 rounded-lg transition-all font-semibold"
              >
                Coaches
              </a>
              <a
                href="#pricing"
                onClick={() => setIsOpen(false)}
                className="block text-white hover:text-[#BF9B30] hover:bg-[#BF9B30]/10 py-3 px-4 rounded-lg transition-all font-semibold"
              >
                Pricing
              </a>
              <a
                href="#faq"
                onClick={() => setIsOpen(false)}
                className="block text-white hover:text-[#BF9B30] hover:bg-[#BF9B30]/10 py-3 px-4 rounded-lg transition-all font-semibold"
              >
                FAQ
              </a>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block text-white hover:text-[#BF9B30] hover:bg-[#BF9B30]/10 py-3 px-4 rounded-lg transition-all font-semibold"
              >
                Contact
              </a>
              <button
                onClick={() => {
                  setIsPaymentModalOpen(true);
                  setIsOpen(false);
                }}
                className="w-full bg-[#BF9B30] text-[#0A0A1F] px-6 py-3 rounded-lg hover:bg-[#D8C08E] transition-all font-bold mt-3 shadow-lg shadow-[#BF9B30]/30"
              >
                Join Now
              </button>
            </div>
          )}
        </div>
      </nav>

      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} />
    </>
  );
}