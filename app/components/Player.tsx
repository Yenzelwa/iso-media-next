'use client'
import { useState } from "react"

const Player = () =>{
 const [btnPlay, setBtnPlay] = useState(true);
 const [btnMute, setBtnMute] = useState(false);
 const [btnFullScreen, setBtnFullScreen] = useState(false);
 
 const btnPlayPause = document.querySelector('.play-pause-btn');
 const togglePlay = () =>{
    if(btnPlay) { setBtnPlay(true) ; }
    else { setBtnPlay(false); }
 }
 btnPlayPause?.addEventListener("click", togglePlay);

    return(
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
                
              <button onClick={() => setBtnPlay(!btnPlay)} className="play-pause-btn">
              {btnPlay ? 
                    <svg className="pause-icon" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M14,19H18V5H14M6,19H10V5H6V19Z"
                    />
                  </svg> : 
                  <svg className="play-icon" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M8,5.14V19.14L19,12.14L8,5.14Z"
                    />
                  </svg>
}
              </button> 
              
              <div className="volume-container">
                <button className="mute-btn">
                    {btnMute ? 
                    <svg className="volume-muted-icon" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
                      />
                    </svg> :
                    <svg className="volume-high-icon" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
                      />
                    </svg>
}
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
                <div className="total-time">21:26</div>
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
                {btnFullScreen ? 
                  <svg className="open" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                    />
                  </svg> :
                  <svg viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                    />
                  </svg>
}
              </button>
            </div>
          </div>
          <video src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" autoPlay>
            <track kind="captions" src="../../../assets/subtitles.vtt" />
          </video>
        </div>
      </div>
    )
}

export default Player;