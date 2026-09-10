import {
  CurrentWeather,
  DailyForecastItem,
  HourlyForecastItem,
  LocationData,
  WeatherData,
} from '../types/weather';
import { formatDateLabel, formatTime, calculateDewPoint } from '../utils/formatters';
import { getWeatherCondition } from '../utils/weatherCodes';

export const POPULAR_LOCATIONS: LocationData[] = [
  {
    id: 'hcm',
    name: 'TP. Hồ Chí Minh',
    admin1: 'Đông Nam Bộ',
    country: 'Việt Nam',
    countryCode: 'VN',
    latitude: 10.8231,
    longitude: 106.6297,
    timezone: 'Asia/Ho_Chi_Minh',
  },
  {
    id: 'hanoi',
    name: 'Hà Nội',
    admin1: 'Đồng bằng sông Hồng',
    country: 'Việt Nam',
    countryCode: 'VN',
    latitude: 21.0285,
    longitude: 105.8542,
    timezone: 'Asia/Ho_Chi_Minh',
  },
  {
    id: 'danang',
    name: 'Đà Nẵng',
    admin1: 'Duyên hải Nam Trung Bộ',
    country: 'Việt Nam',
    countryCode: 'VN',
    latitude: 16.0544,
    longitude: 108.2022,
    timezone: 'Asia/Ho_Chi_Minh',
  },
  {
    id: 'cantho',
    name: 'Cần Thơ',
    admin1: 'Đồng bằng sông Cửu Long',
    country: 'Việt Nam',
    countryCode: 'VN',
    latitude: 10.0452,
    longitude: 105.7469,
    timezone: 'Asia/Ho_Chi_Minh',
  },
  {
    id: 'haiphong',
    name: 'Hải Phòng',
    admin1: 'Duyên hải Bắc Bộ',
    country: 'Việt Nam',
    countryCode: 'VN',
    latitude: 20.8449,
    longitude: 106.6881,
    timezone: 'Asia/Ho_Chi_Minh',
  },
  {
    id: 'dalat',
    name: 'Đà Lạt',
    admin1: 'Lâm Đồng',
    country: 'Việt Nam',
    countryCode: 'VN',
    latitude: 11.9404,
    longitude: 108.4583,
    timezone: 'Asia/Ho_Chi_Minh',
  },
  {
    id: 'nhatrang',
    name: 'Nha Trang',
    admin1: 'Khánh Hòa',
    country: 'Việt Nam',
    countryCode: 'VN',
    latitude: 12.2388,
    longitude: 109.1967,
    timezone: 'Asia/Ho_Chi_Minh',
  },
  {
    id: 'hue',
    name: 'Huế',
    admin1: 'Thừa Thiên Huế',
    country: 'Việt Nam',
    countryCode: 'VN',
    latitude: 16.4637,
    longitude: 107.5909,
    timezone: 'Asia/Ho_Chi_Minh',
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    admin1: 'Tokyo',
    country: 'Nhật Bản',
    countryCode: 'JP',
    latitude: 35.6762,
    longitude: 139.6503,
    timezone: 'Asia/Tokyo',
  },
  {
    id: 'paris',
    name: 'Paris',
    admin1: 'Île-de-France',
    country: 'Pháp',
    countryCode: 'FR',
    latitude: 48.8566,
    longitude: 2.3522,
    timezone: 'Europe/Paris',
  },
];

export async function searchLocations(query: string): Promise<LocationData[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) {
    return [];
  }

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      trimmed
    )}&count=8&language=vi&format=json`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Geocoding API error: ${res.statusText}`);
    }

    const data = await res.json();
    if (!data.results || !Array.isArray(data.results)) {
      return [];
    }

    return data.results.map((item: {
      id: number;
      name: string;
      admin1?: string;
      country: string;
      country_code?: string;
      latitude: number;
      longitude: number;
      timezone?: string;
    }) => ({
      id: item.id,
      name: item.name,
      admin1: item.admin1,
      country: item.country || '',
      countryCode: item.country_code,
      latitude: item.latitude,
      longitude: item.longitude,
      timezone: item.timezone,
    }));
  } catch (error) {
    console.error('Error searching locations:', error);
    return [];
  }
}

