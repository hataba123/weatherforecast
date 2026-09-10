'use client';

import React from 'react';
import { DailyForecastItem, TemperatureUnit } from '../types/weather';
import { formatTemp } from '../utils/formatters';
import { getWeatherCondition } from '../utils/weatherCodes';
import { WeatherIcon } from './WeatherIcon';

interface DailyForecastCardProps {
  daily: DailyForecastItem[];
  weekMinTemp: number;
  weekMaxTemp: number;
  currentTemp?: number;
  unit: TemperatureUnit;
}

export function DailyForecastCard({
  daily,
  weekMinTemp,
  weekMaxTemp,
  currentTemp,
  unit,
}: DailyForecastCardProps) {
  const tempSpan = Math.max(1, weekMaxTemp - weekMinTemp);

  return (
    <div className="rounded-[2rem] border border-white/25 bg-white/15 p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-2xl transition-all duration-300">
      {/* Card Header */}
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
          Dự báo 7 ngày tới
        </span>
      </div>

      {/* Daily list */}
      <div className="mt-3 divide-y divide-white/10">
        {daily.map((day, idx) => {
          const condition = getWeatherCondition(day.weatherCode, true);
          const isToday = idx === 0;

          // Calculate temperature range bar percentages
          const leftPercent = Math.max(
            0,
            Math.min(100, ((day.tempMin - weekMinTemp) / tempSpan) * 100)
          );
          const barWidthPercent = Math.max(
            8,
            Math.min(100 - leftPercent, ((day.tempMax - day.tempMin) / tempSpan) * 100)
          );

          // Current temp dot position for today
          let currentTempPercent: number | null = null;
          if (isToday && currentTemp !== undefined) {
            currentTempPercent = Math.max(
              0,
              Math.min(100, ((currentTemp - weekMinTemp) / tempSpan) * 100)
            );
          }

          return (
            <div
              key={day.date}
              className="grid grid-cols-[3.8rem_2.8rem_1fr] items-center gap-2 py-3 transition-colors duration-150 hover:bg-white/5 sm:grid-cols-[5rem_3.5rem_1fr] sm:gap-4 sm:px-2 rounded-xl"
            >
              {/* Day Name */}
              <div className="flex flex-col">
                <span className={`text-sm font-semibold ${isToday ? 'text-white' : 'text-white/90'}`}>
                  {day.dayLabel}
                </span>
                <span className="text-[0.7rem] text-white/60">{day.fullDateLabel}</span>
              </div>

              {/* Weather Icon & Rain */}
              <div className="flex flex-col items-center">
                <WeatherIcon type={condition.iconType} size={26} />
                {day.precipitationProbability > 20 && (
                  <span className="text-[0.65rem] font-bold text-sky-200">
                    {day.precipitationProbability}%
                  </span>
                )}
              </div>

              {/* iOS-style Temperature Range Bar */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Min Temp */}
                <span className="w-8 text-right font-display text-sm font-medium text-white/70">
                  {formatTemp(day.tempMin, unit)}
                </span>

                {/* Progress Bar Container */}
                <div className="relative h-1.5 flex-1 rounded-full bg-black/25 overflow-hidden">
                  {/* Colored Active Segment */}
                  <div
                    className="absolute top-0 h-full rounded-full bg-gradient-to-r from-sky-400 via-amber-300 to-orange-400"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${barWidthPercent}%`,
                    }}
                  />

                  {/* Current Temp indicator for Today */}
                  {currentTempPercent !== null && (
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full border-2 border-slate-900 bg-white shadow"
                      style={{
                        left: `calc(${currentTempPercent}% - 5px)`,
                      }}
                    />
                  )}
                </div>

                {/* Max Temp */}
                <span className="w-8 text-left font-display text-sm font-semibold text-white">
                  {formatTemp(day.tempMax, unit)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
