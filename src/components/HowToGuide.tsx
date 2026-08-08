'use client';

import React from 'react';
import { HelpCircle, CheckCircle2, AlertTriangle, ExternalLink, Calendar, X } from 'lucide-react';

interface HowToGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToGuide: React.FC<HowToGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-3xl border border-goa-mint/40 bg-goa-dark/95 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-goa-cream hover:bg-white/20 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-goa-gold text-goa-dark font-extrabold text-lg">
            🌴
          </div>
          <div>
            <h3 className="font-heading text-xl font-black text-white">
              HH Goa 2026 Shortlisting Instructions
            </h3>
            <p className="text-xs font-semibold text-goa-gold">
              Complete flow from Generator to Live Submission
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="my-5 flex flex-col gap-3">
          <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-goa-deep/60 p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-goa-pink font-mono text-xs font-extrabold text-white">
              1
            </span>
            <div>
              <h4 className="text-xs font-extrabold text-white">Generate Graphic</h4>
              <p className="text-xs text-goa-cream/80">
                Upload your photo (JPG, PNG, HEIC from iPhone), pick Format A (PFP Overlay) or Format B (Builder ID Badge), customize your builder class and stack.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-goa-deep/60 p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-goa-gold font-mono text-xs font-extrabold text-goa-dark">
              2
            </span>
            <div>
              <h4 className="text-xs font-extrabold text-white">Download & Share to X</h4>
              <p className="text-xs text-goa-cream/80">
                Hit <span className="font-bold text-sky-400">Share to X</span> to launch Twitter with pre-filled caption. Download the graphic and attach it to your post.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-400" />
            <div>
              <h4 className="text-xs font-extrabold text-amber-300">Mandatory Rule</h4>
              <p className="text-xs text-amber-100">
                Your X post <span className="underline font-bold">MUST contain the hashtag #FrameInGoa</span>. Submissions without this hashtag will be flagged as an error!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-goa-deep/60 p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-goa-mint font-mono text-xs font-extrabold text-white">
              3
            </span>
            <div>
              <h4 className="text-xs font-extrabold text-white">Submit to Google Form</h4>
              <p className="text-xs text-goa-cream/80">
                Fill the form before <span className="font-bold text-goa-gold">11:59 pm, 13th August 2026</span>. One submission per team only!
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-2 border-t border-white/10">
          <div className="flex items-center gap-1.5 text-xs text-goa-cream/70">
            <Calendar className="h-4 w-4 text-goa-gold" />
            <span>Deadline: 13th August 2026</span>
          </div>

          <a
            href="https://forms.gle/jM5hTaGvsrfEfixPA"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl bg-goa-gold px-4 py-2 text-xs font-black text-goa-dark hover:bg-yellow-300 transition"
          >
            <span>Google Form Link</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
