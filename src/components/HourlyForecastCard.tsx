'use client';

import React from 'react';
import { HourlyForecastItem, TemperatureUnit } from '../types/weather';
import { formatTemp } from '../utils/formatters';
import { getWeatherCondition } from '../utils/weatherCodes';
import { WeatherIcon } from './WeatherIcon';

interface HourlyForecastCardProps {
  hourly: HourlyForecastItem[];
  unit: TemperatureUnit;
}

export function HourlyForecastCard({ hourly, unit }: HourlyForecastCardProps) {
  return (
    <div className="rounded-[2rem] border border-white/25 bg-white/15 p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-2xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-white/15 pb-3 text-white/80">
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
          Dự báo 24 giờ tới
        </span>
      </div>

      {/* Horizontal Scrollable Slider */}
      <div className="mt-3 flex gap-4 overflow-x-auto pb-2 pt-1 scrollbar-none snap-x touch-pan-x">
        {hourly.map((item, index) => {
          const condition = getWeatherCondition(item.weatherCode, item.isDay);
          const isNow = index === 0;

          return (
            <div
              key={item.isoTime || index}
              className={`flex shrink-0 min-w-[4.25rem] sm:min-w-[4.5rem] flex-col items-center justify-between gap-3 rounded-2xl p-2.5 transition-all duration-200 snap-start ${
                isNow ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'
              }`}
            >
              {/* Time */}
              <span className={`text-xs font-medium ${isNow ? 'font-bold text-white' : 'text-white/80'}`}>
                {item.time}
              </span>

              {/* Icon & Rain */}
              <div className="flex flex-col items-center gap-1">
                <WeatherIcon type={condition.iconType} size={28} />
                {item.rainProbability > 10 ? (
                  <span className="text-[0.65rem] font-bold text-sky-200 drop-shadow">
                    {item.rainProbability}%
                  </span>
                ) : (
                  <span className="h-3 text-[0.65rem] opacity-0">-</span>
                )}
              </div>

              {/* Temperature */}
              <span className="font-display text-base font-semibold text-white">
                {formatTemp(item.temperature, unit)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
