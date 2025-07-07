import { Metadata } from "next";
import React from "react";
import { Series, Video } from "@/typings";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Optional: Generate metadata dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Series  ${(await params).id}`,
  };
}

export default async function SeriesByIdPage({ params }: PageProps) {
  const { id } = await params;

  const series: Series = 
    {
      id: 1,
      title: "Family Unit",
      description: "Family unit is the doundation of all civilazation",
      realese_date: new Date(),
      image_path: "",
      seasons: [
        {
          id: 1,
          seasonNumber: 1,
          episodes: [
            {
              id: 1,
            title: 'Family Unit',
            rating: 4.5,
            type: {
              id:1,
              name:'Series',
              category : {
                id: 1,
                name : 'Education'
              }
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
              title: 'Personal Development',
              rating: 4.5,
              type: {
                id:1,
                name:'Series',
                category : {
                  id: 1,
                  name : 'Spirituality'
                }
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
              title: 'Movie 1',
              rating: 4.5,
              type: {
                id:1,
                name:'Series',
                category : {
                  id: 1,
                  name : 'Education'
                }
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
              title: 'Movie 1',
              rating: 4.5,
              type: {
                id:1,
                name:'Series',
                category : {
                  id: 1,
                  name : 'Education'
                }
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
              title: 'Movie 1',
              rating: 4.5,
              type: {
                id:1,
                name:'Series',
                category : {
                  id: 1,
                  name : 'Personal Development'
                }
              },
              description: 'Description for Movie 1.',
              image_path: '/images/movie1.jpg',
              release_date:  new Date(''),
              video_id :252,
              video_path:'',
              likes:25,
          },
          ],
        },
        {
          id: 2,
          seasonNumber: 1,
          episodes: [
            {
              id: 1,
            title: 'Family Unit',
            rating: 4.5,
            type: {
              id:1,
              name:'Series',
              category : {
                id: 1,
                name : 'Education'
              }
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
              title: 'Personal Development',
              rating: 4.5,
              type: {
                id:1,
                name:'Series',
                category : {
                  id: 1,
                  name : 'Spirituality'
                }
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
              title: 'Movie 1',
              rating: 4.5,
              type: {
                id:1,
                name:'Series',
                category : {
                  id: 1,
                  name : 'Education'
                }
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
              title: 'Movie 1',
              rating: 4.5,
              type: {
                id:1,
                name:'Series',
                category : {
                  id: 1,
                  name : 'Education'
                }
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
              title: 'Movie 1',
              rating: 4.5,
              type: {
                id:1,
                name:'Series',
                category : {
                  id: 1,
                  name : 'Personal Development'
                }
              },
              description: 'Description for Movie 1.',
              image_path: '/images/movie1.jpg',
              release_date:  new Date(''),
              video_id :252,
              video_path:'',
              likes:25,
          },
          ],
        },
      ],
    };
  return (
    <>
      
      {series.seasons?.map((season) => {
        {
            return (
              // <Videos 
              //   page="series"
              //   title={`Season - ${season.seasonNumber}`}
              //   data={season.episodes}
              // />
              <h1>video</h1>
            ); 
        }
      })} 
    </>
  );
};

export async function generateStaticParams() {
 // const series: Array<{ id: number }> = await fetch('https://your-api.com/series').then(res => res.json());
  const seriesIds =  ['1', '2', '3', '4'];
  return seriesIds.map((item) => ({
    id: item.toString(),
  }));
}
