"use client";
import React from "react";
import { Video } from "@/typings";
import { MovieCard } from "./VideoCard";
interface VideosProps {
  data: Video[];
  title: string;
  page:string;
}

const Videos: React.FC<VideosProps> = ({ data, title, page }) => {
  return (
    <>
      <div className="px-4  pb-20 md:px-12 mt-4 space-y-8">
        <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
            {title}
          </p>
            <div className="grid grid-cols-4 gap-2 h-42">
              {
              data.map((video, key) => {
                return (
             <MovieCard key={key} sub_title={`${page === 'browse' ? video.type.category.name + ' - ' + video.type.name : video.type.category.name}`} movie={video} />   
                )
              })} 

            </div>      
        </div>
      </div>
    </>
  );
};
export default Videos;
