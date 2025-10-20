

import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import PaymentModal from './PaymentModal';

export default function Hero() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0A0A1F]/70 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A1F]/95 via-transparent to-[#0A0A1F]/80 z-20"></div>
        <img 
          src="/GritHero3.jpg" 
          alt="GRIT Fitness Gym Cebu members working out in modern facility with state-of-the-art equipment" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content - Positioned to sides */}
      <div className="relative z-30 w-full h-full px-6 sm:px-8 lg:px-12 xl:px-20 py-32 flex items-center">
        <div className="w-full max-w-[1600px]">
          {/* Left Side - Main Content */}
          
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black text-white mb-8 leading-[0.9] tracking-tight">
              SWEAT<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF9B30] to-[#D8C08E]">GRIND</span><br />
              <span className="text-[#BF9B30]">GRIT</span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-[#D8C08E] mb-10 leading-relaxed max-w-2xl font-light">
              A judgment-free fitness community that inspires people to live a healthier, more fulfilling lifestyle
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="group bg-[#BF9B30] text-[#0A0A1F] px-10 py-5 rounded-xl hover:bg-[#D8C08E] transition-all duration-300 font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-[#BF9B30]/30 hover:shadow-xl hover:shadow-[#BF9B30]/50"
              >
                Join NOW
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
     

      {/* Bottom Right - Testimonial & Stats */}
      <div className="hidden lg:block absolute bottom-16 right-8 xl:right-20 z-30">
        <div className="flex flex-col gap-6 max-w-md">
          {/* Testimonial Card */}
          <div className="bg-[#0A0A1F]/90 backdrop-blur-md border-2 border-[#BF9B30]/40 rounded-3xl p-8 hover:border-[#BF9B30]/60 transition-all duration-300 hover:shadow-xl hover:shadow-[#BF9B30]/20">
            {/* Quote Icon */}
            <div className="flex justify-between items-start mb-4">
              <svg className="w-8 h-8 text-[#BF9B30]/60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#BF9B30] fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            {/* Testimonial Text */}
            <p className="text-white text-base leading-relaxed mb-6 font-light italic">
              "GRIT completely transformed my fitness journey. The trainers are incredible and the community is so supportive!"
            </p>
            
            {/* Member Info */}
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" 
                alt="Jetch Merald"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#BF9B30]/30"
              />
              <div>
                <h4 className="text-white font-bold text-sm">Jetch Merald</h4>
                <p className="text-[#BF9B30] text-xs font-medium">Lost 25kg • 2 Years</p>
              </div>
            </div>
          </div>

          {/* Stats Counter */}
          <div className="bg-[#0A0A1F]/90 backdrop-blur-md border-2 border-[#BF9B30]/40 rounded-3xl p-6 hover:border-[#BF9B30]/60 transition-all duration-300 hover:shadow-xl hover:shadow-[#BF9B30]/20">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-black text-[#BF9B30] mb-1">500+</div>
                <div className="text-xs text-[#D8C08E] font-semibold">Members</div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#BF9B30] mb-1">8</div>
                <div className="text-xs text-[#D8C08E] font-semibold">Weekly Classes</div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#BF9B30] mb-1">5★</div>
                <div className="text-xs text-[#D8C08E] font-semibold">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats Bar for Mobile */}
      <div className="lg:hidden absolute bottom-8 left-0 right-0 z-30 px-6">
        <div className="bg-[#0A0A1F]/90 backdrop-blur-md border border-[#BF9B30]/40 rounded-xl p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-black text-[#BF9B30] mb-1">500+</div>
              <div className="text-xs text-[#D8C08E] font-medium">Members</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#BF9B30] mb-1">20+</div>
              <div className="text-xs text-[#D8C08E] font-medium">Classes</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#BF9B30] mb-1">5★</div>
              <div className="text-xs text-[#D8C08E] font-medium">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A1F] to-transparent z-20"></div>
      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
    </section>
  );
}