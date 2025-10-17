import { Menu, X, Dumbbell } from 'lucide-react';
import { useState } from 'react';
import PaymentModal from './PaymentModal';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  return (
    <>
      <nav className="fixed w-full bg-black/95 backdrop-blur-md z-50 border-b border-red-600/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-8 h-8 text-red-600" />
              <span className="text-2xl font-black text-white">GRIT</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-gray-300 hover:text-red-600 transition">Home</a>
              <a href="#features" className="text-gray-300 hover:text-red-600 transition">Features</a>
              <a href="#classes" className="text-gray-300 hover:text-red-600 transition">Classes</a>
              <a href="#pricing" className="text-gray-300 hover:text-red-600 transition">Pricing</a>
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Join Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <a href="#home" className="block text-gray-300 hover:text-red-600 py-2">Home</a>
              <a href="#features" className="block text-gray-300 hover:text-red-600 py-2">Features</a>
              <a href="#classes" className="block text-gray-300 hover:text-red-600 py-2">Classes</a>
              <a href="#pricing" className="block text-gray-300 hover:text-red-600 py-2">Pricing</a>
              <button
                onClick={() => {
                  setIsPaymentModalOpen(true);
                  setIsOpen(false);
                }}
                className="w-full bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition font-semibold mt-2"
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