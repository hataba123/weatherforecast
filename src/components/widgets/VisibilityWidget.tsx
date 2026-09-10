'use client';

import React from 'react';

interface VisibilityWidgetProps {
  visibilityKm: number;
}

export function VisibilityWidget({ visibilityKm }: VisibilityWidgetProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-[2rem] border border-white/20 bg-white/15 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-all duration-300 hover:bg-white/20">
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

        <span className="mt-2 inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/80">
          {visibilityKm >= 10 ? 'Rõ ràng hoàn hảo' : visibilityKm >= 5 ? 'Tầm nhìn khá' : 'Hạn chế tầm nhìn'}
        </span>
      </div>

      <p className="mt-4 text-xs leading-5 text-white/80">
        {visibilityKm >= 10
          ? 'Tầm nhìn quang đãng, hoàn toàn thông thoáng cho các hoạt động di chuyển ngoài trời.'
          : visibilityKm >= 5
          ? 'Tầm nhìn trung bình, có sương mù hoặc bụi nhẹ.'
          : 'Tầm nhìn giảm do sương mù hoặc mưa rào dày đặc.'}
      </p>
    </div>
  );
}
