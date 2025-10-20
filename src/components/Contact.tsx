import { MapPin, Phone, Mail, Clock, Instagram, Music, Send, ExternalLink } from 'lucide-react';

export default function Contact() {
  const handleLocationClick = () => {
    window.open('https://maps.app.goo.gl/X8QERk2fWenvNVmK6', '_blank');
  };

  const handlePhoneClick = () => {
    window.open('tel:09177773090', '_self');
  };

  const handleEmailClick = () => {
    window.open('mailto:gritfitnesscebu@gmail.com', '_self');
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/gritfitnesscebu', '_blank');
  };

  const handleTiktokClick = () => {
    window.open('https://www.tiktok.com/@grit.fitness.gym', '_blank');
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A0A1F] via-[#0A0A1F] to-[#0A0A1F] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-64 h-64 bg-[#BF9B30]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-[#BF9B30]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Get In <span className="text-[#BF9B30]">Touch</span>
          </h2>
          <p className="text-[#D8C08E] text-lg md:text-xl max-w-2xl mx-auto">
            Ready to start your fitness journey? Contact us or visit our gym today!
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Location */}
          <div 
            onClick={handleLocationClick}
            className="group bg-[#0A0A1F]/60 backdrop-blur-xl border border-[#BF9B30]/30 rounded-2xl p-6 text-center hover:border-[#BF9B30]/60 hover:scale-105 transition-all duration-200 cursor-pointer hover:shadow-xl hover:shadow-[#BF9B30]/20 will-change-transform"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[#BF9B30]/20 border border-[#BF9B30] group-hover:bg-[#BF9B30] transition-all duration-200 mb-4 will-change-[background-color]">
              <MapPin className="w-8 h-8 text-[#BF9B30] group-hover:text-[#0A0A1F] transition-colors duration-200" />
            </div>
            <h3 className="text-white font-bold mb-2 group-hover:text-[#BF9B30] transition-colors">Location</h3>
            <p className="text-[#D8C08E] text-sm leading-relaxed">A-Strip Building, V. Rama Avenue, Cebu City, Philippines</p>
            <div className="flex items-center justify-center gap-2 mt-3 text-[#BF9B30] opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-medium">View on Maps</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>

          {/* Phone */}
          <div 
            onClick={handlePhoneClick}
            className="group bg-[#0A0A1F]/60 backdrop-blur-xl border border-[#BF9B30]/30 rounded-2xl p-6 text-center hover:border-[#BF9B30]/60 hover:scale-105 transition-all duration-200 cursor-pointer hover:shadow-xl hover:shadow-[#BF9B30]/20 will-change-transform"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[#BF9B30]/20 border border-[#BF9B30] group-hover:bg-[#BF9B30] transition-all duration-200 mb-4 will-change-[background-color]">
              <Phone className="w-8 h-8 text-[#BF9B30] group-hover:text-[#0A0A1F] transition-colors duration-200" />
            </div>
            <h3 className="text-white font-bold mb-2 group-hover:text-[#BF9B30] transition-colors">Phone</h3>
            <p className="text-[#D8C08E] text-lg font-semibold">0917 777 3090</p>
            <div className="flex items-center justify-center gap-2 mt-3 text-[#BF9B30] opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-medium">Call Now</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>

          {/* Email */}
          <div 
            onClick={handleEmailClick}
            className="group bg-[#0A0A1F]/60 backdrop-blur-xl border border-[#BF9B30]/30 rounded-2xl p-6 text-center hover:border-[#BF9B30]/60 hover:scale-105 transition-all duration-200 cursor-pointer hover:shadow-xl hover:shadow-[#BF9B30]/20 will-change-transform"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[#BF9B30]/20 border border-[#BF9B30] group-hover:bg-[#BF9B30] transition-all duration-200 mb-4 will-change-[background-color]">
              <Mail className="w-8 h-8 text-[#BF9B30] group-hover:text-[#0A0A1F] transition-colors duration-200" />
            </div>
            <h3 className="text-white font-bold mb-2 group-hover:text-[#BF9B30] transition-colors">Email</h3>
            <p className="text-[#D8C08E] text-sm">gritfitnesscebu@gmail.com</p>
            <div className="flex items-center justify-center gap-2 mt-3 text-[#BF9B30] opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-medium">Send Email</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>

          {/* Hours */}
          <div className="group bg-[#0A0A1F]/60 backdrop-blur-xl border border-[#BF9B30]/30 rounded-2xl p-6 text-center hover:border-[#BF9B30]/60 hover:scale-105 transition-all duration-200 will-change-transform">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[#BF9B30]/20 border border-[#BF9B30] group-hover:bg-[#BF9B30] transition-all duration-200 mb-4 will-change-[background-color]">
              <Clock className="w-8 h-8 text-[#BF9B30] group-hover:text-[#0A0A1F] transition-colors duration-200" />
            </div>
            <h3 className="text-white font-bold mb-2 group-hover:text-[#BF9B30] transition-colors">Hours</h3>
            <p className="text-[#D8C08E] text-lg font-semibold">10AM - 10PM</p>
            <p className="text-[#BF9B30] text-sm font-medium mt-1">Daily</p>
          </div>
        </div>

        {/* Social Media & Contact Form */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="group bg-[#0A0A1F]/60 backdrop-blur-xl border border-[#BF9B30]/30 rounded-2xl p-8 hover:border-[#BF9B30]/60 hover:shadow-xl hover:shadow-[#BF9B30]/10 transition-all duration-500">
            <h3 className="text-2xl font-black text-white mb-6 group-hover:text-[#BF9B30] transition-colors duration-300">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full bg-[#0A0A1F]/80 backdrop-blur-sm text-white rounded-xl px-6 py-4 border border-[#BF9B30]/30 focus:outline-none focus:border-[#BF9B30] focus:ring-2 focus:ring-[#BF9B30]/20 focus:bg-[#0A0A1F]/90 transition-all duration-300 placeholder-[#D8C08E]/60 hover:border-[#BF9B30]/50" 
                  />
                </div>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full bg-[#0A0A1F]/80 backdrop-blur-sm text-white rounded-xl px-6 py-4 border border-[#BF9B30]/30 focus:outline-none focus:border-[#BF9B30] focus:ring-2 focus:ring-[#BF9B30]/20 focus:bg-[#0A0A1F]/90 transition-all duration-300 placeholder-[#D8C08E]/60 hover:border-[#BF9B30]/50" 
                  />
                </div>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Subject" 
                  className="w-full bg-[#0A0A1F]/80 backdrop-blur-sm text-white rounded-xl px-6 py-4 border border-[#BF9B30]/30 focus:outline-none focus:border-[#BF9B30] focus:ring-2 focus:ring-[#BF9B30]/20 focus:bg-[#0A0A1F]/90 transition-all duration-300 placeholder-[#D8C08E]/60 hover:border-[#BF9B30]/50" 
                />
              </div>
              <div className="relative">
                <textarea 
                  placeholder="Your Message" 
                  rows={5} 
                  className="w-full bg-[#0A0A1F]/80 backdrop-blur-sm text-white rounded-xl px-6 py-4 border border-[#BF9B30]/30 focus:outline-none focus:border-[#BF9B30] focus:ring-2 focus:ring-[#BF9B30]/20 focus:bg-[#0A0A1F]/90 transition-all duration-300 placeholder-[#D8C08E]/60 resize-none hover:border-[#BF9B30]/50"
                ></textarea>
              </div>
              <button className="group/btn w-full bg-[#BF9B30] text-[#0A0A1F] px-8 py-4 rounded-xl font-bold hover:bg-[#D8C08E] transition-all duration-300 shadow-lg shadow-[#BF9B30]/30 hover:shadow-xl hover:shadow-[#BF9B30]/50 hover:-translate-y-1 flex items-center justify-center gap-3">
                <Send className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                Send Message
              </button>
            </form>
            
            {/* Subtle accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#BF9B30] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl"></div>
          </div>

          {/* Social Media & Info */}
          <div className="space-y-8">
            {/* Social Media */}
            <div className="bg-[#0A0A1F]/60 backdrop-blur-xl border border-[#BF9B30]/30 rounded-2xl p-8">
              <h3 className="text-2xl font-black text-white mb-6">Follow Us</h3>
              <div className="space-y-4">
                <button
                  onClick={handleInstagramClick}
                  className="group w-full flex items-center gap-4 bg-[#0A0A1F]/50 border border-[#BF9B30]/20 rounded-xl p-4 hover:border-[#BF9B30]/60 hover:bg-[#BF9B30]/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-white font-semibold group-hover:text-[#BF9B30] transition-colors">Instagram</div>
                    <div className="text-[#D8C08E] text-sm">@gritfitnesscebu</div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-[#BF9B30] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <button
                  onClick={handleTiktokClick}
                  className="group w-full flex items-center gap-4 bg-[#0A0A1F]/50 border border-[#BF9B30]/20 rounded-xl p-4 hover:border-[#BF9B30]/60 hover:bg-[#BF9B30]/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-black">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-white font-semibold group-hover:text-[#BF9B30] transition-colors">TikTok</div>
                    <div className="text-[#D8C08E] text-sm">@grit.fitness.cebu</div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-[#BF9B30] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                <button
                  onClick={() => window.open('https://www.facebook.com/gritfitnesscebu', '_blank')}
                  className="group w-full flex items-center gap-4 bg-[#0A0A1F]/50 border border-[#BF9B30]/20 rounded-xl p-4 hover:border-[#BF9B30]/60 hover:bg-[#BF9B30]/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400">
                    {/* Facebook SVG icon */}
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.408 24 22.674V1.326C24 .592 23.405 0 22.675 0" />
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-white font-semibold group-hover:text-[#BF9B30] transition-colors">Facebook</div>
                    <div className="text-[#D8C08E] text-sm">Grit Fitness Gym Cebu</div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-[#BF9B30] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-[#0A0A1F]/60 backdrop-blur-xl border border-[#BF9B30]/30 rounded-2xl p-8">
              <h3 className="text-2xl font-black text-white mb-6">Visit Our Gym</h3>
              <div className="space-y-4 text-[#D8C08E]">
                <p className="leading-relaxed">
                  Located in the heart of Cebu City, our modern facility offers state-of-the-art equipment and a welcoming community atmosphere.
                </p>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#BF9B30]" />
                  <span className="text-sm">Easy parking available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#BF9B30]" />
                  <span className="text-sm">Open 7 days a week</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
