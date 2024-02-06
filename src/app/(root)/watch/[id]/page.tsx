'use client'
import Player from "@/src/components/Player";
import StarIcon from "@/src/components/shared/StarIcon";
import { Video, WatchVideo } from "@/typings";
import { Metadata } from "next";
import Link from "next/link";
import React, { useState } from "react";

// export const metadata: Metadata = {
//   title: "isolakwamuntu watch a video",
//   description: "Browse all categories",
// };
const WatchVideo = (id: number) => {

  const currentVideoData: WatchVideo =
  {
    episode_details: '23 October 2023 - Season 2 - Episode 01',
    next_video_id: 254,
    video: {
      id: 253,
      title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
      description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean
        commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
        et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
        felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
        consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
        nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
        venenatis vitae, justo.`,
      image_path: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
      release_date: new Date('2023-10-23'),
      video_path: '',
      likes: 25,
      rating: 4.2,
      type: {
        id: 1,
        name: 'Series',
        category: {
          id: 1,
          name: 'Education'
        }
      },
    }

  };
  const [currentVideo, SetCurrentVideo] = useState(currentVideoData);

  const playNextVideo = () => {
    const nexttVideoData: WatchVideo =
    {
      episode_details: '24 October 2023 - Season 2 - Episode 02',
      next_video_id: 0,
      video: {
        id: 254,
        title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit Next Episdose",
        description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
          nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
          venenatis vitae, justo.`,
        image_path: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
        release_date: new Date('2023-10-24'),
        video_path: '',
        likes: 1225,
        rating: 4.8,
        type: {
          id: 1,
          name: 'Series',
          category: {
            id: 1,
            name: 'Education'
          }
        },
      }

    };
    SetCurrentVideo(nexttVideoData);
  }

  return (
    <>
      <Player />
      <section className="p-4">
        <div className="pb-2 flex items-center space-x-4 movie-content">
          <p className="text-gray text-md">
            {currentVideo.episode_details}
          </p>
        </div>
        <h4 className="text-3xl font-bold text-uppercase mt-0">
          {currentVideo.video.title}
        </h4>
        <div className="flex items-center space-x-4 pt-4">
          {currentVideo.next_video_id > 0 ?
            <button onClick={() => playNextVideo()} className="bg-red hover:bg-red text-white font-bold py-2 px-4 rounded">
              Next Episode
            </button> : null}

          <div className="flex items-center space-x-4">
            <button className="flex items-center bg-gray rounded-full text-white px-4 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
              Like
              <span className="text-gray-600">10</span>
            </button>
             {/* Replace 10 with the actual number of likes */}

            <button className="flex items-center bg-red rounded-full text-white px-4 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Dislike
              <span className="text-gray-600">5</span>
            </button>
             {/* Replace 5 with the actual number of dislikes */}
          </div>

        </div>
        <p className="pt-4 mt-4 mb-0 text-gray-700">
          {currentVideo.video.description}
        </p>
      </section>

      <section className="relative p-4 flex items-center">
        <select
          name="cars"
          className="bg-dark text-white rounded p-2 border border-white"
          data-select2-id="1"
          aria-hidden="true"
        >
          <option value="season1" data-select2-id="3" className="bg-black text-white">
            Season 1
          </option>
          <option value="season2" data-select2-id="4" className="bg-black text-white">
            Season 2
          </option>
        </select>
      </section>

      <section className="show-movie w-full flex space-x-4">
        <div className="w-60 p-4">
          <div className="block-image relative">
            <a href="show-details.html">
              <img
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80"
                className="img-fluid img-zoom"
                alt=""
                loading="lazy"
              />
            </a>
            <div className="episode-number p-4 absolute top-4 left-4 bg-primary text-white">
              S01E02
            </div>
            <div className="episode-play-info">
              <div className="episode-play">
                <a href="show-details.html">
                  <i className="ri-play-fill"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="epi-desc p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="text-white rel-date">October 8, 2020</span>
            </div>
            <a href="show-detail.html">
              <h3 className="epi-name text-white mb-0">The Reckless 2</h3>
            </a>
          </div>
        </div>
        <div className="w-60 p-4">
          <div className="block-image relative">
            <a href="show-details.html">
              <img
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80"
                className="img-fluid img-zoom"
                alt=""
                loading="lazy"
              />
            </a>
            <div className="episode-number p-4 absolute top-4 left-4 bg-primary text-white">
              S01E02
            </div>
            <div className="episode-play-info">
              <div className="episode-play">
                <a href="show-details.html">
                  <i className="ri-play-fill"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="epi-desc p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="text-white rel-date">October 8, 2020</span>
            </div>
            <a href="show-detail.html">
              <h3 className="epi-name text-white mb-0">The Reckless 2</h3>
            </a>
          </div>
        </div>{" "}
        <div className="w-60 p-4">
          <div className="block-image relative">
            <a href="show-details.html">
              <img
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80"
                className="img-fluid img-zoom"
                alt=""
                loading="lazy"
              />
            </a>
            <div className="episode-number p-4 absolute top-4 left-4 bg-primary text-white">
              S01E02
            </div>
            <div className="episode-play-info">
              <div className="episode-play">
                <a href="show-details.html">
                  <i className="ri-play-fill"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="epi-desc p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="text-white rel-date">October 8, 2020</span>
            </div>
            <a href="show-detail.html">
              <h3 className="epi-name text-white mb-0">The Reckless 2</h3>
            </a>
          </div>
        </div>
      </section>
      <section>
        <div className="bg-white p-4">
          <div className="flex items-center mt-3 mb-3">
            <label className="mr-2">Your rating</label>
            <ul className="list-none p-0 m-0 flex items-center text-red-500 space-x-2">
              <li>
                <a className="text-red" href="#">
                  <StarIcon />
                </a>
              </li>
              <li>
                <a className="text-red" href="#">
                  <StarIcon />
                </a>
              </li>
              <li>
                <a className="text-red-500" href="#">
                  <StarIcon />
                </a>
              </li>
              <li>
                <a className="text-red" href="#">
                  <StarIcon />
                </a>
              </li>
              <li>
                <a className="text-red" href="#">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" color="red" height="15" width="15" xmlns="http://www.w3.org/2000/svg" ><path fill="none" d="M0 0h24v24H0z"></path><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></svg>
                </a>
              </li>
            </ul>
          </div>
          <div className="flex items-center mt-3">
            <textarea
              rows={1}
              className="w-80 p-2 rounded-md border border-gray placeholder-gray"
              placeholder="Share your thoughts"
              name="s"
            />
            <button
              type="submit"
              className="bg-red text-white px-4 py-2 hover:bg-red-600 rounded-md ml-2"
            >
              Comment
            </button>
          </div>
        </div>

        <div className="p">
          <div className="p-4">
            <ul className="list-inside space-y-4">
              <li className="list-inside-item">
                <div className="flex items-center space-x-3">
                  <a
                    href="#"
                    className="text-blue-500 hover:underline font-semibold"
                  >
                    Nokukhanya Dumakude
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    10 days
                  </a>
                </div>
                <p className="pb-2 trending-dec w-100 mb-0">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                  penatibus et magnis dis parturient montes, nascetur ridiculus
                  mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
                  quis, sem. Nulla consequat massa quis enim. Donec pede justo,
                  fringilla vel, aliquet nec, vulputate eget, arcu.
                  <a href="#" className="p-2  text-red">
                    Reply
                  </a>
                </p>
                <Link href="" className="pb-8 text-red">
                  Reply (8)
                </Link>
              </li>
            </ul>
          </div>
          <div className="p-4">
            <ul className="list-inside space-y-4">
              <li className="list-inside-item">
                <div className="flex items-center space-x-3">
                  <a
                    href="#"
                    className="text-blue-500 hover:underline font-semibold"
                  >
                    Sanele Jili
                  </a>
                  <a href="#" className="p-2 text-gray">
                    2 days
                  </a>
                </div>
                <p className="pb-2 trending-dec w-100 mb-0">
                  In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                  Nullam dictum felis eu pede mollis pretium. Integer tincidunt.
                  Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
                  eleifend tellus. Aenean leo ligula, porttitor eu, consequat
                  vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in,
                  viverra quis, feugiat a, tellus. Phasellus viverra nulla ut
                  metus varius laoreet.
                  <a href="#" className="p-2  text-red">
                    Reply
                  </a>
                </p>
                <Link href="" className="pb-8 text-red">
                  Reply (2)
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

    </>
  );
};

export default WatchVideo;
