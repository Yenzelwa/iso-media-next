
'use client'
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Play, Info } from 'lucide-react';
import { Video } from '@/typings';
import { SeriesHero } from '@/src/components/SeriesHero';
import { MovieCarousel } from '@/src/components/MovieCarousel';

const NetflixHeaderSlider: React.FC<{ videos: Video[] }> = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [videos.length]);

  const scrollContent = (direction: "left" | "right") => {
    const container = document.getElementById('header-slider');
    if (container) {
      const scrollAmount = 300;
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      let newPosition;
      if (direction === "left") {
        newPosition = Math.max(0, currentScroll - scrollAmount);
      } else {
        newPosition = Math.min(maxScroll, currentScroll + scrollAmount);
      }

      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
    }
  };

  const currentVideo = videos[currentIndex] || videos[0];

  return (
    <div className="relative  bg-black overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <img
          src={currentVideo.image_path}
          alt={currentVideo.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
      </div>

                  {/* Main Content */}
      <div className="relative z-40 flex items-center min-h-[60vh] px-4 lg:px-8 pb-40 pt-16">
        <div className="max-w-2xl space-y-6">
          <div className="space-y-4">
            <span className="inline-block bg-red-600 text-white text-sm px-3 py-1 rounded font-medium">
              {currentVideo.type.category.name} Series
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              {currentVideo.title}
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
              {currentVideo.description}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button className="bg-white text-black hover:bg-gray-200 transition-colors px-6 py-3 rounded flex items-center space-x-2 font-semibold">
              <Play className="w-5 h-5 fill-current" />
              <span>Play</span>
            </button>
            <button className="bg-gray-600/70 text-white hover:bg-gray-600 transition-colors px-6 py-3 rounded flex items-center space-x-2 font-semibold">
              <Info className="w-5 h-5" />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Slider
      <div className="absolute bottom-6 left-0 right-0 z-50">
        <div className="px-4 lg:px-8 mb-4">
          <h3 className="text-white text-xl font-semibold">Continue Watching</h3>
        </div>
        <div className="relative group">
          <button
            onClick={() => scrollContent("left")}
            className={`absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black text-white p-2 rounded transition-all duration-300 ${
              scrollPosition > 0 ? 'opacity-100' : 'opacity-50'
            }`}
            disabled={scrollPosition <= 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            id="header-slider"
            className="flex space-x-3 overflow-x-auto scrollbar-hide scroll-smooth px-4 lg:px-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {videos.map((video, index) => (
              <div
                key={video.id}
                className={`flex-none w-48 cursor-pointer transition-all duration-300 ${
                  index === currentIndex ? 'ring-2 ring-red-500' : ''
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <div className="relative overflow-hidden rounded">
                  <img
                    src={video.image_path}
                    alt={video.title}
                    className="w-full h-28 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <h4 className="text-white text-sm font-medium line-clamp-1">
                      {video.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollContent("right")}
            className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black text-white p-2 rounded transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div> */}

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-red-500 w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const seriesVideos: Video[] = [
  {
    id: 7,
    title: 'Consciousness Expansion',
    rating: 4.9,
    type: {
      id: 6,
      name: 'Series',
      category: {
        id: 2,
        name: 'Spirituality'
      }
    },
    description: 'Expand your awareness and explore the depths of human consciousness through guided practices and teachings.',
    image_path: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    release_date: new Date('2023-06-01'),
    video_path: '',
    likes: 267,
  },
  {
    id: 8,
    title: 'Personal Development',
    rating: 4.5,
    type: {
      id: 2,
      name: 'Series',
      category: {
        id: 2,
        name: 'Spirituality'
      }
    },
    description: 'Journey into the world of conscious living and spiritual awakening. Discover ancient wisdom and modern practices that transform your daily experience.',
    image_path: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
    release_date: new Date('2023-02-01'),
    video_path: '',
    likes: 189,
  },
  {
    id: 9,
    title: 'Mindful Living',
    rating: 4.8,
    type: {
      id: 4,
      name: 'Series',
      category: {
        id: 2,
        name: 'Spirituality'
      }
    },
    description: 'Transform your daily routine into a mindful practice. Learn techniques for present-moment awareness and inner peace.',
    image_path: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
    release_date: new Date('2023-04-01'),
    video_path: '',
    likes: 203,
  },
  {
    id: 10,
    title: 'Ancient Wisdom',
    rating: 4.7,
    type: {
      id: 5,
      name: 'Series',
      category: {
        id: 1,
        name: 'Education'
      }
    },
    description: 'Explore timeless teachings from ancient civilizations and how they apply to modern life.',
    image_path: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    release_date: new Date('2023-05-01'),
    video_path: '',
    likes: 145,
  },
  {
    id: 11,
    title: 'Digital Detox',
    rating: 4.6,
    type: {
      id: 7,
      name: 'Series',
      category: {
        id: 3,
        name: 'Wellness'
      }
    },
    description: 'Learn to disconnect from digital distractions and reconnect with yourself and nature.',
    image_path: 'https://images.unsplash.com/photo-1506629905592-5b5d8a2ec57c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    release_date: new Date('2023-07-01'),
    video_path: '',
    likes: 98,
  },
  {
    id: 12,
    title: 'Energy Healing Mastery',
    rating: 4.4,
    type: {
      id: 8,
      name: 'Series',
      category: {
        id: 3,
        name: 'Wellness'
      }
    },
    description: 'Master the art of energy healing through comprehensive techniques and practices.',
    image_path: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
    release_date: new Date('2023-08-01'),
    video_path: '',
    likes: 76,
  }
];

const allSeries = [...seriesVideos];

const SeriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');

  const categories = ['All', 'Spirituality', 'Education', 'Wellness'];
  const sortOptions = ['Latest', 'Most Popular', 'Highest Rated', 'A-Z'];

  const filteredSeries = allSeries.filter(series => 
    selectedCategory === 'All' || series.type.category.name === selectedCategory
  );

  const sortedSeries = [...filteredSeries].sort((a, b) => {
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
    <div className="bg-background text-foreground">
            {/* Netflix-style Header Slider */}
      <NetflixHeaderSlider videos={seriesVideos.slice(0, 6)} />

            <main>
                {/* Hero Section */}
        {/* <SeriesHero videos={seriesVideos.slice(0, 4)} /> */}

        {/* Series Content */}
        <div className="bg-gradient-to-b from-black via-gray-900/50 to-black py-20 animate-fade-in">
          {/* Page Header */}
          <div className="px-4 lg:px-16 mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-1 h-12 bg-red-600 rounded-sm"></div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white">
                Series Collection
              </h1>
            </div>
            <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
              Immerse yourself in transformative series that guide you through spiritual awakening, 
              personal development, and wellness practices. Each series is carefully crafted to 
              provide deep insights and practical tools for your journey.
            </p>
          </div>

          {/* Filters */}
          <div className="px-4 lg:px-16 mb-12">
            <div className="flex flex-wrap items-center gap-6 p-6 bg-gray-900/50 rounded-lg backdrop-blur-sm border border-gray-800/50">
              {/* Category Filter */}
              <div className="relative">
                <label className="text-gray-400 text-sm font-medium mb-2 block">Category</label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-gray-800 text-white border border-gray-700 rounded-sm px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none cursor-pointer min-w-[140px]"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Sort Filter */}
              <div className="relative">
                <label className="text-gray-400 text-sm font-medium mb-2 block">Sort by</label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-800 text-white border border-gray-700 rounded-sm px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none cursor-pointer min-w-[160px]"
                  >
                    {sortOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Results Count */}
              <div className="ml-auto">
                <span className="text-gray-400 text-sm">
                  {sortedSeries.length} series found
                </span>
              </div>
            </div>
          </div>

          {/* Series Grid */}
          <div className="px-4 lg:px-16 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedSeries.map((series, index) => (
                <div
                  key={series.id}
                  className="group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden rounded-lg transition-all duration-700 group-hover:scale-105 group-hover:z-10 shadow-xl ring-1 ring-gray-800/20 group-hover:ring-red-600/50">
                    <img
                      src={series.image_path}
                      alt={series.title}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-600 text-white text-xs px-3 py-1.5 rounded-sm font-semibold">
                        SERIES
                      </span>
                    </div>

                    {/* Episode Count */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-black/80 text-white text-xs px-2 py-1 rounded-sm font-medium">
                        {Math.floor(Math.random() * 12 + 4)} Episodes
                      </span>
                    </div>

                    {/* Series Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <h3 className="text-white font-bold text-lg mb-2">
                        {series.title}
                      </h3>
                      <p className="text-gray-200 text-sm line-clamp-2 mb-3">
                        {series.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-400 text-sm font-semibold">
                            ★ {series.rating}
                          </span>
                          <span className="text-gray-400 text-sm">
                            {series.likes} likes
                          </span>
                        </div>
                        <span className="text-gray-400 text-xs">
                          {series.type.category.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Series Carousels */}
          <div className="space-y-16">
            <MovieCarousel 
              title="New Series" 
              movies={sortedSeries.filter(s => s.release_date >= new Date('2023-06-01'))} 
            />
            <MovieCarousel 
              title="Most Popular Series" 
              movies={sortedSeries.sort((a, b) => b.likes - a.likes).slice(0, 8)} 
            />
            <MovieCarousel 
              title="Spirituality Series" 
              movies={sortedSeries.filter(s => s.type.category.name === 'Spirituality')} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeriesPage;
