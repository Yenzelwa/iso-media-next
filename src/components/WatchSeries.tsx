import React, { useState } from 'react';
import { formatThumbsCount } from '../utils/formatThumbsCount';
import { Episode, Season } from '@/typings';

interface SeasonsProps {
  seasons: Season[];
  onEpisodeSelect?: (episode: Episode) => void;
}

const Seasons: React.FC<SeasonsProps> = ({ seasons, onEpisodeSelect }) => {
  const [selectedSeason, setSelectedSeason] = useState<number>(seasons[0]?.id || 1);

  const currentSeason = seasons.find(season => season.id === selectedSeason);

  return (
    <div className="space-y-6">
      {/* Season Selector */}
      <div className="flex items-center space-x-4">
        <h3 className="text-xl font-bold text-white">Episodes</h3>
        <select
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(Number(e.target.value))}
          className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          {seasons.map((season) => (
            <option key={season.id} value={season.id}>
              Season {season.seasonNumber}
            </option>
          ))}
        </select>
      </div>

      {/* Episodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentSeason?.episodes.map((episode) => (
          <div
            key={episode.id}
            className="bg-gray-700/50 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors duration-300 cursor-pointer group"
            onClick={() => onEpisodeSelect?.(episode)}
          >
            <div className="relative">
              <img
                src={episode.image_path}
                alt={episode.title}
                className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-red-600 rounded-full p-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-2 left-2">
                <span className="bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {episode.episode_short_detail}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h4 className="text-white font-semibold text-sm line-clamp-2 mb-2">
                {episode.title}
              </h4>
              <p className="text-gray-400 text-xs line-clamp-2 mb-3">
                {episode.description}
              </p>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046z"/>
                    </svg>
                    <span className="text-gray-400">{formatThumbsCount(episode.likes)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span className="text-gray-400">{episode.ratings}</span>
                  </div>
                </div>
                
                <span className="text-gray-500">
                  {episode.release_date.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seasons;
