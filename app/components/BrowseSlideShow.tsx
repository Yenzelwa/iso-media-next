import Link from "next/link";
import React from "react";

const BrowseSlideShow = () =>{

    return (
        <>
 
<div id="default-carousel" className="relative w-full" data-carousel="slide">
    <div className="relative overflow-hidden rounded-lg md:h-96">
    <div className=" block-images position-relative">
              <div className="img-box">
                <img
                
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="block-description">
                <h6 className="iq-title">
                  <Link href="/series-details"></Link>
                </h6>
                <div className="movie-time d-flex align-items-center my-2 iq-ltr-direction">
                  <div className="badge badge-secondary p-1 mr-2">
                    15+
                  </div>
                  <span className="text-white">2hrs</span>
                </div>
                <div className="hover-buttons">
                  <Link
                    href="/series-details"
                    role="button"
                    className="btn btn-hover iq-button"
                  >
                    <i
                      className="fa fa-play mr-1"
                      aria-hidden="true"
                    ></i>
                    Play Now
                  </Link>
                </div>
              </div>
              <div className="block-social-info">
                <ul className="list-inline p-0 m-0 music-play-lists">
                  <li className="share">
                    <span>
                      <i className="ri-share-fill"></i>
                    </span>
                    <div className="share-box">
                      <div className="d-flex align-items-center">
                        <Link
                          href="https://www.facebook.com/sharer?u=https://iqonic.design/wp-themes/streamit_wp/movie/shadow/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="share-ico"
                        >
                          <i className="ri-facebook-fill"></i>
                        </Link>
                        <Link
                          href="https://twitter.com/intent/tweet?text=Currentlyreading"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="share-ico"
                        >
                          <i className="ri-twitter-fill"></i>
                        </Link>
                        <Link
                          href="#"
                          data-link="https://iqonic.design/wp-themes/streamit_wp/movie/shadow/"
                          className="share-ico iq-copy-link"
                        >
                          <i className="ri-links-fill"></i>
                        </Link>
                      </div>
                    </div>
                  </li>
                  <li>
                    <span>
                      <i className="ri-heart-fill"></i>
                    </span>
                    <span className="count-box">19+</span>
                  </li>
                  <li>
                    <span>
                      <i className="ri-add-line"></i>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="/docs/images/carousel/carousel-2.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
        </div>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="/docs/images/carousel/carousel-3.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
        </div>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="/docs/images/carousel/carousel-4.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
        </div>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="/docs/images/carousel/carousel-5.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
        </div>
    </div>
    <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
    </div>
    <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
        </span>
    </button>
</div>

        </>
    )
}

export default BrowseSlideShow;