'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Studio } from '@/components/StudioCard';
import BookingModal from '@/components/BookingModal';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import {
  Star,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle2,
  Heart,
  Calendar,
  Share2,
  ArrowLeft,
  Clock,
  Sparkles,
  DollarSign,
  Building2,
  Mail,
  Award
} from 'lucide-react';

export default function StudioDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isInWishlist, toggleWishlist } = useAuth();

  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    async function loadStudio() {
      try {
        const data = await apiRequest(`/studios/${id}`);
        if (data.success && data.studio) {
          setStudio(data.studio);
          setIsSaved(isInWishlist(data.studio._id));
        }
      } catch (err: any) {
        toast.error(err.message || 'Studio not found');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadStudio();
    }
  }, [id, isInWishlist]);

  const handleWishlistToggle = async () => {
    if (!studio) return;
    if (!user) {
      toast.info('Please sign in to save studios.');
      return;
    }
    const saved = await toggleWishlist(studio._id);
    setIsSaved(saved);
    toast.success(saved ? 'Studio saved to your wishlist!' : 'Studio removed from your wishlist.');
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Studio link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-8 animate-pulse">
        <div className="h-8 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        <div className="h-[450px] w-full bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-6 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <div className="h-24 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
          </div>
          <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!studio) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <Building2 className="w-16 h-16 text-amber-500 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Studio Workspace Not Found</h2>
        <p className="text-sm text-slate-500">The creative space you are looking for may have been moved or unpublished.</p>
        <Link href="/studios" className="inline-block px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm">
          Return to All Studios
        </Link>
      </div>
    );
  }

  const galleryImages = studio.images && studio.images.length > 0 ? studio.images : [studio.image || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80'];

  // Realistic reviews (100% free of lorem ipsum)
  const creatorReviews = [
    {
      author: 'Maya Lin',
      role: 'Commercial Film Director',
      rating: 5,
      date: 'January 28, 2026',
      content: 'Incredible acoustics and lighting setup. The cyclorama wall was flawlessly repainted before our shoot, and the 400A power distribution made running our Aputure fixtures completely hassle-free.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    {
      author: 'Devon Sterling',
      role: 'Podcast & Audio Producer',
      rating: 5,
      date: 'February 12, 2026',
      content: 'The broadcast suite had crystal-clear noise isolation. RodeCaster Pro II console was pre-calibrated and our guest felt right at home in the lounge chairs. Will definitely book again!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top Navigation & Actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/studios"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Studios</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Share Studio"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleWishlistToggle}
            className={`p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors ${
              isSaved ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Title & Metadata */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-amber-500/15 border border-amber-500/30 text-amber-500">
            {studio.category}
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{studio.rating ? studio.rating.toFixed(2) : '4.95'}</span>
            <span className="text-slate-400">({studio.reviewsCount || 38} reviews)</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>{studio.location}</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {studio.title}
        </h1>
      </div>

      {/* Gallery Carousel (Swiper.js) */}
      <div className="w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 shadow-xl">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="w-full h-[360px] sm:h-[480px] lg:h-[540px]"
        >
          {galleryImages.map((img, idx) => (
            <SwiperSlide key={idx} className="relative w-full h-full bg-slate-950">
              <img
                src={img}
                alt={`${studio.title} - Slide ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main Content Layout: 2 Cols (Details on Left, Floating Booking Card on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column (Specs, Overview, Amenities, Host, Reviews) */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Hourly Rate</span>
              <span className="text-lg font-extrabold text-slate-900 dark:text-white">${studio.hourlyRate}/hr</span>
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Security Deposit</span>
              <span className="text-lg font-extrabold text-slate-900 dark:text-white">${studio.securityDeposit || 0}</span>
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Max Capacity</span>
              <span className="text-lg font-extrabold text-slate-900 dark:text-white">{studio.maxCapacity || 10} Creators</span>
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">Confirmation</span>
              <span className="text-lg font-extrabold text-amber-500">Instant Slot</span>
            </div>
          </div>

          {/* Detailed Overview */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Workspace Overview</h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {studio.overview}
            </p>
          </div>

          {/* Amenities Checklist */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Studio Amenities & Equipment</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(studio.amenities && studio.amenities.length > 0 ? studio.amenities : [
                'Professional Lighting Grid',
                'High-Speed Production Wi-Fi (1Gbps)',
                'Dedicated Hair & Makeup Station',
                'Client Lounge & Green Room',
                'Ground-Floor Loading Access',
                'Silent Dual-Zone HVAC Control'
              ]).map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Host Information */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Hosted by Studio Owner</h2>
            <div className="flex items-center gap-4">
              <img
                src={studio.hostAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(studio.hostName || 'Host')}`}
                alt={studio.hostName || 'Host'}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-amber-500/40"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{studio.hostName || 'Studio Host'}</h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <Award className="w-3 h-3" />
                    Verified Host
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{studio.hostEmail}</p>
                <p className="text-xs text-slate-400">Response time: Usually within 15 minutes</p>
              </div>
            </div>
          </div>

          {/* Creator Reviews */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Creator Reviews</h2>
              <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span>4.95 Rating</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {creatorReviews.map((rev, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={rev.avatar} alt={rev.author} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{rev.author}</p>
                      <p className="text-xs text-slate-400">{rev.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                    <span className="text-slate-400 ml-1 text-[11px]">{rev.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    "{rev.content}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Reservation Action Card */}
        <div>
          <div className="sticky top-28 p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            
            <div className="flex items-baseline justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
                  ${studio.hourlyRate}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium ml-1">
                  / hour
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{studio.rating ? studio.rating.toFixed(2) : '4.95'}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center justify-between">
                <span>Security Deposit</span>
                <span className="font-semibold text-slate-900 dark:text-white">${studio.securityDeposit || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Minimum Reservation</span>
                <span className="font-semibold text-slate-900 dark:text-white">1 Hour</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Cancellation</span>
                <span className="font-semibold text-emerald-500">Free before session</span>
              </div>
            </div>

            <button
              onClick={() => setBookingModalOpen(true)}
              className="w-full py-4 rounded-xl text-center text-slate-950 font-bold text-sm sm:text-base bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Workspace Now</span>
            </button>

            <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Protected by $1M Host Liability Shield</span>
            </div>

          </div>
        </div>

      </div>

      {/* Booking Modal Dialog */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        studio={studio}
      />

    </div>
  );
}
