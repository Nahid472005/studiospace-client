import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-[16/10] w-full bg-slate-200 dark:bg-slate-800" />
      
      {/* Content Skeleton */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-3">
          <div className="h-3 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-full" />
          <div className="h-5 w-4/5 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full" />
          <div className="h-3 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-full" />
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
