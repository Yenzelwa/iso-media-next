"use client";
import React, { useCallback } from "react";
import { Video } from "../../../typings";
import Link from "next/link";
import StarIcon from "./StarIcon";

interface MovieCardProps {
  data: Video;
  sub_title: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ data, sub_title}) => {

 
  const url = (category : string) =>{ return category === 'Series' ? `/series/${data.id}` : `/watch/${data.id}`;}

 

  return (
    <Link href={url(sub_title)} className="block-images1 block-images relative">
        <div className="img-box">
            <img src={data.image_path} className="img-fluid" alt="" />
        </div>
        <div className="flex flex-col items-start gap-1 mt-2 text-[8px] lg:text-sm">
    <p className="text-white text-[10px] lg:text-sm font-bold">
        {data.title}
    </p>
    <p className="text-white text-[10px] lg:text-sm">
        {sub_title}
    </p>
    {/* <div className="rating">
        <div className="star-rating">
            {Array.from({ length: 5 }, (_, index) => (
                <span
                    key={index}
                    className={`star ${
                        index < Math.floor(data.rating) ? 'text-red-500' : 'text-gray-300'
                    }`}
                >
                    ★
                </span>
            ))}
        </div>
    </div> */}
     <ul className="list-none p-0 m-0 flex items-center text-red-500 space-x-2">
      <li>
        <StarIcon/>
        
      </li>
      <li>
        <StarIcon/>
      </li>
      <li>
        <StarIcon/>
      </li>
      <li>
        <StarIcon/>
      </li>
      <li>
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" color="red" height="15" width="15" xmlns="http://www.w3.org/2000/svg" ><path fill="none" d="M0 0h24v24H0z"></path><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></svg>
      </li>
    </ul>
</div>
    </Link>
  );
};

export default MovieCard;
