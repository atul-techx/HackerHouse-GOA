'use client';

import React, { useRef } from 'react';
import { Upload, Dices, User, Code, Flame, Sparkles, Tag, Calendar, MapPin } from 'lucide-react';
import { processUploadedFile } from '@/lib/heicHelper';
import { FormatBData } from '@/lib/canvasUtils';
import { BUILDER_CLASSES, PRESET_STACKS, PRESET_VIBES, generateRandomBuilderID } from '@/lib/builderClasses';
import { SampleAvatars } from './SampleAvatars';

interface FormatBEditorProps {
  onPhotoSelected: (dataUrl: string) => void;
  data: FormatBData;
  onChangeData: (newData: FormatBData) => void;
  hasPhoto: boolean;
}

export const FormatBEditor: React.FC<FormatBEditorProps> = ({
  onPhotoSelected,
  data,
  onChangeData,
  hasPhoto,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = (patch: Partial<FormatBData>) => {
    onChangeData({ ...data, ...patch });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const dataUrl = await processUploadedFile(e.target.files[0]);
        onPhotoSelected(dataUrl);
      } catch (err) {
        console.error('File upload error:', err);
      }
    }
  };

  const shuffleBuilderClass = () => {
    const randomClass = BUILDER_CLASSES[Math.floor(Math.random() * BUILDER_CLASSES.length)];
    const randomId = generateRandomBuilderID();
    update({
      builderClass: randomClass.title,
      builderId: randomId,
    });
  };

  return (
    <div className="flex flex-col gap-5">
      
      {/* 1. Photo Upload */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-goa-gold">
          1. Upload Photo (JPG, PNG, HEIC iPhone format)
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-5 text-center transition ${
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
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-goa-pink to-goa-gold p-0.5 shadow-lg group-hover:scale-110 transition">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-goa-dark">
              <Upload className="h-5 w-5 text-goa-gold group-hover:text-goa-pink" />
            </div>
          </div>
          <p className="mt-2 text-sm font-bold text-white">
            {hasPhoto ? 'Change Photo' : 'Upload Badge Photo'}
          </p>
        </div>
      </div>

      {!hasPhoto && <SampleAvatars onSelectSample={onPhotoSelected} />}

      {/* 2. Personal Fields */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-goa-gold">
            2. Builder Badge Details
          </label>
          <button
            onClick={shuffleBuilderClass}
            className="flex items-center gap-1.5 rounded-lg bg-goa-pink/20 px-2.5 py-1 text-xs font-bold text-goa-pink border border-goa-pink/40 hover:bg-goa-pink hover:text-white transition"
          >
            <Dices className="h-3.5 w-3.5" />
            <span>Randomize Title & ID</span>
          </button>
        </div>

        {/* Full Name */}
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-goa-cream">
            <User className="h-3.5 w-3.5 text-goa-gold" /> Full Name
          </span>
          <input
            type="text"
            value={data.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder="e.g. ATUL GANGWAR"
            className="rounded-xl border border-white/15 bg-goa-dark/80 px-3.5 py-2 text-sm font-bold text-white placeholder-goa-cream/40 focus:border-goa-gold focus:outline-none"
          />
        </div>

        {/* Role / Title */}
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-goa-cream">
            <Tag className="h-3.5 w-3.5 text-goa-pink" /> Primary Role / Title
          </span>
          <input
            type="text"
            value={data.role}
            onChange={(e) => update({ role: e.target.value })}
            placeholder="e.g. SOFTWARE DEVELOPER / FULLSTACK"
            className="rounded-xl border border-white/15 bg-goa-dark/80 px-3.5 py-2 text-sm font-bold text-white placeholder-goa-cream/40 focus:border-goa-pink focus:outline-none"
          />
        </div>

        {/* Generated Builder Class */}
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-goa-cream">
            <Sparkles className="h-3.5 w-3.5 text-goa-gold" /> Builder Class / Persona
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              value={data.builderClass}
              onChange={(e) => update({ builderClass: e.target.value })}
              placeholder="e.g. TERMINAL WIZARD"
              className="flex-1 rounded-xl border border-white/15 bg-goa-dark/80 px-3.5 py-2 text-sm font-bold text-goa-gold focus:border-goa-gold focus:outline-none"
            />
            <button
              onClick={shuffleBuilderClass}
              className="flex items-center justify-center rounded-xl bg-goa-gold/20 px-3 text-goa-gold hover:bg-goa-gold hover:text-goa-dark transition"
              title="Shuffle Builder Title"
            >
              <Dices className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tech Stack / Skills */}
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-goa-cream">
            <Code className="h-3.5 w-3.5 text-goa-mint" /> Tech Stack / Skills
          </span>
          <input
            type="text"
            value={data.skills}
            onChange={(e) => update({ skills: e.target.value })}
            placeholder="e.g. PYTHON, JAVA, FRONTEND"
            className="rounded-xl border border-white/15 bg-goa-dark/80 px-3.5 py-2 text-sm font-bold text-white placeholder-goa-cream/40 focus:border-goa-mint focus:outline-none"
          />
          <div className="flex flex-wrap gap-1 pt-1">
            {PRESET_STACKS.slice(0, 3).map((stk, idx) => (
              <button
                key={idx}
                onClick={() => update({ skills: stk })}
                className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-goa-cream/70 hover:bg-goa-mint/20 hover:text-goa-mint"
              >
                {stk.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Team Vibes */}
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-goa-cream">
            <Flame className="h-3.5 w-3.5 text-goa-rose" /> Team Vibes / Motto
          </span>
          <input
            type="text"
            value={data.teamVibes}
            onChange={(e) => update({ teamVibes: e.target.value })}
            placeholder="e.g. BUILD • SHIP • REPEAT"
            className="rounded-xl border border-white/15 bg-goa-dark/80 px-3.5 py-2 text-sm font-bold text-white placeholder-goa-cream/40 focus:border-goa-rose focus:outline-none"
          />
        </div>

        {/* ID Number tag */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-medium text-goa-cream/70">Unique Builder ID</span>
            <input
              type="text"
              value={data.builderId}
              onChange={(e) => update({ builderId: e.target.value })}
              className="rounded-xl border border-white/15 bg-goa-dark/80 px-3 py-1.5 font-mono text-xs font-bold text-goa-mint"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-medium text-goa-cream/70">Event Date</span>
            <input
              type="text"
              value={data.date}
              onChange={(e) => update({ date: e.target.value })}
              className="rounded-xl border border-white/15 bg-goa-dark/80 px-3 py-1.5 text-xs font-bold text-white"
            />
          </div>
        </div>

      </div>

    </div>
  );
};
