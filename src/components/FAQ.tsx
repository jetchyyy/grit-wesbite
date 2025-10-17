import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "How much does GRIT Fitness Gym membership cost?",
      answer: "GRIT Fitness Gym offers flexible plans: Walk-in at ₱200/day, 1-month at ₱1,800, 3-months at ₱4,500 (save ₱900), 6-months at ₱7,800 (save ₱3,000), and 12-months at ₱14,000 (save ₱7,600)."
    },
    {
      question: "What are GRIT Fitness Gym's operating hours?",
      answer: "GRIT Fitness Gym is open daily from 10 AM to 10 PM at A-Strip Building, V. Rama Avenue, Cebu City. We're open 7 days a week including weekends and holidays."
    },
    {
      question: "What fitness classes does GRIT offer?",
      answer: "GRIT offers 8 weekly classes including POPHITS (Zumba-style dance), PRIME CONDITIONING (strength training), PULSE (cardio), COREX (core workout), RETRO DANCE FUZION (dance fitness), and MUAY THAI with expert instructors."
    },
    {
      question: "Where is GRIT Fitness Gym located in Cebu?",
      answer: "We're located at A-Strip Building, V. Rama Avenue, Cebu City. Easy parking is available, and we're accessible via public transportation."
    },
    {
      question: "Do you offer personal training services?",
      answer: "Yes! Our 6-month and 12-month memberships include personal training sessions. We also offer custom PT packages. Our certified trainers provide personalized workout plans tailored to your goals."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept GCash and Maya for convenient online payments. Walk-in payments can be made at our reception desk during operating hours."
    },
    {
      question: "Is there a student or senior citizen discount?",
      answer: "Yes! We offer 20% off for Students, Seniors, and PWD. Just present a valid ID when signing up to avail of the discount."
    },
    {
      question: "What equipment and facilities are available?",
      answer: "GRIT Fitness Gym features state-of-the-art equipment including cardio machines, free weights, strength training equipment, locker rooms, and shower facilities. All equipment is regularly maintained and sanitized."
    }
  ];

  // Generate FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A0A1F] via-[#0A0A1F] to-[#1A1A2F] relative overflow-hidden">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-[#BF9B30]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#BF9B30]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Frequently Asked <span className="text-[#BF9B30]">Questions</span>
          </h2>
          <p className="text-[#D8C08E] text-lg md:text-xl">
            Everything you need to know about GRIT Fitness Gym Cebu
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#0A0A1F]/60 backdrop-blur-xl border border-[#BF9B30]/30 rounded-2xl overflow-hidden hover:border-[#BF9B30]/60 transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3 className="text-lg md:text-xl font-bold text-white pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-[#BF9B30] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <div className="pt-2 border-t border-[#BF9B30]/20">
                    <p className="text-[#D8C08E] leading-relaxed mt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-[#D8C08E] mb-6">Still have questions?</p>
          <a
            href="#contact"
            className="inline-block bg-[#BF9B30] text-[#0A0A1F] px-10 py-4 rounded-xl hover:bg-[#D8C08E] transition-all duration-300 font-bold text-lg shadow-lg shadow-[#BF9B30]/30 hover:shadow-xl hover:shadow-[#BF9B30]/50 hover:-translate-y-1"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
