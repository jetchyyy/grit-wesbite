import { Check } from 'lucide-react';
import { useState } from 'react';
import PaymentModal from './PaymentModal';

interface PricingPlan {
  name: string;
  price: number;
  period: string;
  features: string[];
  highlighted: boolean;
}

export default function Pricing() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans: PricingPlan[] = [
    {
      name: 'Walk In',
      price: 200,
      period: '/day',
      features: ['24/7 Gym Access', '5 Group Classes/Month', 'Basic Equipment Access', 'Community Support'],
      highlighted: false
    },
    {
      name: 'Monthly',
      price: 1200,
      period: '/month',
      features: ['24/7 Gym Access', 'Unlimited Group Classes', 'Personal Training Session (2x/month)', 'Nutrition Consultation', 'Locker & Shower Facilities'],
      highlighted: true
    },
    {
      name: 'Yearly',
      price: 7999,
      period: '/year',
      features: ['24/7 Gym Access', 'Unlimited Group Classes', 'Personal Training (4x/month)', 'Nutrition & Meal Planning', 'Priority Equipment Access', 'Exclusive Member Events'],
      highlighted: false
    }
  ];

  const handleGetStarted = (plan: PricingPlan) => {
    setSelectedAmount(plan.price);
    setSelectedPlan(plan.name);
    setIsPaymentModalOpen(true);
  };

  return (
    <>
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 text-center">Flexible Pricing Plans</h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto text-lg">
            Choose the plan that fits your fitness journey
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-lg p-8 transition ${
                  plan.highlighted
                    ? 'bg-red-600/10 border-2 border-red-600 scale-105'
                    : 'bg-gray-900 border border-gray-800 hover:border-red-600/50'
                }`}
              >
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-black text-red-600">₱{plan.price.toLocaleString()}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <button
                  onClick={() => handleGetStarted(plan)}
                  className={`w-full py-3 rounded-lg font-bold mb-6 transition ${
                    plan.highlighted
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'border border-red-600 text-red-600 hover:bg-red-600/10'
                  }`}
                >
                  Get Started
                </button>
                <ul className="space-y-4">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-red-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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