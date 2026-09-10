import { WeatherConditionMeta, WeatherIconType } from '../types/weather';

export function getWeatherCondition(code: number, isDay: boolean = true): WeatherConditionMeta {
  // WMO Weather interpretation codes (WW)
  // 0: Clear sky
  // 1, 2, 3: Mainly clear, partly cloudy, and overcast
  // 45, 48: Fog and depositing rime fog
  // 51, 53, 55: Drizzle: Light, moderate, and dense intensity
  // 56, 57: Freezing Drizzle: Light and dense intensity
  // 61, 63, 65: Rain: Slight, moderate and heavy intensity
  // 66, 67: Freezing Rain: Light and heavy intensity
  // 71, 73, 75: Snow fall: Slight, moderate, and heavy intensity
  // 77: Snow grains
  // 80, 81, 82: Rain showers: Slight, moderate, and violent
  // 85, 86: Snow showers slight and heavy
  // 95: Thunderstorm: Slight or moderate
  // 96, 99: Thunderstorm with slight and heavy hail

  switch (code) {
    case 0: // Clear sky
      return {
        label: isDay ? 'Trời quang đãng' : 'Đêm quang đãng',
        iconType: isDay ? 'clear-day' : 'clear-night',
        description: isDay ? 'Trời trong xanh, tầm nhìn tuyệt vời' : 'Bầu trời quang đãng, thấy rõ trăng sao',
        theme: isDay
          ? {
              bgGradient: 'from-sky-500 via-blue-600 to-indigo-700',
              cardBg: 'bg-white/15',
              cardBorder: 'border-white/25',
              accentGlow: 'rgba(56, 189, 248, 0.4)',
              statusColor: 'text-amber-300',
            }
          : {
              bgGradient: 'from-slate-950 via-slate-900 to-indigo-950',
              cardBg: 'bg-white/10',
              cardBorder: 'border-white/15',
              accentGlow: 'rgba(99, 102, 241, 0.3)',
              statusColor: 'text-indigo-300',
            },
      };

    case 1: // Mainly clear
      return {
        label: isDay ? 'Nắng nhẹ' : 'Đêm ít mây',
        iconType: isDay ? 'clear-day' : 'clear-night',
        description: isDay ? 'Trời nắng dịu, có vài dải mây mỏng' : 'Trời trong, thỉnh thoảng có mây lướt qua',
        theme: isDay
          ? {
              bgGradient: 'from-sky-400 via-blue-500 to-indigo-600',
              cardBg: 'bg-white/15',
              cardBorder: 'border-white/25',
              accentGlow: 'rgba(56, 189, 248, 0.35)',
              statusColor: 'text-amber-200',
            }
          : {
              bgGradient: 'from-slate-950 via-slate-900 to-slate-800',
              cardBg: 'bg-white/10',
              cardBorder: 'border-white/15',
              accentGlow: 'rgba(148, 163, 184, 0.25)',
              statusColor: 'text-sky-200',
            },
      };

    case 2: // Partly cloudy
      return {
        label: isDay ? 'Mây rải rác' : 'Đêm mây rải rác',
        iconType: isDay ? 'partly-cloudy-day' : 'partly-cloudy-night',
        description: isDay ? 'Nắng xen kẽ các cụm mây trắng' : 'Trăng sao lấp ló sau những cụm mây',
        theme: isDay
          ? {
              bgGradient: 'from-blue-500 via-sky-500 to-teal-600',
              cardBg: 'bg-white/15',
              cardBorder: 'border-white/25',
              accentGlow: 'rgba(56, 189, 248, 0.35)',
              statusColor: 'text-sky-100',
            }
          : {
              bgGradient: 'from-slate-950 via-slate-900 to-cyan-950',
              cardBg: 'bg-white/10',
              cardBorder: 'border-white/15',
              accentGlow: 'rgba(6, 182, 212, 0.25)',
              statusColor: 'text-cyan-200',
            },
      };

    case 3: // Overcast
      return {
        label: 'Nhiều mây âm u',
        iconType: 'overcast',
        description: 'Mây che phủ phần lớn bầu trời, ánh nắng mờ',
        theme: {
          bgGradient: 'from-slate-600 via-slate-700 to-slate-800',
          cardBg: 'bg-white/12',
          cardBorder: 'border-white/20',
          accentGlow: 'rgba(148, 163, 184, 0.3)',
          statusColor: 'text-slate-200',
        },
      };

    case 45:
    case 48: // Fog
      return {
        label: 'Sương mù dày',
        iconType: 'fog',
        description: 'Độ ẩm không khí cao, hạn chế tầm nhìn xa',
        theme: {
          bgGradient: 'from-slate-500 via-slate-600 to-zinc-700',
          cardBg: 'bg-white/15',
          cardBorder: 'border-white/20',
          accentGlow: 'rgba(203, 213, 225, 0.3)',
          statusColor: 'text-slate-200',
        },
      };

    case 51:
    case 53:
    case 55:
    case 56:
    case 57: // Drizzle
      return {
        label: 'Mưa phùn rải rác',
        iconType: 'drizzle',
        description: 'Mưa hạt nhỏ li ti, mặt đường ẩm ướt',
        theme: {
          bgGradient: 'from-slate-700 via-sky-800 to-slate-900',
          cardBg: 'bg-white/12',
          cardBorder: 'border-white/20',
          accentGlow: 'rgba(56, 189, 248, 0.3)',
          statusColor: 'text-sky-300',
        },
      };

    case 61:
    case 63: // Slight / moderate rain
    case 80:
    case 81: // Rain showers
      return {
        label: 'Mưa rào',
        iconType: 'rain',
        description: 'Có mưa rào xuất hiện, nên chuẩn bị áo mưa',
        theme: {
          bgGradient: 'from-slate-800 via-cyan-900 to-slate-950',
          cardBg: 'bg-white/12',
          cardBorder: 'border-white/20',
          accentGlow: 'rgba(14, 165, 233, 0.35)',
          statusColor: 'text-cyan-300',
        },
      };

    case 65: // Heavy rain
    case 82: // Violent rain showers
      return {
        label: 'Mưa rất to',
        iconType: 'heavy-rain',
        description: 'Mưa dồn dập, đề phòng ngập úng các điểm trũng',
        theme: {
          bgGradient: 'from-slate-900 via-blue-950 to-slate-950',
          cardBg: 'bg-white/10',
          cardBorder: 'border-white/20',
          accentGlow: 'rgba(37, 99, 235, 0.4)',
          statusColor: 'text-blue-300',
        },
      };

    case 95:
    case 96:
    case 99: // Thunderstorm
      return {
        label: 'Giông bão có sấm sét',
        iconType: 'thunderstorm',
        description: 'Cơn giông mạnh kèm sấm chớp và gió giật',
        theme: {
          bgGradient: 'from-slate-950 via-purple-950 to-slate-900',
          cardBg: 'bg-white/10',
          cardBorder: 'border-purple-300/25',
          accentGlow: 'rgba(168, 85, 247, 0.4)',
          statusColor: 'text-amber-300',
        },
      };

    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86: // Snow
      return {
        label: 'Tuyết rơi',
        iconType: 'snow',
        description: 'Tuyết đang rơi nhẹ, nhiệt độ xuống mức băng giá',
        theme: {
          bgGradient: 'from-cyan-700 via-sky-800 to-indigo-900',
          cardBg: 'bg-white/15',
          cardBorder: 'border-white/30',
          accentGlow: 'rgba(186, 230, 253, 0.4)',
          statusColor: 'text-sky-200',
        },
      };

    default:
      return {
        label: 'Thời tiết thay đổi',
        iconType: isDay ? 'partly-cloudy-day' : 'partly-cloudy-night',
        description: 'Thời tiết ôn hòa, điều kiện nhìn chung ổn định',
        theme: isDay
          ? {
              bgGradient: 'from-sky-500 via-blue-600 to-indigo-700',
              cardBg: 'bg-white/15',
              cardBorder: 'border-white/25',
              accentGlow: 'rgba(56, 189, 248, 0.35)',
              statusColor: 'text-white',
            }
          : {
              bgGradient: 'from-slate-950 via-slate-900 to-indigo-950',
              cardBg: 'bg-white/10',
              cardBorder: 'border-white/15',
              accentGlow: 'rgba(99, 102, 241, 0.3)',
              statusColor: 'text-indigo-200',
            },
      };
  }
}
