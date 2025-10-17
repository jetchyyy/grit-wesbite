import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-black border-t border-red-600/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-16 text-center">Get In Touch</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-red-600 mx-auto mb-4" />
            <h3 className="text-white font-bold mb-2">Location</h3>
            <p className="text-gray-400">Cebu City, Philippines</p>
          </div>
          <div className="text-center">
            <Phone className="w-8 h-8 text-red-600 mx-auto mb-4" />
            <h3 className="text-white font-bold mb-2">Phone</h3>
            <p className="text-gray-400">+63 (32) 123-4567</p>
          </div>
          <div className="text-center">
            <Mail className="w-8 h-8 text-red-600 mx-auto mb-4" />
            <h3 className="text-white font-bold mb-2">Email</h3>
            <p className="text-gray-400">info@gritgym.com</p>
          </div>
          <div className="text-center">
            <Clock className="w-8 h-8 text-red-600 mx-auto mb-4" />
            <h3 className="text-white font-bold mb-2">Hours</h3>
            <p className="text-gray-400">24/7 Access</p>
          </div>
        </div>

        <div className="bg-gray-900 border border-red-600/30 rounded-lg p-8">
          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full bg-gray-800 text-white rounded px-4 py-3 focus:outline-none focus:border-red-600" />
            <input type="email" placeholder="Your Email" className="w-full bg-gray-800 text-white rounded px-4 py-3 focus:outline-none focus:border-red-600" />
            <textarea placeholder="Your Message" rows={4} className="w-full bg-gray-800 text-white rounded px-4 py-3 focus:outline-none focus:border-red-600"></textarea>
            <button className="bg-red-600 text-white px-8 py-3 rounded font-bold hover:bg-red-700 transition w-full">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}
