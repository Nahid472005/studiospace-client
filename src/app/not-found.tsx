'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, Film, ArrowLeft, Home, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl animate-pulse" />
          <div className="relative w-32 h-32 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-2xl">
            <Film className="w-16 h-16 text-amber-500 animate-[spin_10s_linear_infinite]" />
            <Camera className="w-8 h-8 text-white absolute" />
          </div>
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-500 border border-amber-500/30">
            Error 404 • Scene Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Stage Out of Frame
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
            The studio set, recording suite, or creative workspace you are attempting to scout does not exist or has wrapped production.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/studios"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span>Explore All Studios</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
