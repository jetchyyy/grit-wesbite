import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { deleteImage } from '../../utils/imageUpload';
import { Plus, Edit2, Trash2, Save, X, Loader } from 'lucide-react';
import RichTextEditor from '../../components/admin/RichTextEditor';
import ImageUploadDropzone from '../../components/admin/ImageUploadDropzone';

interface Class {
  id?: string;
  name: string;
  instructor: string;
  day: string;
  time: string;
  image: string;
  description: string;
  iconName: string;
  color: string;
  gallery?: string[];
}

export default function ManageClasses() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Class>({
    name: '',
    instructor: '',
    day: '',
    time: '',
    image: '',
    description: '',
    iconName: 'Dumbbell',
    color: 'from-blue-500/20 to-cyan-500/20',
    gallery: [],
  });

  // Fetch classes from Firestore
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'classes'));
      const classesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Class[];
      setClasses(classesData);
    } catch (error) {
      console.error('Error fetching classes:', error);
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
    const newGallery = [...(formData.gallery || [])];
    newGallery.splice(index, 1);
    setFormData({ ...formData, gallery: newGallery });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert('Please upload an image');
      return;
    }

    setLoading(true);
    try {
      const { id, ...classData } = formData;
      
      if (editingClass?.id) {
        // Update existing class
        await updateDoc(doc(db, 'classes', editingClass.id), classData);
      } else {
        // Add new class
        await addDoc(collection(db, 'classes'), classData);
      }
      
      await fetchClasses();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving class:', error);
      alert('Failed to save class');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (classItem: Class) => {
    setEditingClass(classItem);
    setFormData(classItem);
    setIsModalOpen(true);
  };

  const handleDelete = async (classItem: Class) => {
    if (!window.confirm(`Are you sure you want to delete "${classItem.name}"?`)) {
      return;
    }

    setLoading(true);
    try {
      // Try to delete images from storage, but don't fail if they don't exist
      if (classItem.image) {
        try {
          await deleteImage(classItem.image);
        } catch (imageError) {
          console.warn('Could not delete main image (it may not exist in storage):', imageError);
        }
      }

      // Try to delete gallery images
      if (classItem.gallery && classItem.gallery.length > 0) {
        for (const imgUrl of classItem.gallery) {
          try {
            await deleteImage(imgUrl);
          } catch (imageError) {
            console.warn('Could not delete gallery image (it may not exist in storage):', imageError);
          }
        }
      }
      
      // Delete document from Firestore
      await deleteDoc(doc(db, 'classes', classItem.id!));
      alert('Class deleted successfully!');
      await fetchClasses();
    } catch (error) {
      console.error('Error deleting class:', error);
      alert('Failed to delete class');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingClass(null);
    setFormData({
      name: '',
      instructor: '',
      day: '',
      time: '',
      image: '',
      description: '',
      iconName: 'Dumbbell',
      color: 'from-blue-500/20 to-cyan-500/20',
      gallery: [],
    });
  };

  if (loading && classes.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-8 h-8 text-[#BF9B30] animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">Manage Classes</h1>
          <p className="text-[#D8C08E]">Add, edit, or delete gym classes</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#BF9B30] text-[#0A0A1F] px-6 py-3 rounded-xl font-bold hover:bg-[#D8C08E] transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Add Class
        </button>
      </div>

      {/* Classes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <div
            key={classItem.id}
            className="bg-[#0A0A1F]/60 backdrop-blur-xl border border-[#BF9B30]/30 rounded-2xl overflow-hidden hover:border-[#BF9B30]/60 transition-all"
          >
            <div className="relative h-48">
              <img
                src={classItem.image}
                alt={classItem.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A1F] via-transparent to-transparent"></div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-black text-white mb-2">{classItem.name}</h3>
              <p className="text-[#BF9B30] text-sm font-semibold mb-2">
                {classItem.instructor}
              </p>
              <p className="text-[#D8C08E] text-sm mb-4">
                {classItem.day} • {classItem.time}
              </p>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(classItem)}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#BF9B30]/20 border border-[#BF9B30] text-[#BF9B30] px-4 py-2 rounded-lg font-semibold hover:bg-[#BF9B30] hover:text-[#0A0A1F] transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(classItem)}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#0A0A1F] border-b border-[#BF9B30]/30 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-black text-white">
                {editingClass ? 'Edit Class' : 'Add New Class'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-[#D8C08E] hover:text-[#BF9B30] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Class Image
                </label>
                {formData.image ? (
                  <div className="space-y-4">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: '' })}
                      className="text-red-500 text-sm hover:text-red-400"
                    >
                      Remove image
                    </button>
                  </div>
                ) : (
                  <ImageUploadDropzone
                    onUploadComplete={handleImageUploadComplete}
                    imageType="class"
                    multiple={false}
                  />
                )}
              </div>

              {/* Name */}
              <div>
                <label className="block text-white font-semibold mb-2">Class Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                  required
                />
              </div>

              {/* Instructor */}
              <div>
                <label className="block text-white font-semibold mb-2">Instructor</label>
                <input
                  type="text"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                  required
                />
              </div>

              {/* Day & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Day</label>
                  <input
                    type="text"
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                    placeholder="e.g., Monday & Wednesday"
                    className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Time</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="e.g., 6:00 AM"
                    className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                    required
                  />
                </div>
              </div>

              {/* Icon & Color */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Icon</label>
                  <select
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                    required
                  >
                    <option value="Dumbbell">Dumbbell (Strength)</option>
                    <option value="Music">Music (Dance/Cardio)</option>
                    <option value="Heart">Heart (Wellness)</option>
                    <option value="Flame">Flame (Intense/HIIT)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Color Theme</label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                    required
                  >
                    <option value="from-purple-500/20 to-pink-500/20">Purple/Pink</option>
                    <option value="from-blue-500/20 to-cyan-500/20">Blue/Cyan</option>
                    <option value="from-red-500/20 to-orange-500/20">Red/Orange</option>
                    <option value="from-yellow-500/20 to-amber-500/20">Yellow/Amber</option>
                    <option value="from-green-500/20 to-emerald-500/20">Green/Emerald</option>
                    <option value="from-indigo-500/20 to-violet-500/20">Indigo/Violet</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-white font-semibold mb-2">Description</label>
                <RichTextEditor
                  content={formData.description}
                  onChange={(html) => setFormData({ ...formData, description: html })}
                  placeholder="Enter class description..."
                />
              </div>

              {/* Gallery Images */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Gallery Images <span className="text-[#D8C08E] text-sm font-normal">(Optional - for class modal)</span>
                </label>
                
                {/* Display existing gallery images */}
                {formData.gallery && formData.gallery.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {formData.gallery.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imageUrl}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload more gallery images */}
                <ImageUploadDropzone
                  onUploadComplete={handleGalleryUploadComplete}
                  imageType="class"
                  maxFiles={5}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#BF9B30] text-[#0A0A1F] px-6 py-3 rounded-xl font-bold hover:bg-[#D8C08E] transition-all disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {editingClass ? 'Update Class' : 'Add Class'}
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
