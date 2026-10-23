import React, { useState } from 'react';
import {
  dvdrentalSchemas,
  initialCities,
  initialCountries,
  initialCustomers,
  initialPayments,
  initialRentals,
} from '../data/dvdrentalData';
import { Database, Key, Link2, Table, Eye } from 'lucide-react';

export const SchemaViewer: React.FC = () => {
  const tableKeys = Object.keys(dvdrentalSchemas);
  const [selectedTable, setSelectedTable] = useState<string>('city');
  const [activeSubTab, setActiveSubTab] = useState<'columns' | 'data'>('columns');

  const currentSchema = dvdrentalSchemas[selectedTable];

  const getTableData = (name: string) => {
    switch (name) {
      case 'country':
        return initialCountries;
      case 'city':
        return initialCities;
      case 'customer':
        return initialCustomers;
      case 'payment':
        return initialPayments;
      case 'rental':
        return initialRentals;
      default:
        return [];
    }
  };

  const currentData = getTableData(selectedTable);

  return (
    <div className="space-y-6">
      {/* Intro card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">dvdrental Veritabanı Şeması</h2>
              <p className="text-xs text-slate-400">
                Sorgularda kullanılan 5 ana tablo: city, country, customer, payment, rental
              </p>
            </div>
          </div>

          {/* Quick Table Switcher Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            {tableKeys.map((name) => (
              <button
                key={name}
                onClick={() => setSelectedTable(name)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer ${
                  selectedTable === name
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                {name} ({getTableData(name).length})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Detail Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Header of selected table */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Table className="w-4 h-4 text-sky-400" />
            <h3 className="font-mono font-bold text-base text-white">
              public.{currentSchema.name}
            </h3>
            <span className="text-xs text-slate-400">
              — {currentSchema.description}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab('columns')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition cursor-pointer ${
                activeSubTab === 'columns'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              Sütunlar & Anahtarlar ({currentSchema.columns.length})
            </button>
            <button
              onClick={() => setActiveSubTab('data')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg transition cursor-pointer ${
                activeSubTab === 'data'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              Örnek Veriler ({currentData.length})
            </button>
          </div>
        </div>

        {/* View 1: Columns & Keys */}
        {activeSubTab === 'columns' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-4">Sütun Adı</th>
                  <th className="py-2.5 px-4">Veri Tipi</th>
                  <th className="py-2.5 px-4">Anahtar (Key)</th>
                  <th className="py-2.5 px-4">İlişki / Hedef</th>
                  <th className="py-2.5 px-4">Açıklama</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {currentSchema.columns.map((col) => (
                  <tr key={col.name} className="hover:bg-slate-800/30 transition">
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-200">
                      {col.name}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-sky-400">
                      {col.type}
                    </td>
                    <td className="py-2.5 px-4">
                      {col.isPk && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                          <Key className="w-3 h-3" />
                          PRIMARY KEY
                        </span>
                      )}
                      {col.isFk && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                          <Link2 className="w-3 h-3" />
                          FOREIGN KEY
                        </span>
                      )}
                      {!col.isPk && !col.isFk && (
                        <span className="text-slate-500 text-xs">—</span>
                      )}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-xs text-indigo-300">
                      {col.fkTarget ? `-> ${col.fkTarget}` : '—'}
                    </td>
                    <td className="py-2.5 px-4 text-slate-300">
                      {col.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* View 2: Sample Rows */}
        {activeSubTab === 'data' && (
          <div className="overflow-x-auto max-h-96 scrollbar-thin">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800 sticky top-0 z-10">
                <tr>
                  <th className="py-2.5 px-3 w-12 text-center text-slate-500">#</th>
                  {currentSchema.columns.map((col) => (
                    <th key={col.name} className="py-2.5 px-4 font-semibold text-slate-300 font-mono">
                      {col.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {currentData.map((row: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition">
                    <td className="py-2 px-3 text-center text-slate-500 font-mono text-[11px]">
                      {idx + 1}
                    </td>
                    {currentSchema.columns.map((col) => {
                      const val = row[col.name];
                      const isNull = val === null || val === undefined;
                      return (
                        <td key={col.name} className="py-2.5 px-4 font-mono text-slate-200">
                          {isNull ? (
                            <span className="text-amber-400 font-bold text-[10px]">NULL</span>
                          ) : (
                            String(val)
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
