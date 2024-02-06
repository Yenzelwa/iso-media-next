import exp from "constants";
import Episode from "./app/components/shared/Episode";

export interface Video {
  id: number;
  title: string;
  description: string;
  release_date: Date;
  rating: number;
  likes: number;
  image_path: string;
  video_path: string;
  type: {
    id: number;
    name: string;
    category: {
      id:number;
      name:string;
    },
    
  }
}

export interface VideoCardModel{
  id:number;
  title: string;
  sub_title: string;
  description: string;
  release_date: Date;
  rating: number;
  image_path: string;
  url:string;
}

export interface Series {
  id: number;
  title: string;
  description: string;
  realese_date: Date;
  image_path: string;
  seasons: Season[];
}
export interface Season {
  id: number;
  seasonNumber: number;
  episodes: Video[];
}

export interface WatchVideo {
  episode_details: string;
  video:Video;
 next_video_id:number
}
