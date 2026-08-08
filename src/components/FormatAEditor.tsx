'use client';

import React, { useRef } from 'react';
import { Upload, Sparkles, Image as ImageIcon, ShieldCheck } from 'lucide-react';
import { processUploadedFile } from '@/lib/heicHelper';
import { SampleAvatars } from './SampleAvatars';

interface FormatAEditorProps {
  onPhotoSelected: (dataUrl: string) => void;
  frameStyle: 'tropical' | 'stamp' | 'gold' | 'neon';
  setFrameStyle: (style: 'tropical' | 'stamp' | 'gold' | 'neon') => void;
  badgeText: string;
  setBadgeText: (text: string) => void;
  hasPhoto: boolean;
}

export const FormatAEditor: React.FC<FormatAEditorProps> = ({
  onPhotoSelected,
  frameStyle,
  setFrameStyle,
  badgeText,
  setBadgeText,
  hasPhoto,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const dataUrl = await processUploadedFile(e.target.files[0]);
        onPhotoSelected(dataUrl);
      } catch (err) {
        console.error('File reading failed:', err);
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      
      {/* Upload Box */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-goa-gold">
          1. Upload Photo (JPG, PNG, HEIC iPhone format)
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition ${
            hasPhoto
              ? 'border-goa-mint/50 bg-goa-deep/30 hover:border-goa-mint'
              : 'border-goa-gold/50 bg-goa-dark/60 hover:border-goa-pink hover:bg-goa-dark/80'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp, image/heic, image/heif"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-goa-pink to-goa-gold p-0.5 shadow-lg group-hover:scale-110 transition">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-goa-dark">
              <Upload className="h-6 w-6 text-goa-gold group-hover:text-goa-pink" />
            </div>
          </div>
          <p className="mt-3 text-sm font-bold text-white">
            {hasPhoto ? 'Change Selected Photo' : 'Click to Upload Your Photo'}
          </p>
          <p className="mt-1 text-xs text-goa-cream/60">
            Supports portrait, landscape, off-center crops & iPhone HEIC
          </p>
        </div>
      </div>

      {/* Demo Avatar Preset (if user hasn't uploaded yet) */}
      {!hasPhoto && <SampleAvatars onSelectSample={onPhotoSelected} />}

      {/* Frame Style Picker */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-goa-gold">
          2. Choose PFP Frame Style
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { id: 'tropical', label: '🌴 Tropical Palm', desc: 'Goa Signature Gold' },
            { id: 'stamp', label: '📮 Postage Stamp', desc: 'Vintage Stamp Scallop' },
            { id: 'gold', label: '🌟 Golden Sunset', desc: 'Sunburst Ring' },
            { id: 'neon', label: '⚡ Cyber Glow', desc: 'Goa Pink Glow' },
          ].map((style) => (
            <button
              key={style.id}
              onClick={() => setFrameStyle(style.id as any)}
              className={`flex flex-col items-center gap-1 rounded-xl border p-3 text-center transition ${
                frameStyle === style.id
                  ? 'border-goa-gold bg-gradient-to-b from-goa-emerald to-goa-deep text-white shadow-lg glow-gold'
                  : 'border-white/10 bg-goa-dark/60 text-goa-cream/80 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-sm font-extrabold">{style.label}</span>
              <span className="text-[10px] text-goa-cream/60">{style.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Sticker Tag */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-goa-gold">
          3. Custom Corner Badge Sticker
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={badgeText}
            onChange={(e) => setBadgeText(e.target.value)}
            placeholder="e.g. BUILDER, SHIPPER, SOLANA"
            maxLength={16}
            className="flex-1 rounded-xl border border-white/15 bg-goa-dark/80 px-4 py-2.5 text-sm font-bold text-white placeholder-goa-cream/40 focus:border-goa-gold focus:outline-none focus:ring-1 focus:ring-goa-gold"
          />
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {['BUILDER', 'SHIPPER', 'FULLSTACK', 'SOLANA', 'TOP 1%', 'MERN'].map((preset) => (
            <button
              key={preset}
              onClick={() => setBadgeText(preset)}
              className="rounded-lg bg-white/5 px-2.5 py-1 text-[11px] font-bold text-goa-cream/80 hover:bg-goa-pink/20 hover:text-goa-pink"
            >
              +{preset}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
