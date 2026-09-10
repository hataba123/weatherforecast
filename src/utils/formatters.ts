import { TemperatureUnit } from '../types/weather';

export function formatTemp(celsius: number, unit: TemperatureUnit = 'C'): string {
  const value = unit === 'F' ? Math.round((celsius * 9) / 5 + 32) : Math.round(celsius);
  return `${value}°`;
}

export function toDisplayTemp(celsius: number, unit: TemperatureUnit = 'C'): number {
  return unit === 'F' ? Math.round((celsius * 9) / 5 + 32) : Math.round(celsius);
}

export function formatTime(isoOrTimeStr: string): string {
  if (!isoOrTimeStr) return '--:--';
  // Handle ISO string or "YYYY-MM-DDTHH:mm"
  if (isoOrTimeStr.includes('T')) {
    const timePart = isoOrTimeStr.split('T')[1];
    return timePart.substring(0, 5);
  }
  // If already "HH:mm"
  return isoOrTimeStr.substring(0, 5);
}

export function formatDateLabel(dateStr: string, index: number): { dayLabel: string; fullDateLabel: string } {
  if (index === 0) {
    const parts = dateStr.split('-');
    return {
      dayLabel: 'Hôm nay',
      fullDateLabel: parts.length === 3 ? `${parts[2]}/${parts[1]}` : dateStr,
    };
  }

  const d = new Date(dateStr + 'T00:00:00');
  const days = ['CN', 'T.Hai', 'T.Ba', 'T.Tư', 'T.Năm', 'T.Sáu', 'T.Bảy'];
  const dayName = days[d.getDay()] || 'T.Hai';

  const parts = dateStr.split('-');
  const dateShort = parts.length === 3 ? `${parts[2]}/${parts[1]}` : dateStr;

  return {
    dayLabel: dayName,
    fullDateLabel: dateShort,
  };
}

export function getWindDirection(degrees: number): { label: string; angle: number } {
  const normalized = ((degrees % 360) + 360) % 360;
  const directions = [
    { label: 'Bắc', min: 337.5, max: 360 },
    { label: 'Bắc', min: 0, max: 22.5 },
    { label: 'Đông Bắc', min: 22.5, max: 67.5 },
    { label: 'Đông', min: 67.5, max: 112.5 },
    { label: 'Đông Nam', min: 112.5, max: 157.5 },
    { label: 'Nam', min: 157.5, max: 202.5 },
    { label: 'Tây Nam', min: 202.5, max: 247.5 },
    { label: 'Tây', min: 247.5, max: 292.5 },
    { label: 'Tây Bắc', min: 292.5, max: 337.5 },
  ];

  const matched = directions.find((d) => normalized >= d.min && normalized < d.max);
  return {
    label: matched ? matched.label : 'Gió xoay',
    angle: normalized,
  };
}

export function getUVCategory(uv: number): {
  level: string;
  color: string;
  advice: string;
  percentage: number;
} {
  const capped = Math.max(0, Math.min(uv, 12));
  const percentage = Math.round((capped / 12) * 100);

  if (uv <= 2) {
    return {
      level: 'Thấp',
      color: 'bg-emerald-400 text-emerald-950',
      advice: 'An toàn cho hoạt động ngoài trời, không cần che chắn đặc biệt.',
      percentage,
    };
  } else if (uv <= 5) {
    return {
      level: 'Trung bình',
      color: 'bg-yellow-400 text-yellow-950',
      advice: 'Nên đeo kính râm và thoa kem chống nắng nếu ra ngoài lúc giữa trưa.',
      percentage,
    };
  } else if (uv <= 7) {
    return {
      level: 'Cao',
      color: 'bg-orange-400 text-orange-950',
      advice: 'Bức xạ mạnh. Cần che chắn kỹ, tìm bóng râm vào giờ cao điểm 11h - 15h.',
      percentage,
    };
  } else if (uv <= 10) {
    return {
      level: 'Rất cao',
      color: 'bg-red-500 text-white',
      advice: 'Nguy cơ gây hại da nhanh chóng. Hạn chế tiếp xúc trực tiếp với ánh nắng.',
      percentage,
    };
  } else {
    return {
      level: 'Cực đoan',
      color: 'bg-purple-600 text-white',
      advice: 'Mức nguy hiểm cực độ. Tránh ra ngoài khi trời nắng gắt.',
      percentage,
    };
  }
}

export function calculateDewPoint(tempCelsius: number, relativeHumidity: number): number {
  // Magnus formula approximation
  const a = 17.27;
  const b = 237.7;
  const alpha = ((a * tempCelsius) / (b + tempCelsius)) + Math.log(relativeHumidity / 100);
  const dewPoint = (b * alpha) / (a - alpha);
  return Math.round(dewPoint * 10) / 10;
}

export function getHumidityStatus(percent: number): { label: string; desc: string } {
  if (percent < 40) {
    return { label: 'Không khí khô', desc: 'Độ ẩm thấp, nên uống nhiều nước bổ sung.' };
  } else if (percent <= 70) {
    return { label: 'Dễ chịu', desc: 'Độ ẩm lý tưởng, cơ thể cảm thấy thoải mái.' };
  } else {
    return { label: 'Khá ẩm', desc: 'Độ ẩm cao, mồ hôi khó bốc hơi nhanh.' };
  }
}

export function getPressureStatus(hPa: number): { label: string; desc: string } {
  if (hPa < 1005) {
    return { label: 'Áp suất thấp', desc: 'Vùng khí áp thấp, khả năng có mưa hoặc gió lớn.' };
  } else if (hPa <= 1018) {
    return { label: 'Bình thường', desc: 'Khí áp ổn định, thời tiết thuận lợi.' };
  } else {
    return { label: 'Áp suất cao', desc: 'Vùng áp cao, trời quang và hanh khô.' };
  }
}
