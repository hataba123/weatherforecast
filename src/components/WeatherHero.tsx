'use client';

import React from 'react';
import { LocationData, WeatherConditionMeta, CurrentWeather, TemperatureUnit } from '../types/weather';
import { formatTemp } from '../utils/formatters';
import { WeatherIcon } from './WeatherIcon';

interface WeatherHeroProps {
  location: LocationData;
  current: CurrentWeather;
  condition: WeatherConditionMeta;
  tempMax: number;
  tempMin: number;
  unit: TemperatureUnit;
}

export function WeatherHero({
  location,
  current,
  condition,
  tempMax,
  tempMin,
  unit,
}: WeatherHeroProps) {
  return (
    <section className="relative flex flex-col items-center justify-center py-6 text-center text-white sm:py-10">
      {/* City and status */}
      <div className="flex items-center justify-center gap-2">
        <svg
          className="h-5 w-5 text-white/80 drop-shadow"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <h1 className="font-display text-3xl font-semibold tracking-tight drop-shadow-md sm:text-4xl md:text-5xl">
          {location.name}
        </h1>
        {location.isCurrentLocation && (
          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium backdrop-blur-md">
            Vị trí của bạn
          </span>
        )}
      </div>

      {location.admin1 && (
        <p className="mt-1 text-sm font-medium text-white/80 drop-shadow-sm">
          {location.admin1} {location.country ? `• ${location.country}` : ''}
        </p>
      )}

      {/* Hero Temperature */}
      <div className="relative mt-3 flex items-center justify-center">
        <span className="font-display text-8xl font-light tracking-tighter text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.25)] sm:text-9xl md:text-[10rem] select-none">
          {formatTemp(current.temperature, unit)}
        </span>
      </div>

      {/* Weather condition title and icon */}
      <div className="mt-1 flex items-center justify-center gap-3">
        <WeatherIcon type={condition.iconType} size={36} />
        <span className="text-xl font-medium tracking-wide text-white drop-shadow-md sm:text-2xl">
          {condition.label}
        </span>
      </div>

      {/* High / Low & Feels like */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-white/90 drop-shadow sm:text-base">
        <span>
          C: {formatTemp(tempMax, unit)} • T: {formatTemp(tempMin, unit)}
        </span>
        <span className="hidden sm:inline text-white/40">|</span>
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-md border border-white/20 sm:text-sm">
          Cảm giác như {formatTemp(current.apparentTemperature, unit)}
        </span>
      </div>

      {/* Short weather description */}
      <p className="mt-2 max-w-md text-xs font-normal text-white/80 sm:text-sm">
        {condition.description}
      </p>
    </section>
  );
}
