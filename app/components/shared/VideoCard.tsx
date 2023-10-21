"use client";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronDownIcon, PlayIcon } from "@heroicons/react/24/outline";

import { Video } from "../../../typings";
import Link from "next/link";

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
    <div className="rating">
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
    </div>
</div>
    </div>
  );
};

export default MovieCard;
