"use client";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronDownIcon, PlayIcon } from "@heroicons/react/24/outline";

import { Video } from "../../../typings";
import Link from "next/link";
import StarIcon from "./StarIcon";

interface MovieCardProps {
  data: Video;
  sub_title: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ data, sub_title}) => {
  const router = useRouter();
 
  const url = (category : string) =>{ return category === 'Series' ? '/series' : '/watch';}

  const redirectToWatch = useCallback(
    () => router.push(`${url(data.type.name)}/${data.id}`),
    [router, data.id]
  );

  return (
    <div className="block-images1 block-images relative">
        <div className="img-box">
            <img src={data.image_path} className="img-fluid" alt="" />
        </div>
        <div className="block-description">
            <h6 className="iq-title"><Link href="/documentary-details?id=">{data.type.name}</Link></h6>

            <div className="hover-buttons">
                <Link href={url(data.type.name)} role="button" className="btn-primary btn-hover"><i className="fa fa-play mr-1" aria-hidden="true"></i>
                    Play Now
                </Link>
            </div>
        </div>
        <div className="flex flex-col items-start gap-1 mt-2 text-[8px] lg:text-sm">
    <p className="text-white text-[10px] lg:text-sm font-bold">
        {data.title}
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
        <a className="text-red" href="#">
        <StarIcon/>
        </a>
      </li>
      <li>
        <a className="text-red" href="#">
        <StarIcon/>
        </a>
      </li>
      <li>
        <a className="text-red-500" href="#">
        <StarIcon/>
        </a>
      </li>
      <li>
        <a className="text-red" href="#">
        <StarIcon/>
        </a>
      </li>
      <li>
        <a className="text-red" href="#">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" color="red" height="15" width="15" xmlns="http://www.w3.org/2000/svg" ><path fill="none" d="M0 0h24v24H0z"></path><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></svg>
        </a>
      </li>
    </ul>
</div>
    </div>
  );
};

export default MovieCard;
