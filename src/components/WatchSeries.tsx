import { Episode, Season, Series } from "@/typings";
import DropdownSeasons from "./DropDownSeasons";
import { useEffect, useState } from "react";

interface SeasonsProps {
  seasons: Season[];
}
const Seasons: React.FC<SeasonsProps> = ({ seasons }) => {
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(seasons[0]);

  const handleSelectSeason = (season: Season) => {
    setSelectedSeason(season);
  };
  return (
    <>
      <DropdownSeasons seasons={seasons} onSelectSeason={handleSelectSeason} />
      <section className="show-movie w-full flex space-x-4">
        {selectedSeason && selectedSeason.episodes.map((episode: Episode, key) => (
          <div className="w-60 p-4" key={key}>
            <div className="block-image relative" >
              <a href="show-details.html">
                <img
                  src={episode.image_path}
                  className="img-fluid img-zoom"
                  alt=""
                  loading="lazy"
                />
              </a>
              <div className="episode-number p-4 absolute top-4 left-4 bg-primary text-white">
                {episode.episode_short_detail}
              </div>
              <div className="episode-play-info">
                <div className="episode-play">
                  <a href="show-details.html">
                    <i className="ri-play-fill"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="epi-desc p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="text-white rel-date">October 8, 2020</span>
              </div>
              <a href="show-detail.html">
                <h3 className="epi-name text-white mb-0">{episode.title}</h3>
              </a>
            </div>
          </div>
        ))}
      </section>
    </>

  );
}

export default Seasons;