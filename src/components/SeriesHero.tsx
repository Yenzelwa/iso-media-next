import React, { useState, useEffect } from "react";

import { Play, Star, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Video } from "@/typings";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface SeriesHeroProps {
  videos: Video[];
}

const NetflixSlider: React.FC<{ videos: Video[] }> = ({ videos }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const scrollContent = (direction: "left" | "right") => {
    const container = document.getElementById('series-slider');
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
      setScrollPosition(newPosition);
    }
  };

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const container = e.target as HTMLElement;
      setScrollPosition(container.scrollLeft);
    };

    const container = document.getElementById('series-slider');
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="relative group px-6 lg:px-16">
      {/* Left Arrow */}
      <button
        onClick={() => scrollContent("left")}
        className={`absolute left-2 lg:left-8 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-black text-white p-3 rounded transition-all duration-300 ${
          scrollPosition > 0 ? 'opacity-100' : 'opacity-50 cursor-not-allowed'
        }`}
        disabled={scrollPosition <= 0}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Content Container */}
      <div
        id="series-slider"
        className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex-none w-72 group/item cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-lg transition-all duration-300 group-hover/item:scale-105 shadow-xl">
              <img
                src={video.image_path}
                alt={video.title}
                className="w-full h-40 object-cover transition-transform duration-300 group-hover/item:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-all duration-300"></div>
              
              {/* Hover Controls */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    className="bg-white text-black hover:bg-gray-200 rounded-full p-2"
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 rounded-full p-2"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-2 left-2">
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded font-medium">
                  {video.type.category.name}
                </span>
              </div>
            </div>
            
            <div className="mt-3 space-y-1">
              <h3 className="text-white font-semibold text-sm group-hover/item:text-red-400 transition-colors duration-300 line-clamp-1">
                {video.title}
              </h3>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-yellow-400 font-semibold">
                    {video.rating}
                  </span>
                </div>
                <span className="text-gray-400">{video.likes} likes</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scrollContent("right")}
        className="absolute right-2 lg:right-8 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-black text-white p-3 rounded opacity-100 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export const SeriesHero: React.FC<SeriesHeroProps> = ({ videos }) => {
  const router = useRouter();

  if (!videos.length) return null;

  return (
    <div className="relative min-h-[80vh] bg-gradient-to-b from-gray-900 to-black">
      {/* Main Content */}
      <div className="container mx-auto pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 px-6 lg:px-16">
          
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Premium
              <span className="block text-red-500">
                Series Collection
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover transformative content designed to elevate your spiritual journey
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-6">
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg rounded-lg font-semibold"
              onClick={() => router.push('/series')}
            >
              <Play className="w-5 h-5 mr-2" />
              Browse Series
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 text-lg rounded-lg"
              onClick={() => router.push('/login')}
            >
              Start Free Trial
            </Button>
          </div>
        </div>

        {/* Netflix-style Series Slider */}
        <div className="mt-16">
          <div className="mb-6 px-6 lg:px-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-white">
              Featured Series
            </h2>
          </div>
          <NetflixSlider videos={videos.slice(0, 8)} />
        </div>
      </div>
    </div>
  );
};
