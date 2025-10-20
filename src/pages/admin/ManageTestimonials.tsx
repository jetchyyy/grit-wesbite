import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Plus, Edit2, Trash2, X, Loader, Star } from 'lucide-react';
import RichTextEditor from '../../components/admin/RichTextEditor';
import ImageUploadDropzone from '../../components/admin/ImageUploadDropzone';
import { deleteImage } from '../../utils/imageUpload';

interface Testimonial {
  id?: string;
  name: string;
  role: string;
  duration: string;
  achievement: string;
  text: string;
  image: string;
  rating: number;
}

export default function ManageTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Testimonial>({
    name: '',
    role: 'GRIT Member',
    duration: '',
    achievement: '',
    text: '',
    image: '',
    rating: 5,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'testimonials'));
      const testimonialsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Testimonial[];
      setTestimonials(testimonialsData);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      alert('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUploadComplete = (urls: string[]) => {
    if (urls.length > 0) {
      setFormData({ ...formData, image: urls[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert('Please upload an image');
      return;
    }

    setLoading(true);
    try {
      if (editingTestimonial?.id) {
        // Update existing testimonial
        await updateDoc(doc(db, 'testimonials', editingTestimonial.id), {
          name: formData.name,
          role: formData.role,
          duration: formData.duration,
          achievement: formData.achievement,
          text: formData.text,
          image: formData.image,
          rating: formData.rating,
        });
        alert('Testimonial updated successfully!');
      } else {
        // Add new testimonial
        await addDoc(collection(db, 'testimonials'), {
          name: formData.name,
          role: formData.role,
          duration: formData.duration,
          achievement: formData.achievement,
          text: formData.text,
          image: formData.image,
          rating: formData.rating,
        });
        alert('Testimonial added successfully!');
      }
      handleCloseModal();
      fetchTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Failed to save testimonial. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      duration: testimonial.duration,
      achievement: testimonial.achievement,
      text: testimonial.text,
      image: testimonial.image,
      rating: testimonial.rating,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (testimonial: Testimonial) => {
    if (!window.confirm(`Are you sure you want to delete ${testimonial.name}'s testimonial?`)) {
      return;
    }

    setLoading(true);
    try {
      // Try to delete image from storage, but don't fail if it doesn't exist
      if (testimonial.image) {
        try {
          await deleteImage(testimonial.image);
        } catch (imageError) {
          console.warn('Could not delete image (it may not exist in storage):', imageError);
          // Continue with testimonial deletion even if image deletion fails
        }
      }
      
      // Delete testimonial from Firestore
      await deleteDoc(doc(db, 'testimonials', testimonial.id!));
      alert('Testimonial deleted successfully!');
      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Failed to delete testimonial. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
    setFormData({
      name: '',
      role: 'GRIT Member',
      duration: '',
      achievement: '',
      text: '',
      image: '',
      rating: 5,
    });
  };

  if (loading && testimonials.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-8 h-8 text-[#BF9B30] animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">Manage Testimonials</h1>
          <p className="text-[#D8C08E]">Create and manage member success stories</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#BF9B30] text-[#0A0A1F] px-6 py-3 rounded-xl font-bold hover:bg-[#D8C08E] transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Testimonial
        </button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl p-6 hover:border-[#BF9B30] transition-all"
          >
            {/* Image & Rating */}
            <div className="flex items-start justify-between mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-[#BF9B30]/30"
              />
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#BF9B30] fill-current" />
                ))}
              </div>
            </div>

            {/* Name & Role */}
            <h3 className="text-white font-bold text-lg mb-1">{testimonial.name}</h3>
            <p className="text-[#BF9B30] text-sm mb-2">{testimonial.role}</p>

            {/* Stats */}
            <div className="flex gap-4 text-xs text-[#D8C08E] mb-4">
              <span>📅 {testimonial.duration}</span>
              <span>🏆 {testimonial.achievement}</span>
            </div>

            {/* Text Preview */}
            <p className="text-[#D8C08E] text-sm mb-4 line-clamp-3">
              {testimonial.text.replace(/<[^>]*>/g, '')}
            </p>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(testimonial)}
                className="flex-1 flex items-center justify-center gap-2 bg-[#BF9B30]/20 text-[#BF9B30] px-4 py-2 rounded-lg font-semibold hover:bg-[#BF9B30]/30 transition-all"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(testimonial)}
                className="flex items-center justify-center gap-2 bg-red-600/20 text-red-400 px-4 py-2 rounded-lg font-semibold hover:bg-red-600/30 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {testimonials.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[#D8C08E] text-lg mb-4">No testimonials yet</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#BF9B30] text-[#0A0A1F] px-6 py-3 rounded-xl font-bold hover:bg-[#D8C08E] transition-all"
          >
            Add Your First Testimonial
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0A0A1F] border border-[#BF9B30] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#BF9B30]/30">
              <h2 className="text-2xl font-black text-white">
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h2>
              <button onClick={handleCloseModal} className="text-[#D8C08E] hover:text-[#BF9B30]">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Member Photo */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Member Photo
                </label>
                <div className="space-y-4">
                  {formData.image ? (
                    <div className="relative inline-block">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-32 h-32 rounded-full object-cover border-4 border-[#BF9B30]/30"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: '' })}
                        className="absolute top-0 right-0 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <ImageUploadDropzone
                      onUploadComplete={handleImageUploadComplete}
                      imageType="testimonial"
                      maxFiles={1}
                    />
                  )}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-white font-semibold mb-2">Member Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                  required
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-white font-semibold mb-2">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                  placeholder="e.g., GRIT Member, Personal Trainer, etc."
                  required
                />
              </div>

              {/* Duration & Achievement */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                    placeholder="e.g., 2 Years"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Achievement</label>
                  <input
                    type="text"
                    value={formData.achievement}
                    onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
                    className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                    placeholder="e.g., Lost 25kg"
                    required
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-white font-semibold mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="transition-all hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= formData.rating
                            ? 'text-[#BF9B30] fill-current'
                            : 'text-[#BF9B30]/30'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <div>
                <label className="block text-white font-semibold mb-2">Testimonial</label>
                <RichTextEditor
                  content={formData.text}
                  onChange={(html) => setFormData({ ...formData, text: html })}
                  placeholder="Enter member testimonial and success story..."
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#BF9B30] text-[#0A0A1F] px-6 py-3 rounded-xl font-bold hover:bg-[#D8C08E] transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>{editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-3 rounded-xl font-bold border border-[#BF9B30]/30 text-[#D8C08E] hover:border-[#BF9B30] transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