export async function reverseGeocode(lat: number, lon: number): Promise<LocationData> {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=vi`
    );
    if (res.ok) {
      const data = await res.json();
      const cityName =
        data.city || data.locality || data.principalSubdivision || 'Vị trí hiện tại';
      return {
        id: `gps-${lat.toFixed(4)}-${lon.toFixed(4)}`,
        name: cityName,
        admin1: data.principalSubdivision || '',
        country: data.countryName || 'Việt Nam',
        latitude: lat,
        longitude: lon,
        isCurrentLocation: true,
      };
    }
  } catch (err) {
    console.warn('Reverse geocode fallback:', err);
  }

  return {
    id: `gps-${lat.toFixed(4)}-${lon.toFixed(4)}`,
    name: 'Vị trí hiện tại',
    country: 'GPS',
    latitude: lat,
    longitude: lon,
    isCurrentLocation: true,
  };
}

export async function fetchWeatherForecast(
  location: LocationData
): Promise<WeatherData> {
  const { latitude, longitude } = location;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,uv_index&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,wind_speed_10m,uv_index,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,precipitation_sum,uv_index_max,wind_speed_10m_max&timezone=auto`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`Weather API returned status: ${res.status}`);
  }

  const raw = await res.json();

  const currentRaw = raw.current;
  const hourlyRaw = raw.hourly;
  const dailyRaw = raw.daily;

  const isDay = currentRaw.is_day === 1;
  const weatherCode = currentRaw.weather_code ?? 0;
  const condition = getWeatherCondition(weatherCode, isDay);

  const currentTemp = currentRaw.temperature_2m;
  const humidity = currentRaw.relative_humidity_2m;
  const dewPoint = calculateDewPoint(currentTemp, humidity);

  const current: CurrentWeather = {
    temperature: currentTemp,
    apparentTemperature: currentRaw.apparent_temperature ?? currentTemp,
    relativeHumidity: humidity,
    weatherCode,
    windSpeed: currentRaw.wind_speed_10m ?? 0,
    windDirection: currentRaw.wind_direction_10m ?? 0,
    surfacePressure: Math.round(currentRaw.surface_pressure ?? 1013),
    uvIndex: currentRaw.uv_index ?? 0,
    isDay,
    precipitation: currentRaw.precipitation ?? 0,
    visibilityKm: 12, // Open-Meteo standard default or estimated
    dewPoint,
  };

  // Find current hour index to give the next 24 hours
  const nowIso = new Date().toISOString();
  const currentHourPrefix = nowIso.substring(0, 13); // "YYYY-MM-DDTHH"
  let startIndex = 0;
  if (hourlyRaw && Array.isArray(hourlyRaw.time)) {
    const found = hourlyRaw.time.findIndex((t: string) => t.startsWith(currentHourPrefix));
    if (found !== -1) {
      startIndex = found;
    }
  }

  const hourly: HourlyForecastItem[] = [];
  if (hourlyRaw && Array.isArray(hourlyRaw.time)) {
    const endIndex = Math.min(startIndex + 24, hourlyRaw.time.length);
    for (let i = startIndex; i < endIndex; i++) {
      const isoTime = hourlyRaw.time[i];
      const timeStr = formatTime(isoTime);
      hourly.push({
        time: i === startIndex ? 'Bây giờ' : timeStr,
        isoTime,
        temperature: hourlyRaw.temperature_2m[i],
        apparentTemperature: hourlyRaw.apparent_temperature[i],
        rainProbability: hourlyRaw.precipitation_probability?.[i] ?? 0,
        precipitation: hourlyRaw.precipitation?.[i] ?? 0,
        weatherCode: hourlyRaw.weather_code[i] ?? 0,
        isDay: hourlyRaw.is_day?.[i] === 1,
        uvIndex: hourlyRaw.uv_index?.[i] ?? 0,
        windSpeed: hourlyRaw.wind_speed_10m?.[i] ?? 0,
      });
    }
  }

  const daily: DailyForecastItem[] = [];
  let weekMinTemp = 999;
  let weekMaxTemp = -999;

  if (dailyRaw && Array.isArray(dailyRaw.time)) {
    for (let i = 0; i < dailyRaw.time.length; i++) {
      const dateStr = dailyRaw.time[i];
      const { dayLabel, fullDateLabel } = formatDateLabel(dateStr, i);
      const wCode = dailyRaw.weather_code[i] ?? 0;
      const cond = getWeatherCondition(wCode, true);

      const maxT = dailyRaw.temperature_2m_max[i];
      const minT = dailyRaw.temperature_2m_min[i];

      if (maxT > weekMaxTemp) weekMaxTemp = maxT;
      if (minT < weekMinTemp) weekMinTemp = minT;

      daily.push({
        date: dateStr,
        dayLabel,
        fullDateLabel,
        weatherCode: wCode,
        weatherDescription: cond.label,
        tempMax: maxT,
        tempMin: minT,
        precipitationProbability: dailyRaw.precipitation_probability_max?.[i] ?? 0,
        precipitationSum: dailyRaw.precipitation_sum?.[i] ?? 0,
        uvIndexMax: dailyRaw.uv_index_max?.[i] ?? 0,
        windSpeedMax: dailyRaw.wind_speed_10m_max?.[i] ?? 0,
        sunrise: formatTime(dailyRaw.sunrise?.[i] ?? ''),
        sunset: formatTime(dailyRaw.sunset?.[i] ?? ''),
      });
    }
  }

  return {
    location,
    current,
    condition,
    hourly,
    daily,
    weekMinTemp: weekMinTemp === 999 ? 20 : weekMinTemp,
    weekMaxTemp: weekMaxTemp === -999 ? 35 : weekMaxTemp,
    lastUpdated: new Date().toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
}
