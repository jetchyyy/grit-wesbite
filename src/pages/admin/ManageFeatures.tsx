import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { deleteImage } from '../../utils/imageUpload';
import { Plus, Edit2, Trash2, Save, X, Loader } from 'lucide-react';
import RichTextEditor from '../../components/admin/RichTextEditor';
import ImageUploadDropzone from '../../components/admin/ImageUploadDropzone';

interface Feature {
  id?: string;
  title: string;
  description: string;
  image: string;
  iconName: string;
  fullDescription: string;
  benefits: string[];
  gallery?: string[];
}

export default function ManageFeatures() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Feature>({
    title: '',
    description: '',
    image: '',
    iconName: 'Zap',
    fullDescription: '',
    benefits: [''],
    gallery: [],
  });

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'features'));
      const featuresData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Feature[];
      setFeatures(featuresData);
    } catch (error) {
      console.error('Error fetching features:', error);
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

  const handleAddBenefit = () => {
    setFormData({ ...formData, benefits: [...formData.benefits, ''] });
  };

  const handleRemoveBenefit = (index: number) => {
    const updatedBenefits = formData.benefits.filter((_, i) => i !== index);
    setFormData({ ...formData, benefits: updatedBenefits });
  };

  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...formData.benefits];
    updatedBenefits[index] = value;
    setFormData({ ...formData, benefits: updatedBenefits });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert('Please upload a feature image');
      return;
    }

    // Filter out empty benefits
    const filteredBenefits = formData.benefits.filter(b => b.trim() !== '');
    if (filteredBenefits.length === 0) {
      alert('Please add at least one benefit');
      return;
    }

    setLoading(true);
    try {
      const featureData = {
        ...formData,
        benefits: filteredBenefits,
      };

      const { id, ...dataToSave } = featureData;

      if (editingFeature?.id) {
        await updateDoc(doc(db, 'features', editingFeature.id), dataToSave);
        alert('Feature updated successfully!');
      } else {
        await addDoc(collection(db, 'features'), dataToSave);
        alert('Feature added successfully!');
      }

      await fetchFeatures();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving feature:', error);
      alert('Failed to save feature');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (feature: Feature) => {
    setEditingFeature(feature);
    setFormData(feature);
    setIsModalOpen(true);
  };

  const handleDelete = async (feature: Feature) => {
    if (!window.confirm(`Are you sure you want to delete "${feature.title}"?`)) {
      return;
    }

    setLoading(true);
    try {
      // Try to delete images from storage
      if (feature.image) {
        try {
          await deleteImage(feature.image);
        } catch (imageError) {
          console.warn('Could not delete main image:', imageError);
        }
      }

      // Try to delete gallery images
      if (feature.gallery && feature.gallery.length > 0) {
        for (const imgUrl of feature.gallery) {
          try {
            await deleteImage(imgUrl);
          } catch (imageError) {
            console.warn('Could not delete gallery image:', imageError);
          }
        }
      }

      await deleteDoc(doc(db, 'features', feature.id!));
      alert('Feature deleted successfully!');
      await fetchFeatures();
    } catch (error) {
      console.error('Error deleting feature:', error);
      alert('Failed to delete feature');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFeature(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      iconName: 'Zap',
      fullDescription: '',
      benefits: [''],
      gallery: [],
    });
  };

  if (loading && features.length === 0) {
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
          <h1 className="text-4xl font-black text-white mb-2">Manage Features</h1>
          <p className="text-[#D8C08E]">Showcase why members should choose GRIT</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#BF9B30] text-[#0A0A1F] px-6 py-3 rounded-xl font-bold hover:bg-[#D8C08E] transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Add Feature
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-[#0A0A1F]/60 backdrop-blur-xl border border-[#BF9B30]/30 rounded-2xl overflow-hidden hover:border-[#BF9B30]/60 transition-all"
          >
            <div className="relative h-48">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A1F] via-transparent to-transparent"></div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-black text-white mb-2">{feature.title}</h3>
              <p className="text-[#D8C08E] text-sm mb-4 line-clamp-2">
                {feature.description.replace(/<[^>]*>/g, '')}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(feature)}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#BF9B30]/20 border border-[#BF9B30] text-[#BF9B30] px-4 py-2 rounded-lg font-semibold hover:bg-[#BF9B30] hover:text-[#0A0A1F] transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(feature)}
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#BF9B30]/60 scrollbar-track-[#0A0A1F]/80">
            <div className="sticky top-0 bg-[#0A0A1F] border-b border-[#BF9B30]/30 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-black text-white">
                {editingFeature ? 'Edit Feature' : 'Add New Feature'}
              </h2>
              <button onClick={handleCloseModal} className="text-[#D8C08E] hover:text-[#BF9B30]">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Feature Image
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
                      imageType="feature"
                      maxFiles={1}
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Feature Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                  placeholder="e.g., State-of-the-Art Equipment"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Short Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                  placeholder="Brief description shown on feature card"
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
                  <option value="Zap">Zap (Lightning)</option>
                  <option value="Users">Users (Community)</option>
                  <option value="Trophy">Trophy (Achievement)</option>
                  <option value="Heart">Heart</option>
                  <option value="Dumbbell">Dumbbell (Strength)</option>
                  <option value="Target">Target (Goals)</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Full Description</label>
                <RichTextEditor
                  content={formData.fullDescription}
                  onChange={(html) => setFormData({ ...formData, fullDescription: html })}
                  placeholder="Detailed description shown in the feature modal..."
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Benefits</label>
                <div className="space-y-3">
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => handleBenefitChange(index, e.target.value)}
                        className="flex-1 bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                        placeholder={`Benefit ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveBenefit(index)}
                        className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddBenefit}
                    className="w-full bg-[#BF9B30]/20 border border-[#BF9B30] text-[#BF9B30] px-4 py-3 rounded-xl hover:bg-[#BF9B30] hover:text-[#0A0A1F] transition-all font-semibold"
                  >
                    + Add Benefit
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Gallery Images <span className="text-[#D8C08E] text-sm font-normal">(Optional - for feature modal)</span>
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
                    imageType="feature"
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
                  {editingFeature ? 'Update Feature' : 'Add Feature'}
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
