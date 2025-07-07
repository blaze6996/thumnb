import React, { useState, useEffect } from 'react';
import { ExternalLink, Heart, Eye, Filter, Upload, X } from 'lucide-react';
import { getThumbnails } from '../utils/database';
import type { Database } from '../lib/supabase';

type ThumbnailRow = Database['public']['Tables']['thumbnails']['Row'];

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showUpload, setShowUpload] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<ThumbnailRow[]>([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState<ThumbnailRow | null>(null);
  const [loading, setLoading] = useState(true);

  // Load thumbnails on component mount
  useEffect(() => {
    const loadThumbnails = async () => {
      try {
        setLoading(true);
        const thumbnails = await getThumbnails();
        setPortfolioItems(thumbnails);
      } catch (error) {
        console.error('Error loading thumbnails:', error);
      } finally {
        setLoading(false);
      }
    };

    loadThumbnails();
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedThumbnail(null);
      }
    };

    if (selectedThumbnail) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedThumbnail]);

  const categories = [
    { id: 'all', name: 'All Content', count: portfolioItems.length },
    { id: 'builds', name: 'Builds', count: portfolioItems.filter(item => item.category === 'builds').length },
    { id: 'tutorials', name: 'Tutorials', count: portfolioItems.filter(item => item.category === 'tutorials').length },
    { id: 'survival', name: 'Survival', count: portfolioItems.filter(item => item.category === 'survival').length },
    { id: 'updates', name: 'Updates', count: portfolioItems.filter(item => item.category === 'updates').length }
  ];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailClick = (item: ThumbnailRow) => {
    setSelectedThumbnail(item);
  };

  const handleDownloadThumbnail = (item: ThumbnailRow) => {
    const link = document.createElement('a');
    link.href = item.image_url;
    link.download = `${item.title.replace(/\s+/g, '_').toLowerCase()}_thumbnail.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <section id="portfolio" className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading portfolio...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Minecraft <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Check out my latest Minecraft thumbnail designs that helped creators boost their views and engagement across builds, tutorials, and adventures.
          </p>
        </div>

        {/* Upload Reference Section */}
        <div className="mb-12 text-center">
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Reference Thumbnail
          </button>
          
          {showUpload && (
            <div className="mt-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Upload Your Reference</h3>
                <button
                  onClick={() => setShowUpload(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <p className="text-gray-300 mb-6">
                Upload a thumbnail you like as reference for your custom design. This helps me understand your style preferences.
              </p>
              
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <label htmlFor="thumbnail-upload" className="cursor-pointer">
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <img
                        src={uploadedImage}
                        alt="Uploaded reference"
                        className="max-w-full h-48 object-contain mx-auto rounded-lg"
                      />
                      <p className="text-green-400 font-semibold">Reference uploaded successfully!</p>
                      <p className="text-gray-400 text-sm">Click to change image</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-white font-semibold">Click to upload reference</p>
                        <p className="text-gray-400 text-sm">PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                  )}
                </label>
              </div>
              
              {uploadedImage && (
                <div className="mt-6 flex gap-4 justify-center">
                  <a 
                    href="https://discord.gg/wP7wFKES"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Discuss on Discord
                  </a>
                  <a 
                    href="mailto:sab899899@gmail.com"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Send via Email
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center mb-8">
          <Filter className="h-5 w-5 text-gray-400 mr-3" />
          <span className="text-gray-400 mr-4">Filter by content:</span>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                activeFilter === category.id
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg transform scale-105'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">📁</div>
              <h3 className="text-2xl font-bold text-white mb-2">No Thumbnails Yet</h3>
              <p className="text-gray-400 mb-6">Your amazing Minecraft thumbnails will appear here once you add them through the admin panel.</p>
              <a 
                href="/admin"
                className="inline-block bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Go to Admin Panel
              </a>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-700/50 cursor-pointer"
                onClick={() => handleThumbnailClick(item)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Game Overlay Icon */}
                  <div className="absolute top-4 right-4 text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                    {item.game_overlay}
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors transform scale-0 group-hover:scale-100 duration-300">
                      <ExternalLink size={20} />
                    </div>
                  </div>

                  {/* Stats Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-sm mb-2 truncate">{item.title}</h3>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center bg-black/30 rounded-full px-2 py-1">
                        <Eye size={12} className="mr-1" />
                        {item.views}
                      </span>
                      <span className="flex items-center bg-black/30 rounded-full px-2 py-1">
                        <Heart size={12} className="mr-1" />
                        {item.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Level Up Your Minecraft Content?</h3>
          <p className="text-gray-300 mb-6">Get professional Minecraft thumbnails that drive clicks and boost your channel growth.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://discord.gg/wP7wFKES"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Order Custom Thumbnails
            </a>
            <button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-block border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              View Pricing
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnail Popup Modal */}
      {selectedThumbnail && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative max-w-6xl w-full max-h-[90vh] bg-gray-800/95 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setSelectedThumbnail(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col lg:flex-row h-full">
              {/* Image Section */}
              <div className="lg:w-2/3 relative bg-black/20 flex items-center justify-center p-4">
                <img
                  src={selectedThumbnail.image_url}
                  alt={selectedThumbnail.title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
                
                {/* Game Overlay */}
                <div className="absolute top-8 right-8 text-6xl opacity-80">
                  {selectedThumbnail.game_overlay}
                </div>
              </div>

              {/* Info Section */}
              <div className="lg:w-1/3 p-8 flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                      selectedThumbnail.category === 'builds' ? 'bg-green-400/20 text-green-400' :
                      selectedThumbnail.category === 'tutorials' ? 'bg-blue-400/20 text-blue-400' :
                      selectedThumbnail.category === 'survival' ? 'bg-purple-400/20 text-purple-400' :
                      'bg-orange-400/20 text-orange-400'
                    }`}>
                      {selectedThumbnail.category.toUpperCase()}
                    </span>
                    <h2 className="text-3xl font-bold text-white mb-4">{selectedThumbnail.title}</h2>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                      <Eye className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">{selectedThumbnail.views}</div>
                      <div className="text-gray-400 text-sm">Views</div>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                      <Heart className="w-6 h-6 text-red-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">{selectedThumbnail.likes}</div>
                      <div className="text-gray-400 text-sm">Likes</div>
                    </div>
                  </div>

                  {/* Date Added */}
                  <div className="mb-8">
                    <h3 className="text-white font-semibold mb-2">Date Added</h3>
                    <p className="text-gray-300">
                      {new Date(selectedThumbnail.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button
                    onClick={() => handleDownloadThumbnail(selectedThumbnail)}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Thumbnail
                  </button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <a 
                      href="https://discord.gg/wP7wFKES"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-center"
                    >
                      Order Similar
                    </a>
                    <a 
                      href="mailto:sab899899@gmail.com"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-center"
                    >
                      Contact
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;