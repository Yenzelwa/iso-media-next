import { Metadata } from 'next';
import React from 'react';
import BrowseSlideShow from '../components/BrowseSlideShow';
import { Movie } from '@/typings';
import MovieList from '../components/shared/MovieList';

export const metadata: Metadata = {
    title: 'isolakwamuntu content ',
    description: 'Browse all categories',
  }

  
const movies: Movie[] = [
    {
        id: 1,
      title: 'Movie 1',
      rating: 4.5,
      category: {
        id:1,
        name:'Series'
      },
      description: 'Description for Movie 1.',
      image_path: '/images/movie1.jpg',
      release_date:  new Date(''),
      video_id :252,
      video_path:'',
      likes:25,
          
    },
    
    {
        id: 2,
        title: 'Movie 1',
        rating: 4.5,
        category: {
          id:1,
          name:'Series'
        },
        description: 'Description for Movie 1.',
        image_path: '/images/movie1.jpg',
        release_date:  new Date(''),
        video_id :252,
        video_path:'',
        likes:25,
    },
    {
        id: 3,
        title: 'Movie 1',
        rating: 4.5,
        category: {
          id:1,
          name:'Series'
        },
        description: 'Description for Movie 1.',
        image_path: '/images/movie1.jpg',
        release_date:  new Date(''),
        video_id :252,
        video_path:'',
        likes:25,
    },
    {
        id: 4,
        title: 'Movie 1',
        rating: 4.5,
        category: {
          id:1,
          name:'Series'
        },
        description: 'Description for Movie 1.',
        image_path: '/images/movie1.jpg',
        release_date:  new Date(''),
        video_id :252,
        video_path:'',
        likes:25,
    },
    {
        id: 5,
        title: 'Movie 1',
        rating: 4.5,
        category: {
          id:1,
          name:'Series'
        },
        description: 'Description for Movie 1.',
        image_path: '/images/movie1.jpg',
        release_date:  new Date(''),
        video_id :252,
        video_path:'',
        likes:25,
    },
    {
        id: 6,
        title: 'Movie 1',
        rating: 4.5,
        category: {
          id:1,
          name:'Series'
        },
        description: 'Description for Movie 1.',
        image_path: '/images/movie1.jpg',
        release_date:  new Date(''),
        video_id :252,
        video_path:'',
        likes:25,
    },
  ];
const BrowsePage = () => {
    return (
        <>
        <BrowseSlideShow movies={movies}/>
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="Top Rated" data={movies} />
        <MovieList title="Resent Release" data={movies} />
      
        </>
    )
}
export default BrowsePage;