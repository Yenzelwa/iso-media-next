'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Heart, Share2, Download, Star, Clock, Calendar, ChevronLeft } from 'lucide-react';
import { Video } from '@/typings';
import { useRouter } from 'next/navigation';


interface Episode {
  id: number;
  title: string;
  description: string;
  duration: string;
  image_path: string;
  episode_number: number;
  season_number: number;
  release_date: Date;
  video_path: string;
}

const mockSeriesData: Video & { 
  episodes: Episode[]; 
  seasons: number;
  totalEpisodes: number;
  director: string;
  cast: string[];
  genre: string[];
  year: number;
  duration: string;
} = {
  id: 2,
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
  description: 'Embark on a transformative journey through the depths of human consciousness. This groundbreaking series combines ancient wisdom with modern neuroscience to guide you through expanded states of awareness, meditation practices, and spiritual awakening techniques that will fundamentally shift your perspective on reality.',
  image_path: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
  release_date: new Date('2023-06-01'),
  video_path: '',
  likes: 267,
  seasons: 3,
  totalEpisodes: 24,
  director: 'Dr. Elena Vasquez',
  cast: ['Dr. Elena Vasquez', 'Master Li Wei', 'Dr. Sarah Mitchell'],
  genre: ['Spirituality', 'Documentary', 'Self-Development'],
  year: 2023,
  duration: '45-60 min per episode',
  episodes: [
    {
      id: 1,
      title: 'The Gateway to Consciousness',
      description: 'Introduction to expanded consciousness and the fundamental principles that govern our awareness.',
      duration: '52:30',
      image_path: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      episode_number: 1,
      season_number: 1,
      release_date: new Date('2023-06-01'),
      video_path: '/video/episode1.mp4'
    },
    {
      id: 2,
      title: 'Meditation and the Mind',
      description: 'Explore ancient meditation techniques and their profound effects on brain structure and function.',
      duration: '48:15',
      image_path: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      episode_number: 2,
      season_number: 1,
      release_date: new Date('2023-06-08'),
      video_path: '/video/episode2.mp4'
    },
    {
      id: 3,
      title: 'Quantum Consciousness',
      description: 'Dive into the intersection of quantum physics and consciousness theory.',
      duration: '55:42',
      image_path: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      episode_number: 3,
      season_number: 1,
      release_date: new Date('2023-06-15'),
      video_path: '/video/episode3.mp4'
    },
    {
      id: 4,
      title: 'The Power of Breathwork',
      description: 'Learn how controlled breathing can access altered states of consciousness.',
      duration: '46:28',
      image_path: 'https://images.unsplash.com/photo-1506629905592-5b5d8a2ec57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      episode_number: 4,
      season_number: 1,
      release_date: new Date('2023-06-22'),
      video_path: '/video/episode4.mp4'
    },
    {
      id: 5,
      title: 'Sacred Plant Medicine',
      description: 'Explore the role of plant medicine in spiritual practices and consciousness expansion.',
      duration: '58:12',
      image_path: 'https://images.unsplash.com/photo-1574482620302-1958d1aa3272?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      episode_number: 5,
      season_number: 1,
      release_date: new Date('2023-06-29'),
      video_path: '/video/episode5.mp4'
    },
    {
      id: 6,
      title: 'Energy Fields and Auras',
      description: 'Understanding the human energy field and its relationship to consciousness.',
      duration: '44:35',
      image_path: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      episode_number: 6,
      season_number: 1,
      release_date: new Date('2023-07-06'),
      video_path: '/video/episode6.mp4'
    }
  ]
};

