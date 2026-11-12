'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ConfirmationModal from '@/components/ConfirmationModal';
import InvoiceGenerator from '@/components/InvoiceGenerator';
import { apiRequest } from '@/lib/api';
import { toast } from 'sonner';
import {
  CalendarCheck,
  Clock,
  MapPin,
  Calendar,
  XCircle,
  AlertCircle,
  FileText,
  DollarSign,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface Booking {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioImage?: string;
  category: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  hourlyRate: number;
  subtotal: number;
  securityDeposit: number;
  totalPrice: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  notes?: string;
  userName: string;
  userEmail: string;
  createdAt: string;
}

export default function MyBookingsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedBookingToCancel, setSelectedBookingToCancel] = useState<Booking | null>(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      toast.info('Please sign in to view your studio reservations.');
      router.push('/login?redirect=/my-bookings');
    }
  }, [user, loading, router]);

  const loadUserBookings = async () => {
    if (!user) return;
    setFetchLoading(true);
    try {
      const data = await apiRequest(`/bookings/user/${encodeURIComponent(user.email)}`);
      if (data.success && data.bookings) {
        setBookings(data.bookings);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to load bookings.');
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadUserBookings();
    }
  }, [user]);

  const handleOpenCancelModal = (booking: Booking) => {
    setSelectedBookingToCancel(booking);
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedBookingToCancel) return;
    setCancelling(true);

    try {
      const data = await apiRequest(`/bookings/${selectedBookingToCancel._id}/cancel`, {
        method: 'PATCH',
      });

      if (data.success) {
        toast.success('Your workspace booking has been cancelled.');
        setBookings(
          bookings.map((b) =>
            b._id === selectedBookingToCancel._id ? { ...b, status: 'Cancelled' } : b
          )
        );
        setCancelModalOpen(false);
        setSelectedBookingToCancel(null);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to cancel reservation.');
    } finally {
      setCancelling(false);
    }
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
            Confirmed
          </span>
        );
      case 'Pending':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-500 border border-amber-500/30">
            Pending Approval
          </span>
        );
      case 'Completed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/15 text-blue-500 border border-blue-500/30">
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-500/15 text-slate-400 border border-slate-500/30">
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  if (loading || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-pulse">
        <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg mx-auto mb-4" />
        <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
            Production Schedule
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
            My Studio Bookings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track shoot hours, inspect pending slot reservations, cancel appointments, or download official PDF receipts.
          </p>
        </div>

        <Link
          href="/studios"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm shrink-0"
        >
          <span>Find Another Studio</span>
          <ArrowRight className="w-4 h-4 text-amber-500" />
        </Link>
      </div>

      {fetchLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-32 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          ))}
        </div>
      ) : bookings.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((booking) => {
            const displayImg =
              booking.studioImage ||
              'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80';

            const canCancel = booking.status === 'Pending';

            return (
              <div
                key={booking._id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-amber-500/30 transition-all"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-950 shrink-0">
                    <img
                      src={displayImg}
                      alt={booking.studioTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      {getStatusBadge(booking.status)}
                      <span className="text-xs text-slate-400 font-mono">
                        Ref: #{booking._id.slice(-6).toUpperCase()}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {booking.studioTitle}
                    </h3>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        {booking.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        {booking.startTime} – {booking.endTime} ({booking.totalHours} hrs)
                      </span>
                    </div>

                    {booking.notes && (
                      <p className="text-[11px] text-slate-500 italic max-w-md line-clamp-1">
                        Note: "{booking.notes}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:justify-end gap-4 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-400 block">Total Investment</span>
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                      ${booking.totalPrice}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      ${booking.hourlyRate}/hr • ${booking.securityDeposit} deposit
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <InvoiceGenerator booking={booking} />

                    {canCancel && (
                      <button
                        onClick={() => handleOpenCancelModal(booking)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Cancel Booking</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-16 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <CalendarCheck className="w-14 h-14 text-amber-500/80 mx-auto" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            You don't have any studio bookings yet
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Ready to shoot your next commercial, record a podcast episode, or master a music project?
          </p>
          <div className="pt-2">
            <Link
              href="/studios"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore Available Spaces</span>
            </Link>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={cancelModalOpen}
        title="Cancel Studio Booking"
        message={`Are you sure you want to cancel your reservation for "${selectedBookingToCancel?.studioTitle}" on ${selectedBookingToCancel?.date}? The time slot will immediately be made available for other creators.`}
        confirmText="Yes, Cancel Booking"
        cancelText="Keep Booking"
        isDestructive={true}
        isLoading={cancelling}
        onConfirm={handleConfirmCancel}
        onCancel={() => {
          setCancelModalOpen(false);
          setSelectedBookingToCancel(null);
        }}
      />

    </div>
  );
}
