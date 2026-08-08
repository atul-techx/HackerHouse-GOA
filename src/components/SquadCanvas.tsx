'use client';

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Teammate, renderFormatCSquad, downloadCanvasAsPNG } from '@/lib/canvasUtils';

export interface SquadCanvasRef {
  download: (filename?: string) => void;
  getCanvas: () => HTMLCanvasElement | null;
}

interface SquadCanvasProps {
  teammates: Teammate[];
  teamName: string;
  onCanvasRendered?: (dataUrl: string) => void;
}

export const SquadCanvas = forwardRef<SquadCanvasRef, SquadCanvasProps>(({
  teammates,
  teamName,
  onCanvasRendered,
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useImperativeHandle(ref, () => ({
    download: (filename?: string) => {
      if (canvasRef.current) {
        const name = filename || `HHGoa2026-Squad-${teamName.replace(/\s+/g, '_')}`;
        downloadCanvasAsPNG(canvasRef.current, name);
      }
    },
    getCanvas: () => canvasRef.current,
  }));

  useEffect(() => {
    let isSubscribed = true;

    async function draw() {
      if (!canvasRef.current) return;

      if (isSubscribed && canvasRef.current) {
        await renderFormatCSquad(canvasRef.current, teammates, teamName);
        if (onCanvasRendered) {
          onCanvasRendered(canvasRef.current.toDataURL('image/png'));
        }
      }
    }

    draw();

    return () => {
      isSubscribed = false;
    };
  }, [teammates, teamName, onCanvasRendered]);

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-goa-gold/40 bg-goa-dark shadow-2xl glow-gold p-2">
      <canvas
        ref={canvasRef}
        className="h-auto w-full max-w-[540px] rounded-2xl object-contain shadow-xl"
      />
    </div>
  );
});

SquadCanvas.displayName = 'SquadCanvas';
