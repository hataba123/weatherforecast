'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  LocationData,
  TemperatureUnit,
  WeatherData,
} from '../types/weather';
import {
  POPULAR_LOCATIONS,
  fetchWeatherForecast,
  reverseGeocode,
} from '../services/weatherApi';
import { Navbar } from '../components/Navbar';
import { WeatherHero } from '../components/WeatherHero';
import { HourlyForecastCard } from '../components/HourlyForecastCard';
import { DailyForecastCard } from '../components/DailyForecastCard';
import { FavoritesBar } from '../components/FavoritesBar';
import { UVWidget } from '../components/widgets/UVWidget';
import { WindWidget } from '../components/widgets/WindWidget';
import { SunWidget } from '../components/widgets/SunWidget';
import { HumidityWidget } from '../components/widgets/HumidityWidget';
import { AtmosphereWidget } from '../components/widgets/AtmosphereWidget';
import { PrecipitationWidget } from '../components/widgets/PrecipitationWidget';

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState<LocationData>(POPULAR_LOCATIONS[0]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>('C');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoadingGps, setIsLoadingGps] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<LocationData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Restore favorites and unit from localStorage on mount
  useEffect(() => {
    try {
      const savedUnit = localStorage.getItem('weather_unit') as TemperatureUnit;
      if (savedUnit === 'C' || savedUnit === 'F') {
        setUnit(savedUnit);
      }

      const savedFavs = localStorage.getItem('weather_favorites');
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }

      const savedLastLocation = localStorage.getItem('weather_last_location');
      if (savedLastLocation) {
        setCurrentLocation(JSON.parse(savedLastLocation));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Fetch weather data for the current location
  const loadWeather = useCallback(async (loc: LocationData, isManualRefresh = false) => {
    if (isManualRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setErrorMessage(null);

    try {
      const data = await fetchWeatherForecast(loc);
      setWeatherData(data);
      // Persist last selected location
      try {
        localStorage.setItem('weather_last_location', JSON.stringify(loc));
      } catch {
        // Ignore
      }
    } catch (err) {
      console.error('Failed to load weather:', err);
      setErrorMessage('Không thể tải dữ liệu thời tiết. Vui lòng kiểm tra kết nối mạng và thử lại.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Initial fetch and on location change
  useEffect(() => {
    loadWeather(currentLocation);
  }, [currentLocation, loadWeather]);

  // Handle unit switch
  const handleToggleUnit = () => {
    const nextUnit: TemperatureUnit = unit === 'C' ? 'F' : 'C';
    setUnit(nextUnit);
    try {
      localStorage.setItem('weather_unit', nextUnit);
    } catch {
      // Ignore
    }
  };

  // Handle location selection
  const handleSelectLocation = (loc: LocationData) => {
    setCurrentLocation(loc);
  };

  // Handle GPS Geolocation
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Trình duyệt của bạn không hỗ trợ định vị GPS.');
      return;
    }

    setIsLoadingGps(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        try {
          const loc = await reverseGeocode(lat, lon);
          setCurrentLocation(loc);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoadingGps(false);
        }
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setIsLoadingGps(false);
        alert('Không thể truy cập định vị GPS. Vui lòng cho phép quyền vị trí trong trình duyệt.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Handle favorite toggling
  const handleToggleFavorite = (loc: LocationData) => {
    const exists = favorites.some((f) => f.name === loc.name);
    let updated: LocationData[];
    if (exists) {
      updated = favorites.filter((f) => f.name !== loc.name);
    } else {
      updated = [...favorites, loc];
    }
    setFavorites(updated);
    try {
      localStorage.setItem('weather_favorites', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const isCurrentFavorite = favorites.some((f) => f.name === currentLocation.name);

  // Background gradient dynamic styling
  const gradientClass = weatherData?.condition?.theme?.bgGradient
    ? weatherData.condition.theme.bgGradient
    : 'from-sky-600 via-blue-700 to-indigo-900';

  return (
    <main
      className={`relative min-h-screen w-full bg-gradient-to-b ${gradientClass} transition-colors duration-1000 ease-in-out text-white overflow-hidden pb-12`}
    >
      {/* iOS Ambient Light Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[450px] w-[700px] rounded-full bg-white/10 blur-[100px]" />
      <div className="pointer-events-none absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-sky-400/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 -left-24 h-96 w-96 rounded-full bg-indigo-500/15 blur-[120px]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        {/* Navigation Bar */}
        <Navbar
          currentLocation={currentLocation}
          onSelectLocation={handleSelectLocation}
          onUseCurrentLocation={handleUseCurrentLocation}
          isLoadingLocation={isLoadingGps}
          unit={unit}
          onToggleUnit={handleToggleUnit}
          onRefresh={() => loadWeather(currentLocation, true)}
          isRefreshing={isRefreshing}
          lastUpdated={weatherData?.lastUpdated || ''}
        />

        {/* Favorites Bar */}
        <div className="mt-3">
          <FavoritesBar
            favorites={favorites}
            currentLocation={currentLocation}
            onSelectLocation={handleSelectLocation}
            onToggleFavorite={handleToggleFavorite}
            isCurrentFavorite={isCurrentFavorite}
          />
        </div>

        {/* Main Weather Content */}
        {isLoading && !weatherData ? (
          /* iOS-style Skeleton Loader */
          <div className="mt-8 flex flex-1 flex-col items-center justify-center animate-pulse gap-6">
            <div className="h-8 w-48 rounded-full bg-white/20" />
            <div className="h-28 w-52 rounded-3xl bg-white/20" />
            <div className="h-6 w-36 rounded-full bg-white/20" />
            <div className="h-40 w-full rounded-[2rem] bg-white/15 backdrop-blur-md" />
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="h-44 rounded-[2rem] bg-white/15 backdrop-blur-md" />
              <div className="h-44 rounded-[2rem] bg-white/15 backdrop-blur-md" />
            </div>
          </div>
        ) : errorMessage ? (
          /* Error Screen */
          <div className="my-auto flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-[2.5rem] border border-white/20 bg-white/15 p-8 shadow-2xl backdrop-blur-2xl max-w-md">
              <span className="text-5xl">⚠️</span>
              <h2 className="mt-4 font-display text-2xl font-semibold text-white">
                Không thể kết nối
              </h2>
              <p className="mt-2 text-sm text-white/80">{errorMessage}</p>
              <button
                type="button"
                onClick={() => loadWeather(currentLocation)}
                className="mt-6 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                Thử lại ngay
              </button>
            </div>
          </div>
        ) : weatherData ? (
          <>
            {/* Hero Weather Section */}
            <WeatherHero
              location={weatherData.location}
              current={weatherData.current}
              condition={weatherData.condition}
              tempMax={weatherData.daily[0]?.tempMax ?? weatherData.current.temperature}
              tempMin={weatherData.daily[0]?.tempMin ?? weatherData.current.temperature}
              unit={unit}
            />

            {/* Responsive Forecast & Bento Grid */}
            <div className="mt-6 grid flex-1 gap-6 xl:grid-cols-[1.25fr_1fr]">
              {/* Left Column: 24h Hourly & Bento Grid */}
              <div className="flex flex-col gap-6">
                {/* 24h Hourly Slider */}
                <HourlyForecastCard hourly={weatherData.hourly} unit={unit} />

                {/* iOS Bento Grid: Air & Environmental Metrics */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <UVWidget uvIndex={weatherData.current.uvIndex} />
                  <WindWidget
                    windSpeed={weatherData.current.windSpeed}
                    windDirection={weatherData.current.windDirection}
                  />
                  <SunWidget
                    sunrise={weatherData.daily[0]?.sunrise || '05:45'}
                    sunset={weatherData.daily[0]?.sunset || '17:58'}
                  />
                  <HumidityWidget
                    humidity={weatherData.current.relativeHumidity}
                    dewPoint={weatherData.current.dewPoint}
                  />
                </div>

                {/* Visibility & Atmospheric Pressure */}
                <AtmosphereWidget
                  visibilityKm={weatherData.current.visibilityKm}
                  pressureHpa={weatherData.current.surfacePressure}
                />

                {/* Rain & Precipitation */}
                <PrecipitationWidget
                  precipitationMm={weatherData.daily[0]?.precipitationSum ?? 0}
                  rainProbabilityMax={
                    weatherData.daily[0]?.precipitationProbability ?? 0
                  }
                />
              </div>

              {/* Right Column: 7-Day Forecast */}
              <div className="flex flex-col gap-6">
                <DailyForecastCard
                  daily={weatherData.daily}
                  weekMinTemp={weatherData.weekMinTemp}
                  weekMaxTemp={weatherData.weekMaxTemp}
                  currentTemp={weatherData.current.temperature}
                  unit={unit}
                />

                {/* iOS Air Quality & Comfort Insight Card */}
                <div className="rounded-[2rem] border border-white/20 bg-white/15 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.12)] backdrop-blur-2xl">
                  <div className="flex items-center gap-2 text-white/70">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                      Đánh giá tổng quan
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold text-white">
                    {weatherData.condition.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/85">
                    {weatherData.condition.description}. Độ ẩm không khí ở mức{' '}
                    {weatherData.current.relativeHumidity}%, gió thổi với tốc độ{' '}
                    {Math.round(weatherData.current.windSpeed)} km/h. Thích hợp cho các kế hoạch sinh hoạt và di chuyển.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-white/20 px-3 py-1 font-medium backdrop-blur-md">
                      Tầm nhìn: {weatherData.current.visibilityKm} km
                    </span>
                    <span className="rounded-full bg-white/20 px-3 py-1 font-medium backdrop-blur-md">
                      Áp suất: {weatherData.current.surfacePressure} hPa
                    </span>
                    <span className="rounded-full bg-white/20 px-3 py-1 font-medium backdrop-blur-md">
                      Cập nhật: {weatherData.lastUpdated}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {/* Apple iOS Clean Footer */}
        <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/10 px-5 py-3.5 text-xs text-white/70 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>Thời tiết trực tuyến thời gian thực</span>
          </div>
          <div>
            Dữ liệu cung cấp bởi Open-Meteo • Thiết kế phong cách Apple iOS
          </div>
        </footer>
      </div>
    </main>
  );
}
