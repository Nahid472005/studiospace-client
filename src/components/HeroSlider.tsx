'use client';

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { ArrowRight, Sparkles, ShieldCheck, Clock, MapPin } from 'lucide-react';

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
  return (
    <div className="relative w-full h-[580px] sm:h-[650px] lg:h-[720px] overflow-hidden bg-slate-950">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            {/* Background Image with Gradient Overlays */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />
            </div>

            {/* Slide Content */}
            <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
              <div className="max-w-2xl space-y-6">
                
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  {slide.tag}
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                  {slide.title}
                </h1>

                {/* Subtext */}
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
                  {slide.subtitle}
                </p>

                {/* Primary CTA Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={slide.ctaLink}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all hover:scale-[1.02] active:scale-95"
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

                {/* Micro Assurance Badges */}
                <div className="pt-4 flex items-center gap-6 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>$1M Host Liability Protection</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Instant Slot Confirmation</span>
                  </div>
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
