'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { apiRequest } from '@/lib/api';
import { Studio } from '@/components/StudioCard';
import {
  LayoutDashboard,
  Building2,
  CalendarCheck,
  Heart,
  PlusCircle,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  DollarSign,
  Clock,
  Sparkles,
  MapPin
} from 'lucide-react';

interface Booking {
  _id: string;
  studioTitle: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [studios, setStudios] = useState<Studio[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/dashboard');
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function loadDashboardData() {
      if (!user) return;
      setDataLoading(true);
      try {
        const [studiosRes, bookingsRes] = await Promise.all([
          apiRequest(`/studios/user/${encodeURIComponent(user.email)}`).catch(() => ({ studios: [] })),
          apiRequest(`/bookings/user/${encodeURIComponent(user.email)}`).catch(() => ({ bookings: [] }))
        ]);

        if (studiosRes.success && studiosRes.studios) {
          setStudios(studiosRes.studios);
        }
        if (bookingsRes.success && bookingsRes.bookings) {
          setBookings(bookingsRes.bookings);
        }
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setDataLoading(false);
      }
    }

    if (user) {
      loadDashboardData();
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-pulse">
        <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg mx-auto mb-4" />
        <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
            alt={user.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-500/40 shadow-md"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-500 border border-amber-500/30 mb-1">
              <Sparkles className="w-3 h-3" />
              Creator Dashboard
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Welcome back, {user.name}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {user.email} • Verified Member
            </p>
          </div>
        </div>

        <Link
          href="/add-studio"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 transition-all shrink-0 active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>List New Studio</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Listed Studios
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {studios.length}
          </div>
          <Link href="/my-listings" className="text-xs font-semibold text-amber-500 hover:underline inline-flex items-center gap-1">
            Manage listings <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Reservations
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {bookings.length}
          </div>
          <Link href="/my-bookings" className="text-xs font-semibold text-blue-500 hover:underline inline-flex items-center gap-1">
            View booking status <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Saved Wishlist
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {user.wishlist?.length || 0}
          </div>
          <Link href="/studios" className="text-xs font-semibold text-rose-500 hover:underline inline-flex items-center gap-1">
            Explore spaces <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Protection Shield
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white">
            $1M Covered
          </div>
          <span className="text-xs text-slate-400 block">
            Host Liability Protection
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                My Production Spaces
              </h2>
              <p className="text-xs text-slate-400">Studios you host on StudioSpace</p>
            </div>
            <Link
              href="/my-listings"
              className="text-xs font-semibold text-amber-500 hover:underline inline-flex items-center gap-1"
            >
              All Listings ({studios.length}) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {studios.length > 0 ? (
            <div className="space-y-3">
              {studios.slice(0, 3).map((s) => (
                <div
                  key={s._id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={s.image || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=300&q=80'}
                      alt={s.title}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                        {s.title}
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-500" />
                        {s.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      ${s.hourlyRate}/hr
                    </span>
                    <Link
                      href={`/studios/${s._id}`}
                      className="block text-[11px] text-amber-500 hover:underline"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center space-y-2">
              <Building2 className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-xs text-slate-500">No studios listed yet.</p>
              <Link
                href="/add-studio"
                className="inline-block text-xs font-bold text-amber-500 hover:underline"
              >
                + Add your first studio
              </Link>
            </div>
          )}
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Recent Bookings
              </h2>
              <p className="text-xs text-slate-400">Your reservations and schedule</p>
            </div>
            <Link
              href="/my-bookings"
              className="text-xs font-semibold text-amber-500 hover:underline inline-flex items-center gap-1"
            >
              All Bookings ({bookings.length}) <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {bookings.length > 0 ? (
            <div className="space-y-3">
              {bookings.slice(0, 3).map((b) => (
                <div
                  key={b._id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                      {b.studioTitle}
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-amber-500" />
                      {b.date} • {b.startTime} - {b.endTime}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      ${b.totalPrice}
                    </span>
                    <span className="block text-[10px] font-semibold text-amber-500 uppercase">
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center space-y-2">
              <CalendarCheck className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-xs text-slate-500">No active bookings found.</p>
              <Link
                href="/studios"
                className="inline-block text-xs font-bold text-amber-500 hover:underline"
              >
                Browse studios to book
              </Link>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
