import { Video } from "@/typings";
import { Metadata } from "next";
import React from "react";
import BrowseSlideShow from "../components/BrowseSlideShow";
import Videos from "../components/shared/Videos";

export const metadata: Metadata = {
    title: 'isolakwamuntu documentary  ',
    description: 'Browse all categories',
  }
  
const DocumentaryPage = () =>{
    const movies: Video[] = [
        {
            id: 1,
          title: 'Body workout',
          rating: 4.5,
          category: {
            id:1,
            name:'Documentary'
          },
          description: 'Description for Movie 1.',
          image_path: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
          release_date:  new Date(''),
          video_id :252,
          video_path:'',
          likes:25,
              
        },
        
        {
            id: 2,
            title: 'Busisiwe Mkhwebane the first people`s protector',
            rating: 4.5,
            category: {
              id:1,
              name:'Documentary'
            },
            description: 'Description for Movie 1.',
            image_path: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            release_date:  new Date(''),
            video_id :252,
            video_path:'',
            likes:25,
        },
        {
            id: 3,
            title: 'How children learn',
            rating: 4.5,
            category: {
              id:1,
              name:'Documentary'
            },
            description: 'Description for Movie 1.',
            image_path: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
            release_date:  new Date(''),
            video_id :252,
            video_path:'',
            likes:25,
        },
        {
            id: 4,
            title: 'A black women',
            rating: 4.5,
            category: {
              id:1,
              name:'Documentary'
            },
            description: 'Description for Movie 1.',
            image_path: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
            release_date:  new Date(''),
            video_id :252,
            video_path:'',
            likes:25,
        },
        {
            id: 5,
            title: 'A black man',
            rating: 4.5,
            category: {
              id:1,
              name:'Documentary'
            },
            description: 'Description for Movie 1.',
            image_path: '/images/movie1.jpg',
            release_date:  new Date(''),
            video_id :252,
            video_path:'',
            likes:25,
        }
      ];
        return (
        <>
         <BrowseSlideShow movies={movies}/>
          <Videos title="" data={movies} />
        </>
        )
    }

export default DocumentaryPage;