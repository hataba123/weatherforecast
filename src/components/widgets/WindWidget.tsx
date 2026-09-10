'use client';

import React from 'react';
import { getWindDirection } from '../../utils/formatters';

interface WindWidgetProps {
  windSpeed: number;
  windDirection: number;
}

export function WindWidget({ windSpeed, windDirection }: WindWidgetProps) {
  const { label, angle } = getWindDirection(windDirection);

  return (
    <div className="flex flex-col justify-between rounded-[2rem] border border-white/20 bg-white/15 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-all duration-300 hover:bg-white/20">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 text-white/70">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Gió & Hướng gió
          </span>
        </div>

        {/* Speed & Compass */}
        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-4xl font-semibold text-white">
                {Math.round(windSpeed)}
              </span>
              <span className="text-sm font-medium text-white/70">km/h</span>
            </div>
            <p className="mt-1 text-sm font-medium text-white/90">
              Hướng {label} ({Math.round(angle)}°)
            </p>
          </div>

          {/* Compass Dial */}
          <div className="relative h-18 w-18 place-items-center rounded-full border border-white/30 bg-black/20 p-1 backdrop-blur-sm grid">
            <span className="absolute top-1 text-[0.6rem] font-bold text-white/60">B</span>
            <span className="absolute right-1 text-[0.6rem] font-bold text-white/60">Đ</span>
            <span className="absolute bottom-1 text-[0.6rem] font-bold text-white/60">N</span>
            <span className="absolute left-1 text-[0.6rem] font-bold text-white/60">T</span>

            {/* Rotating Arrow */}
            <div
              className="h-9 w-9 transition-transform duration-700 ease-out"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
                <polygon points="12,2 17,20 12,16 7,20" fill="#38BDF8" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-white/80">
        {windSpeed < 15
          ? 'Gió nhẹ thoáng mát, điều kiện lý tưởng cho mọi hoạt động ngoài trời.'
          : windSpeed < 30
          ? 'Gió vừa phải, có thể cảm nhận lá cây lay động liên tục.'
          : 'Gió giật mạnh, chú ý an toàn khi di chuyển trên các cây cầu cao.'}
      </p>
    </div>
  );
}
