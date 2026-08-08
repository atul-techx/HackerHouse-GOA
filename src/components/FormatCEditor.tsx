'use client';

import React, { useRef } from 'react';
import { Users, Plus, Trash2, Upload, Sparkles, User } from 'lucide-react';
import { Teammate } from '@/lib/canvasUtils';
import { processUploadedFile } from '@/lib/heicHelper';

interface FormatCEditorProps {
  teammates: Teammate[];
  setTeammates: (tm: Teammate[]) => void;
  teamName: string;
  setTeamName: (name: string) => void;
}

export const FormatCEditor: React.FC<FormatCEditorProps> = ({
  teammates,
  setTeammates,
  teamName,
  setTeamName,
}) => {
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const addTeammate = () => {
    if (teammates.length >= 5) return;
    const id = Date.now().toString();
    setTeammates([
      ...teammates,
      {
        id,
        name: `TEAMMATE ${teammates.length + 1}`,
        role: 'DEVELOPER',
        photoUrl: null,
        transform: { zoom: 1, panX: 0, panY: 0, rotation: 0, filter: 'none' },
      },
    ]);
  };

  const removeTeammate = (id: string) => {
    if (teammates.length <= 1) return;
    setTeammates(teammates.filter((t) => t.id !== id));
  };

  const updateTeammate = (id: string, patch: Partial<Teammate>) => {
    setTeammates(teammates.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  };

  const handlePhotoUpload = async (id: string, file: File) => {
    try {
      const url = await processUploadedFile(file);
      updateTeammate(id, { photoUrl: url });
    } catch (e) {
      console.error('Teammate photo error:', e);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Squad Header Input */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-goa-gold">
          1. Squad / Team Name
        </label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="e.g. GOA HACKER SQUAD"
          className="rounded-xl border border-white/15 bg-goa-dark/80 px-4 py-2.5 text-sm font-bold text-white placeholder-goa-cream/40 focus:border-goa-gold focus:outline-none"
        />
      </div>

      {/* Teammates List */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-goa-gold flex items-center gap-1.5">
            <Users className="h-4 w-4 text-goa-pink" />
            <span>2. Teammates ({teammates.length}/5)</span>
          </label>
          {teammates.length < 5 && (
            <button
              onClick={addTeammate}
              className="flex items-center gap-1 rounded-lg bg-goa-pink/20 px-2.5 py-1 text-xs font-bold text-goa-pink hover:bg-goa-pink hover:text-white transition"
            >
              <Plus className="h-3.5 w-3.5" /> Add Member
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {teammates.map((tm, idx) => (
            <div
              key={tm.id}
              className="flex flex-col gap-3 rounded-xl border border-white/10 bg-goa-dark/70 p-3 shadow-md"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-extrabold text-goa-gold">Member #{idx + 1}</span>
                {teammates.length > 1 && (
                  <button
                    onClick={() => removeTeammate(tm.id)}
                    className="text-xs font-bold text-goa-rose hover:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {/* Photo Trigger */}
                <div
                  onClick={() => fileInputRefs.current[tm.id]?.click()}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-goa-mint/40 bg-goa-deep/50 py-2.5 px-3 text-xs font-bold text-white hover:border-goa-mint"
                >
                  <input
                    ref={(el) => { fileInputRefs.current[tm.id] = el; }}
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handlePhotoUpload(tm.id, e.target.files[0])}
                    className="hidden"
                  />
                  <Upload className="h-4 w-4 text-goa-mint" />
                  <span>{tm.photoUrl ? 'Change Photo' : 'Upload Photo'}</span>
                </div>

                {/* Name */}
                <input
                  type="text"
                  value={tm.name}
                  onChange={(e) => updateTeammate(tm.id, { name: e.target.value })}
                  placeholder="Name"
                  className="rounded-lg border border-white/10 bg-goa-dark/90 px-3 py-1.5 text-xs font-bold text-white"
                />

                {/* Role */}
                <input
                  type="text"
                  value={tm.role}
                  onChange={(e) => updateTeammate(tm.id, { role: e.target.value })}
                  placeholder="Role (e.g. MERN Dev)"
                  className="rounded-lg border border-white/10 bg-goa-dark/90 px-3 py-1.5 text-xs font-bold text-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
