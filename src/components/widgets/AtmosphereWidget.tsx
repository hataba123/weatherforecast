'use client';

import React from 'react';
import { getPressureStatus } from '../../utils/formatters';

interface AtmosphereWidgetProps {
  visibilityKm: number;
  pressureHpa: number;
}

export function AtmosphereWidget({ visibilityKm, pressureHpa }: AtmosphereWidgetProps) {
  const { label: pressureLabel, desc: pressureDesc } = getPressureStatus(pressureHpa);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Visibility Card */}
      <div className="flex flex-col justify-between rounded-[2rem] border border-white/20 bg-white/15 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-all duration-300 hover:bg-white/20">
        <div>
          <div className="flex items-center gap-2 text-white/70">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Tầm nhìn xa
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-1">
            <span className="font-display text-4xl font-semibold text-white">
              {visibilityKm}
            </span>
            <span className="text-sm font-medium text-white/70">km</span>
          </div>
        </div>

        <p className="mt-4 text-xs leading-5 text-white/80">
          {visibilityKm >= 10
            ? 'Tầm nhìn quang đãng, hoàn toàn thông thoáng cho phương tiện giao thông.'
            : visibilityKm >= 5
            ? 'Tầm nhìn trung bình, có một ít sương mờ hoặc bụi nhẹ.'
            : 'Tầm nhìn bị hạn chế do sương mù hoặc mưa rào dày đặc.'}
        </p>
      </div>

      {/* Pressure Card */}
      <div className="flex flex-col justify-between rounded-[2rem] border border-white/20 bg-white/15 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-all duration-300 hover:bg-white/20">
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

          <span className="mt-1 inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/80">
            {pressureLabel}
          </span>
        </div>

        <p className="mt-4 text-xs leading-5 text-white/80">
          {pressureDesc}
        </p>
      </div>
    </div>
  );
}
