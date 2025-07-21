'use client'
import { ChevronLeft, ChevronRight, Play, Plus, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Video } from "@/typings";

interface MovieCarouselProps {
  title: string;
  movies: Video[];
}

export const MovieCarousel = ({ title, movies }: MovieCarouselProps) => {
  const [scrollPositions, setScrollPositions] = useState<{
    [key: string]: number;
  }>({});

  const scrollContent = (direction: "left" | "right") => {
    const container = document.getElementById(`scroll-${title}`);
    if (container) {
      const scrollAmount = 400;
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      let newPosition;
      if (direction === "left") {
        newPosition = Math.max(0, currentScroll - scrollAmount);
      } else {
        newPosition = Math.min(maxScroll, currentScroll + scrollAmount);
      }

      container.scrollTo({ left: newPosition, behavior: "smooth" });
      
      // Update scroll position state after animation
      setTimeout(() => {
        setScrollPositions((prev) => ({ ...prev, [title]: newPosition }));
      }, 100);
    }
  };

  // Add scroll event listeners for better tracking
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const container = e.target as HTMLElement;
      setScrollPositions((prev) => ({ 
        ...prev, 
        [title]: container.scrollLeft 
      }));
    };

    const container = document.getElementById(`scroll-${title}`);
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [title]);

  return (
    <div className="px-4 lg:px-16 mb-8">
      {/* Section Header */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center space-x-4">
          <div className="w-1 h-8 bg-red-600 rounded-sm"></div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            {title}
          </h2>
        </div>
      </div>
      
      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => scrollContent("left")}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-red-600/90 hover:bg-red-600 backdrop-blur-sm text-white p-3 rounded-sm transition-all duration-300 -ml-6 shadow-xl border border-white/20 ${
            (scrollPositions[title] || 0) > 0 
              ? 'opacity-100 hover:scale-110' 
              : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={(scrollPositions[title] || 0) <= 0}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Content Container */}
        <div
          id={`scroll-${title}`}
          className="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth pb-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-none w-80 group/item cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg transition-all duration-700 group-hover/item:scale-105 group-hover/item:z-10 shadow-xl ring-1 ring-gray-800/20 group-hover/item:ring-red-600/50">
                <img
                  src={movie.image_path}
                  alt={movie.title}
                  className="w-full h-44 object-cover transition-transform duration-700 group-hover/item:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover/item:opacity-100 transition-all duration-500"></div>
                
                {/* Hover Controls */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <Button
                      size="sm"
                      className="bg-white text-black hover:bg-gray-200 rounded-sm p-2"
                    >
                      <Play className="w-4 h-4 fill-current" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white text-white hover:bg-white/10 rounded-sm p-2"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 left-2">
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-sm font-medium">
                    {movie.type.name}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <h3 className="text-white font-semibold text-lg group-hover/item:text-red-400 transition-colors duration-300">
                  {movie.title}
                </h3>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 text-xs font-semibold">
                      {movie.rating}
                    </span>
                  </div>
                  <span className="text-gray-400">{movie.likes} likes</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scrollContent("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-red-600/90 hover:bg-red-600 backdrop-blur-sm text-white p-3 rounded-sm opacity-100 hover:scale-110 transition-all duration-300 -mr-6 shadow-xl border border-white/20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
