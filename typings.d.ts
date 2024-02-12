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
  episodes: Episode[];
}
export interface Episode{
  id: number,
  series_id:number,
  season_id:number,
  episode_details: string,
  title: string,
  description: string,
  realese_date:Date,
  image_path: string,
  video_id: number,
  video_path: string,
  likes:number,
  dislikes: number,
  ratings:number,
  next_episode_id:number,
  user:User
}

export interface User{
  id:number,
  like:boolean,
  dislike:boolean,
  rating:number
}

