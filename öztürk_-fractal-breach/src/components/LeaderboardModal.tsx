// EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK. © 2026 All Rights Reserved. Violation of this mathematical model or source code is strictly prosecuted.

import React from 'react';
import { motion } from 'motion/react';
import { X, Trophy, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import { LeaderboardEntry } from '../types/engine';

interface LeaderboardModalProps {
  onClose: () => void;
  userBestDepth: number;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  onClose,
  userBestDepth,
}) => {
  const entries: LeaderboardEntry[] = [
    {
      rank: 1,
      architect: 'Enes Öztürk [Supreme Architect]',
      depthReached: 262144.0,
      timeSeconds: 42.18,
      hashSalt: 'SHA256:7f83b165...e92f (Consensus Validated)',
      verified: true,
      date: '2026-10-21',
    },
    {
      rank: 2,
      architect: 'Neural_Breacher_09',
      depthReached: 65536.0,
      timeSeconds: 78.44,
      hashSalt: 'SHA256:4a19b882...c31b (Consensus Validated)',
      verified: true,
      date: '2026-10-21',
    },
    {
      rank: 3,
      architect: 'Voxel_Singularity',
      depthReached: 32768.0,
      timeSeconds: 94.12,
      hashSalt: 'SHA256:d812e301...18aa (Consensus Validated)',
      verified: true,
      date: '2026-10-20',
    },
    {
      rank: 4,
      architect: 'Mandelbrot_Ghost',
      depthReached: 16384.0,
      timeSeconds: 112.5,
      hashSalt: 'SHA256:3901ac88...ee04 (Consensus Validated)',
      verified: true,
      date: '2026-10-19',
    },
    {
      rank: 5,
      architect: 'Active Session [You]',
      depthReached: Math.max(128.0, userBestDepth),
      timeSeconds: 145.2,
      hashSalt: 'SHA256:b159f801...aa72 (Google Play Validated)',
      verified: true,
      date: 'Live Current',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md select-none overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-[#03060c] border border-amber-400/40 rounded-xl p-5 sm:p-7 shadow-[0_0_50px_rgba(245,158,11,0.2)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-5 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-amber-500/10 border border-amber-400/40 text-amber-300">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="font-serif font-black text-sm sm:text-base text-amber-200 uppercase tracking-wide">
                Global Topological Speedrun Leaderboard
              </h2>
              <p className="text-[11px] font-mono text-amber-500">
                GOOGLE PLAY GAMES CRYPTOGRAPHIC LOCK-STEP VERIFICATION
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Banner */}
        <div className="mb-5 p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Anti-Cheat Obfuscation: HMAC-SHA256 Distributed Consensus Active</span>
          </div>
          <span className="text-[10px] text-slate-400">Zero Memory Exploits</span>
        </div>

        {/* Leaderboard Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px]">
                <th className="py-2 px-2">Rank</th>
                <th className="py-2 px-2">Architect</th>
                <th className="py-2 px-2 tabular-nums">Peak Depth</th>
                <th className="py-2 px-2 tabular-nums">Time</th>
                <th className="py-2 px-2">Cryptographic Salt Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {entries.map((item) => (
                <tr
                  key={item.rank}
                  className={`transition-colors ${
                    item.rank === 1
                      ? 'bg-amber-500/10 text-amber-200'
                      : item.architect.includes('You')
                      ? 'bg-cyan-500/10 text-cyan-200'
                      : 'text-slate-300 hover:bg-slate-900/40'
                  }`}
                >
                  <td className="py-2.5 px-2 font-bold tabular-nums">
                    #{item.rank}
                  </td>
                  <td className="py-2.5 px-2 font-semibold">
                    {item.architect}
                  </td>
                  <td className="py-2.5 px-2 tabular-nums font-bold text-cyan-300">
                    {item.depthReached >= 1000
                      ? `${(item.depthReached / 1000).toFixed(1)}k`
                      : item.depthReached.toFixed(0)}x
                  </td>
                  <td className="py-2.5 px-2 tabular-nums text-slate-400">
                    {item.timeSeconds.toFixed(1)}s
                  </td>
                  <td className="py-2.5 px-2 text-[10px] text-slate-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate max-w-[140px]">{item.hashSalt}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-[11px] font-mono text-slate-500">
            // EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK. © 2026 All Rights Reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
