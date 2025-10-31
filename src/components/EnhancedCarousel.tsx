"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Video } from "@/typings";
import { yearFrom } from "../lib/date";
import { ChevronLeft, ChevronRight, Play, Plus } from "lucide-react";

interface EnhancedCarouselProps {
  title: string;
  movies: Video[];
  variant?: "home" | "series" | "documentary";
}

export const EnhancedCarousel = ({ title, movies, variant = "home" }: EnhancedCarouselProps) => {
  const router = useRouter();
  if (!movies?.length) return null;

  // Provide subtle visual differentiation per topic without new colors
  const topicKey = useMemo(() => title.toLowerCase(), [title]);

  // Horizontal scroller state
  const scrollerId = useMemo(() => `scroll-${title.replace(/\s+/g, "-")}`, [title]);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const scrollTimer = useRef<number | null>(null);

  useEffect(() => {
    const el = document.getElementById(scrollerId);
    if (!el) return;
    const update = () => {
      const left = (el as any).scrollLeft || 0;
      const max = (el as any).scrollWidth - (el as any).clientWidth;
      setCanLeft(left > 0);
      setCanRight(left < max - 1);
    };
    update();
    const onScroll = () => {
      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
      scrollTimer.current = window.setTimeout(update, 120);
    };
    el.addEventListener("scroll", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (scrollTimer.current) window.clearTimeout(scrollTimer.current);
    };
  }, [scrollerId]);

  const styles = useMemo(() => {
    // Base, shared across all topics to keep site theme
    const baseContainer =
      "relative overflow-hidden rounded-3xl border border-gray-700/30 bg-gradient-to-br from-slate-900/60 to-gray-900/40 shadow-[0_25px_55px_-30px_rgba(0,0,0,0.65)]";

    const baseTitleAccent =
      "w-1.5 h-8 rounded-full bg-gradient-to-b from-red-500 to-red-600 shadow-[0_0_18px_rgba(239,68,68,0.6)]";

    // Topic-specific accent lights and surface tweaks
    if (topicKey.includes("trending")) {
      return {
        container: `${baseContainer} ring-1 ring-red-600/30`,
        ambient: (
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-red-600/25 rounded-full blur-3xl" />
            <div className="absolute -bottom-28 -right-32 w-96 h-96 bg-red-500/20 rounded-full blur-[100px]" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-red-500/10 to-transparent" />
          </div>
        ),
        titleAccent: baseTitleAccent,
        cardRing: "ring-1 ring-red-600/40 group-hover/item:ring-red-600/60",
      } as const;
    }

    if (topicKey.includes("spiritual")) {
      return {
        container: `${baseContainer} backdrop-blur-xl ring-1 ring-gray-600/30`,
        ambient: (
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 left-10 w-72 h-72 bg-gray-200/10 rounded-full blur-3xl" />
          </div>
        ),
        titleAccent: "w-1.5 h-8 rounded-full bg-gradient-to-b from-gray-200 to-gray-400 shadow-[0_0_18px_rgba(148,163,184,0.45)]",
        cardRing: "ring-1 ring-gray-600/30 group-hover/item:ring-gray-300/40",
      } as const;
    }

    if (topicKey.includes("wellness") || topicKey.includes("healing")) {
      return {
        container: `${baseContainer} ring-1 ring-gray-700/40`,
        ambient: (
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/2 -translate-y-1/2 -left-24 w-80 h-80 bg-gray-400/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-gray-300/10 rounded-full blur-3xl" />
          </div>
        ),
        titleAccent: baseTitleAccent,
        cardRing: "ring-1 ring-gray-700/30 group-hover/item:ring-red-600/40",
      } as const;
    }

    // Keep existing look for documentaries/series usage by default
    return {
      container: baseContainer,
      ambient: (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-red-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-red-500/10 rounded-full blur-3xl" />
        </div>
      ),
      titleAccent: baseTitleAccent,
      cardRing: "ring-1 ring-gray-800/20 group-hover/item:ring-red-600/50",
    } as const;
  }, [topicKey]);

  const handleNavigate = (m: Video) => {
    const isSeries = m?.type?.name === "Series";
    console.debug("browse.card.click", { id: m.id, title: m.title, isSeries });
    if (isSeries) router.push(`/series/${m.id}`);
    else router.push(`/watch/${m.id}`);
  };

  const handlePlay = (e: React.MouseEvent, m: Video) => {
    e.stopPropagation();
    console.debug("browse.card.play", { id: m.id, title: m.title });
    router.push(`/watch/${m.id}`);
  };

  const scrollBy = (dir: "left" | "right") => {
    const el = document.getElementById(scrollerId) as HTMLElement | null;
    if (!el) return;
    const delta = Math.round(el.clientWidth * 0.9) * (dir === "left" ? -1 : 1);
    const next = Math.max(0, Math.min(el.scrollLeft + delta, el.scrollWidth - el.clientWidth));
    (el as any).scrollTo ? (el as any).scrollTo({ left: next, behavior: "smooth" }) : ((el as any).scrollLeft = next);
  };

  return (
    <div className="px-4 lg:px-16 mb-16">
      <div
        data-variant={variant}
        data-section-title={title}
        {...(variant === "documentary" ? { className: `${styles.container} enhanced-carousel-documentary` } : {})}
      >
        {styles.ambient}

        <div className="relative p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className={styles.titleAccent} />
            <h2 className="text-2xl lg:text-3xl font-bold text-white">{title}</h2>
          </div>

          {/* Horizontal scroller */}
          <div className="relative">
            {/* Left nav */}
            <button
              type="button"
              aria-label="Scroll left"
              disabled={!canLeft}
              onClick={() => scrollBy("left")}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-6 z-20 rounded-full p-2 bg-black/50 border border-gray-700/40 text-white hover:bg-black/70 transition ${
                canLeft ? "opacity-100" : "opacity-50 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right nav */}
            <button
              type="button"
              aria-label="Scroll right"
              disabled={!canRight}
              onClick={() => scrollBy("right")}
              className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-6 z-20 rounded-full p-2 bg-black/50 border border-gray-700/40 text-white hover:bg-black/70 transition ${
                canRight ? "opacity-100" : "opacity-50 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div
              id={scrollerId}
              className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-700/50 scrollbar-track-transparent pr-6"
            >
              {movies.map((m, index) => (
                <div
                  key={m.id}
                  className="group/item cursor-pointer snap-start min-w-[260px] md:min-w-[300px] lg:min-w-[320px]"
                  onClick={() => handleNavigate(m)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`relative overflow-hidden rounded-xl transition-all duration-700 group-hover/item:scale-105 group-hover/item:z-10 shadow-xl ${styles.cardRing}`}
                  >
                    <img
                      src={m.image_path || "/images/2.jpg"}
                      alt={m.title}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover/item:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover/item:opacity-100 transition-all duration-500" />

                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full p-[1px] bg-gradient-to-r from-rose-500/70 via-red-500/70 to-rose-600/70 shadow-[0_6px_20px_-8px_rgba(244,63,94,0.45)]">
                        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 bg-black/60 text-white backdrop-blur-md text-[11px] ring-1 ring-white/10">
                          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-rose-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19V7a2 2 0 0 1 2-2h10l4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="M13 3v6"/><path d="M8 3v6"/></svg>
                          <span>{Math.floor(Math.random() * 12 + 4)} Episodes</span>
                        </span>
                      </span>
                    </div>

                    {/* Hover content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 opacity-0 group-hover/item:translate-y-0 group-hover/item:opacity-100 transition-all duration-500">
                      <h3 className="text-white font-bold text-lg mb-2">{m.title}</h3>
                      <p className="text-gray-200 text-sm line-clamp-2 mb-3">{m.description}</p>

                      {/* Controls */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-400 text-sm font-semibold">Rating {m.rating}</span>
                          <span className="text-gray-400 text-sm">{yearFrom(m.release_date)}</span>
                        </div>
                        {variant !== "series" && (
                          <span className="text-gray-400 text-xs">{m.type?.name || m.type?.category?.name}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          title="Play video"
                          onClick={(e) => handlePlay(e, m)}
                          className={`${
                            variant === "documentary"
                              ? "bg-red-500/90 hover:bg-red-600"
                              : "bg-white/10 hover:bg-white/20"
                          } text-white px-3 py-2 rounded-md text-sm border border-white/10`}
                        >
                          <span className="inline-flex items-center gap-2"><Play className="w-4 h-4" /> Play</span>
                        </button>
                        <button
                          title="Add to My List"
                          onClick={(e) => e.stopPropagation()}
                          className={`${
                            variant === "documentary"
                              ? "border-red-400/60 text-red-200/90 hover:border-red-400"
                              : "border-gray-500/50 text-gray-200 hover:border-gray-400"
                          } bg-black/30 px-3 py-2 rounded-md text-sm border`}
                        >
                          <span className="inline-flex items-center gap-2"><Plus className="w-4 h-4" /> My List</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCarousel;
