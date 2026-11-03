'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Aperture, Instagram, Youtube, Linkedin, Github, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }
    toast.success('Thank you for subscribing to StudioSpace insider creator dispatch!');
    setEmail('');
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Branding & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Aperture className="w-5 h-5 text-slate-950" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Studio<span className="text-amber-500">Space</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              StudioSpace is a high-performance peer-to-peer marketplace designed for creators, filmmakers, photographers, podcasters, and musicians. Discover, inspect dynamic availability, and reserve turnkey production studios with complete booking transparency.
            </p>
            <div className="pt-2 flex items-center gap-3">
              {/* Modern X Logo (strictly NOT the old bird) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow us on X"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-slate-800"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-slate-800"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-slate-800"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-slate-800"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors border border-slate-800"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Explore & Book
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/studios" className="hover:text-amber-400 transition-colors">
                  All Production Studios
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-amber-400 transition-colors">
                  How Booking Works
                </Link>
              </li>
              <li>
                <Link href="/add-studio" className="hover:text-amber-400 transition-colors">
                  Host Your Creative Space
                </Link>
              </li>
              <li>
                <Link href="/my-bookings" className="hover:text-amber-400 transition-colors">
                  Manage Reservations
                </Link>
              </li>
              <li>
                <Link href="/#about-us" className="hover:text-amber-400 transition-colors">
                  Host Protection Guarantee
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Popular Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/studios?category=Photo+Studios" className="hover:text-amber-400 transition-colors">
                  Photo Cyclorama Studios
                </Link>
              </li>
              <li>
                <Link href="/studios?category=Sound+Stages" className="hover:text-amber-400 transition-colors">
                  Cinema Sound Stages
                </Link>
              </li>
              <li>
                <Link href="/studios?category=Podcast+Rooms" className="hover:text-amber-400 transition-colors">
                  Podcast & Stream Lounges
                </Link>
              </li>
              <li>
                <Link href="/studios?category=Music+Suites" className="hover:text-amber-400 transition-colors">
                  Music Recording Suites
                </Link>
              </li>
              <li>
                <Link href="/studios?category=Art+Workshops" className="hover:text-amber-400 transition-colors">
                  Fine Art & Ceramic Workshops
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Creator Dispatch
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Receive weekly curated studio releases, stage discounts, and production equipment guides.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="creator@production.com"
                  className="w-full px-3 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg flex items-center justify-center transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[11px] text-slate-500 block">
                Zero spam. Instant unsubscribe anytime.
              </span>
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} StudioSpace Marketplace Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#liability" className="hover:text-slate-400 transition-colors">Host Liability Shield</a>
            <a href="#safety" className="hover:text-slate-400 transition-colors">Studio Safety Standards</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
