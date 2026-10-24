import React from 'react';
import { WeatherCategory } from '../types/weather';

interface WeatherIconProps {
  category: WeatherCategory;
  isDay?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  category,
  isDay = true,
  size = 'md',
  className = '',
}) => {
  // Dimension map
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32',
  }[size];

  // 1. CLEAR
  if (category === 'clear') {
    if (isDay) {
      return (
        <div className={`relative flex items-center justify-center ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_16px_rgba(251,191,36,0.6)]">
            {/* Spinning Sun Rays */}
            <g className="animate-[spin_24s_linear_infinite] origin-center">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="12"
                  x2="50"
                  y2="22"
                  stroke="#fbbf24"
                  strokeWidth="4"
                  strokeLinecap="round"
                  transform={`rotate(${angle} 50 50)`}
                  className="opacity-80"
                />
              ))}
            </g>
            {/* Sun Core with gradient and pulse */}
            <circle
              cx="50"
              cy="50"
              r="22"
              fill="url(#sun-grad)"
              className="animate-pulse"
              style={{ animationDuration: '4s' }}
            />
            <defs>
              <radialGradient id="sun-grad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="60%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      );
    } else {
      // Clear Night: Moon with stars
      return (
        <div className={`relative flex items-center justify-center ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_14px_rgba(165,180,252,0.5)]">
            {/* Twinkling stars */}
            <circle cx="24" cy="28" r="1.8" fill="#e0e7ff" className="animate-ping" style={{ animationDuration: '3s' }} />
            <circle cx="78" cy="24" r="1.5" fill="#fbcfe8" className="animate-pulse" style={{ animationDuration: '2s' }} />
            <circle cx="74" cy="68" r="2.2" fill="#c7d2fe" className="animate-pulse" style={{ animationDuration: '3.5s' }} />
            {/* Crescent Moon */}
            <path
              d="M58 20 C42 20 28 34 28 50 C28 66 42 80 58 80 C50 74 46 63 46 50 C46 37 50 26 58 20 Z"
              fill="url(#moon-grad)"
              stroke="#e0e7ff"
              strokeWidth="1.5"
            />
            <defs>
              <linearGradient id="moon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e0e7ff" />
                <stop offset="60%" stopColor="#c7d2fe" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    }
  }

  // 2. PARTLY CLOUDY
  if (category === 'partly_cloudy') {
    return (
      <div className={`relative flex items-center justify-center ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
          {isDay ? (
            // Mini sun peeking out
            <g transform="translate(14, 8)">
              <circle cx="50" cy="28" r="15" fill="#f59e0b" className="animate-pulse" style={{ animationDuration: '3s' }} />
              <g className="animate-[spin_20s_linear_infinite] origin-[50px_28px]">
                {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="6"
                    x2="50"
                    y2="11"
                    stroke="#fbbf24"
                    strokeWidth="3"
                    strokeLinecap="round"
                    transform={`rotate(${angle} 50 28)`}
                  />
                ))}
              </g>
            </g>
          ) : (
            // Mini moon
            <path
              d="M66 18 C56 18 48 26 48 36 C48 46 56 54 66 54 C61 50 59 43 59 36 C59 29 61 22 66 18 Z"
              fill="#c7d2fe"
              opacity="0.9"
            />
          )}

          {/* Foreground Fluffy Cloud */}
          <path
            d="M30 68 H72 A14 14 0 0 0 72 40 A18 18 0 0 0 38 34 A14 14 0 0 0 30 68 Z"
            fill="url(#cloud-grad-soft)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.5"
            className="drop-shadow-md"
          />
          <defs>
            <linearGradient id="cloud-grad-soft" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // 3. CLOUDY
  if (category === 'cloudy') {
    return (
      <div className={`relative flex items-center justify-center ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Back darker cloud */}
          <path
            d="M24 54 H62 A12 12 0 0 0 62 30 A16 16 0 0 0 32 26 A12 12 0 0 0 24 54 Z"
            fill="#64748b"
            opacity="0.75"
          />
          {/* Front cloud */}
          <path
            d="M32 76 H78 A15 15 0 0 0 78 46 A20 20 0 0 0 42 40 A15 15 0 0 0 32 76 Z"
            fill="url(#cloud-grad-grey)"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1"
          />
          <defs>
            <linearGradient id="cloud-grad-grey" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // 4. FOG
  if (category === 'fog') {
    return (
      <div className={`relative flex items-center justify-center ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Soft top cloud */}
          <path
            d="M32 44 H68 A12 12 0 0 0 68 20 A16 16 0 0 0 38 16 A12 12 0 0 0 32 44 Z"
            fill="#94a3b8"
            opacity="0.6"
          />
          {/* Horizontal mist lines */}
          <line x1="22" y1="56" x2="78" y2="56" stroke="#2dd4bf" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
          <line x1="16" y1="67" x2="84" y2="67" stroke="#99f6e4" strokeWidth="4" strokeLinecap="round" opacity="0.95" />
          <line x1="28" y1="78" x2="72" y2="78" stroke="#5eead4" strokeWidth="3.5" strokeLinecap="round" opacity="0.75" />
        </svg>
      </div>
    );
  }

  // 5. DRIZZLE
  if (category === 'drizzle') {
    return (
      <div className={`relative flex items-center justify-center ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M28 54 H72 A13 13 0 0 0 72 28 A18 18 0 0 0 36 24 A13 13 0 0 0 28 54 Z"
            fill="url(#cloud-drizzle)"
          />
          {/* Gentle slanted droplets */}
          <line x1="36" y1="64" x2="33" y2="74" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
          <line x1="50" y1="62" x2="47" y2="72" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
          <line x1="64" y1="65" x2="61" y2="75" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
          <defs>
            <linearGradient id="cloud-drizzle" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // 6. RAIN
  if (category === 'rain') {
    return (
      <div className={`relative flex items-center justify-center ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_16px_rgba(56,189,248,0.25)]">
          {/* Dark Rain Cloud */}
          <path
            d="M26 56 H74 A14 14 0 0 0 74 28 A20 20 0 0 0 36 24 A14 14 0 0 0 26 56 Z"
            fill="url(#rain-cloud-grad)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.5"
          />
          {/* Animated Rain Streaks */}
          <g>
            <line
              x1="34"
              y1="64"
              x2="28"
              y2="82"
              stroke="#38bdf8"
              strokeWidth="3.2"
              strokeLinecap="round"
              className="animate-pulse"
              style={{ animationDuration: '1s' }}
            />
            <line
              x1="50"
              y1="66"
              x2="44"
              y2="86"
              stroke="#60a5fa"
              strokeWidth="3.2"
              strokeLinecap="round"
              className="animate-pulse"
              style={{ animationDuration: '0.8s', animationDelay: '0.2s' }}
            />
            <line
              x1="66"
              y1="64"
              x2="60"
              y2="83"
              stroke="#38bdf8"
              strokeWidth="3.2"
              strokeLinecap="round"
              className="animate-pulse"
              style={{ animationDuration: '1.1s', animationDelay: '0.4s' }}
            />
          </g>
          <defs>
            <linearGradient id="rain-cloud-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // 7. SNOW
  if (category === 'snow') {
    return (
      <div className={`relative flex items-center justify-center ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(224,231,255,0.5)]">
          <path
            d="M28 52 H72 A13 13 0 0 0 72 26 A18 18 0 0 0 36 22 A13 13 0 0 0 28 52 Z"
            fill="url(#snow-cloud-grad)"
          />
          {/* Detailed Snowflakes */}
          {[
            { cx: 36, cy: 68, s: 7 },
            { cx: 52, cy: 78, s: 8 },
            { cx: 68, cy: 68, s: 6 },
          ].map((flake, i) => (
            <g
              key={i}
              transform={`translate(${flake.cx}, ${flake.cy})`}
              className="animate-[spin_10s_linear_infinite] origin-center"
            >
              <line x1={-flake.s} y1="0" x2={flake.s} y2="0" stroke="#e0e7ff" strokeWidth="2" strokeLinecap="round" />
              <line x1="0" y1={-flake.s} x2="0" y2={flake.s} stroke="#e0e7ff" strokeWidth="2" strokeLinecap="round" />
              <line
                x1={-flake.s * 0.7}
                y1={-flake.s * 0.7}
                x2={flake.s * 0.7}
                y2={flake.s * 0.7}
                stroke="#e0e7ff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1={-flake.s * 0.7}
                y1={flake.s * 0.7}
                x2={flake.s * 0.7}
                y2={-flake.s * 0.7}
                stroke="#e0e7ff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          ))}
          <defs>
            <linearGradient id="snow-cloud-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // 8. THUNDERSTORM
  if (category === 'thunderstorm') {
    return (
      <div className={`relative flex items-center justify-center ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_18px_rgba(251,191,36,0.5)]">
          {/* Intense Dark Storm Cloud */}
          <path
            d="M26 50 H74 A14 14 0 0 0 74 22 A20 20 0 0 0 36 18 A14 14 0 0 0 26 50 Z"
            fill="url(#storm-cloud-grad)"
            stroke="rgba(251,191,36,0.3)"
            strokeWidth="1"
          />
          {/* Sharp Lightning Bolt */}
          <polygon
            points="52,48 40,66 49,66 42,88 64,62 54,62 62,48"
            fill="#facc15"
            stroke="#eab308"
            strokeWidth="1"
            className="animate-pulse"
            style={{ animationDuration: '1.2s' }}
          />
          {/* Rain streak accents */}
          <line x1="30" y1="60" x2="26" y2="74" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          <line x1="72" y1="58" x2="68" y2="72" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          <defs>
            <linearGradient id="storm-cloud-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // Default: Wind / Breeze
  return (
    <div className={`relative flex items-center justify-center ${sizeClasses} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path
          d="M20 40 H68 A8 8 0 0 0 76 32 A8 8 0 0 0 68 24 A8 8 0 0 0 60 32"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M16 54 H74 A10 10 0 0 1 84 64 A10 10 0 0 1 74 74 A10 10 0 0 1 64 64"
          fill="none"
          stroke="#93c5fd"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M26 68 H54 A6 6 0 0 0 60 62 A6 6 0 0 0 54 56"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
