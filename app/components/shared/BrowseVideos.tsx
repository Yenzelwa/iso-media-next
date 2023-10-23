"use client";
import React, { useState } from "react";
import { isEmpty } from "lodash";
import { Video, VideoCardModel } from "@/typings";
import MovieCard from "./VideoCard";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";

interface MovieListProps {
  data: Video[];
  title: string;
}

const url = (category: string) => {
  return category === "Series" ? "/series" : "/watch";
};

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <div className="relative px-4  pb-5 md:px-12 mt-4 space-y-8">
        <div>
          <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
            {title}
          </p>

          <div id="prev1" className="swiper-button swiper-button-prev relative pl-8"><i className="fa fa-chevron-left pl-8"></i></div>
         <div id="next1" className="swiper-button swiper-button-next relative"><i className="fa fa-chevron-right"></i></div>
                                    <Swiper
                                        slidesPerView={4}
                                        spaceBetween={20}
                                        navigation={{
                                            prevEl: '#prev1',
                                            nextEl: '#next1'
                                        }}
                                        loop={true}
                                        breakpoints={{
                                            320: { slidesPerView: 1 },
                                            550: { slidesPerView: 2 },
                                            991: { slidesPerView: 3 },
                                            1400: { slidesPerView: 4 },
                                        }}
                                        className="favorites-slider list-inline  row p-0 m-0 iq-rtl-direction">
          
              {data.map((video) => {
                return (
                  <SwiperSlide className="slide-item">
                    {" "}
                    <MovieCard  sub_title={video.type.name} data={video} />
                  </SwiperSlide>
                );       
              })}
        
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default MovieList;
