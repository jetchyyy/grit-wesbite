
import { ArrowRight, Users } from 'lucide-react';

export default function Hero() {
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
              <button className="group bg-[#BF9B30] text-[#0A0A1F] px-10 py-5 rounded-xl hover:bg-[#D8C08E] transition-all duration-300 font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-[#BF9B30]/30 hover:shadow-xl hover:shadow-[#BF9B30]/50">
                Join NOW
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
     

      {/* Bottom Right - Feature Card & Stats */}
      <div className="hidden lg:block absolute bottom-16 right-8 xl:right-20 z-30">
        <div className="flex flex-col gap-6 max-w-md">
          {/* Feature Card */}
          <div className="bg-[#0A0A1F]/90 backdrop-blur-md border-2 border-[#BF9B30]/40 rounded-3xl p-8 hover:border-[#BF9B30]/60 transition-all duration-300 hover:shadow-xl hover:shadow-[#BF9B30]/20">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-[#BF9B30] rounded-full p-3">
                <Users className="w-8 h-8 text-[#0A0A1F]" />
              </div>
            </div>
            <p className="text-white text-base leading-relaxed mb-6 font-light">
              It's about building strength, improving mobility, boosting mental health, and creating lasting habits that enhance your quality of life. Whether you're lifting weights, stretching your limits...
            </p>
            <button className="text-[#BF9B30] font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
              Learn More
              <ArrowRight className="w-4 h-4" />
            </button>
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
    </section>
  );
}