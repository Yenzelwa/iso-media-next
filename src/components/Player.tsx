'use client'
import React from "react";
import { useEffect, useRef, useState } from "react"
interface VideoPathProps{
  video_path: string | undefined
}

const  Player : React.FC<VideoPathProps> = ({video_path}) =>{
  const [btnPlay, setBtnPlay] = useState(true);
  const [btnMute, setBtnMute] = useState(false);
  const [btnFullScreen, setBtnFullScreen] = useState(false);
  const [duration, setDuration] = useState('00:00');
  const [currentTime, setCurrentTime] = useState(0);
  const [progressTime, setProgressTime] = useState(0);
  const [isScrubbing, SetIsScrubbing] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [toggleSpeedDropDown, setToggleSpeedDropDown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [videoUrl, setVideoUrl] = useState(video_path);


  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playbackSpeedOptions = [1, 1.25, 1.5, 1.75, 2];
  const timelineContainerRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    // Create the video element
    const videoElement = document.createElement('video');
  
    // Set the video URL only if it's provided and different from the current video URL
    if (video_path && videoUrl !== video_path) {
      videoElement.src = video_path;
      setVideoUrl(video_path);
    }
  
    // Cleanup function
    return () => {
      // Cleanup logic if needed
    };
  }, [video_path, videoUrl]); // Add video_path and videoUrl as dependencies
  


 const handleContextMenu = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  }
  useEffect(() => {
    const updateProgress = () => {

      const video = videoRef.current;
      if (video && !video.paused) {
        const progress = (video?.currentTime / video?.duration) * 100;
        setProgressTime(progress);

      }
    };
    const handleLoadedMetadata = () => {
      const videoContainer = document.querySelector('.video-container') as HTMLElement;
      if (videoContainer) {
        videoContainer.style.width = '100%';
      }
      const video = videoRef.current;
      const timelineContainer = document.querySelector(".timeline-container");
      if (video) {
        let currentDuration = formatDuration(video.duration);
        setDuration(currentDuration);


        video.addEventListener('timeupdate', updateProgress);
       /// video('contextmenu',function() { return false; });

        if (timelineContainer) {
          let isScrubbing = false;
          timelineContainer.addEventListener("mousemove", handleTimelineUpdate)
          timelineContainer.addEventListener("mousedown", toggleScrubbing)
          document.addEventListener("mouseup", e => {
            if (isScrubbing) toggleScrubbing(e)
          })
          document.addEventListener("mousemove", e => {
            if (isScrubbing) handleTimelineUpdate(e)
          })
        }

        return () => {
          video.removeEventListener('timeupdate', updateProgress);
          timelineContainer?.addEventListener("mousemove", handleTimelineUpdate)
          timelineContainer?.addEventListener("mousedown", toggleScrubbing)
        };


      }
    };
    const video = videoRef.current;
    if (video) {
      if(video_path)
      video.src = video_path;
      if (btnPlay) {
        video.play();
      } else {
        video.pause();
      }
      video.muted = btnMute;
    }
    if (video) {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      const fullScreenBtn = document.querySelector('.full-screen-btn')
      if (fullScreenBtn)
        fullScreenBtn.addEventListener("click", toggleFullScreenMode)

      const speedBtn = document.querySelector(".speed-btn")
      if (speedBtn) {
        speedBtn.addEventListener("click", changePlaybackSpeed)
      }
      const volumeSlider = document.querySelector(".volume-slider")
      if (volumeSlider)
        // video.addEventListener("volumechange", changeVolume)nt
        volumeSlider.addEventListener('input', changeVolume)
    }

    return () => {
      if (video) {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('contextmenu', handleContextMenu);
      }
    };
  }, [btnMute, btnPlay, currentTime])

 useEffect(() => {
    const intervalId = setInterval(() => {
      const video = videoRef.current;
      if (video && !video.paused) {
      setCurrentTime((currentTime) => currentTime + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []); 


  const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  })
    function formatDuration(time: any) {
      const hours = Math.round(time / 3600);
      const minutes = Math.round((time % 3600) / 60);
      const remainingSeconds = Math.round(time % 60);
    
      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    
      if(hours > 0){
        return `${formattedHours} :${formattedMinutes}:${formattedSeconds}`;
      }
      return `${formattedMinutes}:${formattedSeconds}`;
    }

  

  document.addEventListener("mousemove", e => {
    handleTimelineUpdate(e)
  })


  function toggleFullScreenMode(e: any) {
    debugger;
    if (document.fullscreenElement == null) {
      const videoContainer = document.querySelector('.video-container');

      if (videoContainer) {
        if (document.fullscreenElement == null) {
          if (videoContainer.requestFullscreen) {
            setBtnFullScreen(true)
            videoContainer.requestFullscreen();
          }
        }
      }
    }
    else {
      if (document.exitFullscreen) {
        setBtnFullScreen(false)
        document.exitFullscreen();
      }
    }
  }

  const changePlaybackSpeed = (newSpeed: any) => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = newSpeed;
      setPlaybackSpeed(newSpeed);
      const speedBtn = document.querySelector(".speed-btn");
      if (speedBtn) {
        speedBtn.textContent = `${newSpeed}x`;
      }
    }
    setToggleSpeedDropDown(!toggleSpeedDropDown)
  };
  const changeVolume = () => {
    debugger;
    const video = videoRef.current;
    const volumeSlider = document.querySelector(".volume-slider") as HTMLInputElement;
    const videoContainer = document.querySelector('.video-container') as HTMLElement;

    if (video && volumeSlider && videoContainer) {
      video.volume = parseFloat(volumeSlider.value);

      let volumeLevel;
      if (video.muted || video.volume === 0) {
        volumeSlider.value = '0';
        volumeLevel = "muted";
      } else if (video.muted || video.volume >= 0.5) {
        volumeLevel = "high";
        video.muted = false;
        setBtnMute(false);
      } else {
        volumeLevel = "low";
        video.muted = false;
        setBtnMute(false);
      }
      videoContainer.dataset.volumeLevel = volumeLevel;
    }
  };


  function toggleScrubbing(e: any) {
    debugger;
    const timelineContainer = document.querySelector(".timeline-container");
    const video = videoRef.current;
    if (timelineContainer && video) {
      const rect = timelineContainer.getBoundingClientRect()
      const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
      SetIsScrubbing((e.buttons & 1) === 1)
      const videoContainer = document.querySelector(".video-container")
      if (videoContainer) {
        videoContainer.classList.toggle("scrubbing", isScrubbing)
        if (isScrubbing) {
          video.paused
          video.pause()
        } else {
          video.currentTime = percent * video.duration
          if (!video.paused) video.play()
        }
      }
    }


    handleTimelineUpdate(e)
  }
  function handleTimelineUpdate(e: any) {
    const timelineContainer = timelineContainerRef.current;
    if (timelineContainer) {
      const rect = timelineContainer.getBoundingClientRect();
      const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
      timelineContainer.style.setProperty("--preview-position", percent.toString())
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
   //   setIsHovered(false);
    }, 2000); 
  };
  
  const handleVideoClick = () => {
    const video = videoRef.current;
   if(video){
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
  };
  const isVideoPaused = () => {
    const video = videoRef.current;
    if(video) return video.paused;
  };

  return (
    <div className="video-container">
      <div className={`video-container ${isVideoPaused() ? 'paused' : ''}`} data-volume-level="high" 
       onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleVideoClick}>
        <img className="thumbnail-img" />
        {isHovered &&  (
        <div className="video-controls-container">
       
          <div className="timeline-container">
            <div className="timeline">
              <div className="progress-line" style={{ width: `${progressTime}%` }}></div>

             <div className="preview-img">
             <img alt="testing img" />
             <div className="duration">{duration}</div>
             </div>
            

              <div className="thumb-indicator">
                tumb nail
              </div>
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
              <button onClick={() => setBtnMute(!btnMute)} className="mute-btn">
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
                className="volume-slider" onChange={changeVolume}
                type="range"
                min="0"
                max="1"
                step="any"
              />
            </div>
            <div className="duration-container">
              <div className="current-time">{formatDuration(currentTime)}</div>/
              <div className="total-time">{duration}</div>
            </div>

            <div className="relative text-left" >
              {!toggleSpeedDropDown ?
                <div
                  className=" relative right-4"
                >
                  <button
                    type="button"
                    className="speed-btn inline-flex items-center px-4 py-2 border border-gray-300  duration-150 speedBtnDefault"
                    id="speedDropdown"
                    onClick={(evt) => {
                      evt.stopPropagation();
                      setToggleSpeedDropDown(!toggleSpeedDropDown)}
                    }
                  >
                    {`${playbackSpeed}x`}
                  </button>
                </div>
                : ""
              }

{toggleSpeedDropDown ? (
  <div className="absolute right-4 top-0 speedButtons" style={{ top: '-174px' }}>
    {playbackSpeedOptions
      .sort((a, b) => b - a)
      .map((speed) => (
        <React.Fragment key={speed}>
          {speed === playbackSpeed ? (
            <strong>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  changePlaybackSpeed(speed);
                }}
                className="speed-btn inline-flex items-center px-4 py-2 border text-red duration-150"
              >
                {`${speed}x`}
              </button>
            </strong>
          ) : (
            <button
              type="button"
              onClick={(evt) => {
                evt.stopPropagation();
                changePlaybackSpeed(speed);
              }}
              className="speed-btn inline-flex items-center px-4 py-2 text-white duration-150"
            >
              {`${speed}x`}
            </button>
          )}
        </React.Fragment>
      ))}
  </div>
) : null}



            </div>
            <button className="full-screen-btn">
              {!btnFullScreen ?
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
        )}
        <video ref={videoRef}  src={videoUrl} autoPlay>
          <track kind="captions" src="../../../assets/subtitles.vtt" />
        </video>
      </div>
      {!isHovered ?    <div className="progress-line-outside-controls" style={{ width: `${progressTime}%` }}></div>   :null  }
     
    </div>
  )
}

export default Player;

function componentDidMount() {
  throw new Error("Function not implemented.");
}
