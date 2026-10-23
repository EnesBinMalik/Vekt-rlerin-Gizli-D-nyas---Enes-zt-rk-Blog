import React from 'react';
import { JoinType } from '../types/sql';

interface VennDiagramProps {
  joinType: JoinType;
  leftTableName: string;
  rightTableName: string;
  className?: string;
}

export const VennDiagram: React.FC<VennDiagramProps> = ({
  joinType,
  leftTableName,
  rightTableName,
  className = '',
}) => {
  // Config based on join type
  const isLeft = joinType === 'LEFT JOIN';
  const isRight = joinType === 'RIGHT JOIN';
  const isFull = joinType === 'FULL JOIN';
  const isInner = joinType === 'INNER JOIN';

  // Highlight logic
  const highlightLeftOnly = isLeft || isFull;
  const highlightRightOnly = isRight || isFull;
  const highlightCenter = true; // All outer joins and inner joins include the matching center

  return (
    <div className={`flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-xl border border-slate-800 ${className}`}>
      <div className="relative w-64 h-36">
        <svg viewBox="0 0 280 160" className="w-full h-full drop-shadow-md">
          <defs>
            {/* Clip path for the intersection of both circles */}
            <clipPath id="circle-left-clip">
              <circle cx="100" cy="80" r="55" />
            </clipPath>
            <clipPath id="circle-right-clip">
              <circle cx="180" cy="80" r="55" />
            </clipPath>
            <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>

          {/* Background circles (base outlines) */}
          <circle
            cx="100"
            cy="80"
            r="55"
            className="fill-slate-800/40 stroke-slate-700 stroke-2"
          />
          <circle
            cx="180"
            cy="80"
            r="55"
            className="fill-slate-800/40 stroke-slate-700 stroke-2"
          />

          {/* Highlight Left Circle if LEFT or FULL */}
          {highlightLeftOnly && (
            <circle
              cx="100"
              cy="80"
              r="55"
              fill="url(#activeGradient)"
              className="opacity-75 transition-all duration-300"
            />
          )}

          {/* Highlight Right Circle if RIGHT or FULL */}
          {highlightRightOnly && (
            <circle
              cx="180"
              cy="80"
              r="55"
              fill={isFull ? 'url(#purpleGradient)' : 'url(#accentGradient)'}
              className="opacity-75 transition-all duration-300"
            />
          )}

          {/* Center Intersection: Always highlighted for LEFT, RIGHT, FULL, INNER */}
          {highlightCenter && (
            <g clipPath="url(#circle-left-clip)">
              <circle
                cx="180"
                cy="80"
                r="55"
                fill={isInner ? '#f59e0b' : '#38bdf8'}
                className="opacity-95 transition-all duration-300 drop-shadow-sm"
              />
            </g>
          )}

          {/* Outlines on top */}
          <circle
            cx="100"
            cy="80"
            r="55"
            fill="none"
            className={`transition-colors duration-300 stroke-2 ${
              highlightLeftOnly ? 'stroke-sky-400' : 'stroke-slate-600'
            }`}
          />
          <circle
            cx="180"
            cy="80"
            r="55"
            fill="none"
            className={`transition-colors duration-300 stroke-2 ${
              highlightRightOnly ? 'stroke-emerald-400' : 'stroke-slate-600'
            }`}
          />

          {/* Labels inside diagram */}
          <text
            x="70"
            y="85"
            textAnchor="middle"
            className="fill-white font-semibold text-[13px] tracking-wide pointer-events-none drop-shadow"
          >
            {leftTableName}
          </text>
          <text
            x="210"
            y="85"
            textAnchor="middle"
            className="fill-white font-semibold text-[13px] tracking-wide pointer-events-none drop-shadow"
          >
            {rightTableName}
          </text>
          <text
            x="140"
            y="83"
            textAnchor="middle"
            className="fill-white text-[11px] font-bold pointer-events-none drop-shadow"
          >
            Ortak
          </text>
          <text
            x="140"
            y="95"
            textAnchor="middle"
            className="fill-white/80 text-[9px] pointer-events-none drop-shadow"
          >
            (ON)
          </text>
        </svg>
      </div>

      <div className="mt-2 text-center">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-200 border border-slate-700">
          <span
            className={`w-2 h-2 rounded-full ${
              isLeft ? 'bg-sky-400' : isRight ? 'bg-emerald-400' : isFull ? 'bg-indigo-400' : 'bg-amber-400'
            }`}
          />
          {joinType}:{' '}
          <strong className="text-white">
            {isLeft
              ? `Tüm ${leftTableName} + Eşleşen ${rightTableName}`
              : isRight
              ? `Tüm ${rightTableName} + Eşleşen ${leftTableName}`
              : isFull
              ? `Tüm ${leftTableName} + Tüm ${rightTableName}`
              : 'Yalnızca Eşleşenler'}
          </strong>
        </span>
      </div>
    </div>
  );
};
