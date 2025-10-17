export default function Testimonials() {
  const testimonials = [
    {
      name: 'Jetch Mereald',
      role: 'GRIT Member',
      text: 'GRIT completely transformed my fitness journey. The trainers are incredible and the community is so supportive!',
      image: '👩'
    },
    {
      name: 'Dan Ken Shen Penera',
      role: 'GRIT Member',
      text: 'Best gym in Cebu! The equipment is top-notch and the classes are always packed with energy and motivation.',
      image: '👨'
    },
    {
      name: 'Aliyah Galigao',
      role: 'GRIT Member',
      text: 'I went from zero fitness to competing in a CrossFit competition. GRIT made it possible with their expert guidance.',
      image: '👩'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 text-center">Member Success Stories</h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto text-lg">
          Real transformations from real members
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-gray-900 border border-red-600/20 rounded-lg p-8">
              <div className="text-4xl mb-4">{testimonial.image}</div>
              <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
              <div>
                <p className="text-white font-bold">{testimonial.name}</p>
                <p className="text-red-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
