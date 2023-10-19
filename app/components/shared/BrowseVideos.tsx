"use client";
import React, { useState } from "react";
import { isEmpty } from "lodash";
import { Video } from "@/typings";
import MovieCard from "./VideoCard";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface MovieListProps {
  data: Video[];
  title: string;
}

const url = (category : string) =>{ return category === 'Series' ? '/series' : '/watch';}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <div className="px-4  pb-5 md:px-12 mt-4 space-y-8">
        <div>
          <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
            {title}
          </p>
    
          <Swiper
            spaceBetween={50}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={3}
            navigation
            pagination={{
              clickable: true,
            }}
          >
            <div className="grid grid-cols-4 gap-2">
              {data.map((movie) => (
                <SwiperSlide>
                  {" "}
                  <MovieCard data={movie} />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default MovieList;
