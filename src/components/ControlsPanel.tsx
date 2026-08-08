'use client';

import React from 'react';
import { ZoomIn, ZoomOut, RotateCw, Move, Sliders, RefreshCw, Sun, Wand2 } from 'lucide-react';
import { PhotoTransform } from '@/lib/canvasUtils';

interface ControlsPanelProps {
  transform: PhotoTransform;
  onChange: (newTransform: PhotoTransform) => void;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({ transform, onChange }) => {
  const update = (patch: Partial<PhotoTransform>) => {
    onChange({ ...transform, ...patch });
  };

  const rotatePhoto = () => {
    const nextRot = (transform.rotation + 90) % 360;
    update({ rotation: nextRot });
  };

  const resetAll = () => {
    onChange({
      zoom: 1.0,
      panX: 0,
      panY: 0,
      rotation: 0,
      filter: 'none',
    });
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-goa-dark/70 p-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-goa-gold">
          <Sliders className="h-4 w-4 text-goa-pink" />
          <span>Photo Adjustment Controls</span>
        </div>
        <button
          onClick={resetAll}
          className="flex items-center gap-1 text-xs font-semibold text-goa-cream/70 hover:text-white"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>

      {/* Sliders: Zoom & Position */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Zoom Slider */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs font-medium text-goa-cream">
            <span className="flex items-center gap-1"><ZoomIn className="h-3.5 w-3.5 text-goa-gold" /> Zoom</span>
            <span className="font-mono text-goa-gold">{transform.zoom.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.05"
            value={transform.zoom}
            onChange={(e) => update({ zoom: parseFloat(e.target.value) })}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-goa-deep accent-goa-gold"
          />
        </div>

        {/* Rotation Button */}
        <div className="flex items-end">
          <button
            onClick={rotatePhoto}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-goa-mint/30 bg-goa-deep/80 px-3 py-2 text-xs font-bold text-white transition hover:bg-goa-emerald hover:border-goa-mint"
          >
            <RotateCw className="h-4 w-4 text-goa-mint" />
            <span>Rotate ({transform.rotation}°)</span>
          </button>
        </div>
      </div>

      {/* Pan Controls (Pan X & Pan Y) */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs font-medium text-goa-cream">
            <span className="flex items-center gap-1"><Move className="h-3.5 w-3.5 text-goa-pink" /> Pan X</span>
            <span className="font-mono text-goa-pink">{transform.panX}px</span>
          </div>
          <input
            type="range"
            min="-300"
            max="300"
            step="5"
            value={transform.panX}
            onChange={(e) => update({ panX: parseInt(e.target.value) })}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-goa-deep accent-goa-pink"
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs font-medium text-goa-cream">
            <span className="flex items-center gap-1"><Move className="h-3.5 w-3.5 text-goa-pink rotate-90" /> Pan Y</span>
            <span className="font-mono text-goa-pink">{transform.panY}px</span>
          </div>
          <input
            type="range"
            min="-300"
            max="300"
            step="5"
            value={transform.panY}
            onChange={(e) => update({ panY: parseInt(e.target.value) })}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-goa-deep accent-goa-pink"
          />
        </div>
      </div>

      {/* Filter Presets */}
      <div className="flex flex-col gap-2 pt-1 border-t border-white/10">
        <div className="flex items-center gap-1.5 text-xs font-bold text-goa-cream">
          <Wand2 className="h-3.5 w-3.5 text-goa-gold" />
          <span>Goa Photo Filter Presets</span>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {[
            { id: 'none', label: 'Normal' },
            { id: 'vibrant', label: 'Vibrant' },
            { id: 'sunset', label: 'Sunset' },
            { id: 'cyber', label: 'Cyber' },
            { id: 'bw', label: 'B&W' },
          ].map((flt) => (
            <button
              key={flt.id}
              onClick={() => update({ filter: flt.id as PhotoTransform['filter'] })}
              className={`rounded-lg py-1.5 text-[11px] font-bold transition ${
                transform.filter === flt.id
                  ? 'bg-gradient-to-r from-goa-pink to-goa-gold text-white shadow-md'
                  : 'bg-white/5 text-goa-cream/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              {flt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
