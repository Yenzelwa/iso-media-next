import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
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
      id: number;
      name: string;
    },

  }
}

export interface VideoCardModel {
  id: number;
  title: string;
  sub_title: string;
  description: string;
  release_date: Date;
  rating: number;
  image_path: string;
  url: string;
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
export interface Episode {
  id: number,
  episode_number: number,
  series_id: number,
  season_id: number,
  episode_detail: string,
  episode_short_detail: string,
  title: string,
  description: string,
  release_date: Date,
  image_path: string,
  video_id: number,
  video_path: string,
  likes: number,
  dislikes: number,
  ratings: number,
  next_episode_id: number,
  user: User
}

export interface User {
  id: number,
  like: boolean,
  dislike: boolean,
  rating: number
}
export interface IsoComment{
  id: number,
  comment: string,
  customer_id:number
}
export interface VideoComment {
  iso_comment: IsoComment,
  post_date:Date,
  customer: {
    id: number,
    name: string
  },
  reply: Reply[] | null
}
export interface Reply {
  id: number,
  reply: string,
  posted_date: Date,
  customer: {
    id: number,
    name: string
  }
}
// Declare the types for NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }

  interface JWT extends JWT {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}
export interface Membership {
  plan: string;
  nextBilling: string;
  price: number;
  email: string;
  cardType: string;
  cardNumber: string;
  phone: string;
}

export interface BillingRecord {
  date: string;
  amount: number;
  description: string;
}

export interface PlanOption {
  name: string;
  price: number;
  quality: string;
  devices: number;
  resolution: string;
}

export interface PlanDetails {
  current: PlanOption;
  options: PlanOption[];
}

export interface SecuritySettings {
  twoFactor: boolean;
  lastAccess: string;
  location: string;
  device: string;
}

export type TabType = 'membership' | 'plan' | 'security';
interface PlanCardProps {
  plan: PlanOption;
}


