import React, { useState } from 'react';
import { Camera, Plus, X, Calendar, Heart, Sparkles, Gift } from 'lucide-react';

const FestivePhotoGallery = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const ADMIN_PASSWORD = 'family2024'; // Change this to your desired password

  const [photos, setPhotos] = useState([
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800',
      title: 'Christmas Eve Dinner',
      date: '2025-12-24',
      description: 'Family gathering around the festive table',
      likes: 12
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800',
      title: 'Decorating the Tree',
      date: '2025-12-20',
      description: 'Making memories together',
      likes: 8
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800',
      title: 'Winter Wonderland',
      date: '2025-12-15',
      description: 'First snow of the season',
      likes: 15
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?w=800',
      title: 'Gift Exchange',
      date: '2025-12-25',
      description: 'Unwrapping presents on Christmas morning',
      likes: 20
    }
  ]);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    url: '',
    title: '',
    date: '',
    description: ''
  });

  const addPhoto = () => {
    if (newPhoto.url && newPhoto.title) {
      setPhotos([...photos, {
        id: Date.now(),
        ...newPhoto,
        likes: 0
      }]);
      setNewPhoto({ url: '', title: '', date: '', description: '' });
      setShowAddForm(false);
    }
  };

  const handleAuthentication = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setShowPasswordModal(false);
      setPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  const requestAdminAction = (action) => {
    if (!isAuthenticated) {
      setShowPasswordModal(true);
      return false;
    }
    return true;
  };

  const handleAddPhoto = () => {
    if (requestAdminAction('add')) {
      setShowAddForm(true);
    } else {
      setShowPasswordModal(true);
    }
  };

  const handleDeletePhoto = (id) => {
    if (requestAdminAction('delete')) {
      deletePhoto(id);
    } else {
      setShowPasswordModal(true);
    }
  };

  const likePhoto = (id) => {
    setPhotos(photos.map(p => 
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    ));
  };

  const deletePhoto = (id) => {
    setPhotos(photos.filter(p => p.id !== id));
    setSelectedPhoto(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated background gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Floating snowflakes */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${Math.random() * 8 + 8}px`
            }}
          >
            ❄
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/20 to-green-500/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10 mb-6">
            <Sparkles className="text-yellow-300" size={20} />
            <span className="text-white/90 font-medium">Holiday Season 2025-2026</span>
            <Gift className="text-red-400" size={20} />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-4 text-white tracking-tight">
            Family <span className="bg-gradient-to-r from-red-400 via-yellow-300 to-green-400 bg-clip-text text-transparent">Memories</span>
          </h1>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Capturing the magic of Christmas and the promise of a new year
          </p>
          
          <button
            onClick={handleAddPhoto}
            className="group bg-gradient-to-r from-red-500 to-green-600 text-white px-8 py-4 rounded-2xl flex items-center gap-3 shadow-2xl hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300 mx-auto font-semibold text-lg"
          >
            <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" /> 
            Add New Memory
          </button>
          
          {isAuthenticated && (
            <div className="mt-4 text-green-400 text-sm flex items-center gap-2 justify-center">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Admin Mode Active
            </div>
          )}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
            <div className="text-3xl font-bold text-white mb-1">{photos.length}</div>
            <div className="text-white/60 text-sm">Memories</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
            <div className="text-3xl font-bold text-red-400 mb-1">{photos.reduce((sum, p) => sum + p.likes, 0)}</div>
            <div className="text-white/60 text-sm">Total Likes</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">2024</div>
            <div className="text-white/60 text-sm">Season</div>
          </div>
        </div>

        {/* Add Photo Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
            <div className="bg-slate-800 rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-white/10 transform animate-in zoom-in duration-300">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-bold text-white">Add New Memory</h3>
                <button 
                  onClick={() => setShowAddForm(false)} 
                  className="text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="text-white/80 text-sm font-medium mb-2 block">Photo URL</label>
                  <input
                    type="text"
                    placeholder="https://example.com/photo.jpg"
                    value={newPhoto.url}
                    onChange={(e) => setNewPhoto({...newPhoto, url: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="text-white/80 text-sm font-medium mb-2 block">Title</label>
                  <input
                    type="text"
                    placeholder="Christmas Morning"
                    value={newPhoto.title}
                    onChange={(e) => setNewPhoto({...newPhoto, title: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="text-white/80 text-sm font-medium mb-2 block">Date</label>
                  <input
                    type="date"
                    value={newPhoto.date}
                    onChange={(e) => setNewPhoto({...newPhoto, date: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="text-white/80 text-sm font-medium mb-2 block">Description</label>
                  <textarea
                    placeholder="Share the story behind this memory..."
                    value={newPhoto.description}
                    onChange={(e) => setNewPhoto({...newPhoto, description: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-red-500 focus:border-transparent h-28 transition-all resize-none"
                  />
                </div>
                <button
                  onClick={addPhoto}
                  className="w-full bg-gradient-to-r from-red-500 to-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300"
                >
                  Add to Gallery
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
            <div className="bg-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/10 transform animate-in zoom-in duration-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Admin Access Required</h3>
                <button 
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPassword('');
                    setPasswordError('');
                  }} 
                  className="text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
                >
                  <X size={24} />
                </button>
              </div>
              <p className="text-white/70 mb-6">Enter the admin password to add or delete memories</p>
              <div className="space-y-4">
                <div>
                  <label className="text-white/80 text-sm font-medium mb-2 block">Password</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError('');
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && handleAuthentication()}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    autoFocus
                  />
                  {passwordError && (
                    <p className="text-red-400 text-sm mt-2">{passwordError}</p>
                  )}
                </div>
                <button
                  onClick={handleAuthentication}
                  className="w-full bg-gradient-to-r from-red-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-2xl hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300"
                >
                  Unlock Admin Access
                </button>
                <p className="text-white/50 text-xs text-center mt-4">
                  
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Masonry Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative bg-slate-800/50 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer"
              style={{animationDelay: `${index * 100}ms`}}
              onClick={() => setSelectedPhoto(photo)}
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800';
                  }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-80"></div>
                
                {/* Top Badge */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-3 border border-white/20">
                  <Camera size={20} className="text-white" />
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                    {photo.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
                    <Calendar size={16} />
                    <span>{new Date(photo.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <p className="text-white/80 text-sm mb-4 line-clamp-2">{photo.description}</p>
                  
                  {/* Like Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      likePhoto(photo.id);
                    }}
                    className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-300 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 font-medium"
                  >
                    <Heart size={18} fill={photo.likes > 0 ? "currentColor" : "none"} />
                    <span>{photo.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Photo Detail Modal */}
        {selectedPhoto && (
          <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300" 
            onClick={() => setSelectedPhoto(null)}
          >
            <div 
              className="bg-slate-800 rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-white/20 transform animate-in zoom-in duration-300" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full h-[500px] object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent"></div>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-6 right-6 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 rounded-full p-3 transition-all"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>
              <div className="p-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-3">{selectedPhoto.title}</h2>
                    <div className="flex items-center gap-3 text-white/60">
                      <Calendar size={20} />
                      <span className="text-lg">{new Date(selectedPhoto.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">{selectedPhoto.description}</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => likePhoto(selectedPhoto.id)}
                    className="flex items-center gap-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-red-500/50 transition-all transform hover:scale-105 font-semibold"
                  >
                    <Heart size={22} fill="white" />
                    <span className="text-lg">{selectedPhoto.likes}</span>
                  </button>
                  <button
                    onClick={() => handleDeletePhoto(selectedPhoto.id)}
                    className="flex items-center gap-3 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl transition-all transform hover:scale-105 font-semibold"
                  >
                    <X size={22} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-20 pb-8">
          <div className="inline-block bg-white/5 backdrop-blur-md rounded-3xl px-8 py-6 border border-white/10">
            <p className="text-white/90 text-lg font-semibold mb-2">✨ Treasuring Every Moment ✨</p>
            <p className="text-white/60 text-sm">Made with love for the holiday season</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivePhotoGallery;