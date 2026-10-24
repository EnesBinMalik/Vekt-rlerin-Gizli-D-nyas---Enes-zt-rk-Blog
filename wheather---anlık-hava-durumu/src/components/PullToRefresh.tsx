import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowDown, Loader2, Sparkles } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  isRefreshing: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  isRefreshing,
  children,
  disabled = false,
}) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  const isPointerDown = useRef<boolean>(false);

  const THRESHOLD = 72; // pixels needed to trigger refresh
  const MAX_PULL = 110;

  const handleStart = (clientY: number) => {
    if (disabled || isRefreshing) return;
    const container = containerRef.current;
    if (!container) return;

    // Sadece en tepedeyken (scrollTop <= 0) çekmeye izin ver
    if (container.scrollTop <= 0) {
      touchStartY.current = clientY;
      setIsPulling(true);
    }
  };

  const handleMove = useCallback(
    (clientY: number) => {
      if (!isPulling || touchStartY.current === null || isRefreshing) return;
      const deltaY = clientY - touchStartY.current;

      if (deltaY > 0) {
        // Logaritmik elastik direnç formülü
        const damped = Math.min(MAX_PULL, Math.pow(deltaY, 0.82) * 1.5);
        setPullDistance(damped);
      } else {
        setPullDistance(0);
      }
    },
    [isPulling, isRefreshing]
  );

  const handleEnd = useCallback(async () => {
    if (!isPulling) return;
    setIsPulling(false);
    touchStartY.current = null;
    isPointerDown.current = false;

    if (pullDistance >= THRESHOLD && !isRefreshing) {
      // Haptik titreşim (destekleyen mobil cihazlarda)
      try {
        if ('vibrate' in navigator) {
          navigator.vibrate(25);
        }
      } catch {
        // ignore
      }

      setPullDistance(THRESHOLD);
      try {
        await onRefresh();
      } finally {
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
  }, [isPulling, pullDistance, isRefreshing, onRefresh]);

  // Touch event handlers
  const onTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientY);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientY);
  const onTouchEnd = () => handleEnd();

  // Mouse / Pointer drag emulation for desktop testing
  const onMouseDown = (e: React.MouseEvent) => {
    isPointerDown.current = true;
    handleStart(e.clientY);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (isPointerDown.current) {
      handleMove(e.clientY);
    }
  };
  const onMouseUp = () => {
    if (isPointerDown.current) {
      handleEnd();
    }
  };

  useEffect(() => {
    if (!isRefreshing && !isPulling) {
      setPullDistance(0);
    }
  }, [isRefreshing, isPulling]);

  const progress = Math.min(1, pullDistance / THRESHOLD);
  const isReady = pullDistance >= THRESHOLD;

  return (
    <div
      ref={containerRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      className="relative w-full h-full overflow-y-auto overflow-x-hidden touch-pan-y overscroll-y-contain select-none"
    >
      {/* Pull To Refresh Indicator Bar */}
      <div
        className="w-full flex items-center justify-center pointer-events-none transition-all duration-150 ease-out z-30"
        style={{
          height: isRefreshing ? `${THRESHOLD}px` : `${pullDistance}px`,
          opacity: pullDistance > 8 || isRefreshing ? 1 : 0,
          transform: `translateY(${Math.min(10, pullDistance * 0.1)}px)`,
        }}
      >
        <div className="flex flex-col items-center justify-center py-2 px-4 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-lg text-xs font-medium text-slate-200">
          {isRefreshing ? (
            <div className="flex items-center gap-2 text-sky-300">
              <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
              <span>Rastgele konum ve hava durumu getiriliyor...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-200"
                style={{
                  transform: `rotate(${isReady ? 180 : progress * 180}deg)`,
                  backgroundColor: isReady ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                }}
              >
                {isReady ? (
                  <Sparkles className="w-3.5 h-3.5 text-sky-300 animate-pulse" />
                ) : (
                  <ArrowDown className="w-3.5 h-3.5 text-slate-300" />
                )}
              </div>
              <span className={isReady ? 'text-sky-300 font-semibold' : 'text-slate-300'}>
                {isReady ? 'Bırak ve Rastgele Konum Keşfet! 🎲' : 'Aşağı çekerek rastgele konum keşfet'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content with dynamic push down */}
      <div
        className="transition-transform duration-100 ease-out"
        style={{
          transform: `translateY(${isRefreshing ? 4 : pullDistance > 0 ? pullDistance * 0.15 : 0}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
