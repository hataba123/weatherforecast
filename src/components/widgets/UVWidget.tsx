'use client';

import React from 'react';
import { getUVCategory } from '../../utils/formatters';

interface UVWidgetProps {
  uvIndex: number;
}

export function UVWidget({ uvIndex }: UVWidgetProps) {
  const { level, color, advice, percentage } = getUVCategory(uvIndex);

  return (
    <div className="flex flex-col justify-between rounded-[2rem] border border-white/20 bg-white/15 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-all duration-300 hover:bg-white/20">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 text-white/70">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Chỉ số UV
          </span>
        </div>

        {/* Main Value */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-4xl font-semibold text-white">
            {Math.round(uvIndex)}
          </span>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${color}`}>
            {level}
          </span>
        </div>

        {/* iOS-style Rainbow Gauge Bar */}
        <div className="relative mt-4 h-2 w-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 via-orange-500 to-purple-600 shadow-inner">
          <div
            className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full border-2 border-slate-900 bg-white shadow-md transition-all duration-500"
            style={{
              left: `calc(${percentage}% - 7px)`,
            }}
          />
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-white/80">
        {advice}
      </p>
    </div>
  );
}
