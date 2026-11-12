'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Studio } from './StudioCard';
import { useAuth } from '@/context/AuthContext';
import { apiRequest } from '@/lib/api';
import { toast } from 'sonner';
import { Calendar, Clock, DollarSign, X, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  studio: Studio;
}

export default function BookingModal({ isOpen, onClose, studio }: BookingModalProps) {
  const router = useRouter();
  const { user } = useAuth();

  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [date, setDate] = useState(tomorrow);
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('14:00');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const calculateHours = () => {
    if (!startTime || !endTime) return 0;
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    const diffMinutes = endH * 60 + endM - (startH * 60 + startM);
    return diffMinutes > 0 ? Number((diffMinutes / 60).toFixed(1)) : 0;
  };

  const hours = calculateHours();
  const subtotal = Math.round(hours * studio.hourlyRate);
  const deposit = Number(studio.securityDeposit || 0);
  const grandTotal = subtotal + deposit;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!user) {
      toast.error('Please sign in to complete your studio booking.');
      router.push(`/login?redirect=/studios/${studio._id}`);
      return;
    }

    if (hours <= 0) {
      setErrorMessage('End time must be later than start time.');
      toast.error('Invalid booking duration.');
      return;
    }

    setLoading(true);

    try {
      const data = await apiRequest('/bookings', {
        method: 'POST',
        body: JSON.stringify({
          studioId: studio._id,
          date,
          startTime,
          endTime,
          notes,
        }),
      });

      if (data.success) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        toast.success('Workspace reserved! Status is currently Pending review.');
        onClose();
        router.push('/my-bookings');
      }
    } catch (err: any) {
      const message = err.message || 'Failed to submit booking reservation.';
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto"
        role="dialog"
      >
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Instant Slot Reservation
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              Book {studio.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {studio.location} • ${studio.hourlyRate}/hr
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-start gap-3 text-rose-700 dark:text-rose-300 text-xs sm:text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-500 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold block">Time Slot Collision Detected</span>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Shoot / Session Date
            </label>
            <div className="relative">
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
              <Calendar className="absolute right-4 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Start Time
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                />
                <Clock className="absolute right-4 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                End Time
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                />
                <Clock className="absolute right-4 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Production Equipment & Crew Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Crew of 6, bringing 3x Aputure 600d lights and cinema dolly..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>Duration</span>
              <span className="font-semibold">{hours > 0 ? `${hours} hours` : '0 hours'}</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>Studio Rental ({hours} hrs × ${studio.hourlyRate})</span>
              <span className="font-semibold">${subtotal}</span>
            </div>
            {deposit > 0 && (
              <div className="flex justify-between text-slate-700 dark:text-slate-300">
                <span>Refundable Security Deposit</span>
                <span className="font-semibold">${deposit}</span>
              </div>
            )}
            <div className="pt-2 border-t border-amber-500/20 flex justify-between text-sm sm:text-base font-extrabold text-slate-950 dark:text-white">
              <span>Total Estimated Investment</span>
              <span className="text-amber-600 dark:text-amber-400">${grandTotal}</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || hours <= 0}
              className="px-7 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-sm font-bold shadow-lg shadow-amber-500/25 transition-all disabled:opacity-50 active:scale-95 flex items-center gap-2"
            >
              {loading ? (
                <span>Checking Collisions...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Request Booking Now</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
