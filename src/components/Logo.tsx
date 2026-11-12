'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showTagline = true, className = '' }: LogoProps) {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      <div className={`relative ${iconSizes[size]} rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-[2px] shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 group-hover:scale-105 transition-all duration-300`}>
        <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-amber-500/10" />

          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-amber-400 fill-none stroke-current stroke-[1.8] group-hover:rotate-45 transition-transform duration-700 ease-out"
          >
            <circle cx="12" cy="12" r="9" className="stroke-amber-500/40" />
            <path d="m14.31 8 5.74 9.94" strokeLinecap="round" />
            <path d="M9.69 8h11.48" strokeLinecap="round" />
            <path d="m7.38 12 5.74-9.94" strokeLinecap="round" />
            <path d="M9.69 16 3.95 6.06" strokeLinecap="round" />
            <path d="M14.31 16H2.83" strokeLinecap="round" />
            <path d="m16.62 12-5.74 9.94" strokeLinecap="round" />
            <circle cx="12" cy="12" r="2.5" className="fill-amber-400 stroke-none" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col">
        <div className={`font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center ${textSizes[size]}`}>
          <span>Studio</span>
          <span className="text-amber-500 ml-0.5">Space</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 ml-1 animate-pulse" />
        </div>
        {showTagline && (
          <span className="text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold text-slate-500 dark:text-slate-400 -mt-0.5">
            Production & Workspace
          </span>
        )}
      </div>
    </div>
  );
}
