'use client';

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { PhotoTransform, renderFormatAPFP, loadImage, downloadCanvasAsPNG } from '@/lib/canvasUtils';

export interface PFPCanvasRef {
  download: (filename?: string) => void;
  getCanvas: () => HTMLCanvasElement | null;
}

interface PFPCanvasProps {
  photoUrl: string | null;
  transform: PhotoTransform;
  frameStyle: 'tropical' | 'stamp' | 'gold' | 'neon';
  badgeText: string;
  onCanvasRendered?: (dataUrl: string) => void;
}

export const PFPCanvas = forwardRef<PFPCanvasRef, PFPCanvasProps>(({
  photoUrl,
  transform,
  frameStyle,
  badgeText,
  onCanvasRendered,
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useImperativeHandle(ref, () => ({
    download: (filename?: string) => {
      if (canvasRef.current) {
        const name = filename || `HHGoa2026-PFP`;
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
          console.error('Failed loading PFP image:', e);
        }
      }

      if (isSubscribed && canvasRef.current) {
        await renderFormatAPFP(canvasRef.current, photoImg, transform, frameStyle, badgeText);
        if (onCanvasRendered) {
          onCanvasRendered(canvasRef.current.toDataURL('image/png'));
        }
      }
    }

    draw();

    return () => {
      isSubscribed = false;
    };
  }, [photoUrl, transform, frameStyle, badgeText, onCanvasRendered]);

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-goa-gold/40 bg-goa-dark shadow-2xl glow-gold p-2">
      <canvas
        ref={canvasRef}
        className="h-auto w-full max-w-[440px] rounded-2xl object-contain shadow-xl"
      />
    </div>
  );
});

PFPCanvas.displayName = 'PFPCanvas';
