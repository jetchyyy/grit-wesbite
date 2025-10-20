import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Save, Loader } from 'lucide-react';
import ImageUploadDropzone from '../../components/admin/ImageUploadDropzone';

interface HeroContent {
  backgroundImage: string;
  mainHeading: string;
  highlightWord1: string;
  highlightWord2: string;
  tagline: string;
  testimonialQuote: string;
  testimonialName: string;
  testimonialAchievement: string;
  testimonialImage: string;
  testimonialRating: number;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
}

export default function ManageHero() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<HeroContent>({
    backgroundImage: '/GritHero3.jpg',
    mainHeading: 'SWEAT',
    highlightWord1: 'GRIND',
    highlightWord2: 'GRIT',
    tagline: 'A judgment-free fitness community that inspires people to live a healthier, more fulfilling lifestyle',
    testimonialQuote: 'GRIT completely transformed my fitness journey. The trainers are incredible and the community is so supportive!',
    testimonialName: 'Jetch Merald',
    testimonialAchievement: 'Lost 25kg • 2 Years',
    testimonialImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150',
    testimonialRating: 5,
    stat1Value: '500+',
    stat1Label: 'Members',
    stat2Value: '8',
    stat2Label: 'Weekly Classes',
    stat3Value: '5★',
    stat3Label: 'Rating',
  });

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const fetchHeroContent = async () => {
    try {
      const docRef = doc(db, 'siteContent', 'hero');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setFormData(docSnap.data() as HeroContent);
      }
    } catch (error) {
      console.error('Error fetching hero content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackgroundImageUpload = (urls: string[]) => {
    if (urls.length > 0) {
      setFormData({ ...formData, backgroundImage: urls[0] });
    }
  };

  const handleTestimonialImageUpload = (urls: string[]) => {
    if (urls.length > 0) {
      setFormData({ ...formData, testimonialImage: urls[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await setDoc(doc(db, 'siteContent', 'hero'), formData);
      alert('Hero section updated successfully!');
    } catch (error) {
      console.error('Error saving hero content:', error);
      alert('Failed to save hero content');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-8 h-8 text-[#BF9B30] animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white mb-2">Manage Hero Section</h1>
        <p className="text-[#D8C08E]">Customize the main landing page hero section</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Background Image */}
        <div className="bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Background Image</h2>
          
          <div className="space-y-4">
            {formData.backgroundImage ? (
              <div className="relative">
                <img
                  src={formData.backgroundImage}
                  alt="Hero Background"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, backgroundImage: '' })}
                  className="absolute top-2 right-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-semibold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <ImageUploadDropzone
                onUploadComplete={handleBackgroundImageUpload}
                imageType="hero"
                maxFiles={1}
              />
            )}
          </div>
        </div>

        {/* Main Heading */}
        <div className="bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Main Heading</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-2">First Line (White)</label>
              <input
                type="text"
                value={formData.mainHeading}
                onChange={(e) => setFormData({ ...formData, mainHeading: e.target.value })}
                className="w-full bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white text-2xl font-black focus:outline-none focus:border-[#BF9B30]"
                placeholder="SWEAT"
                required
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Second Line (Gradient Gold)</label>
              <input
                type="text"
                value={formData.highlightWord1}
                onChange={(e) => setFormData({ ...formData, highlightWord1: e.target.value })}
                className="w-full bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-[#BF9B30] text-2xl font-black focus:outline-none focus:border-[#BF9B30]"
                placeholder="GRIND"
                required
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Third Line (Solid Gold)</label>
              <input
                type="text"
                value={formData.highlightWord2}
                onChange={(e) => setFormData({ ...formData, highlightWord2: e.target.value })}
                className="w-full bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-[#BF9B30] text-2xl font-black focus:outline-none focus:border-[#BF9B30]"
                placeholder="GRIT"
                required
              />
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Tagline</h2>
          
          <textarea
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="w-full bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-[#D8C08E] focus:outline-none focus:border-[#BF9B30] min-h-[100px]"
            placeholder="A judgment-free fitness community..."
            required
          />
        </div>

        {/* Testimonial */}
        <div className="bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Featured Testimonial</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-2">Testimonial Quote</label>
              <textarea
                value={formData.testimonialQuote}
                onChange={(e) => setFormData({ ...formData, testimonialQuote: e.target.value })}
                className="w-full bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30] min-h-[100px]"
                placeholder="Enter testimonial quote..."
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2">Member Name</label>
                <input
                  type="text"
                  value={formData.testimonialName}
                  onChange={(e) => setFormData({ ...formData, testimonialName: e.target.value })}
                  className="w-full bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                  placeholder="Jetch Merald"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Achievement</label>
                <input
                  type="text"
                  value={formData.testimonialAchievement}
                  onChange={(e) => setFormData({ ...formData, testimonialAchievement: e.target.value })}
                  className="w-full bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                  placeholder="Lost 25kg • 2 Years"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Member Photo</label>
              <div className="space-y-4">
                {formData.testimonialImage ? (
                  <div className="flex items-center gap-4">
                    <img
                      src={formData.testimonialImage}
                      alt="Testimonial"
                      className="w-24 h-24 rounded-full object-cover border-2 border-[#BF9B30]/30"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, testimonialImage: '' })}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <ImageUploadDropzone
                    onUploadComplete={handleTestimonialImageUpload}
                    imageType="testimonial"
                    maxFiles={1}
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, testimonialRating: star })}
                    className="transition-all hover:scale-110"
                  >
                    <svg
                      className={`w-8 h-8 ${
                        star <= formData.testimonialRating
                          ? 'text-[#BF9B30] fill-current'
                          : 'text-[#BF9B30]/30'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Statistics</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-white font-semibold mb-2">Stat 1 Value</label>
              <input
                type="text"
                value={formData.stat1Value}
                onChange={(e) => setFormData({ ...formData, stat1Value: e.target.value })}
                className="w-full bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-[#BF9B30] text-2xl font-black focus:outline-none focus:border-[#BF9B30]"
                placeholder="500+"
                required
              />
              <label className="block text-white font-semibold mb-2 mt-2">Label</label>
              <input
                type="text"
                value={formData.stat1Label}
                onChange={(e) => setFormData({ ...formData, stat1Label: e.target.value })}
                className="w-full bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                placeholder="Members"
                required
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Stat 2 Value</label>
              <input
                type="text"
                value={formData.stat2Value}
                onChange={(e) => setFormData({ ...formData, stat2Value: e.target.value })}
                className="w-full bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-[#BF9B30] text-2xl font-black focus:outline-none focus:border-[#BF9B30]"
                placeholder="8"
                required
              />
              <label className="block text-white font-semibold mb-2 mt-2">Label</label>
              <input
                type="text"
                value={formData.stat2Label}
                onChange={(e) => setFormData({ ...formData, stat2Label: e.target.value })}
                className="w-full bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                placeholder="Weekly Classes"
                required
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Stat 3 Value</label>
              <input
                type="text"
                value={formData.stat3Value}
                onChange={(e) => setFormData({ ...formData, stat3Value: e.target.value })}
                className="w-full bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-[#BF9B30] text-2xl font-black focus:outline-none focus:border-[#BF9B30]"
                placeholder="5★"
                required
              />
              <label className="block text-white font-semibold mb-2 mt-2">Label</label>
              <input
                type="text"
                value={formData.stat3Label}
                onChange={(e) => setFormData({ ...formData, stat3Label: e.target.value })}
                className="w-full bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                placeholder="Rating"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-[#BF9B30] text-[#0A0A1F] px-8 py-4 rounded-xl font-bold hover:bg-[#D8C08E] transition-all disabled:opacity-50 text-lg"
          >
            {saving ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Hero Section
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
