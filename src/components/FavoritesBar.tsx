'use client';

import React from 'react';
import { LocationData } from '../types/weather';

interface FavoritesBarProps {
  favorites: LocationData[];
  currentLocation: LocationData;
  onSelectLocation: (loc: LocationData) => void;
  onToggleFavorite: (loc: LocationData) => void;
  isCurrentFavorite: boolean;
}

export function FavoritesBar({
  favorites,
  currentLocation,
  onSelectLocation,
  onToggleFavorite,
  isCurrentFavorite,
}: FavoritesBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        {/* Bookmark / Star button for current location */}
        <button
          type="button"
          onClick={() => onToggleFavorite(currentLocation)}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md transition-all duration-200 cursor-pointer ${
            isCurrentFavorite
              ? 'bg-amber-400 text-amber-950 shadow-sm'
              : 'border border-white/25 bg-white/15 text-white hover:bg-white/25'
          }`}
          title={isCurrentFavorite ? 'Xóa khỏi yêu thích' : 'Lưu vào yêu thích'}
        >
          <svg
            className="h-3.5 w-3.5"
            fill={isCurrentFavorite ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <span>{isCurrentFavorite ? 'Đã lưu' : 'Lưu thành phố'}</span>
        </button>

        <span className="text-xs text-white/60">|</span>
        <span className="text-xs font-medium text-white/70">Đã lưu ({favorites.length}):</span>
      </div>

      {/* Saved Cities list */}
      <div className="flex flex-wrap items-center gap-2">
        {favorites.length === 0 ? (
          <span className="text-xs text-white/50 italic">
            Chưa có thành phố nào được lưu.
          </span>
        ) : (
          favorites.map((city) => {
            const isSelected = city.name === currentLocation.name;
            return (
              <div
                key={city.id}
                className="group flex items-center rounded-full border border-white/20 bg-white/15 pl-3 pr-1 py-0.5 text-xs text-white backdrop-blur-md transition-all hover:bg-white/25"
              >
                <button
                  type="button"
                  onClick={() => onSelectLocation(city)}
                  className={`cursor-pointer ${
                    isSelected ? 'font-bold text-amber-300' : 'text-white'
                  }`}
                >
                  {city.name}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(city);
                  }}
                  title={`Xóa ${city.name}`}
                  className="ml-1.5 grid h-4 w-4 place-items-center rounded-full text-white/60 hover:bg-white/30 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
