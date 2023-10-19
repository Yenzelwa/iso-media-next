"use client";
import React, { useState } from "react";
import { Video } from "@/typings";
import VideoCard from "./VideoCard";


interface VideosProps {
  data: Video[];
  title: string;
}

const Videos: React.FC<VideosProps> = ({ data, title }) => {
  return (
    <>
      <div className="px-4  pb-40 md:px-12 mt-4 space-y-8">
        <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
            {title}
          </p>
            <div className="grid grid-cols-4 gap-2">
              {data.map((video) => (      
                  <VideoCard data={video} />       
              ))}
            </div>      
        </div>
      </div>
    </>
  );
};

export default Videos;
