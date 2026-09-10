export type TemperatureUnit = 'C' | 'F';

export interface LocationData {
  id: string | number;
  name: string;
  admin1?: string;
  country: string;
  countryCode?: string;
  latitude: number;
  longitude: number;
  timezone?: string;
  isCurrentLocation?: boolean;
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  relativeHumidity: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  surfacePressure: number;
  uvIndex: number;
  isDay: boolean;
  precipitation: number;
  visibilityKm: number;
  dewPoint: number;
}

export interface HourlyForecastItem {
  time: string;
  isoTime: string;
  temperature: number;
  apparentTemperature: number;
  rainProbability: number;
  precipitation: number;
  weatherCode: number;
  isDay: boolean;
  uvIndex: number;
  windSpeed: number;
}

export interface DailyForecastItem {
  date: string;
  dayLabel: string;
  fullDateLabel: string;
  weatherCode: number;
  weatherDescription: string;
  tempMax: number;
  tempMin: number;
  precipitationProbability: number;
  precipitationSum: number;
  uvIndexMax: number;
  windSpeedMax: number;
  sunrise: string;
  sunset: string;
}

export type WeatherIconType =
  | 'clear-day'
  | 'clear-night'
  | 'partly-cloudy-day'
  | 'partly-cloudy-night'
  | 'cloudy'
  | 'overcast'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'heavy-rain'
  | 'thunderstorm'
  | 'snow';

export interface WeatherConditionMeta {
  label: string;
  iconType: WeatherIconType;
  description: string;
  theme: {
    bgGradient: string;
    cardBg: string;
    cardBorder: string;
    accentGlow: string;
    statusColor: string;
  };
}

export interface WeatherData {
  location: LocationData;
  current: CurrentWeather;
  condition: WeatherConditionMeta;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  weekMinTemp: number;
  weekMaxTemp: number;
  lastUpdated: string;
}
