
'use client'
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Video } from '@/typings';
import { EnhancedCarousel } from '@/src/components/EnhancedCarousel';
import { useRouter } from 'next/navigation';



const SeriesPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');
  const [allSeries, setAllSeries] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const categories = ['All', 'Spirituality', 'Education', 'Wellness'];
  const sortOptions = ['Latest', 'Most Popular', 'Highest Rated', 'A-Z'];

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        setLoading(true);

        // Fetch all series
        const response = await fetch('/api/series?sort=latest');
        if (response.ok) {
          const data = await response.json();
          setAllSeries(data.items || data || []);
        } else {
          throw new Error('Failed to fetch series');
        }

      } catch (err) {
        console.error('Error fetching series:', err);
        setError('Failed to load series. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, []);

  const filteredSeries = allSeries.filter(series =>
    selectedCategory === 'All' || series.type?.category?.name === selectedCategory
  );

  const sortedSeries = [...filteredSeries].sort((a, b) => {
    switch (sortBy) {
      case 'Most Popular':
        return (b.likes || 0) - (a.likes || 0);
      case 'Highest Rated':
        return (b.rating || 0) - (a.rating || 0);
      case 'A-Z':
        return a.title.localeCompare(b.title);
      case 'Latest':
      default:
        return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
    }
  });

  if (loading) {
    return (
      <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg text-gray-300">Loading series...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      <main>
        {/* Series Content */}
        <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900 py-20 animate-fade-in pt-32">
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
                <label htmlFor='category' className="text-gray-400 text-sm font-medium mb-2 block">Category</label>
                <div className="relative">
                  <select id="category"
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
                <label htmlFor='sort by' className="text-gray-400 text-sm font-medium mb-2 block">Sort by</label>
                <div className="relative">
                  <select id="sort by"
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
                  onClick={() => router.push(`/series/${series.id}`)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden rounded-xl transition-all duration-700 group-hover:scale-105 group-hover:z-10 shadow-xl ring-1 ring-gray-800/20 group-hover:ring-red-600/50">
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
                            {new Date(series.release_date).getFullYear()}
                          </span>
                        </div>
                        <span className="text-gray-400 text-xs">
                          {series.type?.category?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Series Slider */}
          <EnhancedCarousel
            title="New Releases"
            movies={sortedSeries.filter(s => new Date(s.release_date) >= new Date('2023-06-01'))}
            variant="series"
          />
          <EnhancedCarousel
            title="Most Popular Series"
            movies={[...sortedSeries].sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 8)}
            variant="series"
          />
          <EnhancedCarousel
            title="Spirituality Collection"
            movies={sortedSeries.filter(s => s.type?.category?.name === 'Spirituality')}
            variant="series"
          />
          <EnhancedCarousel
            title="Wellness Journey"
            movies={sortedSeries.filter(s => s.type?.category?.name === 'Wellness')}
            variant="series"
          />
        </div>
      </main>

    </div>
  );
};

export default SeriesPage;
