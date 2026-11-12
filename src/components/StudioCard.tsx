'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, MapPin, Heart, ArrowRight, Users, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit?: number;
  maxCapacity?: number;
  location: string;
  image?: string;
  images?: string[];
  rating?: number;
  reviewsCount?: number;
  amenities?: string[];
  overview?: string;
  hostName?: string;
  hostEmail?: string;
  hostAvatar?: string;
}

interface StudioCardProps {
  studio: Studio;
}

export default function StudioCard({ studio }: StudioCardProps) {
  const { isInWishlist, toggleWishlist, user } = useAuth();
  const [isSaved, setIsSaved] = useState<boolean>(isInWishlist(studio._id));
  const [toggling, setToggling] = useState(false);

  const displayImage = studio.image || (studio.images && studio.images[0]) || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80';

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.info('Please sign in to save studios to your wishlist.');
      return;
    }

    setToggling(true);
    const saved = await toggleWishlist(studio._id);
    setIsSaved(saved);
    setToggling(false);
    toast.success(saved ? 'Studio added to your wishlist!' : 'Studio removed from your wishlist.');
  };

  return (
    <div className="group flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-amber-500/40 dark:hover:border-amber-500/40 transition-all duration-300 overflow-hidden">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
        <img
          src={displayImage}
          alt={studio.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 text-amber-400 border border-amber-500/30 backdrop-blur-md shadow-sm">
            {studio.category}
          </span>
        </div>

        <button
          onClick={handleWishlistClick}
          disabled={toggling}
          aria-label="Save to Wishlist"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all active:scale-90"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'
            }`}
          />
        </button>

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 text-white text-xs font-semibold backdrop-blur-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{studio.rating ? studio.rating.toFixed(1) : '4.9'}</span>
          <span className="text-slate-400 text-[10px]">({studio.reviewsCount || 12})</span>
        </div>

        {studio.maxCapacity && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 text-slate-300 text-xs backdrop-blur-md">
            <Users className="w-3.5 h-3.5" />
            <span>Up to {studio.maxCapacity}</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 truncate">
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate">{studio.location}</span>
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-amber-500 transition-colors">
            {studio.title}
          </h3>

          {studio.overview && (
            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {studio.overview}
            </p>
          )}
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-slate-950 dark:text-white">
                ${studio.hourlyRate}
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                / hr
              </span>
            </div>
            {studio.securityDeposit ? (
              <span className="text-[10px] text-slate-400 block">
                +${studio.securityDeposit} deposit
              </span>
            ) : null}
          </div>

          <Link
            href={`/studios/${studio._id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 dark:bg-amber-500 dark:hover:bg-amber-400 transition-all shadow-sm active:scale-95"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
}
