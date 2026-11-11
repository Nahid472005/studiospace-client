'use client';

import React from 'react';
import { Aperture } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 animate-ping absolute" />
        <div className="w-16 h-16 rounded-2xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
          <Aperture className="w-9 h-9 text-slate-950 animate-[spin_3s_linear_infinite]" />
        </div>
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">
          Studio<span className="text-amber-500">Space</span>
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Calibrating studio acoustics and availability...
        </p>
      </div>
    </div>
  );
}