const SeriesDetail = () => {
  useParams<{ id: string; }>();
  const router = useRouter();
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);

  // In a real app, this would fetch data based on the ID
  const series = mockSeriesData;

  const seasonEpisodes = series.episodes.filter(ep => ep.season_number === selectedSeason);

  useEffect(() => {
    if (seasonEpisodes.length > 0 ) {
      setCurrentEpisode(seasonEpisodes[0]);
    }
  }, [selectedSeason]);

  const handlePlayEpisode = (episode: Episode) => {
    setCurrentEpisode(episode);
    // Navigate to watch page or open video player
    router.push(`/watch/${episode.id}`);
  };

  return (
    <div className="bg-background text-foreground">

      <main className="pt-14 sm:pt-16 lg:pt-20 xl:pt-24">
        {/* Hero Section */}
        <div className="relative h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)] xl:h-[calc(100vh-6rem)] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={series.image_path}
              alt={series.title}
              className="w-full h-full object-cover scale-105 blur-sm"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/80"></div>
            {/* Top Navigation Protection Overlay */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/90 to-transparent"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 flex items-center h-full px-4 lg:px-16">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 mb-6 text-gray-300">
                <button data-testid="hero-btn"
                  onClick={() => router.push('/series')}
                  className="hover:text-white transition-colors flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Series</span>
                </button>
                <span>/</span>
                <span className="text-white">{series.title}</span>
              </div>

              {/* Series Badge */}
              <div className="flex items-center space-x-3 mb-4">
                <span  className="bg-red-600 text-white text-sm px-4 py-2 rounded-lg font-bold tracking-wide">
                  SERIES
                </span>
                <span className="bg-gray-900/80 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-lg">
                  {series.seasons} Season{series.seasons > 1 ? 's' : ''}
                </span>
                <span className="bg-gray-900/80 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-lg">
                  {series.totalEpisodes} Episodes
                </span>
              </div>

              {/* Title */}
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {series.title}
              </h1>

              {/* Rating and Meta */}
              <div className="flex items-center space-x-6 mb-6 text-white">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold text-lg">{series.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span>{series.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-5 h-5" />
                  <span>{series.year}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-5 h-5" />
                  <span>{series.duration}</span>
                </div>
              </div>

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {series.genre.map((g, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800/70 backdrop-blur-sm text-gray-200 rounded-full text-sm border border-gray-600/30"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-gray-200 text-lg leading-relaxed mb-8 max-w-3xl">
                {series.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => currentEpisode && handlePlayEpisode(currentEpisode)}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-600/25"
                >
                  <Play className="w-5 h-5" />
                  <span>Play Series</span>
                </button>
                
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    isLiked
                      ? 'bg-red-600 border-red-600 text-white'
                      : 'border-gray-600 text-gray-300 hover:border-red-600 hover:text-red-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>

                <button className="p-4 rounded-lg border-2 border-gray-600 text-gray-300 hover:border-white hover:text-white transition-all duration-300">
                  <Share2 className="w-5 h-5" />
                </button>

                <button className="p-4 rounded-lg border-2 border-gray-600 text-gray-300 hover:border-white hover:text-white transition-all duration-300">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Series Details Section */}
        <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900 py-16">


          {/* Episodes Section */}
          <div className="px-4 lg:px-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white flex items-center">
                <div className="w-1 h-8 bg-red-600 rounded-sm mr-4"></div>
                Episodes
              </h2>
              
              {/* Season Selector */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Season:</span>
                <div className="flex space-x-1">
                  {Array.from({ length: series.seasons }, (_, i) => i + 1).map((season) => (
                    <button
                      key={season}
                      onClick={() => setSelectedSeason(season)}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                        selectedSeason === season
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {season}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Episodes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seasonEpisodes.map((episode, index) => (
                <div
                  key={episode.id}
                  className="group cursor-pointer"
                  onClick={() => handlePlayEpisode(episode)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden rounded-xl transition-all duration-500 group-hover:scale-105 shadow-xl ring-1 ring-gray-800/20 group-hover:ring-red-600/50">
                    <img
                      src={episode.image_path}
                      alt={episode.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-all duration-500"></div>
                    
                    {/* Episode Number */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold">
                        EP {episode.episode_number}
                      </span>
                    </div>

                    {/* Duration */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-black/80 text-white text-xs px-2 py-1 rounded-lg font-medium">
                        {episode.duration}
                      </span>
                    </div>

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="bg-red-600 text-white p-4 rounded-full shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play className="w-6 h-6 fill-current" />
                      </div>
                    </div>

                    {/* Episode Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg mb-1">
                        {episode.title}
                      </h3>
                      <p className="text-gray-200 text-sm line-clamp-2 mb-2">
                        {episode.description}
                      </p>
                      <p className="text-gray-400 text-xs">
                        Released {episode.release_date.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default SeriesDetail;
