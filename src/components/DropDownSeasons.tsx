import { Season, Series } from '@/typings';
import React, { useState } from 'react';

interface DropdownSeasonsProps {
  seasons: Season[];
  onSelectSeason: (season: Season) => void;
}
const DropdownSeasons:React.FC<DropdownSeasonsProps> =({seasons, onSelectSeason}) =>{
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(seasons[0]);

  const handleSeasonSelect = (season: Season) => {
    setSelectedSeason(season);
    onSelectSeason(season);
  };

  return (
    <section className="relative p-4 flex items-center">
    <select
      name="seasons"
      className="bg-dark text-white rounded p-2 border border-white"
      aria-hidden="true"
      onChange={(e) => handleSeasonSelect(seasons[parseInt(e.target.value) - 1] ?? null)}
    >
      
      {seasons.map((season, index) => (
        
        <option key={season.id} value={index + 1}>
          {`Season 0${season.seasonNumber}`}
        </option>
      ))}
    </select>
  </section>
  );
}

export default DropdownSeasons;
