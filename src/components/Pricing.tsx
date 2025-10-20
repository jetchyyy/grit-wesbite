import { Check, Clock, Percent, Info } from 'lucide-react';
import { useState } from 'react';
import PaymentModal from './PaymentModal';

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  originalPrice?: number;
  savings?: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
  description: string;
}

export default function Pricing() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans: PricingPlan[] = [
    {
      name: 'Walk-in',
      price: 200,
      period: '/day',
      features: ['Daily gym access', 'All equipment available', 'Locker & shower facilities', 'Community support'],
      highlighted: false,
      description: 'Perfect for trying us out or occasional visits'
    },
    {
      name: '1 Month',
      price: 1800,
      period: '/month',
      features: ['Full gym access 10AM-10PM', 'Unlimited group classes', 'All equipment & facilities', 'Member community access', 'Progress tracking'],
      highlighted: false,
      description: 'Great starter package for building consistency'
    },
    {
      name: '3 Months',
      price: 4500,
      period: '/3 months',
      originalPrice: 5400,
      savings: 'Save ₱900',
      features: ['Everything in 1 Month', 'Priority class booking', 'Nutrition consultation', 'Fitness assessment', 'Member events access'],
      highlighted: true,
      badge: 'Most Popular',
      description: 'Perfect for building lasting fitness habits'
    },
    {
      name: '6 Months',
      price: 7800,
      period: '/6 months',
      originalPrice: 10800,
      savings: 'Save ₱3,000',
      features: ['Everything in 3 Months', 'Personal training session', 'Custom workout plans', 'Body composition analysis', 'Premium member perks'],
      highlighted: false,
      description: 'Ideal for serious transformation goals'
    },
    {
      name: '12 Months',
      price: 14000,
      period: '/year',
      originalPrice: 21600,
      savings: 'Save ₱7,600',
      features: ['Everything included', 'Monthly personal training', 'Meal planning consultation', 'Priority equipment access', 'VIP member benefits', 'Guest passes (2/month)'],
      highlighted: false,
      badge: 'Best Value',
      description: 'Ultimate package for committed fitness enthusiasts'
    }
  ];

  const handleGetStarted = (plan: PricingPlan) => {
    setSelectedAmount(plan.price);
    setSelectedPlan(plan.name);
    setIsPaymentModalOpen(true);
  };

  return (
    <>
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1A1A2F] via-[#0A0A1F] to-[#1A1A2F] relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-40 w-80 h-80 bg-[#BF9B30]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 -right-40 w-96 h-96 bg-[#BF9B30]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
              Cebu Gym <span className="text-[#BF9B30]">Membership</span>
            </h2>
            <p className="text-[#D8C08E] text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Affordable gym Cebu membership plans that fit your fitness journey and budget
            </p>
            
            {/* Gym hours & discount info */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-[#0A0A1F]/50 backdrop-blur-sm border border-[#BF9B30]/30 rounded-full px-4 py-2">
                <Clock className="w-4 h-4 text-[#BF9B30]" />
                <span className="text-white">Open 10AM - 10PM Daily</span>
              </div>
              <div className="flex items-center gap-2 bg-[#0A0A1F]/50 backdrop-blur-sm border border-[#BF9B30]/30 rounded-full px-4 py-2">
                <Percent className="w-4 h-4 text-[#BF9B30]" />
                <span className="text-white">20% off for Students, Seniors & PWD</span>
              </div>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`group relative rounded-2xl p-6 transition-all duration-300 hover:scale-105 will-change-transform ${
                  plan.highlighted
                    ? 'bg-[#0A0A1F]/80 backdrop-blur-xl border-2 border-[#BF9B30] shadow-2xl shadow-[#BF9B30]/20'
                    : 'bg-[#0A0A1F]/60 backdrop-blur-xl border border-[#BF9B30]/30 hover:border-[#BF9B30]/60 hover:shadow-xl hover:shadow-[#BF9B30]/10'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#BF9B30] text-[#0A0A1F] px-4 py-1 rounded-full text-xs font-bold">
                      {plan.badge}
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-black text-white mb-2">{plan.name}</h3>
                  <p className="text-[#D8C08E] text-sm mb-4">{plan.description}</p>
                  
                  {/* Pricing */}
                  <div className="mb-4">
                    {plan.originalPrice && (
                      <div className="text-[#D8C08E] text-sm line-through mb-1">
                        ₱{plan.originalPrice.toLocaleString()}
                      </div>
                    )}
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-black text-[#BF9B30]">₱{plan.price.toLocaleString()}</span>
                      <span className="text-[#D8C08E] text-sm">{plan.period}</span>
                    </div>
                    {plan.savings && (
                      <div className="text-green-400 text-sm font-semibold mt-1">{plan.savings}</div>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleGetStarted(plan)}
                  className={`w-full py-3 rounded-xl font-bold mb-6 transition-all duration-200 will-change-[background-color,transform] ${
                    plan.highlighted
                      ? 'bg-[#BF9B30] text-[#0A0A1F] hover:bg-[#D8C08E] shadow-lg shadow-[#BF9B30]/30 hover:shadow-xl hover:shadow-[#BF9B30]/50'
                      : 'border-2 border-[#BF9B30] text-[#BF9B30] hover:bg-[#BF9B30] hover:text-[#0A0A1F] backdrop-blur-sm'
                  }`}
                >
                  Get Started
                </button>

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-3 text-[#D8C08E] text-sm">
                      <Check className="w-4 h-4 text-[#BF9B30] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#BF9B30]/0 via-[#BF9B30]/5 to-[#BF9B30]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Bottom Info */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 bg-[#0A0A1F]/60 backdrop-blur-sm border border-[#BF9B30]/30 rounded-xl px-6 py-4 mb-6">
              <Info className="w-5 h-5 text-[#BF9B30]" />
              <span className="text-[#D8C08E] text-sm">Membership rates subject to change. Terms and conditions apply.</span>
            </div>
            
            <div className="space-y-2">
              <p className="text-[#D8C08E] text-lg">Ready to transform your fitness journey?</p>
              <p className="text-white font-semibold">Join our community of 500+ active members!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Modal with pre-filled amount */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        prefilledAmount={selectedAmount}
        selectedPlan={selectedPlan}
      />
    </>
  );
}