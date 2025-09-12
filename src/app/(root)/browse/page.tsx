'use client'
import { EnhancedCarousel } from '@/src/components/EnhancedCarousel';
import { Hero } from '@/src/components/Hero';
import { Video } from '@/typings';
import React from 'react';

const videos: Video[] = [
  {
    id: 2,
    title: 'Personal Development',
    rating: 4.5,
    type: {
      id: 2,
      name: 'Series',
      category: {
        id: 2,
        name: 'Spirituality'
      }
    },
    description: 'Journey into the world of conscious living and awakening. Discover ancient wisdom and modern practices that transform your daily experience.',
    image_path: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
    release_date: new Date('2023-02-01'),
    video_path: '',
    likes: 89,
  },
  {
    id: 3,
    title: 'Sacred Geometry',
    rating: 4.7,
    type: {
      id: 3,
      name: 'Documentary',
      category: {
        id: 1,
        name: 'Education'
      }
    },
    description: 'Explore the mathematical patterns that connect all of creation. From ancient temples to quantum physics, discover the universal language of form.',
    image_path: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
    release_date: new Date('2023-03-01'),
    video_path: '',
    likes: 156,
  },
  {
    id: 4,
    title: 'Mindful Living',
    rating: 4.8,
    type: {
      id: 4,
      name: 'Series',
      category: {
        id: 2,
        name: 'Spirituality'
      }
    },
    description: 'Transform your daily routine into a mindful practice. Learn techniques for present-moment awareness and inner peace.',
    image_path: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
    release_date: new Date('2023-04-01'),
    video_path: '',
    likes: 203,
  },
  {
    id: 5,
    title: 'Healing Practices',
    rating: 4.6,
    type: {
      id: 5,
      name: 'Documentary',
      category: {
        id: 3,
        name: 'Wellness'
      }
    },
    description: 'Discover ancient and modern healing modalities that restore balance to mind, body, and spirit.',
    image_path: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    release_date: new Date('2023-05-01'),
    video_path: '',
    likes: 78,
  },
  {
    id: 6,
    title: 'Consciousness Expansion',
    rating: 4.9,
    type: {
      id: 6,
      name: 'Series',
      category: {
        id: 2,
        name: 'Spirituality'
      }
    },
    description: 'Expand your awareness and explore the depths of human consciousness through guided practices and teachings.',
    image_path: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    release_date: new Date('2023-06-01'),
    video_path: '',
    likes: 267,
  }
];

const BrowsePage = () => {
  // Note: Auth context functionality would be added here when needed
  
  return (
    <div className="bg-background text-foreground">
      <main className="pt-24">
        <Hero videos={videos} />
                <div className="bg-gradient-to-b from-black via-gray-900/50 to-black space-y-12 py-8 animate-fade-in">

          <EnhancedCarousel title="Trending Now" movies={videos} variant="home" />
          <EnhancedCarousel title="Spiritual Awakening" movies={videos.filter(v => v.type.category.name === 'Spirituality')} variant="home" />
          <EnhancedCarousel title="Documentary Collections" movies={videos.filter(v => v.type.name === 'Documentary')} variant="home" />
          <EnhancedCarousel title="Wellness & Healing" movies={videos.filter(v => v.type.category.name === 'Wellness')} variant="home" />
        </div>
      </main>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default BrowsePage;
