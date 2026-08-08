'use client';

import React from 'react';
import { Palmtree, Sparkles, ExternalLink, HelpCircle, Share2 } from 'lucide-react';

interface NavbarProps {
  onOpenGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenGuide }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-goa-mint/20 bg-goa-dark/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-goa-pink via-goa-gold to-emerald-400 p-0.5 shadow-lg shadow-goa-pink/30 hover:scale-105 transition">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#044f37] overflow-hidden p-0.5">
              <img src="/logo.png" alt="Hacker House Goa Logo" className="h-full w-full object-contain rounded-[8px]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-xl font-black tracking-tight text-white sm:text-2xl">
                HH GOA <span className="text-goa-gold">2026</span>
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-goa-pink/20 px-2.5 py-0.5 text-xs font-bold text-goa-pink border border-goa-pink/40">
                <Sparkles className="h-3 w-3" /> #FrameInGoa
              </span>
            </div>
            <p className="hidden text-xs font-medium text-goa-cream/70 sm:block">
              Build in Goa, Ship from Paradise • Frame & Builder ID Generator
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-goa-cream transition hover:bg-white/10 hover:border-goa-gold/40 sm:text-sm"
          >
            <HelpCircle className="h-4 w-4 text-goa-gold" />
            <span>Submission Guide</span>
          </button>

          <a
            href="https://forms.gle/jM5hTaGvsrfEfixPA"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-goa-pink to-goa-rose px-4 py-2 text-xs font-extrabold text-white shadow-md transition hover:opacity-90 hover:scale-105 active:scale-95 sm:text-sm"
          >
            <span>Submit Task Form</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

      </div>
    </header>
  );
};
