'use client'
import React from "react";
import { Video } from "@/typings";
import { ChevronLeft, ChevronRight, Play, Plus, Info, Star } from "lucide-react";
import { useState, useEffect } from "react";

interface EnhancedCarouselProps {
  title: string;
  movies: Video[];
  variant?: 'home' | 'series' | 'documentary';
}

export const EnhancedCarousel = ({ title, movies, variant = 'home' }: EnhancedCarouselProps) => {
  const [scrollPositions, setScrollPositions] = useState<{[key: string]: number}>({});
  const [isHovered, setIsHovered] = useState(false);

  const scrollContent = (direction: "left" | "right") => {
    const container = document.getElementById(`scroll-${title.replace(/\s+/g, '-')}`);
    if (container) {
      const scrollAmount = 400;
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      let newPosition: number;
      if (direction === "left") {
        newPosition = Math.max(0, currentScroll - scrollAmount);
      } else {
        newPosition = Math.min(maxScroll, currentScroll + scrollAmount);
      }

      container.scrollTo({ left: newPosition, behavior: "smooth" });
      
      setTimeout(() => {
        setScrollPositions((prev) => ({ ...prev, [title]: newPosition }));
      }, 100);
    }
  };

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const container = e.target as HTMLElement;
      setScrollPositions((prev) => ({ 
        ...prev, 
        [title]: container.scrollLeft 
      }));
    };

    const container = document.getElementById(`scroll-${title.replace(/\s+/g, '-')}`);
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [title]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'series':
        return {
          container: "relative group bg-gradient-to-r from-gray-900/30 to-slate-900/30 rounded-2xl p-8 backdrop-blur-sm border border-gray-700/30",
          header: "flex items-center space-x-4 mb-8",
          headerAccent: "h-1 w-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full",
          title: "text-3xl lg:text-4xl font-bold text-white",
          cardContainer: "flex-none w-80 group/item cursor-pointer",
          card: "relative overflow-hidden rounded-2xl transition-all duration-500 group-hover/item:scale-105 shadow-2xl ring-1 ring-gray-800/50 hover:ring-red-500/30",
          image: "w-full h-52 object-cover transition-all duration-500 group-hover/item:scale-110 group-hover/item:brightness-50",
          overlay: "absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20 opacity-0 group-hover/item:opacity-100 transition-all duration-500",
          additionalOverlay: "absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-all duration-300",
          controls: "absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all duration-300 z-20",
          controlsContent: "flex items-center space-x-3 bg-black/30 backdrop-blur-md rounded-2xl p-4 shadow-2xl",
          badge: "absolute top-4 left-4 z-10 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs px-3 py-2 rounded-full font-bold shadow-2xl backdrop-blur-md border border-red-400/30"
        };
      case 'documentary':
        return {
          container: "relative group bg-gradient-to-br from-slate-900/50 to-gray-900/50 rounded-3xl p-10 backdrop-blur-lg border border-gray-700/40",
          header: "flex items-center space-x-6 mb-10",
          headerAccent: "w-2 h-12 bg-gradient-to-b from-red-500 to-red-700 rounded-lg shadow-lg",
          title: "text-4xl lg:text-5xl font-bold text-white tracking-tight",
          cardContainer: "flex-none w-80 group/item cursor-pointer",
          card: "relative overflow-hidden rounded-3xl transition-all duration-700 group-hover/item:scale-105 shadow-2xl ring-2 ring-gray-700/50 hover:ring-red-500/50",
          image: "w-full h-56 object-cover transition-all duration-700 group-hover/item:scale-110 group-hover/item:brightness-75",
          overlay: "absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover/item:opacity-100 transition-all duration-500",
          additionalOverlay: "absolute inset-0 bg-black/30 opacity-0 group-hover/item:opacity-100 transition-all duration-300",
          controls: "absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all duration-300 z-20",
          controlsContent: "flex items-center space-x-4 bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20",
          badge: "absolute top-4 left-4 z-10 bg-gradient-to-r from-red-600/90 to-red-700/90 backdrop-blur-sm text-white text-xs px-4 py-3 rounded-2xl font-bold shadow-2xl border border-red-400/50"
        };
      default: // home
        return {
          container: "relative group bg-gradient-to-br from-slate-900/40 to-gray-900/40 rounded-2xl p-8 backdrop-blur-md border border-gray-700/30 shadow-2xl",
          header: "flex items-center space-x-6 mb-8",
          headerAccent: "w-1.5 h-10 bg-gradient-to-b from-red-500 to-red-600 rounded-lg shadow-lg",
          title: "text-4xl lg:text-5xl font-bold text-white tracking-tight",
          cardContainer: "flex-none w-80 group/item cursor-pointer",
          card: "relative overflow-hidden rounded-2xl transition-all duration-700 group-hover/item:scale-105 group-hover/item:z-10 shadow-2xl ring-1 ring-gray-700/50 group-hover/item:ring-red-500/50",
          image: "w-full h-48 object-cover transition-transform duration-700 group-hover/item:scale-110 group-hover/item:brightness-75",
          overlay: "absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-0 group-hover/item:opacity-100 transition-all duration-500",
          additionalOverlay: "absolute inset-0 bg-black/20 opacity-0 group-hover/item:opacity-100 transition-all duration-300",
          controls: "absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all duration-300",
          controlsContent: "flex items-center space-x-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/20",
          badge: "absolute top-3 left-3 bg-gradient-to-r from-red-600/90 to-red-700/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-xl font-semibold shadow-xl border border-red-400/40"
        };
    }
  };

  const styles = getVariantStyles();
  const currentScrollPos = scrollPositions[title] || 0;

  return (
    <div className="px-4 lg:px-16 mb-12">
      <div 
        className={styles.container}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.headerAccent}></div>
          <h2 className={styles.title}>
            {title}
          </h2>
        </div>
        
        <div className="relative">
          {/* Left Arrow - Only show on hover */}
          <button
            onClick={() => scrollContent("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-gray-900/95 backdrop-blur-sm hover:bg-gray-800 text-white p-4 rounded-full shadow-2xl border border-gray-700 transition-all duration-300 hover:scale-110 -ml-6 ${
              isHovered && currentScrollPos > 0 
                ? 'opacity-100 pointer-events-auto' 
                : 'opacity-0 pointer-events-none'
            }`}
            disabled={currentScrollPos <= 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Content Container */}
          <div
            id={`scroll-${title.replace(/\s+/g, '-')}`}
            className="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth pb-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {movies.map((movie, index) => (
              <div
                key={movie.id}
                className={styles.cardContainer}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={styles.card}>
                  <img
                    src={movie.image_path}
                    alt={movie.title}
                    className={styles.image}
                  />
                  
                  {/* Enhanced overlay for text readability */}
                  <div className={styles.overlay}></div>
                  {styles.additionalOverlay && <div className={styles.additionalOverlay}></div>}
                  
                  {/* Hover Controls */}
                  <div className={styles.controls}>
                    <div className={styles.controlsContent}>
                      <button className="bg-white/95 backdrop-blur-sm text-black hover:bg-white rounded-full p-3 shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-white/20">
                        <Play className="w-6 h-6 fill-current" />
                      </button>
                      <button className="border-2 border-white/90 text-white hover:bg-white/30 backdrop-blur-sm rounded-full p-3 shadow-2xl hover:scale-110 transition-all duration-300 hover:border-white">
                        <Plus className="w-6 h-6" />
                      </button>
                      {variant === 'documentary' && (
                        <button className="border-2 border-white/90 text-white hover:bg-white/30 backdrop-blur-sm rounded-full p-3 shadow-2xl hover:scale-110 transition-all duration-300 hover:border-white">
                          <Info className="w-6 h-6" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={styles.badge}>
                      {movie.type.name}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  {variant !== 'home' && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="flex items-center space-x-1 bg-black/90 backdrop-blur-md text-white text-sm px-3 py-2 rounded-full shadow-2xl border border-gray-600/30">
                        <Star className="w-4 h-4 text-yellow-400 fill-current drop-shadow-sm" />
                        <span className="font-bold text-shadow">{movie.rating}</span>
                      </div>
                    </div>
                  )}

                  {/* Duration/Episode Badge */}
                  {variant === 'series' && (
                    <div className="absolute bottom-4 right-4 z-10">
                      <span className="bg-gray-900/95 backdrop-blur-md text-white text-xs px-3 py-2 rounded-full font-semibold shadow-2xl border border-gray-700/50">
                        {Math.floor(Math.random() * 12 + 4)} Episodes
                      </span>
                    </div>
                  )}

                  {variant === 'documentary' && (
                    <div className="absolute bottom-4 right-4 z-10">
                      <span className="bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-full font-semibold border border-gray-600/50">
                        {Math.floor(Math.random() * 60 + 30)} min
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 space-y-4 px-3">
                  <h3 className="text-white font-bold text-xl group-hover/item:text-red-400 transition-colors duration-300 line-clamp-2 leading-tight">
                    {movie.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-300">{movie.likes} likes</span>
                      {variant !== 'home' && (
                        <>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-400">
                            {new Date(movie.release_date).getFullYear()}
                          </span>
                        </>
                      )}
                    </div>
                    {variant === 'home' && (
                      <div className="flex items-center space-x-1 bg-yellow-400/20 rounded-full px-3 py-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-yellow-400 text-sm font-bold">
                          {movie.rating}
                        </span>
                      </div>
                    )}
                  </div>
                  {variant !== 'home' && (
                    <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                      {movie.description}
                    </p>
                  )}
                  {variant === 'home' && (
                    <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">
                      {movie.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow - Only show on hover */}
          <button
            onClick={() => scrollContent("right")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-gray-900/95 backdrop-blur-sm hover:bg-gray-800 text-white p-4 rounded-full shadow-2xl border border-gray-700 transition-all duration-300 hover:scale-110 -mr-6 ${
              isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
