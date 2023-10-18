"use client";
import React from "react";
import { isEmpty } from "lodash";
import { Movie } from "@/typings";
import MovieCard from "./MovieCard";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface MovieListProps {
  data: Movie[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <>
      <div className="px-4  pb-40 md:px-12 mt-4 space-y-8">
        <div>
          <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
            {title}
          </p>
          <div
            id="prev5"
            className="lg:text-2xl text-white left-35 flex items-center z-9">
            <i className="fa fa-chevron-left"></i>
          </div>
          <div id="next5" className="swiper-button swiper-button-next">
            <i className="fa fa-chevron-right"></i>
          </div>
          <Swiper
            spaceBetween={50}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={3}
            navigation={{
              prevEl: "#prev5",
              nextEl: "#next5",
            }}
            pagination={{
              clickable: true,
            }}
          >
            <div className="grid grid-cols-4 gap-2">
              {data.map((movie) => (
                <SwiperSlide>
                  {" "}
                  <MovieCard key={movie.id} data={movie} />
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
