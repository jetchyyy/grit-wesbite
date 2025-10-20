import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { deleteImage } from '../../utils/imageUpload';
import { Plus, Edit2, Trash2, Save, X, Loader } from 'lucide-react';
import RichTextEditor from '../../components/admin/RichTextEditor';
import ImageUploadDropzone from '../../components/admin/ImageUploadDropzone';

interface Coach {
  id?: string;
  name: string;
  specialty: string;
  description: string;
  image: string;
  iconName: string;
  gallery?: string[];
  experience?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
}

export default function ManageCoaches() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCoach, setEditingCoach] = useState<Coach | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Coach>({
    name: '',
    specialty: '',
    description: '',
    image: '',
    iconName: 'Award',
    gallery: [],
    experience: '8+ Years',
    instagram: '',
    facebook: '',
    twitter: '',
  });

  useEffect(() => {
    fetchCoaches();
  }, []);

  const fetchCoaches = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'coaches'));
      const coachesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Coach[];
      setCoaches(coachesData);
    } catch (error) {
      console.error('Error fetching coaches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUploadComplete = (urls: string[]) => {
    if (urls.length > 0) {
      setFormData({ ...formData, image: urls[0] });
    }
  };

  const handleGalleryUploadComplete = (urls: string[]) => {
    const currentGallery = formData.gallery || [];
    setFormData({ ...formData, gallery: [...currentGallery, ...urls] });
  };

  const removeGalleryImage = (index: number) => {
    const updatedGallery = [...(formData.gallery || [])];
    updatedGallery.splice(index, 1);
    setFormData({ ...formData, gallery: updatedGallery });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert('Please upload an image');
      return;
    }

    setLoading(true);
    try {
      const { id, ...coachData } = formData;
      
      if (editingCoach?.id) {
        await updateDoc(doc(db, 'coaches', editingCoach.id), coachData);
      } else {
        await addDoc(collection(db, 'coaches'), coachData);
      }
      
      await fetchCoaches();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving coach:', error);
      alert('Failed to save coach');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (coach: Coach) => {
    setEditingCoach(coach);
    setFormData(coach);
    setIsModalOpen(true);
  };

  const handleDelete = async (coach: Coach) => {
    if (!window.confirm(`Are you sure you want to delete "${coach.name}"?`)) {
      return;
    }

    setLoading(true);
    try {
      // Try to delete images from storage, but don't fail if they don't exist
      if (coach.image) {
        try {
          await deleteImage(coach.image);
        } catch (imageError) {
          console.warn('Could not delete main image (it may not exist in storage):', imageError);
        }
      }

      // Try to delete gallery images
      if (coach.gallery && coach.gallery.length > 0) {
        for (const imgUrl of coach.gallery) {
          try {
            await deleteImage(imgUrl);
          } catch (imageError) {
            console.warn('Could not delete gallery image (it may not exist in storage):', imageError);
          }
        }
      }
      
      await deleteDoc(doc(db, 'coaches', coach.id!));
      alert('Coach deleted successfully!');
      await fetchCoaches();
    } catch (error) {
      console.error('Error deleting coach:', error);
      alert('Failed to delete coach');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCoach(null);
    setFormData({ 
      name: '', 
      specialty: '', 
      description: '', 
      image: '', 
      iconName: 'Award', 
      gallery: [],
      experience: '8+ Years',
      instagram: '',
      facebook: '',
      twitter: '',
    });
  };

  if (loading && coaches.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-8 h-8 text-[#BF9B30] animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">Manage Coaches</h1>
          <p className="text-[#D8C08E]">Add, edit, or delete coach profiles</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#BF9B30] text-[#0A0A1F] px-6 py-3 rounded-xl font-bold hover:bg-[#D8C08E] transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Add Coach
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {coaches.map((coach) => (
          <div
            key={coach.id}
            className="bg-[#0A0A1F]/60 backdrop-blur-xl border border-[#BF9B30]/30 rounded-2xl overflow-hidden hover:border-[#BF9B30]/60 transition-all"
          >
            <div className="relative h-64">
              <img
                src={coach.image}
                alt={coach.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A1F] via-transparent to-transparent"></div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-black text-white mb-2">{coach.name}</h3>
              <p className="text-[#BF9B30] text-sm font-semibold mb-4">{coach.specialty}</p>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(coach)}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#BF9B30]/20 border border-[#BF9B30] text-[#BF9B30] px-4 py-2 rounded-lg font-semibold hover:bg-[#BF9B30] hover:text-[#0A0A1F] transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(coach)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-500/20 border border-red-500 text-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 scrollbar-thin scrollbar-thumb-[#BF9B30]/60 scrollbar-track-[#0A0A1F]/80">
          <div className="bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#BF9B30]/60 scrollbar-track-[#0A0A1F]/80">
            <div className="sticky top-0 bg-[#0A0A1F] border-b border-[#BF9B30]/30 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-black text-white">
                {editingCoach ? 'Edit Coach' : 'Add New Coach'}
              </h2>
              <button onClick={handleCloseModal} className="text-[#D8C08E] hover:text-[#BF9B30]">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Coach Photo
                </label>
                <div className="space-y-4">
                  {formData.image ? (
                    <div className="relative">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: '' })}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <ImageUploadDropzone
                      onUploadComplete={handleImageUploadComplete}
                      imageType="coach"
                      maxFiles={1}
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Coach Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Specialty</label>
                <input
                  type="text"
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  placeholder="e.g., Strength & Conditioning"
                  className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Icon</label>
                <select
                  value={formData.iconName}
                  onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                  className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                  required
                >
                  <option value="Award">Award (Trophy)</option>
                  <option value="Target">Target (Bullseye)</option>
                  <option value="Heart">Heart</option>
                  <option value="Zap">Zap (Lightning)</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Experience</label>
                <input
                  type="text"
                  value={formData.experience || ''}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="e.g., 8+ Years Experience"
                  className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Instagram</label>
                  <input
                    type="text"
                    value={formData.instagram || ''}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="@username"
                    className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Facebook</label>
                  <input
                    type="text"
                    value={formData.facebook || ''}
                    onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                    placeholder="@username or URL"
                    className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Twitter</label>
                  <input
                    type="text"
                    value={formData.twitter || ''}
                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                    placeholder="@username"
                    className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Description</label>
                <RichTextEditor
                  content={formData.description}
                  onChange={(html) => setFormData({ ...formData, description: html })}
                  placeholder="Enter coach bio and qualifications..."
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Gallery Images <span className="text-[#D8C08E] text-sm font-normal">(Optional - for coach modal)</span>
                </label>
                <div className="space-y-4">
                  {formData.gallery && formData.gallery.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      {formData.gallery.map((img, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={img}
                            alt={`Gallery ${idx + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(idx)}
                            className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-lg hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <ImageUploadDropzone
                    onUploadComplete={handleGalleryUploadComplete}
                    imageType="coach"
                    maxFiles={5}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#BF9B30] text-[#0A0A1F] px-6 py-3 rounded-xl font-bold hover:bg-[#D8C08E] transition-all disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {editingCoach ? 'Update Coach' : 'Add Coach'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-3 border border-[#BF9B30]/30 text-[#D8C08E] rounded-xl font-semibold hover:border-[#BF9B30] transition-all"
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
