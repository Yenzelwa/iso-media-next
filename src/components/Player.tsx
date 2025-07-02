'use client';

import React, { useEffect, useRef, useState } from "react";

interface VideoPathProps {
  video_path: string | undefined;
}

const Player: React.FC<VideoPathProps> = ({ video_path }) => {
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
  const timelineContainerRef = useRef<HTMLDivElement | null>(null);

  const playbackSpeedOptions = [1, 1.25, 1.5, 1.75, 2];

  // Format duration
  const formatDuration = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return hours > 0
      ? `${String(hours).padStart(2, '0')} :${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Load video source if changed
  useEffect(() => {
    if (video_path && videoUrl !== video_path) {
      setVideoUrl(video_path);
    }
  }, [video_path]);

  // Play/pause, mute, metadata load, progress bar
  useEffect(() => {
    const video = videoRef.current;
    const timelineContainer = timelineContainerRef.current;

    const updateProgress = () => {
      if (video && !video.paused) {
        const progress = (video.currentTime / video.duration) * 100;
        setProgressTime(progress);
      }
    };

    const handleLoadedMetadata = () => {
      if (video) {
        setDuration(formatDuration(video.duration));
        video.addEventListener('timeupdate', updateProgress);
      }
    };

    if (video) {
      if (btnPlay) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
      video.muted = btnMute;
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      if (video) {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, [btnPlay, btnMute, videoUrl]);

  // Timer for updating currentTime
  useEffect(() => {
    const intervalId = setInterval(() => {
      const video = videoRef.current;
      if (video && !video.paused) {
        setCurrentTime(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Mouse move for timeline
  useEffect(() => {
    const handleTimelineUpdate = (e: MouseEvent) => {
      const timelineContainer = timelineContainerRef.current;
      if (timelineContainer) {
        const rect = timelineContainer.getBoundingClientRect();
        const percent = Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width;
        timelineContainer.style.setProperty("--preview-position", percent.toString());
      }
    };

    document.addEventListener("mousemove", handleTimelineUpdate);
    return () => {
      document.removeEventListener("mousemove", handleTimelineUpdate);
    };
  }, []);

  const toggleFullScreenMode = () => {
    const videoContainer = document.querySelector('.video-container') as HTMLElement;
    if (!document.fullscreenElement) {
      videoContainer?.requestFullscreen();
      setBtnFullScreen(true);
    } else {
      document.exitFullscreen();
      setBtnFullScreen(false);
    }
  };

  const changePlaybackSpeed = (newSpeed: number) => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = newSpeed;
    }
    setPlaybackSpeed(newSpeed);
    setToggleSpeedDropDown(false);
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (video) {
      const volume = parseFloat(e.target.value);
      video.volume = volume;
      video.muted = volume === 0;
      setBtnMute(video.muted);
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setTimeout(() => setIsHovered(false), 2000);
  const handleVideoClick = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) video.play();
      else video.pause();
      setBtnPlay(!video.paused);
    }
  };

  return (
    <div aria-label="video" className="video-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={`video-container ${btnPlay ? '' : 'paused'}`} data-volume-level="high" onClick={handleVideoClick}  data-testid="video-container">
        {isHovered && (
          <div className="video-controls-container">
            <div className="timeline-container" ref={timelineContainerRef}>
              <div className="timeline">
                <div className="progress-line" style={{ width: `${progressTime}%` }} />
              </div>
            </div>
            <div className="controls">
              <button onClick={() => setBtnPlay(!btnPlay)} className="play-pause-btn" aria-label={btnPlay ? 'pause' : 'play'}>
                {btnPlay ? 'Pause' : 'Play'}
              </button>
              <div className="volume-container">
                <button data-testid="mute-toggle" onClick={() => setBtnMute(!btnMute)} className="mute-btn">{btnMute ? 'Unmute' : 'Mute'}</button> 
               <input className="volume-slider" type="range" min="0" max="1" step="any" aria-label="volume slider"  onChange={changeVolume} />
              </div>
              <div className="duration-container">
                <span>{formatDuration(currentTime)} / {duration}</span>
              </div>
              <div className="speed-control">
                <button className="speed-btn" onClick={() => setToggleSpeedDropDown(prev => !prev)}>{playbackSpeed}x</button>
                {toggleSpeedDropDown && (
                  <div className="speed-dropdown">
                    {playbackSpeedOptions.map(speed => (
                      <button key={speed} onClick={() => changePlaybackSpeed(speed)}>{speed}x</button>
                    ))}
                  </div>
                )}
              </div>
              <button className="full-screen-btn" onClick={toggleFullScreenMode}>
                {btnFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
              </button>
            </div>
          </div>
        )}
        <video data-testid="video-element" ref={videoRef} src={videoUrl} autoPlay preload="none" />
      </div>
      {!isHovered && (
        <div className="progress-line-outside-controls" style={{ width: `${progressTime}%` }} />
      )}
    </div>
  );
};

export default Player;
