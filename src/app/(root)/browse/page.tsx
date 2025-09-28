'use client'
import { EnhancedCarousel } from '@/src/components/EnhancedCarousel';
import { Hero } from '@/src/components/Hero';
import { Video } from '@/typings';
import React, { useEffect, useState } from 'react';

const BrowsePage = () => {
  const [heroVideos, setHeroVideos] = useState<Video[]>([]);
  const [catalogVideos, setCatalogVideos] = useState<Video[]>([]);
  const [documentaries, setDocumentaries] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch hero items
        const heroResponse = await fetch('/api/catalog/hero');
        // eslint-disable-next-line no-debugger
        debugger;
        if (heroResponse.ok) {
          const heroData = await heroResponse.json();
          setHeroVideos(heroData.items || []);
        }

        // Fetch catalog videos
        const catalogResponse = await fetch('/api/catalog/videos?page=1&page_size=20');
        if (catalogResponse.ok) {
          const catalogData = await catalogResponse.json();
          setCatalogVideos(catalogData.items || []);
        }

        // Fetch documentaries
        const docResponse = await fetch('/api/documentaries?sort=popular');
        if (docResponse.ok) {
          const docData = await docResponse.json();
          setDocumentaries(docData.items || []);
        }

      } catch (error) {
        console.error('Error fetching browse data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg text-gray-300">Loading content...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      <main className="pt-24">
        <Hero videos={heroVideos} />
        <div className="bg-gradient-to-b from-black via-gray-900/50 to-black space-y-12 py-8 animate-fade-in">
          <EnhancedCarousel title="Trending Now" movies={catalogVideos} variant="home" />
          <EnhancedCarousel title="Spiritual Awakening" movies={catalogVideos.filter(v => v.type?.category?.name === 'Spirituality')} variant="home" />
          <EnhancedCarousel title="Documentary Collections" movies={documentaries} variant="home" />
          <EnhancedCarousel title="Wellness & Healing" movies={catalogVideos.filter(v => v.type?.category?.name === 'Wellness')} variant="home" />
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
