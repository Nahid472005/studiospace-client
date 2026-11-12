'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  Search,
  MapPin,
  Calendar,
  Layers
} from 'lucide-react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=2000&q=85',
    tag: 'Photography & Fashion Cyc Walls',
    title: 'Precision Daylight & Infinity Cyclorama Studios',
    subtitle: 'Step into seamless infinity cyc walls, motorized lighting grids, and sun-drenched lofts designed for commercial fashion and editorial photography.',
    ctaText: 'Explore Photo Studios',
    ctaLink: '/studios?category=Photo+Studios',
  },
  {
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2000&q=85',
    tag: 'Cinema & Virtual Production',
    title: 'Sound Stages Engineered for Hollywood Cinematography',
    subtitle: 'From curved LED volumetric walls and whisper-quiet soundproofing to heavy-duty drive-in roll-up doors and 400A three-phase power.',
    ctaText: 'Explore Sound Stages',
    ctaLink: '/studios?category=Sound+Stages',
  },
  {
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=2000&q=85',
    tag: 'Podcasting & Streaming Lounges',
    title: 'Plug-and-Produce Broadcast Suites & Audio Lounges',
    subtitle: 'Book turnkey multi-camera podcast rooms equipped with Shure microphones, acoustic panelling, and customized RGB ambience.',
    ctaText: 'Explore Podcast Rooms',
    ctaLink: '/studios?category=Podcast+Rooms',
  },
  {
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=2000&q=85',
    tag: 'Analog & Digital Audio Suites',
    title: 'Acoustically Tuned Music Recording & Mastering Labs',
    subtitle: 'Access world-class SSL consoles, vintage tube microphones, and isolated vocal booths for uncompromised record production.',
    ctaText: 'Explore Music Suites',
    ctaLink: '/studios?category=Music+Suites',
  },
];

export default function HeroSlider() {
  const router = useRouter();
  const [searchActivity, setSearchActivity] = useState('All');
  const [searchLocation, setSearchLocation] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchActivity !== 'All') {
      params.set('category', searchActivity);
    }
    if (searchLocation.trim()) {
      params.set('search', searchLocation.trim());
    }
    router.push(`/studios?${params.toString()}`);
  };

  return (
    <div className="relative w-full overflow-hidden bg-slate-950">
      <div className="relative w-full h-[640px] sm:h-[720px] lg:h-[780px]">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 6500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="w-full h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="relative w-full h-full">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />
              </div>

              <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-8 pb-28">
                <div className="max-w-3xl space-y-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    {slide.tag}
                  </div>

                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                    {slide.title}
                  </h1>

                  <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                    {slide.subtitle}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <Link
                      href={slide.ctaLink}
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-95"
                    >
                      {slide.ctaText}
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      href="/add-studio"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 backdrop-blur-md transition-all hover:scale-[1.02] active:scale-95"
                    >
                      Host Your Space
                    </Link>
                  </div>

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="relative -mt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-20 pb-8">
        <form
          onSubmit={handleHeroSearch}
          className="p-3 sm:p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-950/20 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
        >
          <div className="sm:col-span-5 px-3 py-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-1">
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              What are you planning?
            </label>
            <select
              value={searchActivity}
              onChange={(e) => setSearchActivity(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="All" className="dark:bg-slate-900">All Production Disciplines</option>
              <option value="Photo Studios" className="dark:bg-slate-900">Photo & Fashion Cyc Walls</option>
              <option value="Sound Stages" className="dark:bg-slate-900">Cinema Sound Stages & LED</option>
              <option value="Podcast Rooms" className="dark:bg-slate-900">Podcast & Stream Lounges</option>
              <option value="Music Suites" className="dark:bg-slate-900">Music Recording Suites</option>
              <option value="Art Workshops" className="dark:bg-slate-900">Fine Art & Sculpture Workshops</option>
            </select>
          </div>

          <div className="sm:col-span-5 px-3 py-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-800">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              Location or Studio Name
            </label>
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="e.g. New York, Burbank, or Cyc Wall..."
              className="w-full bg-transparent text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
