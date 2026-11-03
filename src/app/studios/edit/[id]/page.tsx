'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { apiRequest } from '@/lib/api';
import { toast } from 'sonner';
import {
  Edit3,
  DollarSign,
  MapPin,
  Image as ImageIcon,
  CheckSquare,
  ShieldCheck,
  ArrowRight,
  UploadCloud,
  ArrowLeft
} from 'lucide-react';

const availableCategories = [
  'Photo Studios',
  'Sound Stages',
  'Podcast Rooms',
  'Music Suites',
  'Art Workshops'
];

const standardAmenities = [
  'Infinity Cyclorama Wall',
  'Profoto / Aputure Lighting Grid',
  'Full Soundproofing (STC 65)',
  'High-Speed Wi-Fi (1Gbps)',
  'Hair, Makeup & Styling Station',
  'Client Lounge & Green Room',
  'Drive-in Roll-up Loading Door',
  'Silent Dual-Zone HVAC Control',
  'Acoustic Vocal Booth',
  'Podcast Microphones & Switcher'
];

export default function EditStudioPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(availableCategories[0]);
  const [hourlyRate, setHourlyRate] = useState('');
  const [securityDeposit, setSecurityDeposit] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('10');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [overview, setOverview] = useState('');
  const [hostEmail, setHostEmail] = useState('');
  const [hostName, setHostName] = useState('');

  const [fetching, setFetching] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Private Route Check
  useEffect(() => {
    if (!authLoading && !user) {
      toast.info('Please sign in to edit listings.');
      router.push(`/login?redirect=/studios/edit/${id}`);
    }
  }, [user, authLoading, router, id]);

  // Load existing studio data
  useEffect(() => {
    async function fetchStudioData() {
      try {
        const data = await apiRequest(`/studios/${id}`);
        if (data.success && data.studio) {
          const s = data.studio;
          setTitle(s.title || '');
          setCategory(s.category || availableCategories[0]);
          setHourlyRate(String(s.hourlyRate || ''));
          setSecurityDeposit(String(s.securityDeposit || '0'));
          setMaxCapacity(String(s.maxCapacity || '10'));
          setLocation(s.location || '');
          setImageUrl(s.image || (s.images && s.images[0]) || '');
          setSelectedAmenities(s.amenities || []);
          setOverview(s.overview || '');
          setHostEmail(s.hostEmail || '');
          setHostName(s.hostName || '');
        }
      } catch (err: any) {
        toast.error(err.message || 'Failed to fetch studio listing data.');
      } finally {
        setFetching(false);
      }
    }

    if (id) {
      fetchStudioData();
    }
  }, [id]);

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch('https://api.imgbb.com/1/upload?key=6d207e02198a847aa5ad0a9a6f90e482', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.data?.url) {
        setImageUrl(data.data.url);
        toast.success('Studio image updated via ImgBB!');
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrl(reader.result as string);
          toast.success('Image loaded successfully.');
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      toast.error('Image upload failed. You can paste an image URL directly.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !hourlyRate || !location || !overview) {
      toast.error('Please fill in all mandatory fields.');
      return;
    }

    setUpdating(true);
    try {
      const payload = {
        title,
        category,
        hourlyRate: Number(hourlyRate),
        securityDeposit: Number(securityDeposit || 0),
        maxCapacity: Number(maxCapacity || 10),
        location,
        image: imageUrl,
        images: [imageUrl],
        amenities: selectedAmenities,
        overview,
      };

      const data = await apiRequest(`/studios/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      if (data.success) {
        toast.success('Studio listing updated successfully in MongoDB!');
        router.push('/my-listings');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to update studio.');
    } finally {
      setUpdating(false);
    }
  };

  if (authLoading || fetching) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-pulse">
        <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg mx-auto mb-4" />
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      
      {/* Top Back Link & Header */}
      <div className="space-y-3">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to My Listings</span>
        </button>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
            Edit Workspace
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
            Update Studio Listing
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Make adjustments to rates, amenities, equipment, or visual photography.
          </p>
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
        
        {/* Read-Only Host Information */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Host (Read-Only)</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{hostName || user?.name}</p>
            <p className="text-xs text-slate-500">{hostEmail || user?.email}</p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Listing Host</span>
          </div>
        </div>

        {/* Studio Specs */}
        <div className="space-y-5">
          <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Specifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Studio Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
              >
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Max Capacity
              </label>
              <input
                type="number"
                min="1"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Hourly Rate ($ USD) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  min="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Security Deposit ($ USD)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  min="0"
                  value={securityDeposit}
                  onChange={(e) => setSecurityDeposit(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Physical Location *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Visuals */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Studio Visuals
          </h3>
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <ImageIcon className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <label className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer transition-colors shrink-0">
                <UploadCloud className="w-4 h-4 text-amber-500" />
                <span>{uploadingImage ? 'Uploading...' : 'Replace File'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>
            </div>

            {imageUrl && (
              <div className="mt-3 relative w-full h-48 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                <img src={imageUrl} alt="Studio Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Amenities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {standardAmenities.map((amenity) => {
              const checked = selectedAmenities.includes(amenity);
              return (
                <button
                  type="button"
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium text-left transition-all ${
                    checked
                      ? 'border-amber-500/80 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                      checked
                        ? 'bg-amber-500 border-amber-500 text-slate-950'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {checked && <CheckSquare className="w-3.5 h-3.5" />}
                  </div>
                  <span>{amenity}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Overview */}
        <div className="space-y-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            Overview
          </h3>
          <textarea
            rows={5}
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push('/my-listings')}
            disabled={updating}
            className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updating}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
          >
            {updating ? 'Saving Changes...' : 'Save & Update Studio'}
          </button>
        </div>

      </form>

    </div>
  );
}
