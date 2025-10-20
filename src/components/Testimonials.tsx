
import { Quote, Star, Calendar, Trophy } from 'lucide-react';
import { useState } from 'react';
import PaymentModal from './PaymentModal';

export default function Testimonials() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const testimonials = [
    {
      name: 'Jetch Mereald',
      role: 'GRIT Member',
      duration: '2 Years',
      achievement: 'Lost 25kg',
      text: 'GRIT completely transformed my fitness journey. The trainers are incredible and the community is so supportive! I never thought I could achieve this level of fitness.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?q=80&w=150',
      rating: 5
    },
    {
      name: 'Dan Ken Shen Penera',
      role: 'GRIT Member',
      duration: '1.5 Years',
      achievement: 'Gained 15kg Muscle',
      text: 'Best gym in Cebu! The equipment is top-notch and the classes are always packed with energy and motivation. The community here feels like family.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150',
      rating: 5
    },
    {
      name: 'Aliyah Galigao',
      role: 'GRIT Member',
      duration: '3 Years',
      achievement: 'CrossFit Competitor',
      text: 'I went from zero fitness to competing in a CrossFit competition. GRIT made it possible with their expert guidance and unwavering support throughout my journey.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150',
      rating: 5
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1A1A2F] via-[#1A1A2F] to-[#0A0A1F] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-[#BF9B30]/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#BF9B30]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#BF9B30]/20 border border-[#BF9B30] rounded-full px-6 py-2 mb-6">
            <Trophy className="w-4 h-4 text-[#BF9B30]" />
            <span className="text-[#BF9B30] font-semibold text-sm tracking-wide">SUCCESS STORIES</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Real <span className="text-[#BF9B30]">Transformations</span>
          </h2>
          <p className="text-[#D8C08E] text-lg md:text-xl max-w-2xl mx-auto">
            Hear from our members who achieved incredible results with GRIT
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, idx) => (
            <div 
              key={idx} 
              className="group bg-[#0A0A1F]/60 backdrop-blur-xl border border-[#BF9B30]/30 rounded-2xl p-8 hover:border-[#BF9B30]/60 hover:scale-105 hover:shadow-2xl hover:shadow-[#BF9B30]/20 transition-all duration-500"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-6">
                <Quote className="w-8 h-8 text-[#BF9B30]/60" />
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#BF9B30] fill-current" />
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-[#D8C08E] text-lg leading-relaxed mb-8 italic">
                "{testimonial.text}"
              </blockquote>

              {/* Member Info */}
              <div className="flex items-center gap-4">
                {/* Profile Image */}
                <div className="relative">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#BF9B30]/30 group-hover:border-[#BF9B30] transition-colors duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#BF9B30] rounded-full flex items-center justify-center">
                    <Trophy className="w-3 h-3 text-[#0A0A1F]" />
                  </div>
                </div>

                {/* Member Details */}
                <div className="flex-1">
                  <h4 className="text-white font-bold text-lg group-hover:text-[#BF9B30] transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-[#BF9B30] text-sm font-medium mb-1">{testimonial.role}</p>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-[#D8C08E]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{testimonial.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Trophy className="w-3 h-3" />
                      <span>{testimonial.achievement}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#BF9B30] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl"></div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center bg-[#0A0A1F]/40 backdrop-blur-sm border border-[#BF9B30]/20 rounded-xl p-6">
            <div className="text-3xl font-black text-[#BF9B30] mb-2">500+</div>
            <div className="text-white text-sm font-medium">Happy Members</div>
          </div>
          <div className="text-center bg-[#0A0A1F]/40 backdrop-blur-sm border border-[#BF9B30]/20 rounded-xl p-6">
            <div className="text-3xl font-black text-[#BF9B30] mb-2">95%</div>
            <div className="text-white text-sm font-medium">Success Rate</div>
          </div>
          <div className="text-center bg-[#0A0A1F]/40 backdrop-blur-sm border border-[#BF9B30]/20 rounded-xl p-6">
            <div className="text-3xl font-black text-[#BF9B30] mb-2">3+</div>
            <div className="text-white text-sm font-medium">Years Experience</div>
          </div>
          <div className="text-center bg-[#0A0A1F]/40 backdrop-blur-sm border border-[#BF9B30]/20 rounded-xl p-6">
            <div className="text-3xl font-black text-[#BF9B30] mb-2">5★</div>
            <div className="text-white text-sm font-medium">Average Rating</div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-[#D8C08E] text-lg mb-6">
            Ready to start your own transformation story?
          </p>
          <button
            onClick={() => setIsPaymentModalOpen(true)}
            className="bg-[#BF9B30] text-[#0A0A1F] px-10 py-4 rounded-xl hover:bg-[#D8C08E] transition-all duration-300 font-bold text-lg shadow-lg shadow-[#BF9B30]/30 hover:shadow-xl hover:shadow-[#BF9B30]/50 hover:-translate-y-1"
          >
            Join GRIT Today
          </button>
        </div>
      </div>
      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
    </section>
  );
}
