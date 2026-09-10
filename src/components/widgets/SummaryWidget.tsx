'use client';

import React from 'react';
import { CurrentWeather, WeatherConditionMeta } from '../../types/weather';

interface SummaryWidgetProps {
  condition: WeatherConditionMeta;
  current: CurrentWeather;
  lastUpdated: string;
}

export function SummaryWidget({ condition, current, lastUpdated }: SummaryWidgetProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-[2rem] border border-white/20 bg-white/15 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-all duration-300 hover:bg-white/20">
      <div>
        <div className="flex items-center gap-2 text-white/70">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Đánh giá tổng quan
          </span>
        </div>

        <h3 className="mt-3 font-display text-xl font-semibold text-white">
          {condition.label}
        </h3>

        <p className="mt-2 text-sm leading-6 text-white/85">
          {condition.description}. Độ ẩm không khí ở mức {current.relativeHumidity}%, gió thổi với tốc độ {Math.round(current.windSpeed)} km/h. Thích hợp cho các hoạt động thường ngày.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full bg-white/15 px-3 py-1 font-medium backdrop-blur-md">
          Tầm nhìn: {current.visibilityKm} km
        </span>
        <span className="rounded-full bg-white/15 px-3 py-1 font-medium backdrop-blur-md">
          Áp suất: {current.surfacePressure} hPa
        </span>
        <span className="rounded-full bg-white/15 px-3 py-1 font-medium backdrop-blur-md">
          Cập nhật: {lastUpdated}
        </span>
      </div>
    </div>
  );
}
