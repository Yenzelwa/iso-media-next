'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Episode, Season } from '@/typings';
import DropdownSeasons from './DropDownSeasons';

interface SeasonsProps {
  seasons: Season[];
}

export function Seasons({ seasons }: SeasonsProps) {
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(seasons[0]);

  const handleSelectSeason = (season: Season) => {
    setSelectedSeason(season);
  };

  return (
        <div className="seasons-container">
      <DropdownSeasons seasons={seasons} onSelectSeason={handleSelectSeason} />

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {selectedSeason?.episodes.map((episode: Episode, index) => (
          <article
            key={episode.id}
            className="episode-card bg-gray-900 rounded-lg overflow-hidden"
          >
            <div className="relative">
              <Link href={`/episode/${episode.id}`}>
                <div className="aspect-video relative overflow-hidden group">
                  <img
                    src={episode.image_path}
                    alt={episode.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded">
                    {episode.episode_short_detail}
                  </div>

                  <div className="absolute inset-0 bg-gray-700 bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                    <div className="play-button opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg
                        className="w-16 h-16 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">
                  {new Date(episode.release_date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>

              <Link href={`/episode/${episode.id}`}>
                <h3 className="text-white text-lg font-semibold hover:text-red-500 transition-colors">
                  {episode.title}
                </h3>
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Seasons;
