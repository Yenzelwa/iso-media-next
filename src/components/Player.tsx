
'use client'
import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Settings } from 'lucide-react';

interface PlayerProps {
  video_path?: string;
}

const Player: React.FC<PlayerProps> = ({ video_path }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState('Auto');

  useEffect(() => {
    if (videoRef.current && video_path) {
      videoRef.current.load();
      setIsLoading(true);
    }
  }, [video_path]);

  const handleLoadedData = () => {
    setIsLoading(false);
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      setIsMuted(newMuted);
      videoRef.current.muted = newMuted;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleFullscreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  if (!video_path) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10 animate-pulse"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="text-center z-10 relative">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto shadow-2xl border-4 border-red-500/20">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute -inset-4 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">Content Loading</h3>
          <p className="text-gray-400 mb-6">Preparing your transformational experience</p>

          <div className="flex flex-col items-center space-y-4">
            <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-pulse"></div>
            </div>
            <p className="text-gray-500 text-sm">Connecting to consciousness stream...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full bg-black relative group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        preload="metadata"
        onLoadedData={handleLoadedData}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        poster="/placeholder.svg"
      >
        <source src={video_path} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white font-semibold">Loading Experience...</p>
          </div>
        </div>
      )}

      {/* Center Play Button */}
      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <button
            onClick={togglePlay}
            className="w-20 h-20 bg-black/70 backdrop-blur-md hover:bg-black/80 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 border-2 border-white/20 hover:border-red-500/50"
          >
            <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
          </button>
        </div>
      )}

      {/* Custom Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 transition-all duration-300 ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center text-white text-sm mb-2">
            <span className="text-gray-300">{formatTime(currentTime)}</span>
            <span className="text-gray-500 mx-2">/</span>
            <span className="text-gray-300">{formatTime(duration)}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, rgb(239 68 68) 0%, rgb(239 68 68) ${(currentTime / duration) * 100}%, rgb(55 65 81) ${(currentTime / duration) * 100}%, rgb(55 65 81) 100%)`
              }}
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="w-12 h-12 bg-red-600/20 hover:bg-red-600/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 border border-red-500/30 hover:border-red-500/50"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" fill="currentColor" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
              )}
            </button>

            {/* Restart */}
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                }
              }}
              className="w-10 h-10 bg-gray-700/50 hover:bg-gray-600/50 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 border border-gray-600/30"
            >
              <RotateCcw className="w-4 h-4 text-white" />
            </button>

            {/* Volume */}
            <div className="flex items-center space-x-2 bg-gray-700/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-600/30">
              <button onClick={toggleMute} className="text-white hover:text-red-400 transition-colors">
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider-small"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Quality Selector */}
            <div className="flex items-center space-x-2 bg-gray-700/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-600/30">
              <Settings className="w-4 h-4 text-white" />
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="bg-transparent text-white text-sm focus:outline-none"
              >
                <option value="Auto" className="bg-gray-800">Auto</option>
                <option value="1080p" className="bg-gray-800">1080p</option>
                <option value="720p" className="bg-gray-800">720p</option>
                <option value="480p" className="bg-gray-800">480p</option>
              </select>
            </div>

            {/* Fullscreen */}
            <button
              onClick={handleFullscreen}
              className="w-10 h-10 bg-gray-700/50 hover:bg-gray-600/50 backdrop-blur-sm rounded-lg flex items-center justify-center transition-all duration-300 border border-gray-600/30"
            >
              <Maximize className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Gradient Borders */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-500"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-500"></div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(239 68 68);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .slider-small::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgb(239 68 68);
          cursor: pointer;
          border: 1px solid white;
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(239 68 68);
          cursor: pointer;
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
};

export default Player;
