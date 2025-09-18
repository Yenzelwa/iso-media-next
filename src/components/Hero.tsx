import React, { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  // Note: Auth context would be added here when needed
  const { user } = useAuth();

    const smoothTransition = (newIndex: number) => {
    if (isTransitioning || newIndex === currentIndex) return;

    setIsTransitioning(true);
    setContentVisible(false);

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTimeout(() => {
        setContentVisible(true);
        setIsTransitioning(false);
      }, 100);
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

  const redirectToWatch = useCallback(
    () => router.push(`/watch/${videos[currentIndex].id}`),
    [router, videos, currentIndex]
  );

    const redirectToSignIn = () => {
    router.push("/login");
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isTransitioning]);

  const DotIcon = () => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 15 15"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      className="text-2xl cursor-pointer"
    >
      <path d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z" />
    </svg>
  );

  if (!videos.length) return null;

  return (
        <div className="shadow-md m-auto relative group overflow-hidden">
      <div
        style={{ position: "relative", height: "480px", width: "100%" }}
                className="bg-center bg-cover transition-all duration-1000 ease-in-out"
      >
        <img
          src={videos[currentIndex]?.image_path || "/images/2.jpg"}
          alt={videos[currentIndex]?.title || "Video thumbnail"}
                    className={`w-full h-full object-cover transition-all duration-1000 ease-in-out ${
            isTransitioning ? 'scale-110 blur-sm' : 'scale-100 blur-0'
          }`}
        />
        
        {/* Overlay gradients */}
                <div className={`absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent transition-opacity duration-500 ${
          isTransitioning ? 'opacity-60' : 'opacity-100'
        }`}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
                <div className={`absolute top-[20%] md:top-[20%] ml-4 md:ml-16 transition-all duration-500 transform ${
          contentVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
        }`}>
          <div className="show-movie w-full flex pb-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
                            <span className="overflow-hidden relative p-1.5 mb-3 border-l-4 bg-[linear-gradient(270deg,rgba(11,1,2,0)_0px,rgba(255,55,65,0.3)_100%)] border-[rgb(255,255,255)_rgb(255,255,255)_rgb(255,255,255)_rgb(229,9,20)] text-white animate-pulse">
                {videos[currentIndex]?.type.name}
              </span>
            </div>
          </div>
          
          <StarRating rating={Math.floor(videos[currentIndex]?.rating || 4)} />
          
                    <h1 className="text-5xl font-bold leading-10 max-md:text-4xl max-md:leading-10 max-sm:text-3xl max-sm:leading-8 text-white transform transition-all duration-700 hover:scale-105">
            {videos[currentIndex]?.title || "Family Unit"}
          </h1>
          
          <p className="pb-2 mt-8 w-4/5 text-sm leading-5 text-gray-200">
            {videos[currentIndex]?.description || 
             "Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum."}
          </p>

          <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
            {/* For now, we'll show the trial button. Auth logic can be added later */}
            {user ? (
              <button
                onClick={redirectToWatch}
                type="button"
                                className="bg-red-900 text-white px-4 py-2 hover:bg-red-800 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
              >
                Play Now
              </button>
            ) : (
              <button
                onClick={redirectToSignIn}
                type="button"
                                className="bg-red-900 text-white px-4 py-2 hover:bg-red-800 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
              >
                Try 14 days trial
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Navigation arrows */}
            <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 hover:bg-black/40">
        <ChevronLeft onClick={prevSlide} size={30} />
      </div>
            <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 hover:bg-black/40">
        <ChevronRight onClick={nextSlide} size={30} />
      </div>
      
      {/* Dot navigation */}
      <div className="flex top-4 justify-center py-2">
        {videos.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-2xl cursor-pointer transition-colors duration-300 ${
              slideIndex === currentIndex ? "text-red-600" : "text-gray-400 hover:text-white"
            }`}
          >
            <DotIcon />
          </div>
        ))}
      </div>
    </div>
  );
};
