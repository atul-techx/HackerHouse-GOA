'use client';

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { PhotoTransform, FormatBData, renderFormatBBadge, loadImage, downloadCanvasAsPNG } from '@/lib/canvasUtils';

export interface BadgeCanvasRef {
  download: (filename?: string) => void;
  getCanvas: () => HTMLCanvasElement | null;
}

interface BadgeCanvasProps {
  photoUrl: string | null;
  transform: PhotoTransform;
  data: FormatBData;
  onCanvasRendered?: (dataUrl: string) => void;
}

export const BadgeCanvas = forwardRef<BadgeCanvasRef, BadgeCanvasProps>(({
  photoUrl,
  transform,
  data,
  onCanvasRendered,
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useImperativeHandle(ref, () => ({
    download: (filename?: string) => {
      if (canvasRef.current) {
        const name = filename || `HHGoa2026-Badge-${(data.name || 'Builder').replace(/\s+/g, '_')}`;
        downloadCanvasAsPNG(canvasRef.current, name);
      }
    },
    getCanvas: () => canvasRef.current,
  }));

  useEffect(() => {
    let isSubscribed = true;

    async function draw() {
      if (!canvasRef.current) return;
      let photoImg: HTMLImageElement | null = null;
      if (photoUrl) {
        try {
          photoImg = await loadImage(photoUrl);
        } catch (e) {
          console.error('Failed loading Badge image:', e);
        }
      }

      if (isSubscribed && canvasRef.current) {
        await renderFormatBBadge(canvasRef.current, photoImg, transform, data);
        if (onCanvasRendered) {
          onCanvasRendered(canvasRef.current.toDataURL('image/png'));
        }
      }
    }

    draw();

    return () => {
      isSubscribed = false;
    };
  }, [photoUrl, transform, data, onCanvasRendered]);

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-goa-gold/40 bg-goa-dark shadow-2xl glow-gold p-2">
      <canvas
        ref={canvasRef}
        className="h-auto w-full max-w-[420px] rounded-2xl object-contain shadow-xl"
      />
    </div>
  );
});

BadgeCanvas.displayName = 'BadgeCanvas';
