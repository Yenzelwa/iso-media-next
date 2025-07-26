'use client'
import React, { useState } from 'react';
import { Search, Filter, Grid, List, Play } from 'lucide-react';
import { Video } from '@/typings';
import { EnhancedCarousel } from '@/src/components/EnhancedCarousel';

const documentaryVideos: Video[] = [
  {
    id: 13,
    title: 'The Hidden History of Consciousness',
    rating: 4.9,
    type: {
      id: 9,
      name: 'Documentary',
      category: {
        id: 1,
        name: 'Education'
      }
    },
    description: 'Explore the forgotten wisdom of ancient civilizations and their understanding of human consciousness through archaeological discoveries and spiritual practices.',
    image_path: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    release_date: new Date('2023-09-15'),
    video_path: '',
    likes: 412,
  },
  {
    id: 14,
    title: 'Quantum Reality: Beyond the Veil',
    rating: 4.8,
    type: {
      id: 10,
      name: 'Documentary',
      category: {
        id: 4,
        name: 'Science'
      }
    },
    description: 'A deep dive into quantum physics and its implications for understanding reality, consciousness, and the nature of existence itself.',
    image_path: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    release_date: new Date('2023-10-01'),
    video_path: '',
    likes: 387,
  },
  {
    id: 15,
    title: 'Sacred Geometry in Nature',
    rating: 4.7,
    type: {
      id: 11,
      name: 'Documentary',
      category: {
        id: 1,
        name: 'Education'
      }
    },
    description: 'Discover the mathematical patterns that govern the natural world and their significance in ancient and modern spiritual practices.',
    image_path: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    release_date: new Date('2023-08-20'),
    video_path: '',
    likes: 298,
  },
  {
    id: 16,
    title: 'The Healing Power of Sound',
    rating: 4.6,
    type: {
      id: 12,
      name: 'Documentary',
      category: {
        id: 3,
        name: 'Wellness'
      }
    },
    description: 'An exploration of sound healing practices across cultures and the scientific research behind vibrational medicine.',
    image_path: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    release_date: new Date('2023-07-10'),
    video_path: '',
    likes: 356,
  },
  {
    id: 17,
    title: 'Mystics and Visionaries',
    rating: 4.8,
    type: {
      id: 13,
      name: 'Documentary',
      category: {
        id: 2,
        name: 'Spirituality'
      }
    },
    description: 'Profiles of modern-day mystics and visionaries who are changing our understanding of consciousness and spiritual awakening.',
    image_path: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
    release_date: new Date('2023-11-05'),
    video_path: '',
    likes: 445,
  },
  {
    id: 18,
    title: 'Digital Consciousness',
    rating: 4.5,
    type: {
      id: 14,
      name: 'Documentary',
      category: {
        id: 4,
        name: 'Science'
      }
    },
    description: 'Examining the impact of technology on human consciousness and the future of artificial intelligence and digital awareness.',
    image_path: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
    release_date: new Date('2023-09-30'),
    video_path: '',
    likes: 234,
  }
];



