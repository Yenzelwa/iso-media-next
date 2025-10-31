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
  const [loadingSeasons, setLoadingSeasons] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchEpisodeData = async () => {
      try {
        // Fetch episode details
        const episodeResponse = await fetch(`/api/episodes/${params.id}`);
        if (episodeResponse.ok) {
          const episodeData = await episodeResponse.json();
          setCurrentVideo(episodeData);

          // Try to enrich with next_episode_id for UI visibility
          try {
            if (!episodeData.next_episode_id) {
              const nextRes = await fetch(`/api/episodes/${episodeData.id}/next`);
              if (nextRes.ok) {
                const nextPayload = await nextRes.json();
                if (nextPayload && typeof nextPayload.next_episode_id !== 'undefined') {
                  setCurrentVideo((prev) => prev ? { ...prev, next_episode_id: nextPayload.next_episode_id } : prev);
                }
              }
            }
          } catch {}

          // If episode has series_id, fetch series data
          if (episodeData.series_id) {
            const seriesResponse = await fetch(`/api/series/${episodeData.series_id}`);
            if (seriesResponse.ok) {
              const seriesData = await seriesResponse.json();
              // Build a seasons list tolerant of API returning either a number or an array
              const seasons = Array.isArray(seriesData.seasons)
                ? seriesData.seasons
                : (Number(seriesData.seasons) > 0
                    ? Array.from({ length: Number(seriesData.seasons) }, (_, i) => ({ id: i + 1, seasonNumber: i + 1 }))
                    : []);
              setLoadingSeasons(true);
              const hydrated = await Promise.all(
                seasons.map(async (s: any) => {
                  if (Array.isArray(s.episodes) && s.episodes.length > 0) {
                    return s;
                  }
                  try {
                    const resp = await fetch(`/api/series/${seriesData.id}/seasons/${s.seasonNumber}/episodes`);
                    if (resp.ok) {
                      const payload = await resp.json();
                      const items = Array.isArray(payload) ? payload : payload?.items ?? [];
                      return { ...s, episodes: items };
                    }
                  } catch {}
                  return { ...s, episodes: [] };
                })
              );
              setSeries({ ...seriesData, seasons: hydrated });
              setLoadingSeasons(false);
            }
          }
        } else {
          setError('Episode not found');
        }
      } catch (err) {
        console.error('Error fetching episode data:', err);
        setError('Failed to load episode');
      }
    };

    fetchEpisodeData();
  }, [params.id]);

  const playNextVideo = async () => {
    if (!currentVideo) return;

    // Strategy A: explicit next id available
    if (currentVideo.next_episode_id) {
      const fromLocalById = series?.seasons
        ?.flatMap((s: any) => s.episodes || [])
        .find((ep: any) => ep.id === currentVideo.next_episode_id);
      if (fromLocalById) {
        setCurrentVideo(fromLocalById);
        router.push(`/watch/${fromLocalById.id}`);
        return;
      }
    }

    // Strategy B: derive next by sequence within the same season
    const allEpisodes = series?.seasons?.flatMap((s: any) => s.episodes || []) ?? [];
    const sameSeason = allEpisodes.filter((ep: any) => ep.season_id === currentVideo.season_id);
    if (sameSeason.length > 0) {
      const ordered = sameSeason.sort((a: any, b: any) => (a.episode_number ?? 0) - (b.episode_number ?? 0));
      const idx = ordered.findIndex((ep: any) => ep.id === currentVideo.id);
      if (idx >= 0 && idx + 1 < ordered.length) {
        const nextEp = ordered[idx + 1];
        setCurrentVideo(nextEp);
        router.push(`/watch/${nextEp.id}`);
        return;
      }
    }

    // Fallback: fetch next episode details
    try {
      const nextId = currentVideo.next_episode_id;
      const res = nextId
        ? await fetch(`/api/episodes/${nextId}`)
        : await fetch(`/api/episodes/${currentVideo.id}/next`).then(async (r) => {
            if (!r.ok) return r;
            const p = await r.json();
            if (p && typeof p.next_episode_id !== 'undefined') {
              return fetch(`/api/episodes/${p.next_episode_id}`);
            }
            return r; // will fall through to not ok
          });
      if (res.ok) {
        const ep = await res.json();
        if (ep && typeof ep.id !== 'undefined') {
          setCurrentVideo(ep);
          router.push(`/watch/${ep.id}`);
          return;
        }
      }
      console.warn('Next episode not found');
    } catch (e) {
      console.warn('Error loading next episode');
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
    const response = await fetch(`/api/videos/${currentVideo.id}/like`, {
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
    const response = await fetch(`/api/videos/${currentVideo.id}/dislike`, {
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
        <section className="relative mx-auto aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
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
                  className="group inline-flex items-center rounded-full p-[2px] bg-gradient-to-r from-white/10 to-white/5 ring-1 ring-white/10 text-white transition-all duration-300 hover:from-white/20 hover:to-white/10"
                  aria-expanded={showSeasons}
                >
                  <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-black/40 backdrop-blur-md text-sm">
                    <span>All Episodes</span>
                    <svg
                      className={`w-4 h-4 transform transition-transform duration-200 ${showSeasons ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
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
              {loadingSeasons ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" aria-busy="true" aria-live="polite">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="animate-pulse rounded-xl overflow-hidden">
                      <div className="h-24 bg-gray-800/60" />
                      <div className="p-4 space-y-2">
                        <div className="h-4 bg-gray-800/60 w-3/4 rounded" />
                        <div className="h-3 bg-gray-800/60 w-5/6 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Seasons 
                  seasons={series?.seasons ?? []} 
                  onEpisodeSelect={(episode) => {
                    setCurrentVideo(episode);
                    router.push(`/watch/${episode.id}`);
                  }}
                />
              )}
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
