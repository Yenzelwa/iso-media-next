import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { StarRating } from "./StarRating";
import { Video } from "@/typings";
import { useAuth } from "../app/context/authContext";

interface HeroProps {
  videos: Video[];
}

export const Hero: React.FC<HeroProps> = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  const activeVideo = useMemo(() => videos[currentIndex] ?? null, [videos, currentIndex]);

  const ratingValue = useMemo(() => {
    if (!activeVideo?.rating && activeVideo?.rating !== 0) {
      return 4;
    }
    const rounded = Math.round(activeVideo.rating);
    return Math.min(Math.max(rounded, 0), 5);
  }, [activeVideo]);

  const smoothTransition = (newIndex: number) => {
    if (isTransitioning || newIndex === currentIndex) return;

    setIsTransitioning(true);
    setContentVisible(false);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTimeout(() => {
        setContentVisible(true);
        setIsTransitioning(false);
      }, 120);
    }, 300);
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? videos.length - 1 : currentIndex - 1;
    smoothTransition(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === videos.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    smoothTransition(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    smoothTransition(slideIndex);
  };

  const redirectToWatch = useCallback(() => {
    if (!activeVideo) return;
    router.push(`/watch/${activeVideo.id}`);
  }, [router, activeVideo]);

  const redirectToSignIn = () => {
    router.push("/login");
  };

  useEffect(() => {
    if (!videos.length) return;

    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [videos.length, isTransitioning, currentIndex]);

  if (!videos.length || !activeVideo) return null;

  const categoryLabel = activeVideo.type?.name ?? "Featured";
  const displayTitle = activeVideo.title ?? "Featured Story";
  const description =
    activeVideo.description ??
    "Discover immersive stories curated to inspire, educate, and transform.";

  return (
    <section className="relative h-[calc(100vh-6rem)] sm:h-[calc(100vh-5rem)] lg:h-[calc(100vh-4rem)] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={activeVideo.image_path || "/images/2.jpg"}
          alt={displayTitle}
          className={`w-full h-full object-cover scale-105 blur-sm transition-all duration-700 ease-in-out ${
            isTransitioning ? "opacity-75" : "opacity-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/80" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/90 to-transparent" />
      </div>

      <div className="relative z-10 flex h-full items-center px-4 md:px-10 lg:px-16">
        <div
          className={`max-w-3xl transition-all duration-500 ${
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-red-600 text-white text-xs md:text-sm px-3 py-1.5 rounded-md font-semibold tracking-wide">
              {categoryLabel}
            </span>
            {activeVideo.type?.category?.name && (
              <span className="bg-white/10 text-white text-xs md:text-sm px-3 py-1.5 rounded-md backdrop-blur-sm border border-white/10">
                {activeVideo.type.category.name}
              </span>
            )}
          </div>

          <StarRating rating={ratingValue} />

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {displayTitle}
          </h1>

          <p className="text-sm md:text-base lg:text-lg text-gray-200 leading-7 max-w-2xl">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={user ? redirectToWatch : redirectToSignIn}
              type="button"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg shadow-red-600/25"
            >
              <Play className="w-4 h-4" />
              <span>{user ? "Play Now" : "Start Free Trial"}</span>
            </button>

            {!user && (
              <button
                onClick={redirectToSignIn}
                type="button"
                className="border border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-300"
              >
                Learn More
              </button>
            )}
          </div>
        </div>
      </div>

      {videos.length > 1 && (
        <>
          <button
            aria-label="Previous hero item"
            onClick={prevSlide}
            className="absolute top-1/2 left-6 -translate-y-1/2 z-20 rounded-full bg-black/40 text-white p-3 transition-all duration-300 hover:bg-black/60"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            aria-label="Next hero item"
            onClick={nextSlide}
            className="absolute top-1/2 right-6 -translate-y-1/2 z-20 rounded-full bg-black/40 text-white p-3 transition-all duration-300 hover:bg-black/60"
          >
            <ChevronRight size={28} />
          </button>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3">
            {videos.map((_, slideIndex) => (
              <button
                key={slideIndex}
                type="button"
                onClick={() => goToSlide(slideIndex)}
                className={`h-2 w-8 rounded-full transition-all duration-300 ${
                  slideIndex === currentIndex ? "bg-red-600" : "bg-white/30"
                }`}
                aria-label={`Go to slide ${slideIndex + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
