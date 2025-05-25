"use client";
import { Video } from '@/typings';
import React from 'react';
import { MovieCard } from './shared/VideoCard';

interface CarouselProps {
  title: string;
  movies: Video[];
}

export const MovieCarousel: React.FC<CarouselProps> = ({ title, movies }) => {
  return (
    <section className="relative px-2 pb-5 mt-4">
      <div>
        <h2 className="mb-4 text-2xl font-semibold leading-8">{title}</h2>
        <div className="relative flex-wrap mx-auto overflow-hidden touch-pan-y z-[1]">
          <div className="box-content flex relative transition-transform size-full z-[1]">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="relative shrink-0 mr-5 h-full transition-transform w-[461px]"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
