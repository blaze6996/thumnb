import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  Image, 
  Settings, 
  Users, 
  BarChart3, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Eye,
  Download,
  Link
} from 'lucide-react';
import ClientManagement from './ClientManagement';
import { 
  getThumbnails,
  addThumbnail,
  updateThumbnail,
  deleteThumbnail
} from '../utils/database';
import type { Database } from '../lib/supabase';

type ThumbnailRow = Database['public']['Tables']['thumbnails']['Row'];
type ThumbnailInsert = Database['public']['Tables']['thumbnails']['Insert'];

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<ThumbnailRow | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<ThumbnailRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [newThumbnail, setNewThumbnail] = useState({
    title: '',
    category: 'builds',
    imageUrl: '',
    views: '',
    likes: '',
    gameOverlay: '🏰'
  });

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const thumbnails = await getThumbnails();
        setPortfolioItems(thumbnails);
      } catch (error) {
        console.error('Error loading data:', error);
        alert('Error loading data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    onLogout();
  };

  const validateImageUrl = (url: string): boolean => {
    try {
      new URL(url);
      return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
    } catch {
      return false;
    }
  };

  const handleAddThumbnail = async () => {
    if (newThumbnail.title && newThumbnail.imageUrl) {
      if (!validateImageUrl(newThumbnail.imageUrl)) {
        alert('Please enter a valid image URL (jpg, jpeg, png, gif, or webp)');
        return;
      }

      try {
        const thumbnailData: ThumbnailInsert = {
          title: newThumbnail.title,
          category: newThumbnail.category,
          image_url: newThumbnail.imageUrl,
          views: newThumbnail.views || '0',
          likes: newThumbnail.likes || '0',
          game_overlay: newThumbnail.gameOverlay
        };
        
        const newItem = await addThumbnail(thumbnailData);
        setPortfolioItems(prev => [newItem, ...prev]);
        setNewThumbnail({
          title: '',
          category: 'builds',
          imageUrl: '',
          views: '',
          likes: '',
          gameOverlay: '🏰'
        });
        setShowAddModal(false);
        alert('Thumbnail added successfully!');
      } catch (error) {
        console.error('Error adding thumbnail:', error);
        alert('Error adding thumbnail. Please try again.');
      }
    } else {
      alert('Please fill in the title and image URL.');
    }
  };

  const handleDeleteThumbnail = async (item: ThumbnailRow) => {
    if (confirm('Are you sure you want to delete this thumbnail?')) {
      try {
        await deleteThumbnail(item.id);
        setPortfolioItems(prev => prev.filter(thumbnail => thumbnail.id !== item.id));
        alert('Thumbnail deleted successfully!');
      } catch (error) {
        console.error('Error deleting thumbnail:', error);
        alert('Error deleting thumbnail. Please try again.');
      }
    }
  };

  const handleEditThumbnail = (item: ThumbnailRow) => {
    setEditingItem(item);
    setNewThumbnail({
      title: item.title,
      category: item.category,
      imageUrl: item.image_url,
      views: item.views,
      likes: item.likes,
      gameOverlay: item.game_overlay
    });
  };

  const handleUpdateThumbnail = async () => {
    if (editingItem && newThumbnail.title && newThumbnail.imageUrl) {
      if (!validateImageUrl(newThumbnail.imageUrl)) {
        alert('Please enter a valid image URL (jpg, jpeg, png, gif, or webp)');
        return;
      }

      try {
        const updates = {
          title: newThumbnail.title,
          category: newThumbnail.category,
          image_url: newThumbnail.imageUrl,
          views: newThumbnail.views,
          likes: newThumbnail.likes,
          game_overlay: newThumbnail.gameOverlay
        };
        
        const updatedItem = await updateThumbnail(editingItem.id, updates);
        setPortfolioItems(prev => 
          prev.map(item => 
            item.id === editingItem.id ? updatedItem : item
          )
        );
        setEditingItem(null);
        setNewThumbnail({
          title: '',
          category: 'builds',
          imageUrl: '',
          views: '',
          likes: '',
          gameOverlay: '🏰'
        });
        alert('Thumbnail updated successfully!');
      } catch (error) {
        console.error('Error updating thumbnail:', error);
        alert('Error updating thumbnail. Please try again.');
      }
    } else {
      alert('Please fill in the title and image URL.');
    }
  };

  const tabs = [
    { id: 'portfolio', name: 'Portfolio Management', icon: <Image className="w-5 h-5" /> },
    { id: 'clients', name: 'Client Management', icon: <Users className="w-5 h-5" /> },
    { id: 'analytics', name: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'settings', name: 'Settings', icon: <Settings className="w-5 h-5" /> }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400">Welcome back, Admin</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {tab.icon}
                    <span className="ml-3">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                {/* Portfolio Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Portfolio Management</h2>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Thumbnail
                  </button>
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {portfolioItems.length === 0 ? (
                    <div className="col-span-full text-center py-16 bg-gray-800/30 rounded-xl border border-gray-700">
                      <div className="text-gray-400 text-6xl mb-4">📁</div>
                      <h3 className="text-2xl font-bold text-white mb-2">No Thumbnails Yet</h3>
                      <p className="text-gray-400 mb-6">Start building your portfolio by adding your first thumbnail.</p>
                      <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                      >
                        Add Your First Thumbnail
                      </button>
                    </div>
                  ) : (
                    portfolioItems.map((item) => (
                      <div key={item.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700">
                        <div className="relative h-48">
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 text-2xl">{item.game_overlay}</div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <h3 className="text-white font-bold text-sm">{item.title}</h3>
                            <div className="flex items-center justify-between text-xs text-gray-300 mt-1">
                              <span className="flex items-center">
                                <Eye size={12} className="mr-1" />
                                {item.views}
                              </span>
                              <span>{item.likes} likes</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm capitalize">{item.category}</span>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditThumbnail(item)}
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteThumbnail(item)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'clients' && (
              <ClientManagement />
            )}

            {activeTab === 'analytics' && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Analytics Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-700/50 rounded-lg p-6">
                    <h3 className="text-green-400 font-semibold mb-2">Total Thumbnails</h3>
                    <p className="text-3xl font-bold text-white">{portfolioItems.length}</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-6">
                    <h3 className="text-blue-400 font-semibold mb-2">Happy Clients</h3>
                    <p className="text-3xl font-bold text-white">5+</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-6">
                    <h3 className="text-purple-400 font-semibold mb-2">Average Rating</h3>
                    <p className="text-3xl font-bold text-white">4.9★</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-semibold mb-2">Contact Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 mb-2">Email</label>
                        <input
                          type="email"
                          value="sab889899@gmail.com"
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Discord Server</label>
                        <input
                          type="text"
                          value="https://discord.gg/wP7wFKES"
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-700 pt-6">
                    <h3 className="text-white font-semibold mb-4">Data Management</h3>
                    <div className="space-y-4">
                      <button
                        onClick={async () => {
                          try {
                            const data = {
                              thumbnails: portfolioItems,
                              exportDate: new Date().toISOString()
                            };
                            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `thumbnailpro-backup-${new Date().toISOString().split('T')[0]}.json`;
                            a.click();
                            URL.revokeObjectURL(url);
                          } catch (error) {
                            console.error('Error exporting data:', error);
                            alert('Error exporting data. Please try again.');
                          }
                        }}
                        className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Export Data Backup
                      </button>
                      
                      <p className="text-gray-400 text-sm">
                        Export your portfolio data as a backup. This includes all thumbnails and their metadata.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingItem) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">
                {editingItem ? 'Edit Thumbnail' : 'Add New Thumbnail'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingItem(null);
                  setNewThumbnail({
                    title: '',
                    category: 'builds',
                    imageUrl: '',
                    views: '',
                    likes: '',
                    gameOverlay: '🏰'
                  });
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">Title *</label>
                <input
                  type="text"
                  value={newThumbnail.title}
                  onChange={(e) => setNewThumbnail(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  placeholder="Enter thumbnail title"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Category</label>
                  <select
                    value={newThumbnail.category}
                    onChange={(e) => setNewThumbnail(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                  >
                    <option value="builds">Builds</option>
                    <option value="tutorials">Tutorials</option>
                    <option value="survival">Survival</option>
                    <option value="updates">Updates</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Game Overlay</label>
                  <input
                    type="text"
                    value={newThumbnail.gameOverlay}
                    onChange={(e) => setNewThumbnail(prev => ({ ...prev, gameOverlay: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                    placeholder="🏰"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Views</label>
                  <input
                    type="text"
                    value={newThumbnail.views}
                    onChange={(e) => setNewThumbnail(prev => ({ ...prev, views: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                    placeholder="2.3M"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Likes</label>
                  <input
                    type="text"
                    value={newThumbnail.likes}
                    onChange={(e) => setNewThumbnail(prev => ({ ...prev, likes: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                    placeholder="45K"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  <Link className="w-5 h-5 inline mr-2" />
                  Image URL *
                </label>
                <input
                  type="url"
                  value={newThumbnail.imageUrl}
                  onChange={(e) => setNewThumbnail(prev => ({ ...prev, imageUrl: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-gray-400 text-sm mt-2">
                  Enter a direct link to your thumbnail image (jpg, jpeg, png, gif, or webp)
                </p>
                
                {newThumbnail.imageUrl && validateImageUrl(newThumbnail.imageUrl) && (
                  <div className="mt-4 border border-gray-600 rounded-lg p-4">
                    <p className="text-white font-semibold mb-2">Preview:</p>
                    <img
                      src={newThumbnail.imageUrl}
                      alt="Preview"
                      className="max-w-full h-48 object-contain rounded-lg"
                      onError={() => alert('Failed to load image. Please check the URL.')}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={editingItem ? handleUpdateThumbnail : handleAddThumbnail}
                  disabled={!newThumbnail.title || !newThumbnail.imageUrl}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {editingItem ? 'Update Thumbnail' : 'Add Thumbnail'}
                </button>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingItem(null);
                    setNewThumbnail({
                      title: '',
                      category: 'builds',
                      imageUrl: '',
                      views: '',
                      likes: '',
                      gameOverlay: '🏰'
                    });
                  }}
                  className="px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;