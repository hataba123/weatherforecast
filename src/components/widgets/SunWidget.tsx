'use client';

import React from 'react';

interface SunWidgetProps {
  sunrise: string;
  sunset: string;
}

export function SunWidget({ sunrise, sunset }: SunWidgetProps) {
  // Approximate sun position percentage based on current hour
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  let sunPercentage = 50;
  try {
    const [riseH, riseM] = sunrise.split(':').map(Number);
    const [setH, setM] = sunset.split(':').map(Number);
    const riseTotal = (riseH || 6) * 60 + (riseM || 0);
    const setTotal = (setH || 18) * 60 + (setM || 0);

    if (currentMinutes <= riseTotal) {
      sunPercentage = 0;
    } else if (currentMinutes >= setTotal) {
      sunPercentage = 100;
    } else {
      sunPercentage = Math.round(
        ((currentMinutes - riseTotal) / (setTotal - riseTotal)) * 100
      );
    }
  } catch {
    sunPercentage = 50;
  }

  // Calculate arc coordinates on SVG
  // SVG viewBox: 0 0 200 80. Path: M 20,70 Q 100,0 180,70
  // Quadratic bezier parameter t in [0, 1]
  const t = Math.max(0, Math.min(1, sunPercentage / 100));
  const sunX = Math.round((1 - t) * (1 - t) * 20 + 2 * (1 - t) * t * 100 + t * t * 180);
  const sunY = Math.round((1 - t) * (1 - t) * 70 + 2 * (1 - t) * t * 10 + t * t * 70);

  const isDaytime = currentMinutes >= 360 && currentMinutes <= 1080;

  return (
    <div className="flex flex-col justify-between rounded-[2rem] border border-white/20 bg-white/15 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-all duration-300 hover:bg-white/20">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 text-white/70">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Mặt trời mọc & lặn
          </span>
        </div>

        {/* Times */}
        <div className="mt-3 flex items-baseline justify-between">
          <div>
            <span className="text-xs text-white/60">Bình minh</span>
            <p className="font-display text-2xl font-semibold text-white">{sunrise}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-white/60">Hoàng hôn</span>
            <p className="font-display text-2xl font-semibold text-white">{sunset}</p>
          </div>
        </div>

        {/* Visual Celestial Sun Arc */}
        <div className="relative mt-2 h-16 w-full">
          <svg viewBox="0 0 200 80" className="h-full w-full overflow-visible">
            {/* Horizon baseline */}
            <line x1="10" y1="70" x2="190" y2="70" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Arc trajectory */}
            <path
              d="M 20,70 Q 100,10 180,70"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2.5"
            />
            {/* Traveled arc segment */}
            <path
              d="M 20,70 Q 100,10 180,70"
              fill="none"
              stroke="url(#sun-arc-grad)"
              strokeWidth="3"
              strokeDasharray="200"
              strokeDashoffset={200 - (t * 200)}
            />
            {/* Sun position marker */}
            <circle
              cx={sunX}
              cy={sunY}
              r="6"
              fill="#FDE047"
              stroke="#F59E0B"
              strokeWidth="2"
              className="drop-shadow-[0_0_8px_rgba(253,224,71,0.9)]"
            />
            <defs>
              <linearGradient id="sun-arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <p className="mt-3 text-xs leading-5 text-white/80">
        {isDaytime
          ? `Mặt trời đang di chuyển trên bầu trời, lặn lúc ${sunset}.`
          : `Đang là ban đêm, mặt trời sẽ mọc trở lại lúc ${sunrise}.`}
      </p>
    </div>
  );
}
