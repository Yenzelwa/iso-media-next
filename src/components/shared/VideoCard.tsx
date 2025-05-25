"use client";
import React from 'react';
import Link from 'next/link';
import StarIcon from './StarIcon';
import { Video } from '@/typings';
import { BsHandThumbsUp, BsPlayFill, BsPlus } from 'react-icons/bs';

interface MovieCardProps {
  movie: Video;
  sub_title?: string;
   isActive?: boolean;
}


export const MovieCard: React.FC<MovieCardProps> = ({ movie, isActive = false }) => {
  const url = (category: string) => {
    return category === 'Series' ? `/series/${movie.id}` : `/watch/${movie.id}`;
  };

  return (
    <Link
      href={url(movie.type.name)}
      className={`relative block overflow-hidden rounded-lg group  transition-all duration-300 ${
        isActive ? 'shadow-2xl shadow-red-900/20' : ''
      }`}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={movie.image_path}
          alt={movie.title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <div className="flex justify-between items-center mb-3">
            <div className="flex gap-2">
              <button className="p-2 bg-white rounded-full hover:bg-red-600 hover:text-white transition-colors duration-200">
                <BsPlayFill className="w-5 h-5 text-black group-hover:text-white" />
              </button>
              <button className="p-2 bg-neutral-800/80 rounded-full hover:bg-red transition-colors duration-200">
                <BsPlus className="w-5 h-5 text-white" />
              </button>
              <button className="p-2 bg-neutral-800/80 rounded-full hover:bg-red transition-colors duration-200">
                <BsHandThumbsUp className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-white line-clamp-1">
              {movie.title}
            </h3>

            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-xs bg-red rounded-sm">
                {movie.type.name}
              </span>
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-3 h-3 ${i < Math.floor(movie.rating) ? 'text-red' : 'text-gray'}`}
                    />
                  ))}
                </div>
                <span className="ml-1 text-xs text-gray">
                  {movie.rating.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-gray">
                {movie.type.category.name}
              </span>
              <span className="text-xs text-gray">•</span>
              <span className="text-xs text-gray">
                {movie.likes} likes
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-2 right-2 transform scale-0 group-hover:scale-100 transition-transform duration-300">
        <div className="px-2 py-1 text-xs bg-red rounded">
          New
        </div>
      </div>
    </Link>
  );
};

