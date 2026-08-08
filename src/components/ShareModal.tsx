'use client';

import React, { useState, useEffect } from 'react';
import { Share2, Download, Copy, Check, Twitter, ExternalLink, X as CloseIcon, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageDataUrl: string | null;
  onDownload: () => void;
  builderName: string;
  formatType: 'PFP' | 'BADGE' | 'SQUAD';
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  imageDataUrl,
  onDownload,
  builderName,
  formatType,
}) => {
  const [copiedText, setCopiedText] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);

  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffc700', '#ff1e79', '#10b981', '#ffffff'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://hhgoa2026.vercel.app';
  
  const tweetText = `Just created my official HH Goa 2026 ${formatType === 'BADGE' ? 'Builder ID Card' : 'Profile Frame'}! 🌴🚀\n\nBuild in Goa, ship from paradise. 💻✨\n\nGenerate your own #FrameInGoa graphic here:\n${currentUrl}\n\n#FrameInGoa`;

  const handleShareToTwitter = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(tweetText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCopyImageToClipboard = async () => {
    if (!imageDataUrl) return;
    try {
      const response = await fetch(imageDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);
      setCopiedImage(true);
      setTimeout(() => setCopiedImage(false), 2000);
    } catch (e) {
      console.warn('Clipboard image copy fallback to download:', e);
      onDownload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl border border-goa-gold/40 bg-goa-dark/95 p-6 shadow-2xl glow-gold">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-goa-cream hover:bg-white/20 hover:text-white"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-goa-pink to-goa-gold text-white font-extrabold text-lg">
            ✨
          </div>
          <div>
            <h3 className="font-heading text-xl font-black text-white">
              Graphic Generated! Ready for X
            </h3>
            <p className="text-xs font-semibold text-goa-cream/70">
              Download and post on X with hashtag <span className="text-goa-pink font-bold">#FrameInGoa</span>
            </p>
          </div>
        </div>

        {/* Image Preview Thumbnail */}
        {imageDataUrl && (
          <div className="my-4 flex justify-center overflow-hidden rounded-2xl border border-white/10 bg-goa-deep/50 p-2 max-h-56">
            <img
              src={imageDataUrl}
              alt="Generated Badge"
              className="max-h-52 object-contain rounded-xl shadow-lg"
            />
          </div>
        )}

        {/* X Post Pre-filled Caption Box */}
        <div className="mb-4 flex flex-col gap-1.5 rounded-xl border border-white/10 bg-goa-deep/70 p-3">
          <div className="flex items-center justify-between text-xs font-bold text-goa-gold">
            <span className="flex items-center gap-1.5">
              <Twitter className="h-3.5 w-3.5 text-sky-400" /> Pre-filled X Tweet Text
            </span>
            <button
              onClick={handleCopyCaption}
              className="flex items-center gap-1 text-[11px] font-bold text-goa-cream/80 hover:text-white"
            >
              {copiedText ? <Check className="h-3 w-3 text-goa-mint" /> : <Copy className="h-3 w-3" />}
              <span>{copiedText ? 'Copied!' : 'Copy Text'}</span>
            </button>
          </div>
          <p className="font-mono text-xs text-goa-cream/90 whitespace-pre-line leading-relaxed">
            {tweetText}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={handleShareToTwitter}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 py-3.5 text-sm font-black text-white shadow-lg transition hover:bg-sky-400 hover:scale-[1.02] active:scale-95"
          >
            <Twitter className="h-5 w-5 fill-current" />
            <span>Share to X (#FrameInGoa)</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onDownload}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-goa-pink to-goa-rose py-2.5 text-xs font-extrabold text-white shadow-md transition hover:opacity-90 active:scale-95"
            >
              <Download className="h-4 w-4" />
              <span>Download High-Res PNG</span>
            </button>

            <button
              onClick={handleCopyImageToClipboard}
              className="flex items-center justify-center gap-2 rounded-xl border border-goa-gold/40 bg-goa-gold/20 py-2.5 text-xs font-extrabold text-goa-gold transition hover:bg-goa-gold hover:text-goa-dark active:scale-95"
            >
              {copiedImage ? <CheckCircle2 className="h-4 w-4 text-goa-mint" /> : <Copy className="h-4 w-4" />}
              <span>{copiedImage ? 'Copied Image!' : 'Copy Image'}</span>
            </button>
          </div>
        </div>

        {/* Submission Notice Banner */}
        <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-center">
          <p className="text-[11px] font-semibold text-amber-200">
            ⚠️ <span className="font-bold">Important:</span> Ensure your X post includes hashtag <span className="font-bold text-goa-gold">#FrameInGoa</span> and submit your link to the form below!
          </p>
          <a
            href="https://forms.gle/jM5hTaGvsrfEfixPA"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-goa-gold underline hover:text-white"
          >
            <span>Open Google Form Submission Link</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

      </div>
    </div>
  );
};
