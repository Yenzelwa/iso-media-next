'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Seasons from '@/src/components/WatchSeries';
import CommentSection from '@/src/components/CommentsSection';
import { Episode, Series } from '@/typings';
import { formatThumbsCount } from '@/src/utils/formatThumbsCount';

const Player = dynamic(() => import('@/src/components/Player'), { ssr: false });

interface WatchPageProps {
  params: {
    id: string;
  };
}

export function WatchPage({ params }: WatchPageProps) {
  const [currentVideo, setCurrentVideo] = useState<Episode | undefined>();
  const [series, setSeries] = useState<Series | undefined>();
  const [error, setError] = useState<string>('');
  const [showSeasons, setShowSeasons] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Initialize with mock data (replace with API call)
    // Using params.id for video identification
    const currentVideoData: Episode = {
      episode_detail: '23 October 2023 - Season 2 - Episode 01',
      next_episode_id: 254,
      episode_number: 1,
      episode_short_detail: 'S01E01',
      series_id: 1,
      season_id: 1,
      id: 253,
      video_id: 125,
      title: "The Sacred Journey Within",
      description: `Embark on a transformative exploration of consciousness and spiritual awakening. This episode delves deep into ancient wisdom traditions and modern understanding of human consciousness, offering practical insights for those seeking to expand their awareness and connect with their higher self. Through guided meditations, expert interviews, and powerful testimonials, discover the tools and practices that can lead to profound personal transformation.`,
      image_path: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
      video_path: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      likes: 2551,
      dislikes: 5,
      ratings: 4.2,
      release_date: new Date('2023-05-25'),
      user: {
        id: 1,
        like: true,
        dislike: false,
        rating: 4.9
      }
    };
    setCurrentVideo(currentVideoData);

    // Initialize series data (replace with API call)
    const seriesData: Series = {
      id: 1,
      title: 'Consciousness Expansion Series',
      description: 'A comprehensive journey through the realms of consciousness, spirituality, and human potential.',
      realese_date: new Date('2024/02/12'),
      image_path: '',
      seasons: [
        {
          id: 1,
          seasonNumber: 1,
          episodes: [
            {
              episode_detail: '23 October 2023 - Season 1 - Episode 01',
              next_episode_id: 254,
              episode_number: 1,
              episode_short_detail: 'S01E01',
              series_id: 1,
              season_id: 1,
              id: 253,
              video_id: 125,
              title: "The Sacred Journey Within",
              description: `Embark on a transformative exploration of consciousness and spiritual awakening. This episode delves deep into ancient wisdom traditions and modern understanding of human consciousness.`,
              image_path: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
              video_path: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              likes: 2551,
              dislikes: 5,
              ratings: 4.2,
              release_date: new Date('2023-05-25'),
              user: {
                id: 1,
                like: true,
                dislike: false,
                rating: 4.9
              }
            },
            {
              episode_detail: '30 October 2023 - Season 1 - Episode 02',
              next_episode_id: 255,
              episode_number: 2,
              episode_short_detail: 'S01E02',
              series_id: 1,
              season_id: 1,
              id: 254,
              video_id: 126,
              title: "Meditation and Mindfulness Mastery",
              description: `Learn advanced meditation techniques and mindfulness practices that have been used for centuries to achieve inner peace and spiritual enlightenment.`,
              image_path: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
              video_path: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              likes: 3421,
              dislikes: 8,
              ratings: 4.5,
              release_date: new Date('2023-05-30'),
              user: {
                id: 1,
                like: false,
                dislike: false,
                rating: 4.5
              }
            }
          ]
        },
        {
          id: 2,
          seasonNumber: 2,
          episodes: [
            {
              episode_detail: '15 November 2023 - Season 2 - Episode 01',
              next_episode_id: 257,
              episode_number: 1,
              episode_short_detail: 'S02E01',
              series_id: 1,
              season_id: 2,
              id: 256,
              video_id: 127,
              title: "Energy Healing and Chakra Alignment",
              description: `Discover the ancient art of energy healing and learn how to balance your chakras for optimal physical, emotional, and spiritual well-being.`,
              image_path: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
              video_path: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              likes: 1876,
              dislikes: 12,
              ratings: 4.3,
              release_date: new Date('2023-11-15'),
              user: {
                id: 1,
                like: true,
                dislike: false,
                rating: 4.7
              }
            }
          ]
        }
      ]
    };
    setSeries(seriesData);
  }, [params.id]);

  const playNextVideo = () => {
  if (!currentVideo?.next_episode_id || !series) return;

  // Find the episode with the matching id in any season
  const nextEp = series.seasons
    .flatMap(season => season.episodes)
    .find(ep => ep.id === currentVideo.next_episode_id);

  if (nextEp) {
    setCurrentVideo(nextEp);
    router.push(`/watch/${nextEp.id}`);
  } else {
    console.warn('Next episode not found');
  }
};


