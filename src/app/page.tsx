'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { FormatAEditor } from '@/components/FormatAEditor';
import { FormatBEditor } from '@/components/FormatBEditor';
import { FormatCEditor } from '@/components/FormatCEditor';
import { ControlsPanel } from '@/components/ControlsPanel';
import { PFPCanvas, PFPCanvasRef } from '@/components/PFPCanvas';
import { BadgeCanvas, BadgeCanvasRef } from '@/components/BadgeCanvas';
import { SquadCanvas, SquadCanvasRef } from '@/components/SquadCanvas';
import { ShareModal } from '@/components/ShareModal';
import { HowToGuide } from '@/components/HowToGuide';
import { PhotoTransform, FormatBData, Teammate, downloadCanvasAsPNG } from '@/lib/canvasUtils';
import { generateRandomBuilderID } from '@/lib/builderClasses';
import { Share2, Download, Sparkles, Palmtree, Zap, CheckCircle2, Heart } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'A' | 'B' | 'C'>('B');

  // Photo & Canvas state
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [transform, setTransform] = useState<PhotoTransform>({
    zoom: 1.0,
    panX: 0,
    panY: 0,
    rotation: 0,
    filter: 'none',
  });

  // Format A state
  const [frameStyle, setFrameStyle] = useState<'tropical' | 'stamp' | 'gold' | 'neon'>('tropical');
  const [badgeText, setBadgeText] = useState<string>('BUILDER');

  // Format B state
  const [formatBData, setFormatBData] = useState<FormatBData>({
    name: 'ATUL GANGWAR',
    role: 'SOFTWARE DEVELOPER',
    builderClass: 'TERMINAL WIZARD',
    builderId: generateRandomBuilderID(),
    skills: 'PYTHON, JAVA, FRONTEND',
    teamVibes: 'BUILD • SHIP • REPEAT',
    venue: 'GOA, INDIA',
    date: '28 - 31 OCT 2026',
  });

  // Format C state
  const [teammates, setTeammates] = useState<Teammate[]>([
    {
      id: '1',
      name: 'ATUL GANGWAR',
      role: 'FULLSTACK DEV',
      photoUrl: null,
      transform: { zoom: 1, panX: 0, panY: 0, rotation: 0, filter: 'none' },
    },
    {
      id: '2',
      name: 'TEAMMATE 2',
      role: 'AI ENGINEER',
      photoUrl: null,
      transform: { zoom: 1, panX: 0, panY: 0, rotation: 0, filter: 'none' },
    },
  ]);
  const [teamName, setTeamName] = useState<string>('GOA HACKER SQUAD');

  // Canvas Refs for Direct High-Res PNG Download
  const pfpCanvasRef = useRef<PFPCanvasRef>(null);
  const badgeCanvasRef = useRef<BadgeCanvasRef>(null);
  const squadCanvasRef = useRef<SquadCanvasRef>(null);

  // Modals state
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [latestCanvasDataUrl, setLatestCanvasDataUrl] = useState<string | null>(null);

  const handleCanvasRendered = useCallback((dataUrl: string) => {
    setLatestCanvasDataUrl(dataUrl);
  }, []);

  const handleDownload = () => {
    if (activeTab === 'B') {
      badgeCanvasRef.current?.download(`HHGoa2026-Badge-${(formatBData.name || 'Builder').replace(/\s+/g, '_')}`);
    } else if (activeTab === 'A') {
      pfpCanvasRef.current?.download('HHGoa2026-PFP');
    } else if (activeTab === 'C') {
      squadCanvasRef.current?.download(`HHGoa2026-Squad-${teamName.replace(/\s+/g, '_')}`);
    }
  };

  return (
    <main className="min-h-screen bg-goa-gradient pb-16">
      {/* Navigation Header */}
      <Navbar onOpenGuide={() => setIsGuideOpen(true)} />

      {/* Hero Header Section */}
      <section className="relative overflow-hidden py-8 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-goa-gold/40 bg-goa-gold/10 px-4 py-1.5 text-xs font-black text-goa-gold shadow-md">
            <Palmtree className="h-4 w-4 animate-bounce" />
            <span>HH GOA 2026 SHORTLISTING TASK</span>
            <span className="h-1.5 w-1.5 rounded-full bg-goa-pink" />
            <span className="text-white">DEADLINE: 13TH AUGUST 2026</span>
          </div>

          <h2 className="mt-4 font-heading text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            BUILDER FRAME & <span className="bg-gradient-to-r from-goa-gold via-yellow-300 to-goa-pink bg-clip-text text-transparent">ID CARD GENERATOR</span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium text-goa-cream/80 sm:text-base">
            Upload your photo, personalize your builder class & stack, and instantly export an on-brand graphic ready to post on X with <span className="font-bold text-goa-pink">#FrameInGoa</span>!
          </p>

          {/* Format Selection Tabs */}
          <div className="mx-auto mt-8 flex max-w-xl justify-center gap-2 rounded-2xl border border-white/10 bg-goa-dark/80 p-1.5 shadow-2xl backdrop-blur-lg">
            <button
              onClick={() => setActiveTab('B')}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-3 text-xs font-black transition ${
                activeTab === 'B'
                  ? 'bg-gradient-to-r from-goa-pink to-goa-rose text-white shadow-lg glow-pink scale-[1.02]'
                  : 'text-goa-cream/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Zap className="h-4 w-4 text-goa-gold" />
              <span>Format B: Builder ID Card</span>
            </button>

            <button
              onClick={() => setActiveTab('A')}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-3 text-xs font-black transition ${
                activeTab === 'A'
                  ? 'bg-gradient-to-r from-goa-pink to-goa-rose text-white shadow-lg glow-pink scale-[1.02]'
                  : 'text-goa-cream/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Palmtree className="h-4 w-4 text-goa-gold" />
              <span>Format A: PFP Overlay</span>
            </button>

            <button
              onClick={() => setActiveTab('C')}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 px-3 text-xs font-black transition ${
                activeTab === 'C'
                  ? 'bg-gradient-to-r from-goa-pink to-goa-rose text-white shadow-lg glow-pink scale-[1.02]'
                  : 'text-goa-cream/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="h-4 w-4 text-goa-gold" />
              <span>Format C: Squad Frame</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Generator App Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Left Column: Form & Photo Controls */}
          <div className="flex flex-col gap-6 lg:col-span-6">
            <div className="rounded-3xl border border-goa-mint/20 bg-goa-card/90 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
              
              {activeTab === 'A' && (
                <FormatAEditor
                  onPhotoSelected={setPhotoUrl}
                  frameStyle={frameStyle}
                  setFrameStyle={setFrameStyle}
                  badgeText={badgeText}
                  setBadgeText={setBadgeText}
                  hasPhoto={!!photoUrl}
                />
              )}

              {activeTab === 'B' && (
                <FormatBEditor
                  onPhotoSelected={setPhotoUrl}
                  data={formatBData}
                  onChangeData={setFormatBData}
                  hasPhoto={!!photoUrl}
                />
              )}

              {activeTab === 'C' && (
                <FormatCEditor
                  teammates={teammates}
                  setTeammates={setTeammates}
                  teamName={teamName}
                  setTeamName={setTeamName}
                />
              )}

            </div>

            {/* Photo Adjustments Panel (Zoom, Pan, Rotation, Filters) for Format A & B */}
            {activeTab !== 'C' && photoUrl && (
              <ControlsPanel transform={transform} onChange={setTransform} />
            )}
          </div>

          {/* Right Column: Live High-Res Canvas Preview & Actions */}
          <div className="flex flex-col items-center gap-6 lg:col-span-6">
            <div className="sticky top-24 flex w-full flex-col items-center gap-5">
              
              {/* Canvas Preview Container */}
              <div className="w-full flex flex-col items-center">
                <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-goa-gold">
                  <Sparkles className="h-4 w-4 text-goa-pink" />
                  <span>Real-time High-Res Preview ({activeTab === 'A' ? 'PFP Frame' : activeTab === 'B' ? 'Builder ID Badge' : 'Squad Badge'})</span>
                </div>

                {activeTab === 'A' && (
                  <PFPCanvas
                    ref={pfpCanvasRef}
                    photoUrl={photoUrl}
                    transform={transform}
                    frameStyle={frameStyle}
                    badgeText={badgeText}
                    onCanvasRendered={handleCanvasRendered}
                  />
                )}

                {activeTab === 'B' && (
                  <BadgeCanvas
                    ref={badgeCanvasRef}
                    photoUrl={photoUrl}
                    transform={transform}
                    data={formatBData}
                    onCanvasRendered={handleCanvasRendered}
                  />
                )}

                {activeTab === 'C' && (
                  <SquadCanvas
                    ref={squadCanvasRef}
                    teammates={teammates}
                    teamName={teamName}
                    onCanvasRendered={handleCanvasRendered}
                  />
                )}
              </div>

              {/* Instant Action CTA Buttons */}
              <div className="flex w-full flex-col gap-3 max-w-[440px]">
                <button
                  onClick={() => setIsShareOpen(true)}
                  className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-goa-pink via-rose-500 to-goa-gold p-4 font-black text-white shadow-xl transition hover:opacity-95 hover:scale-[1.02] active:scale-95 glow-pink"
                >
                  <Share2 className="h-5 w-5 group-hover:rotate-12 transition" />
                  <span className="text-base">1-CLICK SHARE TO X (#FrameInGoa)</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 rounded-xl border border-goa-gold/40 bg-goa-dark/90 py-3 text-xs font-extrabold text-goa-gold transition hover:bg-goa-gold hover:text-goa-dark active:scale-95"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download PNG</span>
                  </button>

                  <button
                    onClick={() => setIsGuideOpen(true)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-3 text-xs font-extrabold text-goa-cream transition hover:bg-white/10"
                  >
                    <CheckCircle2 className="h-4 w-4 text-goa-mint" />
                    <span>How to Submit</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Footer Info & Submission Notice */}
      <footer className="mt-20 border-t border-white/10 bg-goa-dark/90 py-8 px-4 text-center text-xs text-goa-cream/60">
        <div className="mx-auto max-w-4xl flex flex-col items-center gap-3">
          <p className="flex items-center gap-1.5 font-bold text-goa-cream">
            Built with <Heart className="h-4 w-4 fill-current text-goa-pink" /> for HH Goa 2026 • Fullstack MERN Next.js Vercel Architecture
          </p>
          <p className="text-[11px] text-goa-cream/50">
            ⚠ Remember: Submissions without an X post containing <span className="text-goa-gold font-bold">#FrameInGoa</span> will be treated as invalid. Deadline: 11:59 pm, 13th August 2026.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        imageDataUrl={latestCanvasDataUrl}
        onDownload={handleDownload}
        builderName={formatBData.name}
        formatType={activeTab === 'A' ? 'PFP' : activeTab === 'B' ? 'BADGE' : 'SQUAD'}
      />

      <HowToGuide
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </main>
  );
}
