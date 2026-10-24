import React from 'react';

interface CircularTimerProps {
  timeRemaining: number;
  totalTime?: number;
}

export const CircularTimer: React.FC<CircularTimerProps> = ({
  timeRemaining,
  totalTime = 12,
}) => {
  const radius = 34;
  const stroke = 4.5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const progress = Math.max(0, Math.min(1, timeRemaining / totalTime));
  const strokeDashoffset = circumference - progress * circumference;

  // Determine color and intensity
  const isUrgent = timeRemaining <= 3;
  const isWarning = timeRemaining <= 6 && timeRemaining > 3;

  let strokeColor = '#10b981'; // emerald-500
  let textColor = 'text-emerald-400';
  let bgColor = 'bg-emerald-950/20';
  let ringClass = '';

  if (isUrgent) {
    strokeColor = '#f43f5e'; // rose-500
    textColor = 'text-rose-400';
    bgColor = 'bg-rose-950/40';
    ringClass = 'animate-pulse';
  } else if (isWarning) {
    strokeColor = '#f59e0b'; // amber-500
    textColor = 'text-amber-400';
    bgColor = 'bg-amber-950/30';
  }

  return (
    <div className={`relative flex items-center justify-center rounded-full ${bgColor} p-1 transition-colors duration-300 ${ringClass}`}>
      <svg height={radius * 2} width={radius * 2} className="-rotate-90">
        {/* Track */}
        <circle
          stroke="#1e293b"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress Fill */}
        <circle
          stroke={strokeColor}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: 'stroke-dashoffset 0.25s linear, stroke 0.3s ease',
          }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      {/* Central Time Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-mono-numbers text-xl font-black ${textColor} leading-none tracking-tight`}>
          {Math.ceil(timeRemaining)}
        </span>
        <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
          sn
        </span>
      </div>
    </div>
  );
};
