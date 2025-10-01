'use client'
import React, { useState, useEffect } from 'react';
import { Play, Star, Calendar, ChevronLeft } from 'lucide-react';
import { Video } from '@/typings';
import { useParams, useRouter } from 'next/navigation';

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

interface SeriesData extends Video {
  episodes?: Episode[];
  seasons?: number;
  totalEpisodes?: number;
  director?: string;
  cast?: string[];
  genre?: string[];
  year?: number;
  duration?: string;
}

const SeriesDetail = () => {
  const router = useRouter();
  const {id} = useParams<{id : string}>()
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [series, setSeries] = useState<SeriesData | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if(!id) return;
    const fetchSeriesData = async () => {
      try {
        setLoading(true);

        // Fetch series details
        const seriesResponse = await fetch(`/api/series/${id}`);
        if (seriesResponse.ok) {
          const seriesData = await seriesResponse.json();
          setSeries(seriesData);
        } else {
          throw new Error('Failed to fetch series details');
        }

        // Fetch episodes for the first season
        const episodesResponse = await fetch(`/api/series/${id}/seasons/${selectedSeason}/episodes`);
        if (episodesResponse.ok) {
          const episodesData = await episodesResponse.json();
          setEpisodes(episodesData.items || episodesData || []);
        }

      } catch (err) {
        console.error('Error fetching series data:', err);
        setError('Failed to load series details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSeriesData();
  }, [id, selectedSeason]);

  useEffect(() => {
    if (episodes.length > 0) {
      setCurrentEpisode(episodes[0]);
    }
  }, [episodes]);

  const seasonEpisodes = episodes.filter(ep => ep.season_number === selectedSeason);

  if (loading) {
    return (
      <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg text-gray-300">Loading series details...</span>
        </div>
      </div>
    );
  }

  if (error || !series) {
    return (
      <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error || 'Series not found'}</div>
          <button
            onClick={() => router.push('/series')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Series
          </button>
        </div>
      </div>
    );
  }

  const seasonCount = Array.isArray(series.seasons)
    ? series.seasons.length
    : typeof series.seasons === 'number'
      ? series.seasons
      : Number(series.seasons) || 1;

  const episodeCount =
    typeof series.totalEpisodes === 'number' && series.totalEpisodes > 0
      ? series.totalEpisodes
      : episodes.length;

  const releaseYear =
    series.year ??
    (series.release_date ? new Date(series.release_date).getFullYear() : undefined);

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

              {/* Series Badges */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-gray-900/80 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-lg">
                  {seasonCount} Season{seasonCount !== 1 ? 's' : ''}
                </span>

                <span className="bg-gray-900/80 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-lg">
                  {episodeCount} Episode{episodeCount !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {series.title}
              </h1>

              {/* Rating and Meta */}
              <div className="flex flex-wrap items-center gap-6 mb-6 text-white">
                {series.rating ? (
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold text-lg">{series.rating}</span>
                  </div>
                ) : null}
                {releaseYear ? (
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-5 h-5" />
                    <span>{releaseYear}</span>
                  </div>
                ) : null}
              </div>

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {(series.genre || [series.type?.category?.name].filter(Boolean)).map((g, index) => (
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
                  {Array.from({ length: series.seasons || 1 }, (_, i) => i + 1).map((season) => (
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
                      className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
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
