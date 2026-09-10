'use client';

import React from 'react';
import { getPressureStatus } from '../../utils/formatters';

interface PressureWidgetProps {
  pressureHpa: number;
}

export function PressureWidget({ pressureHpa }: PressureWidgetProps) {
  const { label, desc } = getPressureStatus(pressureHpa);

  return (
    <div className="flex h-full flex-col justify-between rounded-[2rem] border border-white/20 bg-white/15 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-all duration-300 hover:bg-white/20">
      <div>
        <div className="flex items-center gap-2 text-white/70">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Áp suất khí quyển
          </span>
        </div>

        <div className="mt-3 flex items-baseline gap-1">
          <span className="font-display text-4xl font-semibold text-white">
            {pressureHpa}
          </span>
          <span className="text-sm font-medium text-white/70">hPa</span>
        </div>

        <span className="mt-2 inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/80">
          {label}
        </span>
      </div>

      <p className="mt-4 text-xs leading-5 text-white/80">
        {desc}
      </p>
    </div>
  );
}
