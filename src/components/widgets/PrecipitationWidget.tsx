'use client';

import React from 'react';

interface PrecipitationWidgetProps {
  precipitationMm: number;
  rainProbabilityMax: number;
}

export function PrecipitationWidget({
  precipitationMm,
  rainProbabilityMax,
}: PrecipitationWidgetProps) {
  return (
    <div className="flex flex-col justify-between rounded-[2rem] border border-white/20 bg-white/15 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-all duration-300 hover:bg-white/20">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 text-white/70">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Lượng mưa
          </span>
        </div>

        {/* Value */}
        <div className="mt-3 flex items-baseline gap-1">
          <span className="font-display text-4xl font-semibold text-white">
            {precipitationMm}
          </span>
          <span className="text-sm font-medium text-white/70">mm</span>
        </div>

        <p className="mt-1 text-sm font-medium text-white/90">
          Xác suất mưa cao nhất hôm nay: {rainProbabilityMax}%
        </p>
      </div>

      <p className="mt-4 text-xs leading-5 text-white/80">
        {precipitationMm > 5
          ? 'Lượng mưa đáng kể. Chú ý mang theo ô hoặc áo mưa khi ra ngoài.'
          : rainProbabilityMax > 40
          ? 'Khả năng có mưa rào trong ngày. Nên chuẩn bị áo mưa phòng ngừa.'
          : 'Không có mưa dự kiến trong ngày hôm nay. Thời tiết khô ráo.'}
      </p>
    </div>
  );
}
