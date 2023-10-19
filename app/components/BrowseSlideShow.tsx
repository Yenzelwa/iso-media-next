"use client";
import { Video } from "@/typings"
import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
interface BrowseSlideShowProps {
  movies: Video[];
}

const BrowseSlideShow: React.FC<BrowseSlideShowProps> = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? movies.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === movies.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex : number) => {
    setCurrentIndex(slideIndex);
  };


  return (
    <>
      <div className="shadow-md h-[780px] w-full m-auto relative group">
        <div
          style={{ backgroundImage: `url(${movies[currentIndex].image_path})` }}
          className="h-[480px] w-full  bg-center bg-cover duration-500"
        >
          <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16 via-transparent to-transparent">
            <p className="text-white text-1xl md:text-5xl h-full w-[50%]  font-bold drop-shadow-xl">
              {movies[currentIndex]?.title}
            </p>
            <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
              {movies[currentIndex]?.description}
            </p>
            <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
              <button className="bg-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition">
                <div className="w-4 md:w-7 mr-1" />
                More Info
              </button>
            </div>
          </div>
        </div>
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className="flex top-4 justify-center py-2">
          {movies.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer"
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default BrowseSlideShow;
