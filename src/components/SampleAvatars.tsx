'use client';

import React from 'react';
import { User, Sparkles } from 'lucide-react';

interface SampleAvatarsProps {
  onSelectSample: (dataUrl: string) => void;
}

// Inline SVG avatars so they render offline and instantly without external image network dependencies
const SAMPLES = [
  {
    name: 'Atul (Builder)',
    role: 'Fullstack Alchemist',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#023a2a"/>
          <stop offset="100%" stop-color="#08694b"/>
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#bg1)"/>
      <circle cx="200" cy="150" r="75" fill="#f59e0b"/>
      <path d="M 120 380 Q 200 240 280 380 Z" fill="#ff1e79"/>
      <circle cx="175" cy="140" r="10" fill="#011c14"/>
      <circle cx="225" cy="140" r="10" fill="#011c14"/>
      <path d="M 170 175 Q 200 205 230 175" stroke="#011c14" stroke-width="8" stroke-linecap="round" fill="none"/>
      <text x="200" y="320" font-family="sans-serif" font-weight="900" font-size="28" fill="#ffffff" text-anchor="middle">ATUL</text>
    </svg>`,
  },
  {
    name: 'Dev Nomad',
    role: 'AI Engineer',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <linearGradient id="bg2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ff1e79"/>
          <stop offset="100%" stop-color="#ffc700"/>
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#bg2)"/>
      <circle cx="200" cy="150" r="80" fill="#fefae0"/>
      <path d="M 100 390 Q 200 230 300 390 Z" fill="#012b1e"/>
      <circle cx="170" cy="140" r="12" fill="#044f37"/>
      <circle cx="230" cy="140" r="12" fill="#044f37"/>
      <path d="M 165 180 Q 200 210 235 180" stroke="#044f37" stroke-width="8" stroke-linecap="round" fill="none"/>
      <text x="200" y="330" font-family="sans-serif" font-weight="900" font-size="28" fill="#ffc700" text-anchor="middle">SOLANA HACKER</text>
    </svg>`,
  },
  {
    name: 'Goa Shipper',
    role: 'Rust Whisperer',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
      <defs>
        <linearGradient id="bg3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#0284c7"/>
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#bg3)"/>
      <circle cx="200" cy="145" r="70" fill="#fcd34d"/>
      <path d="M 110 380 Q 200 250 290 380 Z" fill="#e11d48"/>
      <circle cx="175" cy="135" r="9" fill="#0f172a"/>
      <circle cx="225" cy="135" r="9" fill="#0f172a"/>
      <path d="M 175 170 Q 200 190 225 170" stroke="#0f172a" stroke-width="6" stroke-linecap="round" fill="none"/>
      <text x="200" y="320" font-family="sans-serif" font-weight="900" font-size="28" fill="#ffffff" text-anchor="middle">RUST NOMAD</text>
    </svg>`,
  },
];

export const SampleAvatars: React.FC<SampleAvatarsProps> = ({ onSelectSample }) => {
  const handleSelect = (svgString: string) => {
    const encoded = 'data:image/svg+xml;utf8,' + encodeURIComponent(svgString);
    onSelectSample(encoded);
  };

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-goa-mint/20 bg-goa-deep/50 p-4">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-goa-gold">
        <Sparkles className="h-4 w-4" />
        <span>Or Try Demo Avatar (1-Click Test)</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {SAMPLES.map((sample, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(sample.svg)}
            className="group flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-goa-dark/60 p-2 transition hover:scale-105 hover:border-goa-gold hover:bg-goa-dark"
          >
            <div
              className="h-14 w-14 overflow-hidden rounded-full border-2 border-goa-gold/60 shadow-md group-hover:border-goa-pink"
              dangerouslySetInnerHTML={{ __html: sample.svg }}
            />
            <span className="text-[11px] font-bold text-white group-hover:text-goa-gold">{sample.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
