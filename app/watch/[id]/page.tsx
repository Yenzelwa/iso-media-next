import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "isolakwamuntu watch a video",
  description: "Browse all categories",
};
const WatchVideo = () => {
  return (
    <>
      <div className="video-container">
        <div className="video-container paused" data-volume-level="high">
          <img className="thumbnail-img" />
          <div className="video-controls-container">
            <div className="timeline-container">
              <div className="timeline">
                <img className="preview-img" />
                <div className="thumb-indicator"></div>
              </div>
            </div>
            <div className="controls">
              <button className="play-pause-btn">
                    <svg className="pause-icon" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M14,19H18V5H14M6,19H10V5H6V19Z"
                    />
                  </svg>
                  <svg className="play-icon" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M8,5.14V19.14L19,12.14L8,5.14Z"
                    />
                  </svg>
              </button>
              <div className="volume-container">
                <button className="mute-btn">
                    <svg className="volume-muted-icon" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
                      />
                    </svg>
                    <svg className="volume-high-icon" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
                      />
                    </svg>
                </button>
                <input
                  className="volume-slider"
                  type="range"
                  min="0"
                  max="1"
                  step="any"
                  value="1"
                />
              </div>
              <div className="duration-container">
                <div className="current-time">0:00</div>/
                <div className="total-time"></div>
              </div>
              <button className="captions-btn">
                <svg viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z"
                  />
                </svg>
              </button>
              <button className="speed-btn wide-btn">1x</button>    
              <button className="full-screen-btn">
                  <svg className="open" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                    />
                  </svg>
                  <svg viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                    />
                  </svg>
              </button>
            </div>
          </div>
          <video src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" autoPlay>
            <track kind="captions" src="../../../assets/subtitles.vtt" />
          </video>
        </div>
      </div>
      <div className="main-content wp-block-video-details">
        <section className="container-fluid p-4">
          <div className="trending-info season-info g-border bg-white p-4">
            <h4 className="trending-text big-title  text-xl text-uppercase mt-0">season.title</h4>
            <div className="flex items-center space-x-4 movie-content">
              <p className="text-white">details</p>
            </div>
            <p className="text-xl mt-4 mb-0">season?.description</p>
          </div>
        </section>
        </div>
        <section className="relative display-inline-block p-4">
                     <select name="cars" className="form-control season-select select2-hidden-accessible" data-select2-id="1"  aria-hidden="true">
                        <option value="season1" data-select2-id="3">Season 1</option>
                     </select>
                     <span className="select2 select2-container select2-container--bootstrap4 select2-container--focus" dir="ltr" data-select2-id="2">
                        <span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false"  aria-labelledby="select2-cars-1s-container">
                            <span className="select2-selection__rendered" id="select2-cars-1s-container" role="textbox" aria-readonly="true" title="Season 1">Season 1</span>
                            <span className="select2-selection__arrow" role="presentation">
                                <b role="presentation"></b>
                                </span>
                                </span></span>
                     <span className="dropdown-wrapper" aria-hidden="true"></span></span>
                  </section>
        <section className="show-movie w-full flex space-x-4">
  <div className="w-60 p-4">
    <div className="block-image relative">
      <a href="show-details.html">
        <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80" className="img-fluid img-zoom" alt="" loading="lazy" />
      </a>
      <div className="episode-number p-4 absolute top-4 left-4 bg-primary text-white">
        S01E02
      </div>
      <div className="episode-play-info">
        <div className="episode-play">
          <a href="show-details.html"><i className="ri-play-fill"></i></a>
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
        <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80" className="img-fluid img-zoom" alt="" loading="lazy" />
      </a>
      <div className="episode-number p-4 absolute top-4 left-4 bg-primary text-white">
        S01E02
      </div>
      <div className="episode-play-info">
        <div className="episode-play">
          <a href="show-details.html"><i className="ri-play-fill"></i></a>
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
  </div> <div className="w-60 p-4">
    <div className="block-image relative">
      <a href="show-details.html">
        <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80" className="img-fluid img-zoom" alt="" loading="lazy" />
      </a>
      <div className="episode-number p-4 absolute top-4 left-4 bg-primary text-white">
        S01E02
      </div>
      <div className="episode-play-info">
        <div className="episode-play">
          <a href="show-details.html"><i className="ri-play-fill"></i></a>
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
              <label className="mr-2" >
                Your rating
              </label>
              <ul className="list-none p-0 m-0 flex items-center text-primary space-x-2">
                <li>
                  <a className="text-primary" href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a className="pl-2 text-primary" href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a className="pl-2 text-primary" href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a className="pl-2 text-primary" href="#">
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a className="pl-2 text-primary" href="#">
                    <i className="fa fa-star-half-o" />
         </a>
                  </li>
                </ul>
                <span className="text-white ml-3">9.2 (lmdb)</span>
              </div>
              <div className="flex items-center mt-3">
                <textarea

                  rows={1}
                  className="w-full p-2 rounded-md border border-gray-300 placeholder-gray-500"
                  placeholder="Share your thoughts"
                  name="s"
                />
                  <button
                    type="submit"
                    className="comment-btn px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md ml-2"
                  >
                    <span className="screen-reader-text"></span>Comment
                  </button>
       
              </div>
            </div>
        </section>



    </>
  );
};

export default WatchVideo;