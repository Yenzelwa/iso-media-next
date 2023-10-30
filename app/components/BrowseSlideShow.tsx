"use client";
import { Video } from "@/typings"
import React, { useCallback, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import StarIcon from "./shared/StarIcon";
import { useRouter } from "next/navigation";
interface BrowseSlideShowProps {
  videos: Video[];
}

const BrowseSlideShow: React.FC<BrowseSlideShowProps> = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? videos.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === videos.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex : number) => {
    setCurrentIndex(slideIndex);
  };

  const redirectToWatch = useCallback(
    () => router.push(`/watch/${videos[currentIndex].video_id}`),
    [router, videos[currentIndex].video_id]
    
  );

  return (
    <>
      <div className="shadow-md h-[780px] w-full m-auto relative group">
        <div
          style={{ backgroundImage: `url(${videos[currentIndex].image_path})` }}
          className="h-[480px] w-full  bg-center bg-cover duration-500"
        >
          <div className="absolute top-[20%] md:top-[20%] ml-4 md:ml-16 via-transparent to-transparent">
          <div className="show-movie w-full flex pb-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="type-container">Series</span>
            </div>
         
          </div>
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
            <p className="text-white text-1xl md:text-5xl font-bold drop-shadow-xl">
              {videos[currentIndex]?.title}
            </p>
       
            <p className="pb-2 trending-dec w-100 mb-0 text-white text-[8px] md:text-m mt-3 md:mt-8 w-[90%] md:w-[80%]  drop-shadow-xl">
              {/* {movies[currentIndex]?.description} */}
              Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.
            </p>
            <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
              <button
              onClick={() => redirectToWatch()}
      type="submit"
      className="bg-red text-white px-4 py-2 hover:bg-red-600 rounded-md "
    >
      Play Now
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
          {videos.map((slide, slideIndex) => (
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
