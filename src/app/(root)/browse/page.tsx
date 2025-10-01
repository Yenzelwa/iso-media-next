'use client'
import { EnhancedCarousel } from '@/src/components/EnhancedCarousel';
import { Hero } from '@/src/components/Hero';
import { Video } from '@/typings';
import React, { useEffect, useMemo, useState } from 'react';

const BROWSE_PAGE_SIZE = 20;

const BrowsePage = () => {
  const [heroVideos, setHeroVideos] = useState<Video[]>([]);
  const [catalogVideos, setCatalogVideos] = useState<Video[]>([]);
  const [documentaries, setDocumentaries] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [heroResponse, catalogResponse, documentaryResponse] = await Promise.all([
          fetch('/api/catalog/hero'),
          fetch(`/api/catalog/videos?page=1&page_size=${BROWSE_PAGE_SIZE}`),
          fetch('/api/documentaries?sort=popular'),
        ]);

        if (!isMounted) return;

        if (heroResponse.ok) {
          const heroData = await heroResponse.json();
          setHeroVideos(heroData.items || []);
        }

        if (catalogResponse.ok) {
          const catalogData = await catalogResponse.json();
          setCatalogVideos(catalogData.items || []);
        }

        if (documentaryResponse.ok) {
          const docData = await documentaryResponse.json();
          setDocumentaries(docData.items || []);
        }
      } catch (error) {
        console.error('Error fetching browse data:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const spiritualityVideos = useMemo(
    () => catalogVideos.filter(video => video.type?.category?.name === 'Spirituality'),
    [catalogVideos],
  );

  const wellnessVideos = useMemo(
    () => catalogVideos.filter(video => video.type?.category?.name === 'Wellness'),
    [catalogVideos],
  );

  const carouselContent = useMemo(
    () => [
      { title: 'Trending Now', movies: catalogVideos },
      { title: 'Spiritual Awakening', movies: spiritualityVideos },
      { title: 'Documentary Collections', movies: documentaries },
      { title: 'Wellness & Healing', movies: wellnessVideos },
    ].filter(section => section.movies.length > 0),
    [catalogVideos, documentaries, spiritualityVideos, wellnessVideos],
  );

  if (loading) {
    return (
      <div className="bg-background text-foreground flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-lg text-muted-foreground">Loading content...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground">
      <main className="pt-24 md:pt-28 lg:pt-32">
        <Hero videos={heroVideos} />

        <section className="bg-gradient-to-b from-gray-900 via-black to-gray-900/80 py-14 md:py-16 lg:py-20">
          <div className="space-y-12">
            {carouselContent.map(section => (
              <EnhancedCarousel
                key={section.title}
                title={section.title}
                movies={section.movies}
                variant="home"
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BrowsePage;