const FeaturedDocumentary: React.FC<{ documentary: Video }> = ({ documentary }) => {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-gray-900 p-8 lg:p-12 rounded-3xl border border-gray-800/50 backdrop-blur-sm">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-4 py-2 rounded-full font-bold">
                FEATURED
              </span>
              <span className="text-gray-400 text-sm">
                {documentary.type.category.name}
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              {documentary.title}
            </h2>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              {documentary.description}
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
              </div>
              <span className="text-white font-semibold">{documentary.rating}</span>
            </div>
            <div className="text-gray-400">
              {documentary.likes} viewers
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
              <Play className="w-6 h-6 mr-3 inline fill-current" />
              Watch Now
            </button>
            <button className="border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-4 rounded-xl font-bold transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        <div className="relative group">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 group-hover:scale-105">
            <img
              src={documentary.image_path}
              alt={documentary.title}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                <Play className="w-12 h-12 text-white fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DocumentaryPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');

  const categories = ['All', 'Education', 'Science', 'Spirituality', 'Wellness'];
  const sortOptions = ['Latest', 'Most Popular', 'Highest Rated', 'A-Z'];

  const filteredDocs = documentaryVideos.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || doc.type.category.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedDocs = [...filteredDocs].sort((a, b) => {
    switch (sortBy) {
      case 'Most Popular':
        return b.likes - a.likes;
      case 'Highest Rated':
        return b.rating - a.rating;
      case 'A-Z':
        return a.title.localeCompare(b.title);
      case 'Latest':
      default:
        return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
    }
  });

  return (
    <div className="bg-gradient-to-b from-black via-slate-900 to-black text-white">


      {/* Featured Documentary */}
      <div className="px-6 lg:px-16 py-16 pt-24">
        <FeaturedDocumentary documentary={documentaryVideos[0]} />
      </div>

      {/* Search and Filter Section */}
      <div className="px-6 lg:px-16 py-12">
        <div className="bg-gradient-to-r from-gray-900/80 to-slate-900/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentaries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800/80 border border-gray-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-800 rounded-xl p-1 border border-gray-600">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="px-6 lg:px-16 pb-20">
        <div className="mb-8">
          <p className="text-gray-400 text-lg">
            {sortedDocs.length} documentaries found
          </p>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedDocs.map((doc, index) => (
              <div
                key={doc.id}
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl transition-all duration-500 group-hover:scale-105 shadow-2xl ring-1 ring-gray-700/50 hover:ring-red-500/50">
                  <img
                    src={doc.image_path}
                    alt={doc.title}
                    className="w-full h-72 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
                  />
                  
                  {/* Enhanced overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                    <h3 className="text-white font-bold text-xl mb-2 line-clamp-2 text-shadow-lg">
                      {doc.title}
                    </h3>
                    <p className="text-gray-200 text-sm line-clamp-3 mb-4 text-shadow">
                      {doc.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-400 text-sm font-bold">
                          ★ {doc.rating}
                        </span>
                        <span className="text-gray-300 text-sm">
                          {doc.likes} views
                        </span>
                      </div>
                      <span className="bg-red-600/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                        {doc.type.category.name}
                      </span>
                    </div>
                  </div>

                  {/* Play button */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                    <div className="bg-white/20 backdrop-blur-md rounded-full p-4 hover:bg-white/30 transition-colors">
                      <Play className="w-8 h-8 text-white fill-current" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-full font-semibold border border-gray-600/50">
                      {Math.floor(Math.random() * 60 + 30)} min
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {sortedDocs.map((doc, index) => (
              <div
                key={doc.id}
                className="bg-gradient-to-r from-gray-900/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 group cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="grid lg:grid-cols-4 gap-6 items-center">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={doc.image_path}
                      alt={doc.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="lg:col-span-2 space-y-3">
                    <h3 className="text-white font-bold text-xl group-hover:text-red-400 transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-gray-300 line-clamp-2">
                      {doc.description}
                    </p>
                    <div className="flex items-center space-x-4">
                      <span className="text-yellow-400 font-semibold">★ {doc.rating}</span>
                      <span className="text-gray-400">{doc.likes} views</span>
                      <span className="bg-red-600/20 text-red-400 text-xs px-3 py-1 rounded-full">
                        {doc.type.category.name}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                      <Play className="w-5 h-5 mr-2 inline fill-current" />
                      Watch
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Documentary Collections */}
      <div className="py-6">
        <EnhancedCarousel title="Latest Documentaries" movies={documentaryVideos.filter(d => d.release_date >= new Date('2023-09-01'))} variant="documentary" />
        <EnhancedCarousel title="Top Rated Collection" movies={[...documentaryVideos].sort((a, b) => b.rating - a.rating).slice(0, 6)} variant="documentary" />
        <EnhancedCarousel title="Science & Consciousness" movies={documentaryVideos.filter(d => d.type.category.name === 'Science')} variant="documentary" />
        <EnhancedCarousel title="Educational Insights" movies={documentaryVideos.filter(d => d.type.category.name === 'Education')} variant="documentary" />
      </div>

    </div>
  );
};

export default DocumentaryPage;
