import React, { useState, useMemo } from 'react';
import { ACTORS_DATA, CUSTOMERS_DATA } from '../data/dvdrentalData';
import { X, Search, Database, Users, Clapperboard } from 'lucide-react';

interface DatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DatabaseModal: React.FC<DatabaseModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'actor' | 'customer'>('actor');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 25;

  if (!isOpen) return null;

  const actorFiltered = useMemo(() => {
    if (!searchTerm.trim()) return ACTORS_DATA;
    const term = searchTerm.toLowerCase();
    return ACTORS_DATA.filter(
      a => a.first_name.toLowerCase().includes(term) || a.last_name.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const customerFiltered = useMemo(() => {
    if (!searchTerm.trim()) return CUSTOMERS_DATA;
    const term = searchTerm.toLowerCase();
    return CUSTOMERS_DATA.filter(
      c => c.first_name.toLowerCase().includes(term) || c.last_name.toLowerCase().includes(term) || c.email.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const activeData = activeTab === 'actor' ? actorFiltered : customerFiltered;
  const totalPages = Math.ceil(activeData.length / pageSize);
  const paginatedData = activeData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-100">
                dvdrental Örnek Veritabanı Tabloları
              </h3>
              <p className="text-xs text-slate-400">
                Orijinal Sakila / DVD Rental veri setindeki actor ve customer kayıtları
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab & Filter Bar */}
        <div className="p-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center p-0.5 bg-slate-950 rounded-lg border border-slate-800">
            <button
              onClick={() => {
                setActiveTab('actor');
                setPage(1);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'actor'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clapperboard className="w-3.5 h-3.5" />
              <span>actor Tablosu (200 Kayıt)</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('customer');
                setPage(1);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'customer'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>customer Tablosu (599 Kayıt)</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              placeholder={`${activeTab === 'actor' ? 'Aktör' : 'Müşteri'} ara...`}
              className="pl-8 pr-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 w-48"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto p-0 min-h-72">
          {activeTab === 'actor' ? (
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] sticky top-0 border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-4 w-24">actor_id</th>
                  <th className="py-2.5 px-4">first_name</th>
                  <th className="py-2.5 px-4">last_name</th>
                  <th className="py-2.5 px-4">last_update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {(paginatedData as typeof ACTORS_DATA).map((actor) => (
                  <tr key={actor.actor_id} className="hover:bg-slate-800/40">
                    <td className="py-2 px-4 text-slate-500">{actor.actor_id}</td>
                    <td className="py-2 px-4 font-semibold text-amber-300">{actor.first_name}</td>
                    <td className="py-2 px-4 text-slate-300">{actor.last_name}</td>
                    <td className="py-2 px-4 text-slate-500 text-[11px]">{actor.last_update}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] sticky top-0 border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3 w-20">customer_id</th>
                  <th className="py-2.5 px-3">store_id</th>
                  <th className="py-2.5 px-4">first_name</th>
                  <th className="py-2.5 px-4">last_name</th>
                  <th className="py-2.5 px-4">email</th>
                  <th className="py-2.5 px-3">active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {(paginatedData as typeof CUSTOMERS_DATA).map((customer) => (
                  <tr key={customer.customer_id} className="hover:bg-slate-800/40">
                    <td className="py-2 px-3 text-slate-500">{customer.customer_id}</td>
                    <td className="py-2 px-3 text-slate-400">{customer.store_id}</td>
                    <td className="py-2 px-4 font-semibold text-sky-300">{customer.first_name}</td>
                    <td className="py-2 px-4 text-slate-300">{customer.last_name}</td>
                    <td className="py-2 px-4 text-slate-400 text-[11px] truncate max-w-xs">{customer.email}</td>
                    <td className="py-2 px-3">
                      <span className="text-emerald-400 font-bold">{customer.active}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer Pagination */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="tabular-nums">
            Toplam {activeData.length} kayıttan {(page - 1) * pageSize + 1} - {Math.min(activeData.length, page * pageSize)} arası gösteriliyor
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 cursor-pointer"
            >
              Önceki
            </button>
            <span className="font-mono tabular-nums text-slate-300">
              {page} / {totalPages || 1}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 cursor-pointer"
            >
              Sonraki
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
