'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import CategorySection from '@/components/CategorySection';
import StudioCard, { Studio } from '@/components/StudioCard';
import SkeletonCard from '@/components/SkeletonCard';
import { apiRequest } from '@/lib/api';
import {
  Search,
  CalendarCheck,
  Zap,
  Film,
  ShieldCheck,
  BadgeCheck,
  Lock,
  Headphones,
  ArrowRight,
  Sparkles,
  Building2,
  Users2
} from 'lucide-react';

export default function HomePage() {
  const [featuredStudios, setFeaturedStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const data = await apiRequest('/studios?limit=6&sort=rating');
        if (data.success && data.studios) {
          setFeaturedStudios(data.studios);
        }
      } catch (err) {
        console.error('Featured studios fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      <HeroSlider />
      <CategorySection />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-500 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Top-Rated Creative Spaces</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Featured Production Studios
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Inspect availability and instantly reserve top-rated spaces verified by industry directors, photographers, and audio engineers.
            </p>
          </div>
          <Link
            href="/studios"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:border-amber-500/50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all shadow-sm"
          >
            <span>Explore All Studios</span>
            <ArrowRight className="w-4 h-4 text-amber-500" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <SkeletonCard key={n} />
            ))}
          </div>
        ) : featuredStudios.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredStudios.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900">
            <Building2 className="w-12 h-12 text-amber-500 mx-auto mb-3 opacity-80" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Studios Loading or Connecting</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-6">
              Connect your MongoDB database URI to see dynamically seeded creative lofts and cinema sound stages.
            </p>
            <Link
              href="/add-studio"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-sm font-bold shadow-md hover:bg-amber-400 transition-all"
            >
              List the First Studio
            </Link>
          </div>
        )}
      </section>

      <section id="how-it-works" className="py-20 bg-slate-100/70 dark:bg-slate-900/50 border-y border-slate-200/80 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Seamless Rental Pipeline
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              How Studio Booking Works
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              From scouting the perfect lighting setup to rolling cameras in under 5 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center font-bold text-lg mb-5">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-500" />
                Discover Spaces
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Filter photography cycs, soundproof stages, and podcast suites by equipment, capacity, and hourly budget.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center font-bold text-lg mb-5">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-amber-500" />
                Select Shoot Hours
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Inspect dynamic live availability. Choose your production start and wrap times with zero double-booking risk.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center font-bold text-lg mb-5">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Book Instantly
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Submit with transparent pricing, zero hidden cleaning markups, and direct access codes delivered immediately.
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center font-bold text-lg mb-5">
                04
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Film className="w-4 h-4 text-amber-500" />
                Create & Produce
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Arrive on set, plug into pre-calibrated lighting and sound gear, and capture production-ready content seamlessly.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section id="about-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          
          <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Host Guarantee & Creator Protection
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-2 text-white">
              Built on Trust, Insurance Security, and 24/7 Creator Support
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
              Every production reserved through StudioSpace is reinforced by comprehensive liability protection and verified studio standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm space-y-3">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
              <h3 className="text-base font-bold text-white">
                $1M Liability Protection
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automatic property and space damage coverage included on all confirmed creative production reservations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm space-y-3">
              <BadgeCheck className="w-8 h-8 text-amber-400" />
              <h3 className="text-base font-bold text-white">
                Verified Creator Profiles
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Identity-checked hosts and production crew ensures professional respect for stage gear and studio facilities.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm space-y-3">
              <Lock className="w-8 h-8 text-amber-400" />
              <h3 className="text-base font-bold text-white">
                Equipment Safety Shield
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clear security deposit escrow safeguards cinema lenses, high-voltage lighting rigs, and vintage analog gear.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm space-y-3">
              <Headphones className="w-8 h-8 text-amber-400" />
              <h3 className="text-base font-bold text-white">
                24/7 Concierge Support
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated production liaisons available around the clock to troubleshoot access codes, power grids, or timing extensions.
              </p>
            </div>

          </div>

          <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Own a cyclorama, podcast booth, or music studio?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Turn idle studio downtime into dependable recurring income by listing on StudioSpace.
              </p>
            </div>
            <Link
              href="/add-studio"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all shrink-0 active:scale-95"
            >
              Host Your Creative Space
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
