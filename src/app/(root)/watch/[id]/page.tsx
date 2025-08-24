// app/watch/[id]/page.tsx

import React from "react";
import { Metadata } from 'next';
import WatchVideo from "./watch-video";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Optional: Generate metadata dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Watch Video ${(await params).id}`,
  };
}

// ✅ This should be a server component by default (not async unless required)
export default async function WatchPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div>
      <h1>Watch Page - ID: {id}</h1>
      <WatchVideo params={{ id }} />
    </div>
  );
}

// ✅ If you want to statically generate some routes at build time
export function generateStaticParams() {
  const ids = ['1', '2', '3', '4', '254'];
  return ids.map((id) => ({ id }));
}
