"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/context/authContext";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import StarIcon from "./shared/StarIcon";
import { Video } from "@/typings";
import { StarRating } from "./StarRating";


interface HeroProps {
  videos: Video[];
}

export const Hero: React.FC<HeroProps> = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const { user } = useAuth();

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

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const redirectToWatch = useCallback(
    () => router.push(`/watch/${videos[currentIndex].id}`),
    [router, videos, currentIndex]
  );

  const redirectToSignIn = () => {
    router.push("/account");
  };

  return (
    <div className="shadow-md m-auto relative group">
      <div
        style={{ position: "relative", height: "480px", width: "100%" }}
        className="bg-center bg-cover duration-500"
      >
        <Image
          src={videos[currentIndex]?.image_path || "/images/2.jpg"}
          alt={videos[currentIndex]?.title || "Video thumbnail"}
          fill
          style={{ objectFit: "cover" }}
          priority
          quality={75}
        />
        <div className="absolute top-[20%] md:top-[20%] ml-4 md:ml-16 via-transparent to-transparent">
          <div className="show-movie w-full flex pb-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="overflow-hidden relative p-1.5 mb-3 border-l-4 bg-[linear-gradient(270deg,rgba(11,1,2,0)_0px,rgba(255,55,65,0.3)_100%)] border-[rgb(255,255,255)_rgb(255,255,255)_rgb(255,255,255)_rgb(229,9,20)]">
                {videos[currentIndex]?.type.name}
              </span>
            </div>
          </div>
         <StarRating rating={4} />
         <h1 className="text-5xl font-bold leading-10 max-md:text-4xl max-md:leading-10 max-sm:text-3xl max-sm:leading-8">
            Family Unit
           </h1>
           <p className="pb-2 mt-8 w-4/5 text-sm leading-5">
             Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.
             Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
            libero, sit amet adipiscing sem neque sed ipsum.
          </p>

          <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
            {user ? (
              <button
                onClick={redirectToWatch}
                type="button"
                className="bg-red-900 text-white px-4 py-2 hover:bg-red-800 rounded-md transition-colors duration-200"
              >
                Play Now
              </button>
            ) : (
              <button
                onClick={redirectToSignIn}
                type="button"
                className="bg-red text-white px-4 py-2 hover:bg-red rounded-md transition-colors duration-200"
              >
                Try 14 days trial
              </button>
            )}
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
        {videos.map((_, slideIndex) => (
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
  );
};




// import { StarRating } from "../components/StarRating";



// export const Hero = () => {
//   return (
//     <section className="relative m-auto w-full h-[780px] shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.1)_0px_4px_6px_-1px,rgba(0,0,0,0.1)_0px_2px_4px_-2px] max-md:h-[600px] max-sm:h-[400px]">
//       <div className='w-full bg-cover bg-[50%_50%] bg-[url("https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80")] duration-[0.5s] h-[480px]'>
//         <div className="absolute ml-16 top-[20%] max-md:ml-8 max-sm:ml-4 max-sm:top-[10%]">
//           <div className="flex relative pb-4 w-full">
//             <div className="overflow-hidden relative p-1.5 mb-3 border-l-4 bg-[linear-gradient(270deg,rgba(11,1,2,0)_0px,rgba(255,55,65,0.3)_100%)] border-[rgb(255,255,255)_rgb(255,255,255)_rgb(255,255,255)_rgb(229,9,20)]">
//               Series
//             </div>
//           </div>
//           <StarRating rating={4} />
//           <h1 className="text-5xl font-bold leading-10 max-md:text-4xl max-md:leading-10 max-sm:text-3xl max-sm:leading-8">
//             Family Unit
//           </h1>
//           <p className="pb-2 mt-8 w-4/5 text-sm leading-5">
//             Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.
//             Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
//             libero, sit amet adipiscing sem neque sed ipsum.
//           </p>
//           <div className="flex gap-3 items-center mt-4">
//             <button
//               type="submit"
//               className="px-4 py-2 text-sm leading-5 text-center bg-red rounded-md border-black border-opacity-0"
//             >
//               Try 14 days trial
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-center py-2">
//         {[1, 2, 3, 4, 5, 6].map((dot) => (
//           <button
//             key={dot}
//             aria-label={`Go to slide ${dot}`}
//             className="text-2xl leading-8"
//           >
//             {/* <svg
//               stroke="currentColor"
//               fill="none"
//               strokeWidth="0"
//               viewBox="0 0 15 15"
//               height="1em"
//               width="1em"
//               xmlns="http://www.w3.org/2000/svg"
//               className="overflow-hidden align-middle stroke-0 fill-none h-[1em] stroke-white w-[1em]"
//             >
//               <path
//                 d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
//                 fill="currentColor"
//               />
//             </svg> */}  NEXT
//           </button>
//         ))}
//       </div>
//     </section>
//   );
// };
