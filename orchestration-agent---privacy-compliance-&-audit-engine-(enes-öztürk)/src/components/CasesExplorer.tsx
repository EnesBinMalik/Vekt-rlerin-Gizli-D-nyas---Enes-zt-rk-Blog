import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Eye,
  CheckCircle2,
  AlertTriangle,
  MinusCircle,
  ChevronLeft,
  ChevronRight,
  Database,
  Layers,
} from 'lucide-react';
import { CaseData, DeletionStatus } from '../types/audit';
import { CaseDetailModal } from './CaseDetailModal';

interface CasesExplorerProps {
  cases: CaseData[];
}

export const CasesExplorer: React.FC<CasesExplorerProps> = ({ cases }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | DeletionStatus>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const pageSize = 25;

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      const matchesStatus =
        statusFilter === 'ALL' || c.deletion_status === statusFilter;

      if (!matchesStatus) return false;

      if (!searchTerm.trim()) return true;

      const term = searchTerm.toLowerCase().trim();
      const matchId = c.case_id.toLowerCase().includes(term);
      const matchSystem = c.systems_involved?.some((s) =>
        s.toLowerCase().includes(term)
      );
      const matchEmail = c.user_email?.toLowerCase().includes(term);
      const matchStep = c.steps_json.some(
        (st) =>
          st.operation.toLowerCase().includes(term) ||
          st.resource_id.toLowerCase().includes(term) ||
          st.system_id.toLowerCase().includes(term) ||
          st.evidence_id.toLowerCase().includes(term)
      );

      return matchId || matchSystem || matchEmail || matchStep;
    });
  }, [cases, statusFilter, searchTerm]);

  const totalPages = Math.ceil(filteredCases.length / pageSize) || 1;
  const paginatedCases = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCases.slice(start, start + pageSize);
  }, [filteredCases, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusBadge = (status: DeletionStatus) => {
    switch (status) {
      case 'COMPLETE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
            <CheckCircle2 className="w-3 h-3" />
            COMPLETE
          </span>
        );
      case 'INCOMPLETE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
            <AlertTriangle className="w-3 h-3" />
            INCOMPLETE
          </span>
        );
      case 'NOT_APPLICABLE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-300 border border-slate-500/20 font-mono">
            <MinusCircle className="w-3 h-3" />
            NOT_APPLICABLE
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Filter and Search Bar */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Vaka Ara: 'case_33', 'case_35', 'analytics_db', 'export_035' veya operasyon adı..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9.5 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
            >
              Temizle
            </button>
          )}
        </div>

        {/* Status Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            Filtre:
          </span>
          {[
            { id: 'ALL', label: 'Tümü', count: cases.length },
            {
              id: 'COMPLETE',
              label: 'COMPLETE',
              count: cases.filter((c) => c.deletion_status === 'COMPLETE').length,
            },
            {
              id: 'INCOMPLETE',
              label: 'INCOMPLETE',
              count: cases.filter((c) => c.deletion_status === 'INCOMPLETE').length,
            },
            {
              id: 'NOT_APPLICABLE',
              label: 'NOT_APPLICABLE',
              count: cases.filter((c) => c.deletion_status === 'NOT_APPLICABLE').length,
            },
          ].map((item) => {
            const isActive = statusFilter === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setStatusFilter(item.id as any);
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-cyan-500/30 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Table */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-4">Durum (deletion_status)</th>
                <th className="py-3 px-4">Adım Sayısı</th>
                <th className="py-3 px-4">İlgili Sistemler</th>
                <th className="py-3 px-4">İlk Adım Özeti (Phase / Op)</th>
                <th className="py-3 px-4 text-right">Eylem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
              {paginatedCases.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 text-xs">
                    Aranan kriterlere uygun vaka bulunamadı.
                  </td>
                </tr>
              ) : (
                paginatedCases.map((c) => {
                  const firstStep = c.steps_json[0];
                  return (
                    <tr
                      key={c.case_id}
                      onClick={() => setSelectedCase(c)}
                      className="hover:bg-slate-800/40 transition cursor-pointer group"
                    >
                      <td className="py-3 px-4 font-bold text-cyan-400 flex items-center gap-2">
                        <Database className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition" />
                        {c.case_id}
                      </td>
                      <td className="py-3 px-4">{getStatusBadge(c.deletion_status)}</td>
                      <td className="py-3 px-4 text-slate-300">
                        <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                          {c.steps_json.length} adım
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        <div className="flex flex-wrap gap-1">
                          {c.systems_involved?.map((s) => (
                            <span
                              key={s}
                              className="text-[10px] bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {firstStep ? (
                          <div className="flex items-center gap-1.5 text-[11px]">
                            <span
                              className={`px-1.5 py-0.2 rounded text-[10px] ${
                                firstStep.phase === 'FINDING'
                                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              }`}
                            >
                              {firstStep.phase}
                            </span>
                            <span className="text-slate-200 truncate max-w-[180px]">
                              {firstStep.operation}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-500 italic">Boş dizi []</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCase(c);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-cyan-950 hover:text-cyan-300 text-slate-300 text-[11px] border border-slate-700 hover:border-cyan-500/40 transition cursor-pointer"
                        >
                          <Eye className="w-3 h-3" />
                          <span>İncele</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="px-4 py-3 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
          <div>
            Toplam <span className="text-white font-bold">{filteredCases.length}</span> vaka
            içerisinde{' '}
            <span className="text-white">
              {filteredCases.length === 0
                ? 0
                : (currentPage - 1) * pageSize + 1}
              -
              {Math.min(currentPage * pageSize, filteredCases.length)}
            </span>{' '}
            arası gösteriliyor.
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 bg-slate-900 rounded-lg border border-slate-800 text-white font-bold">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Case Detail Modal */}
      {selectedCase && (
        <CaseDetailModal
          caseData={selectedCase}
          onClose={() => setSelectedCase(null)}
        />
      )}
    </div>
  );
};
