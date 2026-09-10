'use client';

import React from 'react';
import { getHumidityStatus } from '../../utils/formatters';

interface HumidityWidgetProps {
  humidity: number;
  dewPoint: number;
}

export function HumidityWidget({ humidity, dewPoint }: HumidityWidgetProps) {
  const { label, desc } = getHumidityStatus(humidity);

  return (
    <div className="flex h-full flex-col justify-between rounded-[2rem] border border-white/20 bg-white/15 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-all duration-300 hover:bg-white/20">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 text-white/70">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Độ ẩm không khí
          </span>
        </div>

        {/* Main Value */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-4xl font-semibold text-white">
            {Math.round(humidity)}%
          </span>
          <span className="text-sm font-medium text-white/80">
            {label}
          </span>
        </div>

        {/* Humidity progress pill */}
        <div className="mt-4 h-2 w-full rounded-full bg-black/20 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-300 to-blue-500 transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(0, humidity))}%` }}
          />
        </div>
      </div>

      <div className="mt-4 border-t border-white/10 pt-3 text-xs leading-5 text-white/80">
        <p>{desc}</p>
        <p className="mt-1 text-white/60">
          Điểm sương hiện tại là {dewPoint}°C.
        </p>
      </div>
    </div>
  );
}
