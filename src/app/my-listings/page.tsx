'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Studio } from '@/components/StudioCard';
import ConfirmationModal from '@/components/ConfirmationModal';
import { apiRequest } from '@/lib/api';
import { toast } from 'sonner';
import {
  Building2,
  PlusCircle,
  Edit3,
  Trash2,
  ExternalLink,
  MapPin,
  DollarSign,
  Users,
  ShieldCheck,
  Star,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function MyListingsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [studios, setStudios] = useState<Studio[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [selectedStudioToDelete, setSelectedStudioToDelete] = useState<Studio | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Private Route Protection
  useEffect(() => {
    if (!loading && !user) {
      toast.info('Please sign in to view your studio listings.');
      router.push('/login?redirect=/my-listings');
    }
  }, [user, loading, router]);

  const loadUserStudios = async () => {
    if (!user) return;
    setFetchLoading(true);
    try {
      const data = await apiRequest(`/studios/user/${encodeURIComponent(user.email)}`);
      if (data.success && data.studios) {
        setStudios(data.studios);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to load your studio listings.');
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadUserStudios();
    }
  }, [user]);

  const handleOpenDeleteModal = (studio: Studio) => {
    setSelectedStudioToDelete(studio);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedStudioToDelete) return;
    setDeleting(true);

    try {
      const data = await apiRequest(`/studios/${selectedStudioToDelete._id}`, {
        method: 'DELETE',
      });

      if (data.success) {
        toast.success('Studio listing has been permanently removed.');
        setStudios(studios.filter((s) => s._id !== selectedStudioToDelete._id));
        setDeleteModalOpen(false);
        setSelectedStudioToDelete(null);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete studio listing.');
    } finally {
      setDeleting(false);
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
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
            Host Workspace Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
            My Studio Listings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your active production spaces, modify pricing rates, or remove studio listings.
          </p>
        </div>

        <Link
          href="/add-studio"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 transition-all shrink-0 active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Studio</span>
        </Link>
      </div>

      {/* Content: Shadcn UI Table */}
      {fetchLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-16 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          ))}
        </div>
      ) : studios.length > 0 ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              {/* Shadcn thead */}
              <thead className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <tr>
                  <th scope="col" className="h-12 px-5 font-semibold">Studio Space</th>
                  <th scope="col" className="h-12 px-4 font-semibold">Category</th>
                  <th scope="col" className="h-12 px-4 font-semibold">Hourly Rate</th>
                  <th scope="col" className="h-12 px-4 font-semibold">Deposit</th>
                  <th scope="col" className="h-12 px-4 font-semibold">Max Capacity</th>
                  <th scope="col" className="h-12 px-4 font-semibold">Location</th>
                  <th scope="col" className="h-12 px-5 font-semibold text-right">Actions</th>
                </tr>
              </thead>

              {/* Shadcn tbody */}
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {studios.map((studio) => {
                  const displayImg =
                    studio.image ||
                    (studio.images && studio.images[0]) ||
                    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80';

                  return (
                    <tr
                      key={studio._id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Studio Title & Thumb */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={displayImg}
                            alt={studio.title}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700"
                          />
                          <div className="max-w-xs">
                            <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">
                              {studio.title}
                            </h4>
                            <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold mt-0.5">
                              <Star className="w-3 h-3 fill-current" />
                              <span>{studio.rating ? studio.rating.toFixed(2) : '4.95'}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          {studio.category}
                        </span>
                      </td>

                      {/* Rate */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="font-extrabold text-slate-900 dark:text-white">
                          ${studio.hourlyRate}
                        </span>
                        <span className="text-xs text-slate-400"> / hr</span>
                      </td>

                      {/* Security Deposit */}
                      <td className="px-4 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">
                        ${studio.securityDeposit || 0}
                      </td>

                      {/* Capacity */}
                      <td className="px-4 py-4 whitespace-nowrap text-slate-600 dark:text-slate-300">
                        {studio.maxCapacity || 10} creators
                      </td>

                      {/* Location */}
                      <td className="px-4 py-4 whitespace-nowrap text-slate-500 dark:text-slate-400 max-w-[180px] truncate">
                        <div className="flex items-center gap-1 truncate">
                          <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="truncate">{studio.location}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/studios/${studio._id}`}
                            target="_blank"
                            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Preview Public Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          <Link
                            href={`/studios/edit/${studio._id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-xs font-semibold transition-colors"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </Link>

                          <button
                            onClick={() => handleOpenDeleteModal(studio)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="p-16 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <Building2 className="w-14 h-14 text-amber-500/80 mx-auto" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            You haven't listed any studio spaces yet
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Share your photography cyc wall, film sound stage, podcast room, or music suite with hundreds of local creators.
          </p>
          <div className="pt-2">
            <Link
              href="/add-studio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Your First Studio</span>
            </Link>
          </div>
        </div>
      )}

      {/* Confirmation Modal Dialog for Delete */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        title="Delete Studio Listing"
        message={`Are you sure you want to permanently delete "${selectedStudioToDelete?.title}"? This action cannot be reversed and will cancel all active public bookings.`}
        confirmText="Yes, Delete Studio"
        cancelText="Keep Listing"
        isDestructive={true}
        isLoading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setSelectedStudioToDelete(null);
        }}
      />

    </div>
  );
}