const updateLikes = async (like: boolean) => {
  try {
    if (!currentVideo) return;

    // ✅ Optimistic UI update
    const updatedVideo = { ...currentVideo };
    if (!updatedVideo.user.like && like) {
      updatedVideo.user.like = like;
      updatedVideo.likes += 1;
      if (updatedVideo.user.dislike) {
        updatedVideo.user.dislike = false;
        updatedVideo.dislikes -= 1;
      }
    } else if (updatedVideo.user.like && !like) {
      updatedVideo.user.like = like;
      updatedVideo.likes -= 1;
    }
    setCurrentVideo(updatedVideo);

    // ✅ API call to persist like
    const response = await fetch(`http://172.24.74.185:4002/videos/${currentVideo.id}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: updatedVideo.user.id,
        like,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update like');
    }

    // Optional: update with backend’s authoritative state
    const data = await response.json();
    setCurrentVideo((prev) => prev ? { ...prev, likes: data.likes, dislikes: data.dislikes } : prev);

  } catch (err) {
    console.error(err);
    setError('Error occurred updating likes');
  }
};


const updateDislikes = async (dislike: boolean) => {
  try {
    if (!currentVideo) return;

    // ✅ Optimistic UI update
    const updatedVideo = { ...currentVideo };
    if (!updatedVideo.user.dislike && dislike) {
      updatedVideo.user.dislike = dislike;
      updatedVideo.dislikes += 1;
      if (updatedVideo.user.like) {
        updatedVideo.user.like = false;
        updatedVideo.likes -= 1;
      }
    } else if (updatedVideo.user.dislike && !dislike) {
      updatedVideo.user.dislike = dislike;
      updatedVideo.dislikes -= 1;
    }
    setCurrentVideo(updatedVideo);

    // ✅ API call to persist dislike
    const response = await fetch(`http://172.24.74.185:4002/videos/${currentVideo.id}/dislike`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: updatedVideo.user.id,
        dislike,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update dislike');
    }

    // Optional: sync with backend state
    const data = await response.json();
    setCurrentVideo((prev) => prev ? { ...prev, likes: data.likes, dislikes: data.dislikes } : prev);

  } catch (err) {
    console.error(err);
    setError('Error occurred updating dislikes');
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <main className="pt-20">
        {/* Video Player */}
        <section className="relative w-full aspect-video bg-black">
          <Player key={currentVideo?.id} video_path={currentVideo?.video_path} />
        </section>

        {/* Content Container */}
        <div className="w-full px-4 lg:px-8 py-6">
          {/* Main Content Section */}
          <section className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8">
            {/* Header Row */}
            <div className="flex items-start justify-between border-b border-gray-700/50 pb-6">
              {/* Episode Details */}
              <div className="flex items-center space-x-4">
                <p className="text-gray-400 text-sm">
                  {currentVideo?.episode_detail}
                </p>
              </div>

              {/* Controls Group */}
              <div className="flex items-center space-x-4">
                {/* Next Episode Button */}
                {currentVideo && currentVideo?.next_episode_id && currentVideo.next_episode_id > 0 && (
                  <button
                    onClick={playNextVideo}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2 px-6 rounded-xl flex items-center space-x-2 transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="text-sm">Next Episode</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                )}

                {/* Like/Dislike Controls */}
                <div className="flex space-x-2">
                  {/* Like Button */}
                  <button
                    aria-label="thumbs-up"
                    onClick={() => updateLikes(!currentVideo?.user.like)}
                    className="bg-gray-700/50 hover:bg-gray-600/50 backdrop-blur-sm rounded-xl p-3 flex items-center space-x-2 transition-all duration-300 border border-gray-600/30"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className={`${currentVideo?.user.like ? 'text-red-500' : 'text-gray-300'}`}
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046z" />
                    </svg>
                    <span className="text-sm text-gray-300">{formatThumbsCount(currentVideo?.likes ?? 0)}</span>
                  </button>

                  {/* Dislike Button */}
                  <button
                    aria-label="thumbs-down"
                    onClick={() => updateDislikes(!currentVideo?.user.dislike)}
                    className="bg-gray-700/50 hover:bg-gray-600/50 backdrop-blur-sm rounded-xl p-3 flex items-center space-x-2 transition-all duration-300 border border-gray-600/30"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className={`${currentVideo?.user.dislike ? 'text-red-500' : 'text-gray-300'}`}
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856s-.036.586-.113.856c-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a10 10 0 0 1-.443-.05 9.36 9.36 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065z" />
                    </svg>
                    <span className="text-sm text-gray-300">{formatThumbsCount(currentVideo?.dislikes ?? 0)}</span>
                  </button>
                </div>

                {/* Seasons Toggle Button */}
                <button
                  onClick={() => setShowSeasons(!showSeasons)}
                  className="text-white font-semibold py-2 px-4 flex items-center space-x-2 transition-all duration-300 hover:text-red-400"
                >
                  <span className="text-sm">All Episodes</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-200 ${showSeasons ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-center my-4 bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                {error}
              </div>
            )}

            {/* Title and Description */}
            <div className="mt-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                {currentVideo?.title}
              </h1>
              <p className="text-gray-300 leading-relaxed text-lg">
                {currentVideo?.description}
              </p>
            </div>
          </section>

          {/* Seasons Panel */}
          {showSeasons && (
            <section className="mt-8 bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8">
              <Seasons 
                seasons={series?.seasons ?? []} 
                onEpisodeSelect={(episode) => {
                  setCurrentVideo(episode);
                  router.push(`/watch/${episode.id}`);
                }}
              />
            </section>
          )}

          {/* Comments Section */}
          <section className="mt-8">
            <CommentSection video_id={currentVideo?.video_id ?? 0} />
          </section>
        </div>
      </main>
    </div>
  );
}


export default WatchPage;
