'use client';

import React from 'react';
import { WeatherIconType } from '../types/weather';

interface WeatherIconProps {
  type: WeatherIconType;
  className?: string;
  size?: number;
}

export function WeatherIcon({ type, className = '', size = 32 }: WeatherIconProps) {
  const pixelSize = `${size}px`;

  switch (type) {
    case 'clear-day':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-[0_4px_12px_rgba(251,191,36,0.5)] transition-transform duration-300 hover:scale-110 ${className}`}
        >
          <circle cx="24" cy="24" r="11" fill="url(#sun-grad)" />
          <g stroke="url(#sun-ray-grad)" strokeWidth="3" strokeLinecap="round">
            <line x1="24" y1="4" x2="24" y2="8" />
            <line x1="24" y1="40" x2="24" y2="44" />
            <line x1="4" y1="24" x2="8" y2="24" />
            <line x1="40" y1="24" x2="44" y2="24" />
            <line x1="9.8" y1="9.8" x2="12.6" y2="12.6" />
            <line x1="35.4" y1="35.4" x2="38.2" y2="38.2" />
            <line x1="9.8" y1="38.2" x2="12.6" y2="35.4" />
            <line x1="35.4" y1="12.6" x2="38.2" y2="9.8" />
          </g>
          <defs>
            <linearGradient id="sun-grad" x1="13" y1="13" x2="35" y2="35" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE047" />
              <stop offset="1" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="sun-ray-grad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FBBF24" />
              <stop offset="1" stopColor="#D97706" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'clear-night':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-[0_4px_12px_rgba(192,132,252,0.4)] transition-transform duration-300 hover:scale-110 ${className}`}
        >
          <path
            d="M34 26.5C33.2 32.8 27.6 37.6 21 37.6C13.8 37.6 8 31.8 8 24.6C8 18 12.8 12.4 19.1 11.6C17.7 13.9 17 16.6 17 19.5C17 26.4 22.6 32 29.5 32C31.1 32 32.6 31.5 34 26.5Z"
            fill="url(#moon-grad)"
          />
          <circle cx="34" cy="12" r="1.5" fill="#E9D5FF" opacity="0.8" />
          <circle cx="39" cy="19" r="1" fill="#E9D5FF" opacity="0.6" />
          <circle cx="28" cy="8" r="1" fill="#E9D5FF" opacity="0.7" />
          <defs>
            <linearGradient id="moon-grad" x1="10" y1="12" x2="34" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F5D0FE" />
              <stop offset="0.6" stopColor="#C084FC" />
              <stop offset="1" stopColor="#9333EA" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'partly-cloudy-day':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-[0_4px_12px_rgba(56,189,248,0.3)] transition-transform duration-300 hover:scale-110 ${className}`}
        >
          <circle cx="31" cy="18" r="9" fill="url(#pcloud-sun)" />
          <path
            d="M17 38C12.6 38 9 34.4 9 30C9 26.1 11.8 22.9 15.6 22.2C16.8 17.5 21.1 14 26.2 14C32.4 14 37.5 18.8 38 24.9C40.9 25.7 43 28.3 43 31.5C43 35.1 40.1 38 36.5 38H17Z"
            fill="url(#cloud-grad-light)"
          />
          <defs>
            <linearGradient id="pcloud-sun" x1="22" y1="9" x2="40" y2="27" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE047" />
              <stop offset="1" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="cloud-grad-light" x1="9" y1="14" x2="43" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.7" stopColor="#F1F5F9" />
              <stop offset="1" stopColor="#CBD5E1" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'partly-cloudy-night':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-[0_4px_12px_rgba(148,163,184,0.3)] transition-transform duration-300 hover:scale-110 ${className}`}
        >
          <path
            d="M32 15C31.5 18.5 28.5 21 25 21C24.2 21 23.4 20.8 22.7 20.5C23.5 17 26.2 14.5 29.5 14C30.4 14 31.2 14.4 32 15Z"
            fill="#E9D5FF"
          />
          <path
            d="M17 38C12.6 38 9 34.4 9 30C9 26.1 11.8 22.9 15.6 22.2C16.8 17.5 21.1 14 26.2 14C32.4 14 37.5 18.8 38 24.9C40.9 25.7 43 28.3 43 31.5C43 35.1 40.1 38 36.5 38H17Z"
            fill="url(#cloud-night-grad)"
          />
          <defs>
            <linearGradient id="cloud-night-grad" x1="9" y1="14" x2="43" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F8FAFC" />
              <stop offset="0.8" stopColor="#94A3B8" />
              <stop offset="1" stopColor="#64748B" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'cloudy':
    case 'overcast':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-[0_4px_12px_rgba(100,116,139,0.3)] transition-transform duration-300 hover:scale-110 ${className}`}
        >
          <path
            d="M21 28C18.2 28 16 25.8 16 23C16 20.5 17.8 18.5 20.2 18.1C21 15.1 23.7 13 27 13C30.9 13 34.1 16.1 34.4 20C36.3 20.5 37.7 22.1 37.7 24.1C37.7 26.3 35.9 28 33.7 28H21Z"
            fill="#94A3B8"
            opacity="0.6"
          />
          <path
            d="M15 40C10.6 40 7 36.4 7 32C7 28.1 9.8 24.9 13.6 24.2C14.8 19.5 19.1 16 24.2 16C30.4 16 35.5 20.8 36 26.9C38.9 27.7 41 30.3 41 33.5C41 37.1 38.1 40 34.5 40H15Z"
            fill="url(#overcast-grad)"
          />
          <defs>
            <linearGradient id="overcast-grad" x1="7" y1="16" x2="41" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F1F5F9" />
              <stop offset="0.6" stopColor="#CBD5E1" />
              <stop offset="1" stopColor="#94A3B8" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'fog':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-[0_4px_12px_rgba(148,163,184,0.3)] transition-transform duration-300 hover:scale-110 ${className}`}
        >
          <path
            d="M16 26C12.7 26 10 23.3 10 20C10 17.1 12.1 14.7 15 14.1C15.9 10.6 19.1 8 23 8C27.6 8 31.4 11.5 31.9 16C34.1 16.6 35.7 18.5 35.7 21C35.7 23.8 33.5 26 30.7 26H16Z"
            fill="#CBD5E1"
            opacity="0.8"
          />
          <line x1="8" y1="32" x2="40" y2="32" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
          <line x1="12" y1="38" x2="36" y2="38" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
          <line x1="15" y1="44" x2="33" y2="44" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'drizzle':
    case 'rain':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-[0_4px_12px_rgba(56,189,248,0.4)] transition-transform duration-300 hover:scale-110 ${className}`}
        >
          <path
            d="M15 28C10.6 28 7 24.4 7 20C7 16.1 9.8 12.9 13.6 12.2C14.8 7.5 19.1 4 24.2 4C30.4 4 35.5 8.8 36 14.9C38.9 15.7 41 18.3 41 21.5C41 25.1 38.1 28 34.5 28H15Z"
            fill="url(#rain-cloud-grad)"
          />
          <line x1="15" y1="34" x2="13" y2="41" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          <line x1="24" y1="34" x2="22" y2="43" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
          <line x1="33" y1="34" x2="31" y2="41" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          <defs>
            <linearGradient id="rain-cloud-grad" x1="7" y1="4" x2="41" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F8FAFC" />
              <stop offset="0.7" stopColor="#94A3B8" />
              <stop offset="1" stopColor="#64748B" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'heavy-rain':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-[0_4px_12px_rgba(2,132,199,0.5)] transition-transform duration-300 hover:scale-110 ${className}`}
        >
          <path
            d="M15 26C10.6 26 7 22.4 7 18C7 14.1 9.8 10.9 13.6 10.2C14.8 5.5 19.1 2 24.2 2C30.4 2 35.5 6.8 36 12.9C38.9 13.7 41 16.3 41 19.5C41 23.1 38.1 26 34.5 26H15Z"
            fill="url(#heavy-cloud-grad)"
          />
          <line x1="13" y1="31" x2="10" y2="41" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
          <line x1="20" y1="32" x2="17" y2="44" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          <line x1="28" y1="31" x2="25" y2="42" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
          <line x1="35" y1="32" x2="32" y2="43" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          <defs>
            <linearGradient id="heavy-cloud-grad" x1="7" y1="2" x2="41" y2="26" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E2E8F0" />
              <stop offset="0.6" stopColor="#64748B" />
              <stop offset="1" stopColor="#334155" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'thunderstorm':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-[0_4px_14px_rgba(234,179,8,0.5)] transition-transform duration-300 hover:scale-110 ${className}`}
        >
          <path
            d="M15 26C10.6 26 7 22.4 7 18C7 14.1 9.8 10.9 13.6 10.2C14.8 5.5 19.1 2 24.2 2C30.4 2 35.5 6.8 36 12.9C38.9 13.7 41 16.3 41 19.5C41 23.1 38.1 26 34.5 26H15Z"
            fill="url(#storm-cloud-grad)"
          />
          <path
            d="M26 25L18 36H24L22 46L32 33H25L26 25Z"
            fill="url(#lightning-grad)"
            stroke="#FEF08A"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="storm-cloud-grad" x1="7" y1="2" x2="41" y2="26" gradientUnits="userSpaceOnUse">
              <stop stopColor="#CBD5E1" />
              <stop offset="0.6" stopColor="#475569" />
              <stop offset="1" stopColor="#1E293B" />
            </linearGradient>
            <linearGradient id="lightning-grad" x1="22" y1="25" x2="27" y2="46" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FEF08A" />
              <stop offset="0.5" stopColor="#FACC15" />
              <stop offset="1" stopColor="#EAB308" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'snow':
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-[0_4px_12px_rgba(224,242,254,0.6)] transition-transform duration-300 hover:scale-110 ${className}`}
        >
          <path
            d="M15 26C10.6 26 7 22.4 7 18C7 14.1 9.8 10.9 13.6 10.2C14.8 5.5 19.1 2 24.2 2C30.4 2 35.5 6.8 36 12.9C38.9 13.7 41 16.3 41 19.5C41 23.1 38.1 26 34.5 26H15Z"
            fill="url(#snow-cloud-grad)"
          />
          <g stroke="#BAE6FD" strokeWidth="2.5" strokeLinecap="round">
            <line x1="16" y1="33" x2="16" y2="41" />
            <line x1="12" y1="37" x2="20" y2="37" />
            <line x1="30" y1="33" x2="30" y2="41" />
            <line x1="26" y1="37" x2="34" y2="37" />
          </g>
          <defs>
            <linearGradient id="snow-cloud-grad" x1="7" y1="2" x2="41" y2="26" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.7" stopColor="#E2E8F0" />
              <stop offset="1" stopColor="#94A3B8" />
            </linearGradient>
          </defs>
        </svg>
      );

    default:
      return (
        <svg
          width={pixelSize}
          height={pixelSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
        >
          <circle cx="24" cy="24" r="12" fill="#FDE047" />
        </svg>
      );
  }
}
