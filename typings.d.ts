export interface Movie {
    id:number,
    title: string,
    description: string ,
    release_date: Date,
    rating: number,
    likes: number,
    image_path: string,
    video_id: number,
    video_path: string,
    category: {
        id: number,
        name: string
    }
  }