'use client';

import { Season } from '@/typings';
import React, { useState } from 'react';

interface DropdownSeasonsProps {
  seasons: Season[];
  onSelectSeason: (season: Season) => void;
}

export function DropdownSeasons({ seasons, onSelectSeason }: DropdownSeasonsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(seasons[0]);

  const handleSeasonSelect = (season: Season) => {
    setSelectedSeason(season);
    onSelectSeason(season);
    setIsOpen(false);
  };

  return (
    <div className="relative mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-700 text-white px-4 py-2 rounded-md flex items-center justify-between w-48"
      >
        <span>{selectedSeason ? `Season ${selectedSeason.seasonNumber}` : 'Select Season'}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-48 mt-1 bg-gray-800 rounded-md shadow-lg">
          {seasons.map((season) => (
            <button
              key={season.id}
              onClick={() => handleSeasonSelect(season)}
              className="block w-full px-4 py-2 text-left text-white hover:bg-gray-700"
            >
              Season {season.seasonNumber}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownSeasons;
