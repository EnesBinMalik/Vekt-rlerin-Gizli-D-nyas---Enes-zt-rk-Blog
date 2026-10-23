import React, { useState } from 'react';
import { Database, Search, ChevronLeft, ChevronRight, Hash } from 'lucide-react';
import { dvdRentalDb } from '../services/db';

export const SchemaViewer: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<string>('film');
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(15);
  const [search, setSearch] = useState<string>('');

  const tableSummaries = dvdRentalDb.getTableSummaries();
  const currentSummary = tableSummaries.find((t) => t.name === selectedTable) || tableSummaries[0];

  // Tablo verisini getir
  const getRawData = () => {
    switch (selectedTable) {
      case 'film':
        return dvdRentalDb.films;
      case 'customer':
        return dvdRentalDb.customers;
      case 'city':
        return dvdRentalDb.cities;
      case 'country':
        return dvdRentalDb.countries;
      case 'store':
        return dvdRentalDb.stores;
      default:
        return [];
    }
  };

  const rawData = getRawData();

  // Arama filtresi
  const filteredData = (rawData as any[]).filter((item) => {
    if (!search) return true;
    return Object.values(item).some((v) =>
      String(v).toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);
  const columns = currentSummary.columns.map((c) => c.name);

  const handleTableChange = (name: string) => {
    setSelectedTable(name);
    setPage(1);
    setSearch('');
  };

  return (
    <div className="space-y-6">
      {/* Şema ve ERD Tanıtımı */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-850 border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded bg-blue-500/20 text-blue-400">
                <Database className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-100">
                DVD Rental Veri Tabanı Şeması &amp; Canlı Tablo Tarayıcı
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              PostgreSQL ve MySQL standart eğitim veritabanı DVD Rental (Sakila) tabloları, ilişkileri ve canlı kayıtları.
            </p>
          </div>

          {/* Tablo Seçim Butonları */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
            {tableSummaries.map((tbl) => (
              <button
                key={tbl.name}
                onClick={() => handleTableChange(tbl.name)}
                className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                  selectedTable === tbl.name
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{tbl.name}</span>
                <span className="text-[10px] opacity-60">({tbl.rowCount})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ERD İlişki Özeti */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <span>Temel Tablo İlişkileri (Entity Relationship)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
            <div className="text-cyan-400 font-mono font-bold mb-1">country (1) ➔ city (N)</div>
            <p className="text-slate-400 text-[11px]">
              <code className="text-slate-300">country.country_id</code> ile <code className="text-slate-300">city.country_id</code> birbirine 1-N (Bire Çok) bağlıdır.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
            <div className="text-blue-400 font-mono font-bold mb-1">store (1) ➔ customer (N)</div>
            <p className="text-slate-400 text-[11px]">
              <code className="text-slate-300">customer.store_id</code> her müşterinin kayıtlı olduğu mağazayı temsil eden Foreign Key&apos;dir.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
            <div className="text-purple-400 font-mono font-bold mb-1">film (1000 Kayıt)</div>
            <p className="text-slate-400 text-[11px]">
              Filmlerin içerik derecesi (<code className="text-slate-300">rating</code>) ve ikame maliyeti (<code className="text-slate-300">replacement_cost</code>) burada tutulur.
            </p>
          </div>
        </div>
      </div>

      {/* Seçili Tablo Kolon Şeması */}
      <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-200 font-mono flex items-center gap-2">
              <span className="text-cyan-400">TABLE</span> {currentSummary.name}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{currentSummary.description}</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/40 self-start sm:self-auto">
            {currentSummary.rowCount} Toplam Satır
          </span>
        </div>

        {/* Kolon Tipleri Listesi */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs font-mono">
          {currentSummary.columns.map((col) => (
            <div
              key={col.name}
              className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between"
            >
              <span className="text-slate-200 font-medium">{col.name}</span>
              <span className="text-[10px] text-cyan-400/80">{col.type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Canlı Veri Tablosu ve Sayfalama */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-200">
              Canlı Veri Görüntüleyici: &ldquo;{selectedTable}&rdquo;
            </span>
            <span className="text-slate-500 font-mono">
              ({filteredData.length} kayıt)
            </span>
          </div>

          {/* Arama Inputu */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder={`${selectedTable} içinde ara...`}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-full sm:w-64"
            />
          </div>
        </div>

        {/* Tablo Çerçevesi */}
        <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950/80 shadow-inner">
          <div className="overflow-x-auto max-h-[500px]">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10 text-slate-300 font-semibold font-mono">
                <tr>
                  <th className="py-2.5 px-4 w-12 text-slate-500 text-center">#</th>
                  {columns.map((col) => (
                    <th key={col} className="py-2.5 px-4 text-cyan-400">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                {paginatedData.map((row: any, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-900/60 transition-colors odd:bg-slate-950/40"
                  >
                    <td className="py-2 px-4 text-slate-600 text-center text-[11px]">
                      {(page - 1) * pageSize + idx + 1}
                    </td>
                    {columns.map((col) => {
                      const val = row[col];
                      const isNumeric = typeof val === 'number';
                      return (
                        <td
                          key={col}
                          className={`py-2 px-4 ${
                            isNumeric ? 'text-emerald-300 font-semibold' : 'text-slate-200'
                          }`}
                        >
                          {val !== null && val !== undefined ? String(val) : 'NULL'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sayfalama Kontrolleri */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono">
          <span className="text-slate-400">
            Sayfa <strong className="text-slate-200">{page}</strong> / {totalPages}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 transition"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Önceki</span>
            </button>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 transition"
            >
              <span>Sonraki</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
