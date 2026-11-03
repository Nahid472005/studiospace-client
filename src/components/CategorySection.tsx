'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, Clapperboard, Mic, Music, Palette, ArrowUpRight } from 'lucide-react';

const categories = [
  {
    name: 'Photo Studios',
    slug: 'Photo Studios',
    icon: Camera,
    tagline: 'Daylight lofts & cycloramas',
    count: '24+ Spaces',
    gradient: 'from-blue-600/20 to-indigo-600/10 border-blue-500/30',
    iconColor: 'text-blue-500 bg-blue-500/10',
  },
  {
    name: 'Sound Stages',
    slug: 'Sound Stages',
    icon: Clapperboard,
    tagline: 'LED volume & cinema stages',
    count: '18+ Stages',
    gradient: 'from-amber-600/20 to-orange-600/10 border-amber-500/30',
    iconColor: 'text-amber-500 bg-amber-500/10',
  },
  {
    name: 'Podcast Rooms',
    slug: 'Podcast Rooms',
    icon: Mic,
    tagline: 'Multi-cam broadcast lounges',
    count: '32+ Lounges',
    gradient: 'from-purple-600/20 to-pink-600/10 border-purple-500/30',
    iconColor: 'text-purple-500 bg-purple-500/10',
  },
  {
    name: 'Music Suites',
    slug: 'Music Suites',
    icon: Music,
    tagline: 'Vocal booths & analog suites',
    count: '28+ Suites',
    gradient: 'from-emerald-600/20 to-teal-600/10 border-emerald-500/30',
    iconColor: 'text-emerald-500 bg-emerald-500/10',
  },
  {
    name: 'Art Workshops',
    slug: 'Art Workshops',
    icon: Palette,
    tagline: 'Ceramics & painting ateliers',
    count: '15+ Ateliers',
    gradient: 'from-rose-600/20 to-red-600/10 border-rose-500/30',
    iconColor: 'text-rose-500 bg-rose-500/10',
  },
];

export default function CategorySection() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Curated Creative Spaces
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
              Browse by Studio Categories
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Filter by production discipline to find the exact acoustic, lighting, and stage specifications your project demands.
            </p>
          </div>
          <Link
            href="/studios"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:underline"
          >
            View All Categories
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 5 Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={`/studios?category=${encodeURIComponent(cat.slug)}`}
                className={`group relative p-6 rounded-2xl border bg-white dark:bg-slate-900/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden ${cat.gradient}`}
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.iconColor} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {cat.tagline}
                    </p>
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between text-xs font-semibold text-slate-400 dark:text-slate-500 group-hover:text-amber-500 transition-colors">
                  <span>{cat.count}</span>
                  <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
