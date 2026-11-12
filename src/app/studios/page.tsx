'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import StudioCard, { Studio } from '@/components/StudioCard';
import SkeletonCard from '@/components/SkeletonCard';
import { apiRequest } from '@/lib/api';
import { Search, Filter, SlidersHorizontal, Building2, RotateCcw, Sparkles } from 'lucide-react';

function StudiosContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryParam = searchParams.get('category') || 'All';
  const queryParam = searchParams.get('search') || '';

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [sortBy, setSortBy] = useState('newest');

  const categories = [
    'All',
    'Photo Studios',
    'Sound Stages',
    'Podcast Rooms',
    'Music Suites',
    'Art Workshops',
  ];

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    async function fetchStudios() {
      setLoading(true);
      try {
        const queryArgs = new URLSearchParams();
        if (selectedCategory && selectedCategory !== 'All') {
          queryArgs.append('category', selectedCategory);
        }
        if (searchQuery.trim()) {
          queryArgs.append('search', searchQuery.trim());
        }
        if (sortBy) {
          queryArgs.append('sort', sortBy);
        }

        const data = await apiRequest(`/studios?${queryArgs.toString()}`);
        if (data.success && data.studios) {
          setStudios(data.studios);
        }
      } catch (err) {
        console.error('Fetch studios error:', err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      fetchStudios();
    }, 200);

    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, sortBy]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    const params = new URLSearchParams(window.location.search);
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    router.replace(`/studios?${params.toString()}`);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('newest');
    router.replace('/studios');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-500">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Production Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore Production Studios & Workspaces
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
          Discover verified photography cyc lofts, cinema sound stages, broadcast podcast suites, and recording rooms available for hourly rental.
        </p>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by studio name, location, or equipment (e.g. Cyc wall, Shure, SSL)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:border-amber-500 transition-colors appearance-none pr-8 cursor-pointer"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="rating">Sort: Top Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <SlidersHorizontal className="absolute right-3 top-3.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>

            {(selectedCategory !== 'All' || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
                title="Reset all filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <SkeletonCard key={n} />
          ))}
        </div>
      ) : studios.length > 0 ? (
        <div className="space-y-4">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Showing <span className="font-bold text-slate-900 dark:text-white">{studios.length}</span> creative studio spaces
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {studios.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        </div>
      ) : (
        <div className="p-16 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <Building2 className="w-14 h-14 text-amber-500/80 mx-auto" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            No studio spaces matched your criteria
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Try adjusting your search terms, changing the category filter, or resetting your search parameters.
          </p>
          <div className="pt-2">
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-semibold shadow transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All Filters
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default function StudiosPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(n => <SkeletonCard key={n} />)}
      </div>
    }>
      <StudiosContent />
    </Suspense>
  );
}
