import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy, Timestamp, serverTimestamp } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import { Search, Filter, Image as ImageIcon, Trash2, Upload, Calendar, HardDrive, X, ExternalLink, Download } from 'lucide-react';
import ImageUploadDropzone from '../../components/admin/ImageUploadDropzone';

interface MediaItem {
  id: string;
  url: string;
  name: string;
  type: 'class' | 'coach' | 'testimonial' | 'other';
  size: number;
  uploadedAt: Timestamp;
  folder: string;
}

export default function MediaLibrary() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [uploadType, setUploadType] = useState<'class' | 'coach' | 'testimonial' | 'other'>('other');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const q = query(collection(db, 'media'), orderBy('uploadedAt', 'desc'));
      const snapshot = await getDocs(q);
      const mediaData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as MediaItem));
      setMedia(mediaData);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = async (urls: string[]) => {
    try {
      // Save each uploaded image metadata to Firestore
      for (const url of urls) {
        const fileName = url.split('/').pop()?.split('?')[0] || 'unknown';
        const decodedName = decodeURIComponent(fileName);
        
        await addDoc(collection(db, 'media'), {
          url,
          name: decodedName,
          type: uploadType,
          size: 0, // Size is handled by uploadImage utility
          uploadedAt: serverTimestamp(),
          folder: uploadType === 'other' ? 'media' : `${uploadType}s`
        });
      }
      
      await fetchMedia();
      setIsUploadModalOpen(false);
      setUploadType('other');
    } catch (error) {
      console.error('Error saving media metadata:', error);
      alert('Failed to save media metadata');
    }
  };

  const deleteMedia = async (mediaItem: MediaItem) => {
    if (!confirm(`Are you sure you want to delete "${mediaItem.name}"? This cannot be undone.`)) {
      return;
    }

    setDeleting(mediaItem.id);
    try {
      // Extract the file path from the URL
      const urlParts = mediaItem.url.split('/o/')[1];
      if (urlParts) {
        const filePath = decodeURIComponent(urlParts.split('?')[0]);
        const fileRef = ref(storage, filePath);
        
        // Delete from Storage
        await deleteObject(fileRef);
      }
      
      // Delete from Firestore
      await deleteDoc(doc(db, 'media', mediaItem.id));
      
      await fetchMedia();
      setSelectedMedia(null);
    } catch (error) {
      console.error('Error deleting media:', error);
      alert('Failed to delete media. It may be in use by content.');
    } finally {
      setDeleting(null);
    }
  };

  const filteredMedia = media.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return 'N/A';
    return timestamp.toDate().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return 'N/A';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const stats = {
    total: media.length,
    classes: media.filter(m => m.type === 'class').length,
    coaches: media.filter(m => m.type === 'coach').length,
    testimonials: media.filter(m => m.type === 'testimonial').length,
    other: media.filter(m => m.type === 'other').length
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'class':
        return 'text-blue-400 bg-blue-400/20';
      case 'coach':
        return 'text-green-400 bg-green-400/20';
      case 'testimonial':
        return 'text-purple-400 bg-purple-400/20';
      default:
        return 'text-[#D8C08E] bg-[#D8C08E]/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Media Library</h1>
          <p className="text-[#D8C08E]">Manage all your uploaded images</p>
        </div>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#BF9B30] text-[#0A0A1F] px-6 py-3 rounded-xl font-bold hover:bg-[#D8C08E] transition-all"
        >
          <Upload className="w-5 h-5" />
          Upload Media
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[#D8C08E] text-sm">Total</p>
            <ImageIcon className="w-5 h-5 text-[#BF9B30]" />
          </div>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>

        <div className="bg-[#1A1A2F] border border-blue-400/30 rounded-xl p-4">
          <p className="text-[#D8C08E] text-sm mb-2">Classes</p>
          <p className="text-2xl font-bold text-white">{stats.classes}</p>
        </div>

        <div className="bg-[#1A1A2F] border border-green-400/30 rounded-xl p-4">
          <p className="text-[#D8C08E] text-sm mb-2">Coaches</p>
          <p className="text-2xl font-bold text-white">{stats.coaches}</p>
        </div>

        <div className="bg-[#1A1A2F] border border-purple-400/30 rounded-xl p-4">
          <p className="text-[#D8C08E] text-sm mb-2">Testimonials</p>
          <p className="text-2xl font-bold text-white">{stats.testimonials}</p>
        </div>

        <div className="bg-[#1A1A2F] border border-[#D8C08E]/30 rounded-xl p-4">
          <p className="text-[#D8C08E] text-sm mb-2">Other</p>
          <p className="text-2xl font-bold text-white">{stats.other}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D8C08E]" />
            <input
              type="text"
              placeholder="Search by name or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
            />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D8C08E]" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl pl-12 pr-8 py-3 text-white focus:outline-none focus:border-[#BF9B30] appearance-none cursor-pointer min-w-[180px]"
            >
              <option value="all">All Types</option>
              <option value="class">Classes</option>
              <option value="coach">Coaches</option>
              <option value="testimonial">Testimonials</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-xl p-6">
        {loading ? (
          <div className="py-16 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#BF9B30]"></div>
            <p className="text-[#D8C08E] mt-4">Loading media...</p>
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="py-16 text-center">
            <ImageIcon className="w-16 h-16 text-[#BF9B30]/50 mx-auto mb-4" />
            <p className="text-[#D8C08E] text-lg mb-2">No media found</p>
            {searchTerm || typeFilter !== 'all' ? (
              <p className="text-[#D8C08E]/70 text-sm">Try adjusting your search or filters</p>
            ) : (
              <p className="text-[#D8C08E]/70 text-sm">Upload some images to get started</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedMedia(item)}
                className="group relative bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl overflow-hidden hover:border-[#BF9B30] transition-all cursor-pointer"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <p className="text-white text-sm font-semibold truncate mb-2">{item.name}</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getTypeColor(item.type)}`}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-sm">Click to view details</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A2F] border-2 border-[#BF9B30] rounded-2xl max-w-2xl w-full">
            <div className="border-b border-[#BF9B30]/30 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-black text-white">Upload Media</h2>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-[#D8C08E] hover:text-[#BF9B30]">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">Media Type</label>
                <select
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value as any)}
                  className="w-full bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#BF9B30]"
                >
                  <option value="class">Class Images</option>
                  <option value="coach">Coach Photos</option>
                  <option value="testimonial">Testimonial Photos</option>
                  <option value="other">Other Media</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Upload Images</label>
                <ImageUploadDropzone
                  onUploadComplete={handleUploadComplete}
                  imageType={uploadType === 'other' ? 'class' : uploadType}
                  maxFiles={10}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media Detail Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1A2F] border-2 border-[#BF9B30] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1A1A2F] border-b border-[#BF9B30]/30 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-black text-white">Media Details</h2>
              <button onClick={() => setSelectedMedia(null)} className="text-[#D8C08E] hover:text-[#BF9B30]">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Image Preview */}
              <div className="bg-[#0A0A1F] rounded-xl overflow-hidden">
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.name}
                  className="w-full h-auto max-h-96 object-contain"
                />
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl p-4">
                  <p className="text-[#D8C08E] text-sm mb-1">File Name</p>
                  <p className="text-white font-semibold break-all">{selectedMedia.name}</p>
                </div>

                <div className="bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl p-4">
                  <p className="text-[#D8C08E] text-sm mb-1">Type</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getTypeColor(selectedMedia.type)}`}>
                    {selectedMedia.type.charAt(0).toUpperCase() + selectedMedia.type.slice(1)}
                  </span>
                </div>

                <div className="bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl p-4">
                  <p className="text-[#D8C08E] text-sm mb-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Upload Date
                  </p>
                  <p className="text-white font-semibold">{formatDate(selectedMedia.uploadedAt)}</p>
                </div>

                <div className="bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl p-4">
                  <p className="text-[#D8C08E] text-sm mb-1 flex items-center gap-2">
                    <HardDrive className="w-4 h-4" />
                    File Size
                  </p>
                  <p className="text-white font-semibold">{formatSize(selectedMedia.size)}</p>
                </div>
              </div>

              {/* URL */}
              <div className="bg-[#0A0A1F] border border-[#BF9B30]/30 rounded-xl p-4">
                <p className="text-[#D8C08E] text-sm mb-2">Image URL</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={selectedMedia.url}
                    readOnly
                    className="flex-1 bg-[#1A1A2F] border border-[#BF9B30]/30 rounded-lg px-3 py-2 text-white text-sm font-mono"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedMedia.url);
                      alert('URL copied to clipboard!');
                    }}
                    className="px-4 py-2 bg-[#BF9B30] text-[#0A0A1F] rounded-lg font-semibold hover:bg-[#D8C08E] transition-all"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <a
                  href={selectedMedia.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#BF9B30]/20 border border-[#BF9B30] text-[#BF9B30] px-6 py-3 rounded-xl font-bold hover:bg-[#BF9B30]/30 transition-all"
                >
                  <ExternalLink className="w-5 h-5" />
                  Open in New Tab
                </a>
                <a
                  href={selectedMedia.url}
                  download
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600/20 border border-blue-400 text-blue-400 px-6 py-3 rounded-xl font-bold hover:bg-blue-600/30 transition-all"
                >
                  <Download className="w-5 h-5" />
                  Download
                </a>
                <button
                  onClick={() => deleteMedia(selectedMedia)}
                  disabled={deleting === selectedMedia.id}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600/20 border border-red-400 text-red-400 px-6 py-3 rounded-xl font-bold hover:bg-red-600/30 transition-all disabled:opacity-50"
                >
                  {deleting === selectedMedia.id ? (
                    <>
                      <div className="w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-5 h-5" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
