'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/authContext';
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

  const router = useRouter();
  const { user, loading } = useAuth();
  const [userCookie, setUserCookie] = useState<any>(null);
  const [showSeasons, setShowSeasons] = useState<boolean>(false);

  useEffect(() => {
    const cookie = Cookies.get('auth_user');
    if (cookie) {
      setUserCookie(cookie);
    }
  }, []);

     useEffect(() => {
    // Ensure this is only called on the client side
    if (typeof window !== "undefined" && !loading && !user) {
      // If no session is found, redirect to login page
      router.push("/login");
    }
  }, [user, loading, router]);


  useEffect(() => {
    // Initialize with mock data (replace with API call)
    const currentVideoData: Episode = {
      episode_detail: '23 October 2023 - Season 2 - Episode 01',
      next_episode_id: 254,
      episode_number: 1,
      episode_short_detail: 'S01E01',
      series_id: 1,
      season_id: 1,
      id: 253,
      video_id: 125,
      title: "Lorem ipsum dolor sit amet",
      description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit...`,
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
    const seriesData:  Series = {
      id : 1,
      title:'Family Unit',
      description:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      realese_date: new Date('2024/02/12'),
      image_path:'',
      seasons :  [
         {
          id: 1,
          seasonNumber : 1,
          episodes:[
            {
              episode_details: '23 October 2023 - Season 2 - Episode 01',
              next_episode_id: 254,   
              episode_number:1,
              episode_short_detail:'S01E01', 
              series_id:1,
              season_id:1,
              id: 253,
              video_id: 125,
              title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
              description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean
                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
                  et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
                  felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
                  consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
                  nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                  venenatis vitae, justo.`,
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
              
          ]
         },
         {
          id: 2,
          seasonNumber : 2,
          episodes:[
            {
              episode_details: '23 October 2023 - Season 2 - Episode 01',
              next_episode_id: 254,  
              episode_number:1,
              episode_short_detail:'S02E01',  
              series_id:1,
              season_id:1,
              id: 253,
              video_id: 125,
              title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
              description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean
                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
                  et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
                  felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
                  consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
                  nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                  venenatis vitae, justo.`,
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
              episode_details: '24 October 2023 - Season 2 - Episode 02',
              next_episode_id: 256,   
              episode_number:1,
              episode_short_detail:'S02E02', 
              series_id:1,
              season_id:1,
              id: 254,
              video_id: 126,
              title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
              description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean
                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
                  et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
                  felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
                  consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
                  nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                  venenatis vitae, justo.`,
              image_path: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
              video_path: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              likes: 255158,
              dislikes: 5,
              ratings: 3.2,
              release_date: new Date('2024-05-25'),
              user: {
                id: 1,
                like: true,
                dislike: false,
                rating: 3.9
              }
            },
          
              
          ]
         },
         {
          id: 3,
          seasonNumber : 3,
          episodes:[
            {
              episode_details: '23 October 2023 - Season 2 - Episode 01',
              next_episode_id: 254,   
              episode_number:1,
              episode_short_detail:'S03E01', 
              series_id:1,
              season_id:1,
              id: 253,
              video_id: 125,
              title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
              description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean
                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
                  et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
                  felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
                  consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
                  nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                  venenatis vitae, justo.`,
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
              episode_details: '24 October 2023 - Season 2 - Episode 02',
              next_episode_id: 256,   
              episode_number:1,
              episode_short_detail:'S03E03', 
              series_id:1,
              season_id:1,
              id: 254,
              video_id: 126,
              title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
              description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean
                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
                  et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
                  felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
                  consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
                  nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                  venenatis vitae, justo.`,
              image_path: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
              video_path: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              likes: 255158,
              dislikes: 5,
              ratings: 3.2,
              release_date: new Date('2024-05-25'),
              user: {
                id: 1,
                like: true,
                dislike: false,
                rating: 3.9
              }
            },
            {
              episode_details: '25 October 2023 - Season 2 - Episode 03',
              next_episode_id: 255,   
              episode_number:1,
              episode_short_detail:'S02E03', 
              series_id:1,
              season_id:1,
              id: 256,
              video_id: 127,
              title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
              description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean
                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
                  et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
                  felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
                  consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
                  nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                  venenatis vitae, justo.`,
              image_path: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
              video_path: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              likes: 85551,
              dislikes: 558,
              ratings: 1.2,
              release_date: new Date('2026-05-25'),
              user: {
                id: 1,
                like: true,
                dislike: false,
                rating: 4.9
              }
            }
              
          ]
         },
         {
          id: 4,
          seasonNumber : 4,
          episodes:[
            {
              episode_details: '23 October 2023 - Season 2 - Episode 01',
              next_episode_id: 254,  
              episode_number:1,
              episode_short_detail:'S04E01',  
              series_id:1,
              season_id:1,
              id: 253,
              video_id: 125,
              title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
              description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean
                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
                  et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
                  felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
                  consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
                  nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                  venenatis vitae, justo.`,
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
              episode_details: '24 October 2023 - Season 2 - Episode 02',
              next_episode_id: 256,   
              episode_number:1,
              episode_short_detail:'S04E02', 
              series_id:1,
              season_id:1,
              id: 254,
              video_id: 126,
              title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
              description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean
                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
                  et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
                  felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
                  consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
                  nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                  venenatis vitae, justo.`,
              image_path: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
              video_path: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              likes: 255158,
              dislikes: 5,
              ratings: 3.2,
              release_date: new Date('2024-05-25'),
              user: {
                id: 1,
                like: true,
                dislike: false,
                rating: 3.9
              }
            },
            {
              episode_details: '25 October 2023 - Season 2 - Episode 03',
              next_episode_id: 255,   
              episode_number:1,
              episode_short_detail:'S04E03', 
              series_id:1,
              season_id:1,
              id: 256,
              video_id: 127,
              title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
              description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean
                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
                  et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
                  felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
                  consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
                  nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                  venenatis vitae, justo.`,
              image_path: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
              video_path: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              likes: 85551,
              dislikes: 558,
              ratings: 1.2,
              release_date: new Date('2026-05-25'),
              user: {
                id: 1,
                like: true,
                dislike: false,
                rating: 4.9
              }
            },
            {
              episode_details: '26 October 2023 - Season 2 - Episode 04',
              next_episode_id: 254,   
              episode_number:1,
              episode_short_detail:'S04E04', 
              series_id:1,
              season_id:1,
              id: 253,
              video_id: 125,
              title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
              description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Enean
                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
                  et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
                  felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
                  consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
                  nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                  venenatis vitae, justo.`,
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
            }
              
          ]
         }
      ]
    };
    setSeries(seriesData);
  }, []);

 const playNextVideo = async () => {
    if (!currentVideo?.next_episode_id) return;

    // Mock next video data (replace with API call)
    const nexttVideoData: Episode =
    {
      series_id:1,
      season_id:1,
      episode_number:2,
      episode_short_detail:'S01E02',
      episode_detail: '24 October 2023 - Season 2 - Episode 02',
      next_episode_id: 0,
      id: 254,
      video_id: 5255,
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
      video_path: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      likes: 1225234,
      dislikes: 6436,
      ratings: 4.8,
      user: {
        id: 1,
        like: false,
        dislike: false,
        rating: 4.6
      }


    };
    setCurrentVideo(nexttVideoData);
  };

  const updateLikes = async (like: boolean) => {
    try {
      if (!currentVideo) return;

      const token = ''; // Get from auth context
      const response = await axios.post('likes', {
        userId: 1,
        video_id: currentVideo.video_id,
        like
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data && currentVideo.user) {
        const updatedVideo = { ...currentVideo };
        if (!updatedVideo.user.like && like) {
          updatedVideo.user.like = like;
          updatedVideo.likes += 1;
        } else if (updatedVideo.user.like && !like) {
          updatedVideo.user.like = like;
          updatedVideo.likes -= 1;
        }
        setCurrentVideo(updatedVideo);
      }
    } catch (err) {
      setError('Error occurred updating likes');
    }
  };

  const updateDislikes = async (dislike: boolean) => {
    try {
      if (!currentVideo) return;

      const token = ''; // Get from auth context
      const response = await axios.post('dislikes', {
        userId: 1,
        video_id: currentVideo.video_id,
        dislike
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data && currentVideo.user) {
        const updatedVideo = { ...currentVideo };
        if (!updatedVideo.user.dislike && dislike) {
          updatedVideo.user.dislike = dislike;
          updatedVideo.dislikes += 1;
        } else if (updatedVideo.user.dislike && !dislike) {
          updatedVideo.user.dislike = dislike;
          updatedVideo.dislikes -= 1;
        }
        setCurrentVideo(updatedVideo);
      }
    } catch (err) {
      setError('Error occurred updating dislikes');
    }
  };

  return (
      <main className="relative">
      {/* Video Player */}
      <section className="relative w-full aspect-video">
        <Player key={currentVideo?.id} video_path={currentVideo?.video_path} />
      </section>

      {/* Content Container */}
      <div className="w-full px-4 lg:px-8 py-6">
        {/* Main Content Section */}
        <section className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-800">
          {/* Header Row */}
          <div className="flex items-start justify-between border-b border-gray-800 pb-4">
            {/* Episode Details */}
           <div className="pb-2 flex items-center space-x-4">
          <p className="text-gray-500 text-md">
            {currentVideo?.episode_detail}
          </p>
        </div>

            {/* Controls Group */}
            <div className="flex items-center space-x-4">
              {/* Next Episode Button */}
              {currentVideo && currentVideo?.next_episode_id > 0 && (
                <button
                  onClick={playNextVideo}
                  className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-1 transition duration-200"
                >
                  <span className="text-sm">Next Episode</span>
                
                </button>
              )}

              {/* Like/Dislike Controls */}
              <div className="flex space-x-2">
                {/* Like Button */}
                <button
                  aria-label="thumbs-up"
                  onClick={() => updateLikes(!currentVideo?.user.like)}
                  className="bg-gray-700 hover:bg-gray-600 rounded-lg p-2 flex items-center space-x-1 transition duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className={`${currentVideo?.user.like ? 'text-red-500' : 'text-gray-300'}`}
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                  </svg>
                  <span className="text-sm text-gray-300">{formatThumbsCount(currentVideo?.likes ?? 0)}</span>
                </button>

                {/* Dislike Button */}
                <button
                  aria-label="thumbs-down"
                  onClick={() => updateDislikes(!currentVideo?.user.dislike)}
                  className="bg-gray-700 hover:bg-gray-600 rounded-lg p-2 flex items-center space-x-1 transition duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className={`${currentVideo?.user.dislike ? 'text-red-500' : 'text-gray-300'}`}
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856s-.036.586-.113.856c-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a10 10 0 0 1-.443-.05 9.36 9.36 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a9 9 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581s-.027-.414-.075-.581c-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.2 2.2 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.9.9 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z" />
                  </svg>
                  <span className="text-sm text-gray-300">{formatThumbsCount(currentVideo?.dislikes ?? 0)}</span>
                </button>
              </div>

              {/* Seasons Toggle Button */}
              <button
                onClick={() => setShowSeasons(!showSeasons)}
                className=" text-white font-semibold py-2 px-4 flex items-center space-x-1 transition duration-200"
              >
                <span className="text-sm">All Episode</span>
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
            <div className="text-red-500 text-center my-4">{error}</div>
          )}

          {/* Title and Description */}
          <div className="mt-4">
           <h1 className="text-3xl font-bold mt-0">
          {currentVideo?.title}
        </h1>
          
          </div>
          <div className="mt-4">
  <p className="text-gray-300 leading-relaxed">
              {currentVideo?.description}
            </p>
          </div>
        </section>

        {/* Seasons Panel */}
        {showSeasons && (
          <section className="mt-6 bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-800">
            <Seasons seasons={series?.seasons ?? []} />
          </section>
        )}

        {/* Comments Section */}
        <section className="mt-8">
          <CommentSection video_id={currentVideo?.video_id ?? 0} />
        </section>
      </div>
    </main>
  );
}


export default WatchPage;
