'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LocationData, TemperatureUnit } from '../types/weather';
import { POPULAR_LOCATIONS, searchLocations } from '../services/weatherApi';

interface NavbarProps {
  currentLocation: LocationData;
  onSelectLocation: (loc: LocationData) => void;
  onUseCurrentLocation: () => void;
  isLoadingLocation: boolean;
  unit: TemperatureUnit;
  onToggleUnit: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdated: string;
}

export function Navbar({
  currentLocation,
  onSelectLocation,
  onUseCurrentLocation,
  isLoadingLocation,
  unit,
  onToggleUnit,
  onRefresh,
  isRefreshing,
  lastUpdated,
}: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Debounced live search
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const results = await searchLocations(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
      setIsDropdownOpen(true);
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (loc: LocationData) => {
    onSelectLocation(loc);
    setSearchQuery('');
    setIsDropdownOpen(false);
  };

  return (
    <header className="relative z-50 flex flex-col gap-3">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/25 bg-white/15 px-4 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-2xl sm:px-6 sm:py-3">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-600 text-white shadow-md shadow-sky-500/25">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
          </div>
          <div>
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white/75">
              iOS Weather
            </span>
            <p className="font-display text-base font-semibold leading-tight text-white drop-shadow">
              Dự báo Thời tiết
            </p>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-2">
          {/* GPS Button */}
          <button
            type="button"
            onClick={onUseCurrentLocation}
            disabled={isLoadingLocation}
            title="Sử dụng vị trí GPS hiện tại"
            className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-medium text-white shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-white/25 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <svg
              className={`h-3.5 w-3.5 ${isLoadingLocation ? 'animate-spin' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2v2m0 16v2M2 12h2m16 0h2M12 7a5 5 0 100 10 5 5 0 000-10z"
              />
            </svg>
            <span className="hidden sm:inline">Vị trí của tôi</span>
          </button>

          {/* Unit Switcher */}
          <button
            type="button"
            onClick={onToggleUnit}
            title={`Chuyển sang độ ${unit === 'C' ? 'Fahrenheit (°F)' : 'Celsius (°C)'}`}
            className="flex items-center rounded-full border border-white/20 bg-black/20 p-1 text-xs font-semibold backdrop-blur-md cursor-pointer transition-transform active:scale-95"
          >
            <span
              className={`rounded-full px-2.5 py-1 transition-all ${
                unit === 'C'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              °C
            </span>
            <span
              className={`rounded-full px-2.5 py-1 transition-all ${
                unit === 'F'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              °F
            </span>
          </button>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Làm mới dữ liệu"
            className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/25 active:scale-90 cursor-pointer disabled:opacity-50"
          >
            <svg
              className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Search Input Bar with dropdown */}
      <div ref={searchContainerRef} className="relative w-full">
        <div className="relative flex items-center">
          <svg
            className="pointer-events-none absolute left-4 h-4 w-4 text-white/70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (searchResults.length > 0) setIsDropdownOpen(true);
            }}
            placeholder="Tìm kiếm thành phố (Hà Nội, Đà Nẵng, Tokyo, Paris...)"
            className="w-full rounded-2xl border border-white/20 bg-white/20 py-2.5 pl-11 pr-10 text-sm text-white placeholder-white/60 shadow-inner backdrop-blur-xl outline-none transition-all duration-200 focus:border-white/50 focus:bg-white/25 focus:ring-2 focus:ring-white/30"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSearchResults([]);
              }}
              className="absolute right-3 grid h-5 w-5 place-items-center rounded-full bg-white/30 text-xs text-white hover:bg-white/40 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Autocomplete Results Dropdown */}
        {isDropdownOpen && (
          <div className="absolute left-0 right-0 top-full mt-2 max-h-72 overflow-y-auto rounded-2xl border border-white/25 bg-slate-900/85 p-2 shadow-2xl backdrop-blur-2xl z-50 text-white">
            {isSearching ? (
              <div className="flex items-center justify-center gap-2 py-4 text-sm text-white/70">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Đang tìm kiếm...
              </div>
            ) : searchResults.length > 0 ? (
              <ul className="divide-y divide-white/10">
                {searchResults.map((item) => (
                  <li key={`${item.id}-${item.latitude}-${item.longitude}`}>
                    <button
                      type="button"
                      onClick={() => handleSelect(item)}
                      className="flex w-full items-center justify-between px-3 py-2.5 text-left rounded-xl transition-colors hover:bg-white/15 cursor-pointer"
                    >
                      <div>
                        <p className="text-sm font-medium text-white">{item.name}</p>
                        <p className="text-xs text-white/60">
                          {item.admin1 ? `${item.admin1}, ` : ''}
                          {item.country}
                        </p>
                      </div>
                      <span className="text-[0.7rem] text-sky-300">Chọn</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-4 text-center text-sm text-white/60">
                Không tìm thấy kết quả phù hợp
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick City Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x touch-pan-x">
        <span className="shrink-0 text-xs font-medium text-white/70">Gợi ý:</span>
        {POPULAR_LOCATIONS.slice(0, 7).map((city) => {
          const isActive = currentLocation.name === city.name;
          return (
            <button
              key={city.id}
              type="button"
              onClick={() => handleSelect(city)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-md transition-all duration-200 cursor-pointer snap-start ${
                isActive
                  ? 'bg-white text-slate-900 shadow-md scale-105 font-semibold'
                  : 'bg-white/15 text-white hover:bg-white/25 border border-white/15'
              }`}
            >
              {city.name}
            </button>
          );
        })}
      </div>
    </header>
  );
}
